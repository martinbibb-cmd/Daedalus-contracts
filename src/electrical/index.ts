import { z } from "zod";
import { zodToJsonSchema } from "zod-to-json-schema";
import { ElectricalServiceSchema } from "./electricalService";
import { MicroGeneratorSchema } from "./microGenerator";

export const ElectricalContractSchema = z.object({
  electricalService: ElectricalServiceSchema,
  microGenerators: z.array(MicroGeneratorSchema),
  contractVersion: z.string().default("1.1.0"),
});

export type ElectricalContract = z.infer<typeof ElectricalContractSchema>;

export const ElectricalContractJsonSchema = zodToJsonSchema(ElectricalContractSchema, {
  name: "ElectricalContract",
});

export * from "./electricalService";
export * from "./microGenerator";
