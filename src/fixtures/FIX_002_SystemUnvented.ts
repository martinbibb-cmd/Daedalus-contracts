import { SurveyFixture } from "./fixture";

/**
 * FIX_002 – System Boiler with Unvented Cylinder
 *
 * Sealed system: system boiler, unvented (pressurised) hot water cylinder
 * (e.g. Megaflo), no F&E tank, no cold water storage tank, mains-pressure
 * hot water throughout.
 */
export const FIX_002_SystemUnvented: SurveyFixture = {
  fixtureId: "FIX_002",
  fixtureName: "SystemUnvented",
  description:
    "Sealed system boiler with unvented pressurised hot water cylinder",
  property: {
    id: "00000002-0000-0000-0000-000000000001",
    address: {
      line1: "2 Atlas Close",
      town: "Manchester",
      postcode: "M1 1BB",
      country: "England",
    },
    propertyType: { value: "SemiDetached" },
    constructionYear: { value: 1995 },
    constructionEra: { value: "EightiesToNineties" },
    floorAreaM2: { value: 110 },
    storeys: { value: 2 },
    tenure: { value: "OwnerOccupied" },
    epcRating: { value: "C" },
    listedBuilding: { value: false },
    conservationArea: { value: false },
    contractVersion: "1.1.0",
  },
  fabric: {
    walls: [
      {
        constructionType: { value: "CavityFilled" },
        uValueWPerM2K: { value: 0.45, provenance: { level: "Inferred" } },
      },
    ],
    roof: {
      roofType: { value: "PitchedTile" },
      insulationThicknessMm: { value: 270, provenance: { level: "Measured" } },
    },
    floors: [
      {
        level: 0,
        floorType: { value: "SolidConcrete" },
        areaM2: { value: 55 },
      },
    ],
    windows: {
      glazingType: { value: "DoubleGlazed" },
    },
    contractVersion: "1.1.0",
  },
  hydraulics: {
    systemType: { value: "SystemBoilerUnvented" },
    pipework: {
      primaryMaterial: { value: "Copper" },
    },
    systemPressure: {
      expansionType: { value: "SealedExpansionVessel" },
      staticPressureBar: { value: 1.2 },
      pressureReliefValveFitted: { value: true },
      pressureReliefValveBarSetting: { value: 3.0 },
    },
    contractVersion: "1.1.0",
  },
  airflow: {
    ventilationStrategy: { value: "IntermittentExtract" },
    trickleVents: { value: "Present" },
    extractFans: [
      {
        id: "00000002-0000-0000-0000-000000000090",
        location: "Bathroom",
        condition: { value: "Good" },
      },
    ],
    contractVersion: "1.1.0",
  },
  waterSupply: {
    coldWaterSupplyType: { value: "DirectFromMain" },
    meterPresent: { value: true },
    hotWaterDistributionType: { value: "DeadLeg" },
    contractVersion: "1.1.0",
  },
  controls: {
    thermostat: {
      id: "00000002-0000-0000-0000-000000000010",
      type: { value: "SmartThermostat" },
      manufacturer: { value: "Nest" },
    },
    programmer: {
      id: "00000002-0000-0000-0000-000000000011",
      type: { value: "IntegratedWithStat" },
    },
    trvCoverage: { value: "AllRooms" },
    cylinderThermostat: { value: true },
    boilerInterlock: { value: true },
    contractVersion: "1.1.0",
  },
  systemComponents: {
    heatSource: {
      id: "00000002-0000-0000-0000-000000000020",
      type: { value: "SystemBoiler" },
      fuelType: { value: "NaturalGas" },
      outputKw: { value: 30 },
      installYear: { value: 2018 },
      efficiencyPct: { value: 94 },
    },
    hotWaterCylinder: {
      id: "00000002-0000-0000-0000-000000000021",
      cylinderType: { value: "UnventedIndirect" },
      capacityLitres: { value: 210 },
      immersionPresent: { value: true },
      thermostatSetpointDegC: { value: 60 },
    },
    radiators: [
      {
        id: "00000002-0000-0000-0000-000000000030",
        room: "Lounge",
        type: { value: "DoublePanelConvector" },
        trvFitted: { value: true },
      },
    ],
    pumps: [],
    contractVersion: "1.1.0",
  },
  occupancy: {
    numberOfOccupants: { value: 4 },
    occupancyPattern: { value: "FullTimeOccupied" },
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
    overallRating: { value: "Excellent" },
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
    surveyId: "00000002-0000-0000-0000-000000000000",
    items: [],
  },
  timeline: {
    events: [
      {
        id: "00000002-0000-0000-0000-000000000050",
        eventType: "Installation",
        component: "System Boiler",
        date: { value: "2018-09-15" },
      },
    ],
    contractVersion: "1.1.0",
  },
  recommendations: {
    recommendations: [],
    contractVersion: "1.1.0",
  },
};
