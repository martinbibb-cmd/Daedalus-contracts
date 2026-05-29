import {
  EvidenceItemSchema,
  EvidencePackSchema,
  EvidenceItemJsonSchema,
  EvidencePackJsonSchema,
} from "./evidence";

describe("EvidenceItemSchema", () => {
  it("parses a photograph evidence item", () => {
    const result = EvidenceItemSchema.parse({
      id: "00000000-0000-0000-0000-000000000001",
      type: "Photograph",
      label: "Boiler nameplate",
    });
    expect(result.type).toBe("Photograph");
  });

  it("rejects an invalid evidence type", () => {
    expect(() =>
      EvidenceItemSchema.parse({
        id: "00000000-0000-0000-0000-000000000001",
        type: "VideoClip",
        label: "Boiler video",
      })
    ).toThrow();
  });
});

describe("EvidencePackSchema", () => {
  it("parses evidence pack", () => {
    const result = EvidencePackSchema.parse({
      surveyId: "00000000-0000-0000-0000-000000000001",
      items: [],
    });
    expect(result.items).toHaveLength(0);
  });
});

describe("EvidenceItemJsonSchema / EvidencePackJsonSchema", () => {
  it("exports object schemas", () => {
    expect(typeof EvidenceItemJsonSchema).toBe("object");
    expect(typeof EvidencePackJsonSchema).toBe("object");
  });
});
