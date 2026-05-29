import { z } from "zod";

// ---------------------------------------------------------------------------
// Contract versioning
// ---------------------------------------------------------------------------

export const ContractVersionSchema = z.object({
  major: z.number().int().nonnegative(),
  minor: z.number().int().nonnegative(),
  patch: z.number().int().nonnegative(),
  label: z.string().optional(),
});

export type ContractVersion = z.infer<typeof ContractVersionSchema>;

export const CURRENT_VERSION: ContractVersion = {
  major: 1,
  minor: 1,
  patch: 0,
  label: "Atlas Contracts V1.1",
};

export function versionString(v: ContractVersion): string {
  const suffix = v.label ? ` (${v.label})` : "";
  return `${v.major}.${v.minor}.${v.patch}${suffix}`;
}

export function compareVersions(
  a: ContractVersion,
  b: ContractVersion
): number {
  if (a.major !== b.major) return a.major - b.major;
  if (a.minor !== b.minor) return a.minor - b.minor;
  return a.patch - b.patch;
}
