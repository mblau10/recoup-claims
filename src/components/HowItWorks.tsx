"use client";

import FadeIn from "./ui/FadeIn";

const steps = [
  {
    n: "01",
    title: "Tell us about your imports",
    desc: "Complete a 3-minute intake with your IOR number and import details.",
    tag: "You",
  },
  {
    n: "02",
    title: "Enroll in ACE + ACH",
    desc: "We guide you through CBP's portal registration. Takes about 20 minutes.",
    tag: "You",
  },
  {
    n: "03",
    title: "We prepare your declaration",
    desc: "We pull entry data, isolate IEEPA duties, calculate interest, and format your CSV.",
    tag: "Recoup",
  },
  {
    n: "04",
    title: "Filed through CAPE",
    desc: "Your declaration goes in the moment the portal opens. First in line.",
    tag: "Recoup",
  },
];

export default function HowItWorks() {
  return (
    <section id="how-it-works" className="py-28 sm:py-40 bg-recoup-light">
      <div className="max-w-[1120px] mx-auto px-6 sm:px-10">
        <FadeIn>
          <p
            className="text-[13px] font-semibold tracking-[1.5px] uppercase mb-4"
            style={{ color: "var(--color-recoup-eyebrow)" }}
          >
            Process
          </p>
          <h2
            className="text-[36px] sm:text-[48px] lg:text-[56px] font-normal mb-16 sm:mb-20 leading-[1.12]"
            style={{ fontFamily: "var(--font-serif)", letterSpacing: -1.5 }}
          >
            Four steps to your refund.
          </h2>
        </FadeIn>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-10 sm:gap-12">
          {steps.map((s, i) => (
            <FadeIn key={i} delay={i * 0.08}>
              <div>
                <div
                  className="text-[56px] sm:text-[64px] text-recoup-border font-normal leading-none mb-6"
                  style={{ fontFamily: "var(--font-serif)" }}
                >
                  {s.n}
                </div>
                <span
                  className={`inline-block px-3 py-1 rounded-md text-[11px] font-bold tracking-[1px] uppercase mb-4 ${
                    s.tag === "You"
                      ? "bg-black/[0.04] text-recoup-gray"
                      : "bg-recoup-black/[0.06] text-recoup-black"
                  }`}
                >
                  {s.tag}
                </span>
                <h4
                  className="text-[20px] sm:text-[22px] font-normal mb-3 leading-[1.3]"
                  style={{ fontFamily: "var(--font-serif)", letterSpacing: -0.3 }}
                >
                  {s.title}
                </h4>
                <p className="text-[15px] text-recoup-gray leading-relaxed m-0">
                  {s.desc}
                </p>
              </div>
            </FadeIn>
          ))}
        </div>
      </div>
    </section>
  );
}
