import {
  FIX_001_OpenVentedRegular,
  FIX_002_SystemUnvented,
  FIX_003_CombiFlat,
  FIX_004_HeatPumpPathway,
  SurveyFixtureJsonSchema,
  SurveyFixtureSchema,
  loadFixture,
} from "./index";

const ALL_FIXTURES = [
  FIX_001_OpenVentedRegular,
  FIX_002_SystemUnvented,
  FIX_003_CombiFlat,
  FIX_004_HeatPumpPathway,
];

describe("SurveyFixtureSchema", () => {
  it("exports a json schema", () => {
    expect(typeof SurveyFixtureJsonSchema).toBe("object");
  });

  it("loads all fixtures", () => {
    ALL_FIXTURES.forEach((fixture) => {
      expect(() => loadFixture(fixture)).not.toThrow();
      const parsed = SurveyFixtureSchema.parse(fixture);
      expect(parsed.property.site.structures.length).toBeGreaterThan(0);
    });
  });
});

describe("V1.1 fixture constraints", () => {
  it("validates all fifteen V1.1 domains as top-level payload", () => {
    const fix = loadFixture(FIX_001_OpenVentedRegular);
    expect(fix.airflow.extractFans.length).toBeGreaterThan(0);
    expect(fix.occupancy.occupancyPattern.value).toBe("FullTimeOccupied");
    expect(fix.constraints.constraints.length).toBeGreaterThan(0);
    expect(fix.risks.risks.length).toBeGreaterThan(0);
    expect(fix.evidence.items.length).toBeGreaterThan(0);
  });

  it("uses Site -> Structure -> Space", () => {
    const fix = loadFixture(FIX_001_OpenVentedRegular);
    expect(fix.property.site.structures[0].spaces.length).toBeGreaterThan(0);
  });

  it("has fabric layer stacks", () => {
    const fix = loadFixture(FIX_001_OpenVentedRegular);
    expect(fix.fabric.elements[0].layerStack.length).toBeGreaterThan(0);
  });

  it("has closed-loop hydraulics graph", () => {
    const fix = loadFixture(FIX_001_OpenVentedRegular);
    const sequence = fix.hydraulics.network.loops[0].portSequence;
    expect(sequence[0]).toBe(sequence[sequence.length - 1]);
  });

  it("has water supply profile with pressure and flow", () => {
    const fix = loadFixture(FIX_001_OpenVentedRegular);
    expect(fix.waterSupply.profile.staticPressureBar.value).toBeGreaterThan(0);
    expect(fix.waterSupply.profile.dynamicPressureBar.value).toBeGreaterThan(0);
    expect(fix.waterSupply.profile.peakFlowLPerMin.value).toBeGreaterThan(0);
  });

  it("FIX_004 includes placeholders only and no ASHP recommendation text", () => {
    const fix = loadFixture(FIX_004_HeatPumpPathway);
    const recText = JSON.stringify(fix.recommendations);
    expect(recText).toContain("RecommendationV1 placeholder");
    expect(recText).not.toMatch(/ASHP recommendations/i);
  });
});
