"use client";

import { STAGES } from "@/lib/ops-data";

const PLOT_HEIGHT = 168;
// Headroom above the tallest bar so cap labels, the top tick, and tooltips
// never clip against the container edge.
const HEADROOM = 32;
const INK = "#0A0A0B";
const EMBER_DEEP = "#E04515"; // ≥3:1 on paper — chart-safe ember step
const DEEMPHASIS = "#C9C2B4"; // recessive gray for non-selected bars

interface StageChartProps {
  /** Product count per stage index (length 10). */
  counts: number[];
  /** At-risk (watch + blocked) count per stage index. */
  atRisk: number[];
  selectedStage: number | null;
  onSelect: (stageIndex: number | null) => void;
}

export default function StageChart({
  counts,
  atRisk,
  selectedStage,
  onSelect,
}: StageChartProps) {
  const max = Math.max(...counts, 1);
  const niceMax = Math.max(4, Math.ceil(max / 4) * 4);
  const ticks = [0, niceMax / 2, niceMax];

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
          Pipeline by stage
        </div>
        <div
          className="text-[10px] tracking-[0.1em] uppercase"
          style={{
            fontFamily: "var(--font-mono)",
            color: "var(--color-recoup-muted)",
          }}
        >
          {selectedStage === null
            ? "Click a stage to filter"
            : `Filtered: ${STAGES[selectedStage].label} — click again to clear`}
        </div>
      </div>

      <div className="overflow-x-auto">
        <div className="min-w-[760px]">
          {/* Plot area — container includes the label band below, nothing clipped */}
          <div className="relative" style={{ height: PLOT_HEIGHT + HEADROOM }}>
            {/* Recessive solid hairline gridlines with clean tick values */}
            {ticks.map((t) => (
              <div
                key={t}
                className="absolute left-0 right-0 flex items-center"
                style={{ bottom: (t / niceMax) * PLOT_HEIGHT }}
              >
                <span
                  className="w-6 text-right pr-2 text-[9px] -translate-y-1/2"
                  style={{
                    fontFamily: "var(--font-mono)",
                    color: "var(--color-recoup-muted2)",
                    fontVariantNumeric: "tabular-nums",
                  }}
                >
                  {t}
                </span>
                <span
                  className="flex-1 h-px"
                  style={{
                    background:
                      t === 0
                        ? "var(--color-recoup-line-soft)"
                        : "rgba(10, 10, 11, 0.06)",
                  }}
                />
              </div>
            ))}

            {/* Bars */}
            <div className="absolute inset-y-0 left-6 right-0 flex">
              {STAGES.map((stage, i) => {
                const h = Math.round((counts[i] / niceMax) * PLOT_HEIGHT);
                const isSelected = selectedStage === i;
                const dimmed = selectedStage !== null && !isSelected;
                return (
                  <button
                    key={stage.key}
                    type="button"
                    onClick={() => onSelect(isSelected ? null : i)}
                    aria-label={`${stage.label}: ${counts[i]} products, ${atRisk[i]} at risk. ${isSelected ? "Clear stage filter" : "Filter to this stage"}`}
                    aria-pressed={isSelected}
                    className="group relative flex-1 flex items-end justify-center cursor-pointer outline-none"
                  >
                    {/* Value on the cap */}
                    <span
                      className="absolute text-[10px] font-medium"
                      style={{
                        bottom: h + 5,
                        color: dimmed
                          ? "var(--color-recoup-muted2)"
                          : "var(--color-recoup-ink)",
                        fontVariantNumeric: "tabular-nums",
                      }}
                    >
                      {counts[i]}
                    </span>
                    {/* The mark: thin bar, 4px rounded data-end, square baseline */}
                    <span
                      className="w-5 rounded-t-[4px] transition-all duration-150 group-hover:opacity-80 group-focus-visible:opacity-80"
                      style={{
                        height: Math.max(h, counts[i] > 0 ? 3 : 0),
                        background: isSelected
                          ? EMBER_DEEP
                          : dimmed
                            ? DEEMPHASIS
                            : INK,
                      }}
                    />
                    {/* Tooltip — enhances; the same values live on caps and in the table view */}
                    <span
                      role="tooltip"
                      className={`pointer-events-none absolute z-10 hidden group-hover:block group-focus-visible:block px-3 py-2 text-left whitespace-nowrap ${
                        i <= 1
                          ? "left-0"
                          : i >= STAGES.length - 2
                            ? "right-0"
                            : "left-1/2 -translate-x-1/2"
                      }`}
                      style={{
                        // Above the cap, clamped so it never leaves the plot.
                        bottom: Math.min(h + 24, PLOT_HEIGHT + HEADROOM - 56),
                        background: "var(--color-recoup-ink)",
                        color: "var(--color-recoup-paper)",
                      }}
                    >
                      <span className="block text-[14px] font-semibold leading-tight">
                        {counts[i]}{" "}
                        <span className="font-normal text-[11px]">
                          {counts[i] === 1 ? "product" : "products"}
                        </span>
                      </span>
                      <span
                        className="block text-[9px] tracking-[0.12em] uppercase mt-1"
                        style={{
                          fontFamily: "var(--font-mono)",
                          color: "rgba(246, 242, 234, 0.65)",
                        }}
                      >
                        {stage.label} · {atRisk[i]} at risk
                      </span>
                    </span>
                  </button>
                );
              })}
            </div>
          </div>

          {/* Stage label band — its own space below the plot */}
          <div className="flex pl-6 pt-3 border-t-0">
            {STAGES.map((stage, i) => (
              <div key={stage.key} className="flex-1 text-center">
                <div
                  className="text-[9px] tracking-[0.08em] uppercase leading-tight"
                  style={{
                    fontFamily: "var(--font-mono)",
                    color:
                      selectedStage === i
                        ? EMBER_DEEP
                        : "var(--color-recoup-muted)",
                  }}
                >
                  {String(i + 1).padStart(2, "0")}
                  <br />
                  {stage.label}
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
