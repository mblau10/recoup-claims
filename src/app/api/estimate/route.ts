import { NextResponse } from "next/server";
import { supabaseAdmin } from "@/lib/supabase";
import { calculateRefund, calculateAdvance } from "@/lib/calculator";
import { sendEstimateEmail, sendInternalLeadAlert } from "@/lib/resend";
import { estimateSchema } from "@/lib/schemas";

export async function POST(request: Request) {
  try {
    const body = await request.json();

    // Validate with Zod
    const result = estimateSchema.safeParse(body);
    if (!result.success) {
      const errors: Record<string, string> = {};
      result.error.issues.forEach((issue) => {
        const path = issue.path.join(".");
        errors[path] = issue.message;
      });
      return NextResponse.json(
        { error: "Validation failed", errors },
        { status: 400 }
      );
    }

    const { email, importValue, tariffRate, months, wantsAdvance } = result.data;
    const { country, companyName, contactName } = body;

    // Calculate refund
    const estimatedRefund = calculateRefund(importValue, tariffRate, parseInt(months));
    const advanceAmount = wantsAdvance ? calculateAdvance(estimatedRefund) : 0;

    // Upsert lead in Supabase
    const { data: lead, error: dbError } = await supabaseAdmin
      .from("leads")
      .upsert(
        {
          email,
          company_name: companyName || null,
          contact_name: contactName || null,
          annual_import_value: importValue,
          country_of_origin: country,
          tariff_rate: tariffRate,
          months_imported: months,
          estimated_refund: estimatedRefund,
          wants_advance: wantsAdvance || false,
          status: "new",
        },
        { onConflict: "email" }
      )
      .select("id")
      .single();

    if (dbError) {
      console.error("Supabase error:", dbError);
      // Continue even if DB fails — don't block the user
    }

    // Send estimate email (non-blocking)
    sendEstimateEmail(email, estimatedRefund, contactName).catch(console.error);

    // Send internal alert (non-blocking)
    sendInternalLeadAlert(companyName || "", estimatedRefund, email).catch(
      console.error
    );

    return NextResponse.json({
      estimatedRefund: Math.round(estimatedRefund),
      advanceAmount: Math.round(advanceAmount),
      leadId: lead?.id || null,
    });
  } catch (error) {
    console.error("Estimate API error:", error);
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 }
    );
  }
}
