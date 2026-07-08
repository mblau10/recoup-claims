"use client";

import { fmtMoney, Product, STAGES, teamById } from "@/lib/ops-data";
import HealthBadge from "./HealthBadge";

export default function BoardView({ products }: { products: Product[] }) {
  const byStage = STAGES.map((_, i) =>
    products
      .filter((p) => p.stageIndex === i)
      .sort((a, b) => b.daysInStage - a.daysInStage),
  );

  return (
    <div className="overflow-x-auto pb-4">
      <div className="flex gap-3" style={{ minWidth: 10 * 236 }}>
        {STAGES.map((stage, i) => (
          <div key={stage.key} className="w-[224px] flex-shrink-0">
            {/* Column header */}
            <div
              className="flex items-baseline justify-between border-b pb-2 mb-3"
              style={{ borderColor: "var(--color-recoup-ink)" }}
            >
              <span
                className="text-[10px] tracking-[0.12em] uppercase"
                style={{
                  fontFamily: "var(--font-mono)",
                  color: "var(--color-recoup-ink)",
                }}
              >
                {String(i + 1).padStart(2, "0")} {stage.label}
              </span>
              <span
                className="text-[10px]"
                style={{
                  fontFamily: "var(--font-mono)",
                  color: "var(--color-recoup-muted)",
                  fontVariantNumeric: "tabular-nums",
                }}
              >
                {byStage[i].length}
              </span>
            </div>

            <div className="space-y-2">
              {byStage[i].length === 0 && (
                <div
                  className="text-[11px] py-4 text-center border border-dashed"
                  style={{
                    color: "var(--color-recoup-muted2)",
                    borderColor: "var(--color-recoup-line-soft)",
                  }}
                >
                  No products
                </div>
              )}
              {byStage[i].map((p) => {
                const owner = teamById.get(p.ownerId);
                const overSla = p.daysInStage > stage.slaDays;
                return (
                  <div
                    key={p.id}
                    className="border p-3 transition-colors hover:border-[color:var(--color-recoup-ink)]"
                    style={{
                      borderColor: "var(--color-recoup-line-soft)",
                      background: "rgba(255, 255, 255, 0.45)",
                    }}
                  >
                    <div className="flex items-baseline justify-between gap-2 mb-1">
                      <span
                        className="text-[9px] tracking-[0.1em]"
                        style={{
                          fontFamily: "var(--font-mono)",
                          color: "var(--color-recoup-muted)",
                        }}
                      >
                        {p.code} · {p.priority}
                      </span>
                      <span
                        className="text-[10px] font-medium"
                        style={{
                          color: "var(--color-recoup-ink)",
                          fontVariantNumeric: "tabular-nums",
                        }}
                      >
                        {fmtMoney(p.value)}
                      </span>
                    </div>
                    <div
                      className="text-[13px] leading-snug mb-2"
                      style={{ color: "var(--color-recoup-ink)" }}
                    >
                      {p.name}
                    </div>
                    <div className="flex items-center justify-between gap-2">
                      <span className="flex items-center gap-1.5">
                        <span
                          className="w-5 h-5 flex items-center justify-center text-[8px] tracking-[0.05em] flex-shrink-0"
                          style={{
                            fontFamily: "var(--font-mono)",
                            background: "var(--color-recoup-ink)",
                            color: "var(--color-recoup-paper)",
                          }}
                          title={owner?.name}
                        >
                          {owner?.initials}
                        </span>
                        <span
                          className="text-[10px]"
                          style={{
                            color: overSla
                              ? "#93702F"
                              : "var(--color-recoup-muted)",
                            fontVariantNumeric: "tabular-nums",
                          }}
                        >
                          {p.daysInStage}d{overSla ? " ⏤ over SLA" : ""}
                        </span>
                      </span>
                      {p.health !== "on_track" && (
                        <HealthBadge health={p.health} compact />
                      )}
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
