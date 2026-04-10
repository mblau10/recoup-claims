"use client";

import FadeIn from "./ui/FadeIn";
import Button from "./ui/Button";
import { ArrowUpRight } from "lucide-react";

/*
  Unique pricing model — no tiers, no "most popular", no $297/$1,497/$2,497.
  Three independent tracks the importer composes à la carte:

  TRACK A — "Self-Serve Kit"       : $0 (free, lead magnet)
  TRACK B — "Pay When CBP Pays"    : $0 upfront + $895 per CAPE declaration, invoiced after CBP accepts
  TRACK C — "Cash Now" advance     : 0 upfront, deducted from advance (8.5% of advance amount)

  Plus a transparent line-item rate card so nothing is hidden.
*/

const tracks = [
  {
    letter: "A",
    name: "Self-Serve Kit",
    tag: "free forever",
    headline: "Do it yourself",
    body:
      "Everything you need to prepare a CAPE declaration on your own — CSV validator, ACE setup walkthrough, ACH enrollment guide, IEEPA/Section 301 separation template. No account required.",
    price: "$0",
    unit: "/forever",
    cta: "Download the kit",
    highlight: false,
  },
  {
    letter: "B",
    name: "Pay When CBP Pays",
    tag: "zero upfront",
    headline: "We file. Invoice later.",
    body:
      "We prepare your entry data, draft the CAPE declaration, and file it through a licensed customs broker. You pay nothing until CBP accepts the filing. No retainer. No percentage of your refund. Ever.",
    price: "$895",
    unit: "/declaration",
    cta: "Start filing",
    highlight: true,
    footnote:
      "Invoiced only after CBP stamps your declaration accepted. One price per declaration — flat, regardless of refund size.",
  },
  {
    letter: "C",
    name: "Cash Now Advance",
    tag: "non-recourse",
    headline: "Money in 72 hours",
    body:
      "Skip the 45-day CBP wait. We wire up to 85% of your projected refund in 72 hours, then collect directly from Treasury. If CBP reduces the refund, we absorb it — not you.",
    price: "8.5%",
    unit: "of advance",
    cta: "Get advanced",
    highlight: false,
    footnote:
      "Fee is deducted from the advance at funding. No personal guarantee. No interest. No monthly payments.",
  },
];

const rateCard = [
  ["Eligibility screen", "$0"],
  ["Entry data pull (ACE)", "$0"],
  ["IEEPA duty separation", "$0"],
  ["CAPE declaration prep", "$895", "when CBP accepts"],
  ["Correction resubmission", "$0", "if CBP rejects ours"],
  ["Liquidation monitoring", "$0", "first 120 days"],
  ["Cash advance", "8.5%", "of advance amount"],
  ["Multi-entity consolidation", "$200", "per additional EIN"],
  ["Post-payment audit", "$0", "only if refund is short"],
];

