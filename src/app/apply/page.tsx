"use client";

import { useState, Suspense, useMemo } from "react";
import { useSearchParams } from "next/navigation";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { ArrowLeft, ArrowRight, Check } from "lucide-react";
import Button from "@/components/ui/Button";
import {
  contactStepSchema,
  importStepSchema,
  planStepSchema,
  type ContactStepSchema,
  type ImportStepSchema,
  type PlanStepSchema,
} from "@/lib/schemas";

type Track = "filing" | "advance" | "both";

const stepLabels = ["Contact", "Imports", "Service", "Review"];

const countries = [
  "China",
  "Vietnam",
  "EU / Germany",
  "India",
  "South Korea",
  "Japan",
  "UK / Brazil",
  "Other",
];

const hearAbout = [
  "Google search",
  "LinkedIn",
  "Referral",
  "Trade publication",
  "Customs broker",
  "Other",
];

const trackInfo: Record<
  Track,
  { title: string; sub: string; fee: string; note: string }
> = {
  filing: {
    title: "Pay When CBP Pays",
    sub: "We file your CAPE declaration through a licensed customs broker. Invoiced only after CBP accepts the filing.",
    fee: "$895 / 1.5%",
    note: "$895 floor or 1.5% of refund, whichever is greater. Invoiced only on CBP acceptance — nothing upfront, no retainer.",
  },
  advance: {
    title: "Cash Now Advance",
    sub: "We wire up to 85% of your projected refund within 72 hours and collect directly from Treasury when CBP pays.",
    fee: "6–10%",
    note: "Tiered by refund size: 10% up to $50k, 8% for $50k–$250k, 6% above $250k. Netted at wire. Non-recourse, no personal guarantee.",
  },
  both: {
    title: "File + Advance",
    sub: "We file your CAPE declaration AND wire your advance. You get both: money in 72 hours plus full filing handled end-to-end.",
    fee: "$895 + 6–10%",
    note: "Filing fee on acceptance, Cash Now fee netted at wire. Tiered advance rate applies based on refund size.",
  },
};

function isTrack(v: string | null): v is Track {
  return v === "filing" || v === "advance" || v === "both";
}

