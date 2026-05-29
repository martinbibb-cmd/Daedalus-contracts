import { z } from "zod";
import { valueSchema } from "../core/provenance";

export const IncomingMaterialSchema = z.enum(["Copper", "PE", "Lead", "Mixed", "Unknown"]);

export const WaterSupplyProfileSchema = z.object({
  id: z.string().uuid(),
  staticPressureBar: valueSchema(z.number().nonnegative()),
  dynamicPressureBar: valueSchema(z.number().nonnegative()),
  peakFlowLPerMin: valueSchema(z.number().positive()),
  sharedMain: valueSchema(z.boolean()),
  incomingMaterial: valueSchema(IncomingMaterialSchema),
  incomingDiameterMm: valueSchema(z.number().positive()),
  prvPresent: valueSchema(z.boolean()),
});

export type WaterSupplyProfile = z.infer<typeof WaterSupplyProfileSchema>;
