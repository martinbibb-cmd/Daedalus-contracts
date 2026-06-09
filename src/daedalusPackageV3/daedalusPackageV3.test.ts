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
    expect(data.servicePointObservations?.map((observation) => observation.servicePointType)).toEqual(
      expect.arrayContaining(["bathTap"])
    );
  });

  it("rejects schema drift across references", () => {
    const invalid = structuredClone(fixture);
    invalid.relationships[0].to = "missing-area";

    const result = validate(DaedalusPackageV3Schema, invalid);

    expect(result.success).toBe(false);
    expect(result.errors?.some((error) => error.path.join(".") === "relationships.0.to")).toBe(true);
  });

  it("validates flexible water supply observations", () => {
    const packageWithWater = {
      ...structuredClone(fixture),
      waterSupplyObservations: [
        waterObservation({
          id: "water-flow-cup-kitchen",
          method: "flowCup",
          location: "kitchenColdTap",
          intent: "usableHouseholdCapacity",
          values: [{ name: "flowRate", value: 16, unit: "l/min" }],
        }),
        waterObservation({
          id: "water-pressure-flow-pairs",
          method: "pressureFlowTestKit",
          location: "outsideTap",
          intent: "incomingMainCapacity",
          values: [
            { name: "flowAtPressure", value: 16, unit: "l/min", condition: "0 bar residual pressure" },
            { name: "flowAtPressure", value: 14, unit: "l/min", condition: "1 bar residual pressure" },
          ],
        }),
        waterObservation({
          id: "water-digital-logger",
          method: "digitalPressureFlowLogger",
          location: "internalStopTap",
          intent: "incomingMainCapacity",
          instrument: "pressure-flow multimeter",
          values: [
            { name: "staticPressure", value: 3.1, unit: "bar" },
            { name: "dynamicPressure", value: 1.2, unit: "bar" },
            { name: "flowRate", value: 22, unit: "l/min" },
            { name: "waterTemperature", value: 12, unit: "degC" },
            { name: "tds", value: 280, unit: "ppm" },
          ],
        }),
        waterObservation({
          id: "water-customer-report",
          method: "customerReported",
          location: "showerOutlet",
          intent: "customerComplaintContext",
          confidence: "unknown",
          suspectedLimitations: ["customerReportOnly"],
          values: [{ name: "qualitativeObservation", value: "Shower slows when kitchen tap runs." }],
        }),
        waterObservation({
          id: "water-not-tested",
          method: "notTested",
          location: "unknown",
          intent: "notTested",
          absenceReason: "equipmentUnavailable",
          confidence: "unknown",
          notes: "No pressure/flow kit on van.",
          values: [],
        }),
      ],
    };

    const result = validate(DaedalusPackageV3Schema, packageWithWater);

    expect(result.success).toBe(true);
    expect(result.data?.waterSupplyObservations?.length).toBe(5);
  });

  it("rejects invalid water supply enum strings", () => {
    const invalid = {
      ...structuredClone(fixture),
      waterSupplyObservations: [
        waterObservation({
          method: "gardenGuess",
        }),
      ],
    };

    const result = validate(DaedalusPackageV3Schema, invalid);

    expect(result.success).toBe(false);
  });

  it("rejects missing water supply evidence references", () => {
    const invalid = {
      ...structuredClone(fixture),
      waterSupplyObservations: [
        waterObservation({
          evidenceIDs: ["missing-photo"],
        }),
      ],
    };

    const result = validate(DaedalusPackageV3Schema, invalid);

    expect(result.success).toBe(false);
    expect(result.errors?.some((error) => error.path.join(".").includes("evidenceIDs"))).toBe(true);
  });

  it("rejects numeric water values without units", () => {
    const invalid = {
      ...structuredClone(fixture),
      waterSupplyObservations: [
        waterObservation({
          values: [{ name: "flowRate", value: 16 }],
        }),
      ],
    };

    const result = validate(DaedalusPackageV3Schema, invalid);

    expect(result.success).toBe(false);
  });

  it("requires not tested water observations to explain absence", () => {
    const invalid = {
      ...structuredClone(fixture),
      waterSupplyObservations: [
        waterObservation({
          method: "notTested",
          intent: "notTested",
          values: [],
          notes: undefined,
          absenceReason: undefined,
        }),
      ],
    };

    const result = validate(DaedalusPackageV3Schema, invalid);

    expect(result.success).toBe(false);
  });

  it("validates service point observations for outlets and fittings", () => {
    const packageWithServicePoint = {
      ...structuredClone(fixture),
      servicePointObservations: [
        servicePointObservation({
          id: "service-point-bath-tap",
          areaID: "area-airing-cupboard",
          servicePointType: "bathTap",
          supplyType: "gravityHot",
          intendedPressureType: "mainsPressure",
          servedByAssetIDs: ["cylinder-airing-cupboard"],
          observedIssues: ["poorFlow", "mismatchSuspected"],
          evidenceIDs: ["evidence-cylinder-photo"],
          confidence: "approximate",
        }),
      ],
    };

    const result = validate(DaedalusPackageV3Schema, packageWithServicePoint);

    expect(result.success).toBe(true);
    expect(result.data?.servicePointObservations?.[0].observedIssues).toEqual(
      expect.arrayContaining(["poorFlow", "mismatchSuspected"])
    );
  });

  it("rejects service points with missing area references", () => {
    const invalid = {
      ...structuredClone(fixture),
      servicePointObservations: [
        servicePointObservation({
          areaID: "missing-area",
        }),
      ],
    };

    const result = validate(DaedalusPackageV3Schema, invalid);

    expect(result.success).toBe(false);
    expect(result.errors?.some((error) => error.path.join(".") === "servicePointObservations.0.areaID")).toBe(true);
  });

  it("rejects service points with missing served assets or evidence", () => {
    const invalid = {
      ...structuredClone(fixture),
      servicePointObservations: [
        servicePointObservation({
          servedByAssetIDs: ["missing-cylinder"],
          evidenceIDs: ["missing-photo"],
        }),
      ],
    };

    const result = validate(DaedalusPackageV3Schema, invalid);

    expect(result.success).toBe(false);
    expect(result.errors?.some((error) => error.path.join(".").includes("servedByAssetIDs"))).toBe(true);
    expect(result.errors?.some((error) => error.path.join(".").includes("evidenceIDs"))).toBe(true);
  });

  it("validates partial domestic water service models", () => {
    const packageWithServiceModel = {
      ...structuredClone(fixture),
      serviceModels: [
        {
          id: "domestic-water-service-001",
          domain: "domesticHotWater",
          state: "scaffold",
          relatedWaterSupplyObservationIDs: ["water-flow-cup-kitchen"],
          relatedServicePointObservationIDs: ["service-point-bath-tap"],
          relatedSystemAssetIDs: ["boiler-kitchen", "cylinder-airing-cupboard"],
          relatedEvidenceIDs: ["evidence-cylinder-photo"],
          uncertainty: [{ state: "unknown", sourceRef: "water-not-tested", notes: "No safe full-flow test point found." }],
          provenance: [{ sourceType: "compiledTwin", sourceID: "visit-003", method: "service-model-scaffold" }],
          notes: ["Service scaffold only; no calculation or recommendation."],
        },
      ],
    };

    const result = validate(DaedalusPackageV3Schema, packageWithServiceModel);

    expect(result.success).toBe(true);
    expect(result.data?.serviceModels?.[0].state).toBe("scaffold");
  });

  it("rejects forbidden fields in domestic water service models", () => {
    const invalid = {
      ...structuredClone(fixture),
      serviceModels: [
        {
          id: "domestic-water-service-001",
          domain: "domesticHotWater",
          recommendedOption: "unvented cylinder",
          suitabilityScore: 92,
        },
      ],
    };

    const result = validate(DaedalusPackageV3Schema, invalid);

    expect(result.success).toBe(false);
    expect(result.errors?.some((error) => error.path.join(".").includes("recommendedOption"))).toBe(true);
    expect(result.errors?.some((error) => error.path.join(".").includes("suitabilityScore"))).toBe(true);
  });

  it("rejects service model references that do not resolve", () => {
    const invalid = {
      ...structuredClone(fixture),
      serviceModels: [
        {
          id: "domestic-water-service-001",
          domain: "domesticHotWater",
          relatedWaterSupplyObservationIDs: ["missing-water"],
          relatedServicePointObservationIDs: ["missing-service-point"],
          relatedSystemAssetIDs: ["missing-asset"],
          relatedEvidenceIDs: ["missing-evidence"],
        },
      ],
    };

    const result = validate(DaedalusPackageV3Schema, invalid);

    expect(result.success).toBe(false);
    expect(result.errors?.some((error) => error.path.join(".").includes("relatedWaterSupplyObservationIDs"))).toBe(true);
    expect(result.errors?.some((error) => error.path.join(".").includes("relatedServicePointObservationIDs"))).toBe(true);
    expect(result.errors?.some((error) => error.path.join(".").includes("relatedSystemAssetIDs"))).toBe(true);
    expect(result.errors?.some((error) => error.path.join(".").includes("relatedEvidenceIDs"))).toBe(true);
  });
});

