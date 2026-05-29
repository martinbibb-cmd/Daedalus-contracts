import { SurveyFixture } from "./fixture";

/**
 * FIX_004 – Heat Pump Pathway
 *
 * Pre-retrofit survey identifying a property suitable for an air source heat
 * pump (ASHP) upgrade. Existing gas combi boiler in place; fabric and
 * controls improvements identified. No cylinder currently installed.
 */
export const FIX_004_HeatPumpPathway: SurveyFixture = {
  fixtureId: "FIX_004",
  fixtureName: "HeatPumpPathway",
  description:
    "Pre-retrofit assessment for ASHP upgrade from gas combi boiler",
  property: {
    id: "00000004-0000-0000-0000-000000000001",
    address: {
      line1: "4 Renewable Road",
      town: "Bristol",
      postcode: "BS1 1DD",
      country: "England",
    },
    propertyType: { value: "Detached" },
    constructionYear: { value: 1985 },
    constructionEra: { value: "EightiesToNineties" },
    floorAreaM2: { value: 140 },
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
          provenance: { level: "SurveyorAsserted" },
        },
      },
    ],
    roof: {
      roofType: { value: "PitchedTile" },
      insulationThicknessMm: {
        value: 100,
        provenance: { level: "Measured" },
      },
    },
    floors: [
      {
        level: 0,
        floorType: { value: "SuspendedTimber" },
        areaM2: { value: 70 },
      },
    ],
    windows: {
      glazingType: { value: "DoubleGlazed" },
      proportionDoubleOrBetterPct: {
        value: 80,
        provenance: { level: "Measured" },
      },
    },
    contractVersion: "1.1.0",
  },
  hydraulics: {
    systemType: {
      value: "Combi",
      provenance: { level: "Confirmed" },
    },
    pipework: {
      primaryMaterial: { value: "Copper" },
      microbore: { value: false, provenance: { level: "SurveyorAsserted" } },
    },
    systemPressure: {
      expansionType: { value: "SealedExpansionVessel" },
      staticPressureBar: { value: 1.3 },
    },
    contractVersion: "1.1.0",
  },
  airflow: {
    ventilationStrategy: { value: "NaturalBackground" },
    trickleVents: { value: "Absent" },
    extractFans: [
      {
        id: "00000004-0000-0000-0000-000000000090",
        location: "Bathroom",
        condition: { value: "Fair" },
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
      id: "00000004-0000-0000-0000-000000000010",
      type: { value: "ProgrammableRoomThermostat" },
    },
    programmer: {
      id: "00000004-0000-0000-0000-000000000011",
      type: { value: "Electronic" },
    },
    trvCoverage: { value: "MostRooms" },
    boilerInterlock: { value: true },
    contractVersion: "1.1.0",
  },
  systemComponents: {
    heatSource: {
      id: "00000004-0000-0000-0000-000000000020",
      type: { value: "CombiBoiler" },
      fuelType: { value: "NaturalGas" },
      outputKw: { value: 26 },
      installYear: { value: 2014 },
    },
    radiators: [
      {
        id: "00000004-0000-0000-0000-000000000030",
        room: "Sitting Room",
        type: { value: "SinglePanelConvector" },
        outputW: {
          value: 1200,
          provenance: { level: "Measured" },
        },
        trvFitted: { value: true },
      },
      {
        id: "00000004-0000-0000-0000-000000000031",
        room: "Kitchen",
        type: { value: "SinglePanelConvector" },
        outputW: { value: 800 },
        trvFitted: { value: false },
      },
    ],
    pumps: [
      {
        id: "00000004-0000-0000-0000-000000000040",
        location: "Utility Room",
        variableSpeed: { value: false },
        condition: { value: "Fair" },
      },
    ],
    contractVersion: "1.1.0",
  },
  occupancy: {
    numberOfOccupants: { value: 4 },
    occupancyPattern: { value: "FullTimeOccupied" },
    vulnerableOccupants: { value: true },
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
    overallRating: { value: "Adequate" },
    items: [
      {
        component: "Combi Boiler",
        rating: { value: "Adequate" },
        actionRequired: { value: false },
        estimatedRemainingLifeYears: { value: 4 },
        notes: "Boiler nearing end of expected life",
      },
    ],
    contractVersion: "1.1.0",
  },
  electrical: {
    supplyType: { value: "SinglePhase" },
    supplyAmpsRating: { value: 100 },
    consumerUnitType: { value: "RCDProtected" },
    solarPVPresent: { value: false },
    batteryStoragePresent: { value: false },
    evChargerPresent: { value: false },
    contractVersion: "1.1.0",
  },
  evidencePack: {
    surveyId: "00000004-0000-0000-0000-000000000000",
    items: [
      {
        id: "00000004-0000-0000-0000-000000000060",
        type: "Photograph",
        label: "Boiler nameplate",
        description: "Photo of existing combi boiler nameplate",
      },
    ],
  },
  timeline: {
    events: [
      {
        id: "00000004-0000-0000-0000-000000000050",
        eventType: "Installation",
        component: "Combi Boiler",
        date: { value: "2014-11-20" },
      },
      {
        id: "00000004-0000-0000-0000-000000000051",
        eventType: "Service",
        component: "Combi Boiler",
        date: { value: "2023-11-15" },
      },
    ],
    contractVersion: "1.1.0",
  },
  recommendations: {
    recommendations: [
      {
        id: "00000004-0000-0000-0000-000000000070",
        category: "HeatSourceUpgrade",
        title: "Install Air Source Heat Pump",
        description:
          "Replace existing gas combi boiler with an ASHP system. " +
          "Cylinder and buffer vessel to be installed. " +
          "Fabric improvements recommended first to reduce heat loss.",
        priority: "MediumTerm",
        estimatedCostGbp: { value: 12000 },
        estimatedAnnualSavingGbp: { value: 350 },
        estimatedCarbonSavingKgCO2e: { value: 1800 },
      },
      {
        id: "00000004-0000-0000-0000-000000000071",
        category: "InsulationImprovement",
        title: "Cavity Wall Insulation",
        description: "Fill existing cavity walls to improve U-value.",
        priority: "ShortTerm",
        estimatedCostGbp: { value: 1200 },
        estimatedAnnualSavingGbp: { value: 180 },
        estimatedCarbonSavingKgCO2e: { value: 540 },
      },
    ],
    contractVersion: "1.1.0",
  },
};
