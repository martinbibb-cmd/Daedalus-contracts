import { validate } from "../validation";
import {
  DomesticWaterServiceModelSchema,
  validateDomesticWaterServiceModelReferences,
} from "./serviceModel";

describe("Service model contracts", () => {
  it("validates a domestic water service model with partial data", () => {
    const result = validate(DomesticWaterServiceModelSchema, {
      id: "domestic-water-service-001",
      relatedWaterSupplyObservationIDs: ["water-test-001"],
      relatedServicePointObservationIDs: [],
      relatedSystemAssetIDs: ["cylinder-001"],
      relatedEvidenceIDs: [],
      uncertainty: [{ state: "unknown", notes: "Service point observations not captured yet." }],
      provenance: [{ sourceType: "compiledTwin", sourceID: "twin-001" }],
      notes: ["Scaffold only; no performance calculation."],
    });

    expect(result.success).toBe(true);
    expect(result.data?.state).toBe("unknown");
  });

  it("allows unknown domestic water service model state", () => {
    const result = validate(DomesticWaterServiceModelSchema, {
      id: "domestic-water-service-unknown",
      domain: "domesticHotWater",
      state: "unknown",
    });

    expect(result.success).toBe(true);
    expect(result.data?.relatedSystemAssetIDs).toEqual([]);
  });

  it("rejects forbidden recommendation and scoring fields", () => {
    const result = validate(DomesticWaterServiceModelSchema, {
      id: "domestic-water-service-001",
      recommendedOption: "combi",
      suitabilityScore: 92,
    });

    expect(result.success).toBe(false);
    expect(result.errors?.map((error) => error.path.join("."))).toEqual(
      expect.arrayContaining(["recommendedOption", "suitabilityScore"])
    );
  });

  it("validates referenced IDs when target arrays exist", () => {
    const model = DomesticWaterServiceModelSchema.parse({
      id: "domestic-water-service-001",
      relatedWaterSupplyObservationIDs: ["water-test-001", "missing-water"],
      relatedServicePointObservationIDs: ["service-point-001"],
      relatedSystemAssetIDs: ["cylinder-001"],
      relatedEvidenceIDs: ["evidence-001", "missing-evidence"],
    });

    const issues = validateDomesticWaterServiceModelReferences(model, {
      waterSupplyObservationIDs: ["water-test-001"],
      servicePointObservationIDs: ["service-point-001"],
      systemAssetIDs: ["cylinder-001"],
      evidenceIDs: ["evidence-001"],
    });

    expect(issues).toEqual([
      "relatedWaterSupplyObservationIDs[1] does not resolve: missing-water",
      "relatedEvidenceIDs[1] does not resolve: missing-evidence",
    ]);
  });
});
