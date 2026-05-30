import { z } from "zod";

export const ControlZoneSchema = z.object({
  id: z.string().uuid(),
  name: z.string(),
  spaceIds: z.array(z.string().uuid()).min(1),
  emitterIds: z.array(z.string().uuid()).optional(),
});

export type ControlZone = z.infer<typeof ControlZoneSchema>;
