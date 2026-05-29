import { z } from "zod";
import { zodToJsonSchema } from "zod-to-json-schema";
import { valueSchema } from "../core/provenance";

// ---------------------------------------------------------------------------
// Recommendation contract (data definitions only – no engine logic)
// ---------------------------------------------------------------------------

export const RecommendationCategorySchema = z.enum([
  "HeatSourceUpgrade",
  "InsulationImprovement",
  "ControlsUpgrade",
  "HotWaterUpgrade",
  "VentilationImprovement",
  "SafetyRemediation",
  "HydraulicsWork",
  "ElectricalWork",
  "FabricImprovement",
  "WaterConservation",
  "Other",
]);
export type RecommendationCategory = z.infer<typeof RecommendationCategorySchema>;

export const RecommendationPrioritySchema = z.enum([
  "Immediate",
  "ShortTerm",
  "MediumTerm",
  "LongTerm",
  "Optional",
]);
export type RecommendationPriority = z.infer<typeof RecommendationPrioritySchema>;

export const RecommendationItemSchema = z.object({
  id: z.string().uuid(),
  category: RecommendationCategorySchema,
  title: z.string(),
  description: z.string(),
  priority: RecommendationPrioritySchema,
  estimatedCostGbp: valueSchema(z.number().nonnegative()).optional(),
  estimatedAnnualSavingGbp: valueSchema(z.number().nonnegative()).optional(),
  estimatedCarbonSavingKgCO2e: valueSchema(z.number().nonnegative()).optional(),
  relatedConstraintIds: z.array(z.string()).optional(),
  relatedRiskIds: z.array(z.string()).optional(),
});
export type RecommendationItem = z.infer<typeof RecommendationItemSchema>;

// ---------------------------------------------------------------------------
// Recommendations contract
// ---------------------------------------------------------------------------

export const RecommendationsContractSchema = z.object({
  recommendations: z.array(RecommendationItemSchema),
  contractVersion: z.string().default("1.1.0"),
});
export type RecommendationsContract = z.infer<typeof RecommendationsContractSchema>;

export const RecommendationsContractJsonSchema = zodToJsonSchema(
  RecommendationsContractSchema,
  { name: "RecommendationsContract" }
);
