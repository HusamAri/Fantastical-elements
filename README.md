# Fantastical-elements

An end-to-end interactive guide for visual language building in cinematic universes.

## FORP Episode Engine

Production ecosystem for **Fragments of Real People** — 4–5 minute standalone high-tempo action
episodes with fantastical elements, produced on Higgsfield at industry quality with one-shot
generation discipline.

- **Playbook:** [playbooks/forp-episode-engine/PLAYBOOK.md](playbooks/forp-episode-engine/PLAYBOOK.md)
  — 10 phases, 5 QA loops, 3 human approval gates. Every practice validated from 2+ independent
  industry sources ([research record](playbooks/forp-episode-engine/RESEARCH-SOURCES.md)).
- **Skills** (`.agents/skills/`):
  - `forp-episode-engine` — pipeline orchestrator + shared standards (asset registry, prompt
    standards, shotlist schema, generation protocol, QA loops, efficiency doctrine)
  - `forp-scenario-qa` — logic loop for scenario / scene flow / shotlists
  - `forp-prompt-enhancer` — copy-paste-ready, self-contained prompt loop
  - `forp-continuity-guard` — places / characters / objects / wardrobe validity loop
- **Episodes:** each episode lives in `episodes/E<nn>-<slug>/` (template in
  [episodes/_TEMPLATE](episodes/_TEMPLATE/README.md)); its artifacts are the pipeline state.

## Other skills

- `impeccable` — frontend design skill (externally sourced, see `skills-lock.json`).
