"use client";

import { useMemo, useState } from "react";
import { LayoutGrid, List, Search, Users, X } from "lucide-react";
import {
  fmtMoney,
  generateProducts,
  Health,
  HEALTH_META,
  STAGES,
  TEAM,
} from "@/lib/ops-data";
import StatTile from "@/components/ops/StatTile";
import StageChart from "@/components/ops/StageChart";
import BoardView from "@/components/ops/BoardView";
import TableView from "@/components/ops/TableView";
import TeamView from "@/components/ops/TeamView";

const ALL_PRODUCTS = generateProducts();

type View = "board" | "table" | "team";

const VIEWS: { key: View; label: string; icon: typeof LayoutGrid }[] = [
  { key: "board", label: "Board", icon: LayoutGrid },
  { key: "table", label: "Table", icon: List },
  { key: "team", label: "Team", icon: Users },
];

const selectStyle: React.CSSProperties = {
  fontFamily: "var(--font-mono)",
  fontSize: 10,
  letterSpacing: "0.1em",
  textTransform: "uppercase",
  color: "var(--color-recoup-ink)",
  background: "rgba(255, 255, 255, 0.45)",
  border: "1px solid var(--color-recoup-line-soft)",
  padding: "9px 24px 9px 12px",
  cursor: "pointer",
};

