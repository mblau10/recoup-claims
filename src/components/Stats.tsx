"use client";

import FadeIn from "./ui/FadeIn";
import Counter from "./Counter";

const stats = [
  { value: 166, prefix: "$", suffix: "B", label: "Duties paid under IEEPA" },
  { value: 330, prefix: "", suffix: "K+", label: "Eligible U.S. importers" },
  { value: 72, prefix: "", suffix: "h", label: "Cash advance wire time" },
  { value: 895, prefix: "$", suffix: "", label: "Flat filing floor (or 1.5%)" },
];

export default function Stats() {
  return (
    <section
      className="py-16 sm:py-20 border-y"
      style={{
        background: "var(--color-recoup-paper2)",
        borderColor: "rgba(10,10,11,0.12)",
      }}
    >
      <div className="max-w-[1240px] mx-auto px-6 sm:px-10 grid grid-cols-2 lg:grid-cols-4 gap-10">
        {stats.map((d, i) => (
          <FadeIn key={i} delay={i * 0.08}>
            <div className="flex flex-col">
              <div
                className="text-[10px] tracking-[0.18em] uppercase mb-3"
                style={{
                  fontFamily: "var(--font-mono)",
                  color: "var(--color-recoup-muted)",
                }}
              >
                {String(i + 1).padStart(2, "0")}
              </div>
              <div
                className="text-[48px] sm:text-[64px] font-normal leading-[0.9] tracking-[-0.03em]"
                style={{
                  fontFamily: "var(--font-display)",
                  color: "var(--color-recoup-ink)",
                }}
              >
                <Counter end={d.value} prefix={d.prefix} suffix={d.suffix} />
              </div>
              <div
                className="text-[13px] mt-4 max-w-[180px]"
                style={{ color: "var(--color-recoup-muted)" }}
              >
                {d.label}
              </div>
            </div>
          </FadeIn>
        ))}
      </div>
    </section>
  );
}
