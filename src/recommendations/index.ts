import { z } from "zod";
import { zodToJsonSchema } from "zod-to-json-schema";
import { RecommendationV1Schema } from "./recommendationV1";
import { OptionV1Schema } from "./optionV1";
import { TradeOffV1Schema } from "./tradeOffV1";
import { PathwayRecommendationV1Schema } from "./pathwayRecommendationV1";

export const RecommendationsContractSchema = z.object({
  recommendations: z.array(RecommendationV1Schema),
  options: z.array(OptionV1Schema),
  tradeOffs: z.array(TradeOffV1Schema),
  pathwayRecommendations: z.array(PathwayRecommendationV1Schema),
  contractVersion: z.string().default("1.1.0"),
});

export type RecommendationsContract = z.infer<typeof RecommendationsContractSchema>;

export const RecommendationsContractJsonSchema = zodToJsonSchema(
  RecommendationsContractSchema,
  { name: "RecommendationsContract" }
);

export * from "./recommendationV1";
export * from "./optionV1";
export * from "./tradeOffV1";
export * from "./pathwayRecommendationV1";
