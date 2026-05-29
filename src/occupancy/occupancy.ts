import { z } from "zod";
import { zodToJsonSchema } from "zod-to-json-schema";
import { valueSchema } from "../core/provenance";

// ---------------------------------------------------------------------------
// Occupancy contract
// ---------------------------------------------------------------------------

export const OccupancyPatternSchema = z.enum([
  "FullTimeOccupied",
  "PartTimeOccupied",
  "Intermittent",
  "Vacant",
  "Unknown",
]);
export type OccupancyPattern = z.infer<typeof OccupancyPatternSchema>;

export const OccupancyContractSchema = z.object({
  numberOfOccupants: valueSchema(z.number().int().nonnegative()).optional(),
  occupancyPattern: valueSchema(OccupancyPatternSchema),
  vulnerableOccupants: valueSchema(z.boolean()).optional(),
  petsPresentDescription: valueSchema(z.string()).optional(),
  accessNotes: z.string().optional(),
  contractVersion: z.string().default("1.1.0"),
});
export type OccupancyContract = z.infer<typeof OccupancyContractSchema>;

export const OccupancyContractJsonSchema = zodToJsonSchema(
  OccupancyContractSchema,
  { name: "OccupancyContract" }
);