export default function OpsDashboard() {
  const [query, setQuery] = useState("");
  const [stageFilter, setStageFilter] = useState<number | null>(null);
  const [ownerFilter, setOwnerFilter] = useState<string>("");
  const [healthFilter, setHealthFilter] = useState<Health | "">("");
  const [view, setView] = useState<View>("board");

  // Everything below the filter row derives from one slice, so numbers agree.
  const preStage = useMemo(() => {
    const q = query.trim().toLowerCase();
    return ALL_PRODUCTS.filter((p) => {
      if (q && !`${p.name} ${p.code}`.toLowerCase().includes(q)) return false;
      if (ownerFilter && p.ownerId !== ownerFilter) return false;
      if (healthFilter && p.health !== healthFilter) return false;
      return true;
    });
  }, [query, ownerFilter, healthFilter]);

  const filtered = useMemo(
    () =>
      stageFilter === null
        ? preStage
        : preStage.filter((p) => p.stageIndex === stageFilter),
    [preStage, stageFilter],
  );

  // Chart shows the pre-stage slice so non-selected bars stay comparable.
  const counts = STAGES.map(
    (_, i) => preStage.filter((p) => p.stageIndex === i).length,
  );
  const atRiskPerStage = STAGES.map(
    (_, i) =>
      preStage.filter((p) => p.stageIndex === i && p.health !== "on_track")
        .length,
  );

  const atRisk = filtered.filter((p) => p.health !== "on_track").length;
  const blocked = filtered.filter((p) => p.health === "blocked").length;
  const avgDays =
    filtered.length === 0
      ? 0
      : filtered.reduce((s, p) => s + p.daysInStage, 0) / filtered.length;
  const totalValue = filtered.reduce((s, p) => s + p.value, 0);

  const hasFilters =
    query !== "" || stageFilter !== null || ownerFilter !== "" || healthFilter !== "";

  const clearFilters = () => {
    setQuery("");
    setStageFilter(null);
    setOwnerFilter("");
    setHealthFilter("");
  };

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
        <div className="max-w-[1280px] mx-auto px-6 sm:px-10 py-5 flex items-center justify-between">
          <a
            href="/"
            className="flex items-baseline gap-2 no-underline"
            style={{ color: "var(--color-recoup-ink)" }}
          >
            <span
              className="text-[24px] leading-none"
              style={{ fontFamily: "var(--font-display)", letterSpacing: -0.5 }}
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
              ops
            </span>
          </a>
          <span
            className="text-[11px] tracking-[0.18em] uppercase"
            style={{
              fontFamily: "var(--font-mono)",
              color: "var(--color-recoup-muted)",
            }}
          >
            Portfolio console · {ALL_PRODUCTS.length} products · {TEAM.length}{" "}
            people
          </span>
        </div>
      </header>

      <div className="max-w-[1280px] mx-auto px-6 sm:px-10 py-10 sm:py-14">
        {/* Title */}
        <div className="flex items-center gap-3 mb-4">
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
            Operations
          </span>
        </div>
        <h1
          className="text-[38px] sm:text-[48px] font-normal leading-[1.0] tracking-[-0.02em] mb-10"
          style={{
            fontFamily: "var(--font-display)",
            color: "var(--color-recoup-ink)",
          }}
        >
          The whole portfolio,{" "}
          <em style={{ fontStyle: "italic", color: "var(--color-recoup-ember)" }}>
            one page.
          </em>
        </h1>

        {/* Filter row — one row, above everything it scopes */}
        <div className="flex flex-wrap items-center gap-3 mb-8">
          <label
            className="relative flex items-center"
            style={{ minWidth: 220 }}
          >
            <Search
              size={13}
              className="absolute left-3 pointer-events-none"
              style={{ color: "var(--color-recoup-muted)" }}
            />
            <input
              type="search"
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              placeholder="SEARCH PRODUCTS…"
              aria-label="Search products by name or ID"
              className="w-full outline-none placeholder:opacity-60"
              style={{ ...selectStyle, cursor: "text", paddingLeft: 32 }}
            />
          </label>

          <select
            value={stageFilter === null ? "" : String(stageFilter)}
            onChange={(e) =>
              setStageFilter(e.target.value === "" ? null : Number(e.target.value))
            }
            aria-label="Filter by stage"
            style={selectStyle}
          >
            <option value="">All stages</option>
            {STAGES.map((s, i) => (
              <option key={s.key} value={i}>
                {String(i + 1).padStart(2, "0")} {s.label}
              </option>
            ))}
          </select>

          <select
            value={ownerFilter}
            onChange={(e) => setOwnerFilter(e.target.value)}
            aria-label="Filter by owner"
            style={selectStyle}
          >
            <option value="">All owners</option>
            {TEAM.map((t) => (
              <option key={t.id} value={t.id}>
                {t.name}
              </option>
            ))}
          </select>

          <select
            value={healthFilter}
            onChange={(e) => setHealthFilter(e.target.value as Health | "")}
            aria-label="Filter by health"
            style={selectStyle}
          >
            <option value="">All health</option>
            {(Object.keys(HEALTH_META) as Health[]).map((h) => (
              <option key={h} value={h}>
                {HEALTH_META[h].label}
              </option>
            ))}
          </select>

          {hasFilters && (
            <button
              type="button"
              onClick={clearFilters}
              className="inline-flex items-center gap-1.5 cursor-pointer"
              style={{
                fontFamily: "var(--font-mono)",
                fontSize: 10,
                letterSpacing: "0.1em",
                textTransform: "uppercase",
                color: "var(--color-recoup-ember)",
                padding: "9px 4px",
              }}
            >
              <X size={12} />
              Clear · {filtered.length} shown
            </button>
          )}
        </div>

        {/* KPI row */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-3 sm:gap-4 mb-8">
          <StatTile
            label="Products in flight"
            value={String(filtered.length)}
            sub={`of ${ALL_PRODUCTS.length} total`}
          />
          <StatTile
            label="At risk"
            value={String(atRisk)}
            sub={`${blocked} blocked · ${atRisk - blocked} slipping`}
            subColor={atRisk > 0 ? "#E04515" : undefined}
          />
          <StatTile
            label="Avg. days in stage"
            value={avgDays.toFixed(1)}
            sub="across current slice"
          />
          <StatTile
            label="Portfolio value"
            value={fmtMoney(totalValue)}
            sub="projected, current slice"
          />
        </div>

        {/* Stage distribution */}
        <div className="mb-8">
          <StageChart
            counts={counts}
            atRisk={atRiskPerStage}
            selectedStage={stageFilter}
            onSelect={setStageFilter}
          />
        </div>

        {/* View switcher */}
        <div
          className="flex items-center gap-1 mb-6 border-b"
          style={{ borderColor: "var(--color-recoup-line-soft)" }}
        >
          {VIEWS.map(({ key, label, icon: Icon }) => {
            const active = view === key;
            return (
              <button
                key={key}
                type="button"
                onClick={() => setView(key)}
                aria-pressed={active}
                className="inline-flex items-center gap-2 px-4 py-3 -mb-px cursor-pointer border-b-2 transition-colors"
                style={{
                  fontFamily: "var(--font-mono)",
                  fontSize: 10,
                  letterSpacing: "0.14em",
                  textTransform: "uppercase",
                  color: active
                    ? "var(--color-recoup-ink)"
                    : "var(--color-recoup-muted)",
                  borderColor: active ? "var(--color-recoup-ember)" : "transparent",
                }}
              >
                <Icon size={13} />
                {label}
              </button>
            );
          })}
        </div>

        {view === "board" && <BoardView products={filtered} />}
        {view === "table" && <TableView products={filtered} />}
        {view === "team" && <TeamView products={filtered} />}

        {/* Footer strip */}
        <div
          className="mt-16 pt-6 border-t flex flex-col sm:flex-row justify-between gap-3 text-[11px]"
          style={{
            borderColor: "var(--color-recoup-line-soft)",
            fontFamily: "var(--font-mono)",
            color: "var(--color-recoup-muted)",
          }}
        >
          <span>© 2026 RECOUP LLC · INTERNAL OPS CONSOLE</span>
          <span>DEMO DATA — WIRE TO SUPABASE VIA src/lib/ops-data.ts</span>
        </div>
      </div>
    </div>
  );
}
