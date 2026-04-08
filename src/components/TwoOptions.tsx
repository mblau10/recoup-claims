"use client";

import FadeIn from "./ui/FadeIn";
import Button from "./ui/Button";

const options = [
  {
    title: "Refund Filing",
    sub: "We file. You keep 100%.",
    desc: "Full CAPE declaration preparation, ACE enrollment, IEEPA duty separation, and interest calculation. Your refund arrives when CBP processes it.",
    price: "From $297",
    note: "Flat fee",
    btn: "Start filing",
    dark: false,
  },
  {
    title: "Advance Funding",
    sub: "We pay you now.",
    desc: "Receive up to 75% of your verified refund deposited in days. Non-recourse — we take the timing risk, not you. No personal guarantee required.",
    price: "Up to 75%",
    note: "Advanced immediately",
    btn: "Get funded",
    dark: true,
  },
];

export default function TwoOptions() {
  return (
    <section className="py-28 sm:py-40">
      <div className="max-w-[1120px] mx-auto px-6 sm:px-10">
        <FadeIn>
          <p
            className="text-[13px] font-semibold tracking-[1.5px] uppercase mb-4 text-center"
            style={{ color: "var(--color-recoup-eyebrow)" }}
          >
            Two options
          </p>
          <h2
            className="text-[36px] sm:text-[48px] lg:text-[56px] font-normal text-center mx-auto mb-16 sm:mb-20 max-w-[600px] leading-[1.12]"
            style={{ fontFamily: "var(--font-serif)", letterSpacing: -1.5 }}
          >
            File your claim.{" "}
            <span className="italic">Or get paid today.</span>
          </h2>
        </FadeIn>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-0.5 rounded-2xl overflow-hidden">
          {options.map((o, i) => (
            <FadeIn key={i} delay={i * 0.12}>
              <div
                className={`p-10 sm:p-14 min-h-[420px] sm:min-h-[480px] flex flex-col ${
                  o.dark
                    ? "bg-recoup-black text-white"
                    : "bg-recoup-light text-recoup-black"
                }`}
              >
                <p
                  className={`text-[13px] font-semibold tracking-[1.5px] uppercase mb-6 ${
                    o.dark ? "text-recoup-gray2" : "text-recoup-gray"
                  }`}
                >
                  {o.title}
                </p>
                <h3
                  className="text-[28px] sm:text-[36px] font-normal mb-5 leading-[1.2]"
                  style={{ fontFamily: "var(--font-serif)", letterSpacing: -0.5 }}
                >
                  {o.sub}
                </h3>
                <p
                  className={`text-[16px] leading-[1.7] mb-10 max-w-[400px] ${
                    o.dark ? "text-recoup-gray2" : "text-recoup-gray"
                  }`}
                >
                  {o.desc}
                </p>
                <div className="mt-auto">
                  <div
                    className="text-[36px] sm:text-[44px] font-normal mb-1"
                    style={{ fontFamily: "var(--font-serif)", letterSpacing: -1 }}
                  >
                    {o.price}
                  </div>
                  <div
                    className={`text-[14px] mb-8 ${
                      o.dark ? "text-recoup-gray2" : "text-recoup-gray"
                    }`}
                  >
                    {o.note}
                  </div>
                  <Button
                    href="#calc"
                    variant={o.dark ? "white" : "dark"}
                  >
                    {o.btn} →
                  </Button>
                </div>
              </div>
            </FadeIn>
          ))}
        </div>
      </div>
    </section>
  );
}
