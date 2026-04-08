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

export const planStepSchema = z.object({
  tier: z.enum(["essentials", "full_filing", "priority"]),
  wantsAdvance: z.boolean(),
});

export const advanceSchema = z.object({
  applicationId: z.string().uuid("Invalid application ID"),
  bankName: z.string().min(2, "Bank name must be at least 2 characters"),
  routingNumber: z
    .string()
    .length(9, "Routing number must be exactly 9 digits")
    .regex(/^\d+$/, "Routing number must contain only digits"),
  accountNumber: z
    .string()
    .min(4, "Account number must be at least 4 characters")
    .max(17, "Account number must be at most 17 characters")
    .regex(/^\d+$/, "Account number must contain only digits"),
});

export type EstimateSchema = z.infer<typeof estimateSchema>;
export type ContactStepSchema = z.infer<typeof contactStepSchema>;
export type ImportStepSchema = z.infer<typeof importStepSchema>;
export type PlanStepSchema = z.infer<typeof planStepSchema>;
export type AdvanceSchema = z.infer<typeof advanceSchema>;
