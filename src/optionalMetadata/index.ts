import { z } from "zod";

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
}).catchall(z.unknown());

export type OptionalMetadata = z.infer<typeof OptionalMetadataSchema>;
