import { WaterSupplyContractSchema } from "./index";

describe("WaterSupplyContractSchema", () => {
  it("parses WaterSupplyProfile and MainsRemedyDevice", () => {
    const parsed = WaterSupplyContractSchema.parse({
      profile: {
        id: "00000000-0000-0000-0000-000000000301",
        staticPressureBar: { value: 3 },
        dynamicPressureBar: { value: 1.2 },
        peakFlowLPerMin: { value: 18 },
        sharedMain: { value: true },
        incomingMaterial: { value: "Copper" },
        incomingDiameterMm: { value: 22 },
        prvPresent: { value: false },
      },
      mainsRemedyDevices: [
        {
          id: "00000000-0000-0000-0000-000000000302",
          type: "BoosterPump",
          enabled: { value: true },
        },
      ],
    });

    expect(parsed.profile.peakFlowLPerMin.value).toBe(18);
  });
});
