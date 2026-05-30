import { z } from "zod";

export const RecommendationV1Schema = z.object({
  id: z.string().uuid(),
  title: z.string(),
  placeholder: z.literal(true),
  notes: z.string().optional(),
});

export type RecommendationV1 = z.infer<typeof RecommendationV1Schema>;
