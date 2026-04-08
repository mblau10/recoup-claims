"use client";

import FadeIn from "./ui/FadeIn";
import Button from "./ui/Button";
import { Check } from "lucide-react";

const trustBullets = [
  "Licensed customs brokers",
  "Flat fee — no percentage",
  "Non-recourse advance available",
  "Filed through CBP's CAPE portal",
];

export default function Hero() {
  return (
    <section className="pt-36 sm:pt-44 pb-20 sm:pb-28 text-center">
      <div className="max-w-[1120px] mx-auto px-6 sm:px-10">
        <FadeIn>
          <p
            className="text-[13px] font-semibold tracking-[1.5px] uppercase mb-6"
            style={{ color: "var(--color-recoup-eyebrow)" }}
          >
            IEEPA tariff recovery
          </p>
        </FadeIn>

        <FadeIn delay={0.08}>
          <h1
            className="text-[44px] sm:text-[64px] lg:text-[80px] font-normal leading-[1.08] mx-auto mb-8 max-w-[820px]"
            style={{ fontFamily: "var(--font-serif)", letterSpacing: -2.5 }}
          >
            Your IEEPA tariff duties may be fully refundable.
          </h1>
        </FadeIn>

        <FadeIn delay={0.16}>
          <p className="text-lg sm:text-xl text-recoup-gray leading-relaxed max-w-[540px] mx-auto mb-10">
            A federal court ruled IEEPA tariffs unlawful. CBP is accepting refund
            declarations through the CAPE portal. We prepare yours — or advance the
            cash now.
          </p>
        </FadeIn>

        <FadeIn delay={0.24}>
          <div className="flex flex-col sm:flex-row gap-4 justify-center items-center mb-14">
            <Button href="#calc" variant="dark" className="!px-8 !py-3.5 !text-base">
              Estimate my refund →
            </Button>
            <Button href="#how-it-works" variant="ghost">
              Learn more
            </Button>
          </div>
        </FadeIn>

        <FadeIn delay={0.32}>
          <div className="flex flex-wrap justify-center gap-x-8 gap-y-3">
            {trustBullets.map((b) => (
              <div key={b} className="flex items-center gap-2 text-[14px] text-recoup-gray">
                <Check size={16} className="text-recoup-green flex-shrink-0" />
                <span>{b}</span>
              </div>
            ))}
          </div>
        </FadeIn>
      </div>
    </section>
  );
}
