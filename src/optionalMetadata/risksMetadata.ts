import { z } from "zod";

export const RisksMetadataSchema = z.object({
  items: z.array(z.string()).default([]),
});

export type RisksMetadata = z.infer<typeof RisksMetadataSchema>;
