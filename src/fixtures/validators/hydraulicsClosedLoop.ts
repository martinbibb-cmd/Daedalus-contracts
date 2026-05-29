import { HydraulicsContractSchema } from "../../hydraulics";
import { SurveyFixtureV1_1 } from "../fixture";

export function validateHydraulicsClosedLoop(fixture: SurveyFixtureV1_1): void {
  HydraulicsContractSchema.parse(fixture.hydraulics);
}
