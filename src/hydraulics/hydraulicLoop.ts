import { z } from "zod";

export const HydraulicLoopSchema = z.object({
  id: z.string().uuid(),
  name: z.string(),
  portSequence: z.array(z.string().uuid()).min(4),
}).refine((loop) => loop.portSequence[0] === loop.portSequence[loop.portSequence.length - 1], {
  message: "HydraulicLoop portSequence must be closed (first and last port must match)",
  path: ["portSequence"],
});

export type HydraulicLoop = z.infer<typeof HydraulicLoopSchema>;