export default function Pricing() {
  return (
    <section
      id="pricing"
      className="py-28 sm:py-40 relative"
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
              FILE NO. 04 · PRICING
            </span>
          </div>
          <div className="grid grid-cols-12 gap-6 mb-16">
            <h2
              className="col-span-12 lg:col-span-8 text-[44px] sm:text-[64px] lg:text-[80px] leading-[0.95] tracking-[-0.03em]"
              style={{
                fontFamily: "var(--font-display)",
                color: "var(--color-recoup-ink)",
              }}
            >
              No tiers. No retainers.{" "}
              <em
                style={{
                  fontStyle: "italic",
                  color: "var(--color-recoup-ember)",
                }}
              >
                No percentage of your refund.
              </em>
            </h2>
            <p
              className="col-span-12 lg:col-span-4 lg:pt-6 text-[16px] leading-[1.6]"
              style={{ color: "var(--color-recoup-muted)" }}
            >
              Three independent tracks. Pick one, pick all three, pick none.
              The rate card below is the entire rate card — if it&rsquo;s not
              listed, we don&rsquo;t charge for it.
            </p>
          </div>
        </FadeIn>

        {/* Three tracks — asymmetric list, not a cards grid */}
        <div
          className="border-t border-b divide-y"
          style={{
            borderColor: "var(--color-recoup-ink)",
          }}
        >
          {tracks.map((t, i) => (
            <FadeIn key={t.letter} delay={i * 0.06}>
              <div
                className="grid grid-cols-12 gap-6 py-10 sm:py-14 items-start"
                style={{
                  borderColor: "var(--color-recoup-line-soft)",
                }}
              >
                {/* Letter marker */}
                <div className="col-span-2 sm:col-span-1">
                  <div
                    className="text-[60px] sm:text-[80px] leading-[0.8]"
                    style={{
                      fontFamily: "var(--font-display)",
                      color: t.highlight
                        ? "var(--color-recoup-ember)"
                        : "var(--color-recoup-ink)",
                      fontStyle: "italic",
                    }}
                  >
                    {t.letter}
                  </div>
                </div>

                {/* Name + copy */}
                <div className="col-span-10 sm:col-span-6">
                  <div
                    className="flex items-center gap-3 mb-3 text-[10px] tracking-[0.18em] uppercase"
                    style={{
                      fontFamily: "var(--font-mono)",
                      color: "var(--color-recoup-muted)",
                    }}
                  >
                    <span>Track {t.letter}</span>
                    <span>·</span>
                    <span
                      style={{
                        color: t.highlight
                          ? "var(--color-recoup-ember)"
                          : "var(--color-recoup-muted)",
                      }}
                    >
                      {t.tag}
                    </span>
                  </div>
                  <h3
                    className="text-[28px] sm:text-[36px] leading-[1.05] mb-4"
                    style={{
                      fontFamily: "var(--font-display)",
                      color: "var(--color-recoup-ink)",
                    }}
                  >
                    {t.headline}
                  </h3>
                  <p
                    className="text-[15px] leading-[1.65] max-w-[520px]"
                    style={{ color: "var(--color-recoup-muted)" }}
                  >
                    {t.body}
                  </p>
                  {t.footnote && (
                    <p
                      className="mt-4 text-[12px] leading-[1.5] max-w-[520px]"
                      style={{
                        fontFamily: "var(--font-mono)",
                        color: "var(--color-recoup-muted2)",
                      }}
                    >
                      ↳ {t.footnote}
                    </p>
                  )}
                </div>

                {/* Price + CTA */}
                <div className="col-span-12 sm:col-span-5 sm:text-right">
                  <div className="flex sm:justify-end items-baseline gap-2 mb-2">
                    <div
                      className="text-[56px] sm:text-[72px] leading-none"
                      style={{
                        fontFamily: "var(--font-display)",
                        color: t.highlight
                          ? "var(--color-recoup-ember)"
                          : "var(--color-recoup-ink)",
                      }}
                    >
                      {t.price}
                    </div>
                    <div
                      className="text-[13px]"
                      style={{
                        fontFamily: "var(--font-mono)",
                        color: "var(--color-recoup-muted)",
                      }}
                    >
                      {t.unit}
                    </div>
                  </div>
                  <div className="sm:flex sm:justify-end mt-6">
                    <Button
                      href="#calc"
                      variant={t.highlight ? "dark" : "ghost"}
                      className="!text-[13px]"
                    >
                      {t.cta} →
                    </Button>
                  </div>
                </div>
              </div>
            </FadeIn>
          ))}
        </div>

        {/* Rate card — full transparency */}
        <FadeIn delay={0.2}>
          <div className="mt-24 grid grid-cols-12 gap-6">
            <div className="col-span-12 lg:col-span-4">
              <div
                className="text-[11px] tracking-[0.18em] uppercase mb-4"
                style={{
                  fontFamily: "var(--font-mono)",
                  color: "var(--color-recoup-muted)",
                }}
              >
                APPENDIX · RATE CARD
              </div>
              <h3
                className="text-[30px] sm:text-[40px] leading-[1.05] mb-4"
                style={{
                  fontFamily: "var(--font-display)",
                  color: "var(--color-recoup-ink)",
                }}
              >
                The entire price list,{" "}
                <em style={{ color: "var(--color-recoup-ember)" }}>
                  in one column.
                </em>
              </h3>
              <p
                className="text-[14px] leading-[1.6] max-w-[320px]"
                style={{ color: "var(--color-recoup-muted)" }}
              >
                If it&rsquo;s not in this list, we don&rsquo;t charge for it.
                If we ever add a line, we&rsquo;ll grandfather every active
                filing at the old rate.
              </p>
            </div>
            <div className="col-span-12 lg:col-span-8">
              <div
                className="border-t"
                style={{ borderColor: "var(--color-recoup-ink)" }}
              >
                {rateCard.map((row, i) => (
                  <div
                    key={i}
                    className="grid grid-cols-12 gap-2 py-5 border-b items-baseline"
                    style={{
                      borderColor: "var(--color-recoup-line-soft)",
                      fontFamily: "var(--font-mono)",
                    }}
                  >
                    <div
                      className="col-span-1 text-[11px]"
                      style={{ color: "var(--color-recoup-muted2)" }}
                    >
                      {String(i + 1).padStart(2, "0")}
                    </div>
                    <div
                      className="col-span-6 sm:col-span-7 text-[14px]"
                      style={{ color: "var(--color-recoup-ink)" }}
                    >
                      {row[0]}
                    </div>
                    <div
                      className="col-span-5 sm:col-span-4 text-right text-[14px]"
                      style={{
                        color:
                          row[1] === "$0"
                            ? "var(--color-recoup-ember)"
                            : "var(--color-recoup-ink)",
                      }}
                    >
                      {row[1]}
                      {row[2] && (
                        <span
                          className="block text-[10px] mt-0.5 uppercase tracking-[0.1em]"
                          style={{ color: "var(--color-recoup-muted2)" }}
                        >
                          {row[2]}
                        </span>
                      )}
                    </div>
                  </div>
                ))}
                <div className="flex items-center gap-2 pt-6">
                  <ArrowUpRight
                    size={14}
                    style={{ color: "var(--color-recoup-ember)" }}
                  />
                  <span
                    className="text-[12px]"
                    style={{
                      fontFamily: "var(--font-mono)",
                      color: "var(--color-recoup-muted)",
                    }}
                  >
                    Updated April 2026 · Locked for the life of your filing
                  </span>
                </div>
              </div>
            </div>
          </div>
        </FadeIn>
      </div>
    </section>
  );
}
