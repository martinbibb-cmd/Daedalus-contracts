import * as fs from "fs";
import * as path from "path";
import {
  PropertyContractJsonSchema,
  FabricContractJsonSchema,
  HydraulicsContractJsonSchema,
  AirflowContractJsonSchema,
  WaterSupplyContractJsonSchema,
  ControlsContractJsonSchema,
  SystemComponentsContractJsonSchema,
  OccupancyContractJsonSchema,
  ConstraintsContractJsonSchema,
  RisksContractJsonSchema,
  ServiceabilityContractJsonSchema,
  ElectricalContractJsonSchema,
  EvidenceItemJsonSchema,
  EvidencePackJsonSchema,
  TimelineContractJsonSchema,
  SurveyFixtureJsonSchema,
} from "../src/index";

const outputDir = path.join(__dirname, "..", "schemas");
fs.mkdirSync(outputDir, { recursive: true });

const schemas: Record<string, object> = {
  PropertyContract: PropertyContractJsonSchema,
  FabricContract: FabricContractJsonSchema,
  HydraulicsContract: HydraulicsContractJsonSchema,
  AirflowContract: AirflowContractJsonSchema,
  WaterSupplyContract: WaterSupplyContractJsonSchema,
  ControlsContract: ControlsContractJsonSchema,
  SystemComponentsContract: SystemComponentsContractJsonSchema,
  OccupancyContract: OccupancyContractJsonSchema,
  ConstraintsContract: ConstraintsContractJsonSchema,
  RisksContract: RisksContractJsonSchema,
  ServiceabilityContract: ServiceabilityContractJsonSchema,
  ElectricalContract: ElectricalContractJsonSchema,
  EvidenceItem: EvidenceItemJsonSchema,
  EvidencePack: EvidencePackJsonSchema,
  TimelineContract: TimelineContractJsonSchema,
  SurveyFixture: SurveyFixtureJsonSchema,
};

for (const [name, schema] of Object.entries(schemas)) {
  const filePath = path.join(outputDir, `${name}.json`);
  fs.writeFileSync(filePath, JSON.stringify(schema, null, 2), "utf-8");
  console.log(`Exported: ${filePath}`);
}

console.log(`\nAll ${Object.keys(schemas).length} schemas exported to ${outputDir}`);
