import { SystemComponentsContractSchema } from "./index";

describe("SystemComponentsContractSchema", () => {
  it("parses HeatGenerator HotWaterVessel Emitter and ComponentPort", () => {
    const parsed = SystemComponentsContractSchema.parse({
      heatGenerators: [
        {
          id: "00000000-0000-0000-0000-000000000501",
          type: "Boiler",
          fuel: "Gas",
        },
      ],
      hotWaterVessels: [
        {
          id: "00000000-0000-0000-0000-000000000502",
          type: "Cylinder",
        },
      ],
      emitters: [
        {
          id: "00000000-0000-0000-0000-000000000503",
          type: "Radiator",
          spaceId: "00000000-0000-0000-0000-000000000504",
        },
      ],
      componentPorts: [
        {
          id: "00000000-0000-0000-0000-000000000505",
          componentId: "00000000-0000-0000-0000-000000000501",
          role: "Flow",
          medium: "Water",
        },
      ],
    });

    expect(parsed.heatGenerators[0].type).toBe("Boiler");
  });
});
