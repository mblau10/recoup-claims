"use client";

import { useEffect, useState } from "react";
import Button from "./ui/Button";

export default function Nav() {
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handler = () => setScrolled(window.scrollY > 40);
    window.addEventListener("scroll", handler, { passive: true });
    return () => window.removeEventListener("scroll", handler);
  }, []);

  return (
    <nav
      className="fixed top-0 left-0 right-0 z-50 transition-all duration-300"
      style={{
        background: scrolled ? "rgba(255,255,255,0.92)" : "transparent",
        backdropFilter: scrolled ? "saturate(180%) blur(20px)" : "none",
        borderBottom: scrolled ? "1px solid rgba(0,0,0,0.06)" : "none",
      }}
    >
      <div className="max-w-[1120px] mx-auto px-6 sm:px-10 py-4 flex justify-between items-center">
        <a
          href="#"
          className="font-serif text-[22px] text-recoup-black no-underline font-medium"
          style={{ fontFamily: "var(--font-serif)", letterSpacing: -0.5 }}
        >
          recoup
        </a>
        <div className="flex gap-8 items-center">
          <div className="hidden sm:flex gap-8">
            {["How it works", "Pricing", "FAQ"].map((t) => (
              <a
                key={t}
                href={`#${t.toLowerCase().replace(/ /g, "-")}`}
                className="text-recoup-gray no-underline text-[13px] font-medium hover:text-recoup-black transition-colors"
              >
                {t}
              </a>
            ))}
          </div>
          <Button href="#calc" variant="dark" className="!px-5 !py-2 !text-[13px]">
            Get started
          </Button>
        </div>
      </div>
    </nav>
  );
}
