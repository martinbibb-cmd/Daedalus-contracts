import { SurveyFixtureV1_1 } from "./fixture";

export const FIX_001_OpenVentedRegular: SurveyFixtureV1_1 = {
  fixtureId: "FIX_001",
  fixtureName: "OpenVentedRegular",
  description: "V1.1 baseline open vented regular system placeholder fixture",
  property: {
    site: {
      id: "00000001-0000-0000-0000-000000000001",
      name: "Atlas Way Site",
      structures: [
        {
          id: "00000001-0000-0000-0000-000000000010",
          name: "Main House",
          type: "MainBuilding",
          spaces: [
            {
              id: "00000001-0000-0000-0000-000000000011",
              name: "Living Room",
              type: "LivingRoom",
              floorAreaM2: { value: 18 },
            },
          ],
        },
      ],
    },
    contractVersion: "1.1.0",
  },
  fabric: {
    elements: [
      {
        id: "00000001-0000-0000-0000-000000000100",
        structureId: "00000001-0000-0000-0000-000000000010",
        spaceId: "00000001-0000-0000-0000-000000000011",
        type: "Wall",
        orientation: { value: "South" },
        surfaceAreaM2: { value: 12 },
        layerStack: [
          {
            id: "00000001-0000-0000-0000-000000000101",
            name: "Inner plaster",
            material: "Plaster",
            thicknessMm: { value: 13 },
          },
        ],
      },
    ],
    contractVersion: "1.1.0",
  },
  systemComponents: {
    heatGenerators: [
      {
        id: "00000001-0000-0000-0000-000000000020",
        type: "Boiler",
        fuel: "Gas",
        portIds: [
          "00000001-0000-0000-0000-000000000201",
          "00000001-0000-0000-0000-000000000202",
        ],
      },
    ],
    hotWaterVessels: [
      {
        id: "00000001-0000-0000-0000-000000000021",
        type: "Cylinder",
        capacityLitres: { value: 117 },
        portIds: ["00000001-0000-0000-0000-000000000203"],
      },
    ],
    emitters: [
      {
        id: "00000001-0000-0000-0000-000000000030",
        type: "Radiator",
        spaceId: "00000001-0000-0000-0000-000000000011",
        portIds: [
          "00000001-0000-0000-0000-000000000204",
          "00000001-0000-0000-0000-000000000205",
        ],
      },
    ],
    componentPorts: [
      { id: "00000001-0000-0000-0000-000000000201", componentId: "00000001-0000-0000-0000-000000000020", role: "Flow", medium: "Water" },
      { id: "00000001-0000-0000-0000-000000000202", componentId: "00000001-0000-0000-0000-000000000020", role: "Return", medium: "Water" },
      { id: "00000001-0000-0000-0000-000000000203", componentId: "00000001-0000-0000-0000-000000000021", role: "Outlet", medium: "Water" },
      { id: "00000001-0000-0000-0000-000000000204", componentId: "00000001-0000-0000-0000-000000000030", role: "Inlet", medium: "Water" },
      { id: "00000001-0000-0000-0000-000000000205", componentId: "00000001-0000-0000-0000-000000000030", role: "Outlet", medium: "Water" },
    ],
    contractVersion: "1.1.0",
  },
  hydraulics: {
    network: {
      id: "00000001-0000-0000-0000-000000000300",
      ports: [
        { id: "00000001-0000-0000-0000-000000000201", componentId: "00000001-0000-0000-0000-000000000020", role: "Flow", medium: "Water" },
        { id: "00000001-0000-0000-0000-000000000202", componentId: "00000001-0000-0000-0000-000000000020", role: "Return", medium: "Water" },
        { id: "00000001-0000-0000-0000-000000000204", componentId: "00000001-0000-0000-0000-000000000030", role: "Inlet", medium: "Water" },
        { id: "00000001-0000-0000-0000-000000000205", componentId: "00000001-0000-0000-0000-000000000030", role: "Outlet", medium: "Water" },
      ],
      pipeSegments: [
        { id: "00000001-0000-0000-0000-000000000301", fromPortId: "00000001-0000-0000-0000-000000000201", toPortId: "00000001-0000-0000-0000-000000000204" },
        { id: "00000001-0000-0000-0000-000000000302", fromPortId: "00000001-0000-0000-0000-000000000205", toPortId: "00000001-0000-0000-0000-000000000202" },
      ],
      loops: [
        {
          id: "00000001-0000-0000-0000-000000000303",
          name: "Primary",
          portSequence: [
            "00000001-0000-0000-0000-000000000201",
            "00000001-0000-0000-0000-000000000204",
            "00000001-0000-0000-0000-000000000205",
            "00000001-0000-0000-0000-000000000202",
            "00000001-0000-0000-0000-000000000201",
          ],
        },
      ],
    },
    contractVersion: "1.1.0",
  },
  waterSupply: {
    profile: {
      id: "00000001-0000-0000-0000-000000000400",
      staticPressureBar: { value: 2.8 },
      dynamicPressureBar: { value: 1.4 },
      peakFlowLPerMin: { value: 20 },
      sharedMain: { value: true },
      incomingMaterial: { value: "Copper" },
      incomingDiameterMm: { value: 22 },
      prvPresent: { value: false },
    },
    mainsRemedyDevices: [],
    contractVersion: "1.1.0",
  },
  controls: {
    systems: [
      {
        id: "00000001-0000-0000-0000-000000000500",
        name: "Main control",
        devices: [
          {
            id: "00000001-0000-0000-0000-000000000501",
            type: "Thermostat",
            targetZoneId: "00000001-0000-0000-0000-000000000510",
          },
        ],
        zones: [
          {
            id: "00000001-0000-0000-0000-000000000510",
            name: "Ground floor",
            spaceIds: ["00000001-0000-0000-0000-000000000011"],
            emitterIds: ["00000001-0000-0000-0000-000000000030"],
          },
        ],
      },
    ],
    contractVersion: "1.1.0",
  },
  serviceability: {
    serviceHatches: [
      {
        id: "00000001-0000-0000-0000-000000000600",
        componentId: "00000001-0000-0000-0000-000000000020",
        location: "Kitchen cupboard",
      },
    ],
    accessPathways: [
      {
        id: "00000001-0000-0000-0000-000000000601",
        componentId: "00000001-0000-0000-0000-000000000020",
        routeDescription: "Front door to kitchen",
      },
    ],
    clearanceEnvelopes: [
      {
        id: "00000001-0000-0000-0000-000000000602",
        componentId: "00000001-0000-0000-0000-000000000020",
        frontalClearanceMm: { value: 600 },
      },
    ],
    contractVersion: "1.1.0",
  },
  electrical: {
    electricalService: {
      id: "00000001-0000-0000-0000-000000000700",
      supplyType: "SinglePhase",
      supplyCapacityA: { value: 100 },
    },
    microGenerators: [],
    contractVersion: "1.1.0",
  },
  timeline: {
    nodes: [
      { id: "00000001-0000-0000-0000-000000000800", name: "Baseline", stage: "Baseline" },
      { id: "00000001-0000-0000-0000-000000000801", name: "Current service", stage: "Milestone" },
    ],
    transitions: [
      { id: "00000001-0000-0000-0000-000000000802", fromNodeId: "00000001-0000-0000-0000-000000000800", toNodeId: "00000001-0000-0000-0000-000000000801" },
    ],
    equivalentPaths: [
      { id: "00000001-0000-0000-0000-000000000803", name: "Baseline path", nodeIds: ["00000001-0000-0000-0000-000000000800", "00000001-0000-0000-0000-000000000801"] },
    ],
    contractVersion: "1.1.0",
  },
  recommendations: {
    recommendations: [
      {
        id: "00000001-0000-0000-0000-000000000900",
        title: "RecommendationV1 placeholder",
        placeholder: true,
      },
    ],
    options: [
      {
        id: "00000001-0000-0000-0000-000000000901",
        recommendationId: "00000001-0000-0000-0000-000000000900",
        label: "OptionV1 placeholder",
        placeholder: true,
      },
    ],
    tradeOffs: [
      {
        id: "00000001-0000-0000-0000-000000000902",
        optionId: "00000001-0000-0000-0000-000000000901",
        dimension: "Cost",
        direction: "Neutral",
        placeholder: true,
      },
    ],
    pathwayRecommendations: [
      {
        id: "00000001-0000-0000-0000-000000000903",
        pathwayNodeId: "00000001-0000-0000-0000-000000000801",
        recommendationId: "00000001-0000-0000-0000-000000000900",
        placeholder: true,
      },
    ],
    contractVersion: "1.1.0",
  },
  optionalMetadata: {
    address: {
      line1: "1 Atlas Way",
      town: "Birmingham",
      postcode: "B1 1AA",
      country: "England",
    },
    epcRating: "D",
    tenure: "OwnerOccupied",
  },
};
