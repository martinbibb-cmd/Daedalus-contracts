import { z } from "zod";

export const TradeOffV1Schema = z.object({
  id: z.string().uuid(),
  optionId: z.string().uuid(),
  dimension: z.enum(["Cost", "Carbon", "Complexity", "Disruption", "Comfort", "Other"]),
  direction: z.enum(["Increase", "Decrease", "Neutral"]),
  placeholder: z.literal(true),
});

export type TradeOffV1 = z.infer<typeof TradeOffV1Schema>;
