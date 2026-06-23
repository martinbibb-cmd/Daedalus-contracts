import { z } from "zod";
import { zodToJsonSchema } from "zod-to-json-schema";

export const PropertyRootContractAuthority = Object.freeze({
  propertyIsRootIdentity: true,
  usersOrganisationsWorkspacesBillingAndSubscriptionsAreNotRoots: true,
  binaryMediaEmbeddedInStructuredData: false,
  aiOutputAuthoritativeTruth: false,
});

const NonEmptyStringSchema = z.string().trim().min(1);
const OptionalRecordSchema = z.record(z.unknown()).optional();

export const PropertyIdentitySchema = z
  .object({
    kind: z.literal("PropertyIdentity").default("PropertyIdentity"),
    property_id: NonEmptyStringSchema,
    property_ref: NonEmptyStringSchema,
    root_entity: z.literal("property").default("property"),
    can_exist_without_users: z.literal(true).default(true),
    owner_ref: z.never().optional(),
    user_ref: z.never().optional(),
    organisation_ref: z.never().optional(),
    workspace_ref: z.never().optional(),
    billing_ref: z.never().optional(),
    subscription_ref: z.never().optional(),
  })
  .strict();
export type PropertyIdentity = z.infer<typeof PropertyIdentitySchema>;

const PropertyRootedEntitySchema = z.object({
  property_id: NonEmptyStringSchema,
  property_ref: NonEmptyStringSchema,
  ownership_root: z.literal("PropertyIdentity").default("PropertyIdentity"),
});

export const PropertyTwinSchema = PropertyRootedEntitySchema.extend({
  kind: z.literal("PropertyTwin").default("PropertyTwin"),
  twin_ref: NonEmptyStringSchema,
  authoritative: z.boolean(),
  working: z.boolean(),
  ai_authoritative: z.literal(false).default(false),
});
export type PropertyTwin = z.infer<typeof PropertyTwinSchema>;

export const WorkingTwinSchema = PropertyTwinSchema.extend({
  kind: z.literal("WorkingTwin").default("WorkingTwin"),
  working: z.literal(true).default(true),
  authoritative: z.literal(false).default(false),
  source: z.enum(["survey_capture", "import", "manual_edit"]).default("survey_capture"),
});
export type WorkingTwin = z.infer<typeof WorkingTwinSchema>;

export const AuthoritativeTwinSchema = PropertyTwinSchema.extend({
  kind: z.literal("AuthoritativeTwin").default("AuthoritativeTwin"),
  authoritative: z.literal(true).default(true),
  working: z.literal(false).default(false),
  committed_at: NonEmptyStringSchema,
});
export type AuthoritativeTwin = z.infer<typeof AuthoritativeTwinSchema>;

export const SurveyCaptureSessionSchema = PropertyRootedEntitySchema.extend({
  kind: z.literal("SurveyCaptureSession").default("SurveyCaptureSession"),
  session_ref: NonEmptyStringSchema,
  working_twin_ref: NonEmptyStringSchema,
  temporary: z.literal(true).default(true),
  authoritative: z.literal(false).default(false),
});
export type SurveyCaptureSession = z.infer<typeof SurveyCaptureSessionSchema>;

export const EvidenceReferenceMetadataSchema = PropertyRootedEntitySchema.extend({
  kind: z.literal("EvidenceReferenceMetadata").default("EvidenceReferenceMetadata"),
  evidence_ref: NonEmptyStringSchema,
  twin_ref: NonEmptyStringSchema,
  session_ref: NonEmptyStringSchema.optional(),
  media_ref: NonEmptyStringSchema,
  media_type: z.enum(["photo", "video", "audio", "document", "text", "other"]).default("photo"),
  content_type: NonEmptyStringSchema.optional(),
  content_hash: NonEmptyStringSchema.optional(),
  binary_embedded: z.literal(false).default(false),
  ai_generated: z.boolean().default(false),
  authoritative_truth: z.literal(false).default(false),
});
export type EvidenceReferenceMetadata = z.infer<typeof EvidenceReferenceMetadataSchema>;

export const ObservationSchema = PropertyRootedEntitySchema.extend({
  kind: z.literal("Observation").default("Observation"),
  observation_ref: NonEmptyStringSchema,
  twin_ref: NonEmptyStringSchema,
  session_ref: NonEmptyStringSchema.optional(),
  tag: NonEmptyStringSchema,
  evidence_refs: z.array(NonEmptyStringSchema).default([]),
  ai_generated: z.boolean().default(false),
  authoritative_truth: z.literal(false).default(false),
  data: OptionalRecordSchema,
});
export type Observation = z.infer<typeof ObservationSchema>;

export const AreaSchema = PropertyRootedEntitySchema.extend({
  kind: z.literal("Area").default("Area"),
  area_ref: NonEmptyStringSchema,
  twin_ref: NonEmptyStringSchema,
  name: NonEmptyStringSchema.optional(),
  evidence_refs: z.array(NonEmptyStringSchema).default([]),
  data: OptionalRecordSchema,
});
export type Area = z.infer<typeof AreaSchema>;

