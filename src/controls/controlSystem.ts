import { z } from "zod";
import { zodToJsonSchema } from "zod-to-json-schema";
import { ControlDeviceSchema } from "./controlDevice";
import { ControlZoneSchema } from "./controlZone";

export const ControlSystemSchema = z.object({
  id: z.string().uuid(),
  name: z.string(),
  devices: z.array(ControlDeviceSchema),
  zones: z.array(ControlZoneSchema),
});

export const ControlsContractSchema = z.object({
  systems: z.array(ControlSystemSchema).min(1),
  contractVersion: z.string().default("1.1.0"),
});

export type ControlSystem = z.infer<typeof ControlSystemSchema>;
export type ControlsContract = z.infer<typeof ControlsContractSchema>;

export const ControlsContractJsonSchema = zodToJsonSchema(ControlsContractSchema, {
  name: "ControlsContract",
});
