import { z } from "zod";

export const OccupancyMetadataSchema = z.object({
  numberOfOccupants: z.number().int().nonnegative().optional(),
  occupancyPattern: z.string().optional(),
});

export type OccupancyMetadata = z.infer<typeof OccupancyMetadataSchema>;
