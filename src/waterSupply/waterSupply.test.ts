import {
  WaterSupplyContractSchema,
  WaterSupplyContractJsonSchema,
} from "./waterSupply";

describe("WaterSupplyContractSchema", () => {
  it("parses a valid water supply contract", () => {
    const result = WaterSupplyContractSchema.parse({
      coldWaterSupplyType: { value: "DirectFromMain" },
      meterPresent: { value: true },
      hotWaterDistributionType: { value: "DeadLeg" },
    });
    expect(result.coldWaterSupplyType.value).toBe("DirectFromMain");
    expect(result.meterPresent.value).toBe(true);
  });

  it("accepts pressure data", () => {
    const withPressure = {
      coldWaterSupplyType: { value: "DirectFromMain" },
      meterPresent: { value: true },
      hotWaterDistributionType: { value: "Instantaneous" },
      waterPressure: {
        staticPressureBar: { value: 3.5 },
        flowRateLPerMin: { value: 15 },
      },
    };
    const result = WaterSupplyContractSchema.parse(withPressure);
    expect(result.waterPressure?.staticPressureBar?.value).toBe(3.5);
  });
});

describe("WaterSupplyContractJsonSchema", () => {
  it("is an object", () => {
    expect(typeof WaterSupplyContractJsonSchema).toBe("object");
  });
});
