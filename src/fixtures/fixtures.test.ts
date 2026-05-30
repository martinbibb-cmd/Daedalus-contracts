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

function cloneFixture<T>(fixture: T): T {
  return JSON.parse(JSON.stringify(fixture)) as T;
}

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

  it("ensures hydraulics network ports reference valid ComponentPorts", () => {
    ALL_FIXTURES.forEach((fixture) => {
      expect(() => loadFixture(fixture)).not.toThrow();
      const componentPortIds = new Set(
        fixture.systemComponents.componentPorts.map((port) => port.id)
      );
      fixture.hydraulics.network.ports.forEach((port) => {
        expect(componentPortIds.has(port.id)).toBe(true);
      });
    });
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

  it("rejects core domains inside optionalMetadata", () => {
    const invalid = cloneFixture(FIX_001_OpenVentedRegular);
    invalid.optionalMetadata = {
      ...invalid.optionalMetadata,
      airflow: { invalid: true },
    };
    expect(() => loadFixture(invalid)).toThrow(
      "Core V1.1 domain 'airflow' must not be nested under optionalMetadata"
    );
  });

  it("rejects hydraulics network ports not present in ComponentPorts", () => {
    const invalid = cloneFixture(FIX_001_OpenVentedRegular);
    invalid.hydraulics.network.ports.push({
      id: "00000001-0000-0000-0000-000000009999",
      componentId: "00000001-0000-0000-0000-000000000020",
      role: "Flow",
      medium: "Water",
    });
    expect(() => loadFixture(invalid)).toThrow(
      "is not declared in systemComponents.componentPorts"
    );
  });

  it("enforces placeholder-only recommendation content", () => {
    ALL_FIXTURES.forEach((fixture) => {
      const loaded = loadFixture(fixture);
      loaded.recommendations.recommendations.forEach((item) => {
        expect(item.placeholder).toBe(true);
        expect(item.title.toLowerCase()).toContain("placeholder");
      });
      loaded.recommendations.options.forEach((item) => {
        expect(item.placeholder).toBe(true);
        expect(item.label.toLowerCase()).toContain("placeholder");
      });
      loaded.recommendations.tradeOffs.forEach((item) => {
        expect(item.placeholder).toBe(true);
      });
      loaded.recommendations.pathwayRecommendations.forEach((item) => {
        expect(item.placeholder).toBe(true);
      });
    });
  });

  it("rejects non-placeholder recommendation text", () => {
    const invalid = cloneFixture(FIX_001_OpenVentedRegular);
    invalid.recommendations.recommendations[0].title = "Install ASHP now";
    expect(() => loadFixture(invalid)).toThrow(
      "Recommendation at index 0 must remain placeholder-only content"
    );
  });
});
