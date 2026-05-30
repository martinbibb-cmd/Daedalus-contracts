import { FIX_001_OpenVentedRegular } from "./FIX_001_OpenVentedRegular";
import { SurveyFixtureV1_1 } from "./fixture";

export const FIX_002_SystemUnvented: SurveyFixtureV1_1 = {
  ...FIX_001_OpenVentedRegular,
  fixtureId: "FIX_002",
  fixtureName: "SystemUnvented",
  description: "V1.1 sealed system with unvented vessel placeholder fixture",
  systemComponents: {
    ...FIX_001_OpenVentedRegular.systemComponents,
    heatGenerators: [
      {
        ...FIX_001_OpenVentedRegular.systemComponents.heatGenerators[0],
        type: "Boiler",
        fuel: "Gas",
        ratedOutputKw: { value: 28 },
      },
    ],
    hotWaterVessels: [
      {
        id: "00000002-0000-0000-0000-000000000021",
        type: "Cylinder",
        capacityLitres: { value: 180 },
        portIds: ["00000002-0000-0000-0000-000000000203"],
      },
    ],
    componentPorts: [
      { id: "00000002-0000-0000-0000-000000000201", componentId: "00000001-0000-0000-0000-000000000020", role: "Flow", medium: "Water" },
      { id: "00000002-0000-0000-0000-000000000202", componentId: "00000001-0000-0000-0000-000000000020", role: "Return", medium: "Water" },
      { id: "00000002-0000-0000-0000-000000000204", componentId: "00000001-0000-0000-0000-000000000030", role: "Inlet", medium: "Water" },
      { id: "00000002-0000-0000-0000-000000000205", componentId: "00000001-0000-0000-0000-000000000030", role: "Outlet", medium: "Water" },
      { id: "00000002-0000-0000-0000-000000000203", componentId: "00000002-0000-0000-0000-000000000021", role: "Outlet", medium: "Water" },
    ],
    contractVersion: "1.1.0",
  },
  hydraulics: {
    ...FIX_001_OpenVentedRegular.hydraulics,
    network: {
      ...FIX_001_OpenVentedRegular.hydraulics.network,
      id: "00000002-0000-0000-0000-000000000300",
      ports: [
        { id: "00000002-0000-0000-0000-000000000201", componentId: "00000001-0000-0000-0000-000000000020", role: "Flow", medium: "Water" },
        { id: "00000002-0000-0000-0000-000000000202", componentId: "00000001-0000-0000-0000-000000000020", role: "Return", medium: "Water" },
        { id: "00000002-0000-0000-0000-000000000204", componentId: "00000001-0000-0000-0000-000000000030", role: "Inlet", medium: "Water" },
        { id: "00000002-0000-0000-0000-000000000205", componentId: "00000001-0000-0000-0000-000000000030", role: "Outlet", medium: "Water" },
      ],
      pipeSegments: [
        { id: "00000002-0000-0000-0000-000000000301", fromPortId: "00000002-0000-0000-0000-000000000201", toPortId: "00000002-0000-0000-0000-000000000204" },
        { id: "00000002-0000-0000-0000-000000000302", fromPortId: "00000002-0000-0000-0000-000000000205", toPortId: "00000002-0000-0000-0000-000000000202" },
      ],
      loops: [
        {
          id: "00000002-0000-0000-0000-000000000303",
          name: "Sealed loop",
          portSequence: [
            "00000002-0000-0000-0000-000000000201",
            "00000002-0000-0000-0000-000000000204",
            "00000002-0000-0000-0000-000000000205",
            "00000002-0000-0000-0000-000000000202",
            "00000002-0000-0000-0000-000000000201",
          ],
        },
      ],
    },
  },
};
