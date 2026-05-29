import { SurveyFixture } from "./fixture";

/**
 * FIX_001 – Open Vented Regular
 *
 * Traditional gravity-fed system: regular (heat-only) boiler, open vented
 * F&E header tank in the loft, vented hot water cylinder, gravity-fed
 * primary circuit, fully pumped secondary circuit.
 */
export const FIX_001_OpenVentedRegular: SurveyFixture = {
  fixtureId: "FIX_001",
  fixtureName: "OpenVentedRegular",
  description:
    "Traditional open-vented system with regular boiler, F&E tank and indirect vented cylinder",
  property: {
    id: "00000001-0000-0000-0000-000000000001",
    address: {
      line1: "1 Atlas Way",
      town: "Birmingham",
      postcode: "B1 1AA",
      country: "England",
    },
    propertyType: { value: "Terraced" },
    constructionYear: { value: 1972 },
    constructionEra: { value: "Sixties" },
    floorAreaM2: { value: 85 },
    storeys: { value: 2 },
    tenure: { value: "OwnerOccupied" },
    epcRating: { value: "D" },
    listedBuilding: { value: false },
    conservationArea: { value: false },
    contractVersion: "1.1.0",
  },
  fabric: {
    walls: [
      {
        constructionType: { value: "CavityUnfilled" },
        uValueWPerM2K: {
          value: 1.6,
          provenance: { level: "Inferred" },
        },
      },
    ],
    roof: {
      roofType: { value: "PitchedTile" },
      insulationThicknessMm: { value: 100, provenance: { level: "Measured" } },
    },
    floors: [
      {
        level: 0,
        floorType: { value: "SuspendedTimber" },
        areaM2: { value: 42 },
      },
    ],
    windows: {
      glazingType: { value: "SingleGlazed" },
    },
    contractVersion: "1.1.0",
  },
  hydraulics: {
    systemType: { value: "OpenVentedRegular" },
    pipework: {
      primaryMaterial: { value: "Copper" },
    },
    systemPressure: {
      expansionType: { value: "OpenVentedFAndETank" },
    },
    contractVersion: "1.1.0",
  },
  airflow: {
    ventilationStrategy: { value: "NaturalBackground" },
    trickleVents: { value: "Present" },
    extractFans: [],
    contractVersion: "1.1.0",
  },
  waterSupply: {
    coldWaterSupplyType: { value: "IndirectFromStorageTank" },
    meterPresent: { value: false },
    hotWaterDistributionType: { value: "DeadLeg" },
    contractVersion: "1.1.0",
  },
  controls: {
    thermostat: {
      id: "00000001-0000-0000-0000-000000000010",
      type: { value: "ProgrammableRoomThermostat" },
    },
    programmer: {
      id: "00000001-0000-0000-0000-000000000011",
      type: { value: "Electronic" },
      heatingAndHWIndependent: { value: true },
    },
    trvCoverage: { value: "MostRooms" },
    cylinderThermostat: { value: true },
    boilerInterlock: { value: true },
    contractVersion: "1.1.0",
  },
  systemComponents: {
    heatSource: {
      id: "00000001-0000-0000-0000-000000000020",
      type: { value: "RegularBoiler" },
      fuelType: { value: "NaturalGas" },
      outputKw: { value: 24 },
      installYear: { value: 2010 },
    },
    hotWaterCylinder: {
      id: "00000001-0000-0000-0000-000000000021",
      cylinderType: { value: "VentedIndirect" },
      capacityLitres: { value: 117 },
      immersionPresent: { value: true },
      thermostatSetpointDegC: { value: 60 },
    },
    coldWaterStorageTank: {
      id: "00000001-0000-0000-0000-000000000022",
      capacityLitres: { value: 115 },
      location: { value: "Loft" },
    },
    feedExpansionTank: {
      id: "00000001-0000-0000-0000-000000000023",
      capacityLitres: { value: 18 },
      location: { value: "Loft" },
    },
    radiators: [
      {
        id: "00000001-0000-0000-0000-000000000030",
        room: "Living Room",
        type: { value: "DoublePanelConvector" },
        trvFitted: { value: true },
      },
    ],
    pumps: [
      {
        id: "00000001-0000-0000-0000-000000000040",
        location: "Airing Cupboard",
        variableSpeed: { value: false },
      },
    ],
    contractVersion: "1.1.0",
  },
  occupancy: {
    numberOfOccupants: { value: 3 },
    occupancyPattern: { value: "FullTimeOccupied" },
    vulnerableOccupants: { value: false },
    contractVersion: "1.1.0",
  },
  constraints: {
    constraints: [],
    contractVersion: "1.1.0",
  },
  risks: {
    risks: [],
    contractVersion: "1.1.0",
  },
  serviceability: {
    overallRating: { value: "Good" },
    items: [],
    contractVersion: "1.1.0",
  },
  electrical: {
    supplyType: { value: "SinglePhase" },
    consumerUnitType: { value: "RCDProtected" },
    solarPVPresent: { value: false },
    batteryStoragePresent: { value: false },
    evChargerPresent: { value: false },
    contractVersion: "1.1.0",
  },
  evidencePack: {
    surveyId: "00000001-0000-0000-0000-000000000000",
    items: [],
  },
  timeline: {
    events: [
      {
        id: "00000001-0000-0000-0000-000000000050",
        eventType: "Installation",
        component: "Regular Boiler",
        date: { value: "2010-03-01" },
      },
    ],
    contractVersion: "1.1.0",
  },
  recommendations: {
    recommendations: [],
    contractVersion: "1.1.0",
  },
};
