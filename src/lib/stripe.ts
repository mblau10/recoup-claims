import Stripe from "stripe";

export const stripe = new Stripe(
  process.env.STRIPE_SECRET_KEY || "sk_placeholder",
  {}
);

/**
 * Recoup pricing model — honest flat floor, scales on big refunds.
 *
 * TRACK B (Filing)
 *   $895 per CAPE declaration, OR 1.5% of the expected refund,
 *   whichever is greater. Charged only after CBP stamps the declaration
 *   accepted. A card is collected at intake via a zero-dollar SetupIntent.
 *
 * TRACK C (Cash Now)
 *   Tiered fee on the advance amount, with the advance fixed at 85% of the
 *   expected refund:
 *       • Refund up to  $50,000   →  10% of advance (small-ticket)
 *       • Refund  $50k – $250k    →   8% of advance (mid-market)
 *       • Refund above $250,000   →   6% of advance (enterprise)
 *   Fee is netted from the advance at wire time — never billed separately.
 */

export const FILING_FEE_MIN_CENTS = 89500; // $895 floor per CAPE declaration
export const FILING_FEE_RATE = 0.015; // or 1.5% of refund, whichever is greater

export const ADVANCE_SHARE = 0.85; // we advance 85% of the expected refund

export const ADVANCE_FEE_TIERS = [
  { upToRefundCents: 5_000_000, rate: 0.10 }, // up to $50k → 10%
  { upToRefundCents: 25_000_000, rate: 0.08 }, // $50k–$250k → 8%
  { upToRefundCents: Infinity, rate: 0.06 }, // above $250k → 6%
];

/** Quote the filing fee (in cents) for a given expected refund (in cents). */
export function quoteFilingFeeCents(expectedRefundCents: number): number {
  const percentageFee = Math.round(expectedRefundCents * FILING_FEE_RATE);
  return Math.max(FILING_FEE_MIN_CENTS, percentageFee);
}

/** Resolve the Track C fee rate based on the expected refund size. */
export function advanceFeeRate(expectedRefundCents: number): number {
  for (const tier of ADVANCE_FEE_TIERS) {
    if (expectedRefundCents <= tier.upToRefundCents) return tier.rate;
  }
  return ADVANCE_FEE_TIERS[ADVANCE_FEE_TIERS.length - 1].rate;
}

/** Full Track C quote: advance paid, fee netted, customer cash received. */
export function quoteAdvanceCents(expectedRefundCents: number) {
  const advance = Math.round(expectedRefundCents * ADVANCE_SHARE);
  const rate = advanceFeeRate(expectedRefundCents);
  const fee = Math.round(advance * rate);
  const cashToCustomer = advance - fee;
  return { advance, rate, fee, cashToCustomer };
}

// ──────────────────────────────────────────────────────────────────────
// Backwards-compatibility shims for any stale imports elsewhere in the tree.
// New code should import the functions above.
// ──────────────────────────────────────────────────────────────────────

/** @deprecated use quoteFilingFeeCents() — this only returns the floor. */
export const FILING_FEE_CENTS = FILING_FEE_MIN_CENTS;

/** @deprecated use advanceFeeRate(refund) — this is the mid-tier rate. */
export const ADVANCE_FEE_RATE = 0.08;

export const TIER_AMOUNTS: Record<string, number> = {
  filing: FILING_FEE_MIN_CENTS,
  advance: 0,
  both: FILING_FEE_MIN_CENTS,
  self_serve: 0,
};
