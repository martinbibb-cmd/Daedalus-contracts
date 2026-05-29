import { z } from "zod";
import { valueSchema } from "../core/provenance";

export const HeatGeneratorSchema = z.object({
  id: z.string().uuid(),
  type: z.enum(["Boiler", "HeatPump", "HeatInterfaceUnit", "DirectElectric", "Other"]),
  fuel: z.enum(["Gas", "Electricity", "Oil", "HeatNetwork", "Biomass", "Unknown"]),
  ratedOutputKw: valueSchema(z.number().positive()).optional(),
  portIds: z.array(z.string().uuid()).optional(),
});

export type HeatGenerator = z.infer<typeof HeatGeneratorSchema>;
