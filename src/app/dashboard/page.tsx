"use client";

import { useState } from "react";
import { FileText, Clock, DollarSign, CheckCircle, ArrowRight } from "lucide-react";
import Button from "@/components/ui/Button";

// This is a placeholder dashboard — in production, data comes from Supabase auth + queries
const mockData = {
  status: "in_progress" as const,
  companyName: "Demo Company",
  tier: "Full Filing",
  estimatedRefund: 87500,
  filingDate: null as string | null,
  cbpConfirmation: null as string | null,
};

const statusSteps = [
  { key: "paid", label: "Payment received", icon: DollarSign },
  { key: "in_progress", label: "Declaration in progress", icon: FileText },
  { key: "filed", label: "Filed with CAPE", icon: Clock },
  { key: "refunded", label: "Refund received", icon: CheckCircle },
];

export default function Dashboard() {
  const [data] = useState(mockData);

  const currentStepIndex = statusSteps.findIndex((s) => s.key === data.status);

  const fmt = (n: number) => "$" + n.toLocaleString();

  return (
    <div className="min-h-screen bg-recoup-light">
      {/* Header */}
      <div className="bg-white border-b border-recoup-border">
        <div className="max-w-[960px] mx-auto px-6 py-5 flex items-center justify-between">
          <a
            href="/"
            className="text-[20px] font-medium text-recoup-black no-underline"
            style={{ fontFamily: "var(--font-serif)", letterSpacing: -0.5 }}
          >
            recoup
          </a>
          <span className="text-[13px] text-recoup-gray">Dashboard</span>
        </div>
      </div>

      <div className="max-w-[960px] mx-auto px-6 py-12">
        {/* Welcome */}
        <h1
          className="text-[28px] sm:text-[36px] font-normal mb-2"
          style={{ fontFamily: "var(--font-serif)", letterSpacing: -0.5 }}
        >
          Welcome back.
        </h1>
        <p className="text-recoup-gray text-base mb-10">
          Here's the status of your IEEPA tariff refund filing.
        </p>

        {/* Status tracker */}
        <div className="bg-white rounded-2xl p-8 sm:p-10 mb-6">
          <h2 className="text-[13px] font-semibold text-recoup-gray tracking-wide uppercase mb-8">
            Filing Progress
          </h2>
          <div className="flex flex-col sm:flex-row justify-between gap-6">
            {statusSteps.map((s, i) => {
              const isComplete = i <= currentStepIndex;
              const isCurrent = i === currentStepIndex;
              const Icon = s.icon;

              return (
                <div key={s.key} className="flex-1 flex items-start gap-3">
                  <div
                    className={`w-10 h-10 rounded-xl flex items-center justify-center flex-shrink-0 ${
                      isComplete
                        ? "bg-recoup-black text-white"
                        : "bg-recoup-light text-recoup-gray2"
                    }`}
                  >
                    <Icon size={18} />
                  </div>
                  <div>
                    <p
                      className={`text-[14px] font-medium ${
                        isComplete ? "text-recoup-black" : "text-recoup-gray2"
                      }`}
                    >
                      {s.label}
                    </p>
                    {isCurrent && (
                      <p className="text-[12px] text-recoup-gray mt-0.5">
                        Current step
                      </p>
                    )}
                  </div>
                  {i < statusSteps.length - 1 && (
                    <ArrowRight
                      size={14}
                      className="text-recoup-border mt-3 hidden sm:block ml-auto"
                    />
                  )}
                </div>
              );
            })}
          </div>
        </div>

        {/* Details */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
          <div className="bg-white rounded-2xl p-8">
            <h3 className="text-[13px] font-semibold text-recoup-gray tracking-wide uppercase mb-4">
              Your Estimate
            </h3>
            <div
              className="text-[40px] font-normal mb-1"
              style={{ fontFamily: "var(--font-serif)", letterSpacing: -1 }}
            >
              {fmt(data.estimatedRefund)}
            </div>
            <p className="text-[13px] text-recoup-gray2">
              Based on submitted import data
            </p>
          </div>
          <div className="bg-white rounded-2xl p-8">
            <h3 className="text-[13px] font-semibold text-recoup-gray tracking-wide uppercase mb-4">
              Plan Details
            </h3>
            <p className="text-[16px] font-medium text-recoup-black mb-1">
              {data.tier}
            </p>
            <p className="text-[13px] text-recoup-gray2 mb-4">
              {data.companyName}
            </p>
            {data.cbpConfirmation && (
              <p className="text-[13px] text-recoup-gray">
                CBP Confirmation: {data.cbpConfirmation}
              </p>
            )}
          </div>
        </div>

        {/* Help */}
        <div className="mt-8 bg-white rounded-2xl p-8 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
          <div>
            <h3 className="text-[15px] font-semibold text-recoup-black mb-1">
              Need help?
            </h3>
            <p className="text-[14px] text-recoup-gray">
              Reach out to your filing specialist or email support@recoup.claims.
            </p>
          </div>
          <Button href="mailto:support@recoup.claims" variant="ghost" className="flex-shrink-0">
            Contact support
          </Button>
        </div>
      </div>
    </div>
  );
}
