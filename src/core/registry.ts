import { z } from "zod";
import { zodToJsonSchema } from "zod-to-json-schema";
import { ContractVersion, CURRENT_VERSION } from "./version";

// ---------------------------------------------------------------------------
// Schema registry – maps contract names to their Zod schemas for migrations
// ---------------------------------------------------------------------------

export interface SchemaEntry {
  name: string;
  version: ContractVersion;
  schema: z.ZodTypeAny;
}

export class SchemaRegistry {
  private readonly entries = new Map<string, SchemaEntry>();

  register(entry: SchemaEntry): void {
    const key = `${entry.name}@${entry.version.major}.${entry.version.minor}.${entry.version.patch}`;
    this.entries.set(key, entry);
  }

  get(name: string, version: ContractVersion = CURRENT_VERSION): SchemaEntry | undefined {
    const key = `${name}@${version.major}.${version.minor}.${version.patch}`;
    return this.entries.get(key);
  }

  list(): SchemaEntry[] {
    return Array.from(this.entries.values());
  }

  toJsonSchema(name: string, version: ContractVersion = CURRENT_VERSION): object | undefined {
    const entry = this.get(name, version);
    if (!entry) return undefined;
    return zodToJsonSchema(entry.schema, { name: entry.name });
  }
}

/** Global singleton registry */
export const globalRegistry = new SchemaRegistry();
