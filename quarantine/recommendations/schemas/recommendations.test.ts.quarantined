import { RecommendationsContractSchema } from "./index";

describe("RecommendationsContractSchema", () => {
  it("parses placeholder-only recommendation entities", () => {
    const parsed = RecommendationsContractSchema.parse({
      recommendations: [
        {
          id: "00000000-0000-0000-0000-000000000901",
          title: "RecommendationV1 placeholder",
          placeholder: true,
        },
      ],
      options: [
        {
          id: "00000000-0000-0000-0000-000000000902",
          recommendationId: "00000000-0000-0000-0000-000000000901",
          label: "OptionV1 placeholder",
          placeholder: true,
        },
      ],
      tradeOffs: [
        {
          id: "00000000-0000-0000-0000-000000000903",
          optionId: "00000000-0000-0000-0000-000000000902",
          dimension: "Cost",
          direction: "Neutral",
          placeholder: true,
        },
      ],
      pathwayRecommendations: [
        {
          id: "00000000-0000-0000-0000-000000000904",
          pathwayNodeId: "00000000-0000-0000-0000-000000000905",
          recommendationId: "00000000-0000-0000-0000-000000000901",
          placeholder: true,
        },
      ],
    });

    expect(parsed.recommendations[0].placeholder).toBe(true);
  });
});
