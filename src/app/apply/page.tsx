"use client";

import { useState, Suspense } from "react";
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

const stepLabels = ["Contact", "Imports", "Plan", "Review"];

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
  "Other",
];

const tierData = [
  {
    id: "essentials",
    name: "Essentials",
    price: "$297",
    desc: "ACE setup, ACH enrollment, eligibility check, video walkthrough.",
  },
  {
    id: "full_filing",
    name: "Full Filing",
    price: "$1,497",
    desc: "Everything in Essentials + entry data pull, IEEPA separation, interest calc, declaration prep.",
    popular: true,
  },
  {
    id: "priority",
    name: "Priority",
    price: "$2,497",
    desc: "Everything in Full Filing + day-one CAPE submission, liquidation monitoring, dedicated manager.",
  },
];

function IntakeFormInner() {
  const searchParams = useSearchParams();
  const estimate = searchParams.get("estimate");

  const [step, setStep] = useState(0);
  const [submitting, setSubmitting] = useState(false);
  const [done, setDone] = useState(false);

  // Store all form data across steps
  const [allData, setAllData] = useState({
    fullName: "",
    companyName: "",
    email: "",
    phone: "",
    hearAbout: "",
    iorNumber: "",
    annualImportValue: estimate || "",
    primaryCountries: [] as string[],
    monthsUnderIEEPA: "",
    hasEntryNumbers: "",
    tier: "full_filing",
    wantsAdvance: false,
  });

  // Step 1: Contact
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

  // Step 2: Import
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

  // Step 3: Plan
  const planForm = useForm<PlanStepSchema>({
    resolver: zodResolver(planStepSchema),
    defaultValues: {
      tier: (allData.tier || "full_filing") as "essentials" | "full_filing" | "priority",
      wantsAdvance: allData.wantsAdvance,
    },
  });

  const inputClass =
    "w-full py-3.5 px-4 text-base bg-white border border-recoup-border rounded-lg text-recoup-black outline-none focus:border-recoup-black transition-colors";
  const labelClass = "block text-[13px] font-semibold text-recoup-gray tracking-wide mb-2";
  const errorClass = "text-[13px] text-[#D32F2F] mt-1.5";

  const handleContinue = async () => {
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
    try {
      const res = await fetch("/api/intake", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          email: allData.email,
          legalEntityName: allData.companyName,
          tier: allData.tier,
          wantsAdvance: allData.wantsAdvance,
        }),
      });
      if (res.ok) {
        setDone(true);
      }
    } catch (e) {
      console.error(e);
    }
    setSubmitting(false);
  };

  if (done) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-white px-6">
        <div className="max-w-md text-center">
          <div className="w-16 h-16 bg-recoup-green-bg rounded-2xl flex items-center justify-center mx-auto mb-6">
            <Check size={32} className="text-recoup-green" />
          </div>
          <h1
            className="text-[32px] font-normal mb-4"
            style={{ fontFamily: "var(--font-serif)" }}
          >
            Application received.
          </h1>
          <p className="text-recoup-gray text-base leading-relaxed mb-8">
            We'll review your details and reach out within 1–2 business days. Check your email for a confirmation.
          </p>
          <Button href="/" variant="dark">
            Back to home
          </Button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-white">
      {/* Header */}
      <div className="border-b border-recoup-border">
        <div className="max-w-[720px] mx-auto px-6 py-5 flex items-center justify-between">
          <a
            href="/"
            className="text-[20px] font-medium text-recoup-black no-underline"
            style={{ fontFamily: "var(--font-serif)", letterSpacing: -0.5 }}
          >
            recoup
          </a>
          <span className="text-[13px] text-recoup-gray">
            Step {step + 1} of {stepLabels.length}
          </span>
        </div>
      </div>

      {/* Progress */}
      <div className="max-w-[720px] mx-auto px-6 pt-8">
        <div className="flex gap-2 mb-2">
          {stepLabels.map((_, i) => (
            <div
              key={i}
              className={`h-1 flex-1 rounded-full transition-colors ${
                i <= step ? "bg-recoup-black" : "bg-recoup-border"
              }`}
            />
          ))}
        </div>
        <div className="flex justify-between mb-10">
          {stepLabels.map((l, i) => (
            <span
              key={l}
              className={`text-[12px] font-medium ${
                i <= step ? "text-recoup-black" : "text-recoup-gray2"
              }`}
            >
              {l}
            </span>
          ))}
        </div>
      </div>

      {/* Form content */}
      <div className="max-w-[720px] mx-auto px-6 pb-20">
        {/* Step 1: Contact */}
        {step === 0 && (
          <div>
            <h2
              className="text-[28px] sm:text-[36px] font-normal mb-2"
              style={{ fontFamily: "var(--font-serif)", letterSpacing: -0.5 }}
            >
              Contact information
            </h2>
            <p className="text-recoup-gray text-base mb-10">
              Tell us who you are so we can prepare your filing.
            </p>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
              <div>
                <label className={labelClass}>Full name</label>
                <input
                  className={inputClass}
                  {...contactForm.register("fullName")}
                  placeholder="Jane Smith"
                />
                {contactForm.formState.errors.fullName && (
                  <p className={errorClass}>{contactForm.formState.errors.fullName.message}</p>
                )}
              </div>
              <div>
                <label className={labelClass}>Company name</label>
                <input
                  className={inputClass}
                  {...contactForm.register("companyName")}
                  placeholder="Acme Imports LLC"
                />
                {contactForm.formState.errors.companyName && (
                  <p className={errorClass}>{contactForm.formState.errors.companyName.message}</p>
                )}
              </div>
              <div>
                <label className={labelClass}>Email</label>
                <input
                  type="email"
                  className={inputClass}
                  {...contactForm.register("email")}
                  placeholder="jane@acme.com"
                />
                {contactForm.formState.errors.email && (
                  <p className={errorClass}>{contactForm.formState.errors.email.message}</p>
                )}
              </div>
              <div>
                <label className={labelClass}>Phone</label>
                <input
                  type="tel"
                  className={inputClass}
                  {...contactForm.register("phone")}
                  placeholder="(555) 123-4567"
                />
                {contactForm.formState.errors.phone && (
                  <p className={errorClass}>{contactForm.formState.errors.phone.message}</p>
                )}
              </div>
              <div className="sm:col-span-2">
                <label className={labelClass}>How did you hear about us?</label>
                <select
                  className={`${inputClass} cursor-pointer`}
                  {...contactForm.register("hearAbout")}
                >
                  <option value="">Select one</option>
                  {hearAbout.map((h) => (
                    <option key={h} value={h}>
                      {h}
                    </option>
                  ))}
                </select>
                {contactForm.formState.errors.hearAbout && (
                  <p className={errorClass}>{contactForm.formState.errors.hearAbout.message}</p>
                )}
              </div>
            </div>
          </div>
        )}

        {/* Step 2: Import details */}
        {step === 1 && (
          <div>
            <h2
              className="text-[28px] sm:text-[36px] font-normal mb-2"
              style={{ fontFamily: "var(--font-serif)", letterSpacing: -0.5 }}
            >
              Import details
            </h2>
            <p className="text-recoup-gray text-base mb-10">
              This helps us estimate your refund and prepare the declaration.
            </p>
            <div className="space-y-6">
              <div>
                <label className={labelClass}>IOR number (Importer of Record)</label>
                <input
                  className={inputClass}
                  {...importForm.register("iorNumber")}
                  placeholder="XX-XXXXXXX"
                />
                {importForm.formState.errors.iorNumber && (
                  <p className={errorClass}>{importForm.formState.errors.iorNumber.message}</p>
                )}
              </div>
              <div>
                <label className={labelClass}>Approximate annual import value (USD)</label>
                <input
                  className={inputClass}
                  {...importForm.register("annualImportValue")}
                  placeholder="500,000"
                />
                {importForm.formState.errors.annualImportValue && (
                  <p className={errorClass}>{importForm.formState.errors.annualImportValue.message}</p>
                )}
              </div>
              <div>
                <label className={labelClass}>Primary countries of origin</label>
                <div className="flex flex-wrap gap-2 mt-1">
                  {countries.map((c) => (
                    <button
                      key={c}
                      type="button"
                      onClick={() => {
                        const current = importForm.getValues("primaryCountries");
                        const updated = current.includes(c)
                          ? current.filter((x) => x !== c)
                          : [...current, c];
                        importForm.setValue("primaryCountries", updated);
                      }}
                      className={`px-4 py-2 rounded-lg text-[14px] font-medium border transition-all cursor-pointer ${
                        importForm.getValues("primaryCountries").includes(c)
                          ? "bg-recoup-black text-white border-recoup-black"
                          : "bg-white text-recoup-gray border-recoup-border hover:border-recoup-gray"
                      }`}
                    >
                      {c}
                    </button>
                  ))}
                </div>
                {importForm.formState.errors.primaryCountries && (
                  <p className={errorClass}>{importForm.formState.errors.primaryCountries.message}</p>
                )}
              </div>
              <div>
                <label className={labelClass}>Estimated months imported under IEEPA</label>
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
                  <p className={errorClass}>{importForm.formState.errors.monthsUnderIEEPA.message}</p>
                )}
              </div>
              <div>
                <label className={labelClass}>Do you have your CBP entry numbers?</label>
                <div className="flex gap-3 mt-1">
                  {["Yes", "No"].map((v) => (
                    <button
                      key={v}
                      type="button"
                      onClick={() => importForm.setValue("hasEntryNumbers", v.toLowerCase() as "yes" | "no")}
                      className={`px-6 py-2.5 rounded-lg text-[14px] font-medium border transition-all cursor-pointer ${
                        importForm.getValues("hasEntryNumbers") === v.toLowerCase()
                          ? "bg-recoup-black text-white border-recoup-black"
                          : "bg-white text-recoup-gray border-recoup-border hover:border-recoup-gray"
                      }`}
                    >
                      {v}
                    </button>
                  ))}
                </div>
                {importForm.formState.errors.hasEntryNumbers && (
                  <p className={errorClass}>{importForm.formState.errors.hasEntryNumbers.message}</p>
                )}
              </div>
            </div>
          </div>
        )}

        {/* Step 3: Choose plan */}
        {step === 2 && (
          <div>
            <h2
              className="text-[28px] sm:text-[36px] font-normal mb-2"
              style={{ fontFamily: "var(--font-serif)", letterSpacing: -0.5 }}
            >
              Choose your plan
            </h2>
            <p className="text-recoup-gray text-base mb-10">
              All plans include a flat fee — we never take a percentage.
            </p>
            <div className="space-y-4">
              {tierData.map((t) => (
                <button
                  key={t.id}
                  type="button"
                  onClick={() => planForm.setValue("tier", t.id as "essentials" | "full_filing" | "priority")}
                  className={`w-full text-left p-6 rounded-xl border-2 transition-all cursor-pointer ${
                    planForm.getValues("tier") === t.id
                      ? "border-recoup-black bg-recoup-light"
                      : "border-recoup-border bg-white hover:border-recoup-gray"
                  }`}
                >
                  <div className="flex items-start justify-between mb-2">
                    <div>
                      <span className="text-[16px] font-semibold text-recoup-black">
                        {t.name}
                      </span>
                      {t.popular && (
                        <span className="ml-3 text-[10px] font-bold tracking-[1px] uppercase bg-recoup-black text-white px-2.5 py-1 rounded-md">
                          Most popular
                        </span>
                      )}
                    </div>
                    <span
                      className="text-[24px] font-normal text-recoup-black"
                      style={{ fontFamily: "var(--font-serif)" }}
                    >
                      {t.price}
                    </span>
                  </div>
                  <p className="text-[14px] text-recoup-gray leading-relaxed m-0">
                    {t.desc}
                  </p>
                </button>
              ))}
            </div>
            {planForm.formState.errors.tier && (
              <p className={`${errorClass} mt-6`}>{planForm.formState.errors.tier.message}</p>
            )}

            <div className="mt-8 p-5 bg-recoup-light rounded-xl">
              <label className="flex items-center gap-3 cursor-pointer">
                <input
                  type="checkbox"
                  {...planForm.register("wantsAdvance")}
                  className="w-5 h-5 rounded border-recoup-border accent-recoup-black"
                />
                <div>
                  <span className="text-[15px] font-medium text-recoup-black">
                    I also want to explore advance funding
                  </span>
                  <p className="text-[13px] text-recoup-gray mt-0.5">
                    Receive up to 75% of your refund in days. Non-recourse.
                  </p>
                </div>
              </label>
            </div>
          </div>
        )}

        {/* Step 4: Review */}
        {step === 3 && (
          <div>
            <h2
              className="text-[28px] sm:text-[36px] font-normal mb-2"
              style={{ fontFamily: "var(--font-serif)", letterSpacing: -0.5 }}
            >
              Review & submit
            </h2>
            <p className="text-recoup-gray text-base mb-10">
              Confirm your details. Payment will be collected on the next screen.
            </p>

            <div className="space-y-6">
              <div className="p-6 bg-recoup-light rounded-xl">
                <h3 className="text-[13px] font-semibold text-recoup-gray tracking-wide uppercase mb-4">
                  Contact
                </h3>
                <div className="grid grid-cols-2 gap-y-3 text-[14px]">
                  <span className="text-recoup-gray">Name</span>
                  <span className="text-recoup-black font-medium">{allData.fullName || "—"}</span>
                  <span className="text-recoup-gray">Company</span>
                  <span className="text-recoup-black font-medium">{allData.companyName || "—"}</span>
                  <span className="text-recoup-gray">Email</span>
                  <span className="text-recoup-black font-medium">{allData.email || "—"}</span>
                  <span className="text-recoup-gray">Phone</span>
                  <span className="text-recoup-black font-medium">{allData.phone || "—"}</span>
                </div>
              </div>

              <div className="p-6 bg-recoup-light rounded-xl">
                <h3 className="text-[13px] font-semibold text-recoup-gray tracking-wide uppercase mb-4">
                  Import Details
                </h3>
                <div className="grid grid-cols-2 gap-y-3 text-[14px]">
                  <span className="text-recoup-gray">IOR</span>
                  <span className="text-recoup-black font-medium">{allData.iorNumber || "—"}</span>
                  <span className="text-recoup-gray">Import value</span>
                  <span className="text-recoup-black font-medium">{allData.annualImportValue ? `$${allData.annualImportValue}` : "—"}</span>
                  <span className="text-recoup-gray">Countries</span>
                  <span className="text-recoup-black font-medium">{allData.primaryCountries.join(", ") || "—"}</span>
                  <span className="text-recoup-gray">Months</span>
                  <span className="text-recoup-black font-medium">{allData.monthsUnderIEEPA || "—"}</span>
                </div>
              </div>

              <div className="p-6 bg-recoup-light rounded-xl">
                <h3 className="text-[13px] font-semibold text-recoup-gray tracking-wide uppercase mb-4">
                  Selected Plan
                </h3>
                <div className="flex justify-between items-center">
                  <span className="text-[16px] font-semibold text-recoup-black">
                    {tierData.find((t) => t.id === allData.tier)?.name}
                  </span>
                  <span
                    className="text-[28px] font-normal"
                    style={{ fontFamily: "var(--font-serif)" }}
                  >
                    {tierData.find((t) => t.id === allData.tier)?.price}
                  </span>
                </div>
                {allData.wantsAdvance && (
                  <p className="text-[13px] text-recoup-gray mt-2">
                    + Advance funding exploration requested
                  </p>
                )}
              </div>
            </div>
          </div>
        )}

        {/* Navigation */}
        <div className="flex justify-between items-center mt-12 pt-8 border-t border-recoup-border">
          {step > 0 ? (
            <button
              onClick={() => setStep(step - 1)}
              className="flex items-center gap-2 text-[15px] font-medium text-recoup-gray hover:text-recoup-black transition-colors cursor-pointer bg-transparent border-0 p-0"
            >
              <ArrowLeft size={16} />
              Back
            </button>
          ) : (
            <div />
          )}

          {step < 3 ? (
            <Button onClick={handleContinue} variant="dark">
              Continue
              <ArrowRight size={16} className="ml-2" />
            </Button>
          ) : (
            <Button
              onClick={handleSubmit}
              variant="dark"
              className="!px-10"
              disabled={submitting}
            >
              {submitting ? "Submitting..." : "Submit application →"}
            </Button>
          )}
        </div>
      </div>
    </div>
  );
}

export default function ApplyPage() {
  return (
    <Suspense fallback={
      <div className="min-h-screen flex items-center justify-center">
        <p className="text-recoup-gray">Loading...</p>
      </div>
    }>
      <IntakeFormInner />
    </Suspense>
  );
}
