import { z } from "zod";
import { zodToJsonSchema } from "zod-to-json-schema";

export const ServiceDomainSchema = z.enum([
  "domesticHotWater",
  "coldWater",
  "spaceHeating",
  "controls",
  "disruption",
  "maintenance",
  "resilience",
  "accessibility",
  "unknown",
]);
export type ServiceDomain = z.infer<typeof ServiceDomainSchema>;

export const ServiceModelSourceSchema = z
  .object({
    sourceType: z.enum(["observation", "interpretation", "compiledTwin", "manual", "unknown"]),
    sourceID: z.string().min(1).optional(),
    capturedAt: z.string().datetime().optional(),
    capturedBy: z.string().min(1).optional(),
    method: z.string().min(1).optional(),
    notes: z.string().optional(),
  })
  .strict();
export type ServiceModelSource = z.infer<typeof ServiceModelSourceSchema>;

export const ServiceUncertaintySchema = z
  .object({
    state: z.enum(["observed", "approximate", "unknown", "unresolved"]),
    sourceRef: z.string().min(1).optional(),
    path: z.string().optional(),
    notes: z.string().optional(),
  })
  .strict();
export type ServiceUncertainty = z.infer<typeof ServiceUncertaintySchema>;

export const ServiceEvidenceLinkSchema = z
  .object({
    evidenceID: z.string().min(1),
    sourceRef: z.string().min(1).optional(),
    notes: z.string().optional(),
  })
  .strict();
export type ServiceEvidenceLink = z.infer<typeof ServiceEvidenceLinkSchema>;

const ForbiddenServiceModelFields = new Set([
  "recommendedOption",
  "suitabilityScore",
  "rank",
  "winner",
  "price",
  "productRecommendation",
  "calculatedPerformance",
  "performanceCalculation",
]);

export const DomesticWaterServiceModelSchema = z
  .object({
    id: z.string().min(1),
    domain: z.literal("domesticHotWater").default("domesticHotWater"),
    state: z.enum(["scaffold", "partial", "unknown"]).default("unknown"),
    relatedWaterSupplyObservationIDs: z.array(z.string().min(1)).default([]),
    relatedServicePointObservationIDs: z.array(z.string().min(1)).default([]),
    relatedSystemAssetIDs: z.array(z.string().min(1)).default([]),
    relatedEvidenceIDs: z.array(z.string().min(1)).default([]),
    evidenceLinks: z.array(ServiceEvidenceLinkSchema).default([]),
    uncertainty: z.array(ServiceUncertaintySchema).default([]),
    provenance: z.array(ServiceModelSourceSchema).default([]),
    notes: z.array(z.string()).default([]),
  })
  .passthrough()
  .superRefine((value, ctx) => {
    rejectForbiddenServiceFields(value, ctx);
  });
export type DomesticWaterServiceModel = z.infer<typeof DomesticWaterServiceModelSchema>;

export const ServiceModelSchema = z.union([
  DomesticWaterServiceModelSchema,
  z
    .object({
      id: z.string().min(1),
      domain: ServiceDomainSchema.exclude(["domesticHotWater"]),
      state: z.enum(["scaffold", "partial", "unknown"]).default("unknown"),
      relatedEvidenceIDs: z.array(z.string().min(1)).default([]),
      evidenceLinks: z.array(ServiceEvidenceLinkSchema).default([]),
      uncertainty: z.array(ServiceUncertaintySchema).default([]),
      provenance: z.array(ServiceModelSourceSchema).default([]),
      notes: z.array(z.string()).default([]),
    })
    .passthrough()
    .superRefine((value, ctx) => {
      rejectForbiddenServiceFields(value, ctx);
    }),
]);
export type ServiceModel = z.infer<typeof ServiceModelSchema>;

export function validateDomesticWaterServiceModelReferences(
  model: DomesticWaterServiceModel,
  targets: {
    waterSupplyObservationIDs?: Iterable<string>;
    servicePointObservationIDs?: Iterable<string>;
    systemAssetIDs?: Iterable<string>;
    evidenceIDs?: Iterable<string>;
  }
): string[] {
  const issues: string[] = [];
  addMissingReferences(
    issues,
    "relatedWaterSupplyObservationIDs",
    model.relatedWaterSupplyObservationIDs,
    targets.waterSupplyObservationIDs
  );
  addMissingReferences(
    issues,
    "relatedServicePointObservationIDs",
    model.relatedServicePointObservationIDs,
    targets.servicePointObservationIDs
  );
  addMissingReferences(issues, "relatedSystemAssetIDs", model.relatedSystemAssetIDs, targets.systemAssetIDs);
  addMissingReferences(issues, "relatedEvidenceIDs", model.relatedEvidenceIDs, targets.evidenceIDs);
  return issues;
}

export const DomesticWaterServiceModelJsonSchema = zodToJsonSchema(DomesticWaterServiceModelSchema, {
  name: "DomesticWaterServiceModel",
});

export const ServiceModelJsonSchema = zodToJsonSchema(ServiceModelSchema, {
  name: "ServiceModel",
});

function rejectForbiddenServiceFields(value: unknown, ctx: z.RefinementCtx, path: (string | number)[] = []) {
  if (Array.isArray(value)) {
    value.forEach((entry, index) => rejectForbiddenServiceFields(entry, ctx, path.concat(index)));
    return;
  }

  if (!value || typeof value !== "object") {
    return;
  }

  for (const [key, nestedValue] of Object.entries(value)) {
    if (ForbiddenServiceModelFields.has(key)) {
      ctx.addIssue({
        code: z.ZodIssueCode.custom,
        message: `Service models must not include recommendation, scoring, ranking, selection, pricing, or product recommendation fields: ${key}`,
        path: path.concat(key),
      });
    }
    rejectForbiddenServiceFields(nestedValue, ctx, path.concat(key));
  }
}

function addMissingReferences(
  issues: string[],
  label: string,
  values: string[],
  targets: Iterable<string> | undefined
) {
  if (!targets) {
    return;
  }
  const targetSet = new Set(targets);
  values.forEach((value, index) => {
    if (!targetSet.has(value)) {
      issues.push(`${label}[${index}] does not resolve: ${value}`);
    }
  });
}
