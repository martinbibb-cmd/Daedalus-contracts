import { z } from "zod";

export const EquivalentPathSchema = z.object({
  id: z.string().uuid(),
  name: z.string(),
  nodeIds: z.array(z.string().uuid()).min(1),
  rationale: z.string().optional(),
});

export type EquivalentPath = z.infer<typeof EquivalentPathSchema>;
