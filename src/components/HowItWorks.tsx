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
    <section
      id="how-it-works"
      className="py-28 sm:py-40"
      style={{ background: "var(--color-recoup-paper2)" }}
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
              FILE NO. 03 · THE PROCESS
            </span>
          </div>
          <div className="grid grid-cols-12 gap-6 mb-20">
            <h2
              className="col-span-12 lg:col-span-9 text-[44px] sm:text-[64px] lg:text-[80px] leading-[0.95] tracking-[-0.03em]"
              style={{
                fontFamily: "var(--font-display)",
                color: "var(--color-recoup-ink)",
              }}
            >
              Four steps.{" "}
              <em
                style={{
                  fontStyle: "italic",
                  color: "var(--color-recoup-ember)",
                }}
              >
                You show up for one of them.
              </em>
            </h2>
          </div>
        </FadeIn>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-10 sm:gap-12">
          {steps.map((s, i) => (
            <FadeIn key={i} delay={i * 0.08}>
              <div
                className="pt-8 border-t"
                style={{ borderColor: "var(--color-recoup-ink)" }}
              >
                <div
                  className="text-[72px] sm:text-[88px] leading-none mb-6"
                  style={{
                    fontFamily: "var(--font-display)",
                    color:
                      s.tag === "Recoup"
                        ? "var(--color-recoup-ember)"
                        : "var(--color-recoup-ink)",
                    fontStyle: "italic",
                  }}
                >
                  {s.n}
                </div>
                <span
                  className="inline-block text-[10px] tracking-[0.18em] uppercase mb-4"
                  style={{
                    fontFamily: "var(--font-mono)",
                    color:
                      s.tag === "Recoup"
                        ? "var(--color-recoup-ember)"
                        : "var(--color-recoup-muted)",
                  }}
                >
                  [{s.tag}]
                </span>
                <h4
                  className="text-[22px] sm:text-[26px] font-normal mb-3 leading-[1.2]"
                  style={{
                    fontFamily: "var(--font-display)",
                    letterSpacing: -0.3,
                    color: "var(--color-recoup-ink)",
                  }}
                >
                  {s.title}
                </h4>
                <p
                  className="text-[14px] leading-[1.6] m-0"
                  style={{ color: "var(--color-recoup-muted)" }}
                >
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
