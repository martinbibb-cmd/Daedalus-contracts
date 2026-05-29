import {
  RecommendationsContractSchema,
  RecommendationsContractJsonSchema,
} from "./recommendations";

describe("RecommendationsContractSchema", () => {
  it("parses empty recommendations", () => {
    const result = RecommendationsContractSchema.parse({ recommendations: [] });
    expect(result.recommendations).toHaveLength(0);
  });

  it("parses a recommendation item", () => {
    const result = RecommendationsContractSchema.parse({
      recommendations: [
        {
          id: "00000000-0000-0000-0000-000000000001",
          category: "HeatSourceUpgrade",
          title: "Install ASHP",
          description: "Replace gas boiler with ASHP",
          priority: "MediumTerm",
          estimatedCostGbp: { value: 10000 },
          estimatedAnnualSavingGbp: { value: 300 },
        },
      ],
    });
    expect(result.recommendations[0].category).toBe("HeatSourceUpgrade");
    expect(result.recommendations[0].estimatedCostGbp?.value).toBe(10000);
  });
});

describe("RecommendationsContractJsonSchema", () => {
  it("is an object", () => {
    expect(typeof RecommendationsContractJsonSchema).toBe("object");
  });
});
