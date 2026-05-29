import {
  ElectricalContractSchema,
  ElectricalContractJsonSchema,
} from "./electrical";

const validElectrical = {
  supplyType: { value: "SinglePhase" },
  consumerUnitType: { value: "RCDProtected" },
  solarPVPresent: { value: false },
  batteryStoragePresent: { value: false },
  evChargerPresent: { value: false },
};

describe("ElectricalContractSchema", () => {
  it("parses valid electrical contract", () => {
    const result = ElectricalContractSchema.parse(validElectrical);
    expect(result.supplyType.value).toBe("SinglePhase");
    expect(result.contractVersion).toBe("1.1.0");
  });

  it("parses with solar PV", () => {
    const withSolar = {
      ...validElectrical,
      solarPVPresent: { value: true },
      solarPVCapacityKwp: { value: 4.0 },
    };
    const result = ElectricalContractSchema.parse(withSolar);
    expect(result.solarPVCapacityKwp?.value).toBe(4.0);
  });
});

describe("ElectricalContractJsonSchema", () => {
  it("exports JSON schema", () => {
    expect(typeof ElectricalContractJsonSchema).toBe("object");
  });
});
