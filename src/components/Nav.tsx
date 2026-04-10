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
        background: scrolled ? "rgba(246, 242, 234, 0.88)" : "transparent",
        backdropFilter: scrolled ? "saturate(160%) blur(16px)" : "none",
        borderBottom: scrolled ? "1px solid rgba(10,10,11,0.08)" : "none",
      }}
    >
      <div className="max-w-[1240px] mx-auto px-6 sm:px-10 py-4 flex justify-between items-center">
        <a
          href="#"
          className="no-underline flex items-baseline gap-2"
          style={{ color: "var(--color-recoup-ink)" }}
        >
          <span
            className="text-[26px] leading-none"
            style={{
              fontFamily: "var(--font-display)",
              letterSpacing: -0.5,
            }}
          >
            recoup
          </span>
          <span
            className="text-[10px] font-mono uppercase tracking-[0.14em]"
            style={{
              fontFamily: "var(--font-mono)",
              color: "var(--color-recoup-ember)",
            }}
          >
            .claims
          </span>
        </a>
        <div className="flex gap-8 items-center">
          <div className="hidden sm:flex gap-7">
            {[
              { label: "How it works", href: "#how-it-works" },
              { label: "Pricing", href: "#pricing" },
              { label: "Advance", href: "#advance" },
              { label: "FAQ", href: "#faq" },
            ].map((t) => (
              <a
                key={t.label}
                href={t.href}
                className="no-underline text-[12px] font-medium transition-colors"
                style={{
                  color: "var(--color-recoup-muted)",
                  fontFamily: "var(--font-mono)",
                  letterSpacing: "0.02em",
                }}
              >
                {t.label}
              </a>
            ))}
          </div>
          <Button href="#calc" variant="dark" className="!px-4 !py-2 !text-[12px]">
            Start →
          </Button>
        </div>
      </div>
    </nav>
  );
}
