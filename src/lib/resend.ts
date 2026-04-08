import { Resend } from "resend";

export const resend = new Resend(process.env.RESEND_API_KEY || "re_placeholder");

export async function sendEstimateEmail(
  to: string,
  estimatedRefund: number,
  contactName?: string
) {
  const formatted = "$" + Math.round(estimatedRefund).toLocaleString();

  return resend.emails.send({
    from: "Recoup <noreply@recoup.claims>",
    to,
    subject: `Your IEEPA refund estimate — ${formatted}`,
    html: `
      <div style="font-family: -apple-system, sans-serif; max-width: 560px; margin: 0 auto; padding: 40px 20px;">
        <p style="font-family: 'Playfair Display', Georgia, serif; font-size: 20px; color: #1D1D1F; margin-bottom: 8px;">recoup</p>
        <hr style="border: none; border-top: 1px solid #D2D2D7; margin: 24px 0;" />
        ${contactName ? `<p style="color: #86868B; font-size: 15px;">Hi ${contactName},</p>` : ""}
        <p style="color: #1D1D1F; font-size: 16px; line-height: 1.6;">Based on the information you provided, your estimated IEEPA tariff refund is:</p>
        <p style="font-family: 'Playfair Display', Georgia, serif; font-size: 56px; color: #1D1D1F; margin: 32px 0; letter-spacing: -1.5px;">${formatted}</p>
        <p style="color: #86868B; font-size: 14px; margin-bottom: 32px;">Includes estimated interest · Actual depends on entry data</p>
        <a href="https://recoup.claims/apply" style="display: inline-block; background: #1D1D1F; color: #fff; padding: 14px 32px; border-radius: 8px; font-size: 15px; font-weight: 600; text-decoration: none;">Start your filing →</a>
        <hr style="border: none; border-top: 1px solid #D2D2D7; margin: 40px 0 24px;" />
        <p style="color: #86868B; font-size: 12px; line-height: 1.6;">Licensed customs brokers · Flat fee · No percentage<br/>Recoup does not provide legal, tax, or customs brokerage advice.</p>
      </div>
    `,
  });
}

export async function sendApplicationReceivedEmail(
  to: string,
  tier: string,
  contactName?: string
) {
  const tierNames: Record<string, string> = {
    essentials: "Essentials",
    full_filing: "Full Filing",
    priority: "Priority",
  };

  return resend.emails.send({
    from: "Recoup <noreply@recoup.claims>",
    to,
    subject: "We received your Recoup application",
    html: `
      <div style="font-family: -apple-system, sans-serif; max-width: 560px; margin: 0 auto; padding: 40px 20px;">
        <p style="font-family: 'Playfair Display', Georgia, serif; font-size: 20px; color: #1D1D1F; margin-bottom: 8px;">recoup</p>
        <hr style="border: none; border-top: 1px solid #D2D2D7; margin: 24px 0;" />
        ${contactName ? `<p style="color: #1D1D1F; font-size: 16px;">Hi ${contactName},</p>` : ""}
        <p style="color: #1D1D1F; font-size: 16px; line-height: 1.6;">Your <strong>${tierNames[tier] || tier}</strong> application has been received. Here's what happens next:</p>
        <ol style="color: #1D1D1F; font-size: 15px; line-height: 2; padding-left: 20px;">
          <li>Our team reviews your import details (1–2 business days)</li>
          <li>We pull your entry data and isolate IEEPA duties</li>
          <li>Your CAPE declaration is prepared and queued for filing</li>
        </ol>
        <p style="color: #86868B; font-size: 14px; margin-top: 24px;">Questions? Reply to this email or contact <a href="mailto:support@recoup.claims" style="color: #1D1D1F;">support@recoup.claims</a></p>
        <hr style="border: none; border-top: 1px solid #D2D2D7; margin: 40px 0 24px;" />
        <p style="color: #86868B; font-size: 12px; line-height: 1.6;">Licensed customs brokers · Flat fee · No percentage</p>
      </div>
    `,
  });
}

export async function sendInternalLeadAlert(
  companyName: string,
  estimate: number,
  email: string
) {
  const formatted = "$" + Math.round(estimate).toLocaleString();

  return resend.emails.send({
    from: "Recoup System <noreply@recoup.claims>",
    to: "team@recoup.claims",
    subject: `[NEW LEAD] ${companyName || "Unknown"} — ${formatted}`,
    html: `
      <div style="font-family: -apple-system, sans-serif; padding: 20px;">
        <h2 style="color: #1D1D1F;">New Lead</h2>
        <p><strong>Company:</strong> ${companyName || "Not provided"}</p>
        <p><strong>Email:</strong> ${email}</p>
        <p><strong>Estimated Refund:</strong> ${formatted}</p>
        <p><a href="https://recoup.claims/dashboard" style="color: #1D1D1F;">View in dashboard →</a></p>
      </div>
    `,
  });
}
