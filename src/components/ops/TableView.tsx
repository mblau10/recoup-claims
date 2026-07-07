"use client";

import { useMemo, useState } from "react";
import { ArrowUpDown } from "lucide-react";
import { fmtMoney, Product, STAGES, teamById } from "@/lib/ops-data";
import HealthBadge from "./HealthBadge";

type SortKey = "code" | "name" | "stage" | "owner" | "days" | "update" | "value" | "priority";

const COLUMNS: { key: SortKey; label: string; numeric?: boolean }[] = [
  { key: "code", label: "ID" },
  { key: "name", label: "Product" },
  { key: "stage", label: "Stage" },
  { key: "owner", label: "Owner" },
  { key: "days", label: "In stage", numeric: true },
  { key: "update", label: "Last update", numeric: true },
  { key: "value", label: "Value", numeric: true },
  { key: "priority", label: "Pri" },
];

const HEALTH_ORDER = { blocked: 0, watch: 1, on_track: 2 };

export default function TableView({ products }: { products: Product[] }) {
  const [sortKey, setSortKey] = useState<SortKey>("days");
  const [asc, setAsc] = useState(false);

  const sorted = useMemo(() => {
    const dir = asc ? 1 : -1;
    return [...products].sort((a, b) => {
      switch (sortKey) {
        case "code":
          return dir * a.code.localeCompare(b.code);
        case "name":
          return dir * a.name.localeCompare(b.name);
        case "stage":
          return dir * (a.stageIndex - b.stageIndex);
        case "owner":
          return (
            dir *
            (teamById.get(a.ownerId)?.name ?? "").localeCompare(
              teamById.get(b.ownerId)?.name ?? "",
            )
          );
        case "days":
          return dir * (a.daysInStage - b.daysInStage);
        case "update":
          return dir * (a.lastUpdateDays - b.lastUpdateDays);
        case "value":
          return dir * (a.value - b.value);
        case "priority":
          return dir * a.priority.localeCompare(b.priority);
      }
    });
  }, [products, sortKey, asc]);

  const toggleSort = (key: SortKey) => {
    if (key === sortKey) setAsc(!asc);
    else {
      setSortKey(key);
      setAsc(key === "code" || key === "name" || key === "owner" || key === "priority");
    }
  };

  return (
    <div
      className="border overflow-x-auto"
      style={{
        borderColor: "var(--color-recoup-line-soft)",
        background: "rgba(255, 255, 255, 0.35)",
      }}
    >
      <table className="w-full min-w-[880px] border-collapse text-[13px]">
        <thead>
          <tr
            className="border-b"
            style={{ borderColor: "var(--color-recoup-ink)" }}
          >
            {COLUMNS.map((col) => (
              <th
                key={col.key}
                className={`px-4 py-3 ${col.numeric ? "text-right" : "text-left"}`}
              >
                <button
                  type="button"
                  onClick={() => toggleSort(col.key)}
                  aria-sort={
                    sortKey === col.key
                      ? asc
                        ? "ascending"
                        : "descending"
                      : undefined
                  }
                  className={`inline-flex items-center gap-1 text-[9px] tracking-[0.14em] uppercase cursor-pointer ${col.numeric ? "flex-row-reverse" : ""}`}
                  style={{
                    fontFamily: "var(--font-mono)",
                    color:
                      sortKey === col.key
                        ? "var(--color-recoup-ember)"
                        : "var(--color-recoup-muted)",
                  }}
                >
                  {col.label}
                  <ArrowUpDown size={10} />
                </button>
              </th>
            ))}
            <th className="px-4 py-3 text-left">
              <span
                className="text-[9px] tracking-[0.14em] uppercase"
                style={{
                  fontFamily: "var(--font-mono)",
                  color: "var(--color-recoup-muted)",
                }}
              >
                Health
              </span>
            </th>
          </tr>
        </thead>
        <tbody>
          {sorted.map((p) => {
            const stage = STAGES[p.stageIndex];
            const overSla = p.daysInStage > stage.slaDays;
            return (
              <tr
                key={p.id}
                className="border-b transition-colors hover:bg-[rgba(255,255,255,0.6)]"
                style={{ borderColor: "var(--color-recoup-line-soft)" }}
              >
                <td
                  className="px-4 py-3 text-[11px]"
                  style={{
                    fontFamily: "var(--font-mono)",
                    color: "var(--color-recoup-muted)",
                  }}
                >
                  {p.code}
                </td>
                <td className="px-4 py-3" style={{ color: "var(--color-recoup-ink)" }}>
                  {p.name}
                </td>
                <td className="px-4 py-3" style={{ color: "var(--color-recoup-ink)" }}>
                  <span
                    className="text-[10px] tracking-[0.06em] uppercase"
                    style={{ fontFamily: "var(--font-mono)" }}
                  >
                    {String(p.stageIndex + 1).padStart(2, "0")} {stage.label}
                  </span>
                </td>
                <td className="px-4 py-3" style={{ color: "var(--color-recoup-ink)" }}>
                  {teamById.get(p.ownerId)?.name}
                </td>
                <td
                  className="px-4 py-3 text-right"
                  style={{
                    color: overSla ? "#93702F" : "var(--color-recoup-ink)",
                    fontVariantNumeric: "tabular-nums",
                  }}
                >
                  {p.daysInStage}d{overSla ? " !" : ""}
                </td>
                <td
                  className="px-4 py-3 text-right"
                  style={{
                    color: "var(--color-recoup-muted)",
                    fontVariantNumeric: "tabular-nums",
                  }}
                >
                  {p.lastUpdateDays === 0 ? "today" : `${p.lastUpdateDays}d ago`}
                </td>
                <td
                  className="px-4 py-3 text-right"
                  style={{
                    color: "var(--color-recoup-ink)",
                    fontVariantNumeric: "tabular-nums",
                  }}
                >
                  {fmtMoney(p.value)}
                </td>
                <td
                  className="px-4 py-3 text-[11px]"
                  style={{
                    fontFamily: "var(--font-mono)",
                    color:
                      p.priority === "P0"
                        ? "var(--color-recoup-ember)"
                        : "var(--color-recoup-muted)",
                  }}
                >
                  {p.priority}
                </td>
                <td className="px-4 py-3">
                  <HealthBadge health={p.health} />
                </td>
              </tr>
            );
          })}
          {sorted.length === 0 && (
            <tr>
              <td
                colSpan={9}
                className="px-4 py-10 text-center text-[13px]"
                style={{ color: "var(--color-recoup-muted)" }}
              >
                No products match the current filters.
              </td>
            </tr>
          )}
        </tbody>
      </table>
    </div>
  );
}
