import { z } from "zod";
import { ServiceModelSchema } from "../serviceModel";

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

export const WaterSupplyMethodSchema = z.enum([
  "digitalPressureFlowLogger",
  "pressureFlowTestKit",
  "flowCup",
  "pressureGauge",
  "customerReported",
  "notTested",
  "other",
  "unknown",
]);

export const WaterSupplyLocationSchema = z.enum([
  "outsideTap",
  "kitchenColdTap",
  "internalStopTap",
  "washingMachineValve",
  "bathroomBasinTap",
  "bathTap",
  "showerOutlet",
  "cylinderCupboard",
  "cylinderColdInlet",
  "loftTankFeed",
  "waterMain",
  "other",
  "unknown",
]);

export const WaterSupplyIntentSchema = z.enum([
  "incomingMainCapacity",
  "usableHouseholdCapacity",
  "hotWaterPlantFeed",
  "servicePointExperience",
  "customerComplaintContext",
  "notTested",
  "unknown",
]);

export const WaterMeasurementValueNameSchema = z.enum([
  "staticPressure",
  "dynamicPressure",
  "residualPressure",
  "flowRate",
  "flowAtPressure",
  "waterTemperature",
  "tds",
  "qualitativeObservation",
]);

export const TriStateSchema = z.enum(["true", "false", "unknown"]);

export const SuspectedLimitationSchema = z.enum([
  "restrictedOutlet",
  "aerator",
  "monoblocTails",
  "isolationValvePartClosed",
  "seizedStopTap",
  "inaccessibleMain",
  "prvSuspected",
  "softenerOrFilter",
  "sharedSupplySuspected",
  "customerReportOnly",
  "noSuitableOutlet",
  "other",
]);

export const AbsenceReasonSchema = z.enum([
  "notSafe",
  "noAccess",
  "seizedValve",
  "noSuitableOutlet",
  "customerDeclined",
  "timeConstraint",
  "equipmentUnavailable",
  "other",
]);

export const ServicePointTypeSchema = z.enum([
  "kitchenTap",
  "bathTap",
  "basinTap",
  "showerMixer",
  "electricShower",
  "outsideTap",
  "washingMachineValve",
  "cylinderInlet",
  "other",
  "unknown",
]);

export const SupplyTypeSchema = z.enum([
  "mainsCold",
  "storedCold",
  "gravityHot",
  "mainsHot",
  "pumpedHot",
  "mixed",
  "unknown",
]);

export const IntendedPressureTypeSchema = z.enum([
  "mainsPressure",
  "gravityLowPressure",
  "pumped",
  "universal",
  "unknown",
]);

export const ObservedIssueSchema = z.enum([
  "poorFlow",
  "temperatureFluctuation",
  "slowBathFill",
  "noisyOperation",
  "outletRestrictionSuspected",
  "mismatchSuspected",
  "scaledOrRestricted",
  "noIssueObserved",
  "unknown",
]);

export const WaterMeasurementValueSchema = z
  .object({
    name: WaterMeasurementValueNameSchema,
    value: z.union([z.number(), z.string()]),
    unit: z.string().optional(),
    condition: z.string().optional(),
    confidence: ConfidenceStateSchema.optional(),
  })
  .superRefine((value, ctx) => {
    if (typeof value.value === "number" && !value.unit) {
      ctx.addIssue({
        code: z.ZodIssueCode.custom,
        message: "Numeric water measurement values must include unit.",
        path: ["unit"],
      });
    }
  });

export const WaterBoundaryConditionsSchema = z.object({
  mainsStopTapFullyOpen: TriStateSchema,
  visiblePrvFitted: TriStateSchema,
  softenerOrFilterPresent: TriStateSchema,
  otherOutletsOpenDuringTest: TriStateSchema,
  restrictorOrAeratorSuspected: TriStateSchema,
  timeOfDay: z.string().optional(),
  notes: z.string().optional(),
});

export const WaterSupplyObservationSchema = z
  .object({
    id: z.string().min(1),
    observedAt: z.string().datetime(),
    observedBy: z.string().min(1),
    method: WaterSupplyMethodSchema,
    location: WaterSupplyLocationSchema,
    intent: WaterSupplyIntentSchema,
    instrument: z.string().optional(),
    values: z.array(WaterMeasurementValueSchema).default([]),
    boundaryConditions: WaterBoundaryConditionsSchema,
    suspectedLimitations: z.array(SuspectedLimitationSchema).default([]),
    absenceReason: AbsenceReasonSchema.optional(),
    confidence: ConfidenceStateSchema,
    evidenceIDs: z.array(z.string().min(1)).default([]),
    provenance: DaedalusPackageProvenanceSchema,
    notes: z.string().optional(),
  })
  .superRefine((value, ctx) => {
    if (value.method === "notTested" && !value.absenceReason && !value.notes) {
      ctx.addIssue({
        code: z.ZodIssueCode.custom,
        message: "notTested water observations require absenceReason or notes.",
        path: ["absenceReason"],
      });
    }

    if (
      value.method === "customerReported" &&
      !value.notes &&
      !value.values.some((measurement) => measurement.name === "qualitativeObservation")
    ) {
      ctx.addIssue({
        code: z.ZodIssueCode.custom,
        message: "customerReported water observations require qualitativeObservation or notes.",
        path: ["values"],
      });
    }
  });

