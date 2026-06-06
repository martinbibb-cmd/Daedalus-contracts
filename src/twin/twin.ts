import { z } from "zod";
import { zodToJsonSchema } from "zod-to-json-schema";

// ---------------------------------------------------------------------------
// Confidence
// Constitutional enum – values come directly from the Daedalus manifesto.
// ---------------------------------------------------------------------------

export const ConfidenceSchema = z.enum([
  "observed",
  "approximate",
  "unknown",
  "unresolved",
]);
export type Confidence = z.infer<typeof ConfidenceSchema>;

// ---------------------------------------------------------------------------
// Provenance
// ---------------------------------------------------------------------------

export const TwinProvenanceSchema = z.object({
  source: z.string(),
  observedAt: z.string().datetime().optional(),
  observedBy: z.string().optional(),
  notes: z.string().optional(),
});
export type TwinProvenance = z.infer<typeof TwinProvenanceSchema>;

// ---------------------------------------------------------------------------
// Evidence
// ---------------------------------------------------------------------------

export const TwinEvidenceSchema = z.object({
  id: z.string().uuid(),
  title: z.string(),
  description: z.string().optional(),
  provenance: TwinProvenanceSchema,
  confidence: ConfidenceSchema,
});
export type TwinEvidence = z.infer<typeof TwinEvidenceSchema>;

// ---------------------------------------------------------------------------
// Spatial position
// ---------------------------------------------------------------------------

export const SpatialPositionSchema = z.object({
  x: z.number(),
  y: z.number(),
  z: z.number(),
});
export type SpatialPosition = z.infer<typeof SpatialPositionSchema>;

// ---------------------------------------------------------------------------
// Capture state
// ---------------------------------------------------------------------------

export const CaptureStateSchema = z.enum([
  "anchored",
  "approximate",
  "roomAttached",
  "evidenceOnly",
  "unresolved",
]);
export type CaptureState = z.infer<typeof CaptureStateSchema>;

// ---------------------------------------------------------------------------
// Spatial placement
// ---------------------------------------------------------------------------

export const SpatialPlacementSchema = z.object({
  anchorID: z.string().optional(),
  confidence: ConfidenceSchema,
  captureState: CaptureStateSchema,
  approximatePosition: SpatialPositionSchema.optional(),
});
export type SpatialPlacement = z.infer<typeof SpatialPlacementSchema>;

// ---------------------------------------------------------------------------
// Spatial area
// ---------------------------------------------------------------------------

export const SpatialAreaSchema = z.object({
  id: z.string().uuid(),
  name: z.string(),
  placement: SpatialPlacementSchema,
  confidence: ConfidenceSchema,
});
export type SpatialArea = z.infer<typeof SpatialAreaSchema>;

// ---------------------------------------------------------------------------
// House twin
// ---------------------------------------------------------------------------

export const HouseTwinSchema = z.object({
  id: z.string().uuid(),
  areas: z.array(SpatialAreaSchema),
});
export type HouseTwin = z.infer<typeof HouseTwinSchema>;

// ---------------------------------------------------------------------------
// System asset type
// Constitutional enum – use this instead of a free-form string.
// ---------------------------------------------------------------------------

export const SystemAssetTypeSchema = z.enum([
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
]);
export type SystemAssetType = z.infer<typeof SystemAssetTypeSchema>;

// ---------------------------------------------------------------------------
// System asset
// ---------------------------------------------------------------------------

export const SystemAssetSchema = z.object({
  id: z.string().uuid(),
  assetType: SystemAssetTypeSchema,
  placement: SpatialPlacementSchema,
  confidence: ConfidenceSchema,
  evidenceIDs: z.array(z.string().uuid()),
});
export type SystemAsset = z.infer<typeof SystemAssetSchema>;

// ---------------------------------------------------------------------------
// System twin
// ---------------------------------------------------------------------------

export const SystemTwinSchema = z.object({
  id: z.string().uuid(),
  assets: z.array(SystemAssetSchema),
});
export type SystemTwin = z.infer<typeof SystemTwinSchema>;

// ---------------------------------------------------------------------------
// Home twin
// ---------------------------------------------------------------------------

export const HomeTwinSchema = z.object({
  id: z.string().uuid(),
  occupancyDescription: z.string().optional(),
  notes: z.string().optional(),
});
export type HomeTwin = z.infer<typeof HomeTwinSchema>;

// ---------------------------------------------------------------------------
// Unified property twin
// ---------------------------------------------------------------------------

export const UnifiedPropertyTwinSchema = z.object({
  house: HouseTwinSchema,
  system: SystemTwinSchema,
  home: HomeTwinSchema,
});
export type UnifiedPropertyTwin = z.infer<typeof UnifiedPropertyTwinSchema>;

// ---------------------------------------------------------------------------
// Daedalus package
// Top-level transport envelope. No simulation or recommendation logic.
// ---------------------------------------------------------------------------

