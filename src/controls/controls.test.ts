import { ControlsContractSchema, ControlsContractJsonSchema } from "./controls";

const validControls = {
  thermostat: {
    id: "00000000-0000-0000-0000-000000000001",
    type: { value: "SmartThermostat" },
  },
  programmer: {
    id: "00000000-0000-0000-0000-000000000002",
    type: { value: "IntegratedWithStat" },
  },
  trvCoverage: { value: "AllRooms" },
};

describe("ControlsContractSchema", () => {
  it("parses valid controls contract", () => {
    const result = ControlsContractSchema.parse(validControls);
    expect(result.thermostat.type.value).toBe("SmartThermostat");
    expect(result.contractVersion).toBe("1.1.0");
  });

  it("accepts optional fields", () => {
    const withOptional = {
      ...validControls,
      cylinderThermostat: { value: true },
      boilerInterlock: { value: true },
    };
    const result = ControlsContractSchema.parse(withOptional);
    expect(result.boilerInterlock?.value).toBe(true);
  });
});

describe("ControlsContractJsonSchema", () => {
  it("exports JSON schema", () => {
    expect(typeof ControlsContractJsonSchema).toBe("object");
  });
});