function IntakeFormInner() {
  const searchParams = useSearchParams();
  const estimate = searchParams.get("estimate") || "";
  const trackParam = searchParams.get("track");
  const initialTrack: Track = isTrack(trackParam) ? trackParam : "filing";

  const [step, setStep] = useState(0);
  const [submitting, setSubmitting] = useState(false);
  const [done, setDone] = useState(false);
  const [submitError, setSubmitError] = useState<string | null>(null);

  const [allData, setAllData] = useState({
    fullName: "",
    companyName: "",
    email: "",
    phone: "",
    hearAbout: "",
    iorNumber: "",
    annualImportValue: estimate,
    primaryCountries: [] as string[],
    monthsUnderIEEPA: "",
    hasEntryNumbers: "" as "" | "yes" | "no",
    track: initialTrack,
    acceptsEngagement: false,
  });

  const contactForm = useForm<ContactStepSchema>({
    resolver: zodResolver(contactStepSchema),
    defaultValues: {
      fullName: allData.fullName,
      companyName: allData.companyName,
      email: allData.email,
      phone: allData.phone,
      hearAbout: allData.hearAbout,
    },
  });

  const importForm = useForm<ImportStepSchema>({
    resolver: zodResolver(importStepSchema),
    defaultValues: {
      iorNumber: allData.iorNumber,
      annualImportValue: allData.annualImportValue,
      primaryCountries: allData.primaryCountries,
      monthsUnderIEEPA: allData.monthsUnderIEEPA,
      hasEntryNumbers: (allData.hasEntryNumbers || "") as "yes" | "no",
    },
  });

  const planForm = useForm<PlanStepSchema>({
    resolver: zodResolver(planStepSchema),
    defaultValues: {
      track: initialTrack,
      acceptsEngagement: false,
    },
  });

  const inputClass =
    "w-full py-3.5 px-4 text-[15px] bg-[color:var(--color-recoup-paper2)] border border-[color:var(--color-recoup-ink)] text-[color:var(--color-recoup-ink)] outline-none focus:bg-white transition-colors";
  const labelClass =
    "block text-[11px] font-medium tracking-[0.14em] uppercase mb-2";
  const labelStyle = {
    fontFamily: "var(--font-mono)",
    color: "var(--color-recoup-muted)",
  };
  const errorClass =
    "text-[12px] mt-2";
  const errorStyle = { color: "#B3291B", fontFamily: "var(--font-mono)" };

  const handleContinue = async () => {
    setSubmitError(null);
    if (step === 0) {
      const valid = await contactForm.trigger();
      if (valid) {
        const data = contactForm.getValues();
        setAllData((prev) => ({ ...prev, ...data }));
        setStep(1);
      }
    } else if (step === 1) {
      const valid = await importForm.trigger();
      if (valid) {
        const data = importForm.getValues();
        setAllData((prev) => ({ ...prev, ...data }));
        setStep(2);
      }
    } else if (step === 2) {
      const valid = await planForm.trigger();
      if (valid) {
        const data = planForm.getValues();
        setAllData((prev) => ({ ...prev, ...data }));
        setStep(3);
      }
    }
  };

  const handleSubmit = async () => {
    setSubmitting(true);
    setSubmitError(null);
    try {
      const res = await fetch("/api/intake", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          track: allData.track,
          email: allData.email,
          fullName: allData.fullName,
          phone: allData.phone,
          legalEntityName: allData.companyName,
          iorNumber: allData.iorNumber,
          annualImportValue: allData.annualImportValue,
          primaryCountries: allData.primaryCountries,
          monthsUnderIEEPA: allData.monthsUnderIEEPA,
          hasEntryNumbers: allData.hasEntryNumbers,
          estimatedRefund: estimate || null,
        }),
      });
      if (res.ok) {
        setDone(true);
      } else {
        const body = await res.json().catch(() => ({}));
        setSubmitError(
          body?.error ||
            "We couldn't submit your intake right now. Please try again in a minute, or email support@recoup.claims."
        );
      }
    } catch {
      setSubmitError(
        "Network error. Please check your connection and try again."
      );
    }
    setSubmitting(false);
  };

  const selectedTrack = planForm.watch("track") || allData.track;
  const info = useMemo(() => trackInfo[selectedTrack as Track], [selectedTrack]);

  if (done) {
    return (
      <div
        className="min-h-screen flex items-center justify-center px-6"
        style={{ background: "var(--color-recoup-paper)" }}
      >
        <div className="max-w-[520px] text-center">
          <div
            className="w-14 h-14 flex items-center justify-center mx-auto mb-8"
            style={{
              background: "var(--color-recoup-ink)",
              color: "var(--color-recoup-ember)",
            }}
          >
            <Check size={24} strokeWidth={2.5} />
          </div>
          <h1
            className="text-[44px] sm:text-[56px] font-normal mb-5 leading-[0.95] tracking-[-0.02em]"
            style={{
              fontFamily: "var(--font-display)",
              color: "var(--color-recoup-ink)",
            }}
          >
            Intake received.
          </h1>
          <p
            className="text-[16px] leading-[1.65] mb-8"
            style={{ color: "var(--color-recoup-muted)" }}
          >
            A filing specialist will reach out within one U.S. business day at{" "}
            <span
              style={{
                color: "var(--color-recoup-ink)",
                fontFamily: "var(--font-mono)",
              }}
            >
              {allData.email}
            </span>
            . We'll confirm your ACE enrollment status, walk you through
            the engagement letter, and queue your declaration for the CAPE
            portal.
          </p>
          <div className="flex flex-col sm:flex-row gap-3 justify-center">
            <Button href="/" variant="dark">
              Back to home
            </Button>
            <Button href="/kit" variant="ghost">
              Read the Self-Serve Kit →
            </Button>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div
      className="min-h-screen"
      style={{
        background: "var(--color-recoup-paper)",
        color: "var(--color-recoup-ink)",
      }}
    >
      {/* Header */}
      <div
        className="border-b"
        style={{ borderColor: "rgba(10,10,11,0.12)" }}
      >
        <div className="max-w-[820px] mx-auto px-6 py-5 flex items-center justify-between">
          <a
            href="/"
            className="no-underline flex items-baseline gap-2"
            style={{ color: "var(--color-recoup-ink)" }}
          >
            <span
              className="text-[22px] leading-none"
              style={{
                fontFamily: "var(--font-display)",
                letterSpacing: -0.5,
              }}
            >
              recoup
            </span>
            <span
              className="text-[10px] uppercase tracking-[0.14em]"
              style={{
                fontFamily: "var(--font-mono)",
                color: "var(--color-recoup-ember)",
              }}
            >
              .claims
            </span>
          </a>
          <span
            className="text-[11px] tracking-[0.14em] uppercase"
            style={{
              fontFamily: "var(--font-mono)",
              color: "var(--color-recoup-muted)",
            }}
          >
            Step {String(step + 1).padStart(2, "0")} /{" "}
            {String(stepLabels.length).padStart(2, "0")}
          </span>
        </div>
      </div>

      {/* Progress */}
      <div className="max-w-[820px] mx-auto px-6 pt-10">
        <div
          className="flex gap-2 mb-3 border-b pb-4"
          style={{ borderColor: "rgba(10,10,11,0.08)" }}
        >
          {stepLabels.map((l, i) => (
            <div key={l} className="flex-1 flex items-center gap-3">
              <span
                className="text-[10px] w-5"
                style={{
                  fontFamily: "var(--font-mono)",
                  color:
                    i <= step
                      ? "var(--color-recoup-ember)"
                      : "var(--color-recoup-muted2)",
                }}
              >
                {String(i + 1).padStart(2, "0")}
              </span>
              <span
                className="text-[11px] uppercase tracking-[0.14em]"
                style={{
                  fontFamily: "var(--font-mono)",
                  color:
                    i <= step
                      ? "var(--color-recoup-ink)"
                      : "var(--color-recoup-muted2)",
                }}
              >
                {l}
              </span>
              <span
                className="flex-1 h-px"
                style={{
                  background:
                    i <= step
                      ? "var(--color-recoup-ink)"
                      : "rgba(10,10,11,0.12)",
                }}
              />
            </div>
          ))}
        </div>
      </div>

      {/* Form content */}
      <div className="max-w-[820px] mx-auto px-6 pb-24 pt-10">
        {/* Step 1: Contact */}
        {step === 0 && (
          <div>
            <h2
              className="text-[38px] sm:text-[54px] font-normal mb-4 leading-[0.95] tracking-[-0.025em]"
              style={{ fontFamily: "var(--font-display)" }}
            >
              Who are we working with?
            </h2>
            <p
              className="text-[15px] mb-12 max-w-[540px] leading-[1.6]"
              style={{ color: "var(--color-recoup-muted)" }}
            >
              We'll use this only to prepare your CAPE engagement letter
              and reach out with your filing timeline. No marketing, ever.
            </p>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
              <div>
                <label className={labelClass} style={labelStyle}>
                  Full name
                </label>
                <input
                  className={inputClass}
                  {...contactForm.register("fullName")}
                  placeholder="Jane Smith"
                />
                {contactForm.formState.errors.fullName && (
                  <p className={errorClass} style={errorStyle}>
                    {contactForm.formState.errors.fullName.message}
                  </p>
                )}
              </div>
              <div>
                <label className={labelClass} style={labelStyle}>
                  Legal entity / company
                </label>
                <input
                  className={inputClass}
                  {...contactForm.register("companyName")}
                  placeholder="Acme Imports LLC"
                />
                {contactForm.formState.errors.companyName && (
                  <p className={errorClass} style={errorStyle}>
                    {contactForm.formState.errors.companyName.message}
                  </p>
                )}
              </div>
              <div>
                <label className={labelClass} style={labelStyle}>
                  Work email
                </label>
                <input
                  type="email"
                  className={inputClass}
                  {...contactForm.register("email")}
                  placeholder="jane@acme.com"
                />
                {contactForm.formState.errors.email && (
                  <p className={errorClass} style={errorStyle}>
                    {contactForm.formState.errors.email.message}
                  </p>
                )}
              </div>
              <div>
                <label className={labelClass} style={labelStyle}>
                  Phone
                </label>
                <input
                  type="tel"
                  className={inputClass}
                  {...contactForm.register("phone")}
                  placeholder="(555) 123-4567"
                />
                {contactForm.formState.errors.phone && (
                  <p className={errorClass} style={errorStyle}>
                    {contactForm.formState.errors.phone.message}
                  </p>
                )}
              </div>
              <div className="sm:col-span-2">
                <label className={labelClass} style={labelStyle}>
                  How did you hear about us?
                </label>
                <select
                  className={`${inputClass} cursor-pointer`}
                  {...contactForm.register("hearAbout")}
                >
                  <option value="">Select one (optional)</option>
                  {hearAbout.map((h) => (
                    <option key={h} value={h}>
                      {h}
                    </option>
                  ))}
                </select>
              </div>
            </div>
          </div>
        )}

        {/* Step 2: Import details */}
        {step === 1 && (
          <div>
            <h2
              className="text-[38px] sm:text-[54px] font-normal mb-4 leading-[0.95] tracking-[-0.025em]"
              style={{ fontFamily: "var(--font-display)" }}
            >
              About your imports.
            </h2>
            <p
              className="text-[15px] mb-12 max-w-[540px] leading-[1.6]"
              style={{ color: "var(--color-recoup-muted)" }}
            >
              Just enough information to size your refund exposure. We'll
              pull the full entry data from ACE ourselves before filing.
            </p>
            <div className="space-y-7">
              <div>
                <label className={labelClass} style={labelStyle}>
                  IOR number (Importer of Record)
                </label>
                <input
                  className={inputClass}
                  {...importForm.register("iorNumber")}
                  placeholder="XX-XXXXXXX"
                />
                {importForm.formState.errors.iorNumber && (
                  <p className={errorClass} style={errorStyle}>
                    {importForm.formState.errors.iorNumber.message}
                  </p>
                )}
              </div>
              <div>
                <label className={labelClass} style={labelStyle}>
                  Approximate annual import value (USD)
                </label>
                <input
                  className={inputClass}
                  {...importForm.register("annualImportValue")}
                  placeholder="500,000"
                />
                {importForm.formState.errors.annualImportValue && (
                  <p className={errorClass} style={errorStyle}>
                    {importForm.formState.errors.annualImportValue.message}
                  </p>
                )}
              </div>
              <div>
                <label className={labelClass} style={labelStyle}>
                  Primary countries of origin
                </label>
                <div className="flex flex-wrap gap-2 mt-1">
                  {countries.map((c) => {
                    const selected = importForm
                      .watch("primaryCountries")
                      ?.includes(c);
                    return (
                      <button
                        key={c}
                        type="button"
                        onClick={() => {
                          const current =
                            importForm.getValues("primaryCountries") || [];
                          const updated = current.includes(c)
                            ? current.filter((x) => x !== c)
                            : [...current, c];
                          importForm.setValue("primaryCountries", updated, {
                            shouldValidate: true,
                          });
                        }}
                        className="px-4 py-2 text-[13px] font-medium border transition-all cursor-pointer"
                        style={{
                          fontFamily: "var(--font-mono)",
                          background: selected
                            ? "var(--color-recoup-ink)"
                            : "transparent",
                          color: selected
                            ? "var(--color-recoup-paper)"
                            : "var(--color-recoup-ink)",
                          borderColor: "var(--color-recoup-ink)",
                        }}
                      >
                        {c}
                      </button>
                    );
                  })}
                </div>
                {importForm.formState.errors.primaryCountries && (
                  <p className={errorClass} style={errorStyle}>
                    {importForm.formState.errors.primaryCountries.message}
                  </p>
                )}
              </div>
              <div>
                <label className={labelClass} style={labelStyle}>
                  Estimated months imported under IEEPA
                </label>
                <select
                  className={`${inputClass} cursor-pointer`}
                  {...importForm.register("monthsUnderIEEPA")}
                >
                  <option value="">Select range</option>
                  <option value="1-3">1–3 months</option>
                  <option value="4-6">4–6 months</option>
                  <option value="7-9">7–9 months</option>
                  <option value="10-12">10–12 months</option>
                </select>
                {importForm.formState.errors.monthsUnderIEEPA && (
                  <p className={errorClass} style={errorStyle}>
                    {importForm.formState.errors.monthsUnderIEEPA.message}
                  </p>
                )}
              </div>
              <div>
                <label className={labelClass} style={labelStyle}>
                  Do you have your CBP entry numbers on hand?
                </label>
                <div className="flex gap-3 mt-1">
                  {[
                    ["yes", "Yes"],
                    ["no", "Not yet"],
                  ].map(([v, label]) => {
                    const selected =
                      importForm.watch("hasEntryNumbers") === v;
                    return (
                      <button
                        key={v}
                        type="button"
                        onClick={() =>
                          importForm.setValue(
                            "hasEntryNumbers",
                            v as "yes" | "no",
                            { shouldValidate: true }
                          )
                        }
                        className="px-6 py-2.5 text-[13px] font-medium border transition-all cursor-pointer"
                        style={{
                          fontFamily: "var(--font-mono)",
                          background: selected
                            ? "var(--color-recoup-ink)"
                            : "transparent",
                          color: selected
                            ? "var(--color-recoup-paper)"
                            : "var(--color-recoup-ink)",
                          borderColor: "var(--color-recoup-ink)",
                        }}
                      >
                        {label}
                      </button>
                    );
                  })}
                </div>
                {importForm.formState.errors.hasEntryNumbers && (
                  <p className={errorClass} style={errorStyle}>
                    {importForm.formState.errors.hasEntryNumbers.message}
                  </p>
                )}
              </div>
            </div>
          </div>
        )}

        {/* Step 3: Service track */}
        {step === 2 && (
          <div>
            <h2
              className="text-[38px] sm:text-[54px] font-normal mb-4 leading-[0.95] tracking-[-0.025em]"
              style={{ fontFamily: "var(--font-display)" }}
            >
              Pick your service.
            </h2>
            <p
              className="text-[15px] mb-12 max-w-[540px] leading-[1.6]"
              style={{ color: "var(--color-recoup-muted)" }}
            >
              No tiers, no retainers. Pick the track that fits your situation —
              you can switch or add the advance later at no cost.
            </p>
            <div className="space-y-3">
              {(["filing", "advance", "both"] as Track[]).map((tr) => {
                const selected = planForm.watch("track") === tr;
                const t = trackInfo[tr];
                return (
                  <button
                    key={tr}
                    type="button"
                    onClick={() =>
                      planForm.setValue("track", tr, { shouldValidate: true })
                    }
                    className="w-full text-left p-7 border transition-all cursor-pointer"
                    style={{
                      borderColor: selected
                        ? "var(--color-recoup-ink)"
                        : "rgba(10,10,11,0.18)",
                      background: selected
                        ? "var(--color-recoup-paper2)"
                        : "transparent",
                    }}
                  >
                    <div className="flex justify-between items-start gap-4 mb-3">
                      <div>
                        <div
                          className="text-[10px] tracking-[0.18em] uppercase mb-1"
                          style={{
                            fontFamily: "var(--font-mono)",
                            color: selected
                              ? "var(--color-recoup-ember)"
                              : "var(--color-recoup-muted)",
                          }}
                        >
                          Track {tr === "filing" ? "B" : tr === "advance" ? "C" : "B + C"}
                        </div>
                        <div
                          className="text-[22px] leading-tight"
                          style={{
                            fontFamily: "var(--font-display)",
                            color: "var(--color-recoup-ink)",
                          }}
                        >
                          {t.title}
                        </div>
                      </div>
                      <div
                        className="text-[32px] sm:text-[40px] leading-none whitespace-nowrap"
                        style={{
                          fontFamily: "var(--font-display)",
                          color: selected
                            ? "var(--color-recoup-ember)"
                            : "var(--color-recoup-ink)",
                        }}
                      >
                        {t.fee}
                      </div>
                    </div>
                    <p
                      className="text-[14px] leading-[1.6] m-0 max-w-[540px]"
                      style={{ color: "var(--color-recoup-muted)" }}
                    >
                      {t.sub}
                    </p>
                    <p
                      className="text-[11px] leading-[1.5] mt-3 m-0"
                      style={{
                        fontFamily: "var(--font-mono)",
                        color: "var(--color-recoup-muted2)",
                      }}
                    >
                      ↳ {t.note}
                    </p>
                  </button>
                );
              })}
            </div>

            <div
              className="mt-8 p-6 border"
              style={{ borderColor: "var(--color-recoup-ink)" }}
            >
              <label className="flex items-start gap-3 cursor-pointer">
                <input
                  type="checkbox"
                  {...planForm.register("acceptsEngagement")}
                  className="w-4 h-4 mt-1 accent-[color:var(--color-recoup-ember)] flex-shrink-0"
                />
                <span
                  className="text-[13px] leading-[1.6]"
                  style={{ color: "var(--color-recoup-ink)" }}
                >
                  I understand Recoup is not a law firm and that all CBP
                  filings are executed by a licensed customs broker. I agree to
                  our{" "}
                  <a
                    href="/legal"
                    className="underline"
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    terms of service and privacy policy
                  </a>
                  . No charge will be made today.
                </span>
              </label>
              {planForm.formState.errors.acceptsEngagement && (
                <p className={`${errorClass} ml-7`} style={errorStyle}>
                  {planForm.formState.errors.acceptsEngagement.message}
                </p>
              )}
            </div>
          </div>
        )}

        {/* Step 4: Review */}
        {step === 3 && (
          <div>
            <h2
              className="text-[38px] sm:text-[54px] font-normal mb-4 leading-[0.95] tracking-[-0.025em]"
              style={{ fontFamily: "var(--font-display)" }}
            >
              Review &amp; submit.
            </h2>
            <p
              className="text-[15px] mb-12 max-w-[540px] leading-[1.6]"
              style={{ color: "var(--color-recoup-muted)" }}
            >
              Confirm everything below. Nothing is charged on submit — a
              specialist will email you within one business day to complete the
              engagement letter.
            </p>

            <div className="space-y-6">
              <ReviewSection title="Contact">
                <Row label="Name" value={allData.fullName || "—"} />
                <Row label="Company" value={allData.companyName || "—"} />
                <Row label="Email" value={allData.email || "—"} />
                <Row label="Phone" value={allData.phone || "—"} />
              </ReviewSection>

              <ReviewSection title="Imports">
                <Row label="IOR" value={allData.iorNumber || "—"} />
                <Row
                  label="Annual value"
                  value={
                    allData.annualImportValue
                      ? "$" + allData.annualImportValue
                      : "—"
                  }
                />
                <Row
                  label="Countries"
                  value={allData.primaryCountries.join(", ") || "—"}
                />
                <Row label="Months under IEEPA" value={allData.monthsUnderIEEPA || "—"} />
                <Row
                  label="Has entry numbers"
                  value={
                    allData.hasEntryNumbers === "yes"
                      ? "Yes"
                      : allData.hasEntryNumbers === "no"
                      ? "Not yet"
                      : "—"
                  }
                />
              </ReviewSection>

              <ReviewSection title="Service">
                <div className="flex justify-between items-baseline py-3">
                  <span
                    className="text-[14px]"
                    style={{
                      fontFamily: "var(--font-display)",
                      color: "var(--color-recoup-ink)",
                    }}
                  >
                    {info.title}
                  </span>
                  <span
                    className="text-[28px]"
                    style={{
                      fontFamily: "var(--font-display)",
                      color: "var(--color-recoup-ember)",
                    }}
                  >
                    {info.fee}
                  </span>
                </div>
                <p
                  className="text-[12px] leading-[1.5] m-0"
                  style={{
                    fontFamily: "var(--font-mono)",
                    color: "var(--color-recoup-muted)",
                  }}
                >
                  {info.note}
                </p>
              </ReviewSection>
            </div>

            {submitError && (
              <div
                className="mt-8 p-4 border"
                style={{
                  borderColor: "#B3291B",
                  background: "rgba(179,41,27,0.06)",
                }}
              >
                <p
                  className="text-[13px] m-0"
                  style={{
                    fontFamily: "var(--font-mono)",
                    color: "#B3291B",
                  }}
                >
                  {submitError}
                </p>
              </div>
            )}
          </div>
        )}

        {/* Nav */}
        <div
          className="flex justify-between items-center mt-14 pt-8 border-t"
          style={{ borderColor: "rgba(10,10,11,0.12)" }}
        >
          {step > 0 ? (
            <button
              onClick={() => setStep(step - 1)}
              className="flex items-center gap-2 text-[13px] font-medium transition-colors cursor-pointer bg-transparent border-0 p-0"
              style={{
                fontFamily: "var(--font-mono)",
                color: "var(--color-recoup-muted)",
              }}
            >
              <ArrowLeft size={14} />
              Back
            </button>
          ) : (
            <a
              href="/"
              className="flex items-center gap-2 text-[13px] font-medium transition-colors no-underline"
              style={{
                fontFamily: "var(--font-mono)",
                color: "var(--color-recoup-muted)",
              }}
            >
              <ArrowLeft size={14} />
              Back to home
            </a>
          )}

          {step < 3 ? (
            <Button onClick={handleContinue} variant="dark">
              Continue
              <ArrowRight size={14} className="ml-2" />
            </Button>
          ) : (
            <Button
              onClick={handleSubmit}
              variant="dark"
              className="!px-10"
              disabled={submitting}
            >
              {submitting ? "Submitting…" : "Submit intake →"}
            </Button>
          )}
        </div>
      </div>
    </div>
  );
}

