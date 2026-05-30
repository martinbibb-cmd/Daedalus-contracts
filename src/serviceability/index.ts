import { z } from "zod";
import { zodToJsonSchema } from "zod-to-json-schema";
import { ServiceHatchSchema } from "./serviceHatch";
import { AccessPathwaySchema } from "./accessPathway";
import { ClearanceEnvelopeSchema } from "./clearanceEnvelope";

export const ServiceabilityContractSchema = z.object({
  serviceHatches: z.array(ServiceHatchSchema),
  accessPathways: z.array(AccessPathwaySchema),
  clearanceEnvelopes: z.array(ClearanceEnvelopeSchema),
  contractVersion: z.string().default("1.1.0"),
});

export type ServiceabilityContract = z.infer<typeof ServiceabilityContractSchema>;

export const ServiceabilityContractJsonSchema = zodToJsonSchema(ServiceabilityContractSchema, {
  name: "ServiceabilityContract",
});

export * from "./serviceHatch";
export * from "./accessPathway";
export * from "./clearanceEnvelope";
