import { z } from "zod";
import { valueSchema } from "../core/provenance";

export const MaterialLayerSchema = z.object({
  id: z.string().uuid(),
  name: z.string(),
  material: z.string(),
  thicknessMm: valueSchema(z.number().nonnegative()),
  conductivityWPerMK: valueSchema(z.number().positive()).optional(),
});

export type MaterialLayer = z.infer<typeof MaterialLayerSchema>;
