import { RecommendationsContractSchema } from "../../recommendations";
import { SurveyFixtureV1_1 } from "../fixture";

const placeholderWord = /\bplaceholder\b/i;

export function validateRecommendationPlaceholders(fixture: SurveyFixtureV1_1): void {
  const parsed = RecommendationsContractSchema.parse(fixture.recommendations);

  parsed.recommendations.forEach((recommendation, index) => {
    if (!recommendation.placeholder || !placeholderWord.test(recommendation.title)) {
      throw new Error(
        `Recommendation at index ${index} must remain placeholder-only content`
      );
    }
  });

  parsed.options.forEach((option, index) => {
    if (!option.placeholder || !placeholderWord.test(option.label)) {
      throw new Error(`Option at index ${index} must remain placeholder-only content`);
    }
  });
}
