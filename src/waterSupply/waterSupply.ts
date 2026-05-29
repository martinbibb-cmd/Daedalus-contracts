import { z } from "zod";
import { zodToJsonSchema } from "zod-to-json-schema";
import { valueSchema } from "../core/provenance";

// ---------------------------------------------------------------------------
// Cold water supply
// ---------------------------------------------------------------------------

export const ColdWaterSupplyTypeSchema = z.enum([
  "DirectFromMain",
  "IndirectFromStorageTank",
  "Mixed",
  "Unknown",
]);
export type ColdWaterSupplyType = z.infer<typeof ColdWaterSupplyTypeSchema>;

export const WaterPressureSchema = z.object({
  staticPressureBar: valueSchema(z.number().nonnegative()).optional(),
  dynamicPressureBar: valueSchema(z.number().nonnegative()).optional(),
  flowRateLPerMin: valueSchema(z.number().positive()).optional(),
});
export type WaterPressure = z.infer<typeof WaterPressureSchema>;

// ---------------------------------------------------------------------------
// Hot water distribution
// ---------------------------------------------------------------------------

export const HotWaterDistributionTypeSchema = z.enum([
  "DeadLeg",
  "Secondary Return",
  "PointOfUse",
  "Instantaneous",
  "Unknown",
]);
export type HotWaterDistributionType = z.infer<typeof HotWaterDistributionTypeSchema>;

// ---------------------------------------------------------------------------
// Water supply contract
// ---------------------------------------------------------------------------

export const WaterSupplyContractSchema = z.object({
  coldWaterSupplyType: valueSchema(ColdWaterSupplyTypeSchema),
  meterPresent: valueSchema(z.boolean()),
  waterPressure: WaterPressureSchema.optional(),
  scalingRisk: valueSchema(z.enum(["Low", "Medium", "High", "Unknown"])).optional(),
  hotWaterDistributionType: valueSchema(HotWaterDistributionTypeSchema),
  contractVersion: z.string().default("1.1.0"),
});
export type WaterSupplyContract = z.infer<typeof WaterSupplyContractSchema>;

export const WaterSupplyContractJsonSchema = zodToJsonSchema(
  WaterSupplyContractSchema,
  { name: "WaterSupplyContract" }
);
