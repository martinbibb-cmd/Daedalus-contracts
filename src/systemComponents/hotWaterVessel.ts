import { z } from "zod";
import { valueSchema } from "../core/provenance";

export const HotWaterVesselSchema = z.object({
  id: z.string().uuid(),
  type: z.enum(["Cylinder", "ThermalStore", "BufferVessel", "Other"]),
  capacityLitres: valueSchema(z.number().positive()).optional(),
  portIds: z.array(z.string().uuid()).optional(),
});

export type HotWaterVessel = z.infer<typeof HotWaterVesselSchema>;
