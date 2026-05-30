import { ControlsContractSchema } from "./index";

describe("ControlsContractSchema", () => {
  it("parses ControlSystem with ControlZone and ControlDevice", () => {
    const parsed = ControlsContractSchema.parse({
      systems: [
        {
          id: "00000000-0000-0000-0000-000000000401",
          name: "Main",
          devices: [
            {
              id: "00000000-0000-0000-0000-000000000402",
              type: "Thermostat",
              targetZoneId: "00000000-0000-0000-0000-000000000403",
            },
          ],
          zones: [
            {
              id: "00000000-0000-0000-0000-000000000403",
              name: "Zone 1",
              spaceIds: ["00000000-0000-0000-0000-000000000404"],
            },
          ],
        },
      ],
    });

    expect(parsed.systems[0].zones[0].spaceIds.length).toBe(1);
  });
});
