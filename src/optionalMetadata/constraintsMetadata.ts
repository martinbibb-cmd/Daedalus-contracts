import { z } from "zod";

export const ConstraintsMetadataSchema = z.object({
  items: z.array(z.string()).default([]),
});

export type ConstraintsMetadata = z.infer<typeof ConstraintsMetadataSchema>;
