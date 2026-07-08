// Ops dashboard data layer.
// Deterministic mock data (seeded PRNG) so SSR and client render identically —
// swap `generateProducts` for a Supabase query when the products table lands.

export interface Stage {
  key: string;
  label: string;
  /** Days a product can sit in this stage before it's flagged as slipping. */
  slaDays: number;
}

export const STAGES: Stage[] = [
  { key: "intake", label: "Intake", slaDays: 5 },
  { key: "discovery", label: "Discovery", slaDays: 10 },
  { key: "scoping", label: "Scoping", slaDays: 7 },
  { key: "design", label: "Design", slaDays: 14 },
  { key: "build", label: "Build", slaDays: 21 },
  { key: "review", label: "Review", slaDays: 7 },
  { key: "qa", label: "QA", slaDays: 10 },
  { key: "launch_prep", label: "Launch prep", slaDays: 7 },
  { key: "live", label: "Live", slaDays: 30 },
  { key: "iterate", label: "Iterate", slaDays: 30 },
];

export interface TeamMember {
  id: string;
  name: string;
  initials: string;
  role: string;
  /** How many products this person can reasonably carry at once. */
  capacity: number;
}

export const TEAM: TeamMember[] = [
  { id: "tm-01", name: "Ana Reyes", initials: "AR", role: "PM lead", capacity: 12 },
  { id: "tm-02", name: "Ben Okafor", initials: "BO", role: "PM", capacity: 11 },
  { id: "tm-03", name: "Chloe Tran", initials: "CT", role: "PM", capacity: 11 },
  { id: "tm-04", name: "Dev Kapoor", initials: "DK", role: "Design", capacity: 10 },
  { id: "tm-05", name: "Elif Aydın", initials: "EA", role: "Design", capacity: 10 },
  { id: "tm-06", name: "Franco Ruiz", initials: "FR", role: "Engineering", capacity: 10 },
  { id: "tm-07", name: "Grace Liu", initials: "GL", role: "Engineering", capacity: 10 },
  { id: "tm-08", name: "Hugo Mendes", initials: "HM", role: "Engineering", capacity: 10 },
  { id: "tm-09", name: "Iris Novak", initials: "IN", role: "QA", capacity: 9 },
  { id: "tm-10", name: "Jonah Weiss", initials: "JW", role: "Ops", capacity: 9 },
];

export type Health = "on_track" | "watch" | "blocked";
export type Priority = "P0" | "P1" | "P2";

export interface Product {
  id: string;
  code: string;
  name: string;
  stageIndex: number;
  ownerId: string;
  daysInStage: number;
  /** Days since the owner last posted an update. */
  lastUpdateDays: number;
  /** Projected value of the product, in dollars. */
  value: number;
  health: Health;
  priority: Priority;
}

// Small deterministic PRNG (mulberry32) — same sequence on server and client.
function mulberry32(seed: number) {
  return function () {
    seed |= 0;
    seed = (seed + 0x6d2b79f5) | 0;
    let t = Math.imul(seed ^ (seed >>> 15), 1 | seed);
    t = (t + Math.imul(t ^ (t >>> 7), 61 | t)) ^ t;
    return ((t ^ (t >>> 14)) >>> 0) / 4294967296;
  };
}

const FIRST = [
  "Atlas", "Beacon", "Cedar", "Delta", "Ember", "Flint", "Granite", "Harbor",
  "Iron", "Juniper", "Keel", "Lumen", "Meridian", "North", "Onyx", "Pioneer",
  "Quarry", "Ridge", "Summit", "Timber", "Union", "Vantage", "Willow", "Zenith", "Anchor",
];
const SECOND = ["Line", "Kit", "Core", "Series"];

const STAGE_WEIGHTS = [8, 10, 12, 10, 16, 9, 10, 7, 10, 8]; // sums to 100

export function generateProducts(): Product[] {
  const rand = mulberry32(20260707);
  const products: Product[] = [];

  // Fixed stage counts so every stage is populated and totals are exact.
  const stagePool: number[] = [];
  STAGE_WEIGHTS.forEach((w, stageIndex) => {
    for (let i = 0; i < w; i++) stagePool.push(stageIndex);
  });

  for (let i = 0; i < 100; i++) {
    const stageIndex = stagePool[i];
    const stage = STAGES[stageIndex];
    // Skew days-in-stage low, with a long tail past the SLA.
    const r = rand();
    const daysInStage = Math.max(1, Math.round(r * r * stage.slaDays * 1.7));
    const blocked = rand() < 0.08;
    const health: Health = blocked
      ? "blocked"
      : daysInStage > stage.slaDays
        ? "watch"
        : "on_track";
    const pr = rand();
    products.push({
      id: `prd-${String(i + 1).padStart(3, "0")}`,
      code: `PRD-${String(i + 1).padStart(3, "0")}`,
      name: `${FIRST[i % FIRST.length]} ${SECOND[Math.floor(i / FIRST.length)]}`,
      stageIndex,
      ownerId: TEAM[Math.floor(rand() * TEAM.length)].id,
      daysInStage,
      lastUpdateDays: Math.floor(rand() * 9),
      value: Math.round((15000 + rand() * 485000) / 500) * 500,
      health,
      priority: pr < 0.08 ? "P0" : pr < 0.38 ? "P1" : "P2",
    });
  }
  return products;
}

export const teamById = new Map(TEAM.map((t) => [t.id, t]));

export function fmtMoney(n: number): string {
  if (n >= 1_000_000) return `$${(n / 1_000_000).toFixed(1)}M`;
  if (n >= 1_000) return `$${Math.round(n / 1_000)}K`;
  return `$${n}`;
}

export const HEALTH_META: Record<
  Health,
  { label: string; color: string }
> = {
  // Status colors are reserved for state and always paired with icon + label.
  on_track: { label: "On track", color: "#4B5D4A" }, // sage — 6.4:1 on paper
  watch: { label: "Slipping", color: "#93702F" }, // deep gold — 4.1:1 on paper
  blocked: { label: "Blocked", color: "#E04515" }, // deep ember — 3.7:1 on paper
};
