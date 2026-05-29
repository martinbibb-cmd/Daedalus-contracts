import { OccupancyContractSchema, OccupancyContractJsonSchema } from "./occupancy";

describe("OccupancyContractSchema", () => {
  it("parses valid occupancy", () => {
    const result = OccupancyContractSchema.parse({
      occupancyPattern: { value: "FullTimeOccupied" },
    });
    expect(result.occupancyPattern.value).toBe("FullTimeOccupied");
    expect(result.contractVersion).toBe("1.1.0");
  });

  it("parses full occupancy with all fields", () => {
    const result = OccupancyContractSchema.parse({
      numberOfOccupants: { value: 3 },
      occupancyPattern: { value: "PartTimeOccupied" },
      vulnerableOccupants: { value: true },
      accessNotes: "Key with neighbour",
    });
    expect(result.vulnerableOccupants?.value).toBe(true);
  });
});

describe("OccupancyContractJsonSchema", () => {
  it("exports JSON schema", () => {
    expect(typeof OccupancyContractJsonSchema).toBe("object");
  });
});
