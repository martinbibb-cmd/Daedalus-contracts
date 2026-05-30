import { TimelineContractSchema } from "./index";

describe("TimelineContractSchema", () => {
  it("parses PathwayNode PathwayTransition and EquivalentPath", () => {
    const parsed = TimelineContractSchema.parse({
      nodes: [
        { id: "00000000-0000-0000-0000-000000000801", name: "N1", stage: "Baseline" },
        { id: "00000000-0000-0000-0000-000000000802", name: "N2", stage: "Intervention" },
      ],
      transitions: [
        {
          id: "00000000-0000-0000-0000-000000000803",
          fromNodeId: "00000000-0000-0000-0000-000000000801",
          toNodeId: "00000000-0000-0000-0000-000000000802",
        },
      ],
      equivalentPaths: [
        {
          id: "00000000-0000-0000-0000-000000000804",
          name: "Path A",
          nodeIds: [
            "00000000-0000-0000-0000-000000000801",
            "00000000-0000-0000-0000-000000000802",
          ],
        },
      ],
    });

    expect(parsed.transitions[0].fromNodeId).toBe("00000000-0000-0000-0000-000000000801");
  });
});
