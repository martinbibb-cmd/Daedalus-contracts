import { z } from "zod";
import { valueSchema } from "../core/provenance";

export const EmitterSchema = z.object({
  id: z.string().uuid(),
  type: z.enum(["Radiator", "UnderfloorLoop", "FanCoil", "Convector", "Other"]),
  spaceId: z.string().uuid(),
  outputW: valueSchema(z.number().positive()).optional(),
  portIds: z.array(z.string().uuid()).optional(),
});

export type Emitter = z.infer<typeof EmitterSchema>;
