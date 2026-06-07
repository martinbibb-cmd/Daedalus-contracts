import { z } from "zod";

export const DaedalusPackageRelationshipTypeSchema = z.enum([
  "containedIn",
  "connectedTo",
  "controls",
  "supplies",
  "serves",
]);

export const DaedalusPackageProvenanceSchema = z.object({
  method: z.string().min(1),
  captured_by: z.string().min(1),
  captured_at: z.string().datetime(),
});

const ConfidenceStateSchema = z.enum([
  "approximate",
  "observed",
  "unknown",
  "unresolved",
]);

export const DaedalusPackageObservationSchema = z
  .object({
    observation_id: z.string().min(1),
    tag: z.string().min(1),
    name: z.string().optional(),
    room_ref: z.string().min(1).optional(),
    asset_ref: z.string().min(1).optional(),
    file_ref: z.string().min(1).optional(),
    evidence_refs: z.array(z.string().min(1)).optional(),
    confidence: ConfidenceStateSchema.optional(),
    provenance: DaedalusPackageProvenanceSchema,
  })
  .passthrough();

export const DaedalusPackageRelationshipSchema = z
  .object({
    relationship_id: z.string().min(1),
    type: DaedalusPackageRelationshipTypeSchema,
    from: z.string().min(1),
    to: z.string().min(1),
    evidence_refs: z.array(z.string().min(1)).optional(),
    confidence_state: ConfidenceStateSchema.optional(),
    provenance: DaedalusPackageProvenanceSchema,
  })
  .passthrough();

export const DaedalusPackageV3Schema = z
  .object({
    packageVersion: z.literal(3),
    packageId: z.string().min(1),
    visitId: z.string().min(1),
    propertyRef: z.string().min(1),
    captured_at: z.string().datetime(),
    observations: z.array(DaedalusPackageObservationSchema).min(1),
    relationships: z.array(DaedalusPackageRelationshipSchema).default([]),
  })
  .superRefine((value, ctx) => {
    const observationIds = new Set<string>();

    value.observations.forEach((observation, index) => {
      if (observationIds.has(observation.observation_id)) {
        ctx.addIssue({
          code: z.ZodIssueCode.custom,
          message: `Duplicate observation_id: ${observation.observation_id}`,
          path: ["observations", index, "observation_id"],
        });
      }
      observationIds.add(observation.observation_id);
    });

    value.observations.forEach((observation, observationIndex) => {
      observation.evidence_refs?.forEach((evidenceRef, evidenceIndex) => {
        if (!observationIds.has(evidenceRef)) {
          ctx.addIssue({
            code: z.ZodIssueCode.custom,
            message: `Missing evidence reference: ${evidenceRef}`,
            path: ["observations", observationIndex, "evidence_refs", evidenceIndex],
          });
        }
      });
    });

    value.relationships.forEach((relationship, relationshipIndex) => {
      if (!observationIds.has(relationship.from)) {
        ctx.addIssue({
          code: z.ZodIssueCode.custom,
          message: `Missing relationship source: ${relationship.from}`,
          path: ["relationships", relationshipIndex, "from"],
        });
      }
      if (!observationIds.has(relationship.to)) {
        ctx.addIssue({
          code: z.ZodIssueCode.custom,
          message: `Missing relationship target: ${relationship.to}`,
          path: ["relationships", relationshipIndex, "to"],
        });
      }
      relationship.evidence_refs?.forEach((evidenceRef, evidenceIndex) => {
        if (!observationIds.has(evidenceRef)) {
          ctx.addIssue({
            code: z.ZodIssueCode.custom,
            message: `Missing relationship evidence reference: ${evidenceRef}`,
            path: ["relationships", relationshipIndex, "evidence_refs", evidenceIndex],
          });
        }
      });
    });
  });

export type DaedalusPackageV3 = z.infer<typeof DaedalusPackageV3Schema>;

