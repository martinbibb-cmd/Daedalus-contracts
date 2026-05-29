import { z } from "zod";
import { zodToJsonSchema } from "zod-to-json-schema";

// ---------------------------------------------------------------------------
// Evidence types
// ---------------------------------------------------------------------------

export const EvidenceTypeSchema = z.enum([
  "Photograph",
  "Document",
  "Certificate",
  "Report",
  "Invoice",
  "Measurement",
  "Observation",
  "Annotation",
  "Other",
]);
export type EvidenceType = z.infer<typeof EvidenceTypeSchema>;

export const EvidenceItemSchema = z.object({
  id: z.string().uuid(),
  type: EvidenceTypeSchema,
  label: z.string(),
  description: z.string().optional(),
  capturedAt: z.string().datetime().optional(),
  capturedBy: z.string().optional(),
  uri: z.string().url().optional(),
  tags: z.array(z.string()).optional(),
});
export type EvidenceItem = z.infer<typeof EvidenceItemSchema>;

export const EvidencePackSchema = z.object({
  surveyId: z.string().uuid(),
  items: z.array(EvidenceItemSchema),
});
export type EvidencePack = z.infer<typeof EvidencePackSchema>;

export const EvidenceItemJsonSchema = zodToJsonSchema(EvidenceItemSchema, {
  name: "EvidenceItem",
});
export const EvidencePackJsonSchema = zodToJsonSchema(EvidencePackSchema, {
  name: "EvidencePack",
});
