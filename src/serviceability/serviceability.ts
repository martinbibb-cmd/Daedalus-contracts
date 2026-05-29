import { z } from "zod";
import { zodToJsonSchema } from "zod-to-json-schema";
import { valueSchema } from "../core/provenance";

// ---------------------------------------------------------------------------
// Serviceability
// ---------------------------------------------------------------------------

export const ServiceabilityRatingSchema = z.enum([
  "Excellent",
  "Good",
  "Adequate",
  "Poor",
  "Critical",
  "Unknown",
]);
export type ServiceabilityRating = z.infer<typeof ServiceabilityRatingSchema>;

export const ServiceabilityItemSchema = z.object({
  component: z.string(),
  rating: valueSchema(ServiceabilityRatingSchema),
  notes: z.string().optional(),
  actionRequired: valueSchema(z.boolean()),
  estimatedRemainingLifeYears: valueSchema(z.number().nonnegative()).optional(),
});
export type ServiceabilityItem = z.infer<typeof ServiceabilityItemSchema>;

// ---------------------------------------------------------------------------
// Serviceability contract
// ---------------------------------------------------------------------------

export const ServiceabilityContractSchema = z.object({
  overallRating: valueSchema(ServiceabilityRatingSchema),
  items: z.array(ServiceabilityItemSchema),
  lastFullServiceDate: valueSchema(z.string().date()).optional(),
  nextServiceDueDate: valueSchema(z.string().date()).optional(),
  contractVersion: z.string().default("1.1.0"),
});
export type ServiceabilityContract = z.infer<typeof ServiceabilityContractSchema>;

export const ServiceabilityContractJsonSchema = zodToJsonSchema(
  ServiceabilityContractSchema,
  { name: "ServiceabilityContract" }
);
