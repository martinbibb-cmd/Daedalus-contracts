import { HydraulicsContractSchema } from "../../hydraulics";
import { SurveyFixtureV1_1 } from "../fixture";

export function validateHydraulicsClosedLoop(fixture: SurveyFixtureV1_1): void {
  HydraulicsContractSchema.parse(fixture.hydraulics);

  const componentPortIds = new Set(
    fixture.systemComponents.componentPorts.map((port) => port.id)
  );

  fixture.hydraulics.network.ports.forEach((port, index) => {
    if (!componentPortIds.has(port.id)) {
      throw new Error(
        `Hydraulics network port '${port.id}' at index ${index} is not declared in systemComponents.componentPorts`
      );
    }
  });
}
