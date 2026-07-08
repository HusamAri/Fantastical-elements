# FORP Episode Engine

An ecosystem for producing **Fragments of Real People** episodes — 4–5 minute standalone
high-tempo action films with fantastical elements — at industry quality on a Higgsfield Creator
account, one-shot-first.

## What's here

- **[PLAYBOOK.md](PLAYBOOK.md)** — the master playbook: 10 phases, 5 QA loops, 3 human gates.
- **[RESEARCH-SOURCES.md](RESEARCH-SOURCES.md)** — the multi-source validation behind every
  practice: 6 research lenses → 104 candidate practices → 39 validated (2+ independent sources
  each) / 10 rejected, plus a 65-entry pitfall register and full bibliography.

## The skills (in `.agents/skills/`)

| Skill | Role |
|---|---|
| `forp-episode-engine` | Orchestrator — runs an episode through the phases; owns Loops 1 & 5; holds the shared reference standards |
| `forp-scenario-qa` | Loop 2 — logic errors in scenario, scene flow, shotlists |
| `forp-prompt-enhancer` | Loop 3 — every prompt copy-paste ready, self-contained, unique |
| `forp-continuity-guard` | Loop 4 — places, characters, objects, wardrobe valid vs the asset registry |

## The discipline in one paragraph

Lock the story, characters, world, and shotlist as text (free). Run the loops until two
consecutive clean passes each. Generate keyframe stills before any video, anchor-close-up and
wide-master first. Review all stills side by side, cut an animatic, get approval. Generate video
one planned take per shot with `get_cost` preflights and a ledger row per job. On any failure:
find the cause, prove it, fix one variable, flag it permanently, get approval — never re-roll.
Finish in the edit: sound first, one grade, impact frames in post, upscale only after picture
lock.
