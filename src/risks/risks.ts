import { z } from "zod";
import { zodToJsonSchema } from "zod-to-json-schema";
import { valueSchema } from "../core/provenance";

// ---------------------------------------------------------------------------
// Risk categories
// ---------------------------------------------------------------------------

export const RiskCategorySchema = z.enum([
  "Safety",
  "Legionella",
  "CO",
  "AsbestosContainingMaterial",
  "ElectricalHazard",
  "StructuralIntegrity",
  "InadequateVentilation",
  "LeakOrDampness",
  "FrostDamage",
  "Other",
]);
export type RiskCategory = z.infer<typeof RiskCategorySchema>;

export const RiskSeveritySchema = z.enum([
  "Critical",
  "High",
  "Medium",
  "Low",
  "Informational",
]);
export type RiskSeverity = z.infer<typeof RiskSeveritySchema>;

export const RiskItemSchema = z.object({
  id: z.string().uuid(),
  category: RiskCategorySchema,
  description: valueSchema(z.string()),
  severity: valueSchema(RiskSeveritySchema),
  location: z.string().optional(),
  evidenceIds: z.array(z.string()).optional(),
  immediateActionRequired: valueSchema(z.boolean()),
  mitigationNotes: z.string().optional(),
});
export type RiskItem = z.infer<typeof RiskItemSchema>;

// ---------------------------------------------------------------------------
// Risks contract
// ---------------------------------------------------------------------------

export const RisksContractSchema = z.object({
  risks: z.array(RiskItemSchema),
  contractVersion: z.string().default("1.1.0"),
});
export type RisksContract = z.infer<typeof RisksContractSchema>;

export const RisksContractJsonSchema = zodToJsonSchema(
  RisksContractSchema,
  { name: "RisksContract" }
);
