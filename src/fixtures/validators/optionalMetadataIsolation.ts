import { SurveyFixtureV1_1 } from "../fixture";

const optionalMetadataKeys = ["address", "epcRating", "tenure", "occupancy", "airflow", "constraints", "risks", "evidence"];

export function validateOptionalMetadataIsolation(fixture: SurveyFixtureV1_1): void {
  optionalMetadataKeys.forEach((key) => {
    if (Object.prototype.hasOwnProperty.call(fixture, key)) {
      throw new Error(`Optional metadata key '${key}' must be nested under optionalMetadata`);
    }
  });
}
