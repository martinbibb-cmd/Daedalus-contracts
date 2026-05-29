import { z } from "zod";
import { valueSchema } from "../core/provenance";

export const SpaceTypeSchema = z.enum([
  "LivingRoom",
  "Bedroom",
  "Kitchen",
  "Bathroom",
  "Hallway",
  "Utility",
  "Other",
]);

export const SpaceSchema = z.object({
  id: z.string().uuid(),
  name: z.string(),
  type: SpaceTypeSchema,
  floorAreaM2: valueSchema(z.number().positive()).optional(),
  heated: valueSchema(z.boolean()).optional(),
});

export type Space = z.infer<typeof SpaceSchema>;
