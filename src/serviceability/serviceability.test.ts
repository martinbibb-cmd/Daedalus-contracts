import {
  ServiceabilityContractSchema,
  ServiceabilityContractJsonSchema,
} from "./serviceability";

describe("ServiceabilityContractSchema", () => {
  it("parses minimal serviceability contract", () => {
    const result = ServiceabilityContractSchema.parse({
      overallRating: { value: "Good" },
      items: [],
    });
    expect(result.overallRating.value).toBe("Good");
    expect(result.contractVersion).toBe("1.1.0");
  });

  it("parses with serviceability items", () => {
    const result = ServiceabilityContractSchema.parse({
      overallRating: { value: "Adequate" },
      items: [
        {
          component: "Boiler",
          rating: { value: "Adequate" },
          actionRequired: { value: false },
          estimatedRemainingLifeYears: { value: 5 },
        },
      ],
    });
    expect(result.items[0].component).toBe("Boiler");
  });
});

describe("ServiceabilityContractJsonSchema", () => {
  it("is an object", () => {
    expect(typeof ServiceabilityContractJsonSchema).toBe("object");
  });
});
