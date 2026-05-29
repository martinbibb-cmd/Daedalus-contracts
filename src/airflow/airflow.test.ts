import { AirflowContractSchema, AirflowContractJsonSchema } from "./airflow";

const validAirflow = {
  ventilationStrategy: { value: "NaturalBackground" },
  trickleVents: { value: "Present" },
  extractFans: [],
};

describe("AirflowContractSchema", () => {
  it("parses minimal airflow contract", () => {
    const result = AirflowContractSchema.parse(validAirflow);
    expect(result.ventilationStrategy.value).toBe("NaturalBackground");
  });

  it("parses with extract fans", () => {
    const withFan = {
      ...validAirflow,
      extractFans: [
        {
          id: "00000000-0000-0000-0000-000000000001",
          location: "Bathroom",
          condition: { value: "Good" },
        },
      ],
    };
    const result = AirflowContractSchema.parse(withFan);
    expect(result.extractFans).toHaveLength(1);
  });

  it("rejects invalid ventilation strategy", () => {
    expect(() =>
      AirflowContractSchema.parse({
        ...validAirflow,
        ventilationStrategy: { value: "Windmill" },
      })
    ).toThrow();
  });
});

describe("AirflowContractJsonSchema", () => {
  it("exports JSON schema", () => {
    expect(typeof AirflowContractJsonSchema).toBe("object");
  });
});
