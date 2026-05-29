import { z } from "zod";
import { valueSchema } from "../core/provenance";

export const MicroGeneratorSchema = z.object({
  id: z.string().uuid(),
  type: z.enum(["SolarPV", "MicroCHP", "Battery", "Wind", "Other"]),
  capacityKw: valueSchema(z.number().positive()).optional(),
  connectedToElectricalServiceId: z.string().uuid(),
});

export type MicroGenerator = z.infer<typeof MicroGeneratorSchema>;
