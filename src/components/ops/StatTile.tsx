interface StatTileProps {
  label: string;
  value: string;
  sub?: string;
  /** Optional accent for the sub line (status color when it flags a state). */
  subColor?: string;
}

export default function StatTile({ label, value, sub, subColor }: StatTileProps) {
  return (
    <div
      className="border p-5 sm:p-6"
      style={{
        borderColor: "var(--color-recoup-line-soft)",
        background: "rgba(255, 255, 255, 0.35)",
      }}
    >
      <div
        className="text-[10px] tracking-[0.16em] uppercase mb-3"
        style={{
          fontFamily: "var(--font-mono)",
          color: "var(--color-recoup-muted)",
        }}
      >
        {label}
      </div>
      {/* Stat values stay in the sans face, semibold, proportional figures. */}
      <div
        className="text-[32px] sm:text-[38px] font-semibold leading-none mb-2"
        style={{ color: "var(--color-recoup-ink)", letterSpacing: "-0.02em" }}
      >
        {value}
      </div>
      {sub && (
        <div
          className="text-[11px] leading-[1.4]"
          style={{ color: subColor ?? "var(--color-recoup-muted)" }}
        >
          {sub}
        </div>
      )}
    </div>
  );
}
