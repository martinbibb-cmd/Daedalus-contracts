import { z } from "zod";

export const OptionV1Schema = z.object({
  id: z.string().uuid(),
  recommendationId: z.string().uuid(),
  label: z.string(),
  placeholder: z.literal(true),
});

export type OptionV1 = z.infer<typeof OptionV1Schema>;
