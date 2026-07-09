# KLING v3.0 — control reference (our video-chain model)

Kling 3.0 (Omni, Kuaishou, 2026): one model does t2v, i2v, **start+end frame**, **Elements**,
**multi-shot (≤6)**, native audio, up to 15s at 720p/1080p/4K, modes std/pro/4k. On Higgsfield MCP
`kling3_0`: media roles `start_image`/`end_image`, `mode` std/pro/4k, `sound` on/off, duration 3–15s.
(Sourced from kling.ai official guides, fal.ai schema, magichour/vicsee/atlascloud/invideo — 2026-07.)

## 1. Start→end frame logic (our chain primitive)
- **Describe ONLY the in-between motion + camera + what changes — NOT appearance.** The two frames
  already encode identity/wardrobe/scene; restating "bearded man in black robe" wastes the prompt and
  *fights* the images. (This corrects C1 v1/v2, which over-described him → see lesson V11.)
- **Motivated motion:** give one move (character + camera) that CAUSES the state/background change
  (camera cranes up *because* he rises, revealing sky). Beats "and now it's different."
- **Keep endpoints reconcilable:** same scene, lighting, lens/scale between start and end — a wide
  start + telephoto end confuses the model. Our locked keyframes share grade, so we're fine.
- **Longer duration = cleaner interpolation** for a big visual jump (give the motion room).
- Failure→fix: teleport/snap = frames too different → shorten visual gap; morph/melt = can't map A→B
  → same lighting + one clear verb; ignores end = prompt over-describes start → cut description;
  glitchy mid = no plausible path → same scene + more duration.

## 2. Scene management / chaining
- **Single continuous take** (our default per clip) = one unbroken motion, manual timing.
- **Multi-shot / Director Mode** (2–6 shots in one gen, auto-continuity) — reserve for a beat that
  needs internal coverage (wide→close). 3–4 beats max; balanced beat lengths; keep screen direction;
  arc calm→tension→release. `prompt` and `multi_prompt` are mutually exclusive.
- **Chain clips** by feeding clip N's last frame as clip N+1's start frame (our N=17 chain), same
  world/lighting. 5 cut patterns: Wide→Close, Action→Reaction, Movement-Match (invisible), Contrast,
  Time-Skip.

## 3. Elements / identity (and why our keyframes already cover it)
- Kling **Elements** = reusable character card, **4 distinct angles** (front, ¾L, ¾R, back) = best
  "Visual DNA"; front-only drifts. Referenced as `@Element1` in prompt.
- **Elements + start_image + end_image ARE combinable in one generation** (fal schema: `elements[]`
  alongside `start/end`; Kling `element_list` + `image`/`image_tail`).
- **On Higgsfield, character identity for Kling is carried via `--soul-id` (Soul), not a public
  "kling element id."** Our Soul: `76fab95a`. The `kling_elements`/`kling_element_ids` fields seen in
  job echoes are an internal surface → map to Kling `element_list`; validate before relying on them.
- **KEY for us:** our `start_image`/`end_image` ARE the locked, face-audited keyframes, so identity is
  already pinned at both ends (C1 first/last ncc 0.99/0.97). Elements/Soul are optional reinforcement,
  not required. Test soul-id as insurance on a character-heavy clip; don't block the chain on it.

## 4. Motion control
- Camera: plain film terms, **one primary move placed early** (pan/tilt/dolly/push/pull/track/orbit/
  crane/handheld). No contradictory stacked moves.
- **Motion Brush** (paint ≤6 regions + draw a trajectory) and **Motion Transfer** (a reference video
  supplies skeleton+camera motion; prompt only the scene/character) are Kling features but **not
  exposed on the Higgsfield `kling3_0` MCP** (only start/end/mode/sound). Note for future/manual use.
- Speed/slow-mo via wording + duration (no slider on the base I2V). Moderate motion; extreme spins
  glitch limbs.

## 5. Frozen-object prevention (lesson V9)
Give EVERY object a verb + an exit; add ambient motion (wind/dust/embers); weight/physics words;
negatives `static, frozen, motionless`; simplify (fewer objects, one primary motion). Prefer subtle
continuous motion over one dramatic action (avoids the mannequin freeze).

## 6. Prompt structure (Kling)
~50–100 words. Order: **Subject → Action → Environment → Camera → Lighting → Technical**, camera early.
For OUR start/end clips, **drop Subject appearance** (frames handle it) and lead with Action + Camera.

**Reusable negative prompt (copy):** `static, frozen, motionless, morphing, melting, distorted hands,
extra limbs, distorted joints, flickering background, jittery movement, shaky camera, changing facial
features, inconsistent identity, changing clothes, disappearing accessories, low quality, blur`

## 7. Our per-clip template (Kling, start→end)
`[Action: the motion that carries frame N into frame N+1, one continuous move, character action as the
PRIMARY motion] + [Camera: one primary move that motivates the background change] + [every object keeps
moving/exits — nothing frozen] + [grade: grainy analog gold-and-black, embers] + [Audio: chronological
SFX] + "single continuous take, no cuts, no hard zoom." Negative: <above>.` Then QA with vqa.py +
frozen.py (endpoints ncc>0.8, no glitch, no frozen cells).
