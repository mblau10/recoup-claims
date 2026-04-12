import { NextResponse } from "next/server";
import { supabaseAdmin } from "@/lib/supabase";
import { resend } from "@/lib/resend";
import { advanceSchema } from "@/lib/schemas";

export async function POST(request: Request) {
  try {
    const body = await request.json();

    // Validate with Zod
    const result = advanceSchema.safeParse(body);
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

    const { applicationId, bankName } = result.data;

    // Update application with bank name only — actual routing/account numbers
    // are collected via our banking partner's hosted form, not this endpoint.
    const { error: dbError } = await supabaseAdmin
      .from("applications")
      .update({
        bank_name: bankName,
        wants_advance: true,
      })
      .eq("id", applicationId);

    if (dbError) {
      console.error("Supabase error:", dbError);
      return NextResponse.json(
        { error: "Failed to update application" },
        { status: 500 }
      );
    }

    // Send internal alert for advance request
    resend.emails
      .send({
        from: "Recoup System <noreply@recoup.claims>",
        to: "team@recoup.claims",
        subject: `[ADVANCE REQUEST] Application ${applicationId}`,
        html: `
          <div style="font-family: -apple-system, sans-serif; padding: 20px;">
            <h2 style="color: #1D1D1F;">New Advance Funding Request</h2>
            <p><strong>Application ID:</strong> ${applicationId}</p>
            <p><strong>Bank:</strong> ${bankName}</p>
            <p>Review and verify in the dashboard.</p>
          </div>
        `,
      })
      .catch(console.error);

    return NextResponse.json({ success: true });
  } catch (error) {
    console.error("Advance API error:", error);
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 }
    );
  }
}
