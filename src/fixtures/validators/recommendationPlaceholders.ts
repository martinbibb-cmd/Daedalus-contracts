import { RecommendationsContractSchema } from "../../recommendations";
import { SurveyFixtureV1_1 } from "../fixture";

export function validateRecommendationPlaceholders(fixture: SurveyFixtureV1_1): void {
  RecommendationsContractSchema.parse(fixture.recommendations);
}
