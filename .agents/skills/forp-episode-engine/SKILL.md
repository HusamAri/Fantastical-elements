---
name: forp-episode-engine
description: "Use to produce a FORP (Fragments of Real People) episode end-to-end — 4-5 minute standalone high-tempo action episodes with fantastical elements on Higgsfield — or to run any phase of the pipeline: premise/blueprint, asset plan, character grounding, visual bible, shotlist, keyframes, animatic, video generation, post-gen QA, edit. Invoke when the user wants to start/continue an episode, plan generations, or asks anything about the FORP production pipeline. Enforces keyframe-first, one-shot generation discipline, and the three human approval gates."
argument-hint: "[episode slug or phase]"
user-invocable: true
---

# FORP Episode Engine — Orchestrator

Master playbook: `playbooks/forp-episode-engine/PLAYBOOK.md` (repo root). Read it once per
episode, at Phase 0. After that, load ONLY the reference file the current phase needs:

| Phase | Load |
|---|---|
| 0 Premise & story | [reference/episode-blueprint.md](reference/episode-blueprint.md) + [reference/qa-loops.md](reference/qa-loops.md) §Loop 1 (the gate) |
| 1 Asset plan & budget | [reference/asset-registry.md](reference/asset-registry.md) |
| 1.5–2 Characters & world | [reference/prompt-standards.md](reference/prompt-standards.md) (Prompt Blocks section) |
| 3 Shotlist | [reference/shotlist-standard.md](reference/shotlist-standard.md) |
| 4 QA & lock | [reference/qa-loops.md](reference/qa-loops.md) → run `/forp-scenario-qa`, `/forp-prompt-enhancer`, `/forp-continuity-guard` |
| 5–7 Generation | [reference/generation-protocol.md](reference/generation-protocol.md) |
| 8 Post-gen QA | [reference/qa-loops.md](reference/qa-loops.md) §Loop 5 |
| 9 Edit & post | `playbooks/forp-episode-engine/PLAYBOOK.md` §Phase 9 only (sound-first, assembly, post-only impact emphasis, Gate 3 order) |
| any budget question | [reference/credit-token-budget.md](reference/credit-token-budget.md) |

## Session protocol

1. Locate the episode folder `episodes/E<nn>-<slug>/`; its artifacts ARE the state
   (BLUEPRINT, ASSET-PLAN, VISUAL-BIBLE, PROMPT-BLOCKS, SHOTLIST, QA-LOG, FLAGS, LEDGER).
   Resume from files — never from memory. New episode → scaffold the folder from
   `episodes/_TEMPLATE/`.
2. Identify the current phase from artifact status fields; announce it; do only that phase.
3. Never skip a gate. The three human gates (shotlist lock / keyframes+animatic / final cut
   before upscale) always present an approval package: proposed action, `get_cost` preflight
   numbers, QA status, open flags. Proceed only on explicit approval.
4. Generation rules are absolute: keyframe-first; `get_cost:true` before every job; ledger row
   per take; on failure run triage (find → confirm → fix ONE variable → flag → approval) — a
   regeneration without a completed FLAGS.md entry is a protocol violation.
5. Keep chat output short: phase status, counts, decisions needed. The artifacts carry the detail.

## Hard identity rules (apply in every phase)

- Identity lives in Souls/Elements/anchor packs; motion prompts never describe appearance.
- One outfit = one anchor pack; wardrobe strings are verbatim from the DNA card.
- One Soul per generation; multi-character frames go through Elements / image_references.
- Never render the contact frame in fights; SETUP → IMPACT → REACTION, reaction always shown.
