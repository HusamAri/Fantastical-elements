# Chaos Site Style — Master Playbook

Total visual restyle of the Curated Chaos / Fantastical-elements site as a scroll-driven 3D
experience: **THE LIVING ARCHIVE — Night Wing**. Elements wake, morph and settle as you scroll;
every text block is a timeline anchor; all spectacle is codex-legal (light, density, grain,
displacement, depth — never glow, gradients or glitch).

- **Locked concept:** [STYLE-CONCEPT.md](STYLE-CONCEPT.md) — the winning concept from a
  3-concept judge panel (Living Archive 25 · HAVA 24 · Composing Room 20), with the losers' best
  mechanisms grafted in and every judge criticism resolved. This file is the source of truth.
- **Research record:** [RESEARCH-SOURCES.md](RESEARCH-SOURCES.md) — 5 lenses (scrollytelling
  craft, scroll-video tech, text-timing, Higgsfield→web pipeline, style exemplars), practices
  marked VALIDATED (2+ independent orgs) vs PROVISIONAL.
- **Brand law:** `PRODUCT.md` + `DESIGN.md` at repo root (from Brand Codex 2027) — loaded
  automatically by the `impeccable` design skill.

## Phase map

| Phase | Work | Gate |
|---|---|---|
| 0 Style lock | STYLE-CONCEPT.md read; any deviation is a flagged decision, never a drift | director approves deviations only |
| 1 Cue sheets | Per hall: cue-sheet JSON (`{hall, label, timelineFraction, copy, contrastPairing, snapFlag, settleAnchor}`) + `data-beat` blocks in DOM order | Loop B **static subset** clean ×2 (schema-valid; fractions/snapFlags match STYLE-CONCEPT §4; every settleAnchor defined; caption windows 15/70/15) — full Loop B runs at Phase 4 |
| 2 Asset production | Higgsfield batch per STYLE-CONCEPT §7 (~24 stills, ~10 video, 1 3D job; ≥40% credit floor) under FORP one-shot discipline | **HUMAN GATE A** — batch plan + preflights approved |
| 3 Build | Vite + TS + Three.js + GSAP/ScrollTrigger + Lenis per STYLE-CONCEPT §6; `impeccable` drives DOM/UI craft | governance CI green |
| 4 QA loops | Loops A/B/C below to two consecutive clean passes | **HUMAN GATE B** — extracted-frame review (threshold moment, worst-frame contrast, luminance audit) |
| 5 Ship | Perf floor verified (DPR≤2, mobile image tier, reduced-motion plates), payload 12–18MB | **HUMAN GATE C** — director sign-off |

## The loops

**Loop A — Governance (codex fidelity, structural not taste):**
stylelint gradient-function ban · no-bloom/no-additive lint · ease-vocabulary lint (four named
camera CustomEases on camera/light/mesh + cinematicSettle/expo.out on text settles; nothing
else) · blush-decorative + mauve-decorative-only token lint · body-scrub lint ·
micro-label law (no museum vocabulary in copy) · worst-frame contrast CI (4.5:1 / 3:1) ·
pixel-count CI on Vapor/FORP frames (purple ≤20%, green ≤5%) · luminance-cap frame audit
(anti-glow exposure gate). A violation is a build error, not a review note.
Details: [.agents/skills/chaos-site-director/reference/vfx-vocabulary.md](../../.agents/skills/chaos-site-director/reference/vfx-vocabulary.md)

**Loop B — Choreography & text timing:**
cue-sheet JSON is the single source of truth consumed by BOTH the GSAP build and QA scripts;
`data-beat` builder stamps fractional timeline labels at every text block on init/refresh (text
and 3D cannot drift by construction); caption grammar 15/70/15; snap at labels via lenis/snap;
runways may be trimmed, never extended (cap ~3,250vh); text-as-mass settle anchoring.
Details: [.agents/skills/chaos-site-director/reference/scroll-choreography.md](../../.agents/skills/chaos-site-director/reference/scroll-choreography.md)

**Loop C — Asset validity & budget:**
every Higgsfield job preflighted (`get_cost:true` where supported; `remove_background(video)`
has no preflight — its single gated test job is the cost probe) and ledgered; art-direct in 2D
before 3D/video;
keyframe-first for all video; one remove_background(video) test gates the alpha batch; mesh/texture
budgets enforced on arrival (≤3MB page, hero ≤50k tris, KTX2 1024–2048); one retake max without a
logged template change; ≥50% credit reserve target, ≥40% hard floor.
Details: [.agents/skills/chaos-site-director/reference/web-asset-pipeline.md](../../.agents/skills/chaos-site-director/reference/web-asset-pipeline.md)

## Skills / agents map

| Agent | Role |
|---|---|
| `chaos-site-director` | Orchestrator: phases, gates, loops A–C; owns the cue-sheet and asset ledger |
| `impeccable` (existing) | DOM/UI implementation craft — reads PRODUCT.md/DESIGN.md automatically |
| `forp-continuity-guard` (existing) | Reused for Higgsfield asset resolution when site assets reference FORP characters/worlds |
| FORP generation protocol (existing) | The one-shot discipline all site asset jobs run under |

## Provenance

Concept selected by a 5-lens research pass → 3 independent concept agents → 3-judge panel
(codex fidelity / feasibility / cinematic impact) → criticism-resolution synthesis. All research
multi-sourced; single-source practices are marked PROVISIONAL in RESEARCH-SOURCES.md.