function ReviewSection({
  title,
  children,
}: {
  title: string;
  children: React.ReactNode;
}) {
  return (
    <div
      className="p-6 border"
      style={{ borderColor: "rgba(10,10,11,0.18)" }}
    >
      <h3
        className="text-[10px] tracking-[0.18em] uppercase mb-4"
        style={{
          fontFamily: "var(--font-mono)",
          color: "var(--color-recoup-muted)",
        }}
      >
        {title}
      </h3>
      <div>{children}</div>
    </div>
  );
}

function Row({ label, value }: { label: string; value: string }) {
  return (
    <div
      className="grid grid-cols-12 gap-3 py-2 text-[13px]"
      style={{ fontFamily: "var(--font-mono)" }}
    >
      <span
        className="col-span-5"
        style={{ color: "var(--color-recoup-muted)" }}
      >
        {label}
      </span>
      <span
        className="col-span-7 break-words"
        style={{ color: "var(--color-recoup-ink)" }}
      >
        {value}
      </span>
    </div>
  );
}

export default function ApplyPage() {
  return (
    <Suspense
      fallback={
        <div
          className="min-h-screen flex items-center justify-center"
          style={{ background: "var(--color-recoup-paper)" }}
        >
          <p
            className="text-[13px]"
            style={{
              color: "var(--color-recoup-muted)",
              fontFamily: "var(--font-mono)",
            }}
          >
            Loading intake…
          </p>
        </div>
      }
    >
      <IntakeFormInner />
    </Suspense>
  );
}
