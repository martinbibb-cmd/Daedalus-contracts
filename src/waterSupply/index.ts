import { z } from "zod";
import { zodToJsonSchema } from "zod-to-json-schema";
import { WaterSupplyProfileSchema } from "./waterSupplyProfile";
import { MainsRemedyDeviceSchema } from "./mainsRemedyDevice";

export const WaterSupplyContractSchema = z.object({
  profile: WaterSupplyProfileSchema,
  mainsRemedyDevices: z.array(MainsRemedyDeviceSchema),
  contractVersion: z.string().default("1.1.0"),
});

export type WaterSupplyContract = z.infer<typeof WaterSupplyContractSchema>;

export const WaterSupplyContractJsonSchema = zodToJsonSchema(WaterSupplyContractSchema, {
  name: "WaterSupplyContract",
});

export * from "./waterSupplyProfile";
export * from "./mainsRemedyDevice";
