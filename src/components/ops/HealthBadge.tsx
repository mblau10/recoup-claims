import { AlertTriangle, CheckCircle, Clock } from "lucide-react";
import { Health, HEALTH_META } from "@/lib/ops-data";

const ICONS: Record<Health, typeof CheckCircle> = {
  on_track: CheckCircle,
  watch: Clock,
  blocked: AlertTriangle,
};

// Status is never color alone — always icon + label.
export default function HealthBadge({
  health,
  compact = false,
}: {
  health: Health;
  compact?: boolean;
}) {
  const meta = HEALTH_META[health];
  const Icon = ICONS[health];
  return (
    <span
      className="inline-flex items-center gap-1.5"
      style={{ color: meta.color }}
    >
      <Icon size={compact ? 11 : 13} strokeWidth={2.2} />
      <span
        className={`${compact ? "text-[9px]" : "text-[10px]"} tracking-[0.1em] uppercase`}
        style={{ fontFamily: "var(--font-mono)" }}
      >
        {meta.label}
      </span>
    </span>
  );
}
