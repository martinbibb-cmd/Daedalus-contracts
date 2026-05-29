import { z } from "zod";
import { zodToJsonSchema } from "zod-to-json-schema";
import { valueSchema } from "../core/provenance";
import { StructureSchema } from "./structure";

export const SiteSchema = z.object({
  id: z.string().uuid(),
  name: z.string(),
  climateZone: valueSchema(z.string()).optional(),
  structures: z.array(StructureSchema).min(1),
});

export const PropertyContractSchema = z.object({
  site: SiteSchema,
  contractVersion: z.string().default("1.1.0"),
});

export type Site = z.infer<typeof SiteSchema>;
export type PropertyContract = z.infer<typeof PropertyContractSchema>;

export const PropertyContractJsonSchema = zodToJsonSchema(PropertyContractSchema, {
  name: "PropertyContract",
});
