import { ElectricalContractSchema } from "./index";

describe("ElectricalContractSchema", () => {
  it("parses ElectricalService and MicroGenerator", () => {
    const parsed = ElectricalContractSchema.parse({
      electricalService: {
        id: "00000000-0000-0000-0000-000000000701",
        supplyType: "SinglePhase",
      },
      microGenerators: [
        {
          id: "00000000-0000-0000-0000-000000000702",
          type: "SolarPV",
          connectedToElectricalServiceId: "00000000-0000-0000-0000-000000000701",
        },
      ],
    });

    expect(parsed.microGenerators[0].type).toBe("SolarPV");
  });
});
