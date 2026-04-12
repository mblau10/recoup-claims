export default function Footer() {
  return (
    <footer
      className="py-16 border-t"
      style={{
        background: "var(--color-recoup-paper)",
        borderColor: "rgba(10,10,11,0.12)",
      }}
    >
      <div className="max-w-[1240px] mx-auto px-6 sm:px-10">
        <div className="grid grid-cols-12 gap-6 mb-10">
          <div className="col-span-12 sm:col-span-5">
            <div className="flex items-baseline gap-2 mb-4">
              <span
                className="text-[28px] leading-none"
                style={{
                  fontFamily: "var(--font-display)",
                  color: "var(--color-recoup-ink)",
                  letterSpacing: -0.5,
                }}
              >
                recoup
              </span>
              <span
                className="text-[10px] uppercase tracking-[0.14em]"
                style={{
                  fontFamily: "var(--font-mono)",
                  color: "var(--color-recoup-ember)",
                }}
              >
                .claims
              </span>
            </div>
            <p
              className="text-[13px] max-w-[340px] leading-[1.6]"
              style={{ color: "var(--color-recoup-muted)" }}
            >
              Administrative preparation for IEEPA tariff refund recovery
              through CBP's CAPE portal. Not a law firm. All CBP filings
              executed through licensed customs brokers.
            </p>
          </div>
          <div className="col-span-6 sm:col-span-3">
            <div
              className="text-[10px] tracking-[0.18em] uppercase mb-4"
              style={{
                fontFamily: "var(--font-mono)",
                color: "var(--color-recoup-muted)",
              }}
            >
              SITE
            </div>
            <ul className="space-y-2 list-none p-0">
              {[
                ["How it works", "/#how-it-works"],
                ["Pricing", "/#pricing"],
                ["Cash Now advance", "/#advance"],
                ["FAQ", "/#faq"],
                ["Self-Serve Kit", "/kit"],
                ["Start filing", "/apply?track=filing"],
                ["Legal & Privacy", "/legal"],
              ].map(([l, h]) => (
                <li key={l}>
                  <a
                    href={h}
                    className="text-[13px] no-underline"
                    style={{
                      fontFamily: "var(--font-mono)",
                      color: "var(--color-recoup-ink)",
                    }}
                  >
                    {l}
                  </a>
                </li>
              ))}
            </ul>
          </div>
          <div className="col-span-6 sm:col-span-4">
            <div
              className="text-[10px] tracking-[0.18em] uppercase mb-4"
              style={{
                fontFamily: "var(--font-mono)",
                color: "var(--color-recoup-muted)",
              }}
            >
              LEGAL
            </div>
            <p
              className="text-[12px] leading-[1.55]"
              style={{ color: "var(--color-recoup-muted)" }}
            >
              Recoup is an administrative preparation service and does not
              provide legal, tax, or investment advice. Refund eligibility
              depends on CBP's review of entry-level data. Cash advances
              are non-recourse purchase-of-claim transactions, not loans.
            </p>
          </div>
        </div>
        <div
          className="pt-8 border-t flex flex-col sm:flex-row justify-between gap-4 text-[11px]"
          style={{
            borderColor: "rgba(10,10,11,0.12)",
            fontFamily: "var(--font-mono)",
            color: "var(--color-recoup-muted)",
          }}
        >
          <span>© 2026 RECOUP LLC · RECOUP.CLAIMS</span>
          <span>
            <a
              href="/legal"
              className="no-underline"
              style={{ color: "var(--color-recoup-muted)" }}
            >
              Terms &amp; Privacy
            </a>
            {" · "}
            <a
              href="mailto:support@recoup.claims"
              className="no-underline"
              style={{ color: "var(--color-recoup-muted)" }}
            >
              support@recoup.claims
            </a>
          </span>
        </div>
      </div>
    </footer>
  );
}
