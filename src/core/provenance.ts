import { z } from "zod";

// ---------------------------------------------------------------------------
// Provenance levels – exactly as specified in Atlas Contracts V1.1
// ---------------------------------------------------------------------------

export const ProvenanceLevelSchema = z.enum([
  "Confirmed",
  "Measured",
  "PhotoEvidenced",
  "SurveyorAsserted",
  "Inferred",
  "Assumed",
  "NeedsReview",
  "Unknown",
]);

export type ProvenanceLevel = z.infer<typeof ProvenanceLevelSchema>;

// ---------------------------------------------------------------------------
// Provenance wrapper
// ---------------------------------------------------------------------------

export const ProvenanceSchema = z.object({
  level: ProvenanceLevelSchema,
  evidenceIds: z.array(z.string()).optional(),
  notes: z.string().optional(),
  capturedAt: z.string().datetime().optional(),
  capturedBy: z.string().optional(),
});

export type Provenance = z.infer<typeof ProvenanceSchema>;

// ---------------------------------------------------------------------------
// Value<T> – every field can optionally carry provenance
// ---------------------------------------------------------------------------

export function valueSchema<T extends z.ZodTypeAny>(innerSchema: T) {
  return z.object({
    value: innerSchema,
    provenance: ProvenanceSchema.optional(),
  });
}

export type Value<T> = {
  value: T;
  provenance?: Provenance;
};

/** Convenience: create a Value<T> literal without provenance */
export function val<T>(v: T): Value<T> {
  return { value: v };
}

/** Convenience: create a Value<T> literal with provenance */
export function measuredVal<T>(
  v: T,
  level: ProvenanceLevel,
  evidenceIds?: string[]
): Value<T> {
  return { value: v, provenance: { level, evidenceIds } };
}
