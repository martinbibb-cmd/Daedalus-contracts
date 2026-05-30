import { z } from "zod";
import { valueSchema } from "../core/provenance";

export const MainsRemedyDeviceSchema = z.object({
  id: z.string().uuid(),
  type: z.enum(["BoosterPump", "Accumulator", "PressureRegulator", "BreakTank", "Other"]),
  enabled: valueSchema(z.boolean()),
  notes: z.string().optional(),
});

export type MainsRemedyDevice = z.infer<typeof MainsRemedyDeviceSchema>;
