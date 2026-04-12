"use client";

import { useState } from "react";
import {
  FileText,
  Clock,
  DollarSign,
  CheckCircle,
  ArrowRight,
} from "lucide-react";
import Button from "@/components/ui/Button";

// Placeholder dashboard — in production, data comes from Supabase auth + queries.
const mockData = {
  status: "in_progress" as const,
  companyName: "Acme Imports, LLC",
  track: "Filing (Track B · $895 / 1.5%)",
  engagementId: "RCP-2026-04-0381",
  estimatedRefund: 87500,
  filingDate: null as string | null,
  cbpConfirmation: null as string | null,
  primaryCountries: "Vietnam, China",
};

const statusSteps = [
  { key: "engaged", label: "Engagement received", icon: DollarSign },
  { key: "in_progress", label: "Declaration in progress", icon: FileText },
  { key: "filed", label: "Filed with CAPE", icon: Clock },
  { key: "refunded", label: "Refund received", icon: CheckCircle },
];

export default function Dashboard() {
  const [data] = useState(mockData);

  const currentStepIndex = statusSteps.findIndex((s) => s.key === data.status);
  const fmt = (n: number) => "$" + n.toLocaleString();

  return (
    <div
      className="min-h-screen"
      style={{ background: "var(--color-recoup-paper)" }}
    >
      {/* Header */}
      <header
        className="border-b"
        style={{ borderColor: "var(--color-recoup-line-soft)" }}
      >
        <div className="max-w-[1100px] mx-auto px-6 sm:px-10 py-5 flex items-center justify-between">
          <a
            href="/"
            className="flex items-baseline gap-2 no-underline"
            style={{ color: "var(--color-recoup-ink)" }}
          >
            <span
              className="text-[24px] leading-none"
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
          <div className="flex items-center gap-6">
            <span
              className="text-[11px] tracking-[0.18em] uppercase hidden sm:inline"
              style={{
                fontFamily: "var(--font-mono)",
                color: "var(--color-recoup-muted)",
              }}
            >
              Engagement {data.engagementId}
            </span>
            <a
              href="mailto:support@recoup.claims"
              className="text-[12px] no-underline"
              style={{
                fontFamily: "var(--font-mono)",
                color: "var(--color-recoup-ink)",
              }}
            >
              Support →
            </a>
          </div>
        </div>
      </header>

      <div className="max-w-[1100px] mx-auto px-6 sm:px-10 py-16 sm:py-20">
        {/* Eyebrow + title */}
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
            Your engagement
          </span>
        </div>
        <h1
          className="text-[44px] sm:text-[60px] font-normal leading-[0.96] tracking-[-0.025em] mb-4 max-w-[800px]"
          style={{
            fontFamily: "var(--font-display)",
            color: "var(--color-recoup-ink)",
          }}
        >
          Welcome back,{" "}
          <em
            style={{
              fontStyle: "italic",
              color: "var(--color-recoup-ember)",
            }}
          >
            {data.companyName.split(",")[0]}.
          </em>
        </h1>
        <p
          className="text-[15px] sm:text-[16px] leading-[1.6] mb-14 max-w-[560px]"
          style={{ color: "var(--color-recoup-muted)" }}
        >
          Here's where your IEEPA tariff refund filing stands. We update
          this page whenever CBP takes an action on your declaration.
        </p>

        {/* Status tracker */}
        <div
          className="border p-8 sm:p-10 mb-8"
          style={{
            borderColor: "var(--color-recoup-line-soft)",
            background: "rgba(255, 255, 255, 0.35)",
          }}
        >
          <div className="flex items-center justify-between mb-8">
            <div
              className="text-[10px] tracking-[0.18em] uppercase"
              style={{
                fontFamily: "var(--font-mono)",
                color: "var(--color-recoup-ember)",
              }}
            >
              Filing progress
            </div>
            <div
              className="text-[11px] tracking-[0.14em] uppercase"
              style={{
                fontFamily: "var(--font-mono)",
                color: "var(--color-recoup-muted)",
              }}
            >
              Step {currentStepIndex + 1} / {statusSteps.length}
            </div>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-4 gap-6">
            {statusSteps.map((s, i) => {
              const isComplete = i <= currentStepIndex;
              const isCurrent = i === currentStepIndex;
              const Icon = s.icon;

              return (
                <div
                  key={s.key}
                  className="relative pt-6 border-t"
                  style={{
                    borderColor: isComplete
                      ? "var(--color-recoup-ink)"
                      : "var(--color-recoup-line-soft)",
                    borderTopWidth: isComplete ? 2 : 1,
                  }}
                >
                  <div className="flex items-start gap-3">
                    <div
                      className="w-9 h-9 flex items-center justify-center flex-shrink-0 transition-all"
                      style={{
                        background: isComplete
                          ? "var(--color-recoup-ink)"
                          : "transparent",
                        color: isComplete
                          ? "var(--color-recoup-paper)"
                          : "var(--color-recoup-muted2)",
                        border: isComplete
                          ? "none"
                          : "1px solid var(--color-recoup-line-soft)",
                      }}
                    >
                      <Icon size={16} />
                    </div>
                    <div className="flex-1 min-w-0">
                      <div
                        className="text-[9px] tracking-[0.14em] uppercase mb-1"
                        style={{
                          fontFamily: "var(--font-mono)",
                          color: isCurrent
                            ? "var(--color-recoup-ember)"
                            : "var(--color-recoup-muted)",
                        }}
                      >
                        {String(i + 1).padStart(2, "0")}
                        {isCurrent ? " · current" : ""}
                      </div>
                      <p
                        className="text-[14px] leading-[1.35]"
                        style={{
                          color: isComplete
                            ? "var(--color-recoup-ink)"
                            : "var(--color-recoup-muted)",
                        }}
                      >
                        {s.label}
                      </p>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        {/* Details grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-8 mb-8">
          <div
            className="border p-8 sm:p-10"
            style={{
              borderColor: "var(--color-recoup-line-soft)",
              background: "rgba(255, 255, 255, 0.35)",
            }}
          >
            <div
              className="text-[10px] tracking-[0.18em] uppercase mb-4"
              style={{
                fontFamily: "var(--font-mono)",
                color: "var(--color-recoup-muted)",
              }}
            >
              Estimated refund
            </div>
            <div
              className="text-[48px] sm:text-[56px] font-normal leading-none mb-2"
              style={{
                fontFamily: "var(--font-display)",
                color: "var(--color-recoup-ink)",
                letterSpacing: -1.5,
              }}
            >
              {fmt(data.estimatedRefund)}
            </div>
            <p
              className="text-[12px]"
              style={{ color: "var(--color-recoup-muted)" }}
            >
              Based on submitted import data · includes statutory interest
            </p>
          </div>
          <div
            className="border p-8 sm:p-10"
            style={{
              borderColor: "var(--color-recoup-line-soft)",
              background: "rgba(255, 255, 255, 0.35)",
            }}
          >
            <div
              className="text-[10px] tracking-[0.18em] uppercase mb-4"
              style={{
                fontFamily: "var(--font-mono)",
                color: "var(--color-recoup-muted)",
              }}
            >
              Engagement details
            </div>
            <dl className="space-y-3 text-[13px]">
              {[
                ["Track", data.track],
                ["Company", data.companyName],
                ["Countries", data.primaryCountries],
                ["Engagement ID", data.engagementId],
                [
                  "CBP confirmation",
                  data.cbpConfirmation ?? "Pending submission",
                ],
              ].map(([k, v]) => (
                <div
                  key={k as string}
                  className="flex items-baseline justify-between gap-4"
                >
                  <dt
                    className="uppercase"
                    style={{
                      fontFamily: "var(--font-mono)",
                      color: "var(--color-recoup-muted)",
                      fontSize: 10,
                      letterSpacing: "0.1em",
                    }}
                  >
                    {k}
                  </dt>
                  <dd
                    className="text-right"
                    style={{ color: "var(--color-recoup-ink)" }}
                  >
                    {v}
                  </dd>
                </div>
              ))}
            </dl>
          </div>
        </div>

        {/* Help */}
        <div
          className="border p-8 sm:p-10 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-6"
          style={{
            borderColor: "var(--color-recoup-ink)",
            background: "var(--color-recoup-ink)",
          }}
        >
          <div>
            <div
              className="text-[10px] tracking-[0.18em] uppercase mb-2"
              style={{
                fontFamily: "var(--font-mono)",
                color: "var(--color-recoup-ember)",
              }}
            >
              Questions?
            </div>
            <h3
              className="text-[22px] sm:text-[26px] font-normal leading-[1.2] mb-1"
              style={{
                fontFamily: "var(--font-display)",
                color: "var(--color-recoup-paper)",
              }}
            >
              Your filing specialist is one email away.
            </h3>
            <p
              className="text-[13px]"
              style={{ color: "rgba(246, 242, 234, 0.65)" }}
            >
              Reach us at support@recoup.claims — we reply the same business
              day.
            </p>
          </div>
          <Button
            href="mailto:support@recoup.claims"
            variant="white"
            className="!px-6 !py-3 !text-[13px] flex-shrink-0"
          >
            Contact support →
          </Button>
        </div>

        {/* Footer strip */}
        <div
          className="mt-16 pt-6 border-t flex flex-col sm:flex-row justify-between gap-3 text-[11px]"
          style={{
            borderColor: "var(--color-recoup-line-soft)",
            fontFamily: "var(--font-mono)",
            color: "var(--color-recoup-muted)",
          }}
        >
          <span>© 2026 RECOUP LLC · RECOUP.CLAIMS</span>
          <span>
            <a
              href="/legal"
              className="no-underline"
              style={{ color: "var(--color-recoup-muted)" }}
            >
              Terms &amp; Privacy
            </a>
          </span>
        </div>
      </div>
    </div>
  );
}
