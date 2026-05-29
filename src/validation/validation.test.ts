import { validate, validateOrThrow, exportJsonSchema, formatErrors } from "./validation";
import { z } from "zod";

const TestSchema = z.object({
  name: z.string(),
  age: z.number().int().positive(),
});

describe("validate", () => {
  it("returns success for valid input", () => {
    const result = validate(TestSchema, { name: "Alice", age: 30 });
    expect(result.success).toBe(true);
    expect(result.data?.name).toBe("Alice");
  });

  it("returns errors for invalid input", () => {
    const result = validate(TestSchema, { name: "Bob", age: -5 });
    expect(result.success).toBe(false);
    expect(result.errors).toBeDefined();
    expect(result.errors!.length).toBeGreaterThan(0);
  });
});

describe("validateOrThrow", () => {
  it("returns data for valid input", () => {
    const data = validateOrThrow(TestSchema, { name: "Carol", age: 25 });
    expect(data.name).toBe("Carol");
  });

  it("throws for invalid input", () => {
    expect(() => validateOrThrow(TestSchema, { name: 123, age: 0 })).toThrow();
  });
});

describe("exportJsonSchema", () => {
  it("returns an object", () => {
    const schema = exportJsonSchema(TestSchema, "Test");
    expect(typeof schema).toBe("object");
  });
});

describe("formatErrors", () => {
  it("formats Zod issues into readable strings", () => {
    const result = validate(TestSchema, { name: "X", age: -1 });
    expect(result.success).toBe(false);
    const formatted = formatErrors(result.errors!);
    expect(formatted.length).toBeGreaterThan(0);
    expect(typeof formatted[0]).toBe("string");
  });
});
