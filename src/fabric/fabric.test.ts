import {
  FabricContractSchema,
  FabricContractJsonSchema,
  WallSchema,
  RoofSchema,
  FloorSchema,
  WindowsSchema,
} from "./fabric";

const validFabric = {
  walls: [
    {
      constructionType: { value: "CavityUnfilled" },
      uValueWPerM2K: { value: 1.6 },
    },
  ],
  roof: {
    roofType: { value: "PitchedTile" },
    insulationThicknessMm: { value: 100 },
  },
  floors: [{ level: 0, floorType: { value: "SuspendedTimber" } }],
  windows: { glazingType: { value: "DoubleGlazed" } },
};

describe("WallSchema", () => {
  it("parses wall with provenance", () => {
    const wall = WallSchema.parse({
      constructionType: {
        value: "SolidBrick",
        provenance: { level: "PhotoEvidenced" },
      },
    });
    expect(wall.constructionType.provenance?.level).toBe("PhotoEvidenced");
  });
});

describe("RoofSchema", () => {
  it("parses roof", () => {
    const roof = RoofSchema.parse({ roofType: { value: "Flat" } });
    expect(roof.roofType.value).toBe("Flat");
  });
});

describe("FabricContractSchema", () => {
  it("parses a valid fabric contract", () => {
    const result = FabricContractSchema.parse(validFabric);
    expect(result.walls).toHaveLength(1);
    expect(result.contractVersion).toBe("1.1.0");
  });

  it("rejects invalid wall construction type", () => {
    const bad = {
      ...validFabric,
      walls: [{ constructionType: { value: "Mud" } }],
    };
    expect(() => FabricContractSchema.parse(bad)).toThrow();
  });
});

describe("FabricContractJsonSchema", () => {
  it("exports a JSON schema object", () => {
    expect(typeof FabricContractJsonSchema).toBe("object");
  });
});
