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

## Site visual style — THE LIVING ARCHIVE: Night Wing

Total restyle of the site as a scroll-driven 3D experience: exhibits wake under a moving
curator's light as you scroll, morph per section, and settle exactly where the text lands.

- **Playbook:** [playbooks/chaos-site-style/PLAYBOOK.md](playbooks/chaos-site-style/PLAYBOOK.md)
  — phases, three QA loops (governance CI, choreography/text-timing, asset validity), gates.
- **Locked concept:** [playbooks/chaos-site-style/STYLE-CONCEPT.md](playbooks/chaos-site-style/STYLE-CONCEPT.md)
  — winner of a 3-concept judge panel, criticisms resolved ([research record](playbooks/chaos-site-style/RESEARCH-SOURCES.md)).
- **Skill:** `chaos-site-director` (`.agents/skills/`) — orchestrates site work; drives
  `impeccable` for UI craft and the FORP generation protocol for Higgsfield assets.
- **Brand law:** [PRODUCT.md](PRODUCT.md) + [DESIGN.md](DESIGN.md) (from Brand Codex 2027) —
  auto-loaded by the `impeccable` skill.

## Other skills

- `impeccable` — frontend design skill (externally sourced, see `skills-lock.json`).
