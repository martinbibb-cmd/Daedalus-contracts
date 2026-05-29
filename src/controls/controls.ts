import { z } from "zod";
import { zodToJsonSchema } from "zod-to-json-schema";
import { valueSchema } from "../core/provenance";

// ---------------------------------------------------------------------------
// Thermostat
// ---------------------------------------------------------------------------

export const ThermostatTypeSchema = z.enum([
  "ManualRoomThermostat",
  "ProgrammableRoomThermostat",
  "SmartThermostat",
  "WeatherCompensation",
  "LoadCompensation",
  "None",
  "Unknown",
]);
export type ThermostatType = z.infer<typeof ThermostatTypeSchema>;

export const ThermostatSchema = z.object({
  id: z.string().uuid(),
  type: valueSchema(ThermostatTypeSchema),
  setpointDegC: valueSchema(z.number()).optional(),
  zoned: valueSchema(z.boolean()).optional(),
  manufacturer: valueSchema(z.string()).optional(),
  model: valueSchema(z.string()).optional(),
});
export type Thermostat = z.infer<typeof ThermostatSchema>;

// ---------------------------------------------------------------------------
// Programmer / timer
// ---------------------------------------------------------------------------

export const ProgrammerTypeSchema = z.enum([
  "Mechanical",
  "Electronic",
  "SmartSchedule",
  "IntegratedWithStat",
  "None",
  "Unknown",
]);
export type ProgrammerType = z.infer<typeof ProgrammerTypeSchema>;

export const ProgrammerSchema = z.object({
  id: z.string().uuid(),
  type: valueSchema(ProgrammerTypeSchema),
  heatingAndHWIndependent: valueSchema(z.boolean()).optional(),
});
export type Programmer = z.infer<typeof ProgrammerSchema>;

// ---------------------------------------------------------------------------
// Controls contract
// ---------------------------------------------------------------------------

export const ControlsContractSchema = z.object({
  thermostat: ThermostatSchema,
  programmer: ProgrammerSchema,
  trvCoverage: valueSchema(z.enum(["AllRooms", "MostRooms", "SomeRooms", "None", "Unknown"])),
  cylinderThermostat: valueSchema(z.boolean()).optional(),
  boilerInterlock: valueSchema(z.boolean()).optional(),
  contractVersion: z.string().default("1.1.0"),
});
export type ControlsContract = z.infer<typeof ControlsContractSchema>;

export const ControlsContractJsonSchema = zodToJsonSchema(
  ControlsContractSchema,
  { name: "ControlsContract" }
);
