"use client";

import FadeIn from "./ui/FadeIn";
import Button from "./ui/Button";

const options = [
  {
    n: "01",
    title: "File through CAPE",
    sub: "We file. You keep every dollar.",
    desc:
      "Full CAPE declaration preparation, ACE enrollment, IEEPA duty separation, interest calculation — filed through a licensed customs broker. Your refund arrives direct from Treasury.",
    price: "$0 upfront",
    note: "Invoiced at $895/declaration after CBP accepts",
    btn: "Start filing",
    dark: false,
  },
  {
    n: "02",
    title: "Take the advance",
    sub: "Money in 72 hours.",
    desc:
      "Skip the 45-day wait. We wire up to 85% of your projected refund within 72 hours and collect direct from Treasury when CBP pays. Non-recourse — we take the timing risk, not you.",
    price: "Up to 85%",
    note: "Fee 8.5% of advance. No personal guarantee.",
    btn: "Get advanced",
    dark: true,
  },
];

export default function TwoOptions() {
  return (
    <section
      id="advance"
      className="py-28 sm:py-40"
      style={{ background: "var(--color-recoup-paper)" }}
    >
      <div className="max-w-[1240px] mx-auto px-6 sm:px-10">
        <FadeIn>
          <div className="flex items-center gap-3 mb-8">
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
              FILE NO. 02 · TWO ROUTES TO YOUR MONEY
            </span>
          </div>
          <div className="grid grid-cols-12 gap-6 mb-16">
            <h2
              className="col-span-12 lg:col-span-9 text-[44px] sm:text-[64px] lg:text-[80px] leading-[0.95] tracking-[-0.03em]"
              style={{
                fontFamily: "var(--font-display)",
                color: "var(--color-recoup-ink)",
              }}
            >
              File the claim.{" "}
              <em
                style={{
                  fontStyle: "italic",
                  color: "var(--color-recoup-ember)",
                }}
              >
                Or get paid today.
              </em>
            </h2>
          </div>
        </FadeIn>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-0 border-t border-b divide-x md:divide-x"
          style={{ borderColor: "var(--color-recoup-ink)" }}
        >
          {options.map((o, i) => (
            <FadeIn key={i} delay={i * 0.1}>
              <div
                className="p-10 sm:p-14 min-h-[480px] flex flex-col relative"
                style={{
                  background: o.dark ? "var(--color-recoup-ink)" : "transparent",
                  color: o.dark ? "var(--color-recoup-paper)" : "var(--color-recoup-ink)",
                  borderColor: "var(--color-recoup-ink)",
                }}
              >
                <div
                  className="flex items-center gap-3 mb-10 text-[11px] tracking-[0.18em] uppercase"
                  style={{
                    fontFamily: "var(--font-mono)",
                    color: o.dark ? "var(--color-recoup-muted2)" : "var(--color-recoup-muted)",
                  }}
                >
                  <span
                    style={{
                      color: "var(--color-recoup-ember)",
                    }}
                  >
                    {o.n}
                  </span>
                  <span>{o.title}</span>
                </div>

                <h3
                  className="text-[36px] sm:text-[48px] leading-[1.0] mb-6 tracking-[-0.02em]"
                  style={{
                    fontFamily: "var(--font-display)",
                  }}
                >
                  {o.sub}
                </h3>
                <p
                  className="text-[15px] leading-[1.65] mb-10 max-w-[440px]"
                  style={{
                    color: o.dark
                      ? "rgba(246,242,234,0.72)"
                      : "var(--color-recoup-muted)",
                  }}
                >
                  {o.desc}
                </p>
                <div className="mt-auto">
                  <div
                    className="text-[48px] sm:text-[60px] leading-none mb-2"
                    style={{
                      fontFamily: "var(--font-display)",
                      color: "var(--color-recoup-ember)",
                    }}
                  >
                    {o.price}
                  </div>
                  <div
                    className="text-[12px] mb-8"
                    style={{
                      fontFamily: "var(--font-mono)",
                      color: o.dark
                        ? "rgba(246,242,234,0.55)"
                        : "var(--color-recoup-muted)",
                    }}
                  >
                    {o.note}
                  </div>
                  <Button
                    href="#calc"
                    variant={o.dark ? "white" : "dark"}
                  >
                    {o.btn} →
                  </Button>
                </div>
              </div>
            </FadeIn>
          ))}
        </div>
      </div>
    </section>
  );
}
