import { SurveyFixture } from "./fixture";

/**
 * FIX_003 – Combination Boiler in a Flat
 *
 * Modern urban flat: combi boiler with no cylinder, direct mains-pressure
 * hot water on demand, compact system in a high-rise or purpose-built flat.
 */
export const FIX_003_CombiFlat: SurveyFixture = {
  fixtureId: "FIX_003",
  fixtureName: "CombiFlat",
  description: "Combination boiler in a purpose-built flat, no cylinder",
  property: {
    id: "00000003-0000-0000-0000-000000000001",
    address: {
      line1: "Flat 14, Atlas Tower",
      line2: "100 Canal Street",
      town: "Leeds",
      postcode: "LS1 1CC",
      country: "England",
    },
    propertyType: { value: "Flat" },
    constructionYear: { value: 2005 },
    constructionEra: { value: "TwoThousands" },
    floorAreaM2: { value: 55 },
    storeys: { value: 1 },
    tenure: { value: "PrivateRented" },
    epcRating: { value: "B" },
    listedBuilding: { value: false },
    conservationArea: { value: false },
    contractVersion: "1.1.0",
  },
  fabric: {
    walls: [
      {
        constructionType: { value: "CavityFilled" },
        uValueWPerM2K: { value: 0.35, provenance: { level: "Inferred" } },
      },
    ],
    roof: {
      roofType: { value: "Flat" },
    },
    floors: [
      {
        level: 0,
        floorType: { value: "SolidConcrete" },
        areaM2: { value: 55 },
      },
    ],
    windows: {
      glazingType: { value: "DoubleGlazedLowE" },
    },
    contractVersion: "1.1.0",
  },
  hydraulics: {
    systemType: { value: "Combi" },
    pipework: {
      primaryMaterial: { value: "Copper" },
    },
    systemPressure: {
      expansionType: { value: "SealedExpansionVessel" },
      staticPressureBar: { value: 1.5 },
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
        id: "00000003-0000-0000-0000-000000000090",
        location: "Bathroom",
        condition: { value: "Good" },
      },
      {
        id: "00000003-0000-0000-0000-000000000091",
        location: "Kitchen",
        condition: { value: "Good" },
      },
    ],
    contractVersion: "1.1.0",
  },
  waterSupply: {
    coldWaterSupplyType: { value: "DirectFromMain" },
    meterPresent: { value: true },
    hotWaterDistributionType: { value: "Instantaneous" },
    contractVersion: "1.1.0",
  },
  controls: {
    thermostat: {
      id: "00000003-0000-0000-0000-000000000010",
      type: { value: "SmartThermostat" },
    },
    programmer: {
      id: "00000003-0000-0000-0000-000000000011",
      type: { value: "IntegratedWithStat" },
    },
    trvCoverage: { value: "SomeRooms" },
    cylinderThermostat: { value: false },
    boilerInterlock: { value: true },
    contractVersion: "1.1.0",
  },
  systemComponents: {
    heatSource: {
      id: "00000003-0000-0000-0000-000000000020",
      type: { value: "CombiBoiler" },
      fuelType: { value: "NaturalGas" },
      outputKw: { value: 28 },
      installYear: { value: 2019 },
      efficiencyPct: { value: 95 },
    },
    radiators: [
      {
        id: "00000003-0000-0000-0000-000000000030",
        room: "Living Area",
        type: { value: "DoublePanelConvector" },
        trvFitted: { value: true },
      },
    ],
    pumps: [],
    contractVersion: "1.1.0",
  },
  occupancy: {
    numberOfOccupants: { value: 2 },
    occupancyPattern: { value: "PartTimeOccupied" },
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
    consumerUnitType: { value: "MCBConsumerUnit" },
    solarPVPresent: { value: false },
    batteryStoragePresent: { value: false },
    evChargerPresent: { value: false },
    contractVersion: "1.1.0",
  },
  evidencePack: {
    surveyId: "00000003-0000-0000-0000-000000000000",
    items: [],
  },
  timeline: {
    events: [
      {
        id: "00000003-0000-0000-0000-000000000050",
        eventType: "Installation",
        component: "Combi Boiler",
        date: { value: "2019-06-01" },
      },
    ],
    contractVersion: "1.1.0",
  },
  recommendations: {
    recommendations: [],
    contractVersion: "1.1.0",
  },
};
