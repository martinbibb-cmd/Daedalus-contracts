import { HydraulicsContractSchema } from "./index";

describe("HydraulicsContractSchema", () => {
  it("accepts closed loop network with resolvable ports", () => {
    const parsed = HydraulicsContractSchema.parse({
      network: {
        id: "00000000-0000-0000-0000-000000000201",
        ports: [
          { id: "00000000-0000-0000-0000-000000000202", componentId: "00000000-0000-0000-0000-000000000209", role: "Flow", medium: "Water" },
          { id: "00000000-0000-0000-0000-000000000203", componentId: "00000000-0000-0000-0000-000000000209", role: "Return", medium: "Water" },
        ],
        pipeSegments: [
          { id: "00000000-0000-0000-0000-000000000204", fromPortId: "00000000-0000-0000-0000-000000000202", toPortId: "00000000-0000-0000-0000-000000000203" },
        ],
        loops: [
          {
            id: "00000000-0000-0000-0000-000000000205",
            name: "Loop",
            portSequence: [
              "00000000-0000-0000-0000-000000000202",
              "00000000-0000-0000-0000-000000000203",
              "00000000-0000-0000-0000-000000000202",
            ],
          },
        ],
      },
    });

    expect(parsed.network.loops[0].portSequence[0]).toBe(parsed.network.loops[0].portSequence[2]);
  });
});
