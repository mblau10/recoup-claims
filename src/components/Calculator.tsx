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
              FILE NO. 05 · REFUND ESTIMATOR
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
              you&rsquo;re owed.
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
            <div className="text-center py-12 border-t border-recoup-border">
              <p className="text-[14px] text-recoup-gray mb-2">
                Estimated refund
              </p>
              <div
                className="text-[56px] sm:text-[72px] font-normal leading-none"
                style={{ fontFamily: "var(--font-serif)", letterSpacing: -2 }}
              >
                {fmt(refund)}
              </div>
              <p className="text-[13px] text-recoup-gray2 mt-2">
                Includes estimated interest · Actual depends on entry data
              </p>
            </div>

            {/* Advance toggle + CTA */}
            {refund > 0 && (
              <div className="text-center pt-8">
                <button
                  onClick={() => setShowAdv(!showAdv)}
                  className={`inline-flex items-center gap-3 cursor-pointer px-6 py-3 rounded-lg transition-all border ${
                    showAdv
                      ? "bg-recoup-light border-recoup-black"
                      : "bg-recoup-light border-transparent"
                  }`}
                >
                  <div
                    className={`w-[18px] h-[18px] rounded-[4px] border-2 flex items-center justify-center transition-all ${
                      showAdv
                        ? "bg-recoup-black border-recoup-black"
                        : "bg-transparent border-recoup-gray2"
                    }`}
                  >
                    {showAdv && (
                      <span className="text-white text-[11px] font-extrabold">
                        ✓
                      </span>
                    )}
                  </div>
                  <span className="text-[14px] font-medium text-recoup-black">
                    I want my money now
                  </span>
                </button>

                {showAdv && (
                  <div className="mt-8 pt-8 border-t border-recoup-border">
                    <p className="text-[14px] text-recoup-gray mb-2">
                      Advance amount (85%)
                    </p>
                    <div
                      className="text-[48px] sm:text-[56px] font-normal text-recoup-black"
                      style={{
                        fontFamily: "var(--font-serif)",
                        letterSpacing: -1.5,
                      }}
                    >
                      {fmt(advance)}
                    </div>
                    <p className="text-[14px] text-recoup-gray2 mt-2">
                      Deposited in days, not months
                    </p>
                  </div>
                )}

                <div className="mt-10">
                  <Button
                    href={`/apply?estimate=${Math.round(refund)}`}
                    variant="dark"
                    className="!px-10 !py-4 !text-base"
                  >
                    {showAdv ? "Apply for advance →" : "Start my filing →"}
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
