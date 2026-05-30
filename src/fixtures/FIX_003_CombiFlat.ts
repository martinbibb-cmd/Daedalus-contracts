import { FIX_001_OpenVentedRegular } from "./FIX_001_OpenVentedRegular";
import { SurveyFixtureV1_1 } from "./fixture";

export const FIX_003_CombiFlat: SurveyFixtureV1_1 = {
  ...FIX_001_OpenVentedRegular,
  fixtureId: "FIX_003",
  fixtureName: "CombiFlat",
  description: "V1.1 combi flat placeholder fixture",
  systemComponents: {
    ...FIX_001_OpenVentedRegular.systemComponents,
    hotWaterVessels: [],
    heatGenerators: [
      {
        ...FIX_001_OpenVentedRegular.systemComponents.heatGenerators[0],
        id: "00000003-0000-0000-0000-000000000020",
        type: "Boiler",
        fuel: "Gas",
      },
    ],
  },
  optionalMetadata: {
    ...FIX_001_OpenVentedRegular.optionalMetadata,
    address: {
      line1: "3 Atlas Apartments",
      town: "Leeds",
      postcode: "LS1 2AB",
      country: "England",
    },
  },
};
