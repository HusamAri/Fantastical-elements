# FINAL STYLE CONCEPT — THE LIVING ARCHIVE: Night Wing (v2, judge-resolved)

Winner by judge total: **THE LIVING ARCHIVE — Night Wing (25)** over HAVA — Barometric Blue (24) and THE COMPOSING ROOM — Type as Set Design (20). This document is the Living Archive spine with the judges' flagged best_ideas from both losing concepts grafted in, and every judge criticism of the winner resolved. It is the source of truth for PRODUCT.md / DESIGN.md authoring and for the `.agents/skills/` playbook files.

---

## 1) Concept name + thesis

**THE LIVING ARCHIVE — Night Wing**

The site is the Curated Chaos universe's archive visited after hours: a sequence of dark halls where every artifact sleeps in Deep Indigo fog until the visitor's scroll carries a single raking "curator's light" across it — the exhibit wakes, orbits slowly, breathes vapor or dust, then sinks back into stillness as you pass. Restraint carries the spectacle: each viewport is one composed shot (one exhibit, one caption, ≥60% negative space), and all wonder is produced by light, fog, grain, and displacement — what light cannot reach, never what emits.

**v2 thesis amendment (resolves the "viewed, not inhabited" criticism):** the two universe alcoves are not vitrines you look INTO — they are rooms whose AIR you walk through. Crossing their thresholds, the hall itself floods with the universe's weather: the FORP alcove's own walls turn blue-hour navy and its sodium practical becomes the curator's light; the Scars alcove's air carries the golden-particle thermals and runs the cool→golden→balanced progression on the room, not on a diorama. The wing exhibits the visual language; the alcoves let you breathe it.

The archive metaphor is implied only — by light behavior, dust, hairline vitrine frames, ledger rules. **No copy anywhere names the conceit** (no "archive", "museum", "exhibit", "collection", "ACC." accession prefixes in UI text — see §2 micro-label law).

---

## 2) Full codex mapping

**THE GOVERNANCE KEYSTONE (grafted from HAVA):** hard DOM-flat / scene-light split. Codex tokens live in the DOM as flat fills only; light falloff exists ONLY inside the rendered scene, where it is photography. Any CSS gradient function is a build error — enforced by stylelint `declaration-property-value-disallowed-list` banning all gradient functions. Section surface changes are opacity crossfades between flat solid layers (SC 2.3.3-safe).

