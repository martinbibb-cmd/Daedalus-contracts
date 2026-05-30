import { z } from "zod";

export const PathwayRecommendationV1Schema = z.object({
  id: z.string().uuid(),
  pathwayNodeId: z.string().uuid(),
  recommendationId: z.string().uuid(),
  placeholder: z.literal(true),
});

export type PathwayRecommendationV1 = z.infer<typeof PathwayRecommendationV1Schema>;
