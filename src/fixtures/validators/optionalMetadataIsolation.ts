import { SurveyFixtureV1_1 } from "../fixture";

const optionalMetadataKeys = ["address", "epcRating", "tenure"];
const forbiddenOptionalMetadataKeys = ["airflow", "occupancy", "constraints", "risks", "evidence"];

export function validateOptionalMetadataIsolation(fixture: SurveyFixtureV1_1): void {
  optionalMetadataKeys.forEach((key) => {
    if (Object.prototype.hasOwnProperty.call(fixture, key)) {
      throw new Error(`Optional metadata key '${key}' must be nested under optionalMetadata`);
    }
  });

  if (!fixture.optionalMetadata) {
    return;
  }

  forbiddenOptionalMetadataKeys.forEach((key) => {
    if (Object.prototype.hasOwnProperty.call(fixture.optionalMetadata, key)) {
      throw new Error(`Core V1.1 domain '${key}' must not be nested under optionalMetadata`);
    }
  });
}
