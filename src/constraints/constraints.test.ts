import {
  ConstraintsContractSchema,
  ConstraintsContractJsonSchema,
  ConstraintSchema,
} from "./constraints";

describe("ConstraintSchema", () => {
  it("parses a valid constraint", () => {
    const result = ConstraintSchema.parse({
      id: "00000000-0000-0000-0000-000000000001",
      type: "ListedBuilding",
      description: { value: "Grade II listed" },
      severity: { value: "Blocking" },
    });
    expect(result.type).toBe("ListedBuilding");
  });
});

describe("ConstraintsContractSchema", () => {
  it("parses empty constraints list", () => {
    const result = ConstraintsContractSchema.parse({ constraints: [] });
    expect(result.constraints).toHaveLength(0);
  });

  it("parses with multiple constraints", () => {
    const result = ConstraintsContractSchema.parse({
      constraints: [
        {
          id: "00000000-0000-0000-0000-000000000001",
          type: "ListedBuilding",
          description: { value: "Grade II listed" },
          severity: { value: "Blocking" },
        },
        {
          id: "00000000-0000-0000-0000-000000000002",
          type: "NarrowAccess",
          description: { value: "Side access only 700mm wide" },
          severity: { value: "Major" },
        },
      ],
    });
    expect(result.constraints).toHaveLength(2);
  });
});

describe("ConstraintsContractJsonSchema", () => {
  it("is an object", () => {
    expect(typeof ConstraintsContractJsonSchema).toBe("object");
  });
});
