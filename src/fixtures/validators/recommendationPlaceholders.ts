import { RecommendationsContractSchema } from "../../recommendations";
import { SurveyFixtureV1_1 } from "../fixture";

export function validateRecommendationPlaceholders(fixture: SurveyFixtureV1_1): void {
  const parsed = RecommendationsContractSchema.parse(fixture.recommendations);

  parsed.recommendations.forEach((recommendation, index) => {
    if (!recommendation.title.toLowerCase().includes("placeholder")) {
      throw new Error(
        `Recommendation at index ${index} must remain placeholder-only content`
      );
    }
  });

  parsed.options.forEach((option, index) => {
    if (!option.label.toLowerCase().includes("placeholder")) {
      throw new Error(`Option at index ${index} must remain placeholder-only content`);
    }
  });
}
