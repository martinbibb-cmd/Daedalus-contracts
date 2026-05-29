import {
  SystemComponentsContractSchema,
  SystemComponentsContractJsonSchema,
} from "./systemComponents";

const validComponents = {
  heatSource: {
    id: "00000000-0000-0000-0000-000000000001",
    type: { value: "RegularBoiler" },
    fuelType: { value: "NaturalGas" },
  },
  radiators: [],
  pumps: [],
};

describe("SystemComponentsContractSchema", () => {
  it("parses minimal components contract", () => {
    const result = SystemComponentsContractSchema.parse(validComponents);
    expect(result.heatSource.type.value).toBe("RegularBoiler");
    expect(result.contractVersion).toBe("1.1.0");
  });

  it("parses with cylinder and tanks", () => {
    const withCylinder = {
      ...validComponents,
      hotWaterCylinder: {
        id: "00000000-0000-0000-0000-000000000002",
        cylinderType: { value: "VentedIndirect" },
        capacityLitres: { value: 117 },
      },
      coldWaterStorageTank: {
        id: "00000000-0000-0000-0000-000000000003",
        capacityLitres: { value: 115 },
      },
      feedExpansionTank: {
        id: "00000000-0000-0000-0000-000000000004",
        capacityLitres: { value: 18 },
      },
    };
    const result = SystemComponentsContractSchema.parse(withCylinder);
    expect(result.hotWaterCylinder?.cylinderType.value).toBe("VentedIndirect");
  });

  it("parses radiators with TRV flag", () => {
    const withRad = {
      ...validComponents,
      radiators: [
        {
          id: "00000000-0000-0000-0000-000000000010",
          type: { value: "DoublePanelConvector" },
          trvFitted: { value: true },
        },
      ],
    };
    const result = SystemComponentsContractSchema.parse(withRad);
    expect(result.radiators[0].trvFitted?.value).toBe(true);
  });
});

describe("SystemComponentsContractJsonSchema", () => {
  it("is an object", () => {
    expect(typeof SystemComponentsContractJsonSchema).toBe("object");
  });
});
