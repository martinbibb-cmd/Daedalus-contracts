import { z } from "zod";
import { zodToJsonSchema } from "zod-to-json-schema";
import { valueSchema } from "../core/provenance";

// ---------------------------------------------------------------------------
// Ventilation strategy
// ---------------------------------------------------------------------------

export const VentilationStrategySchema = z.enum([
  "NaturalBackground",
  "IntermittentExtract",
  "ContinuousExtractMEV",
  "ContinuousSupplyAndExtractMVHR",
  "None",
  "Unknown",
]);
export type VentilationStrategy = z.infer<typeof VentilationStrategySchema>;

// ---------------------------------------------------------------------------
// Trickle vent
// ---------------------------------------------------------------------------

export const TrickleVentStatusSchema = z.enum([
  "Present",
  "Absent",
  "Blocked",
  "Unknown",
]);
export type TrickleVentStatus = z.infer<typeof TrickleVentStatusSchema>;

// ---------------------------------------------------------------------------
// Extract fans
// ---------------------------------------------------------------------------

export const ExtractFanSchema = z.object({
  id: z.string().uuid(),
  location: z.string(),
  ratedFlowRateM3PerH: valueSchema(z.number().positive()).optional(),
  humidistat: valueSchema(z.boolean()).optional(),
  pullCordOrSwitch: valueSchema(z.boolean()).optional(),
  condition: valueSchema(z.enum(["Good", "Fair", "Poor", "Unknown"])).optional(),
});
export type ExtractFan = z.infer<typeof ExtractFanSchema>;

// ---------------------------------------------------------------------------
// MVHR
// ---------------------------------------------------------------------------

export const MVHRUnitSchema = z.object({
  id: z.string().uuid(),
  manufacturer: valueSchema(z.string()).optional(),
  model: valueSchema(z.string()).optional(),
  heatRecoveryEfficiencyPct: valueSchema(z.number().min(0).max(100)).optional(),
  lastServiceDate: valueSchema(z.string().date()).optional(),
  filterCondition: valueSchema(z.enum(["Clean", "Dirty", "Unknown"])).optional(),
});
export type MVHRUnit = z.infer<typeof MVHRUnitSchema>;

// ---------------------------------------------------------------------------
// Airflow contract
// ---------------------------------------------------------------------------

export const AirflowContractSchema = z.object({
  ventilationStrategy: valueSchema(VentilationStrategySchema),
  trickleVents: valueSchema(TrickleVentStatusSchema),
  extractFans: z.array(ExtractFanSchema),
  mvhrUnit: MVHRUnitSchema.optional(),
  purgeVentilationPossible: valueSchema(z.boolean()).optional(),
  contractVersion: z.string().default("1.1.0"),
});
export type AirflowContract = z.infer<typeof AirflowContractSchema>;

export const AirflowContractJsonSchema = zodToJsonSchema(
  AirflowContractSchema,
  { name: "AirflowContract" }
);
