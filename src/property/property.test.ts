import {
  PropertyContractSchema,
  PropertyContractJsonSchema,
  AddressSchema,
  PropertyTypeSchema,
  TenureTypeSchema,
  EPCRatingSchema,
  ConstructionEraSchema,
} from "./property";

describe("PropertyTypeSchema", () => {
  it("accepts all valid types", () => {
    const types = ["Detached", "SemiDetached", "Terraced", "Flat", "Bungalow"];
    types.forEach((t) => expect(() => PropertyTypeSchema.parse(t)).not.toThrow());
  });
});

describe("TenureTypeSchema", () => {
  it("accepts OwnerOccupied", () => {
    expect(TenureTypeSchema.parse("OwnerOccupied")).toBe("OwnerOccupied");
  });
});

describe("EPCRatingSchema", () => {
  it("accepts A–G and Unknown", () => {
    ["A", "B", "C", "D", "E", "F", "G", "Unknown"].forEach((r) =>
      expect(() => EPCRatingSchema.parse(r)).not.toThrow()
    );
  });
  it("rejects invalid rating", () => {
    expect(() => EPCRatingSchema.parse("H")).toThrow();
  });
});

describe("AddressSchema", () => {
  it("parses minimal address", () => {
    const addr = AddressSchema.parse({
      line1: "1 Test St",
      town: "London",
      postcode: "SW1A 1AA",
    });
    expect(addr.country).toBe("England");
  });
});

describe("PropertyContractSchema", () => {
  const valid = {
    id: "00000001-0000-0000-0000-000000000001",
    address: { line1: "1 Test St", town: "London", postcode: "SW1A 1AA" },
    propertyType: { value: "Terraced" },
    constructionYear: { value: 1975 },
    constructionEra: { value: "Sixties" },
    floorAreaM2: { value: 85 },
    storeys: { value: 2 },
    tenure: { value: "OwnerOccupied" },
    epcRating: { value: "D" },
    listedBuilding: { value: false },
    conservationArea: { value: false },
  };

  it("parses a valid property contract", () => {
    const result = PropertyContractSchema.parse(valid);
    expect(result.id).toBe(valid.id);
    expect(result.contractVersion).toBe("1.1.0");
  });

  it("rejects missing required fields", () => {
    const { address: _a, ...noAddress } = valid;
    expect(() => PropertyContractSchema.parse(noAddress)).toThrow();
  });

  it("accepts provenance on floorAreaM2", () => {
    const withProv = {
      ...valid,
      floorAreaM2: { value: 85, provenance: { level: "Measured" } },
    };
    const result = PropertyContractSchema.parse(withProv);
    expect(result.floorAreaM2.provenance?.level).toBe("Measured");
  });
});

describe("PropertyContractJsonSchema", () => {
  it("is an object with a definitions key", () => {
    expect(typeof PropertyContractJsonSchema).toBe("object");
    expect(PropertyContractJsonSchema).toHaveProperty("$ref");
  });
});
