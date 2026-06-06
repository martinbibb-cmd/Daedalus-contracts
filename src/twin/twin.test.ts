import {
  DaedalusPackageSchema,
  UnifiedPropertyTwinSchema,
  ConfidenceSchema,
  CaptureStateSchema,
  SystemAssetTypeSchema,
  SpatialPlacementSchema,
  DaedalusPackageJsonSchema,
  UnifiedPropertyTwinJsonSchema,
  type DaedalusPackage,
} from "./twin";

// ---------------------------------------------------------------------------
// Shared fixture: a fully-populated sample package
// One boiler, one airing cupboard (area), one cylinder, three radiators,
// one evidence photo.
// ---------------------------------------------------------------------------

const samplePackage: DaedalusPackage = {
  version: "1.0.0",
  packageID: "00000000-0000-0000-0000-000000000001",
  createdAt: "2026-01-01T00:00:00.000Z",
  houseTwin: {
    id: "00000000-0000-0000-0000-000000000010",
    areas: [
      {
        id: "00000000-0000-0000-0000-000000000020",
        name: "Airing Cupboard",
        placement: {
          captureState: "roomAttached",
          confidence: "approximate",
        },
        confidence: "approximate",
      },
    ],
  },
  systemTwin: {
    id: "00000000-0000-0000-0000-000000000030",
    assets: [
      {
        id: "00000000-0000-0000-0000-000000000040",
        assetType: "boiler",
        placement: { captureState: "evidenceOnly", confidence: "observed" },
        confidence: "observed",
        evidenceIDs: ["00000000-0000-0000-0000-000000000090"],
      },
      {
        id: "00000000-0000-0000-0000-000000000050",
        assetType: "cylinder",
        placement: { captureState: "roomAttached", confidence: "observed" },
        confidence: "observed",
        evidenceIDs: [],
      },
      {
        id: "00000000-0000-0000-0000-000000000060",
        assetType: "radiator",
        placement: { captureState: "approximate", confidence: "approximate" },
        confidence: "approximate",
        evidenceIDs: [],
      },
      {
        id: "00000000-0000-0000-0000-000000000061",
        assetType: "radiator",
        placement: { captureState: "approximate", confidence: "approximate" },
        confidence: "approximate",
        evidenceIDs: [],
      },
      {
        id: "00000000-0000-0000-0000-000000000062",
        assetType: "radiator",
        placement: { captureState: "approximate", confidence: "approximate" },
        confidence: "approximate",
        evidenceIDs: [],
      },
    ],
  },
  homeTwin: {
    id: "00000000-0000-0000-0000-000000000070",
    occupancyDescription: "Family of four",
  },
  evidence: [
    {
      id: "00000000-0000-0000-0000-000000000090",
      title: "Boiler nameplate photograph",
      description: "Photo of the boiler data plate showing model and serial.",
      provenance: {
        source: "site-survey",
        observedAt: "2026-01-01T09:00:00.000Z",
        observedBy: "surveyor@example.com",
      },
      confidence: "observed",
    },
  ],
};

const forbiddenBoundaryFields = [
  "recommendation",
  "suitability",
  "score",
  "rank",
  "price",
  "simulation",
];

const collectJsonSchemaPropertyNames = (schema: unknown): string[] => {
  const names = new Set<string>();

  const visit = (value: unknown): void => {
    if (Array.isArray(value)) {
      value.forEach(visit);
      return;
    }

    if (!value || typeof value !== "object") {
      return;
    }

    const record = value as Record<string, unknown>;

    if (record.properties && typeof record.properties === "object") {
      Object.keys(record.properties as Record<string, unknown>).forEach((key) =>
        names.add(key)
      );
    }

    Object.values(record).forEach(visit);
  };

  visit(schema);
  return [...names];
};

// ---------------------------------------------------------------------------
// Confidence enum
// ---------------------------------------------------------------------------

describe("ConfidenceSchema", () => {
  it("accepts all constitutional values", () => {
    const values = ["observed", "approximate", "unknown", "unresolved"] as const;
    values.forEach((v) => expect(ConfidenceSchema.parse(v)).toBe(v));
  });

  it("accepts unknown, approximate, and unresolved states", () => {
    const values = ["unknown", "approximate", "unresolved"] as const;
    values.forEach((v) => expect(ConfidenceSchema.parse(v)).toBe(v));
  });

  it("rejects non-constitutional values", () => {
    expect(() => ConfidenceSchema.parse("confirmed")).toThrow();
    expect(() => ConfidenceSchema.parse("")).toThrow();
  });
});

// ---------------------------------------------------------------------------
// CaptureState enum
// ---------------------------------------------------------------------------

describe("CaptureStateSchema", () => {
  it("accepts all capture states", () => {
    const values = [
      "anchored",
      "approximate",
      "roomAttached",
      "evidenceOnly",
      "unresolved",
    ] as const;
    values.forEach((v) => expect(CaptureStateSchema.parse(v)).toBe(v));
  });
});

// ---------------------------------------------------------------------------
// SystemAssetType enum
// ---------------------------------------------------------------------------

