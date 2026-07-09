---
name: forp-episode-engine
description: "Use to produce a FORP (Fragments of Real People) episode end-to-end — 4-5 minute standalone high-tempo action episodes with fantastical elements on Higgsfield — or to run any phase of the pipeline: premise/blueprint, asset plan, character grounding, visual bible, shotlist, keyframes, animatic, video generation, post-gen QA, edit. Invoke when the user wants to start/continue an episode, plan generations, or asks anything about the FORP production pipeline. Enforces keyframe-first, one-shot generation discipline, and the three human approval gates."
argument-hint: "[episode slug or phase]"
user-invocable: true
---

# FORP Episode Engine — Orchestrator

**BINDING CONTRACT — read first, every session:** `playbooks/forp-episode-engine/GOVERNANCE.md`.
It is law and binds Claude too: the state machine is non-negotiable, no state advances until its
Definition of Done is 100% met and recorded in `STATE.md`, the user is kept to direction + the
three gates, real forks stop for options (never proceed on an unmade decision or spend credits to
discover an answer), wrong asks are refused-and-redirected, every inconsistency is flagged and
blocks advancement, and nothing generates without a locked reference (360° continuity of
characters, objects AND locations). If you are tempted to "just do the next thing," re-read
GOVERNANCE §2 — that temptation is the failure it prevents.

Master playbook (the *what* of each phase): `playbooks/forp-episode-engine/PLAYBOOK.md` (repo
root). Read it once per episode, at Phase 0. After that, load ONLY the reference file the current
phase needs:

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

0. **Read GOVERNANCE, then `STATE.md`.** `STATE.md` is the single source of truth for the current
   state and its Definition-of-Done checklist. Resume from it, never from memory or optimism.
1. Locate the episode folder `episodes/E<nn>-<slug>/`; its artifacts ARE the state
   (STATE, BLUEPRINT, ASSET-PLAN, BUDGET, DNA-<character> cards, VISUAL-BIBLE, PROMPT-BLOCKS,
   SHOTLIST, QA-LOG, FLAGS, LEDGER). New episode → scaffold the folder from `episodes/_TEMPLATE/`.
2. Announce the current state; do ONLY that state. **Do not begin the next state until this
   state's DoD is 100% satisfied and its boxes are checked in `STATE.md`** (GOVERNANCE §2). After
   any work, update `STATE.md`.
3. Never skip a gate. The three human gates (shotlist lock / keyframes+animatic / final cut
   before upscale) always present an approval package: proposed action, `get_cost` preflight
   numbers, QA status, open flags. Proceed only on explicit approval.
4. Generation rules are absolute: **no generation without a locked reference** (GOVERNANCE §7);
   keyframe-first; `get_cost:true` before every job; ledger row per take; on failure run triage
   (find → confirm → fix ONE variable → flag → approval) — a regeneration without a completed
   FLAGS.md entry is a protocol violation; look-discovery via paid generation is banned.
5. At a real fork Claude cannot resolve from direction/artifacts/obvious-default: STOP and present
   ≤3 options (recommendation first) or halt (GOVERNANCE §4) — never guess, never spend on an
   unmade decision. Refuse-and-redirect wrong asks (GOVERNANCE §5). Flag every inconsistency
   (GOVERNANCE §6). The user's job is direction + gates only; do all mechanical work yourself.
6. Keep chat output short: state status, counts, the decision needed. The artifacts carry detail.

## Hard identity rules (apply in every phase)

- Identity lives in Souls/Elements/anchor packs; motion prompts never describe appearance.
- One outfit = one anchor pack; wardrobe strings are verbatim from the DNA card.
- One Soul per generation; multi-character frames go through Elements / image_references.
- Never render the contact frame in fights; SETUP → IMPACT → REACTION, reaction always shown.
