import { SurveyFixtureV1_1 } from "../fixture";

const allowedCoreKeys = new Set([
  "fixtureId",
  "fixtureName",
  "description",
  "property",
  "fabric",
  "systemComponents",
  "hydraulics",
  "airflow",
  "waterSupply",
  "controls",
  "occupancy",
  "constraints",
  "risks",
  "serviceability",
  "electrical",
  "evidence",
  "timeline",
  "optionalMetadata",
]);

export function validateV11CorePayload(fixture: SurveyFixtureV1_1): void {
  Object.keys(fixture).forEach((key) => {
    if (!allowedCoreKeys.has(key)) {
      throw new Error(`Unexpected top-level key outside V1.1 core payload: ${key}`);
    }
  });
}