export const ComponentObjectSchema = PropertyRootedEntitySchema.extend({
  kind: z.literal("ComponentObject").default("ComponentObject"),
  object_ref: NonEmptyStringSchema,
  twin_ref: NonEmptyStringSchema,
  component_type: NonEmptyStringSchema.default("unknown"),
  area_ref: NonEmptyStringSchema.optional(),
  evidence_refs: z.array(NonEmptyStringSchema).default([]),
  data: OptionalRecordSchema,
});
export type ComponentObject = z.infer<typeof ComponentObjectSchema>;

export const RelationshipTypeSchema = z.enum([
  "containedIn",
  "connectedTo",
  "controls",
  "supplies",
  "serves",
  "relatesTo",
]);

export const RelationshipSchema = PropertyRootedEntitySchema.extend({
  kind: z.literal("Relationship").default("Relationship"),
  relationship_ref: NonEmptyStringSchema,
  twin_ref: NonEmptyStringSchema,
  type: RelationshipTypeSchema,
  from_ref: NonEmptyStringSchema,
  to_ref: NonEmptyStringSchema,
  evidence_refs: z.array(NonEmptyStringSchema).default([]),
  data: OptionalRecordSchema,
});
export type Relationship = z.infer<typeof RelationshipSchema>;

export const CommitSchema = PropertyRootedEntitySchema.extend({
  kind: z.literal("Commit").default("Commit"),
  commit_ref: NonEmptyStringSchema,
  working_twin_ref: NonEmptyStringSchema,
  authoritative_twin_ref: NonEmptyStringSchema,
  committed_at: NonEmptyStringSchema,
  ai_output_authoritative: z.literal(false).default(false),
});
export type Commit = z.infer<typeof CommitSchema>;

export const MergeSchema = PropertyRootedEntitySchema.extend({
  kind: z.literal("Merge").default("Merge"),
  merge_ref: NonEmptyStringSchema,
  source_twin_refs: z.array(NonEmptyStringSchema).min(1),
  target_twin_ref: NonEmptyStringSchema,
  merged_at: NonEmptyStringSchema,
  ai_output_authoritative: z.literal(false).default(false),
});
export type Merge = z.infer<typeof MergeSchema>;

export const ArchiveSnapshotSchema = PropertyRootedEntitySchema.extend({
  kind: z.literal("ArchiveSnapshot").default("ArchiveSnapshot"),
  snapshot_ref: NonEmptyStringSchema,
  source_twin_ref: NonEmptyStringSchema,
  archived_at: NonEmptyStringSchema,
  immutable: z.literal(true).default(true),
});
export type ArchiveSnapshot = z.infer<typeof ArchiveSnapshotSchema>;

export const AccessGrantSchema = PropertyRootedEntitySchema.extend({
  kind: z.literal("AccessGrant").default("AccessGrant"),
  grant_ref: NonEmptyStringSchema,
  subject_type: z.enum(["user", "organisation", "organization", "workspace", "custodian"]),
  subject_ref: NonEmptyStringSchema,
  attachment_point_only: z.literal(true).default(true),
  ownership_root: z.literal("PropertyIdentity").default("PropertyIdentity"),
});
export type AccessGrant = z.infer<typeof AccessGrantSchema>;

export const CustodianChangeSchema = PropertyRootedEntitySchema.extend({
  kind: z.literal("CustodianChange").default("CustodianChange"),
  change_ref: NonEmptyStringSchema,
  previous_custodian_ref: NonEmptyStringSchema.optional(),
  next_custodian_ref: NonEmptyStringSchema,
  attachment_point_only: z.literal(true).default(true),
  transfers_twin_ownership: z.literal(false).default(false),
});
export type CustodianChange = z.infer<typeof CustodianChangeSchema>;

