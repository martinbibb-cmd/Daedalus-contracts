import { z } from "zod";
import { zodToJsonSchema } from "zod-to-json-schema";

// ---------------------------------------------------------------------------
// Generic validation utilities
// ---------------------------------------------------------------------------

export interface ValidationResult<T> {
  success: boolean;
  data?: T;
  errors?: z.ZodIssue[];
}

export function validate<T>(
  schema: z.ZodType<T>,
  input: unknown
): ValidationResult<T> {
  const result = schema.safeParse(input);
  if (result.success) {
    return { success: true, data: result.data };
  }
  return { success: false, errors: result.error.issues };
}

export function validateOrThrow<T>(schema: z.ZodType<T>, input: unknown): T {
  return schema.parse(input);
}

export function exportJsonSchema(
  schema: z.ZodTypeAny,
  name: string
): object {
  return zodToJsonSchema(schema, { name });
}

export function formatErrors(errors: z.ZodIssue[]): string[] {
  return errors.map(
    (e) => `[${e.path.join(".")}] ${e.message}`
  );
}