describe("SystemAssetTypeSchema", () => {
  it("accepts all asset types", () => {
    const types = [
      "boiler",
      "cylinder",
      "thermalStore",
      "radiator",
      "control",
      "pump",
      "valve",
      "flue",
      "meter",
      "unknown",
    ] as const;
    types.forEach((t) => expect(SystemAssetTypeSchema.parse(t)).toBe(t));
  });

  it("rejects free-form strings", () => {
    expect(() => SystemAssetTypeSchema.parse("BoilerUnit")).toThrow();
    expect(() => SystemAssetTypeSchema.parse("")).toThrow();
  });
});

describe("SpatialPlacementSchema", () => {
  it("supports evidenceOnly without approximatePosition", () => {
    expect(
      SpatialPlacementSchema.parse({
        captureState: "evidenceOnly",
        confidence: "unknown",
      })
    ).toEqual({
      captureState: "evidenceOnly",
      confidence: "unknown",
    });
  });

  it("supports roomAttached without anchorID", () => {
    expect(
      SpatialPlacementSchema.parse({
        captureState: "roomAttached",
        confidence: "approximate",
      })
    ).toEqual({
      captureState: "roomAttached",
      confidence: "approximate",
    });
  });
});

// ---------------------------------------------------------------------------
// DaedalusPackage – round-trip serialisation
// ---------------------------------------------------------------------------

describe("DaedalusPackageSchema", () => {
  it("parses the sample package", () => {
    const result = DaedalusPackageSchema.parse(samplePackage);
    expect(result.version).toBe("1.0.0");
    expect(result.houseTwin.areas).toHaveLength(1);
    expect(result.houseTwin.areas[0].name).toBe("Airing Cupboard");
    expect(result.systemTwin.assets).toHaveLength(5);
    expect(result.evidence).toHaveLength(1);
  });

  it("round-trips through JSON with no data loss", () => {
    const serialised = JSON.stringify(DaedalusPackageSchema.parse(samplePackage));
    const deserialised = DaedalusPackageSchema.parse(JSON.parse(serialised));

    expect(deserialised.packageID).toBe(samplePackage.packageID);
    expect(deserialised.houseTwin.areas[0].id).toBe(
      samplePackage.houseTwin.areas[0].id
    );

    const boiler = deserialised.systemTwin.assets.find(
      (a) => a.assetType === "boiler"
    );
    expect(boiler).toBeDefined();
    expect(boiler!.evidenceIDs).toContain("00000000-0000-0000-0000-000000000090");

    const radiators = deserialised.systemTwin.assets.filter(
      (a) => a.assetType === "radiator"
    );
    expect(radiators).toHaveLength(3);

    expect(deserialised.evidence[0].confidence).toBe("observed");
    expect(deserialised.evidence[0].provenance.source).toBe("site-survey");
  });

  it("rejects a package with an unknown asset type", () => {
    const bad = {
      ...samplePackage,
      systemTwin: {
        ...samplePackage.systemTwin,
        assets: [
          {
            ...samplePackage.systemTwin.assets[0],
            assetType: "HeatPump", // not in enum
          },
        ],
      },
    };
    expect(() => DaedalusPackageSchema.parse(bad)).toThrow();
  });

  it("allows optional fields to be omitted", () => {
    const minimal: DaedalusPackage = {
      ...samplePackage,
      homeTwin: { id: "00000000-0000-0000-0000-000000000070" },
      evidence: [],
    };
    const result = DaedalusPackageSchema.parse(minimal);
    expect(result.homeTwin.occupancyDescription).toBeUndefined();
  });
});

// ---------------------------------------------------------------------------
// UnifiedPropertyTwin
// ---------------------------------------------------------------------------

describe("UnifiedPropertyTwinSchema", () => {
  it("parses house + system + home together", () => {
    const twin = UnifiedPropertyTwinSchema.parse({
      house: samplePackage.houseTwin,
      system: samplePackage.systemTwin,
      home: samplePackage.homeTwin,
    });
    expect(twin.house.areas).toHaveLength(1);
    expect(twin.system.assets).toHaveLength(5);
  });
});

// ---------------------------------------------------------------------------
// JSON schema exports
// ---------------------------------------------------------------------------

describe("JSON schema exports", () => {
  it("exports DaedalusPackage JSON schema as an object", () => {
    expect(typeof DaedalusPackageJsonSchema).toBe("object");
  });

  it("exports UnifiedPropertyTwin JSON schema as an object", () => {
    expect(typeof UnifiedPropertyTwinJsonSchema).toBe("object");
  });

  it("keeps forbidden recommendation and simulation fields out of contract schemas", () => {
    const packageFields = collectJsonSchemaPropertyNames(DaedalusPackageJsonSchema);
    const twinFields = collectJsonSchemaPropertyNames(UnifiedPropertyTwinJsonSchema);

    forbiddenBoundaryFields.forEach((field) => {
      expect(packageFields).not.toContain(field);
      expect(twinFields).not.toContain(field);
    });
  });
});
