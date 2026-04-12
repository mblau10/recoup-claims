import { NextResponse } from "next/server";
import { supabaseAdmin } from "@/lib/supabase";
import { stripe } from "@/lib/stripe";

/**
 * POST /api/intake
 *
 * Creates an application record and a Stripe SetupIntent so we can hold a
 * payment method on file. We do NOT charge the customer at intake — the
 * filing fee ($895 floor or 1.5% of refund, whichever is greater) is only
 * captured after CBP accepts the CAPE declaration.
 *
 * Body shape:
 *   {
 *     track: "filing" | "advance" | "both",
 *     email, fullName, phone, legalEntityName,
 *     iorNumber, annualImportValue, primaryCountries[],
 *     monthsUnderIEEPA, hasEntryNumbers
 *   }
 */
export async function POST(request: Request) {
  try {
    const body = await request.json();
    const {
      track,
      email,
      fullName,
      phone,
      legalEntityName,
      iorNumber,
      annualImportValue,
      primaryCountries,
      monthsUnderIEEPA,
      hasEntryNumbers,
      estimatedRefund,
    } = body;

    if (!track || !email || !legalEntityName) {
      return NextResponse.json(
        { error: "Missing required fields: track, email, legalEntityName" },
        { status: 400 }
      );
    }

    const validTracks = ["filing", "advance", "both"];
    if (!validTracks.includes(track)) {
      return NextResponse.json(
        { error: "Invalid track — must be filing, advance, or both" },
        { status: 400 }
      );
    }

    // Persist application
    let applicationId: string | null = null;
    try {
      const { data: application, error: dbError } = await supabaseAdmin
        .from("applications")
        .insert({
          full_name: fullName || null,
          phone: phone || null,
          email,
          legal_entity_name: legalEntityName,
          ior_number: iorNumber || null,
          annual_import_value: annualImportValue || null,
          primary_countries: primaryCountries || [],
          months_under_ieepa: monthsUnderIEEPA || null,
          has_entry_numbers: hasEntryNumbers || null,
          estimated_refund: estimatedRefund || null,
          track,
          status: "pending_intake",
        })
        .select("id")
        .single();

      if (dbError) {
        console.warn("Supabase insert failed (soft):", dbError.message);
      } else {
        applicationId = application?.id ?? null;
      }
    } catch (e) {
      // Supabase not configured in preview envs — continue without persistence.
      console.warn("Supabase unavailable:", e);
    }

    // Create a SetupIntent to capture a payment method on file.
    // Nothing is charged today — capture happens only after CBP acceptance.
    let clientSecret: string | null = null;
    try {
      const setupIntent = await stripe.setupIntents.create({
        payment_method_types: ["card"],
        usage: "off_session",
        metadata: {
          applicationId: applicationId || "unlinked",
          track,
          email,
          legalEntityName,
        },
      });
      clientSecret = setupIntent.client_secret;
    } catch (e) {
      console.warn("Stripe unavailable:", e);
    }

    return NextResponse.json({
      ok: true,
      applicationId,
      clientSecret,
      track,
      nextStep:
        track === "advance"
          ? "advance_bank_verification"
          : "filing_in_queue",
    });
  } catch (error) {
    console.error("Intake API error:", error);
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 }
    );
  }
}
