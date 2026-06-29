# Daedalus Philosophy Maintenance

The Daedalus repositories contain multiple philosophy documents.

These documents are the canonical source of truth for how Daedalus thinks.

The task is not to add documents.

The task is to maintain a coherent philosophy.

## Canonical Hierarchy

The order of authority is:

1. Constitution
2. Manifesto
3. Laws
4. Theorems
5. Mental Models
6. Architecture
7. Implementation

Each layer derives from the one above.

Lower layers must never contradict higher layers.

## Before Making Any Philosophical Change

Always ask:

1. Is this a new Law?
2. Is this a consequence of an existing Law?
3. Is this simply implementation?

Do not create a new Law if an existing Law already implies it.

Prefer deriving rather than inventing.

## Maintaining The Canon

When adding a new principle, check:

- Constitution
- Manifesto
- Laws
- Theorems
- Mental Models

Determine whether the principle:

- Already exists.
- Is implied.
- Genuinely introduces a new idea.

If it is implied, do not duplicate it.

Improve cross references instead.

If it introduces a new idea, explain why it is new and show which existing principles it connects to.

## Anti-Drift

Whenever philosophy documents are modified, review all philosophy documents.

Look for:

- Duplicate principles
- Contradictions
- Terminology drift
- Repeated concepts
- Inconsistent wording

Merge where appropriate.

Keep the Canon concise.

## Vocabulary

Maintain a glossary.

When introducing terminology, check whether an existing preferred term already exists.

Preferred terms include:

- Transformation, not upgrade.
- Future, not replacement.
- Goal, not product request.
- Changes, not benefits.

If terminology drifts, standardise it.

## Meaning of Law

Daedalus uses Law in the scientific sense.

A Law is testable, falsifiable, refinable and stable until deeper understanding improves it.

A Law is not sacred dogma.

A Law is not a legal commandment.

A refined Law may extend or clarify an earlier Law without making the earlier Law useless.

The standard is careful refinement, not casual replacement.

## Law Test

A Law must satisfy all of these:

- Testable.
- Falsifiable.
- Stable until deeper understanding improves it.
- Independent of implementation.
- Applies to every future version of Daedalus.
- Violating it would fundamentally change Daedalus.

If any answer is no, it is probably a Theorem instead.

## Theorem Test

A Theorem:

- Naturally follows from one or more Laws.
- Can be explained by reference to existing Laws.
- Is expected to evolve.
- May influence implementation.

## Mental Model Test

A Mental Model explains how humans should think.

It is not implementation.

It is not architecture.

It is not a workflow.

It is a conceptual model.

Examples:

- House -> Systems -> Home
- Observed -> Inferred -> Simulated

## Architecture Test

Architecture explains how software realises the philosophy.

Architecture must never become philosophy.

## Implementation Test

Implementation explains one possible way to realise the architecture.

Implementation is disposable.

The philosophy is not.

## Repository Responsibility

Daedalus Contracts owns:

- Constitution
- Manifesto
- Laws
- Theorems
- Mental Models

Daedalus Main mirrors these documents.

The Main repository must never diverge from the canonical philosophy.

## Review Mode

Whenever asked to add or change philosophy, produce a report first.

Include:

- Existing principle
- Proposed change
- Classification:
  - Law
  - Theorem
  - Mental Model
  - Architecture
  - Implementation
- Explanation

Only then modify the documents.

## Implicit Assumptions

When a discussion reveals an obvious truth or an implicit assumption that has guided Daedalus for a long time, treat it as a candidate for the Canon.

Before adding it, determine whether it is a Law, Theorem, Mental Model or implementation detail.

Future conversations should refine the philosophy in a structured way.

The Canon should get deeper, not just longer.

## Guiding Principle

The goal is not to produce more documentation.

The goal is to maintain one coherent philosophy from which every implementation naturally follows.
