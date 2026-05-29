import { z } from "zod";

export const PathwayNodeSchema = z.object({
  id: z.string().uuid(),
  name: z.string(),
  stage: z.enum(["Baseline", "Intervention", "Outcome", "Milestone", "Other"]),
});

export type PathwayNode = z.infer<typeof PathwayNodeSchema>;
