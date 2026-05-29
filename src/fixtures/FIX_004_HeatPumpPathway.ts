import { FIX_001_OpenVentedRegular } from "./FIX_001_OpenVentedRegular";
import { SurveyFixtureV1_1 } from "./fixture";

export const FIX_004_HeatPumpPathway: SurveyFixtureV1_1 = {
  ...FIX_001_OpenVentedRegular,
  fixtureId: "FIX_004",
  fixtureName: "HeatPumpPathway",
  description: "V1.1 pathway fixture with placeholder recommendations only",
  systemComponents: {
    ...FIX_001_OpenVentedRegular.systemComponents,
    heatGenerators: [
      {
        id: "00000004-0000-0000-0000-000000000020",
        type: "HeatPump",
        fuel: "Electricity",
        ratedOutputKw: { value: 10 },
        portIds: [
          "00000004-0000-0000-0000-000000000201",
          "00000004-0000-0000-0000-000000000202",
        ],
      },
    ],
    componentPorts: [
      { id: "00000004-0000-0000-0000-000000000201", componentId: "00000004-0000-0000-0000-000000000020", role: "Flow", medium: "Water" },
      { id: "00000004-0000-0000-0000-000000000202", componentId: "00000004-0000-0000-0000-000000000020", role: "Return", medium: "Water" },
      { id: "00000004-0000-0000-0000-000000000204", componentId: "00000001-0000-0000-0000-000000000030", role: "Inlet", medium: "Water" },
      { id: "00000004-0000-0000-0000-000000000205", componentId: "00000001-0000-0000-0000-000000000030", role: "Outlet", medium: "Water" },
    ],
  },
  hydraulics: {
    ...FIX_001_OpenVentedRegular.hydraulics,
    network: {
      ...FIX_001_OpenVentedRegular.hydraulics.network,
      id: "00000004-0000-0000-0000-000000000300",
      ports: [
        { id: "00000004-0000-0000-0000-000000000201", componentId: "00000004-0000-0000-0000-000000000020", role: "Flow", medium: "Water" },
        { id: "00000004-0000-0000-0000-000000000202", componentId: "00000004-0000-0000-0000-000000000020", role: "Return", medium: "Water" },
        { id: "00000004-0000-0000-0000-000000000204", componentId: "00000001-0000-0000-0000-000000000030", role: "Inlet", medium: "Water" },
        { id: "00000004-0000-0000-0000-000000000205", componentId: "00000001-0000-0000-0000-000000000030", role: "Outlet", medium: "Water" },
      ],
      pipeSegments: [
        { id: "00000004-0000-0000-0000-000000000301", fromPortId: "00000004-0000-0000-0000-000000000201", toPortId: "00000004-0000-0000-0000-000000000204" },
        { id: "00000004-0000-0000-0000-000000000302", fromPortId: "00000004-0000-0000-0000-000000000205", toPortId: "00000004-0000-0000-0000-000000000202" },
      ],
      loops: [
        {
          id: "00000004-0000-0000-0000-000000000303",
          name: "Heat pump loop",
          portSequence: [
            "00000004-0000-0000-0000-000000000201",
            "00000004-0000-0000-0000-000000000204",
            "00000004-0000-0000-0000-000000000205",
            "00000004-0000-0000-0000-000000000202",
            "00000004-0000-0000-0000-000000000201",
          ],
        },
      ],
    },
  },
  recommendations: {
    recommendations: [
      {
        id: "00000004-0000-0000-0000-000000000900",
        title: "RecommendationV1 placeholder",
        placeholder: true,
      },
    ],
    options: [
      {
        id: "00000004-0000-0000-0000-000000000901",
        recommendationId: "00000004-0000-0000-0000-000000000900",
        label: "OptionV1 placeholder",
        placeholder: true,
      },
    ],
    tradeOffs: [
      {
        id: "00000004-0000-0000-0000-000000000902",
        optionId: "00000004-0000-0000-0000-000000000901",
        dimension: "Carbon",
        direction: "Neutral",
        placeholder: true,
      },
    ],
    pathwayRecommendations: [
      {
        id: "00000004-0000-0000-0000-000000000903",
        pathwayNodeId: "00000001-0000-0000-0000-000000000801",
        recommendationId: "00000004-0000-0000-0000-000000000900",
        placeholder: true,
      },
    ],
    contractVersion: "1.1.0",
  },
};
