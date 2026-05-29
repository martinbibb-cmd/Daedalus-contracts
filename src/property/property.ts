import { z } from "zod";
import { zodToJsonSchema } from "zod-to-json-schema";
import { valueSchema } from "../core/provenance";

// ---------------------------------------------------------------------------
// Enumerations
// ---------------------------------------------------------------------------

export const PropertyTypeSchema = z.enum([
  "Detached",
  "SemiDetached",
  "Terraced",
  "EndOfTerrace",
  "Flat",
  "Maisonette",
  "Bungalow",
  "Other",
]);
export type PropertyType = z.infer<typeof PropertyTypeSchema>;

export const TenureTypeSchema = z.enum([
  "OwnerOccupied",
  "PrivateRented",
  "SocialRented",
  "SharedOwnership",
  "Unknown",
]);
export type TenureType = z.infer<typeof TenureTypeSchema>;

export const EPCRatingSchema = z.enum(["A", "B", "C", "D", "E", "F", "G", "Unknown"]);
export type EPCRating = z.infer<typeof EPCRatingSchema>;

export const ConstructionEraSchema = z.enum([
  "PreVictorian",    // < 1875
  "Victorian",       // 1875–1919
  "Interwar",        // 1919–1944
  "PostWar",         // 1945–1964
  "Sixties",         // 1965–1980
  "EightiesToNineties", // 1981–2000
  "TwoThousands",    // 2001–2012
  "Modern",          // 2013+
  "Unknown",
]);
export type ConstructionEra = z.infer<typeof ConstructionEraSchema>;

// ---------------------------------------------------------------------------
// Address
// ---------------------------------------------------------------------------

export const AddressSchema = z.object({
  line1: z.string(),
  line2: z.string().optional(),
  town: z.string(),
  county: z.string().optional(),
  postcode: z.string(),
  country: z.string().default("England"),
});
export type Address = z.infer<typeof AddressSchema>;

// ---------------------------------------------------------------------------
// Property contract
// ---------------------------------------------------------------------------

export const PropertyContractSchema = z.object({
  id: z.string().uuid(),
  uprn: valueSchema(z.string()).optional(),
  address: AddressSchema,
  propertyType: valueSchema(PropertyTypeSchema),
  constructionYear: valueSchema(z.number().int().optional()),
  constructionEra: valueSchema(ConstructionEraSchema),
  floorAreaM2: valueSchema(z.number().positive()),
  storeys: valueSchema(z.number().int().positive()),
  tenure: valueSchema(TenureTypeSchema),
  epcRating: valueSchema(EPCRatingSchema),
  epcExpiryDate: valueSchema(z.string().date()).optional(),
  listedBuilding: valueSchema(z.boolean()),
  conservationArea: valueSchema(z.boolean()),
  contractVersion: z.string().default("1.1.0"),
});

export type PropertyContract = z.infer<typeof PropertyContractSchema>;

export const PropertyContractJsonSchema = zodToJsonSchema(
  PropertyContractSchema,
  { name: "PropertyContract" }
);
