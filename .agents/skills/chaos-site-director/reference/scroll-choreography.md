# Scroll Choreography & Text Timing — Night Wing

The scroll is the camera; text locations are the cut points. These rules are validated research
(see playbooks/chaos-site-style/RESEARCH-SOURCES.md) hardened into build law.

## Global scroll rig (non-negotiable)

- Lenis + ScrollTrigger canonical 4-line sync with `gsap.ticker` and `lagSmoothing(0)`; Lenis is
  the ONE scroll owner. `html { scroll-behavior: auto !important }`.
- ONE master timeline per hall, scrubbed by ONE ScrollTrigger. Scrub 1 on camera/light/mesh
  tweens; scrub 0.5 on display text. Pins in document order; function-based `end` values +
  `invalidateOnRefresh`; `fastScrollEnd: true`; `anticipatePin: 1`.
- Snap via lenis/snap at caption labels (`snap:'labels'` semantics) — never CSS scroll-snap.
- Step heights computed in px from `innerHeight` — never vh units for step containers.
- `ScrollTrigger.refresh()` after `document.fonts.ready`.
- Camera moves: quarter-arc orbital dollies only, on the locked CustomEase family
  (cinematicSilk / cinematicSmooth / cinematicFlow / cinematicLinear — registered at init).
  Text settles use the fifth registered ease **cinematicSettle** (= expo.out). The ease lint
  allows exactly these five, scoped: camera eases on camera/light/mesh tweens, cinematicSettle
  on text settles. Idle drift 1 rev / 90 s.

## Text-sync machinery (drift is impossible by construction)

1. **`data-beat` cue-sheet builder:** every text block carries `data-beat`. On init and on every
   `ScrollTrigger.refresh()`, the builder walks blocks in DOM order and stamps a fractional
   timeline label at each block's scroll position. Every camera/light/exhibit tween is placed AT
   those labels.
2. **Cue-sheet JSON** (one committed file per hall):
   `{ hall, label, timelineFraction, copy, contrastPairing, snapFlag, settleAnchor }` —
   consumed by BOTH the GSAP build and the QA scripts. Ad-hoc trigger offsets are banned.
3. **Text as mass:** each caption/H2 lands with an expo.out settle at the exact label where its
   exhibit (or light state) comes to rest — never a fly-in. The settle anchor is named in the
   cue sheet.
4. **Body-scrub lint:** any scrub flag on a Montserrat body element is a build error. Only
   Cormorant display type may scrub (SplitText char stagger 0.02 s, scrub 0.5).

## Caption grammar

Enter over the first 15% of the caption's scroll window → fully legible and resting for 70% →
exit over the last 15%. White/ivory Montserrat Light on flat panels or flat single-color scrims
only; AA contrast holds on the worst frame behind the text (CI-checked).

## Modes per hall

- Free scrub: Vestibule, Color Hall, Type Hall, Motion Study.
- Observer beat-mode (max 4 beats, degrades to free scrub if testing shows abandon behavior):
  Vapor Hall, FORP Room, Scars Room. Mobile never gets beat-mode.
- No pin at all: Reading Room, Registrar (the NN/g alternation valve — pinned halls alternate
  with normal flow).
- Pinned runway hard cap ~3,250vh total. QA may TRIM runways, never extend them.

## Section spec

The authoritative per-hall spec (S0 Vestibule … S7 Registrar, with percentages, snap labels,
beat lists and hidden-encounter windows) lives in STYLE-CONCEPT.md §4 — build from it directly;
do not re-derive.

## Reduced motion & mobile

- `prefers-reduced-motion` honored in CSS AND JS (matchMedia change listener kills and rebuilds
  triggers live): no pins, no scrubs; each hall renders as its composed Higgsfield still + full
  text in flow with opacity-only fades. The Reading Room aesthetic IS the fallback aesthetic.
- Mobile fork at 800px via `gsap.matchMedia` into the stacked static version; its media chain
  terminates in IMAGES (iOS Low Power rule).

## Loop B checklist (run to two consecutive clean passes)

**Static subset — the Phase 1 gate** (runnable before any build or asset exists): cue-sheet JSON
validates against the schema; timelineFraction/snapFlag values match STYLE-CONCEPT §4
percentages; every settleAnchor names a defined anchor; caption windows shaped 15/70/15.
The full checklist below runs at Phase 4, when build + stills exist.

- [ ] Cue-sheet JSON ↔ DOM `data-beat` blocks ↔ timeline labels agree (script-diffable)
- [ ] Every tween is placed at a cue-sheet label; zero ad-hoc offsets in the codebase
- [ ] Caption grammar 15/70/15 holds for every caption window
- [ ] Every display-text settle has a named physical settle anchor that resolves
- [ ] Snap labels exist exactly where the cue sheet says `snapFlag: true`
- [ ] Total pinned runway ≤ cap; per-hall runway matches spec ±5%
- [ ] Reduced-motion and mobile tiers show the full narrative (all copy present, stills per hall)
- [ ] Body-scrub lint, ease-vocabulary lint green
