import fixture from "../fixtures/daedalus-package-v3-heating-survey.json";
import { validate } from "../validation";
import { DaedalusPackageV3Schema } from "./daedalusPackageV3";

describe("DaedalusPackageV3Schema", () => {
  it("validates the cross-repo heating survey fixture", () => {
    const result = validate(DaedalusPackageV3Schema, fixture);

    expect(result.success).toBe(true);
    const data = result.data!;
    expect(data.propertyRef).toBe("DAE-SMOKE-HEATING-001");
    expect(data.observations.map((observation) => observation.tag)).toEqual(
      expect.arrayContaining(["area", "boiler", "cylinder", "controls", "radiator", "photo evidence", "text evidence"])
    );
    expect((data.relationships ?? []).map((relationship) => relationship.type)).toEqual(
      expect.arrayContaining(["containedIn", "connectedTo", "controls"])
    );
  });

  it("rejects schema drift across references", () => {
    const invalid = structuredClone(fixture);
    invalid.relationships[0].to = "missing-area";

    const result = validate(DaedalusPackageV3Schema, invalid);

    expect(result.success).toBe(false);
    expect(result.errors?.some((error) => error.path.join(".") === "relationships.0.to")).toBe(true);
  });
});
