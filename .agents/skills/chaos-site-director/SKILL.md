---
name: chaos-site-director
description: "Use for any work on the Curated Chaos scroll-driven 3D site (THE LIVING ARCHIVE — Night Wing): building or changing halls/sections, scroll choreography and text-timing cue sheets, WebGL/Three.js scenes, producing site assets via Higgsfield, or running the governance/choreography/asset QA loops. Invoke when the user mentions the site's visual style, scroll animations, 3D elements on the site, text timing, or site asset generation."
argument-hint: "[phase or hall]"
user-invocable: true
---

# Chaos Site Director — Orchestrator

Source of truth: `playbooks/chaos-site-style/STYLE-CONCEPT.md` (locked concept — read once per
work session). Phase map and loops: `playbooks/chaos-site-style/PLAYBOOK.md`. Load ONLY the
reference file the current work needs:

| Work | Load |
|---|---|
| Scroll/pin/timing, cue sheets, text sync | [reference/scroll-choreography.md](reference/scroll-choreography.md) |
| Effects, shaders, governance CI, ban list | [reference/vfx-vocabulary.md](reference/vfx-vocabulary.md) |
| Higgsfield asset production for the site | [reference/web-asset-pipeline.md](reference/web-asset-pipeline.md) |
| DOM/UI craft, components, layout | invoke `impeccable` (it loads PRODUCT.md/DESIGN.md itself) |

## Session protocol

1. Deviations from STYLE-CONCEPT.md are flagged decisions for the director — never silent drift.
2. Three human gates: (A) asset batch plan + `get_cost` preflights before any generation;
   (B) extracted-frame review (ivory threshold, worst-frame contrast, luminance audit) before
   ship-candidate; (C) final sign-off. Everything else runs under standing approvals.
3. Asset jobs run under the FORP generation protocol (one-shot discipline, triage-not-reroll,
   ledger): `.agents/skills/forp-episode-engine/reference/generation-protocol.md`.
4. The cue-sheet JSON is the single source of truth for text timing — build and QA both consume
   it; ad-hoc trigger offsets are banned.
5. Governance is structural: the lints and CI gates in vfx-vocabulary.md are build errors, not
   review notes. Never "just this once" a banned effect (no gradients, no bloom, no additive
   blending, no glitch, fast motion never).
6. Keep chat output short: phase status, gate packages, decisions needed.
