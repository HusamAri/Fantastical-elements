# Episode folder template

Copy this folder to `episodes/E<nn>-<slug>/` at Phase 0. These artifacts ARE the episode's state —
every session resumes from them, never from chat memory.

Governed by `playbooks/forp-episode-engine/GOVERNANCE.md`. `STATE.md` is the source of truth for
the current state and its Definition-of-Done ledger — read and update it every session.

| File | Created at | Locked at | Owner |
|---|---|---|---|
| `STATE.md` | Phase 0 (scaffold) | never (advance-only) | GOVERNANCE state machine — current state + DoD ledger; resume from here |
| `BLUEPRINT.md` | Phase 0 | Loop 1 clean ×2 + director | Loop 1 (structure) |
| `ASSET-PLAN.md` | Phase 1 | director | Loop 4 (continuity-guard) |
| `BUDGET.md` | Phase 1 | director (episode cap + funnel allowance) | generation protocol (updated from the ledger) |
| `DNA-<character>.md` | Phase 1.5 | director (one per character: DNA card, verbatim wardrobe string, anchor-pack element_ids) | Loop 4 + Loop 5 (drift reference) |
| `VISUAL-BIBLE.md` | Phase 2 | director (Phase 2 LOCK) | director; conformance checked by Loop 4 (palette/forbidden-list/camera preset) |
| `PROMPT-BLOCKS.md` | Phase 2 | director (with visual bible) | Loop 3 (prompt-enhancer) |
| `SHOTLIST.md` (incl. scene continuity blocks) | Phase 3 | Gate 1 | Loops 2, 3, 4 |
| `QA-LOG.md` | first loop pass | never (append-only) | all loops |
| `FLAGS.md` | first failure | never (append-only, rules are permanent) | generation protocol |
| `LEDGER.md` | first generation | never (append-only) | generation protocol |

Templates:
- `BLUEPRINT.md` → fill from `.agents/skills/forp-episode-engine/reference/episode-blueprint.md`
- `SHOTLIST.md` rows → schema in `.agents/skills/forp-episode-engine/reference/shotlist-standard.md`
- `PROMPT-BLOCKS.md` → block table in `.agents/skills/forp-episode-engine/reference/prompt-standards.md`
- `LEDGER.md` / `FLAGS.md` → formats in `.agents/skills/forp-episode-engine/reference/generation-protocol.md`

Status fields inside each artifact drive the pipeline phase — the orchestrator reads them to know
where the episode stands. Do not delete or rewrite locked sections; changes to locked artifacts
revert status and re-enter the owning loop.