function waterObservation(overrides: Record<string, unknown> = {}) {
  return {
    id: "water-test-001",
    observedAt: "2026-06-07T10:00:00Z",
    observedBy: "engineer-001",
    method: "flowCup",
    location: "kitchenColdTap",
    intent: "usableHouseholdCapacity",
    values: [{ name: "flowRate", value: 16, unit: "l/min" }],
    boundaryConditions: {
      mainsStopTapFullyOpen: "unknown",
      visiblePrvFitted: "unknown",
      softenerOrFilterPresent: "unknown",
      otherOutletsOpenDuringTest: "false",
      restrictorOrAeratorSuspected: "unknown",
    },
    suspectedLimitations: [],
    confidence: "approximate",
    evidenceIDs: ["evidence-thermostat-note"],
    provenance: {
      method: "water-supply-test",
      captured_by: "engineer-001",
      captured_at: "2026-06-07T10:00:00Z",
    },
    notes: "Field observation only; no inference made.",
    ...overrides,
  };
}

function servicePointObservation(overrides: Record<string, unknown> = {}) {
  return {
    id: "service-point-bath-tap",
    areaID: "area-airing-cupboard",
    servicePointType: "bathTap",
    supplyType: "gravityHot",
    intendedPressureType: "mainsPressure",
    servedByAssetIDs: ["cylinder-airing-cupboard"],
    observedIssues: ["poorFlow"],
    evidenceIDs: ["evidence-cylinder-photo"],
    confidence: "approximate",
    provenance: {
      method: "service-point-capture",
      captured_by: "engineer-001",
      captured_at: "2026-06-07T10:05:00Z",
    },
    notes: "Bath tap reported and observed as poor flow; no inference made.",
    ...overrides,
  };
}
