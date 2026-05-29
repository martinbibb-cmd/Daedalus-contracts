import { z } from "zod";
import { zodToJsonSchema } from "zod-to-json-schema";
import { valueSchema } from "../core/provenance";

// ---------------------------------------------------------------------------
// Timeline event
// ---------------------------------------------------------------------------

export const TimelineEventTypeSchema = z.enum([
  "Installation",
  "Replacement",
  "Service",
  "Repair",
  "Inspection",
  "Survey",
  "EPCAssessment",
  "Other",
]);
export type TimelineEventType = z.infer<typeof TimelineEventTypeSchema>;

export const TimelineEventSchema = z.object({
  id: z.string().uuid(),
  eventType: TimelineEventTypeSchema,
  component: z.string().optional(),
  date: valueSchema(z.string().date()),
  contractor: valueSchema(z.string()).optional(),
  description: z.string().optional(),
  evidenceIds: z.array(z.string()).optional(),
});
export type TimelineEvent = z.infer<typeof TimelineEventSchema>;

// ---------------------------------------------------------------------------
// Timeline contract
// ---------------------------------------------------------------------------

export const TimelineContractSchema = z.object({
  events: z.array(TimelineEventSchema),
  contractVersion: z.string().default("1.1.0"),
});
export type TimelineContract = z.infer<typeof TimelineContractSchema>;

export const TimelineContractJsonSchema = zodToJsonSchema(
  TimelineContractSchema,
  { name: "TimelineContract" }
);
