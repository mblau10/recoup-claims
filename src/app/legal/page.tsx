import type { Metadata } from "next";
import Nav from "@/components/Nav";
import Footer from "@/components/Footer";
import FadeIn from "@/components/ui/FadeIn";

export const metadata: Metadata = {
  title: "Terms of Engagement & Privacy — Recoup",
  description:
    "Recoup LLC terms of engagement and privacy policy for IEEPA tariff refund administrative preparation services.",
};

const LAST_UPDATED = "April 9, 2026";

function Section({
  num,
  title,
  children,
}: {
  num: string;
  title: string;
  children: React.ReactNode;
}) {
  return (
    <section className="mb-14 scroll-mt-32" id={`s-${num}`}>
      <div className="flex items-baseline gap-5 mb-4">
        <span
          className="text-[11px] shrink-0"
          style={{
            fontFamily: "var(--font-mono)",
            color: "var(--color-recoup-ember)",
            letterSpacing: "0.12em",
          }}
        >
          {num}
        </span>
        <h2
          className="text-[24px] sm:text-[28px] font-normal"
          style={{
            fontFamily: "var(--font-display)",
            color: "var(--color-recoup-ink)",
            letterSpacing: "-0.01em",
          }}
        >
          {title}
        </h2>
      </div>
      <div
        className="ml-0 sm:ml-[3.5rem] text-[15px] leading-[1.75] space-y-4"
        style={{ color: "var(--color-recoup-ink)" }}
      >
        {children}
      </div>
    </section>
  );
}

