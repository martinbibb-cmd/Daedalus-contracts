import { z } from "zod";
import { valueSchema } from "../core/provenance";

export const ElectricalServiceSchema = z.object({
  id: z.string().uuid(),
  supplyType: z.enum(["SinglePhase", "ThreePhase", "Unknown"]),
  supplyCapacityA: valueSchema(z.number().positive()).optional(),
  earthingArrangement: valueSchema(z.enum(["TT", "TN_S", "TN_C_S", "Unknown"])).optional(),
});

export type ElectricalService = z.infer<typeof ElectricalServiceSchema>;
