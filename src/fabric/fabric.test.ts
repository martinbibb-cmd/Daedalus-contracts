import { FabricContractSchema } from "./index";

describe("FabricContractSchema", () => {
  it("parses FabricElement with MaterialLayer stack", () => {
    const parsed = FabricContractSchema.parse({
      elements: [
        {
          id: "00000000-0000-0000-0000-000000000101",
          structureId: "00000000-0000-0000-0000-000000000102",
          type: "Wall",
          orientation: { value: "North" },
          surfaceAreaM2: { value: 10 },
          layerStack: [
            {
              id: "00000000-0000-0000-0000-000000000103",
              name: "Layer",
              material: "Brick",
              thicknessMm: { value: 100 },
            },
          ],
        },
      ],
    });

    expect(parsed.elements[0].layerStack.length).toBe(1);
  });
});
