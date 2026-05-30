import { z } from "zod";
import { valueSchema } from "../core/provenance";
import { SpaceSchema } from "./space";

export const StructureTypeSchema = z.enum([
  "MainBuilding",
  "Extension",
  "Outbuilding",
  "Block",
  "Other",
]);

export const StructureSchema = z.object({
  id: z.string().uuid(),
  name: z.string(),
  type: StructureTypeSchema,
  levelCount: valueSchema(z.number().int().nonnegative()).optional(),
  spaces: z.array(SpaceSchema).min(1),
});

export type Structure = z.infer<typeof StructureSchema>;
