"use client";

import FadeIn from "./ui/FadeIn";
import Button from "./ui/Button";

const tickerItems = [
  "CAPE portal live · April 28, 2026",
  "Non-recourse advances now open",
  "Zero upfront · pay when CBP pays",
  "$4.2B in IEEPA duties held at Treasury",
  "Avg. refund window: 45 days",
  "Filed through licensed customs brokers",
];

export default function Hero() {
  return (
    <section className="relative pt-32 sm:pt-40 pb-20 sm:pb-28 overflow-hidden">
      {/* background grid */}
      <div
        className="absolute inset-0 grid-lines opacity-60 pointer-events-none"
        aria-hidden
      />
      <div
        className="absolute inset-x-0 bottom-0 h-40 pointer-events-none"
        style={{
          background:
            "linear-gradient(to bottom, transparent, var(--color-recoup-paper))",
        }}
        aria-hidden
      />

      <div className="relative max-w-[1240px] mx-auto px-6 sm:px-10">
        {/* Two-column asymmetric layout */}
        <div className="grid grid-cols-12 gap-6 items-start">
          {/* Left: headline */}
          <div className="col-span-12 lg:col-span-8">
            <FadeIn>
              <div className="flex items-center gap-3 mb-10">
                <span
                  className="h-px w-10"
                  style={{ background: "var(--color-recoup-ink)" }}
                />
                <span
                  className="text-[11px] tracking-[0.18em] uppercase"
                  style={{
                    fontFamily: "var(--font-mono)",
                    color: "var(--color-recoup-ink)",
                  }}
                >
                  FILE NO. 01 · IEEPA REFUND RECOVERY
                </span>
              </div>
            </FadeIn>

            <FadeIn delay={0.05}>
              <h1
                className="text-[56px] sm:text-[84px] lg:text-[116px] leading-[0.92] mb-10 tracking-[-0.035em]"
                style={{
                  fontFamily: "var(--font-display)",
                  color: "var(--color-recoup-ink)",
                  fontWeight: 400,
                }}
              >
                Your tariff<br />
                money. Back<br />
                <em
                  style={{
                    fontStyle: "italic",
                    color: "var(--color-recoup-ember)",
                  }}
                >
                  in your bank.
                </em>
              </h1>
            </FadeIn>

            <FadeIn delay={0.12}>
              <p
                className="text-[17px] sm:text-[19px] leading-[1.55] max-w-[560px] mb-10"
                style={{ color: "var(--color-recoup-muted)" }}
              >
                A federal court ruled IEEPA tariffs unlawful. CBP&rsquo;s CAPE
                portal is now accepting refund declarations. We file yours with
                <span
                  style={{
                    color: "var(--color-recoup-ink)",
                    fontWeight: 600,
                  }}
                >
                  {" "}zero upfront cost
                </span>
                &nbsp;— or wire you a non-recourse cash advance before CBP cuts
                the check.
              </p>
            </FadeIn>

            <FadeIn delay={0.18}>
              <div className="flex flex-col sm:flex-row gap-3 items-start sm:items-center">
                <Button
                  href="#calc"
                  variant="dark"
                  className="!px-7 !py-4 !text-[14px]"
                >
                  Estimate my refund →
                </Button>
                <Button
                  href="#how-it-works"
                  variant="ghost"
                  className="!px-5 !py-4 !text-[14px]"
                >
                  How the filing works
                </Button>
              </div>
            </FadeIn>
          </div>

          {/* Right: receipt-style info card */}
          <div className="col-span-12 lg:col-span-4 lg:pt-24">
            <FadeIn delay={0.22}>
              <div
                className="relative p-7 sm:p-8"
                style={{
                  background: "var(--color-recoup-ink)",
                  color: "#F6F2EA",
                  borderRadius: 4,
                  boxShadow:
                    "0 1px 0 rgba(10,10,11,0.1), 0 40px 80px -30px rgba(10,10,11,0.35)",
                }}
              >
                {/* Perforation top */}
                <div
                  className="absolute -top-[7px] left-0 right-0 flex justify-between px-4"
                  aria-hidden
                >
                  {Array.from({ length: 18 }).map((_, i) => (
                    <span
                      key={i}
                      className="block w-[6px] h-[14px] rounded-full"
                      style={{ background: "var(--color-recoup-paper)" }}
                    />
                  ))}
                </div>

                <div
                  className="text-[10px] uppercase tracking-[0.18em] mb-6 flex justify-between"
                  style={{
                    fontFamily: "var(--font-mono)",
                    color: "var(--color-recoup-muted2)",
                  }}
                >
                  <span>RECOUP / RECEIPT</span>
                  <span>#001</span>
                </div>

                <p
                  className="text-[14px] leading-[1.5] mb-6"
                  style={{ color: "#E4DED1" }}
                >
                  What you get — without paying a cent upfront:
                </p>

                <div
                  className="space-y-4 text-[13px]"
                  style={{ fontFamily: "var(--font-mono)" }}
                >
                  {[
                    ["01", "Eligibility audit", "free"],
                    ["02", "Entry data pull", "included"],
                    ["03", "IEEPA separation", "included"],
                    ["04", "CAPE declaration", "$0 upfront"],
                    ["05", "Filed by broker", "licensed"],
                    ["06", "Cash advance", "optional"],
                  ].map(([n, label, val]) => (
                    <div key={n} className="flex items-baseline gap-3">
                      <span style={{ color: "var(--color-recoup-ember)" }}>
                        {n}
                      </span>
                      <span className="flex-1 whitespace-nowrap">
                        {label}
                      </span>
                      <span
                        className="flex-1 border-b border-dotted mx-2"
                        style={{
                          borderColor: "rgba(246,242,234,0.2)",
                          height: 1,
                          transform: "translateY(-4px)",
                        }}
                      />
                      <span style={{ color: "#F6F2EA" }}>{val}</span>
                    </div>
                  ))}
                </div>

                <div
                  className="mt-8 pt-6 border-t"
                  style={{ borderColor: "rgba(246,242,234,0.12)" }}
                >
                  <div
                    className="flex items-baseline justify-between text-[11px] uppercase tracking-[0.14em] mb-2"
                    style={{
                      fontFamily: "var(--font-mono)",
                      color: "var(--color-recoup-muted2)",
                    }}
                  >
                    <span>Today due</span>
                    <span>USD</span>
                  </div>
                  <div
                    className="text-[44px] leading-none"
                    style={{
                      fontFamily: "var(--font-display)",
                      color: "var(--color-recoup-ember)",
                    }}
                  >
                    $0.00
                  </div>
                </div>

                {/* Perforation bottom */}
                <div
                  className="absolute -bottom-[7px] left-0 right-0 flex justify-between px-4"
                  aria-hidden
                >
                  {Array.from({ length: 18 }).map((_, i) => (
                    <span
                      key={i}
                      className="block w-[6px] h-[14px] rounded-full"
                      style={{ background: "var(--color-recoup-paper)" }}
                    />
                  ))}
                </div>
              </div>
            </FadeIn>
          </div>
        </div>
      </div>

      {/* Signature ticker */}
      <FadeIn delay={0.3}>
        <div
          className="relative mt-20 py-5 border-y overflow-hidden"
          style={{
            borderColor: "rgba(10,10,11,0.12)",
            background: "var(--color-recoup-ink)",
            color: "var(--color-recoup-paper)",
          }}
        >
          <div className="ticker-track flex whitespace-nowrap">
            {[...tickerItems, ...tickerItems].map((t, i) => (
              <span
                key={i}
                className="inline-flex items-center gap-6 px-8 text-[13px] tracking-[0.08em] uppercase"
                style={{ fontFamily: "var(--font-mono)" }}
              >
                <span
                  className="inline-block w-[6px] h-[6px] rounded-full"
                  style={{ background: "var(--color-recoup-ember)" }}
                />
                {t}
              </span>
            ))}
          </div>
        </div>
      </FadeIn>
    </section>
  );
}
