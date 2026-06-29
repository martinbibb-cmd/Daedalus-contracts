# Daedalus Build Plan

This is the canonical build-plan authority for the Daedalus repositories.
Other Daedalus repositories keep repo-local projections of this plan and must
update those projections when cross-repo direction changes.

This plan must remain aligned with the [Constitution](docs/constitution/DAEDALUS_CONSTITUTION_v1.2.md), especially the Projection Rule, the [Laws of Daedalus](docs/philosophy/LAWS_OF_DAEDALUS.md), and [Daedalus Philosophy Maintenance](docs/philosophy/PHILOSOPHY_MAINTENANCE.md).

## Shared Platform Direction

- Property is the root identity.
- Twin belongs to Property.
- Capture creates property-rooted Working Twins and Capture Sessions.
- Contracts define shared schemas, boundaries, and validation language.
- Platform stores active Property, Twin, and import metadata.
- R2 stores package and media objects.
- Main imports, validates, explains, and renders evidence packs.
- AI may improve readability only; it is not source of truth.
- Users, billing, permissions, sync, and revenue models are deliberately deferred.

## Canon-Aligned Product Direction

- The Twin is the source of truth.
- Every report, visualisation, animation, conversation, accessibility narration, customer view, installer view, engineer view, PDF, AR view, and future interface is a projection of the Twin.
- Build projections from the Twin, not bespoke truth stores.
- The primary Main experience should move toward a Twin Canvas rather than dashboards or disconnected pages.
- Reports should become frozen projections of the Twin.
- Scenarios should compare possible futures, not products.
- Transformations should show current twin -> changed elements -> future twin.
- Main should model goals, constraints, challenges, capabilities and consequences.
- Capture should support additive and deductive reasoning: observations add knowledge and eliminate impossible realities.
- Unknown, inferred and simulated states must remain visibly distinct.

## Current Stage

Stage P0: Property-root Platform Foundation

Completed:

- property-root contracts
- Capture C3 property-root lifecycle
- Main P1/P2/D1 alignment
- Platform Property POC
- Platform Capture Package Import
- Platform Property Viewer
- Platform Property Dashboard v1

## Next Planned Tranches

These are planned, not implemented:

1. Canon alignment checkpoint
   - Confirm Contracts and Main philosophy docs agree.
   - Confirm Build Plan reflects Constitution, Manifesto, Laws, and Projection Rule.
2. Real import verification
   - Confirm live deployment routes.
   - Import real Capture export.
   - View property, twin, and import metadata.
3. Projection foundation
   - Ensure evidence pack, report, and customer views are projections of the Twin.
   - No projection owns truth.
   - No projection hides uncertainty.
4. Twin Canvas prototype path
   - Use Daedalus-sandbox to discover visual experience only.
   - Main remains production implementation.
   - The sandbox must not become source of truth.
5. Transformation modelling path
   - Define current twin -> transformation -> future twin.
   - Show removed, added, modified, and unchanged elements.
   - Preserve uncertainty and avoid recommendations.
6. Goal modelling path
   - Distinguish goals, preferences, constraints, and challenges.
   - Goals belong to the Home.
   - Constraints belong to reality.
   - Challenges belong to implementation.
   - Human decision remains final.

## Repo Responsibility: Daedalus-contracts

Owns:

- canonical property-root contracts
- package schemas
- validation rules
- versioning
- legacy migration identification
- shared boundary language

Must not own:

- UI
- storage implementation
- Cloudflare bindings
- Capture UX
- Main reasoning implementation
- billing, users, or revenue

## Deferred Explicitly

Do not implement yet:

- user accounts
- roles
- permissions
- billing
- subscriptions
- enterprise hierarchy
- sync engine
- AI extraction
- recommendations
- compliance or legal judgement

## Anti-Drift Rules

- Any contract shape change must begin in Daedalus-contracts.
- Capture Swift mirror must be explicitly checked after contract changes.
- Main must validate package/import behaviour against shared contracts.
- Platform must validate API inputs against shared contracts.
- No repo may invent its own property-root semantics silently.
- Any cross-repo change must update this build-plan file.

## Verification

Run before merging changes in this repo:

```sh
npm test
npm run build
git diff --check
```
