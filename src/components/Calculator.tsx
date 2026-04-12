"use client";

import { useState } from "react";
import FadeIn from "./ui/FadeIn";
import Button from "./ui/Button";

const countries = [
  { label: "China (145%)", rate: 145 },
  { label: "Vietnam (50%)", rate: 50 },
  { label: "EU / Germany (27%)", rate: 27 },
  { label: "India (26%)", rate: 26 },
  { label: "South Korea (25%)", rate: 25 },
  { label: "Japan (24%)", rate: 24 },
  { label: "UK / Brazil (20%)", rate: 20 },
  { label: "Other countries (10%+)", rate: 10 },
];

const monthRanges = [
  { label: "1–3 months", value: 3 },
  { label: "4–6 months", value: 6 },
  { label: "7–9 months", value: 9 },
  { label: "10–12 months", value: 12 },
];

function fmt(n: number) {
  return n > 0 ? "$" + Math.round(n).toLocaleString() : "—";
}

export default function Calculator() {
  const [val, setVal] = useState("");
  const [rate, setRate] = useState(0);
  const [months, setMonths] = useState(0);
  const [showAdv, setShowAdv] = useState(false);

  const raw = parseInt(val.replace(/\D/g, "")) || 0;
  const refund = raw * (rate / 100) * (months / 12) * 1.05;
  const advance = refund * 0.85;

  // Tiered Cash Now fee: 10% ≤ $50k, 8% $50–250k, 6% > $250k
  const advanceFeeRate =
    refund <= 50_000 ? 0.10 : refund <= 250_000 ? 0.08 : 0.06;
  const advanceFee = advance * advanceFeeRate;
  const cashToYou = advance - advanceFee;

  // Track B filing fee: max($895, 1.5% of refund)
  const filingFee = refund > 0 ? Math.max(895, refund * 0.015) : 0;

  const inputBase =
    "w-full py-4 text-lg bg-transparent border-0 border-b-[1.5px] border-recoup-border text-recoup-black outline-none focus:border-recoup-black transition-colors";

  return (
    <section
      id="calc"
      className="py-28 sm:py-40"
      style={{ background: "var(--color-recoup-paper)" }}
    >
      <div className="max-w-[820px] mx-auto px-6 sm:px-10">
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
              Refund estimator
            </span>
          </div>
          <h2
            className="text-[44px] sm:text-[64px] lg:text-[80px] font-normal mb-14 leading-[0.95] tracking-[-0.03em]"
            style={{
              fontFamily: "var(--font-display)",
              color: "var(--color-recoup-ink)",
            }}
          >
            See what{" "}
            <em
              style={{
                fontStyle: "italic",
                color: "var(--color-recoup-ember)",
              }}
            >
              you're owed.
            </em>
          </h2>
        </FadeIn>

        <FadeIn delay={0.1}>
          <div>
            {/* Annual import value */}
            <div className="mb-10">
              <label className="block text-[13px] font-semibold text-recoup-gray tracking-wide mb-2">
                Annual import value (USD)
              </label>
              <input
                type="text"
                placeholder="500,000"
                value={val}
                onChange={(e) => {
                  const v = e.target.value.replace(/\D/g, "");
                  setVal(v ? parseInt(v).toLocaleString() : "");
                }}
                className={inputBase}
              />
            </div>

            {/* Country */}
            <div className="mb-10">
              <label className="block text-[13px] font-semibold text-recoup-gray tracking-wide mb-2">
                Primary country of origin
              </label>
              <select
                value={rate}
                onChange={(e) => setRate(Number(e.target.value))}
                className={`${inputBase} cursor-pointer ${
                  rate ? "text-recoup-black" : "text-recoup-gray2"
                }`}
              >
                <option value={0}>Select country</option>
                {countries.map((c) => (
                  <option key={c.rate} value={c.rate}>
                    {c.label}
                  </option>
                ))}
              </select>
            </div>

            {/* Months */}
            <div className="mb-14">
              <label className="block text-[13px] font-semibold text-recoup-gray tracking-wide mb-2">
                Months imported under IEEPA
              </label>
              <select
                value={months}
                onChange={(e) => setMonths(Number(e.target.value))}
                className={`${inputBase} cursor-pointer ${
                  months ? "text-recoup-black" : "text-recoup-gray2"
                }`}
              >
                <option value={0}>Select range</option>
                {monthRanges.map((m) => (
                  <option key={m.value} value={m.value}>
                    {m.label}
                  </option>
                ))}
              </select>
            </div>

            {/* Result */}
            <div
              className="text-center py-12 border-t"
              style={{ borderColor: "var(--color-recoup-line-soft)" }}
            >
              <p
                className="text-[11px] tracking-[0.18em] uppercase mb-3"
                style={{
                  fontFamily: "var(--font-mono)",
                  color: "var(--color-recoup-muted)",
                }}
              >
                Estimated refund
              </p>
              <div
                className="text-[56px] sm:text-[72px] font-normal leading-none"
                style={{
                  fontFamily: "var(--font-display)",
                  letterSpacing: -2,
                  color: "var(--color-recoup-ink)",
                }}
              >
                {fmt(refund)}
              </div>
              <p
                className="text-[12px] mt-2"
                style={{ color: "var(--color-recoup-muted2)" }}
              >
                Includes statutory interest · Actual depends on entry data
              </p>
            </div>

            {/* Fee breakdown — Track B preview */}
            {refund > 0 && !showAdv && (
              <div
                className="mt-8 py-6 border-t grid grid-cols-2 gap-4 text-[13px]"
                style={{
                  borderColor: "var(--color-recoup-line-soft)",
                  fontFamily: "var(--font-mono)",
                }}
              >
                <div style={{ color: "var(--color-recoup-muted)" }}>
                  Track B filing fee
                  <span
                    className="block text-[10px] mt-1"
                    style={{ color: "var(--color-recoup-muted2)" }}
                  >
                    $895 or 1.5% of refund, whichever is greater
                  </span>
                </div>
                <div
                  className="text-right"
                  style={{ color: "var(--color-recoup-ink)" }}
                >
                  −{fmt(filingFee)}
                  <span
                    className="block text-[10px] mt-1"
                    style={{ color: "var(--color-recoup-ember)" }}
                  >
                    you keep {fmt(refund - filingFee)}
                  </span>
                </div>
              </div>
            )}

            {/* Advance toggle + CTA */}
            {refund > 0 && (
              <div className="text-center pt-8">
                <button
                  onClick={() => setShowAdv(!showAdv)}
                  className={`inline-flex items-center gap-3 cursor-pointer px-6 py-3 transition-all border ${
                    showAdv ? "" : ""
                  }`}
                  style={{
                    borderColor: showAdv
                      ? "var(--color-recoup-ink)"
                      : "var(--color-recoup-line-soft)",
                    background: showAdv
                      ? "var(--color-recoup-paper2)"
                      : "transparent",
                  }}
                >
                  <div
                    className="w-[18px] h-[18px] border-2 flex items-center justify-center transition-all"
                    style={{
                      background: showAdv
                        ? "var(--color-recoup-ember)"
                        : "transparent",
                      borderColor: showAdv
                        ? "var(--color-recoup-ember)"
                        : "var(--color-recoup-muted2)",
                    }}
                  >
                    {showAdv && (
                      <span
                        className="text-[11px] font-extrabold"
                        style={{ color: "var(--color-recoup-ink)" }}
                      >
                        ✓
                      </span>
                    )}
                  </div>
                  <span
                    className="text-[13px] font-medium"
                    style={{
                      fontFamily: "var(--font-mono)",
                      color: "var(--color-recoup-ink)",
                      letterSpacing: "0.02em",
                    }}
                  >
                    I want my money now (Track C)
                  </span>
                </button>

                {showAdv && (
                  <div
                    className="mt-10 pt-10 border-t text-left"
                    style={{ borderColor: "var(--color-recoup-line-soft)" }}
                  >
                    <p
                      className="text-[11px] tracking-[0.18em] uppercase mb-6 text-center"
                      style={{
                        fontFamily: "var(--font-mono)",
                        color: "var(--color-recoup-ember)",
                      }}
                    >
                      Cash Now breakdown
                    </p>
                    <div
                      className="space-y-4"
                      style={{ fontFamily: "var(--font-mono)" }}
                    >
                      {[
                        [
                          "Advance (85% of refund)",
                          fmt(advance),
                          "paid to you within 72 hours",
                        ],
                        [
                          `Cash Now fee (${Math.round(
                            advanceFeeRate * 100
                          )}% of advance)`,
                          "−" + fmt(advanceFee),
                          refund <= 50_000
                            ? "tier 1 · refunds up to $50k"
                            : refund <= 250_000
                            ? "tier 2 · refunds $50k–$250k"
                            : "tier 3 · refunds above $250k",
                        ],
                      ].map(([label, value, sub]) => (
                        <div
                          key={label}
                          className="flex items-baseline justify-between py-3 border-b"
                          style={{
                            borderColor: "var(--color-recoup-line-soft)",
                          }}
                        >
                          <div
                            className="text-[12px]"
                            style={{ color: "var(--color-recoup-muted)" }}
                          >
                            {label}
                            <span
                              className="block text-[10px] mt-0.5"
                              style={{ color: "var(--color-recoup-muted2)" }}
                            >
                              {sub}
                            </span>
                          </div>
                          <div
                            className="text-[14px]"
                            style={{ color: "var(--color-recoup-ink)" }}
                          >
                            {value}
                          </div>
                        </div>
                      ))}
                      <div className="flex items-baseline justify-between pt-4">
                        <div
                          className="text-[12px] uppercase tracking-[0.14em]"
                          style={{ color: "var(--color-recoup-ink)" }}
                        >
                          You walk away with
                        </div>
                        <div
                          className="text-[32px] sm:text-[40px] leading-none"
                          style={{
                            fontFamily: "var(--font-display)",
                            color: "var(--color-recoup-ember)",
                            letterSpacing: -1,
                          }}
                        >
                          {fmt(cashToYou)}
                        </div>
                      </div>
                    </div>
                  </div>
                )}

                <div className="mt-12">
                  <Button
                    href={`/apply?track=${
                      showAdv ? "advance" : "filing"
                    }&estimate=${Math.round(refund)}`}
                    variant="dark"
                    className="!px-10 !py-4 !text-base"
                  >
                    {showAdv ? "Apply for Cash Now →" : "Start my filing →"}
                  </Button>
                </div>
              </div>
            )}
          </div>
        </FadeIn>
      </div>
    </section>
  );
}
