import { NextResponse } from "next/server";
import { stripe } from "@/lib/stripe";
import { supabaseAdmin } from "@/lib/supabase";
import { sendApplicationReceivedEmail } from "@/lib/resend";
import Stripe from "stripe";

export async function POST(request: Request) {
  const body = await request.text();
  const sig = request.headers.get("stripe-signature");

  if (!sig) {
    return NextResponse.json({ error: "No signature" }, { status: 400 });
  }

  let event: Stripe.Event;

  try {
    event = stripe.webhooks.constructEvent(
      body,
      sig,
      process.env.STRIPE_WEBHOOK_SECRET || ""
    );
  } catch (err) {
    console.error("Webhook signature verification failed:", err);
    return NextResponse.json({ error: "Invalid signature" }, { status: 400 });
  }

  if (event.type === "payment_intent.succeeded") {
    const paymentIntent = event.data.object as Stripe.PaymentIntent;
    const { applicationId, tier, email } = paymentIntent.metadata;

    if (applicationId) {
      // Update application status
      const { error } = await supabaseAdmin
        .from("applications")
        .update({
          status: "paid",
          paid_at: new Date().toISOString(),
          amount_paid: paymentIntent.amount / 100,
          stripe_payment_intent_id: paymentIntent.id,
        })
        .eq("id", applicationId);

      if (error) {
        console.error("Failed to update application:", error);
      }

      // Send confirmation email
      if (email) {
        sendApplicationReceivedEmail(email, tier || "full_filing").catch(
          console.error
        );
      }
    }
  }

  return NextResponse.json({ received: true });
}
