"use client";

import FadeIn from "./ui/FadeIn";
import Button from "./ui/Button";

export default function CTA() {
  return (
    <section
      className="py-28 sm:py-40 relative overflow-hidden"
      style={{ background: "var(--color-recoup-ink)" }}
    >
      {/* subtle ember glow */}
      <div
        className="absolute -top-40 -right-40 w-[560px] h-[560px] rounded-full opacity-20 pointer-events-none"
        style={{
          background:
            "radial-gradient(circle, var(--color-recoup-ember) 0%, transparent 60%)",
        }}
        aria-hidden
      />
      <div className="relative max-w-[1240px] mx-auto px-6 sm:px-10">
        <FadeIn>
          <div className="flex items-center gap-3 mb-10">
            <span
              className="h-px w-10"
              style={{ background: "var(--color-recoup-ember)" }}
            />
            <span
              className="text-[11px] tracking-[0.18em] uppercase"
              style={{
                fontFamily: "var(--font-mono)",
                color: "var(--color-recoup-ember)",
              }}
            >
              Next steps
            </span>
          </div>
          <div className="grid grid-cols-12 gap-6 items-end">
            <h2
              className="col-span-12 lg:col-span-9 text-[48px] sm:text-[72px] lg:text-[96px] leading-[0.92] tracking-[-0.035em]"
              style={{
                fontFamily: "var(--font-display)",
                color: "var(--color-recoup-paper)",
              }}
            >
              The portal is open.{" "}
              <em
                style={{
                  fontStyle: "italic",
                  color: "var(--color-recoup-ember)",
                }}
              >
                The money is yours.
              </em>
            </h2>
            <div className="col-span-12 lg:col-span-3">
              <p
                className="text-[15px] leading-[1.6] mb-8"
                style={{ color: "rgba(246,242,234,0.7)" }}
              >
                Start with a free eligibility screen. No card. No retainer. No
                emails about &ldquo;next steps.&rdquo; Just a number and a next
                move.
              </p>
              <div className="flex flex-col gap-3">
                <Button
                  href="#calc"
                  variant="white"
                  className="!px-8 !py-4 !text-[14px]"
                >
                  Estimate my refund →
                </Button>
                <Button
                  href="/apply?track=filing"
                  variant="ghost"
                  className="!px-8 !py-4 !text-[14px] !text-[#F6F2EA] !border-[#F6F2EA]"
                >
                  Skip ahead — start filing
                </Button>
              </div>
            </div>
          </div>
        </FadeIn>
      </div>
    </section>
  );
}
