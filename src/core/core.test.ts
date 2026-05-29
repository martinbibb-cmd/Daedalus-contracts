import {
  ProvenanceLevelSchema,
  ProvenanceSchema,
  valueSchema,
  val,
  measuredVal,
  ContractVersionSchema,
  CURRENT_VERSION,
  versionString,
  compareVersions,
  SchemaRegistry,
} from "../index";
import { z } from "zod";

// ---------------------------------------------------------------------------
// Provenance
// ---------------------------------------------------------------------------

describe("ProvenanceLevelSchema", () => {
  const validLevels = [
    "Confirmed",
    "Measured",
    "PhotoEvidenced",
    "SurveyorAsserted",
    "Inferred",
    "Assumed",
    "NeedsReview",
    "Unknown",
  ] as const;

  it.each(validLevels)("accepts '%s'", (level) => {
    expect(ProvenanceLevelSchema.parse(level)).toBe(level);
  });

  it("rejects unknown level", () => {
    expect(() => ProvenanceLevelSchema.parse("Guessed")).toThrow();
  });
});

describe("ProvenanceSchema", () => {
  it("parses minimal provenance", () => {
    const result = ProvenanceSchema.parse({ level: "Measured" });
    expect(result.level).toBe("Measured");
  });

  it("parses full provenance", () => {
    const result = ProvenanceSchema.parse({
      level: "PhotoEvidenced",
      evidenceIds: ["abc-123"],
      notes: "clear photo",
      capturedAt: "2024-01-01T00:00:00.000Z",
      capturedBy: "surveyor-1",
    });
    expect(result.evidenceIds).toEqual(["abc-123"]);
  });
});

describe("valueSchema", () => {
  const NumberValueSchema = valueSchema(z.number());

  it("parses value without provenance", () => {
    const result = NumberValueSchema.parse({ value: 42 });
    expect(result.value).toBe(42);
    expect(result.provenance).toBeUndefined();
  });

  it("parses value with provenance", () => {
    const result = NumberValueSchema.parse({
      value: 18,
      provenance: { level: "Measured", evidenceIds: ["e1"] },
    });
    expect(result.value).toBe(18);
    expect(result.provenance?.level).toBe("Measured");
  });
});

describe("val / measuredVal helpers", () => {
  it("val creates a value without provenance", () => {
    const v = val(42);
    expect(v.value).toBe(42);
    expect(v.provenance).toBeUndefined();
  });

  it("measuredVal creates a value with provenance", () => {
    const v = measuredVal(3.5, "Measured", ["ev1"]);
    expect(v.value).toBe(3.5);
    expect(v.provenance?.level).toBe("Measured");
    expect(v.provenance?.evidenceIds).toEqual(["ev1"]);
  });
});

// ---------------------------------------------------------------------------
// ContractVersion
// ---------------------------------------------------------------------------

describe("ContractVersionSchema", () => {
  it("parses valid version", () => {
    const v = ContractVersionSchema.parse({ major: 1, minor: 1, patch: 0 });
    expect(v.major).toBe(1);
  });

  it("rejects negative major", () => {
    expect(() =>
      ContractVersionSchema.parse({ major: -1, minor: 0, patch: 0 })
    ).toThrow();
  });
});

describe("versionString", () => {
  it("formats version without label", () => {
    expect(versionString({ major: 1, minor: 1, patch: 0 })).toBe("1.1.0");
  });

  it("formats version with label", () => {
    expect(
      versionString({ major: 1, minor: 1, patch: 0, label: "Atlas V1.1" })
    ).toBe("1.1.0 (Atlas V1.1)");
  });
});

describe("compareVersions", () => {
  it("returns 0 for equal versions", () => {
    expect(
      compareVersions({ major: 1, minor: 1, patch: 0 }, { major: 1, minor: 1, patch: 0 })
    ).toBe(0);
  });

  it("returns positive for newer major", () => {
    expect(
      compareVersions({ major: 2, minor: 0, patch: 0 }, { major: 1, minor: 0, patch: 0 })
    ).toBeGreaterThan(0);
  });
});

describe("CURRENT_VERSION", () => {
  it("is 1.1.0", () => {
    expect(CURRENT_VERSION.major).toBe(1);
    expect(CURRENT_VERSION.minor).toBe(1);
  });
});

// ---------------------------------------------------------------------------
// SchemaRegistry
// ---------------------------------------------------------------------------

describe("SchemaRegistry", () => {
  it("registers and retrieves a schema", () => {
    const registry = new SchemaRegistry();
    const schema = z.object({ name: z.string() });
    registry.register({ name: "TestContract", version: CURRENT_VERSION, schema });
    const entry = registry.get("TestContract", CURRENT_VERSION);
    expect(entry).toBeDefined();
    expect(entry?.name).toBe("TestContract");
  });

  it("returns undefined for missing schema", () => {
    const registry = new SchemaRegistry();
    expect(registry.get("MissingContract", CURRENT_VERSION)).toBeUndefined();
  });

  it("exports JSON schema", () => {
    const registry = new SchemaRegistry();
    const schema = z.object({ id: z.string() });
    registry.register({ name: "IdContract", version: CURRENT_VERSION, schema });
    const json = registry.toJsonSchema("IdContract", CURRENT_VERSION);
    expect(json).toBeDefined();
  });

  it("lists all registered schemas", () => {
    const registry = new SchemaRegistry();
    registry.register({
      name: "A",
      version: CURRENT_VERSION,
      schema: z.object({}),
    });
    registry.register({
      name: "B",
      version: CURRENT_VERSION,
      schema: z.object({}),
    });
    expect(registry.list()).toHaveLength(2);
  });
});
