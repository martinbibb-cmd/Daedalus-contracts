import { z } from "zod";

export const AirflowMetadataSchema = z.object({
  notes: z.string().optional(),
  ventilationStrategy: z.string().optional(),
});

export type AirflowMetadata = z.infer<typeof AirflowMetadataSchema>;
