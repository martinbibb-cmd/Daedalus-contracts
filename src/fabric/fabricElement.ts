import { z } from "zod";
import { zodToJsonSchema } from "zod-to-json-schema";
import { valueSchema } from "../core/provenance";
import { MaterialLayerSchema } from "./materialLayer";

export const FabricOrientationSchema = z.enum([
  "North",
  "NorthEast",
  "East",
  "SouthEast",
  "South",
  "SouthWest",
  "West",
  "NorthWest",
  "Horizontal",
  "Unknown",
]);

export const FabricElementSchema = z.object({
  id: z.string().uuid(),
  structureId: z.string().uuid(),
  spaceId: z.string().uuid().optional(),
  type: z.enum(["Wall", "Roof", "Floor", "Window", "Door", "Ceiling", "Other"]),
  orientation: valueSchema(FabricOrientationSchema),
  surfaceAreaM2: valueSchema(z.number().positive()),
  layerStack: z.array(MaterialLayerSchema).min(1),
});

export const FabricContractSchema = z.object({
  elements: z.array(FabricElementSchema).min(1),
  contractVersion: z.string().default("1.1.0"),
});

export type FabricElement = z.infer<typeof FabricElementSchema>;
export type FabricContract = z.infer<typeof FabricContractSchema>;

export const FabricContractJsonSchema = zodToJsonSchema(FabricContractSchema, {
  name: "FabricContract",
});
