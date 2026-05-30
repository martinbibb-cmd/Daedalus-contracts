import { z } from "zod";
import { valueSchema } from "../core/provenance";

export const AccessPathwaySchema = z.object({
  id: z.string().uuid(),
  componentId: z.string().uuid(),
  routeDescription: z.string(),
  minWidthMm: valueSchema(z.number().positive()).optional(),
  unobstructed: valueSchema(z.boolean()).optional(),
});

export type AccessPathway = z.infer<typeof AccessPathwaySchema>;
