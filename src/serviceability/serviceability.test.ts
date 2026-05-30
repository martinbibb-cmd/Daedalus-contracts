import { ServiceabilityContractSchema } from "./index";

describe("ServiceabilityContractSchema", () => {
  it("parses ServiceHatch AccessPathway and ClearanceEnvelope", () => {
    const parsed = ServiceabilityContractSchema.parse({
      serviceHatches: [
        {
          id: "00000000-0000-0000-0000-000000000601",
          componentId: "00000000-0000-0000-0000-000000000602",
          location: "Cupboard",
        },
      ],
      accessPathways: [
        {
          id: "00000000-0000-0000-0000-000000000603",
          componentId: "00000000-0000-0000-0000-000000000602",
          routeDescription: "Hallway",
        },
      ],
      clearanceEnvelopes: [
        {
          id: "00000000-0000-0000-0000-000000000604",
          componentId: "00000000-0000-0000-0000-000000000602",
          frontalClearanceMm: { value: 500 },
        },
      ],
    });

    expect(parsed.clearanceEnvelopes[0].frontalClearanceMm.value).toBe(500);
  });
});
