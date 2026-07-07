"use client";

import { AlertTriangle } from "lucide-react";
import { fmtMoney, Product, TEAM } from "@/lib/ops-data";

const INK = "#0A0A0B";
const GOLD_DEEP = "#93702F";

export default function TeamView({ products }: { products: Product[] }) {
  const rows = TEAM.map((member) => {
    const owned = products.filter((p) => p.ownerId === member.id);
    return {
      member,
      load: owned.length,
      atRisk: owned.filter((p) => p.health !== "on_track").length,
      value: owned.reduce((sum, p) => sum + p.value, 0),
    };
  }).sort((a, b) => b.load - a.load);

  const scaleMax = Math.max(...rows.map((r) => Math.max(r.load, r.member.capacity)), 1) + 2;

  return (
    <div
      className="border p-6 sm:p-8"
      style={{
        borderColor: "var(--color-recoup-line-soft)",
        background: "rgba(255, 255, 255, 0.35)",
      }}
    >
      <div className="flex items-baseline justify-between mb-6">
        <div
          className="text-[10px] tracking-[0.18em] uppercase"
          style={{
            fontFamily: "var(--font-mono)",
            color: "var(--color-recoup-ember)",
          }}
        >
          Workload — products per owner
        </div>
        <div
          className="text-[10px] tracking-[0.1em] uppercase hidden sm:block"
          style={{
            fontFamily: "var(--font-mono)",
            color: "var(--color-recoup-muted)",
          }}
        >
          Hairline = capacity
        </div>
      </div>

      <div className="space-y-4">
        {rows.map(({ member, load, atRisk, value }) => {
          const over = load > member.capacity;
          return (
            <div key={member.id} className="grid grid-cols-[150px_1fr] sm:grid-cols-[190px_1fr_150px] items-center gap-3">
              <div className="min-w-0">
                <div
                  className="text-[13px] truncate"
                  style={{ color: "var(--color-recoup-ink)" }}
                >
                  {member.name}
                </div>
                <div
                  className="text-[9px] tracking-[0.1em] uppercase"
                  style={{
                    fontFamily: "var(--font-mono)",
                    color: "var(--color-recoup-muted)",
                  }}
                >
                  {member.role}
                </div>
              </div>

              {/* Bar lane */}
              <div className="relative h-6 flex items-center">
                {/* Baseline */}
                <div
                  className="absolute left-0 top-0 bottom-0 w-px"
                  style={{ background: "var(--color-recoup-line-soft)" }}
                />
                {/* The mark: thin bar, rounded data-end, square at baseline */}
                <div
                  className="h-[14px] rounded-r-[4px]"
                  style={{
                    width: `${(load / scaleMax) * 100}%`,
                    background: INK,
                    minWidth: load > 0 ? 3 : 0,
                  }}
                />
                {/* Value at the tip */}
                <span
                  className="ml-2 text-[11px] font-medium"
                  style={{
                    color: "var(--color-recoup-ink)",
                    fontVariantNumeric: "tabular-nums",
                  }}
                >
                  {load}
                </span>
                {/* Capacity marker — solid hairline */}
                <div
                  className="absolute top-0 bottom-0 w-px"
                  style={{
                    left: `${(member.capacity / scaleMax) * 100}%`,
                    background: "var(--color-recoup-muted2)",
                  }}
                  title={`Capacity: ${member.capacity}`}
                />
              </div>

              <div className="col-span-2 sm:col-span-1 flex items-center justify-start sm:justify-end gap-4 pl-0 sm:pl-2">
                {over && (
                  <span
                    className="inline-flex items-center gap-1 text-[9px] tracking-[0.1em] uppercase"
                    style={{ fontFamily: "var(--font-mono)", color: GOLD_DEEP }}
                  >
                    <AlertTriangle size={11} strokeWidth={2.2} />
                    Over capacity
                  </span>
                )}
                <span
                  className="text-[10px] tracking-[0.06em] uppercase"
                  style={{
                    fontFamily: "var(--font-mono)",
                    color:
                      atRisk > 0 ? "#E04515" : "var(--color-recoup-muted)",
                    fontVariantNumeric: "tabular-nums",
                  }}
                >
                  {atRisk} at risk
                </span>
                <span
                  className="text-[10px]"
                  style={{
                    fontFamily: "var(--font-mono)",
                    color: "var(--color-recoup-muted)",
                    fontVariantNumeric: "tabular-nums",
                  }}
                >
                  {fmtMoney(value)}
                </span>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
