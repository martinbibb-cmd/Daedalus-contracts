import { z } from "zod";
import { zodToJsonSchema } from "zod-to-json-schema";
import { valueSchema } from "../core/provenance";

// ---------------------------------------------------------------------------
// System type classification
// ---------------------------------------------------------------------------

export const HeatingSystemTypeSchema = z.enum([
  "OpenVentedRegular",
  "SealedRegular",
  "SystemBoilerSealed",
  "SystemBoilerUnvented",
  "Combi",
  "ASHP",
  "GSHP",
  "DistrictHeating",
  "DirectElectric",
  "Unknown",
]);
export type HeatingSystemType = z.infer<typeof HeatingSystemTypeSchema>;

// ---------------------------------------------------------------------------
// Pipework
// ---------------------------------------------------------------------------

export const PipeMaterialSchema = z.enum([
  "Copper",
  "Plastic",
  "MicroborePlastic",
  "MicroborCopper",
  "Iron",
  "Steel",
  "MixedOrUnknown",
]);
export type PipeMaterial = z.infer<typeof PipeMaterialSchema>;

export const PipeworkSchema = z.object({
  primaryMaterial: valueSchema(PipeMaterialSchema),
  secondaryMaterial: valueSchema(PipeMaterialSchema).optional(),
  microbore: valueSchema(z.boolean()).optional(),
  insulatedRuns: valueSchema(z.boolean()).optional(),
  estimatedAgePipeYears: valueSchema(z.number().nonnegative().int()).optional(),
});
export type Pipework = z.infer<typeof PipeworkSchema>;

// ---------------------------------------------------------------------------
// System pressure / expansion
// ---------------------------------------------------------------------------

export const ExpansionTypeSchema = z.enum([
  "OpenVentedFAndETank",
  "SealedExpansionVessel",
  "None",
  "Unknown",
]);
export type ExpansionType = z.infer<typeof ExpansionTypeSchema>;

export const SystemPressureSchema = z.object({
  expansionType: valueSchema(ExpansionTypeSchema),
  staticPressureBar: valueSchema(z.number().nonnegative()).optional(),
  expansionVesselSizeLitres: valueSchema(z.number().positive()).optional(),
  pressureReliefValveFitted: valueSchema(z.boolean()).optional(),
  pressureReliefValveBarSetting: valueSchema(z.number().positive()).optional(),
});
export type SystemPressure = z.infer<typeof SystemPressureSchema>;

// ---------------------------------------------------------------------------
// Hydraulics contract
// ---------------------------------------------------------------------------

export const HydraulicsContractSchema = z.object({
  systemType: valueSchema(HeatingSystemTypeSchema),
  pipework: PipeworkSchema,
  systemPressure: SystemPressureSchema,
  systemVolumeEstimateLitres: valueSchema(z.number().positive()).optional(),
  inhibitorDosed: valueSchema(z.boolean()).optional(),
  magnetiteRisk: valueSchema(z.enum(["Low", "Medium", "High", "Unknown"])).optional(),
  contractVersion: z.string().default("1.1.0"),
});
export type HydraulicsContract = z.infer<typeof HydraulicsContractSchema>;

export const HydraulicsContractJsonSchema = zodToJsonSchema(
  HydraulicsContractSchema,
  { name: "HydraulicsContract" }
);
