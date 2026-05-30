import { z } from "zod";
import { zodToJsonSchema } from "zod-to-json-schema";
import { EquivalentPathSchema } from "../core/equivalentPath";
import { PathwayNodeSchema } from "./pathwayNode";
import { PathwayTransitionSchema } from "./pathwayTransition";

export const TimelineContractSchema = z.object({
  nodes: z.array(PathwayNodeSchema).min(1),
  transitions: z.array(PathwayTransitionSchema),
  equivalentPaths: z.array(EquivalentPathSchema),
  contractVersion: z.string().default("1.1.0"),
}).superRefine((timeline, ctx) => {
  const nodeIds = new Set(timeline.nodes.map((node) => node.id));
  timeline.transitions.forEach((transition, i) => {
    if (!nodeIds.has(transition.fromNodeId)) {
      ctx.addIssue({ code: z.ZodIssueCode.custom, path: ["transitions", i, "fromNodeId"], message: "Unknown fromNodeId" });
    }
    if (!nodeIds.has(transition.toNodeId)) {
      ctx.addIssue({ code: z.ZodIssueCode.custom, path: ["transitions", i, "toNodeId"], message: "Unknown toNodeId" });
    }
  });
});

export type TimelineContract = z.infer<typeof TimelineContractSchema>;

export const TimelineContractJsonSchema = zodToJsonSchema(TimelineContractSchema, {
  name: "TimelineContract",
});

export * from "./pathwayNode";
export * from "./pathwayTransition";