**Colors**
- `bg.deep #171D2D` — night-wing wall: global page background, Three.js scene fog color (fog IS the background; depth = what light cannot reach), and canvas clear color.
- `bg.plum #2B2139` — vitrine-interior shadow and the wall surface of the Vapor Hall and the two universe alcoves ("deeper room" cue).
- `bg.ivory #F4F1ED` — two room-scale surfaces (the Reading Room, the wing's one daylight room mid-site, and the Registrar footer paper) plus the face of every catalogue card.
- `accent.blush #DCC7CD` — a small flat seal printed once per hall on its catalogue card (a non-text decorative graphic, exempt from text-pairing rules, never carrying information) and the blush-stone mineral in the Color Hall. Never a UI tint, never a hover state (HAVA's blush-hover drift is explicitly NOT grafted — the judges dinged it).
- `neutral.gray #8A8F98` — Montserrat micro on DARK surfaces only (on Deep Indigo: 5.17:1, approved pairing recorded in DESIGN.md). On ivory surfaces (catalogue-card faces, Registrar paper) micro labels are Deep Indigo — gray on ivory computes 2.89:1 and fails AA. **Micro-label law (resolves the "stated metaphor" criticism):** labels are plate numbers and token data only — `PL. 04`, `#171D2D`, `II — 041%`. No `ACC.` prefixes, no museum vocabulary, no narrating copy. The metaphor lives in light and dust, not in words.
- `neutral.mauve #A79BAA` — decorative only: the 1px orbit ellipse in the Motion Study and tick marks on ledger rules. Never carries information (token-linted).

**Type** — Cormorant Garamond: one-thought H1/H2 per hall and exhibit titles; the only type allowed to scrub (SplitText char stagger 0.02s, scrub 0.5). Montserrat Light: every caption and small-caps micro at 0.12em tracking; always reaches and holds a full-opacity resting state (body copy never scrubs — enforced by lint, see §4).

**Grain** — single film-grain compose pass (the compose pass contains grain and NOTHING else): simplex on `gl_FragCoord`, baseline 0.08 opacity rising to 0.12 with scroll velocity, exponential settle at decay ~0.92. Felt at rest, faintly alive in motion, never seen.

**28px** — every catalogue/caption card and vitrine frame corner; made physical in 3D as the invisible 28px-radius rounded containment volume of the corruption vapor (the brand radius literally contains the chaos — the field's single most codex-true idea, retained as flagship). Grafted detail from Composing Room: real-time mesh edges are filleted so the projected fillet at resting camera depth reads ~28px on screen — the radius token exists in both worlds.

**Hairlines** — 1–1.5px on vitrine frames, ledger rules, section thresholds, the orbit ellipse; rendered in-canvas via Line2/LineMaterial clamped to 1–1.5 CSS px across DPR 1/2/3 (Composing Room graft). Hairlines are the ONLY chrome. New chrome element (HAVA graft, restrained): **the Registrar's Rail** — a fixed right-edge 1px vertical hairline with a sliding tick and gray micro labels in roman numerals only (`II — 041%`); scroll progress read as an instrument. It is the one persistent UI element; it never animates except the tick position.

**Orbit-slow** — all camera moves are quarter-arc orbital dollies on the locked CustomEase family (cinematicSilk / cinematicSmooth / cinematicFlow / cinematicLinear registered at init). Text settles use the fifth registered ease, **cinematicSettle** (= expo.out), per the text-as-mass rule. Nothing outside these five passes the ease-vocabulary lint: the four camera eases apply to camera/light/mesh tweens, cinematicSettle to text settles. Idle exhibits drift at 1 rev / 90s. The Motion Study exhibits the law itself.

**Hidden hummingbird** — three encounters, never in nav, no copy ever references any of them:
1. Carved in shallow relief on the BACK face of the hero Keystone, caught by the raking light only during scroll 78–85% of the hero act (unsnapped, blink-and-miss; pre-agreed with the owner so it is never "fixed" louder later).
2. Blind-embossed in the Registrar's ivory paper — a **same-color normal-map emboss** (HAVA graft: the emboss shares its surface's exact color, so the no-recolor law is structurally unbreakable), revealed only by a cursor-proximity light-vector shader over a paper normal map; touch devices get one slow raking pass when the footer enters view.
3. Ultra-secret (HAVA graft): at 61.8% of the Scars alcove, the golden dust motes' orbits align into the silhouette for ~2% of scroll. Mentioned nowhere.
The emboss/relief normal maps are **derived from the owned brand vector, never AI-generated** (Composing Room graft — the safest reading of the no-regenerated-emblem law).

**Negative space** — the DEFAULT composition law, not a mitigation: "one exhibit, one caption, the rest is wall"; ≥60% empty indigo per viewport; one fully silent viewport (no text, no exhibit — dust and fog only) inside the Scars alcove. Programmatically enforced (Composing Room graft): every text block projects a static keep-out volume (bbox + 96px) that dust, vapor, and exhibit silhouettes may not enter — negative space made physically un-violable.

**Accessibility** — approved pairings only (Ivory↔DeepIndigo, Ivory↔Plum; Blush on Indigo large-only; body 4.5:1 / large 3:1). All body/caption text in DOM on flat panels or flat single-color scrims. Worst-frame contrast validated by automated CI over the busiest extracted sequence frames behind any non-panel text.

**Ban list, enforced structurally (not by taste):** no UnrealBloomPass (repo lint rule), no additive blending ("glow by another name" — code-review ban + shader lint), no CSS gradient functions (stylelint), no gradient scrims (flat single-color only), no text scramble/glitch (SDF weight/tracking morphs are the legal substitute), no recolored emblem (same-color emboss makes it impossible), no vh-sized step containers, no scrub flags on body copy (lint).

---

## 3) The morphing 3D element system, per site section

**TIER 1 — two persistent elements on the singleton canvas, adapting continuously:**
- **THE CURATOR'S LIGHT** — one key rig (spot + rim, zero emissive, zero bloom) whose azimuth/elevation/intensity/temperature are GSAP proxy properties scrubbed across the whole journey. Temperature arc: near-dark vestibule → blue-hour cool (#1A2744-tinted) → sodium amber #E8A832 in the FORP rooms → warm gold → balanced ivory at the Reading Room. The light is the protagonist; exhibits wake because it arrives. **Glow-adjacency resolution:** the rig's output runs through a hard luminance-cap uniform clamped in the compose shader, and a CI frame audit (see §6) fails the build if any pixel outside the practical-light disc exceeds the cap — exposure drift cannot ship.
- **THE DUST FIELD** — one GPU-instanced mote system (~2,000 desktop / 512 mobile, NORMAL blending, per-instance luminance cap) whose density/drift/albedo adapt per hall: still archive dust → mineral glints → thermal shimmer near the vapor → golden particles in Scars → almost nothing at the Registrar. Motes are visible only inside the light cone (depth-faded lit billboards — fake volumetrics, no god-ray shader).

**TIER 2 — the exhibits (hard cap: exactly THREE real-time; everything else pre-rendered — tightened from four to resolve the scope criticism):**
1. **Keystone stele** (hero; Higgsfield GLB ≤50k tris; hummingbird relief as an in-engine normal-map decal on the back face).
2. **Letterform sort** (a carved Cormorant ampersand extruded in-engine from SDF — zero 3D credits; material lerps rough-stone → machined-matte as the section's copy crosses serif → sans: the type lesson as a material morph).
3. **Orbit study** (small stone circling a larger one on a visible 1px mauve ellipse — `motion.orbit.slow` displayed as a law of physics; meshes are texture-swap reuses of two Color Hall minerals — zero extra credits).

Pre-rendered exhibits: the five **mineral specimens** (Color Hall — pre-rendered turntable WebP sequences per specimen, scrubbed; demoted from real-time to cut the boundary-jank surface), the **contained corruption vitrine** (stacked-alpha vapor inside the 28px volume, hairline-framed), and the two **universe rooms** (full-bleed frame-sequence environments — no longer dioramas-in-vitrines; the camera is inside the weather).

**TIER 3 — transitions:** the screen-space scene-morph shader is CUT (judge 2's complexity/perf tax). Hall handoffs are **fog-swallow cuts** (Composing Room's codex-legal fallback promoted to the default): the outgoing exhibit sinks into fog colored exactly `bg.deep`, one beat of pure wall (dust only), the next exhibit condenses out. One continuous take, zero bespoke transition shaders, and the boundary beat doubles as the enforced negative-space viewport. **Single-system handoff rule:** at any hall boundary only fog + dust render; the outgoing scene is disposed before the incoming scene's first lit frame.

**TEXT AS MASS (HAVA graft, the timing backbone):** every caption/H2 beat is anchored to a physical settle — the same fractional timeline position that brings its exhibit (or light state) to rest lands the type on its baseline (expo.out settle, never a fly-in). Text/3D sync is a structural property, not a tuning pass.

Every hall carries exactly one hidden gesture (hold pointer still over a specimen → the light lingers and a plate detail surfaces) — rewarded discovery, never announced.

---

## 4) Scroll + text choreography spec

**Global rules (validated research, unchanged):** Lenis + ScrollTrigger canonical 4-line sync with `lagSmoothing(0)`; ONE master timeline per hall scrubbed by ONE ScrollTrigger; scrub 1 on camera/light/mesh, scrub 0.5 on text; `snap:'labels'` at every caption beat via lenis/snap (never CSS scroll-snap); `fastScrollEnd:true` + `anticipatePin:1`; pins in document order; function-based ends + `invalidateOnRefresh`; `html{scroll-behavior:auto !important}`; step heights computed in px from `innerHeight`, never vh; `ScrollTrigger.refresh()` after `document.fonts.ready`. Caption grammar: enter over first 15% of its window, rest fully legible 70%, exit last 15% (NN/g). Free scrub in atmospheric halls; GSAP Observer beat-snap ONLY in the Vapor Hall and the two universe rooms (max 4 beats; degrades to free scrub + snap labels if testing shows refresh/abandon behavior); mobile gets no beat-mode.

**Text-sync machinery (grafted, now structural — resolves "less structurally guaranteed"):**
- **data-beat cue-sheet builder (Composing Room):** every text block carries `data-beat`; at init and on every `ScrollTrigger.refresh()` a builder walks blocks in DOM order and stamps a fractional timeline label at each block's scroll position. Every camera/light/exhibit tween is placed AT those labels — text and 3D cannot drift by construction.
- **Cue-sheet JSON (HAVA):** one committed file per hall — `{hall, label, timelineFraction, copy, contrastPairing, snapFlag, settleAnchor}` — consumed by BOTH the GSAP build and the QA scripts. Single source of truth; ad-hoc trigger offsets are banned.
- **Body-scrub lint (Composing Room):** the builder refuses (build error) any scrub flag on a Montserrat body element — NN/g's law encoded so AI agents cannot regress it.

**Section by section (pinned runway hard cap ~3,250vh, trimmed from 3,800+; QA may trim runways, never extend):**
- **S0 VESTIBULE** — pinned 500vh, free scrub. 0–10% darkness, dust only, H1 rests center; 10–35% raking light rises frame-left across the Keystone, H1 exits via SplitText char stagger 0.02/scrub 0.5; 35–60% quarter-arc orbital dolly (cinematicSilk), caption card 1 enters 38%, rests to 55%, exits by 60%, snap label 46%; 60–85% light sweeps the stone — at 78–85% the rake crosses the back face and the hummingbird relief catches light (no caption, no snap label); 85–100% fog-swallow to Hall I.
- **S1 COLOR HALL** — pinned 600vh, free scrub. Five specimen beats at 12/28/44/60/76%: light passes to the next mineral turntable sequence, its catalogue card (token name + hex + role; blush seal on card 1 only) lands at the identical label; snap on all five; 84–100% all five rest dim-lit in one composed row under an H2.
- **S2 TYPE HALL** — pinned 400vh. 0–20% glyph asleep, Cormorant display line scrubs in; 20–50% glyph turns under light in char-stagger lockstep; 50–75% `uMorph` 0→1 stone→matte placed at the exact label where the DOM caption crossfades Cormorant→Montserrat; 75–100% rest + micro-caption of the two-typeface law.
- **S3 VAPOR HALL** — pinned 500vh, Observer beat-mode, 4 beats: (1) containment — vitrine hairlines light up, plum walls; (2) stirring — vapor frames 0→45; (3) pressure — velocity displacement at cap, amber practical, caption on a flat Deep Indigo scrim; (4) settle — frames 45→60, light recedes. White captions, frame-precise; 3-second-hook dwell per beat.
- **S4 MOTION STUDY** — pinned 250vh, free scrub. Scroll advances orbit phase 0→270°; on scroll-stop the orbit continues autonomously at 1 rev/90s — the site's one autonomous motion, legal because it IS the exhibited law; caption card draws the CustomEase curve as a 1px hairline path.
- **S5 READING ROOM** — NO pin, normal flow (the NN/g alternation valve). Pearl Ivory; codex plates as 28px cards with static imagery. **Threshold (criticism #1 resolved, twice over):** primary — the curator's light widens to fill the 3D frame (in-scene lighting event = photography), then a hard hairline-edged cut to flat ivory DOM (no UI gradient ever exists); named governance checkpoint reviews extracted frames of this moment before merge. Engineered fallback if tuning fails — a full-viewport flat ivory panel slides to cover on a hairline edge (opacity/transform between flat solids only). Both paths are gradient-impossible by the stylelint ban.
- **S6a FORP ROOM** — pinned 500vh, beat-mode, 3 beats. Full-bleed blue-hour Istanbul environment sequence; the ROOM's light is sodium; lateral camera dolly while the text track stays strictly vertical (NN/g). Vapor drifts past the text keep-out volumes.
- **S6b SCARS ROOM** — pinned 500vh, beat-mode, **4 beats** (within the max-4 rule): (1) cool — scene under cool light, the **text-SDF deflection** moment (§5.9) on the display headline; (2) golden — particle alpha layer peaks; (3) SILENCE — full-viewport, no text, no exhibit, dust and fog only (snapFlag true, copy null — the dwellable silent viewport §2 requires); (4) balanced — resolution light state. Mote-alignment secret at 61.8% of the hall's scroll, inside beat 2's window.
- **S7 REGISTRAR** — normal flow. Ledger table with hairline rules, credits as plate entries, ivory paper footer with the cursor-revealed same-color emboss.

**Reduced-motion tier:** matchMedia (CSS AND JS with live change listener) kills all pins/scrubs; every hall renders as its Reading-Room-style static plate (composed Higgsfield still + full text in flow, opacity-only fades). The Reading Room aesthetic IS the reduced-motion aesthetic — the fallback is a designed room, not a degradation; its stills are line items in the §7 batch.

---

## 5) Codex-legal VFX vocabulary

All spectacle from the legal set — light, density, grain, displacement, parallax depth. The compose pass contains grain and nothing else.
1. **Raking-light reveal** — single key + rim on PBR/baked materials; no emissive, no bloom (absence is a repo lint rule); luminance-cap uniform in the compose shader.
2. **Fog as depth** — exponential fog colored exactly `bg.deep #171D2D`; depth is what light cannot reach; fog density is also the transition mask (fog-swallow cuts).
3. **Velocity-gated film grain** — simplex on `gl_FragCoord`, 0.01 strength, mixed by `uScrollVelocity*0.1`, 8%→12% band, decay 0.92.
4. **Tectonic displacement** — capped sine `min(abs(v),5.0)*sign(v)*0.01`, lerp 0.05–0.15, momentum decay 0.92 — physical, self-settling, categorically not glitch.
5. **Lit dust (fake volumetrics)** — instanced depth-faded billboards inside the light cone; NORMAL blending, per-instance luminance cap (additive banned).
6. **Light-absorbing vapor** — pre-rendered stacked-alpha video, normal/multiply blending — corruption absorbs light, never emits (FORP law); 10-bit mezzanine against banding.
7. **Baked light (Lusion)** — AO/thickness/matcap baked from 4K renders; richness lives in the texture, not a post pass.
8. **Material-lerp morphs** — `uMorph` blending two material states (stone→machined matte).
9. **Text-SDF deflection (Composing Room graft, de-risked)** — in the Scars room ONLY: the display headline renders offscreen to an SDF texture; golden particles and vapor DEFLECT around glyph interiors and counters. **Deflection only — the edge-collecting/"ink drying" variant is explicitly banned** (judge 1: rimming type with luminous particles is one exposure away from glowing letterforms). Type shapes the air; it is never outlined by it. If the SDF path underperforms on mid-tier GPUs, the mandatory keep-out volumes are the graceful fallback and the moment still reads.
10. **Blind-emboss shader** — normal-map-only relief lit by a moving light vector (scroll-driven on the Keystone, cursor-driven on the Registrar paper); emboss color = surface color.
11. **SDF type offsets** — in-canvas display type morphs weight/tracking via SDF offsets (glitch/scramble stripped); body text never in WebGL.
12. **Hairline geometry** — Line2/LineMaterial clamped 1–1.5 CSS px across DPR; orbit traces mauve, decorative only.

Explicitly absent: bloom/glow passes, any gradient, chromatic aberration, scramble/glitch, additive particles, recolored emblem, camera spins, fast motion.

---

## 6) Tech stack + performance / reduced-motion budgets

**Stack:** Vite + TypeScript + vanilla Three.js (no React; drei ScrollControls explicitly not used) + GSAP (ScrollTrigger, Observer, CustomEase, SplitText) + Lenis (defaults; canonical 4-line sync; lenis/snap). ONE scroll owner. Singleton WebGL canvas outside any container that ever changes; hall scenes as load/dispose modules (off-screen halls issue zero draw calls). GSAP animates plain proxy objects applied each frame; every hall <5 shots, so hand-placed proxy tweens (Theatre.js documented as the escalation path only).

**Asset pipeline:** every GLB through gltf-transform/gltfpack — Draco for statics, meshopt if anything animated ever ships; KTX2 (uastc/etc1s) textures at 1024–2048px. ONE shared Khronos 1.0 page budget: all real-time meshes together ≤3MB / hero ≤50k tris; measure every AI mesh on arrival, decimate to budget, never ship as-generated. Frame sequences: ffmpeg → WebP q80, ≤1920px, 60–90 frames/scene (~3–5MB), ImageBitmap-decoded, individual files over HTTP/2, per-section promise preload before pin activation. Alpha: remove_background(video) → stacked-alpha AV1/HEVC via `stacked-alpha-video` (10-bit `yuva444p10le` mezzanine); HEVC .mov listed first for Safari; luma-matte in-shader as the no-alpha fallback.

**Performance floor:** DPR ≤2; all repeated geometry instanced; render loop paused when no 3D on screen; single-system handoff at hall boundaries (fog+dust only — resolves boundary-jank risk); three-tier ladder decided pre-first-render (full / device-tiered light / static); ResizeObserver only; mobile fork at 800px via gsap.matchMedia into a stacked static version whose media chain TERMINATES IN IMAGES (iOS Low Power law); desktop payload target 12–18MB with per-section preload and network tiering to the still tier; test on pre-M1 Safari (Lenis 60fps cap is fine for orbit-slow; watch position:fixed).

**Reduced-motion:** honored in CSS and JS (matchMedia change listener kills and rebuilds triggers live); full narrative as composed stills + text in flow; opacity-only fades; zero pins.

**Governance-as-CI (HAVA's enforcement suite grafted wholesale):**
- stylelint gradient-function ban (DOM cannot violate the gradient law);
- no-bloom / no-additive-blending lint over the render pipeline;
- worst-frame contrast checker (4.5:1 body / 3:1 large) over busiest extracted frames behind any non-panel text;
- pixel-count checker on Vapor/FORP frames: subsurface purple ≤20% frame, toxic green ≤5%;
- luminance-cap frame audit: no pixel outside a declared practical-light region above the cap (the anti-glow exposure gate for the light rig + motes);
- ease-vocabulary lint (the four named camera CustomEases on camera/light/mesh tweens + cinematicSettle/expo.out on text settles; nothing else); blush-decorative + mauve-decorative-only token lint; body-scrub lint;
- cue-sheet JSON as the single source of truth consumed by build AND QA.

**Repo integration:** this concept authored into PRODUCT.md + DESIGN.md at repo root (loaded by the `impeccable` skill); ease family, ban list, cue-sheet schema, CI gates, and budgets become `.agents/skills/` reference files.

---

## 7) Higgsfield asset production list (routes + rough credits)

**Discipline:** `get_cost:true` preflight on every job that supports it (generate_3d/image/video and upscale_image; upscale_video never used). `remove_background(video)` has NO preflight — the single gated alpha-test job doubles as the empirical cost probe, its actual credits recorded in the ledger before the alpha batch is authorized. Art-direct everything in 2D before any 3D or video job. Locked prompt templates per family; keyframe-first for all video; ONE paid remove_background(video) test gates the entire alpha batch; one retake max per clip without a logged prompt-template change; 4K masters archived, delivery always downscaled.

| # | Asset | Route | Jobs |
|---|-------|-------|------|
| A | Keystone stele | 3 nano_banana_pro stills (front/¾/back; hummingbird NOT in prompt — normal-map decal in-engine from the owned vector) → 1 multi_image_to_3d → gltfpack ≤50k tris | 3 img, 1 3D |
| B | Five mineral specimens (now pre-rendered) | 5 stills from one template (mineral + token hex varies) → 3 video turntables; minerals 4–5 are ffmpeg/LUT hue+curve regrades of extracted turntable frames (0 credits, no generation) → 5 × ~45-frame WebP sequences | 5 img, 3 vid |
| C | Letterform | extruded in-engine (zero 3D credits); 1 still for carved-stone material texture | 1 img |
| D | Corruption vapor | 2 kling3_0/seedance clips (two-clip bridge loop; purple ≤20%/green ≤5% in prompt; check media roles via models_explore) → remove_background(video) → stacked-alpha + 60-frame scrub extraction | 2 vid |
| E | Golden-particle layer (Scars) | 2 clips, same bridge method, on black → stacked-alpha | 2 vid |
| F | FORP room environment | 1 keyframe still (blue-hour Istanbul, full-bleed room) → 1 video job, slow lateral dolly → 60–90 WebP frames | 1 img, 1 vid |
| G | Scars room progression | 3 stills of one scene under cool/golden/balanced light (nano_banana edit chain from one master) → 2 bridging video jobs → concat → ~90 frames | 3 img, 2 vid |
| H | Reduced-motion / mobile / OG tier (planned UP FRONT) | ~10 composed 4K stills, one per hall key beat — these ARE the mobile tier and the reduced-motion plates | 10 img |
| I | Registrar paper texture | 1 still (grain itself procedural, free) | 1 img |
| — | Orbit study meshes | texture-swap reuse of two mineral looks applied to two simple in-engine primitives | 0 |

**Totals:** ~24 stills, ~10 video jobs, **1 3D job** (down from 4 — minerals demoted to pre-rendered turntables, orbit reuses primitives), 2 remove_background(video). Rough spend at typical Creator-plan rates: stills ~150–300cr, video ~1,000–1,500cr, 3D ~50–150cr → **~1,200–2,000 of 6,000 credits, with a ≥50% reserve target and a ≥40% hard floor**; every job preflighted; nothing repeated without a logged template change. Pressure valve: if video preflight exceeds ~1,800cr, mineral turntables drop 3→2 (looks 3–5 via the zero-credit ffmpeg/LUT regrade route) before any hero asset is touched.

---

## 8) What was grafted, from where, and why — and how each judge criticism was resolved

**Grafted from HAVA — Barometric Blue (24):**
1. **DOM-flat / scene-light hard split + stylelint gradient ban** — all three judges called it the definitive gradient-ban mechanism; it converts the Archive's riskiest surface (the light-temperature arc, the ivory threshold) from a taste call into a merge gate.
2. **Cue-sheet JSON consumed by both build and QA** — single source of truth for the owner's text-timing requirement; kills beat drift.
3. **Text-as-mass settle anchoring** — makes text/3D sync structural (judge 3's "less structurally guaranteed" resolved).
4. **Pixel-count CI (purple ≤20% / green ≤5%) + worst-frame contrast gate** — the only mechanism in the field that makes FORP percentages measurable; extended here with the luminance-cap frame audit as the anti-glow exposure gate.
5. **Same-color normal-map emboss** — makes the no-recolor emblem law unbreakable by construction.
6. **Registrar's Rail (barometer hairline)** — pure codex chrome (hairline + gray micro), restrained to roman numerals; judges flagged it as a best idea and it gives the long wing an instrument-grade progress read.
7. **61.8% mote-alignment secret** — near-zero cost (motes already instanced), maximal "discovered, not announced" payoff.
8. **Inhabitation principle** — the universe rooms flood the hall with the films' air instead of showing dioramas (judge 3's "wing about the films, not the films' air" resolved).

**Grafted from THE COMPOSING ROOM (20):**
1. **data-beat cue-sheet builder** — DOM text positions stamped as fractional timeline labels at init/refresh; text and 3D cannot drift by construction (all three judges: graft regardless of winner).
2. **Body-scrub lint** — NN/g's body-copy-never-scrubs law as a build error.
3. **Static keep-out volumes (bbox + 96px)** — negative space physically un-violable by dust/vapor (cheap static form, not the full orbit solver).
4. **Emblem maps derived from the owned vector, never generated.**
5. **Fog-swallow cut promoted to the default hall transition** — replaces the cut screen-space morph shader.
6. **Text-SDF deflection in the Scars room** — judge 3 asked for it as the flagship type-choreography effect; de-risked per judge 1 by banning the edge-collecting variant (deflection only, never outlines).
7. **Line2 DPR-clamped hairlines + ~28px projected fillets** — the radius and hairline tokens made real in 3D.

**Judge criticisms of the winner → resolutions:**
- *Ivory Reading Room gradient tightrope (J1, J2)* → dual-path threshold (in-scene light event + hard hairline cut; engineered flat-panel fallback), stylelint making a CSS gradient impossible, and a named governance checkpoint on extracted frames. No longer unproven-by-design: both paths are gradient-impossible.
- *Curator's light + 2,000 motes one tweak from glow (J1)* → luminance-cap uniform clamped in the compose shader + per-instance mote caps + the CI luminance frame audit; additive blending is a lint error, not a review note.
- *Accession dressing states the metaphor (J1)* → micro-label law: plate numbers, hex, roman numerals only; all museum vocabulary banned from copy; metaphor carried by light/dust/hairlines exclusively.
- *Scope / five bespoke shader systems / build-heavy (J2)* → screen-space morph CUT (fog-swallow default); real-time exhibits 4→3 (minerals demoted to pre-rendered turntables); 3D jobs 4→1; pinned runway 3,800+→~3,250vh with a trim-only QA rule; bespoke shader systems 5→3 (emboss, material lerp, scoped SDF deflection).
- *Boundary jank on mid-tier GPUs (J2)* → single-system handoff rule: fog + dust only at hall boundaries; dispose-before-load; pass-skipping.
- *Metaphor familiarity / artifacts viewed not inhabited (J3)* → the two universe rooms are full-bleed inhabited weather, not vitrines; the wing's second half is the films' air itself.
- *Text timing less structurally guaranteed (J3)* → data-beat builder + cue-sheet JSON + text-as-mass: three interlocking structural mechanisms.
- *(Carried forward as accepted design, pre-agreed with owner)* the 78–85% Keystone hummingbird stays blink-and-miss — codex-correct; the Registrar emboss is the reliable encounter and the mote secret the deep one.
