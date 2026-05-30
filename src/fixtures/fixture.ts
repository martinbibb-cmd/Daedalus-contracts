import { z } from "zod";
import { zodToJsonSchema } from "zod-to-json-schema";
import { PropertyContractSchema } from "../property";
import { FabricContractSchema } from "../fabric";
import { SystemComponentsContractSchema } from "../systemComponents";
import { HydraulicsContractSchema } from "../hydraulics";
import { WaterSupplyContractSchema } from "../waterSupply";
import { ControlsContractSchema } from "../controls";
import { ServiceabilityContractSchema } from "../serviceability";
import { ElectricalContractSchema } from "../electrical";
import { TimelineContractSchema } from "../timeline";
import { RecommendationsContractSchema } from "../recommendations";
import { OptionalMetadataSchema } from "../optionalMetadata";
import {
  validateHydraulicsClosedLoop,
  validateOptionalMetadataIsolation,
  validateRecommendationPlaceholders,
  validateV11CorePayload,
} from "./validators";

export const SurveyFixtureSchema = z.object({
  fixtureId: z.string(),
  fixtureName: z.string(),
  description: z.string().optional(),
  property: PropertyContractSchema,
  fabric: FabricContractSchema,
  systemComponents: SystemComponentsContractSchema,
  hydraulics: HydraulicsContractSchema,
  waterSupply: WaterSupplyContractSchema,
  controls: ControlsContractSchema,
  serviceability: ServiceabilityContractSchema,
  electrical: ElectricalContractSchema,
  timeline: TimelineContractSchema,
  recommendations: RecommendationsContractSchema,
  optionalMetadata: OptionalMetadataSchema.optional(),
});

export type SurveyFixtureV1_1 = z.infer<typeof SurveyFixtureSchema>;
export type SurveyFixture = SurveyFixtureV1_1;

export const SurveyFixtureJsonSchema = zodToJsonSchema(SurveyFixtureSchema, {
  name: "SurveyFixture",
});

export function loadFixture(fixture: SurveyFixtureV1_1): SurveyFixtureV1_1 {
  const loaded = SurveyFixtureSchema.parse(fixture);
  validateV11CorePayload(loaded);
  validateOptionalMetadataIsolation(loaded);
  validateHydraulicsClosedLoop(loaded);
  validateRecommendationPlaceholders(loaded);
  return loaded;
}
