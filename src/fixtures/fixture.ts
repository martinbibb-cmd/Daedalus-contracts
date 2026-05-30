import { z } from "zod";
import { zodToJsonSchema } from "zod-to-json-schema";
import { PropertyContractSchema } from "../property";
import type { PropertyContract } from "../property";
import { FabricContractSchema } from "../fabric";
import type { FabricContract } from "../fabric";
import { SystemComponentsContractSchema } from "../systemComponents";
import type { SystemComponentsContract } from "../systemComponents";
import { HydraulicsContractSchema } from "../hydraulics";
import type { HydraulicsContract } from "../hydraulics";
import { AirflowContractSchema } from "../airflow";
import type { AirflowContract } from "../airflow";
import { WaterSupplyContractSchema } from "../waterSupply";
import type { WaterSupplyContract } from "../waterSupply";
import { ControlsContractSchema } from "../controls";
import type { ControlsContract } from "../controls";
import { OccupancyContractSchema } from "../occupancy";
import type { OccupancyContract } from "../occupancy";
import { ConstraintsContractSchema } from "../constraints";
import type { ConstraintsContract } from "../constraints";
import { RisksContractSchema } from "../risks";
import type { RisksContract } from "../risks";
import { ServiceabilityContractSchema } from "../serviceability";
import type { ServiceabilityContract } from "../serviceability";
import { ElectricalContractSchema } from "../electrical";
import type { ElectricalContract } from "../electrical";
import { EvidencePackSchema } from "../evidence";
import type { EvidencePack } from "../evidence";
import { TimelineContractSchema } from "../timeline";
import type { TimelineContract } from "../timeline";
import { RecommendationsContractSchema } from "../recommendations";
import type { RecommendationsContract } from "../recommendations";
import { OptionalMetadataSchema } from "../optionalMetadata";
import type { OptionalMetadata } from "../optionalMetadata";
import {
  validateHydraulicsClosedLoop,
  validateOptionalMetadataIsolation,
  validateRecommendationPlaceholders,
  validateV11CorePayload,
} from "./validators";

export interface SurveyFixtureV1_1 {
  fixtureId: string;
  fixtureName: string;
  description?: string;
  property: PropertyContract;
  fabric: FabricContract;
  systemComponents: SystemComponentsContract;
  hydraulics: HydraulicsContract;
  airflow: AirflowContract;
  waterSupply: WaterSupplyContract;
  controls: ControlsContract;
  occupancy: OccupancyContract;
  constraints: ConstraintsContract;
  risks: RisksContract;
  serviceability: ServiceabilityContract;
  electrical: ElectricalContract;
  evidence: EvidencePack;
  timeline: TimelineContract;
  recommendations: RecommendationsContract;
  optionalMetadata?: OptionalMetadata;
}
export type SurveyFixture = SurveyFixtureV1_1;

const SurveyFixtureShape: z.ZodRawShape = {
  fixtureId: z.string(),
  fixtureName: z.string(),
  description: z.string().optional(),
  property: PropertyContractSchema,
  fabric: FabricContractSchema,
  systemComponents: SystemComponentsContractSchema,
  hydraulics: HydraulicsContractSchema,
  airflow: AirflowContractSchema,
  waterSupply: WaterSupplyContractSchema,
  controls: ControlsContractSchema,
  occupancy: OccupancyContractSchema,
  constraints: ConstraintsContractSchema,
  risks: RisksContractSchema,
  serviceability: ServiceabilityContractSchema,
  electrical: ElectricalContractSchema,
  evidence: EvidencePackSchema,
  timeline: TimelineContractSchema,
  recommendations: RecommendationsContractSchema,
  optionalMetadata: OptionalMetadataSchema.optional(),
};

export const SurveyFixtureSchema = z.object(SurveyFixtureShape).strict();

export const SurveyFixtureJsonSchema = zodToJsonSchema(SurveyFixtureSchema, {
  name: "SurveyFixture",
});

export function loadFixture(fixture: SurveyFixtureV1_1): SurveyFixtureV1_1 {
  const loaded = SurveyFixtureSchema.parse(fixture) as SurveyFixtureV1_1;
  validateV11CorePayload(loaded);
  validateOptionalMetadataIsolation(loaded);
  validateHydraulicsClosedLoop(loaded);
  validateRecommendationPlaceholders(loaded);
  return loaded;
}