export default function LegalPage() {
  return (
    <>
      <Nav />

      <main className="pt-32 pb-24 min-h-screen">
        <div className="max-w-[1240px] mx-auto px-6 sm:px-10">
          <FadeIn>
            <div className="flex items-center gap-3 mb-6">
              <span
                className="h-px w-10"
                style={{ background: "var(--color-recoup-ink)" }}
              />
              <span
                className="text-[11px] tracking-[0.18em] uppercase"
                style={{
                  fontFamily: "var(--font-mono)",
                  color: "var(--color-recoup-muted)",
                }}
              >
                Legal · last updated {LAST_UPDATED}
              </span>
            </div>
            <h1
              className="text-[44px] sm:text-[64px] lg:text-[80px] font-normal leading-[0.95] tracking-[-0.03em] mb-8 max-w-[900px]"
              style={{
                fontFamily: "var(--font-display)",
                color: "var(--color-recoup-ink)",
              }}
            >
              Terms of Engagement &amp;{" "}
              <em
                style={{
                  fontStyle: "italic",
                  color: "var(--color-recoup-ember)",
                }}
              >
                Privacy Policy.
              </em>
            </h1>
            <p
              className="text-[16px] sm:text-[17px] leading-[1.6] max-w-[720px] mb-12"
              style={{ color: "var(--color-recoup-muted)" }}
            >
              This page explains, in plain language, what Recoup LLC does for
              you, what we don't do, how we handle your data, and the
              specific terms that govern the filing and Cash Now advance
              services. Read it before you sign up. Nothing on this page is
              legal advice; it is the contract itself.
            </p>
          </FadeIn>

          <div className="grid grid-cols-12 gap-10">
            {/* Sticky TOC */}
            <aside className="hidden lg:block lg:col-span-4">
              <div className="sticky top-28">
                <div
                  className="text-[10px] tracking-[0.18em] uppercase mb-4"
                  style={{
                    fontFamily: "var(--font-mono)",
                    color: "var(--color-recoup-muted)",
                  }}
                >
                  Contents
                </div>
                <ol className="list-none p-0 m-0 space-y-3">
                  {[
                    ["01", "Who we are and what we do", "s-01"],
                    ["02", "What we are not", "s-02"],
                    ["03", "Filing engagement (Track B)", "s-03"],
                    ["04", "Cash Now advance (Track C)", "s-04"],
                    ["05", "Fees, billing, and refunds", "s-05"],
                    ["06", "Your responsibilities", "s-06"],
                    ["07", "Data privacy", "s-07"],
                    ["08", "Data retention and deletion", "s-08"],
                    ["09", "Disputes and arbitration", "s-09"],
                    ["10", "Contact", "s-10"],
                  ].map(([num, title, href]) => (
                    <li key={num}>
                      <a
                        href={`#${href}`}
                        className="flex items-baseline gap-3 no-underline text-[13px]"
                        style={{
                          color: "var(--color-recoup-muted)",
                          fontFamily: "var(--font-sans)",
                        }}
                      >
                        <span
                          style={{
                            fontFamily: "var(--font-mono)",
                            color: "var(--color-recoup-ember)",
                            letterSpacing: "0.1em",
                          }}
                        >
                          {num}
                        </span>
                        {title}
                      </a>
                    </li>
                  ))}
                </ol>
              </div>
            </aside>

            {/* Body */}
            <div className="col-span-12 lg:col-span-8">
              <Section num="01" title="Who we are and what we do">
                <p>
                  Recoup LLC (&ldquo;Recoup,&rdquo; &ldquo;we,&rdquo;
                  &ldquo;us&rdquo;) is a Delaware limited liability company
                  that provides <strong>administrative preparation
                  services</strong> for U.S. importers pursuing IEEPA tariff
                  refunds through U.S. Customs and Border Protection's
                  Customs Administrative Processing &amp; Entry (CAPE) portal.
                </p>
                <p>
                  Our core services are: (a) collecting and organizing your
                  entry summary records, (b) preparing CAPE declaration
                  drafts for review, (c) coordinating the actual CBP filing
                  through a licensed U.S. customs broker engaged by us, and
                  (d) optionally, purchasing a discounted portion of your
                  expected refund as a non-recourse cash advance.
                </p>
              </Section>

              <Section num="02" title="What we are not">
                <p>
                  Recoup is <strong>not a law firm</strong>. Our employees
                  are not acting as your attorneys. Nothing we say to you
                  constitutes legal advice, no attorney-client privilege
                  attaches to our communications, and you should consult a
                  licensed trade attorney for legal questions specific to
                  your situation.
                </p>
                <p>
                  Recoup is <strong>not a licensed customs broker</strong>.
                  The actual CBP filings on your behalf are executed by
                  licensed customs brokers we engage to perform the transmission
                  and signature-on-file functions they are legally required
                  to perform.
                </p>
                <p>
                  Recoup is <strong>not a bank, lender, or financial
                  advisor</strong>. The Cash Now advance is not a loan; it is
                  a non-recourse purchase of a fractional interest in your
                  expected refund, structured as a sale of claim at discount.
                  We do not provide investment, tax, or financial planning
                  advice.
                </p>
              </Section>

              <Section num="03" title="Filing engagement (Track B)">
                <p>
                  When you sign up for Track B (Filing), you engage Recoup to
                  prepare and coordinate the filing of one CAPE declaration
                  per importer of record (IOR) that you identify, covering
                  the IEEPA-eligible entries in the February 1, 2025 through
                  April 30, 2025 window.
                </p>
                <p>
                  Our fee for Track B is{" "}
                  <strong>
                    $895 per CAPE declaration filed, or 1.5% of the expected
                    refund amount, whichever is greater
                  </strong>
                  . In plain English: refunds up to roughly $60,000 pay the
                  flat $895 floor; refunds larger than that pay 1.5% of the
                  refund. The fee is authorized at engagement via a Stripe
                  SetupIntent (a zero-dollar card-on-file authorization) and
                  charged only after the declaration has been accepted by
                  CBP for review &mdash; not at signup, and not if we fail
                  to file for any reason on our side.
                </p>
                <p>
                  The 1.5% figure is calculated on the refund amount
                  estimated at engagement, capped at the final refund CBP
                  actually approves. If CBP issues a smaller refund than
                  estimated, the fee drops proportionally (down to, but
                  never below, the $895 floor). We do not upcharge if the
                  refund comes in higher than estimated.
                </p>
                <p>
                  You can cancel the engagement at any time before the
                  declaration is submitted to CBP with zero fee. After
                  submission, the fee is earned and non-refundable even if
                  CBP subsequently denies the refund. This is why we do not
                  file a declaration until we've confirmed the data
                  is clean.
                </p>
              </Section>

              <Section num="04" title="Cash Now advance (Track C)">
                <p>
                  Track C (Cash Now) is a non-recourse purchase-of-claim
                  agreement. Upon executed engagement and successful bank
                  verification, Recoup pays you{" "}
                  <strong>85% of the expected refund amount</strong> (as
                  calculated by our refund estimator and verified against
                  your entry summaries) within five U.S. business days. In
                  exchange, you assign Recoup the right to receive the full
                  refund from CBP when it is issued.
                </p>
                <p>
                  Our fee on Track C is{" "}
                  <strong>tiered by expected refund size</strong> and netted
                  from the advance at the time of funding:
                </p>
                <ul className="list-none p-0 m-0 space-y-2 ml-2">
                  <li>
                    <span
                      style={{
                        fontFamily: "var(--font-mono)",
                        color: "var(--color-recoup-ember)",
                      }}
                    >
                      &bull;
                    </span>{" "}
                    Refunds up to <strong>$50,000</strong> &mdash; 10% of
                    advance
                  </li>
                  <li>
                    <span
                      style={{
                        fontFamily: "var(--font-mono)",
                        color: "var(--color-recoup-ember)",
                      }}
                    >
                      &bull;
                    </span>{" "}
                    Refunds from <strong>$50,000 to $250,000</strong>{" "}
                    &mdash; 8% of advance
                  </li>
                  <li>
                    <span
                      style={{
                        fontFamily: "var(--font-mono)",
                        color: "var(--color-recoup-ember)",
                      }}
                    >
                      &bull;
                    </span>{" "}
                    Refunds above <strong>$250,000</strong> &mdash; 6% of
                    advance
                  </li>
                </ul>
                <p>
                  There is no interest, no per-day clock, and no additional
                  fees. If you engage Track C alongside Track B, you pay
                  both the Track B filing fee (at CBP acceptance) and the
                  Track C advance fee (at wire). The tier applicable to
                  your engagement is locked at the time of funding based on
                  the verified estimate &mdash; we do not re-tier mid-review.
                </p>
                <p>
                  The Track C purchase is <strong>non-recourse</strong>: if
                  CBP ultimately denies the refund, reduces it, or delays
                  it indefinitely, you owe Recoup nothing further. Recoup
                  takes the CBP review risk; you keep the cash. The only
                  exception is if you materially misrepresented the
                  underlying entries or had already claimed a refund on
                  them through another process, in which case the purchase
                  is unwound and the advance is repayable.
                </p>
              </Section>

              <Section num="05" title="Fees, billing, and refunds">
                <p>
                  <strong>Track A (Self-Serve Kit).</strong> Free. Always.
                  No email required to download, no credit card, no trials,
                  no future billing of any kind.
                </p>
                <p>
                  <strong>Track B (Filing).</strong> $895 or 1.5% of
                  refund, whichever is greater. Authorized at engagement
                  via SetupIntent, charged at CBP acceptance of the
                  declaration. Fully refundable if we don't
                  successfully submit your declaration for any reason
                  attributable to Recoup.
                </p>
                <p>
                  <strong>Track C (Cash Now).</strong> 10% / 8% / 6% of
                  advance amount, tiered by refund size as described in
                  Section 04. Netted at funding; never invoiced separately.
                  Non-recourse &mdash; if CBP denies the refund, the fee is
                  not clawed back from you and the 85% advance does not
                  become repayable.
                </p>
                <p>
                  We do not bill hourly, we do not charge retainers, and we
                  do not charge success fees on top of the rates above.
                  There are no hidden expenses, filing fees passed through,
                  or broker surcharges.
                </p>
              </Section>

              <Section num="06" title="Your responsibilities">
                <p>
                  You are responsible for providing accurate information
                  about your importer of record, your entries in the
                  affected window, and your banking information for refund
                  receipt. You are responsible for promptly responding to
                  any CBP Request for Information (RFI) that comes back on
                  your declaration &mdash; typically within 15 days of
                  receipt. If you go dark on an RFI, CBP may reject the
                  declaration and the filing engagement ends without refund.
                </p>
                <p>
                  You represent and warrant that the entries you submit to
                  us for filing have not already been claimed for refund
                  through another process (such as a separate protest, a
                  prior disclosure, or a drawback claim). You agree to
                  notify us promptly if you become aware of a conflict.
                </p>
              </Section>

              <Section num="07" title="Data privacy">
                <p>
                  We collect the minimum information necessary to file your
                  declaration: your company's legal name, importer of
                  record number, contact details for a responsible officer,
                  the entry numbers you submit to us, the associated CBP
                  Form 7501 records, and (for Track C only) your bank
                  routing and account numbers for refund deposit.
                </p>
                <p>
                  We do <strong>not</strong> collect or transmit individual
                  social security numbers, passport numbers, or personal
                  financial information beyond what is strictly required for
                  the CBP filing and the Cash Now advance transaction.
                </p>
                <p>
                  We use Supabase (Amazon Web Services, U.S. East region)
                  for application data storage, Stripe for payment
                  processing, and a licensed customs broker partner for CBP
                  transmission. We do not sell or share your data with any
                  third party for marketing purposes, ever. We do not place
                  advertising cookies on our website.
                </p>
              </Section>

              <Section num="08" title="Data retention and deletion">
                <p>
                  We retain engagement records for seven years after the
                  completion of your refund, to comply with CBP
                  record-keeping requirements. After that, records are
                  permanently deleted. You may request deletion of your
                  account data at any time by emailing{" "}
                  <a
                    href="mailto:support@recoup.claims"
                    style={{
                      color: "var(--color-recoup-ember)",
                    }}
                  >
                    support@recoup.claims
                  </a>
                  ; for active engagements, we will retain only the data
                  CBP requires us to keep and delete everything else.
                </p>
                <p>
                  If you download the Self-Serve Kit without submitting an
                  email address, we collect no personal information at all.
                  If you submit an email address for update notifications,
                  we retain only that email and the signup date, and you
                  may unsubscribe at any time.
                </p>
              </Section>

              <Section num="09" title="Disputes and arbitration">
                <p>
                  Any dispute arising from this engagement will be resolved
                  by binding arbitration in Delaware under the rules of the
                  American Arbitration Association, except that either
                  party may bring an individual claim in small claims court
                  if it qualifies. You and Recoup both waive the right to a
                  jury trial and the right to bring claims as a class
                  action. This arbitration provision does not apply to
                  claims by either party for injunctive or equitable relief
                  to protect confidential information or intellectual
                  property.
                </p>
              </Section>

              <Section num="10" title="Contact">
                <p>
                  Questions about these terms, data requests, or anything
                  else legal:
                </p>
                <p>
                  Recoup LLC
                  <br />
                  support@recoup.claims
                  <br />
                  For postal mail, email us first and we'll provide
                  the current correspondence address.
                </p>
                <p
                  className="text-[13px] pt-6 border-t mt-8"
                  style={{
                    color: "var(--color-recoup-muted)",
                    borderColor: "var(--color-recoup-line-soft)",
                  }}
                >
                  Last updated {LAST_UPDATED}. We will post any material
                  changes to these terms here and email anyone with an
                  active engagement at least 14 days before they take
                  effect.
                </p>
              </Section>
            </div>
          </div>
        </div>
      </main>

      <Footer />
    </>
  );
}
