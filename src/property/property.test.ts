import { PropertyContractSchema } from "./index";

describe("PropertyContractSchema", () => {
  it("parses Site -> Structure -> Space", () => {
    const parsed = PropertyContractSchema.parse({
      site: {
        id: "00000000-0000-0000-0000-000000000001",
        name: "Site",
        structures: [
          {
            id: "00000000-0000-0000-0000-000000000002",
            name: "Structure",
            type: "MainBuilding",
            spaces: [
              {
                id: "00000000-0000-0000-0000-000000000003",
                name: "Space",
                type: "LivingRoom",
              },
            ],
          },
        ],
      },
    });

    expect(parsed.site.structures[0].spaces[0].name).toBe("Space");
  });
});
