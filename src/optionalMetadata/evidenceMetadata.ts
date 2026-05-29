import { z } from "zod";

export const EvidenceMetadataSchema = z.object({
  evidenceIds: z.array(z.string()).default([]),
});

export type EvidenceMetadata = z.infer<typeof EvidenceMetadataSchema>;
