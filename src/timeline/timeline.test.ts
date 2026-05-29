import { TimelineContractSchema, TimelineContractJsonSchema } from "./timeline";

describe("TimelineContractSchema", () => {
  it("parses empty timeline", () => {
    const result = TimelineContractSchema.parse({ events: [] });
    expect(result.events).toHaveLength(0);
    expect(result.contractVersion).toBe("1.1.0");
  });

  it("parses timeline with events", () => {
    const result = TimelineContractSchema.parse({
      events: [
        {
          id: "00000000-0000-0000-0000-000000000001",
          eventType: "Service",
          component: "Boiler",
          date: { value: "2023-11-01" },
        },
        {
          id: "00000000-0000-0000-0000-000000000002",
          eventType: "Installation",
          date: { value: "2010-01-15" },
        },
      ],
    });
    expect(result.events).toHaveLength(2);
    expect(result.events[0].eventType).toBe("Service");
  });
});

describe("TimelineContractJsonSchema", () => {
  it("is an object", () => {
    expect(typeof TimelineContractJsonSchema).toBe("object");
  });
});
