export interface Lead {
  id?: string;
  created_at?: string;
  email: string;
  company_name?: string;
  contact_name?: string;
  phone?: string;
  ior_number?: string;
  annual_import_value?: number;
  country_of_origin?: string;
  tariff_rate?: number;
  months_imported?: number;
  estimated_refund?: number;
  wants_advance?: boolean;
  status?: "new" | "qualified" | "filed" | "funded" | "closed";
  notes?: string;
  utm_source?: string;
  utm_medium?: string;
  utm_campaign?: string;
}

export interface Application {
  id?: string;
  lead_id?: string;
  created_at?: string;
  legal_entity_name?: string;
  ein?: string;
  business_address?: string;
  hts_codes?: string[];
  entry_numbers?: string[];
  ports_of_entry?: string[];
  import_value_by_country?: Record<string, number>;
  bank_name?: string;
  routing_number?: string;
  account_number?: string;
  tier?: "essentials" | "full_filing" | "priority";
  wants_advance?: boolean;
  stripe_payment_intent_id?: string;
  paid_at?: string;
  amount_paid?: number;
  status?: "pending" | "paid" | "in_progress" | "filed" | "refunded";
  assigned_to?: string;
}

export interface Refund {
  id?: string;
  application_id?: string;
  created_at?: string;
  cape_filing_date?: string;
  cbp_confirmation_number?: string;
  estimated_refund_amount?: number;
  actual_refund_amount?: number;
  refund_received_date?: string;
  advance_amount?: number;
  advance_paid_date?: string;
  status?: "pending" | "filed" | "processing" | "paid" | "closed";
}

export interface EstimateRequest {
  email: string;
  importValue: number;
  country: string;
  tariffRate: number;
  months: number;
  wantsAdvance: boolean;
}

export interface EstimateResponse {
  estimatedRefund: number;
  advanceAmount: number;
  leadId: string;
}

export type PricingTier = "essentials" | "full_filing" | "priority";

export const TIER_PRICES: Record<PricingTier, number> = {
  essentials: 297,
  full_filing: 1497,
  priority: 2497,
};

export const COUNTRY_RATES: Record<string, number> = {
  "China": 145,
  "Vietnam": 50,
  "EU / Germany": 27,
  "India": 26,
  "South Korea": 25,
  "Japan": 24,
  "UK / Brazil": 20,
  "Other countries": 10,
};
