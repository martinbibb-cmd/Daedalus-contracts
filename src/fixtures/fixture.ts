import { z } from "zod";
import { PropertyContractSchema } from "../property";
import { FabricContractSchema } from "../fabric";
import { HydraulicsContractSchema } from "../hydraulics";
import { AirflowContractSchema } from "../airflow";
import { WaterSupplyContractSchema } from "../waterSupply";
import { ControlsContractSchema } from "../controls";
import { SystemComponentsContractSchema } from "../systemComponents";
import { OccupancyContractSchema } from "../occupancy";
import { ConstraintsContractSchema } from "../constraints";
import { RisksContractSchema } from "../risks";
import { ServiceabilityContractSchema } from "../serviceability";
import { ElectricalContractSchema } from "../electrical";
import { EvidencePackSchema } from "../evidence";
import { TimelineContractSchema } from "../timeline";
import { RecommendationsContractSchema } from "../recommendations";
import { zodToJsonSchema } from "zod-to-json-schema";

// ---------------------------------------------------------------------------
// Top-level Survey fixture – the canonical unit of truth
// ---------------------------------------------------------------------------

export const SurveyFixtureSchema = z.object({
  fixtureId: z.string(),
  fixtureName: z.string(),
  description: z.string().optional(),
  property: PropertyContractSchema,
  fabric: FabricContractSchema,
  hydraulics: HydraulicsContractSchema,
  airflow: AirflowContractSchema,
  waterSupply: WaterSupplyContractSchema,
  controls: ControlsContractSchema,
  systemComponents: SystemComponentsContractSchema,
  occupancy: OccupancyContractSchema,
  constraints: ConstraintsContractSchema,
  risks: RisksContractSchema,
  serviceability: ServiceabilityContractSchema,
  electrical: ElectricalContractSchema,
  evidencePack: EvidencePackSchema,
  timeline: TimelineContractSchema,
  recommendations: RecommendationsContractSchema,
});

export type SurveyFixture = z.infer<typeof SurveyFixtureSchema>;

export const SurveyFixtureJsonSchema = zodToJsonSchema(SurveyFixtureSchema, {
  name: "SurveyFixture",
});

export function loadFixture(fixture: SurveyFixture): SurveyFixture {
  return SurveyFixtureSchema.parse(fixture);
}
