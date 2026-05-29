import { z } from "zod";
import { zodToJsonSchema } from "zod-to-json-schema";
import { ComponentPortSchema } from "./componentPort";
import { PipeSegmentSchema } from "./pipeSegment";
import { HydraulicLoopSchema } from "./hydraulicLoop";

export const HydraulicNetworkSchema = z.object({
  id: z.string().uuid(),
  ports: z.array(ComponentPortSchema).min(1),
  pipeSegments: z.array(PipeSegmentSchema).min(1),
  loops: z.array(HydraulicLoopSchema).min(1),
}).superRefine((network, ctx) => {
  const portIds = new Set(network.ports.map((p) => p.id));

  network.pipeSegments.forEach((segment, i) => {
    if (!portIds.has(segment.fromPortId)) {
      ctx.addIssue({ code: z.ZodIssueCode.custom, path: ["pipeSegments", i, "fromPortId"], message: "Unknown fromPortId" });
    }
    if (!portIds.has(segment.toPortId)) {
      ctx.addIssue({ code: z.ZodIssueCode.custom, path: ["pipeSegments", i, "toPortId"], message: "Unknown toPortId" });
    }
  });

  network.loops.forEach((loop, i) => {
    loop.portSequence.forEach((portId, j) => {
      if (!portIds.has(portId)) {
        ctx.addIssue({ code: z.ZodIssueCode.custom, path: ["loops", i, "portSequence", j], message: "Loop references unknown portId" });
      }
    });
  });
});

export const HydraulicsContractSchema = z.object({
  network: HydraulicNetworkSchema,
  contractVersion: z.string().default("1.1.0"),
});

export type HydraulicNetwork = z.infer<typeof HydraulicNetworkSchema>;
export type HydraulicsContract = z.infer<typeof HydraulicsContractSchema>;

export const HydraulicsContractJsonSchema = zodToJsonSchema(HydraulicsContractSchema, {
  name: "HydraulicsContract",
});
