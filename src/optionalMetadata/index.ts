import { z } from "zod";
import { AirflowMetadataSchema } from "./airflowMetadata";
import { OccupancyMetadataSchema } from "./occupancyMetadata";
import { ConstraintsMetadataSchema } from "./constraintsMetadata";
import { RisksMetadataSchema } from "./risksMetadata";
import { EvidenceMetadataSchema } from "./evidenceMetadata";

export const OptionalMetadataSchema = z.object({
  address: z.object({
    line1: z.string(),
    line2: z.string().optional(),
    town: z.string(),
    postcode: z.string(),
    country: z.string().optional(),
  }).optional(),
  epcRating: z.string().optional(),
  tenure: z.string().optional(),
  airflow: AirflowMetadataSchema.optional(),
  occupancy: OccupancyMetadataSchema.optional(),
  constraints: ConstraintsMetadataSchema.optional(),
  risks: RisksMetadataSchema.optional(),
  evidence: EvidenceMetadataSchema.optional(),
});

export type OptionalMetadata = z.infer<typeof OptionalMetadataSchema>;

export * from "./airflowMetadata";
export * from "./occupancyMetadata";
export * from "./constraintsMetadata";
export * from "./risksMetadata";
export * from "./evidenceMetadata";
