"use client";

import FadeIn from "./ui/FadeIn";
import Button from "./ui/Button";
import { Check } from "lucide-react";

const tiers = [
  {
    tier: "Essentials",
    price: "297",
    popular: false,
    features: [
      "ACE portal setup",
      "ACH enrollment",
      "Video walkthrough",
      "Eligibility check",
      "Email support",
    ],
  },
  {
    tier: "Full Filing",
    price: "1,497",
    popular: true,
    features: [
      "Everything in Essentials",
      "Entry data pull & audit",
      "IEEPA duty separation",
      "Interest calculation",
      "CSV declaration prep",
      "Phone + email support",
    ],
  },
  {
    tier: "Priority",
    price: "2,497",
    popular: false,
    features: [
      "Everything in Full Filing",
      "Day-one CAPE submission",
      "Liquidation monitoring",
      "Error correction",
      "Refund tracking",
      "Dedicated manager",
    ],
  },
];

export default function Pricing() {
  return (
    <section id="pricing" className="py-28 sm:py-40 bg-recoup-light">
      <div className="max-w-[1120px] mx-auto px-6 sm:px-10">
        <FadeIn>
          <p
            className="text-[13px] font-semibold tracking-[1.5px] uppercase mb-4 text-center"
            style={{ color: "var(--color-recoup-eyebrow)" }}
          >
            Pricing
          </p>
          <h2
            className="text-[36px] sm:text-[48px] lg:text-[56px] font-normal text-center mb-4"
            style={{ fontFamily: "var(--font-serif)", letterSpacing: -1.5 }}
          >
            Flat fee. Always.
          </h2>
          <p className="text-[18px] text-recoup-gray text-center mx-auto mb-16 sm:mb-[72px] max-w-[460px] leading-relaxed">
            We never take a percentage of your refund. Pick the level that fits.
          </p>
        </FadeIn>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          {tiers.map((p, i) => (
            <FadeIn key={i} delay={i * 0.08}>
              <div
                className={`rounded-2xl p-9 sm:p-10 h-full flex flex-col relative ${
                  p.popular
                    ? "bg-recoup-black text-white"
                    : "bg-white text-recoup-black"
                }`}
              >
                {p.popular && (
                  <div className="absolute -top-3 left-1/2 -translate-x-1/2 bg-recoup-black text-white text-[10px] font-bold tracking-[1.5px] uppercase px-4 py-1.5 rounded-lg border border-recoup-gray2">
                    Most popular
                  </div>
                )}
                <p
                  className={`text-[13px] font-semibold tracking-[1px] uppercase mb-2 ${
                    p.popular ? "text-recoup-gray2" : "text-recoup-gray"
                  }`}
                >
                  {p.tier}
                </p>
                <div
                  className="text-[44px] sm:text-[52px] font-normal mb-1"
                  style={{
                    fontFamily: "var(--font-serif)",
                    letterSpacing: -1.5,
                  }}
                >
                  <span className="text-[22px] align-super relative -top-3">
                    $
                  </span>
                  {p.price}
                </div>
                <p
                  className={`text-[14px] mb-9 ${
                    p.popular ? "text-recoup-gray2" : "text-recoup-gray"
                  }`}
                >
                  one-time
                </p>
                <div className="flex-1">
                  {p.features.map((f, j) => (
                    <div
                      key={j}
                      className={`flex items-start gap-2.5 py-2 text-[14px] ${
                        p.popular ? "text-recoup-gray2" : "text-recoup-gray"
                      }`}
                    >
                      <Check
                        size={15}
                        className={`flex-shrink-0 mt-0.5 ${
                          p.popular ? "text-white" : "text-recoup-green"
                        }`}
                      />
                      <span>{f}</span>
                    </div>
                  ))}
                </div>
                <Button
                  href="#calc"
                  variant={p.popular ? "white" : "ghost"}
                  className="!mt-8 w-full !text-center"
                >
                  Get started →
                </Button>
              </div>
            </FadeIn>
          ))}
        </div>

        <FadeIn delay={0.3}>
          <div className="text-center mt-12 py-6 px-8 bg-recoup-green-bg rounded-xl">
            <p className="text-[16px] text-recoup-green font-medium m-0">
              On a $500,000 refund, a 30% advisory fee costs $150,000. Full
              Filing costs $1,497.{" "}
              <strong>You save $148,503.</strong>
            </p>
          </div>
        </FadeIn>
      </div>
    </section>
  );
}
