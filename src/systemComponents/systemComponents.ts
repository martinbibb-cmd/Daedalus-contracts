import { z } from "zod";
import { zodToJsonSchema } from "zod-to-json-schema";
import { valueSchema } from "../core/provenance";

// ---------------------------------------------------------------------------
// Heat source
// ---------------------------------------------------------------------------

export const HeatSourceTypeSchema = z.enum([
  "RegularBoiler",
  "SystemBoiler",
  "CombiBoiler",
  "ASHP",
  "GSHP",
  "DirectElectric",
  "DistrictHeating",
  "Biomass",
  "Other",
  "Unknown",
]);
export type HeatSourceType = z.infer<typeof HeatSourceTypeSchema>;

export const FuelTypeSchema = z.enum([
  "NaturalGas",
  "LPG",
  "Oil",
  "Electricity",
  "Biomass",
  "HeatNetwork",
  "Other",
  "Unknown",
]);
export type FuelType = z.infer<typeof FuelTypeSchema>;

export const HeatSourceSchema = z.object({
  id: z.string().uuid(),
  type: valueSchema(HeatSourceTypeSchema),
  manufacturer: valueSchema(z.string()).optional(),
  model: valueSchema(z.string()).optional(),
  fuelType: valueSchema(FuelTypeSchema),
  outputKw: valueSchema(z.number().positive()).optional(),
  efficiencyPct: valueSchema(z.number().min(0).max(200)).optional(),
  installYear: valueSchema(z.number().int()).optional(),
  flueType: valueSchema(z.enum(["OpenFlue", "RoomSealed", "Balanced", "Unknown"])).optional(),
  serviceLastDate: valueSchema(z.string().date()).optional(),
});
export type HeatSource = z.infer<typeof HeatSourceSchema>;

// ---------------------------------------------------------------------------
// Hot water cylinder
// ---------------------------------------------------------------------------

export const CylinderTypeSchema = z.enum([
  "VentedDirect",
  "VentedIndirect",
  "UnventedIndirect",
  "UnventedDirect",
  "ThermalStore",
  "CombinedPrimaryStorage",
  "Unknown",
]);
export type CylinderType = z.infer<typeof CylinderTypeSchema>;

export const HotWaterCylinderSchema = z.object({
  id: z.string().uuid(),
  cylinderType: valueSchema(CylinderTypeSchema),
  capacityLitres: valueSchema(z.number().positive()).optional(),
  insulationThicknessMm: valueSchema(z.number().nonnegative()).optional(),
  immersionPresent: valueSchema(z.boolean()).optional(),
  thermostatSetpointDegC: valueSchema(z.number()).optional(),
  installYear: valueSchema(z.number().int()).optional(),
});
export type HotWaterCylinder = z.infer<typeof HotWaterCylinderSchema>;

// ---------------------------------------------------------------------------
// Cold water storage
// ---------------------------------------------------------------------------

export const ColdWaterStorageTankSchema = z.object({
  id: z.string().uuid(),
  capacityLitres: valueSchema(z.number().positive()).optional(),
  location: valueSchema(z.string()).optional(),
  lidPresent: valueSchema(z.boolean()).optional(),
  insulated: valueSchema(z.boolean()).optional(),
});
export type ColdWaterStorageTank = z.infer<typeof ColdWaterStorageTankSchema>;

// ---------------------------------------------------------------------------
// Feed & expansion tank
// ---------------------------------------------------------------------------

export const FeedExpansionTankSchema = z.object({
  id: z.string().uuid(),
  capacityLitres: valueSchema(z.number().positive()).optional(),
  location: valueSchema(z.string()).optional(),
  condition: valueSchema(z.enum(["Good", "Fair", "Poor", "Unknown"])).optional(),
});
export type FeedExpansionTank = z.infer<typeof FeedExpansionTankSchema>;

// ---------------------------------------------------------------------------
// Radiator
// ---------------------------------------------------------------------------

export const RadiatorTypeSchema = z.enum([
  "SinglePanel",
  "SinglePanelConvector",
  "DoublePanelConvector",
  "TrenchConvector",
  "UFH",
  "ColumnRadiator",
  "Other",
  "Unknown",
]);
export type RadiatorType = z.infer<typeof RadiatorTypeSchema>;

export const RadiatorSchema = z.object({
  id: z.string().uuid(),
  room: z.string().optional(),
  type: valueSchema(RadiatorTypeSchema),
  outputW: valueSchema(z.number().positive()).optional(),
  trvFitted: valueSchema(z.boolean()).optional(),
  lockshieldFitted: valueSchema(z.boolean()).optional(),
});
export type Radiator = z.infer<typeof RadiatorSchema>;

// ---------------------------------------------------------------------------
// Pump
// ---------------------------------------------------------------------------

export const PumpSchema = z.object({
  id: z.string().uuid(),
  location: z.string().optional(),
  manufacturer: valueSchema(z.string()).optional(),
  model: valueSchema(z.string()).optional(),
  variableSpeed: valueSchema(z.boolean()).optional(),
  condition: valueSchema(z.enum(["Good", "Fair", "Poor", "Unknown"])).optional(),
});
export type Pump = z.infer<typeof PumpSchema>;

// ---------------------------------------------------------------------------
// System components contract
// ---------------------------------------------------------------------------

export const SystemComponentsContractSchema = z.object({
  heatSource: HeatSourceSchema,
  hotWaterCylinder: HotWaterCylinderSchema.optional(),
  coldWaterStorageTank: ColdWaterStorageTankSchema.optional(),
  feedExpansionTank: FeedExpansionTankSchema.optional(),
  radiators: z.array(RadiatorSchema),
  pumps: z.array(PumpSchema),
  contractVersion: z.string().default("1.1.0"),
});
export type SystemComponentsContract = z.infer<typeof SystemComponentsContractSchema>;

export const SystemComponentsContractJsonSchema = zodToJsonSchema(
  SystemComponentsContractSchema,
  { name: "SystemComponentsContract" }
);