export const ServicePointObservationSchema = z.object({
  id: z.string().min(1),
  areaID: z.string().min(1),
  servicePointType: ServicePointTypeSchema,
  supplyType: SupplyTypeSchema,
  intendedPressureType: IntendedPressureTypeSchema,
  servedByAssetIDs: z.array(z.string().min(1)).default([]),
  observedIssues: z.array(ObservedIssueSchema).default([]),
  evidenceIDs: z.array(z.string().min(1)).default([]),
  confidence: ConfidenceStateSchema,
  provenance: DaedalusPackageProvenanceSchema,
  notes: z.string().optional(),
});

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
    waterSupplyObservations: z.array(WaterSupplyObservationSchema).default([]),
    servicePointObservations: z.array(ServicePointObservationSchema).default([]),
    serviceModels: z.array(ServiceModelSchema).default([]),
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

    const evidenceObservationIds = new Set(
      value.observations
        .filter((observation) => observation.tag.toLowerCase().includes("evidence"))
        .map((observation) => observation.observation_id)
    );
    const areaObservationIds = new Set(
      value.observations
        .filter((observation) => observation.tag.toLowerCase() === "area")
        .map((observation) => observation.observation_id)
    );
    const waterObservationIds = new Set<string>();

    value.waterSupplyObservations?.forEach((observation, observationIndex) => {
      if (waterObservationIds.has(observation.id)) {
        ctx.addIssue({
          code: z.ZodIssueCode.custom,
          message: `Duplicate water supply observation id: ${observation.id}`,
          path: ["waterSupplyObservations", observationIndex, "id"],
        });
      }
      waterObservationIds.add(observation.id);

      observation.evidenceIDs.forEach((evidenceID, evidenceIndex) => {
        if (!evidenceObservationIds.has(evidenceID)) {
          ctx.addIssue({
            code: z.ZodIssueCode.custom,
            message: `Missing water supply evidence reference: ${evidenceID}`,
            path: ["waterSupplyObservations", observationIndex, "evidenceIDs", evidenceIndex],
          });
        }
      });
    });

    const servicePointObservationIds = new Set<string>();
    value.servicePointObservations?.forEach((observation, observationIndex) => {
      if (servicePointObservationIds.has(observation.id)) {
        ctx.addIssue({
          code: z.ZodIssueCode.custom,
          message: `Duplicate service point observation id: ${observation.id}`,
          path: ["servicePointObservations", observationIndex, "id"],
        });
      }
      servicePointObservationIds.add(observation.id);

      if (!areaObservationIds.has(observation.areaID)) {
        ctx.addIssue({
          code: z.ZodIssueCode.custom,
          message: `Missing service point area reference: ${observation.areaID}`,
          path: ["servicePointObservations", observationIndex, "areaID"],
        });
      }

      observation.servedByAssetIDs.forEach((assetID, assetIndex) => {
        if (!observationIds.has(assetID)) {
          ctx.addIssue({
            code: z.ZodIssueCode.custom,
            message: `Missing service point served asset reference: ${assetID}`,
            path: ["servicePointObservations", observationIndex, "servedByAssetIDs", assetIndex],
          });
        }
      });

      observation.evidenceIDs.forEach((evidenceID, evidenceIndex) => {
        if (!evidenceObservationIds.has(evidenceID)) {
          ctx.addIssue({
            code: z.ZodIssueCode.custom,
            message: `Missing service point evidence reference: ${evidenceID}`,
            path: ["servicePointObservations", observationIndex, "evidenceIDs", evidenceIndex],
          });
        }
      });
    });

    const systemAssetIds = new Set(
      value.observations
        .filter((observation) => {
          const tag = observation.tag.toLowerCase();
          return ["boiler", "cylinder", "thermal store", "water main", "stop tap"].includes(tag);
        })
        .map((observation) => observation.observation_id)
    );

    value.serviceModels?.forEach((model, modelIndex) => {
      if (model.domain !== "domesticHotWater") {
        return;
      }

      model.relatedWaterSupplyObservationIDs.forEach((observationID, referenceIndex) => {
        if (!waterObservationIds.has(observationID)) {
          ctx.addIssue({
            code: z.ZodIssueCode.custom,
            message: `Missing service model water supply observation reference: ${observationID}`,
            path: ["serviceModels", modelIndex, "relatedWaterSupplyObservationIDs", referenceIndex],
          });
        }
      });

      model.relatedServicePointObservationIDs.forEach((observationID, referenceIndex) => {
        if (!servicePointObservationIds.has(observationID)) {
          ctx.addIssue({
            code: z.ZodIssueCode.custom,
            message: `Missing service model service point observation reference: ${observationID}`,
            path: ["serviceModels", modelIndex, "relatedServicePointObservationIDs", referenceIndex],
          });
        }
      });

      model.relatedSystemAssetIDs.forEach((assetID, referenceIndex) => {
        if (!systemAssetIds.has(assetID)) {
          ctx.addIssue({
            code: z.ZodIssueCode.custom,
            message: `Missing service model system asset reference: ${assetID}`,
            path: ["serviceModels", modelIndex, "relatedSystemAssetIDs", referenceIndex],
          });
        }
      });

      model.relatedEvidenceIDs.forEach((evidenceID, referenceIndex) => {
        if (!evidenceObservationIds.has(evidenceID)) {
          ctx.addIssue({
            code: z.ZodIssueCode.custom,
            message: `Missing service model evidence reference: ${evidenceID}`,
            path: ["serviceModels", modelIndex, "relatedEvidenceIDs", referenceIndex],
          });
        }
      });
    });
  });

export type DaedalusPackageV3 = z.infer<typeof DaedalusPackageV3Schema>;