export const DaedalusPackageV4Schema = z
  .object({
    packageVersion: z.literal(4),
    packageId: NonEmptyStringSchema,
    exportedAt: NonEmptyStringSchema,
    propertyIdentity: PropertyIdentitySchema,
    workingTwin: WorkingTwinSchema.optional(),
    authoritativeTwin: AuthoritativeTwinSchema.optional(),
    surveyCaptureSession: SurveyCaptureSessionSchema.optional(),
    evidence: z.array(EvidenceReferenceMetadataSchema).default([]),
    observations: z.array(ObservationSchema).default([]),
    areas: z.array(AreaSchema).default([]),
    components: z.array(ComponentObjectSchema).default([]),
    relationships: z.array(RelationshipSchema).default([]),
    commits: z.array(CommitSchema).default([]),
    merges: z.array(MergeSchema).default([]),
    archiveSnapshots: z.array(ArchiveSnapshotSchema).default([]),
    accessGrants: z.array(AccessGrantSchema).default([]),
    custodianChanges: z.array(CustodianChangeSchema).default([]),
  })
  .superRefine((value, ctx) => {
    const propertyId = value.propertyIdentity.property_id;
    const propertyRef = value.propertyIdentity.property_ref;

    const assertRooted = (
      entity: { property_id: string; property_ref: string },
      path: (string | number)[]
    ) => {
      if (entity.property_id !== propertyId) {
        ctx.addIssue({
          code: z.ZodIssueCode.custom,
          message: "Entity property_id must match propertyIdentity.property_id.",
          path: path.concat("property_id"),
        });
      }
      if (entity.property_ref !== propertyRef) {
        ctx.addIssue({
          code: z.ZodIssueCode.custom,
          message: "Entity property_ref must match propertyIdentity.property_ref.",
          path: path.concat("property_ref"),
        });
      }
    };

    if (value.workingTwin) {
      assertRooted(value.workingTwin, ["workingTwin"]);
    }
    if (value.authoritativeTwin) {
      assertRooted(value.authoritativeTwin, ["authoritativeTwin"]);
    }
    if (value.surveyCaptureSession) {
      assertRooted(value.surveyCaptureSession, ["surveyCaptureSession"]);
      if (value.workingTwin && value.surveyCaptureSession.working_twin_ref !== value.workingTwin.twin_ref) {
        ctx.addIssue({
          code: z.ZodIssueCode.custom,
          message: "SurveyCaptureSession must link to the package WorkingTwin.",
          path: ["surveyCaptureSession", "working_twin_ref"],
        });
      }
    }

    const collections = [
      ["evidence", value.evidence],
      ["observations", value.observations],
      ["areas", value.areas],
      ["components", value.components],
      ["relationships", value.relationships],
      ["commits", value.commits],
      ["merges", value.merges],
      ["archiveSnapshots", value.archiveSnapshots],
      ["accessGrants", value.accessGrants],
      ["custodianChanges", value.custodianChanges],
    ] as const;

    collections.forEach(([name, entries]) => {
      entries.forEach((entry, index) => assertRooted(entry, [name, index]));
    });
  });
export type DaedalusPackageV4 = z.infer<typeof DaedalusPackageV4Schema>;

export const LegacyDaedalusPackageV3UpgradeShapeSchema = z
  .object({
    packageVersion: z.literal(3),
    packageId: NonEmptyStringSchema.optional(),
    visitId: NonEmptyStringSchema.optional(),
    visit_id: NonEmptyStringSchema.optional(),
    propertyRef: NonEmptyStringSchema.optional(),
    property_ref: NonEmptyStringSchema.optional(),
    observations: z.array(z.record(z.unknown())).optional(),
    relationships: z.array(z.record(z.unknown())).optional(),
  })
  .passthrough()
  .superRefine((value, ctx) => {
    if (!value.propertyRef && !value.property_ref) {
      ctx.addIssue({
        code: z.ZodIssueCode.custom,
        message: "Legacy v3 package requires propertyRef or property_ref before upgrade.",
        path: ["propertyRef"],
      });
    }
  });
export type LegacyDaedalusPackageV3UpgradeShape = z.infer<
  typeof LegacyDaedalusPackageV3UpgradeShapeSchema
>;

export type LegacyUpgradeIdentification =
  | { status: "v4"; packageVersion: 4 }
  | { status: "legacy_v3_upgrade_required"; packageVersion: 3; property_ref: string }
  | { status: "unsupported"; packageVersion: unknown };

export function identifyDaedalusPackageForUpgrade(input: unknown): LegacyUpgradeIdentification {
  const v4 = DaedalusPackageV4Schema.safeParse(input);
  if (v4.success) {
    return { status: "v4", packageVersion: 4 };
  }

  const v3 = LegacyDaedalusPackageV3UpgradeShapeSchema.safeParse(input);
  if (v3.success) {
    return {
      status: "legacy_v3_upgrade_required",
      packageVersion: 3,
      property_ref: v3.data.propertyRef ?? v3.data.property_ref!,
    };
  }

  const packageVersion =
    input && typeof input === "object" && "packageVersion" in input
      ? (input as { packageVersion?: unknown }).packageVersion
      : undefined;
  return { status: "unsupported", packageVersion };
}

export function normalizeLegacyV3ToPropertyRootShell(input: unknown) {
  const legacy = LegacyDaedalusPackageV3UpgradeShapeSchema.parse(input);
  const propertyRef = legacy.propertyRef ?? legacy.property_ref!;
  const propertyId = `property:${propertyRef}`;
  const workingTwinRef = `working-twin:${legacy.visitId ?? legacy.visit_id ?? legacy.packageId ?? propertyRef}`;

  return DaedalusPackageV4Schema.parse({
    packageVersion: 4,
    packageId: legacy.packageId ?? `upgrade:${propertyRef}`,
    exportedAt: new Date(0).toISOString(),
    propertyIdentity: {
      property_id: propertyId,
      property_ref: propertyRef,
    },
    workingTwin: {
      property_id: propertyId,
      property_ref: propertyRef,
      twin_ref: workingTwinRef,
    },
    observations: [],
    relationships: [],
  });
}

export const DaedalusPackageV4JsonSchema = zodToJsonSchema(DaedalusPackageV4Schema, {
  name: "DaedalusPackageV4PropertyRoot",
});
