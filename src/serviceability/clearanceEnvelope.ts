import { z } from "zod";
import { valueSchema } from "../core/provenance";

export const ClearanceEnvelopeSchema = z.object({
  id: z.string().uuid(),
  componentId: z.string().uuid(),
  frontalClearanceMm: valueSchema(z.number().nonnegative()),
  sideClearanceMm: valueSchema(z.number().nonnegative()).optional(),
  topClearanceMm: valueSchema(z.number().nonnegative()).optional(),
});

export type ClearanceEnvelope = z.infer<typeof ClearanceEnvelopeSchema>;
