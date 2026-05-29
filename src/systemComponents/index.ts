import { z } from "zod";
import { zodToJsonSchema } from "zod-to-json-schema";
import { HeatGeneratorSchema } from "./heatGenerator";
import { HotWaterVesselSchema } from "./hotWaterVessel";
import { EmitterSchema } from "./emitter";
import { ComponentPortSchema } from "./componentPort";

export const SystemComponentsContractSchema = z.object({
  heatGenerators: z.array(HeatGeneratorSchema).min(1),
  hotWaterVessels: z.array(HotWaterVesselSchema),
  emitters: z.array(EmitterSchema),
  componentPorts: z.array(ComponentPortSchema).min(1),
  contractVersion: z.string().default("1.1.0"),
});

export type SystemComponentsContract = z.infer<typeof SystemComponentsContractSchema>;

export const SystemComponentsContractJsonSchema = zodToJsonSchema(
  SystemComponentsContractSchema,
  { name: "SystemComponentsContract" }
);

export * from "./componentPort";
export * from "./heatGenerator";
export * from "./hotWaterVessel";
export * from "./emitter";
