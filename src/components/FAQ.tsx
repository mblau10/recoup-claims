"use client";

import { useState } from "react";
import FadeIn from "./ui/FadeIn";

const faqs = [
  [
    "Am I eligible for a refund?",
    "If you imported goods into the U.S. between February 2025 and February 2026 from China, the EU, Vietnam, India, or 50+ other countries, you likely paid IEEPA tariffs and are eligible for a refund.",
  ],
  [
    "What does “pay when CBP pays” actually mean?",
    "We do all the work — eligibility screen, entry data pull, IEEPA separation, CAPE declaration drafting, filing through a licensed customs broker — and only invoice you after CBP stamps your declaration accepted. If CBP rejects and we need to resubmit, the correction is free. You never write us a check before Treasury writes you one.",
  ],
  [
    "How does Recoup's filing fee actually work?",
    "It's $895 or 1.5% of the refund, whichever is greater. In practice that means small refunds (anything up to roughly $60k) pay the flat $895 floor, and larger refunds pay 1.5% of the refund. A $100k refund pays $1,500; a $500k refund pays $7,500. We never charge hourly, never charge a retainer, and never bill until CBP has accepted the declaration.",
  ],
  [
    "How does Cash Now work and what does it cost?",
    "If you don't want to wait 45 days for Treasury, we verify your refund and wire up to 85% of it within 72 hours. The fee is tiered by refund size: 10% of the advance for refunds up to $50k, 8% for $50k–$250k, and 6% above $250k. It's netted at funding — no interest, no monthly payments, no personal guarantee. And it's non-recourse: if CBP ultimately reduces or denies your refund, we absorb the shortfall, not you.",
  ],
  [
    "Do I need a lawyer?",
    "For a standard CAPE filing, no — CBP built a self-service system. We handle the data preparation and declaration formatting. If your situation needs CIT litigation, we'll tell you directly and refer you at no markup.",
  ],
  [
    "When will CBP issue refunds?",
    "The CAPE portal opens late April 2026. CBP estimates up to 45 days from filing to refund. If you choose Cash Now, you get paid in days regardless of CBP's timeline.",
  ],
  [
    "Is Recoup a law firm or broker?",
    "No. We're an administrative preparation service. We work with licensed customs brokers for all CBP filings and do not provide legal advice.",
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
    <section
      id="faq"
      className="py-28 sm:py-40"
      style={{ background: "var(--color-recoup-paper2)" }}
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
              Frequently asked questions
            </span>
          </div>
          <h2
            className="text-[44px] sm:text-[64px] font-normal mb-14 leading-[0.95] tracking-[-0.03em]"
            style={{
              fontFamily: "var(--font-display)",
              color: "var(--color-recoup-ink)",
            }}
          >
            Common{" "}
            <em
              style={{
                fontStyle: "italic",
                color: "var(--color-recoup-ember)",
              }}
            >
              questions.
            </em>
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
