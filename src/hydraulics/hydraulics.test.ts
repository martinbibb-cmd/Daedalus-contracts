import {
  HydraulicsContractSchema,
  HydraulicsContractJsonSchema,
  HeatingSystemTypeSchema,
  PipeMaterialSchema,
} from "./hydraulics";

const validHydraulics = {
  systemType: { value: "OpenVentedRegular" },
  pipework: { primaryMaterial: { value: "Copper" } },
  systemPressure: { expansionType: { value: "OpenVentedFAndETank" } },
};

describe("HeatingSystemTypeSchema", () => {
  it("accepts all defined types", () => {
    ["Combi", "ASHP", "GSHP", "DistrictHeating"].forEach((t) =>
      expect(() => HeatingSystemTypeSchema.parse(t)).not.toThrow()
    );
  });
});

describe("HydraulicsContractSchema", () => {
  it("parses valid hydraulics contract", () => {
    const result = HydraulicsContractSchema.parse(validHydraulics);
    expect(result.systemType.value).toBe("OpenVentedRegular");
    expect(result.contractVersion).toBe("1.1.0");
  });

  it("parses sealed system with pressure data", () => {
    const sealed = {
      ...validHydraulics,
      systemType: { value: "SystemBoilerUnvented" },
      systemPressure: {
        expansionType: { value: "SealedExpansionVessel" },
        staticPressureBar: { value: 1.2 },
        pressureReliefValveFitted: { value: true },
        pressureReliefValveBarSetting: { value: 3.0 },
      },
    };
    const result = HydraulicsContractSchema.parse(sealed);
    expect(result.systemPressure.staticPressureBar?.value).toBe(1.2);
  });
});

describe("HydraulicsContractJsonSchema", () => {
  it("is an object", () => {
    expect(typeof HydraulicsContractJsonSchema).toBe("object");
  });
});
