"use client";

import FadeIn from "./ui/FadeIn";
import Button from "./ui/Button";

export default function CTA() {
  return (
    <section className="py-28 sm:py-40 bg-recoup-black text-center">
      <div className="max-w-[700px] mx-auto px-6 sm:px-10">
        <FadeIn>
          <h2
            className="text-[36px] sm:text-[48px] lg:text-[56px] font-normal text-white mb-5 leading-[1.12]"
            style={{ fontFamily: "var(--font-serif)", letterSpacing: -1.5 }}
          >
            The portal opens soon.
          </h2>
          <p className="text-[18px] text-recoup-gray2 leading-relaxed mx-auto mb-12 max-w-[440px]">
            330,000 importers are owed refunds. 92% aren't set up. Don't be one
            of them.
          </p>
          <Button
            href="#calc"
            variant="white"
            className="!px-10 !py-4 !text-[17px]"
          >
            Start my refund →
          </Button>
        </FadeIn>
      </div>
    </section>
  );
}
