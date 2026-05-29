import { z } from "zod";
import { zodToJsonSchema } from "zod-to-json-schema";
import { valueSchema } from "../core/provenance";

// ---------------------------------------------------------------------------
// Wall construction
// ---------------------------------------------------------------------------

export const WallConstructionTypeSchema = z.enum([
  "SolidBrick",
  "CavityUnfilled",
  "CavityFilled",
  "SolidStone",
  "TimberFrame",
  "SystemBuilt",
  "Unknown",
]);
export type WallConstructionType = z.infer<typeof WallConstructionTypeSchema>;

export const WallSchema = z.object({
  constructionType: valueSchema(WallConstructionTypeSchema),
  uValueWPerM2K: valueSchema(z.number().positive()).optional(),
  insulationThicknessMm: valueSchema(z.number().nonnegative()).optional(),
  area: valueSchema(z.number().positive()).optional(),
});
export type Wall = z.infer<typeof WallSchema>;

// ---------------------------------------------------------------------------
// Roof construction
// ---------------------------------------------------------------------------

export const RoofTypeSchema = z.enum([
  "PitchedSlate",
  "PitchedTile",
  "Flat",
  "Thatched",
  "Accessible",
  "Unknown",
]);
export type RoofType = z.infer<typeof RoofTypeSchema>;

export const RoofSchema = z.object({
  roofType: valueSchema(RoofTypeSchema),
  insulationThicknessMm: valueSchema(z.number().nonnegative()).optional(),
  uValueWPerM2K: valueSchema(z.number().positive()).optional(),
  accessible: valueSchema(z.boolean()).optional(),
});
export type Roof = z.infer<typeof RoofSchema>;

// ---------------------------------------------------------------------------
// Floor
// ---------------------------------------------------------------------------

export const FloorTypeSchema = z.enum([
  "SolidConcrete",
  "SuspendedTimber",
  "SuspendedConcrete",
  "Unknown",
]);
export type FloorType = z.infer<typeof FloorTypeSchema>;

export const FloorSchema = z.object({
  level: z.number().int(),
  floorType: valueSchema(FloorTypeSchema),
  uValueWPerM2K: valueSchema(z.number().positive()).optional(),
  insulationThicknessMm: valueSchema(z.number().nonnegative()).optional(),
  areaM2: valueSchema(z.number().positive()).optional(),
});
export type Floor = z.infer<typeof FloorSchema>;

// ---------------------------------------------------------------------------
// Windows
// ---------------------------------------------------------------------------

export const GlazingTypeSchema = z.enum([
  "SingleGlazed",
  "DoubleGlazed",
  "DoubleGlazedLowE",
  "TripleGlazed",
  "Unknown",
]);
export type GlazingType = z.infer<typeof GlazingTypeSchema>;

export const WindowsSchema = z.object({
  glazingType: valueSchema(GlazingTypeSchema),
  totalAreaM2: valueSchema(z.number().positive()).optional(),
  uValueWPerM2K: valueSchema(z.number().positive()).optional(),
  proportionDoubleOrBetterPct: valueSchema(z.number().min(0).max(100)).optional(),
});
export type Windows = z.infer<typeof WindowsSchema>;

// ---------------------------------------------------------------------------
// Fabric contract
// ---------------------------------------------------------------------------

export const FabricContractSchema = z.object({
  walls: z.array(WallSchema),
  roof: RoofSchema,
  floors: z.array(FloorSchema),
  windows: WindowsSchema,
  thermalBridging: valueSchema(z.string()).optional(),
  airTightnessM3PerM2H: valueSchema(z.number().positive()).optional(),
  contractVersion: z.string().default("1.1.0"),
});
export type FabricContract = z.infer<typeof FabricContractSchema>;

export const FabricContractJsonSchema = zodToJsonSchema(FabricContractSchema, {
  name: "FabricContract",
});
