# VFX Vocabulary & Governance — Night Wing

All spectacle comes from the legal set: **light, density, grain, displacement, parallax depth.**
Depth is what light cannot reach. Nothing emits.

## The keystone: DOM-flat / scene-light split

Codex tokens live in the DOM as FLAT fills only. Light falloff exists ONLY inside the rendered
3D scene, where it is photography. Section surface changes are opacity crossfades between flat
solid layers. Any CSS gradient function is a build error (stylelint
`declaration-property-value-disallowed-list`).

## Legal effects (the complete list)

1. **Raking-light reveal** — one key + rim rig, zero emissive, zero bloom; luminance-cap uniform
   clamped in the compose shader.
2. **Fog as depth & transition** — exponential fog colored exactly `#171D2D`; fog-swallow cuts
   are the default hall transition (outgoing exhibit sinks, one beat of pure wall + dust, next
   exhibit condenses).
3. **Velocity-gated film grain** — simplex on `gl_FragCoord`, 8%→12% opacity band with scroll
   velocity, decay 0.92. The compose pass contains grain and NOTHING else.
4. **Tectonic displacement** — capped sine `min(abs(v),5.0)*sign(v)*0.01`, lerp 0.05–0.15,
   momentum decay 0.92. Physical and self-settling — categorically not glitch.
5. **Lit dust (fake volumetrics)** — GPU-instanced depth-faded billboards inside the light cone;
   ~2,000 desktop / 512 mobile; NORMAL blending; per-instance luminance cap.
6. **Light-absorbing vapor** — pre-rendered stacked-alpha video, normal/multiply blending;
   corruption absorbs light, never emits (FORP law); 10-bit mezzanine against banding.
7. **Baked light** — AO/thickness/matcap baked from 4K renders; richness in the texture, not a
   post pass.
8. **Material-lerp morphs** — `uMorph` between two material states (e.g. stone → machined matte).
9. **Text-SDF deflection** — Scars room ONLY: particles/vapor deflect around glyph interiors.
   The edge-collecting/"ink drying" variant is BANNED (one exposure away from glowing
   letterforms). Type shapes the air; it is never outlined by it. Fallback: static keep-out
   volumes.
10. **Blind-emboss shader** — normal-map-only relief lit by a moving light vector; emboss color
    = surface color (recolor structurally impossible). Emblem normal maps derive from the owned
    vector, never AI-generated.
11. **SDF display-type offsets** — weight/tracking morphs only; body text never enters WebGL.
12. **Hairline geometry** — Line2/LineMaterial clamped to 1–1.5 CSS px across DPR 1/2/3.

## Ban list (structural, not taste)

| Banned | Enforcement |
|---|---|
| CSS gradient functions | stylelint disallowed-list |
| UnrealBloomPass / any bloom | repo lint over render pipeline |
| Additive blending | shader/code lint ("glow by another name") |
| Gradient scrims | flat single-color scrims only |
| Text scramble / glitch | SDF weight/tracking morphs are the substitute |
| Recolored emblem | same-color emboss by construction |
| vh-sized step containers | px from innerHeight only |
| Scrub on body copy | body-scrub lint |
| Eases outside the registered vocabulary (four camera CustomEases for camera/light/mesh tweens; cinematicSettle = expo.out for text settles) | ease-vocabulary lint |
| Camera spins, fast motion | choreography review; orbit-slow is law |
| Museum vocabulary in copy ("archive", "exhibit", "ACC.") | micro-label law: plate numbers, hex values, roman numerals only |

## CI gates (Loop A — all must be green to merge)

- [ ] stylelint gradient ban · no-bloom lint · no-additive lint
- [ ] Ease-vocabulary lint (camera eases + cinematicSettle scoping) · body-scrub lint ·
      blush-decorative + mauve-decorative-only token lint
- [ ] Worst-frame contrast: 4.5:1 body / 3:1 large over the busiest extracted frames behind any
      non-panel text
- [ ] Pixel-count on Vapor/FORP frames: subsurface purple ≤20% of frame, toxic green ≤5%
- [ ] Luminance-cap frame audit: no pixel outside a declared practical-light region above the cap
- [ ] Cue-sheet JSON is consumed by both build and QA (no orphan cue entries, no unregistered tweens)

Note: the human review of extracted frames (ivory Reading Room threshold, worst-frame contrast,
luminance audit) is NOT part of this automated CI list — it happens once, at HUMAN GATE B
(Phase 4). Loop A stays fully automated so Phase 3's "governance CI green" never blocks on a
person.

## Composition law

One exhibit, one caption, the rest is wall — ≥60% negative-space indigo per viewport. Every text
block projects a static keep-out volume (bbox + 96px) that dust/vapor/silhouettes may not enter.
One fully silent viewport (no text, no exhibit) inside the Scars room. The hummingbird appears
exactly three times (Keystone relief 78–85%, Registrar emboss, mote alignment at 61.8% of Scars)
and is never referenced in copy or nav.
