import { z } from "zod";
import { valueSchema } from "../core/provenance";

export const PipeSegmentSchema = z.object({
  id: z.string().uuid(),
  fromPortId: z.string().uuid(),
  toPortId: z.string().uuid(),
  diameterMm: valueSchema(z.number().positive()).optional(),
  lengthM: valueSchema(z.number().positive()).optional(),
  material: valueSchema(z.string()).optional(),
});

export type PipeSegment = z.infer<typeof PipeSegmentSchema>;
