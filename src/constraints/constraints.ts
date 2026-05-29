import { z } from "zod";
import { zodToJsonSchema } from "zod-to-json-schema";
import { valueSchema } from "../core/provenance";

// ---------------------------------------------------------------------------
// Site constraints
// ---------------------------------------------------------------------------

export const ConstraintTypeSchema = z.enum([
  "ListedBuilding",
  "ConservationArea",
  "SharedAccess",
  "NoExternalPlanning",
  "AsbestosPresence",
  "StructuralConcern",
  "FloodRisk",
  "OverheadObstruction",
  "NarrowAccess",
  "Other",
]);
export type ConstraintType = z.infer<typeof ConstraintTypeSchema>;

export const ConstraintSchema = z.object({
  id: z.string().uuid(),
  type: ConstraintTypeSchema,
  description: valueSchema(z.string()),
  severity: valueSchema(z.enum(["Blocking", "Major", "Minor", "Advisory"])),
  mitigationNotes: z.string().optional(),
});
export type Constraint = z.infer<typeof ConstraintSchema>;

// ---------------------------------------------------------------------------
// Constraints contract
// ---------------------------------------------------------------------------

export const ConstraintsContractSchema = z.object({
  constraints: z.array(ConstraintSchema),
  contractVersion: z.string().default("1.1.0"),
});
export type ConstraintsContract = z.infer<typeof ConstraintsContractSchema>;

export const ConstraintsContractJsonSchema = zodToJsonSchema(
  ConstraintsContractSchema,
  { name: "ConstraintsContract" }
);
