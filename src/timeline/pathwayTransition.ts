import { z } from "zod";

export const PathwayTransitionSchema = z.object({
  id: z.string().uuid(),
  fromNodeId: z.string().uuid(),
  toNodeId: z.string().uuid(),
  label: z.string().optional(),
});

export type PathwayTransition = z.infer<typeof PathwayTransitionSchema>;
