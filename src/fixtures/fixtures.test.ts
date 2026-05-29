import {
  SurveyFixtureSchema,
  SurveyFixtureJsonSchema,
  loadFixture,
  FIX_001_OpenVentedRegular,
  FIX_002_SystemUnvented,
  FIX_003_CombiFlat,
  FIX_004_HeatPumpPathway,
} from "./index";

const ALL_FIXTURES = [
  { id: "FIX_001", fixture: FIX_001_OpenVentedRegular },
  { id: "FIX_002", fixture: FIX_002_SystemUnvented },
  { id: "FIX_003", fixture: FIX_003_CombiFlat },
  { id: "FIX_004", fixture: FIX_004_HeatPumpPathway },
];

describe("SurveyFixtureSchema", () => {
  it("exports a JSON schema object", () => {
    expect(typeof SurveyFixtureJsonSchema).toBe("object");
  });
});

describe("loadFixture", () => {
  it("loads and validates each fixture without throwing", () => {
    ALL_FIXTURES.forEach(({ id, fixture }) => {
      expect(() => loadFixture(fixture)).not.toThrow();
      const loaded = loadFixture(fixture);
      expect(loaded.fixtureId).toBe(id);
    });
  });
});

describe("FIX_001_OpenVentedRegular", () => {
  let fix: ReturnType<typeof loadFixture>;
  beforeAll(() => {
    fix = loadFixture(FIX_001_OpenVentedRegular);
  });

  it("has correct fixtureId", () => {
    expect(fix.fixtureId).toBe("FIX_001");
  });

  it("is an open vented regular system", () => {
    expect(fix.hydraulics.systemType.value).toBe("OpenVentedRegular");
  });

  it("has a vented indirect cylinder", () => {
    expect(fix.systemComponents.hotWaterCylinder?.cylinderType.value).toBe(
      "VentedIndirect"
    );
  });

  it("has an F&E tank expansion type", () => {
    expect(fix.hydraulics.systemPressure.expansionType.value).toBe(
      "OpenVentedFAndETank"
    );
  });

  it("validates against SurveyFixtureSchema", () => {
    const result = SurveyFixtureSchema.safeParse(FIX_001_OpenVentedRegular);
    expect(result.success).toBe(true);
  });
});

describe("FIX_002_SystemUnvented", () => {
  let fix: ReturnType<typeof loadFixture>;
  beforeAll(() => {
    fix = loadFixture(FIX_002_SystemUnvented);
  });

  it("has correct fixtureId", () => {
    expect(fix.fixtureId).toBe("FIX_002");
  });

  it("is a system boiler unvented", () => {
    expect(fix.hydraulics.systemType.value).toBe("SystemBoilerUnvented");
  });

  it("has an unvented indirect cylinder", () => {
    expect(fix.systemComponents.hotWaterCylinder?.cylinderType.value).toBe(
      "UnventedIndirect"
    );
  });

  it("has sealed expansion vessel", () => {
    expect(fix.hydraulics.systemPressure.expansionType.value).toBe(
      "SealedExpansionVessel"
    );
  });
});

describe("FIX_003_CombiFlat", () => {
  let fix: ReturnType<typeof loadFixture>;
  beforeAll(() => {
    fix = loadFixture(FIX_003_CombiFlat);
  });

  it("has correct fixtureId", () => {
    expect(fix.fixtureId).toBe("FIX_003");
  });

  it("is a combi system", () => {
    expect(fix.hydraulics.systemType.value).toBe("Combi");
  });

  it("has no hot water cylinder", () => {
    expect(fix.systemComponents.hotWaterCylinder).toBeUndefined();
  });

  it("has instantaneous hot water distribution", () => {
    expect(fix.waterSupply.hotWaterDistributionType.value).toBe(
      "Instantaneous"
    );
  });

  it("is in a flat", () => {
    expect(fix.property.propertyType.value).toBe("Flat");
  });
});

describe("FIX_004_HeatPumpPathway", () => {
  let fix: ReturnType<typeof loadFixture>;
  beforeAll(() => {
    fix = loadFixture(FIX_004_HeatPumpPathway);
  });

  it("has correct fixtureId", () => {
    expect(fix.fixtureId).toBe("FIX_004");
  });

  it("has recommendations for heat pump upgrade", () => {
    const hpRec = fix.recommendations.recommendations.find(
      (r) => r.category === "HeatSourceUpgrade"
    );
    expect(hpRec).toBeDefined();
  });

  it("has recommendation for cavity wall insulation", () => {
    const insRec = fix.recommendations.recommendations.find(
      (r) => r.category === "InsulationImprovement"
    );
    expect(insRec).toBeDefined();
  });

  it("has evidence items", () => {
    expect(fix.evidencePack.items.length).toBeGreaterThan(0);
  });

  it("has serviceability items with remaining life", () => {
    const boilerItem = fix.serviceability.items.find(
      (i) => i.component === "Combi Boiler"
    );
    expect(boilerItem?.estimatedRemainingLifeYears?.value).toBe(4);
  });
});
