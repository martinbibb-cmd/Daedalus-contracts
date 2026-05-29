import { z } from "zod";
import { valueSchema } from "../core/provenance";

export const ControlDeviceSchema = z.object({
  id: z.string().uuid(),
  type: z.enum(["Thermostat", "Programmer", "Sensor", "Actuator", "Gateway", "Other"]),
  targetComponentId: z.string().uuid().optional(),
  targetZoneId: z.string().uuid().optional(),
  enabled: valueSchema(z.boolean()).optional(),
});

export type ControlDevice = z.infer<typeof ControlDeviceSchema>;
