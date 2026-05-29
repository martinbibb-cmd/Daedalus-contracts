import { RisksContractSchema, RisksContractJsonSchema, RiskItemSchema } from "./risks";

describe("RiskItemSchema", () => {
  it("parses a valid risk item", () => {
    const result = RiskItemSchema.parse({
      id: "00000000-0000-0000-0000-000000000001",
      category: "CO",
      description: { value: "CO detector absent in boiler room" },
      severity: { value: "High" },
      immediateActionRequired: { value: true },
    });
    expect(result.category).toBe("CO");
    expect(result.severity.value).toBe("High");
  });
});

describe("RisksContractSchema", () => {
  it("parses empty risks", () => {
    const result = RisksContractSchema.parse({ risks: [] });
    expect(result.risks).toHaveLength(0);
  });

  it("parses contract with a risk", () => {
    const result = RisksContractSchema.parse({
      risks: [
        {
          id: "00000000-0000-0000-0000-000000000001",
          category: "Safety",
          description: { value: "Unsupported flue" },
          severity: { value: "Critical" },
          immediateActionRequired: { value: true },
        },
      ],
    });
    expect(result.risks[0].severity.value).toBe("Critical");
  });
});

describe("RisksContractJsonSchema", () => {
  it("is an object", () => {
    expect(typeof RisksContractJsonSchema).toBe("object");
  });
});
