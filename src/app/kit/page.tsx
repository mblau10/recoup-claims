"use client";

import { useState } from "react";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";
import Nav from "@/components/Nav";
import Footer from "@/components/Footer";
import Button from "@/components/ui/Button";
import FadeIn from "@/components/ui/FadeIn";
import { kitEmailSchema } from "@/lib/schemas";

type KitFormData = z.infer<typeof kitEmailSchema>;

const tableOfContents = [
  ["01", "The one-paragraph explanation"],
  ["02", "Are you eligible? A 60-second screen"],
  ["03", "What you need before you start"],
  ["04", "Getting your entry summaries (CBP Form 7501)"],
  ["05", "Creating a CAPE portal login"],
  ["06", "Filing your declaration, field by field"],
  ["07", "The Section 232 / 301 / IEEPA disambiguation trap"],
  ["08", "What CBP actually reviews (and how long it takes)"],
  ["09", "When to call a licensed customs broker"],
  ["10", "FAQ — answers to the ten questions we get most"],
  ["11", "Glossary"],
  ["12", "When Recoup is the right call"],
];

export default function KitPage() {
  const [sent, setSent] = useState(false);

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<KitFormData>({
    resolver: zodResolver(kitEmailSchema),
  });

  const onSubmit = async (data: KitFormData) => {
    try {
      // Soft endpoint — if it fails we still mark as sent and let the PDF download
      await fetch("/api/kit-signup", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data),
      }).catch(() => null);
    } finally {
      setSent(true);
    }
  };

  return (
    <>
      <Nav />

      <main className="pt-32 pb-24 min-h-screen">
        <div className="max-w-[1240px] mx-auto px-6 sm:px-10">
          {/* Header row */}
          <FadeIn>
            <div className="flex items-center gap-3 mb-6">
              <span
                className="h-px w-10"
                style={{ background: "var(--color-recoup-ink)" }}
              />
              <span
                className="text-[11px] tracking-[0.18em] uppercase"
                style={{
                  fontFamily: "var(--font-mono)",
                  color: "var(--color-recoup-muted)",
                }}
              >
                Self-Serve Kit · free · v1.2
              </span>
            </div>
            <h1
              className="text-[48px] sm:text-[72px] lg:text-[88px] font-normal leading-[0.92] tracking-[-0.035em] mb-8 max-w-[950px]"
              style={{
                fontFamily: "var(--font-display)",
                color: "var(--color-recoup-ink)",
              }}
            >
              File your own CAPE declaration.{" "}
              <em
                style={{
                  fontStyle: "italic",
                  color: "var(--color-recoup-ember)",
                }}
              >
                No broker. No retainer.
              </em>
            </h1>
            <p
              className="text-[17px] sm:text-[18px] leading-[1.55] max-w-[680px] mb-10"
              style={{ color: "var(--color-recoup-muted)" }}
            >
              An 18-page, plain-English guide for U.S. importers who paid IEEPA
              tariffs between February 1 and April 30, 2025. Written because we
              think most importers can file their own refund if they're
              willing to spend an afternoon on it. If your situation gets messy,
              you know where to find us.
            </p>
          </FadeIn>

          {/* Two-column: TOC + download card */}
          <div className="grid grid-cols-12 gap-10 mt-6">
            {/* TOC */}
            <FadeIn delay={0.1} className="col-span-12 lg:col-span-7">
              <div
                className="text-[10px] tracking-[0.18em] uppercase mb-4"
                style={{
                  fontFamily: "var(--font-mono)",
                  color: "var(--color-recoup-ember)",
                }}
              >
                Contents
              </div>
              <h2
                className="text-[28px] sm:text-[34px] font-normal mb-8"
                style={{
                  fontFamily: "var(--font-display)",
                  color: "var(--color-recoup-ink)",
                  letterSpacing: "-0.01em",
                }}
              >
                What's inside
              </h2>
              <ul className="list-none p-0 m-0">
                {tableOfContents.map(([num, title]) => (
                  <li
                    key={num}
                    className="flex items-baseline gap-6 py-4 border-t"
                    style={{ borderColor: "var(--color-recoup-line-soft)" }}
                  >
                    <span
                      className="text-[11px] shrink-0"
                      style={{
                        fontFamily: "var(--font-mono)",
                        color: "var(--color-recoup-ember)",
                        letterSpacing: "0.1em",
                      }}
                    >
                      {num}
                    </span>
                    <span
                      className="text-[15px] sm:text-[16px]"
                      style={{
                        color: "var(--color-recoup-ink)",
                        fontFamily: "var(--font-sans)",
                      }}
                    >
                      {title}
                    </span>
                  </li>
                ))}
                <li
                  className="py-4 border-t border-b"
                  style={{ borderColor: "var(--color-recoup-line-soft)" }}
                />
              </ul>
            </FadeIn>

            {/* Sticky download card */}
            <FadeIn delay={0.15} className="col-span-12 lg:col-span-5">
              <div className="lg:sticky lg:top-28">
                <div
                  className="p-8 sm:p-10 border"
                  style={{
                    background: "var(--color-recoup-ink)",
                    borderColor: "var(--color-recoup-ink)",
                  }}
                >
                  <div
                    className="text-[10px] tracking-[0.18em] uppercase mb-4"
                    style={{
                      fontFamily: "var(--font-mono)",
                      color: "var(--color-recoup-ember)",
                    }}
                  >
                    Download
                  </div>
                  <h3
                    className="text-[30px] sm:text-[36px] font-normal leading-[1.05] mb-4"
                    style={{
                      fontFamily: "var(--font-display)",
                      color: "var(--color-recoup-paper)",
                      letterSpacing: "-0.015em",
                    }}
                  >
                    The IEEPA Refund Self-Serve Kit
                  </h3>
                  <p
                    className="text-[13px] leading-[1.6] mb-8"
                    style={{ color: "rgba(246,242,234,0.72)" }}
                  >
                    PDF · 18 pages · updated April 2026 · free forever. Share it
                    with anyone. No paywall, no watermark, no strings.
                  </p>

                  {!sent ? (
                    <form
                      onSubmit={handleSubmit(onSubmit)}
                      className="space-y-4"
                    >
                      <label
                        className="block text-[11px] font-medium mb-2 tracking-wide uppercase"
                        style={{
                          color: "rgba(246,242,234,0.72)",
                          fontFamily: "var(--font-mono)",
                          letterSpacing: "0.12em",
                        }}
                      >
                        Email (optional)
                      </label>
                      <input
                        type="email"
                        placeholder="you@company.com"
                        {...register("email")}
                        className="w-full py-3 bg-transparent border-0 border-b text-[15px] outline-none transition-colors"
                        style={{
                          borderColor: "rgba(246,242,234,0.35)",
                          color: "var(--color-recoup-paper)",
                          fontFamily: "var(--font-sans)",
                        }}
                      />
                      {errors.email && (
                        <p
                          className="text-[12px]"
                          style={{ color: "var(--color-recoup-ember)" }}
                        >
                          {errors.email.message}
                        </p>
                      )}
                      <p
                        className="text-[11px] leading-[1.55] pt-1"
                        style={{
                          color: "rgba(246,242,234,0.55)",
                          fontFamily: "var(--font-mono)",
                        }}
                      >
                        We'll email you if the kit gets updated. Nothing
                        else. Skip the field if you'd rather not.
                      </p>
                      <div className="pt-3 flex flex-col gap-3">
                        <button
                          type="submit"
                          disabled={isSubmitting}
                          className="inline-flex items-center justify-center px-6 py-4 text-[14px] font-medium cursor-pointer transition-all disabled:opacity-50"
                          style={{
                            background: "var(--color-recoup-ember)",
                            color: "var(--color-recoup-ink)",
                            fontFamily: "var(--font-sans)",
                          }}
                        >
                          {isSubmitting ? "Sending…" : "Get the kit →"}
                        </button>
                        <a
                          href="/recoup-ieepa-kit.pdf"
                          download
                          className="inline-flex items-center justify-center px-6 py-4 text-[13px] font-medium border cursor-pointer transition-all no-underline"
                          style={{
                            borderColor: "rgba(246,242,234,0.35)",
                            color: "var(--color-recoup-paper)",
                            fontFamily: "var(--font-mono)",
                          }}
                        >
                          Skip the form — just download
                        </a>
                      </div>
                    </form>
                  ) : (
                    <div className="text-center py-4">
                      <p
                        className="text-[11px] tracking-[0.18em] uppercase mb-3"
                        style={{
                          fontFamily: "var(--font-mono)",
                          color: "var(--color-recoup-ember)",
                        }}
                      >
                        Ready
                      </p>
                      <p
                        className="text-[22px] leading-[1.2] mb-6"
                        style={{
                          fontFamily: "var(--font-display)",
                          color: "var(--color-recoup-paper)",
                        }}
                      >
                        Your download is ready.
                      </p>
                      <a
                        href="/recoup-ieepa-kit.pdf"
                        download
                        className="inline-flex items-center justify-center px-8 py-4 text-[14px] font-medium cursor-pointer no-underline"
                        style={{
                          background: "var(--color-recoup-ember)",
                          color: "var(--color-recoup-ink)",
                          fontFamily: "var(--font-sans)",
                        }}
                      >
                        Download PDF →
                      </a>
                    </div>
                  )}
                </div>

                {/* Secondary — escape hatch */}
                <div className="mt-8 pt-8 border-t" style={{ borderColor: "var(--color-recoup-line-soft)" }}>
                  <p
                    className="text-[11px] tracking-[0.18em] uppercase mb-3"
                    style={{
                      fontFamily: "var(--font-mono)",
                      color: "var(--color-recoup-muted)",
                    }}
                  >
                    Or, if your situation is messy
                  </p>
                  <p
                    className="text-[14px] leading-[1.55] mb-4"
                    style={{ color: "var(--color-recoup-muted)" }}
                  >
                    Multiple IORs, lost 7501s, or a refund large enough that the
                    math works &mdash; hand it to us and pay when CBP pays.
                  </p>
                  <Button
                    href="/apply?track=filing"
                    variant="ghost"
                    className="!px-6 !py-3 !text-[13px]"
                  >
                    Start a filing instead →
                  </Button>
                </div>
              </div>
            </FadeIn>
          </div>

          {/* Bottom honesty block */}
          <FadeIn delay={0.2}>
            <div
              className="mt-28 pt-16 border-t"
              style={{ borderColor: "var(--color-recoup-line-soft)" }}
            >
              <div className="grid grid-cols-12 gap-10 items-start">
                <div className="col-span-12 lg:col-span-5">
                  <div
                    className="text-[10px] tracking-[0.18em] uppercase mb-3"
                    style={{
                      fontFamily: "var(--font-mono)",
                      color: "var(--color-recoup-ember)",
                    }}
                  >
                    Why we give this away
                  </div>
                  <h2
                    className="text-[34px] sm:text-[44px] font-normal leading-[1.0]"
                    style={{
                      fontFamily: "var(--font-display)",
                      color: "var(--color-recoup-ink)",
                      letterSpacing: "-0.02em",
                    }}
                  >
                    Because the honest baseline{" "}
                    <em style={{ color: "var(--color-recoup-ember)" }}>
                      isn't hiring us.
                    </em>
                  </h2>
                </div>
                <div className="col-span-12 lg:col-span-7">
                  <p
                    className="text-[15px] leading-[1.7] mb-5"
                    style={{ color: "var(--color-recoup-ink)" }}
                  >
                    Most importers with clean records can file their own CAPE
                    declaration in an afternoon. The portal is clunky, the
                    language is heavy, and the 232/301/IEEPA disambiguation is a
                    genuine trap &mdash; but none of it is complicated. Section
                    07 of the kit is the single most important page, and
                    reading it carefully prevents roughly 80% of the rejected
                    filings we've seen.
                  </p>
                  <p
                    className="text-[15px] leading-[1.7]"
                    style={{ color: "var(--color-recoup-muted)" }}
                  >
                    We make money on the cases where the kit isn't
                    enough: multi-IOR situations, missing documentation,
                    importers who'd rather pay the flat Track B fee
                    ($895 or 1.5% of refund, whichever is greater) to make
                    the problem disappear, and importers who want their
                    money now and take the tiered Cash Now advance.
                    Everybody else &mdash; just take the PDF.
                  </p>
                </div>
              </div>
            </div>
          </FadeIn>
        </div>
      </main>

      <Footer />
    </>
  );
}
