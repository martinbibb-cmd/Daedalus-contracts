import { z } from "zod";
import { zodToJsonSchema } from "zod-to-json-schema";
import { valueSchema } from "../core/provenance";

// ---------------------------------------------------------------------------
// Electrical supply
// ---------------------------------------------------------------------------

export const ElectricalSupplyTypeSchema = z.enum([
  "SinglePhase",
  "ThreePhase",
  "Unknown",
]);
export type ElectricalSupplyType = z.infer<typeof ElectricalSupplyTypeSchema>;

export const ConsumerUnitTypeSchema = z.enum([
  "OldFuseBox",
  "MCBConsumerUnit",
  "RCDProtected",
  "AFDDProtected",
  "Unknown",
]);
export type ConsumerUnitType = z.infer<typeof ConsumerUnitTypeSchema>;

// ---------------------------------------------------------------------------
// Electrical contract
// ---------------------------------------------------------------------------

export const ElectricalContractSchema = z.object({
  supplyType: valueSchema(ElectricalSupplyTypeSchema),
  supplyAmpsRating: valueSchema(z.number().positive()).optional(),
  consumerUnitType: valueSchema(ConsumerUnitTypeSchema),
  earthingArrangement: valueSchema(z.enum(["TT", "TN_S", "TN_C_S", "Unknown"])).optional(),
  solarPVPresent: valueSchema(z.boolean()),
  solarPVCapacityKwp: valueSchema(z.number().positive()).optional(),
  batteryStoragePresent: valueSchema(z.boolean()),
  batteryStorageKwh: valueSchema(z.number().positive()).optional(),
  evChargerPresent: valueSchema(z.boolean()),
  contractVersion: z.string().default("1.1.0"),
});
export type ElectricalContract = z.infer<typeof ElectricalContractSchema>;

export const ElectricalContractJsonSchema = zodToJsonSchema(
  ElectricalContractSchema,
  { name: "ElectricalContract" }
);
