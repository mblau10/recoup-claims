"use client";

import FadeIn from "./ui/FadeIn";
import Counter from "./Counter";

const stats = [
  { value: 166, prefix: "$", suffix: "B", label: "Duties paid under IEEPA" },
  { value: 330, prefix: "", suffix: "K+", label: "Importers eligible" },
  { value: 92, prefix: "", suffix: "%", label: "Haven't enrolled for refunds" },
  { value: 45, prefix: "", suffix: " days", label: "CBP processing target" },
];

export default function Stats() {
  return (
    <section className="py-20 bg-recoup-light">
      <div className="max-w-[1120px] mx-auto px-6 sm:px-10 grid grid-cols-2 lg:grid-cols-4 gap-10 text-center">
        {stats.map((d, i) => (
          <FadeIn key={i} delay={i * 0.08}>
            <div>
              <div
                className="text-[40px] sm:text-[48px] font-normal leading-none"
                style={{ fontFamily: "var(--font-serif)", letterSpacing: -1.5 }}
              >
                <Counter end={d.value} prefix={d.prefix} suffix={d.suffix} />
              </div>
              <div className="text-[14px] text-recoup-gray mt-2">{d.label}</div>
            </div>
          </FadeIn>
        ))}
      </div>
    </section>
  );
}
