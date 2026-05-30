import { z } from "zod";
import { valueSchema } from "../core/provenance";

export const ServiceHatchSchema = z.object({
  id: z.string().uuid(),
  componentId: z.string().uuid(),
  location: z.string(),
  clearOpeningMm: valueSchema(z.number().positive()).optional(),
});

export type ServiceHatch = z.infer<typeof ServiceHatchSchema>;
