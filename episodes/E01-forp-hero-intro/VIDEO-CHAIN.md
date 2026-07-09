# E01 — Video chain (State 7)

**Method (director):** seamless start→end-frame clips, `start_image` = beat N keyframe, `end_image` =
beat N+1 keyframe → each clip morphs one locked frame into the next, chained into one flow. **Sound ON.**
720p first pass; upscale at State 9. One clip at a time · `get_cost` + LEDGER row + `vqa.py` endpoint QA
+ face-audit each.

**MODEL = Kling v3.0** (`kling3_0`, std, sound on). Chosen after A/B: seedance_2_0 drifts the END frame
(K1→K2 last-vs-K2 ncc −0.10 ✗); **Kling hard-locks BOTH endpoints** (first 0.99 ✓, last 0.965 ✓) and
costs ~10 cr vs 22.5. Gemini Omni Flash has no start/end roles (can't do endpoint morphs). Per clip:
author the LOGICAL motion + camera that carries frame N→N+1 (lesson V8), Kling prompt order
Scene→Characters→Action→Camera→Audio.

## Beat → keyframe UUID (N=17)
| # | Beat | Keyframe | Job UUID |
|---|------|----------|----------|
| 1 | Calm hero | K1 | c5f64e8c-e1a5-43bd-ab68-456a2ad2a04a |
| 2 | Shatter | K2 | 264b0f19-1f1b-4369-b2d5-2baf49ba152c |
| 3 | Agustín disc | K12 | 567654f3-5722-41c7-8855-4bb4abbaf31a |
| 4 | Action | K3 | a02cbc15-350d-4c2f-aab4-33407a76dbbf |
| 5 | Najoua lotus | K11 | 64b1226c-0f6c-4304-ae1b-226970890ab6 |
| 6 | Twin Spiral charge | K13 | c48ed63d-3e28-48b0-a144-5415125b6d2f |
| 7 | Twin Spiral throw | K14 | 98ab701e-c8b7-43f9-9f20-c58090e2b752 |
| 8 | Federica pendant | K8 | c6a5f493-396a-417d-80fa-e024905c9818 |
| 9 | Dodge | K6 | 402506da-e030-4866-900b-2c963b9e3095 |
| 10 | Spin interrupted | K15 | 33677d48-da01-473e-845a-e653dce8de55 |
| 11 | Başak evil-eye | K9 | 142f2014-2caa-43bd-a9ac-5ebc47c84b99 |
| 12 | Flame Inside | K4 | 95354518-a41c-4e06-895b-0202be3ca66f |
| 13 | Baver glass | BAVER | ad5ae059-8fbf-44b9-91e1-b36e6bcc9993 |
| 14 | Yaşar constellation | K10 | 6025b2b9-f6af-4035-bce0-40ee0fffff1c |
| 15 | Ultimate | K7 | b37a91bb-8038-4775-b187-4d1a33d5d8f1 |
| 16 | Flash → settle | K5 | c1b64585-a3f5-42f5-9596-d021f9b83d22 |
| 17 | CTA over settle | K5 | c1b64585-a3f5-42f5-9596-d021f9b83d22 |

## Clips = 16 gaps (start → end)
C1 K1→K2 · C2 K2→K12 · C3 K12→K3 · C4 K3→K11 · C5 K11→K13 · C6 K13→K14 · C7 K14→K8 ·
C8 K8→K6 · C9 K6→K15 · C10 K15→K9 · C11 K9→K4 · C12 K4→BAVER · C13 BAVER→K10 · C14 K10→K7 ·
C15 K7→K5 (flash between) · C16 K5→K5 (settle hold, optional / subtle drift).

## QA (per clip, before accept) — `tools/vqa.py` (OpenCV)
first frame ≈ start keyframe (ncc>0.8), last frame ≈ end keyframe (ncc>0.8), glitch spike_ratio<6,
mid-frames free of unwanted morphing. Endpoint preservation is the join-critical check.

## PHASE 1 — site assembly (State 8, locked 2026-07-09)
The site is **video-scrubbed**: the phase-1 film (C1→C6 concatenated, 30.29s @24fps, K1→K2→K12→
K3→K11→K13→K14) IS the scroll. Scroll scrubs the playhead; the clip morphs are the scene changes
(no cuts/wipes inside the take). Assets in `site/public/hero/`: `phase1.mp4` (source, sound on),
`phase1-scrub.mp4` (H.264 dense-keyframe `-g4`, silent, Safari), `phase1-scrub.webm` (VP9 `-g4`,
silent, Chromium/FF — also the only one this env's headless Chromium can decode for capture).
Re-encodes are LOCAL (imageio-ffmpeg), **zero credits**.

**Pacing (director rule: "tailor how many seconds between those frames, then tailor the length"):**
each frame-pair is a fixed ~5.05s of film, but its DWELL in the scroll is tailored per beat and the
page length = Σ(weights). Calm/reveal beats linger, action beats snap past (EDITING-SOUND §10).
Scroll weights (`src/hero.js` SPANS): title 1.1 · C1 shatter 0.9 · note 0.7 · C2 0.7 ·
**Agustín I 1.5** · C3 action 0.6·0.7 · **Najoua II 1.5** · C5 0.8 · charge 0.6 · C6 throw 0.8 ·
**CTA 1.6**. Σ=12.2 → `#hero-sec` height = 12.2×78 ≈ 950vh. Reveals/CTA get the most scroll; action
the least. Extend for phase 2 by appending clips + SPANS rows (holds for reveals, plays for motion).

## Log (job id · cost · verdict)
- **C1 K1→K2 (seedance_2_0)** · job `ddc4c67c` · 22.5 cr · **QA FAIL (endpoint):** first 0.969 ✓,
  last vs K2 **−0.10 ✗**, no cut. ⇒ seedance drops the end frame (V6). Rejected the model.
- **C1 K1→K2 (Kling v3.0, generic prompt, model test)** · job `6d4f71dd` · 10 cr · **QA PASS:** first
  0.990 ✓, last 0.965 ✓ (both endpoints locked), glitch 3.3 ✓. ⇒ Kling adopted for the chain.
- **C1 K1→K2 (Kling v3.0, choreographed)** · job `c96e30fd` · 10 cr · turn-right + disc-from-back +
  camera orbit + land defending (director choreo, V8) · **QA PASS:** first **0.990** ✓, last **0.971** ✓,
  glitch 2.7 ✓, motion 12.7 (turn+orbit present), sound on. Delivered to director. ✅ pipeline validated.
  _Next: deep-research Kling control + add @Husam ELEMENT for extra consistency (kling_element_ids)
  before running C2..C16._
- **C1 K1→K2 (Kling, FINAL, corrected method)** · job `4d5775ee` · 10 cr · motion-only prompt, action
  primary (attack→guard), axis held, all shards move · **QA PASS:** first 0.990 ✓, last 0.970 ✓,
  frozen 0 ✓, glitch 5.7 = the fast attack-whip (legit, confirmed by frame). Dynamic action (fixes V10).
  Delivered. ✅ **C1 locked.**
- **C2 K2→K12 (Kling)** · job `e697416f` · 10 cr · shatter shards coalesce → spinning vinyl disc ·
  **QA PASS:** first 0.998 ✓, last 0.961 ✓, frozen 0 ✓, glitch 1.7 ✓. ✅ **locked.**
- **C3 K12→K3 (Kling)** · job `a533c254` · 10 cr · disc launches, reveals him mid-throw + attacker ·
  **QA PASS:** first 0.997 ✓, last 0.994 ✓, glitch 3.2 ✓, 1 "frozen" cell = the static FLOOR (false
  positive, not a stuck shard). ✅ **locked.**
- **V12 (camera↔action sync) applied from C4 on** [hypothesis]: bind camera to action ("as he acts the
  camera tracks WITH him"), not a separate move. Sync-feel is a VISUAL check (metrics can't measure it).
- _raw clips tracked by job id, not committed to git (heavy); assembled at picture-lock._
- _method: Kling std, motion-only prompt (V11), action-primary (V10), all-objects-move (V9),
  camera↔action synced (V12), axis held (DIRECTING §C), QA every clip (vqa.py + frozen.py)._
- **PROCESS RULE (corrected 2026-07-09): ONE clip at a time.** Generate one → QA → deliver → WAIT for
  the director's go → next. NO parallel batching (GOVERNANCE §10). C4/C5/C6 were wrongly batched;
  they'll be QA'd one-by-one, and no further clip starts without director approval.
- **C7 K14→K8 (Kling v3.0, std, sound on)** · job `3b762485-5c47-4fdc-a630-e5fef0eec5f8` · 10 cr ·
  connecting logic: the twin glass discs streak forward and SHATTER into black-glass shards (V13 solid
  disc, not flame); the shards sweep R→L as a shard-wipe and the camera whips with them, clearing on
  Husam mid-lunge catching the falling lapis pendant from the disc-gate (K8). Motion-only (V11), all
  objects move (V9), camera↔action synced (V12). Director-approved single generation (2026-07-09).
  **Status: RENDERED + QA PASSED, awaiting director sign-off.** Result mp4 job `3b762485` →
  hf_20260709_055140. QA: start-lock vs K14 ncc=0.999 histCorr=1.000 (perfect); end-lock vs K8
  ncc=0.894 histCorr=0.993 (strong); glitch spike_ratio=2.3 (clean, <6); frozen cells=0; 5.04s@24fps.
  Face audit: Husam identity + locked costume consistent across the lunge, no warp. FLAG: mid-clip
  burst (~1.1–2.5s) renders fire-heavy and hand briefly fire-wreathed (~2.5s) — inherited from K14's
  locked glass-AND-fire disc; brushes the "flame-cast" look. Delivered to director with accept(A) /
  re-roll-with-suppressed-fire(B) choice.
  **DIRECTOR ACCEPTED (A) 2026-07-09** — C7 locked into the chain as-is.
- **C8 K8→K6 (Kling v3.0, std, sound on)** · job `6f31f4c3-3f05-4bcb-a6f6-933e86d1ffb3` · 10 cr ·
  connecting logic (continuous combat, NO scene gap): he closes his hand on the lapis pendant → a
  DARK force-bolt streaks in from the right → he reverses momentum and leaps BACKWARD to dodge, cape
  flaring, flicking two SOLID glass discs out (one per hand, thin ember-rim only — V13, no flame-cast);
  dark air detonates into black-glass shards; camera pulls back + pans left with the leap (V12), all
  objects move (V9), attack kept dark/not-amber to stay distinct from the fire flagged on C7.
  Director-approved single generation (2026-07-09).
  **Status: RENDERED + QA PASSED, awaiting director sign-off.** Result mp4 job `6f31f4c3` →
  hf_20260709_065159. QA: start-lock vs K8 ncc=0.996 histCorr=0.996 (near-perfect); end-lock vs K6
  ncc=0.929 histCorr=0.994 (excellent); glitch spike_ratio=1.8 (clean, <6); frozen cells=2 →
  (0,3) hovering disc-gate portal + (3,5) standing hooded-attacker silhouette (both meant to be
  low-motion, NOT stalled shards — benign); 5.04s@24fps. Face audit: Husam identity + costume
  consistent across the whole leap, no warp. Fire: incoming attack is DARK with only a small fire
  tip — no plume (cleaner than C7 on V13). Disc reads as a glowing amber ring at his hand rather than
  two distinct solid discs, but faithful to K6's fire-sigil disc keyframe. Delivered to director,
  recommended ACCEPT. **DIRECTOR ACCEPTED 2026-07-09** — C8 locked into the chain.
- **C9 K6→K15 (Kling v3.0, std, sound on)** · job `a72c93e2-985d-4400-ab23-f0a8f0c2668f` · 10 cr ·
  connecting logic (continuous combat, NO scene gap): he lands from the dodge → whips his two glass
  discs back to counter → the enemy's DARK strike catches him mid-cast → the discs DETONATE in a
  diegetic ORANGE blast of shattering glass (V13: solid discs destroyed BY the enemy's strike, not
  fire he casts) → he's thrown, torso twisting, one arm up, pained-defiant (K15). Camera shakes +
  pushes in on the hit then settles (V12); all objects move (V9). Director-approved single generation
  (2026-07-09). **Status: rendering → QA pending. HELD — no C10 until go.**
