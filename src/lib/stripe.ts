import Stripe from "stripe";

export const stripe = new Stripe(process.env.STRIPE_SECRET_KEY || "sk_placeholder", {});

export const TIER_AMOUNTS: Record<string, number> = {
  essentials: 29700,     // $297 in cents
  full_filing: 149700,   // $1,497 in cents
  priority: 249700,      // $2,497 in cents
};
