import { NextResponse } from "next/server";
import { supabaseAdmin } from "@/lib/supabase";
import { stripe, TIER_AMOUNTS } from "@/lib/stripe";

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const {
      leadId,
      legalEntityName,
      ein,
      businessAddress,
      htsCodes,
      entryNumbers,
      portsOfEntry,
      importValueByCountry,
      tier,
      wantsAdvance,
      email,
    } = body;

    if (!tier || !email) {
      return NextResponse.json(
        { error: "Missing required fields" },
        { status: 400 }
      );
    }

    const amount = TIER_AMOUNTS[tier as keyof typeof TIER_AMOUNTS];
    if (!amount) {
      return NextResponse.json({ error: "Invalid tier" }, { status: 400 });
    }

    // Create application record
    const { data: application, error: dbError } = await supabaseAdmin
      .from("applications")
      .insert({
        lead_id: leadId || null,
        legal_entity_name: legalEntityName,
        ein,
        business_address: businessAddress,
        hts_codes: htsCodes || [],
        entry_numbers: entryNumbers || [],
        ports_of_entry: portsOfEntry || [],
        import_value_by_country: importValueByCountry || {},
        tier,
        wants_advance: wantsAdvance || false,
        status: "pending",
      })
      .select("id")
      .single();

    if (dbError) {
      console.error("Supabase error:", dbError);
      return NextResponse.json(
        { error: "Failed to create application" },
        { status: 500 }
      );
    }

    // Create Stripe PaymentIntent
    const paymentIntent = await stripe.paymentIntents.create({
      amount,
      currency: "usd",
      metadata: {
        applicationId: application.id,
        tier,
        email,
      },
      receipt_email: email,
    });

    return NextResponse.json({
      clientSecret: paymentIntent.client_secret,
      applicationId: application.id,
    });
  } catch (error) {
    console.error("Intake API error:", error);
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 }
    );
  }
}
