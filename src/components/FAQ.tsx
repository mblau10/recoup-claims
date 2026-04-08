"use client";

import { useState } from "react";
import FadeIn from "./ui/FadeIn";

const faqs = [
  [
    "Am I eligible for a refund?",
    "If you imported goods into the U.S. between February 2025 and February 2026 from China, the EU, Vietnam, India, or 50+ other countries, you likely paid IEEPA tariffs and are eligible for a refund.",
  ],
  [
    "Do I need a lawyer?",
    "For the CAPE portal filing, no. CBP built a self-service system. We handle the data preparation and declaration formatting. If your situation requires litigation, we'll tell you directly.",
  ],
  [
    "How does advance funding work?",
    "We verify your refund amount, then purchase your claim at up to 75% of its value. You receive the cash in days. When CBP pays, we collect. Non-recourse — if CBP reduces the refund, we absorb the risk.",
  ],
  [
    "Why flat fee, not a percentage?",
    "Preparing a declaration for a $50K refund takes the same work as $5M. Percentage pricing is a legacy model. We price for the work.",
  ],
  [
    "When will CBP issue refunds?",
    "The CAPE portal opens late April 2026. CBP estimates up to 45 days from filing to refund. If you choose advance funding, you get paid in days regardless.",
  ],
  [
    "Is Recoup a law firm or broker?",
    "No. We're an administrative preparation service. We work with licensed customs brokers for all CBP filings. We don't provide legal advice.",
  ],
];

function FaqItem({ q, a }: { q: string; a: string }) {
  const [open, setOpen] = useState(false);

  return (
    <div className="border-b border-recoup-border py-7">
      <button
        onClick={() => setOpen(!open)}
        className="flex justify-between items-center w-full text-left cursor-pointer gap-5 bg-transparent border-0 p-0"
      >
        <span
          className="text-[18px] sm:text-[20px] font-normal"
          style={{ fontFamily: "var(--font-serif)", letterSpacing: -0.3 }}
        >
          {q}
        </span>
        <span
          className="text-[22px] text-recoup-gray2 font-light flex-shrink-0 w-6 text-center transition-transform duration-300"
          style={{ transform: open ? "rotate(45deg)" : "none" }}
        >
          +
        </span>
      </button>
      <div
        className="overflow-hidden transition-all duration-400"
        style={{ maxHeight: open ? 200 : 0, opacity: open ? 1 : 0 }}
      >
        <p className="text-[15px] text-recoup-gray leading-relaxed pt-4 m-0">
          {a}
        </p>
      </div>
    </div>
  );
}

export default function FAQ() {
  return (
    <section id="faq" className="py-28 sm:py-40">
      <div className="max-w-[680px] mx-auto px-6 sm:px-10">
        <FadeIn>
          <p
            className="text-[13px] font-semibold tracking-[1.5px] uppercase mb-4"
            style={{ color: "var(--color-recoup-eyebrow)" }}
          >
            FAQ
          </p>
          <h2
            className="text-[36px] sm:text-[48px] font-normal mb-12 sm:mb-14 leading-[1.15]"
            style={{ fontFamily: "var(--font-serif)", letterSpacing: -1 }}
          >
            Common questions.
          </h2>
        </FadeIn>
        {faqs.map(([q, a], i) => (
          <FadeIn key={i} delay={i * 0.04}>
            <FaqItem q={q} a={a} />
          </FadeIn>
        ))}
      </div>
    </section>
  );
}
