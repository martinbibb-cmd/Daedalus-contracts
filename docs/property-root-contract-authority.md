# Property-Root Contract Authority

`@atlas/contracts-daedalus` is the canonical shared contract package for Daedalus property-root data exchange.

The authority model is:

- `PropertyIdentity` is the ownership root.
- Twins belong to a property. A `WorkingTwin` is temporary or in-progress and is not authoritative. An `AuthoritativeTwin` is property-rooted and committed.
- `SurveyCaptureSession` belongs to a property and a working twin, and is not an ownership root.
- Evidence records reference media stored outside structured data. Binary media must not be embedded in property-root JSON.
- Users, organisations, workspaces, billing records, and subscriptions are attachment or access context only. They are not ownership roots.
- `AccessGrant` and `CustodianChange` are placeholder attachment points, not permission-engine or ownership-transfer implementations.
- AI output can be captured as provenance or generated data, but is never authoritative truth by contract.

`DaedalusPackageV4Schema` is the property-root export/import shape. Legacy v3 packages are supported only as upgrade inputs via `LegacyDaedalusPackageV3UpgradeShapeSchema`, `identifyDaedalusPackageForUpgrade`, and `normalizeLegacyV3ToPropertyRootShell`.
