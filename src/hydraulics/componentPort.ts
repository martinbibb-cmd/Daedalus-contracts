import { z } from "zod";

export const ComponentPortSchema = z.object({
  id: z.string().uuid(),
  componentId: z.string().uuid(),
  role: z.enum(["Flow", "Return", "Supply", "Outlet", "Inlet", "Other"]),
  medium: z.enum(["Water", "GlycolMix", "Unknown"]),
});

export type ComponentPort = z.infer<typeof ComponentPortSchema>;