export const DaedalusPackageSchema = z.object({
  version: z.string(),
  packageID: z.string().uuid(),
  createdAt: z.string().datetime(),
  houseTwin: HouseTwinSchema,
  systemTwin: SystemTwinSchema,
  homeTwin: HomeTwinSchema,
  evidence: z.array(TwinEvidenceSchema),
});
export type DaedalusPackage = z.infer<typeof DaedalusPackageSchema>;

// ---------------------------------------------------------------------------
// JSON schemas (for export / interop)
// ---------------------------------------------------------------------------

export const DaedalusPackageJsonSchema = zodToJsonSchema(DaedalusPackageSchema, {
  name: "DaedalusPackage",
});

export const UnifiedPropertyTwinJsonSchema = zodToJsonSchema(
  UnifiedPropertyTwinSchema,
  { name: "UnifiedPropertyTwin" }
);

export type PackageValidationIssue = {
  path: string;
  code: string;
  message: string;
  severity: "error" | "warning";
};

export type PackageValidationResult = {
  valid: boolean;
  issues: PackageValidationIssue[];
};

const zodIssuePathToString = (path: (string | number)[]): string => {
  if (path.length === 0) {
    return "$";
  }

  let formattedPath = "";

  path.forEach((segment) => {
    if (typeof segment === "number") {
      formattedPath = `${formattedPath}[${segment}]`;
      return;
    }

    formattedPath = formattedPath ? `${formattedPath}.${segment}` : segment;
  });

  return formattedPath;
};

const issueFromZodIssue = (issue: z.ZodIssue): PackageValidationIssue => ({
  path: zodIssuePathToString(issue.path),
  code: issue.code,
  message: issue.message,
  severity: "error",
});

const duplicateIdIssues = (
  ids: string[],
  pathPrefix: string,
  code: string,
  message: string
): PackageValidationIssue[] => {
  const seen = new Set<string>();
  const issues: PackageValidationIssue[] = [];

  ids.forEach((id, index) => {
    if (seen.has(id)) {
      issues.push({
        path: `${pathPrefix}[${index}].id`,
        code,
        message: `${message}: ${id}`,
        severity: "error",
      });
      return;
    }
    seen.add(id);
  });

  return issues;
};

export const validateEvidenceReferences = (
  packageData: DaedalusPackage
): PackageValidationIssue[] => {
  const evidenceIDs = new Set(packageData.evidence.map((item) => item.id));
  const issues: PackageValidationIssue[] = [];

  packageData.systemTwin.assets.forEach((asset, assetIndex) => {
    asset.evidenceIDs.forEach((evidenceID, evidenceIndex) => {
      if (!evidenceIDs.has(evidenceID)) {
        issues.push({
          path: `systemTwin.assets[${assetIndex}].evidenceIDs[${evidenceIndex}]`,
          code: "evidence.reference.missing",
          message: `Evidence ID does not exist in package evidence array: ${evidenceID}`,
          severity: "error",
        });
      }
    });
  });

  return issues;
};

export const validateTwinIntegrity = (
  packageData: DaedalusPackage
): PackageValidationIssue[] => {
  const issues: PackageValidationIssue[] = [];

  issues.push(
    ...duplicateIdIssues(
      packageData.houseTwin.areas.map((area) => area.id),
      "houseTwin.areas",
      "spatialArea.id.duplicate",
      "Duplicate SpatialArea.id"
    )
  );

  issues.push(
    ...duplicateIdIssues(
      packageData.systemTwin.assets.map((asset) => asset.id),
      "systemTwin.assets",
      "systemAsset.id.duplicate",
      "Duplicate SystemAsset.id"
    )
  );

  issues.push(
    ...duplicateIdIssues(
      packageData.evidence.map((evidence) => evidence.id),
      "evidence",
      "twinEvidence.id.duplicate",
      "Duplicate TwinEvidence.id"
    )
  );

  const unifiedTwinResult = UnifiedPropertyTwinSchema.safeParse({
    house: packageData.houseTwin,
    system: packageData.systemTwin,
    home: packageData.homeTwin,
  });

  if (!unifiedTwinResult.success) {
    issues.push(...unifiedTwinResult.error.issues.map(issueFromZodIssue));
  }

  return issues;
};

export const validateDaedalusPackage = (
  packageData: unknown
): PackageValidationResult => {
  const parsedPackage = DaedalusPackageSchema.safeParse(packageData);

  if (!parsedPackage.success) {
    return {
      valid: false,
      issues: parsedPackage.error.issues.map(issueFromZodIssue),
    };
  }

  const issues = [
    ...validateEvidenceReferences(parsedPackage.data),
    ...validateTwinIntegrity(parsedPackage.data),
  ];

  return {
    valid: issues.length === 0,
    issues,
  };
};
