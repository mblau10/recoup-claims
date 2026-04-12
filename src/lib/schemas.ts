import { z } from "zod";

export const estimateSchema = z.object({
  email: z.string().email("Invalid email address"),
  importValue: z.number().min(1000, "Import value must be at least $1,000"),
  tariffRate: z.number().min(1, "Tariff rate must be at least 1%"),
  months: z.enum(["3", "6", "9", "12"]),
  wantsAdvance: z.boolean(),
});

export const contactStepSchema = z.object({
  fullName: z.string().min(2, "Full name must be at least 2 characters"),
  companyName: z.string().min(2, "Company name must be at least 2 characters"),
  email: z.string().email("Invalid email address"),
  phone: z.string().min(10, "Phone number must be at least 10 digits"),
  hearAbout: z.string().optional(),
});

export const importStepSchema = z.object({
  iorNumber: z.string().min(5, "IOR number must be at least 5 characters"),
  annualImportValue: z.string().min(1, "Annual import value is required"),
  primaryCountries: z.array(z.string()).min(1, "Select at least one country"),
  monthsUnderIEEPA: z.string().min(1, "Months under IEEPA is required"),
  hasEntryNumbers: z.enum(["yes", "no"]),
});

// Updated — new track-based model (no tiers)
export const planStepSchema = z.object({
  track: z.enum(["filing", "advance", "both"]),
  acceptsEngagement: z.boolean().refine((v) => v === true, {
    message: "You must accept the engagement terms to continue",
  }),
});

// Kept as alias so any lingering imports don't break
export const trackStepSchema = planStepSchema;

export const advanceSchema = z.object({
  applicationId: z.string().uuid("Invalid application ID"),
  bankName: z.string().min(2, "Bank name must be at least 2 characters"),
  // NOTE: Routing and account numbers are collected directly by the user
  // via our banking partner's hosted form — never transmitted through this API.
  // This schema is retained for type-compat with legacy callers only.
});

export const kitEmailSchema = z.object({
  email: z.string().email("Enter a valid email address"),
});

export type EstimateSchema = z.infer<typeof estimateSchema>;
export type ContactStepSchema = z.infer<typeof contactStepSchema>;
export type ImportStepSchema = z.infer<typeof importStepSchema>;
export type PlanStepSchema = z.infer<typeof planStepSchema>;
export type TrackStepSchema = PlanStepSchema;
export type AdvanceSchema = z.infer<typeof advanceSchema>;
export type KitEmailSchema = z.infer<typeof kitEmailSchema>;
