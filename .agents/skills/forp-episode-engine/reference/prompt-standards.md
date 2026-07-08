# Prompt Standards — Copy-Paste-Ready, Self-Contained

Every prompt in a FORP episode is a complete, standalone artifact. Anyone (or any tool) must be
able to take one prompt, paste it into Higgsfield, and get the intended shot — without reading
any other prompt, the shotlist, or the bible. That is the definition of "copy-paste ready".

## The self-containment law

A prompt NEVER:
- refers to another shot ("same as before", "continuing from the previous scene", "she is still
  wearing…"),
- relies on chat context or generation history,
- abbreviates a locked description because "it was already established".

A prompt ALWAYS restates, in full: character identity tokens, wardrobe lock, environment,
light, palette, camera. Repetition across prompts is correct and intentional — it is what makes
each prompt independent. The shared blocks come verbatim from the episode's locked
**Prompt Blocks** sheet (below), so repetition never drifts.

## Prompt Blocks (per episode, locked at Stage 2)

The episode defines named, frozen text blocks. Prompts are assembled from blocks + shot-specific
lines. Blocks are copied character-for-character — never paraphrased.

| Block | Content |
|---|---|
| `[CHAR:<name>]` | Identity: `<<<element_id>>>` placeholder (or Soul workflow note for keyframes) + the wardrobe-lock sentence from the Asset Registry |
| `[ENV:<name>]` | Environment description or `<<<element_id>>>` + fixed set dressing sentence |
| `[LIGHT:<scene>]` | Light sources, direction, color temps, named palette hexes |
| `[GRADE]` | Episode-wide palette + film-look sentence |
| `[PHYSICS]` | The world's fantastical-element rules in observable physical terms |
| `[NEG]` | Episode-wide negative list (e.g. "No lens flare. No slow motion. No text.") |

## Image prompt schema (keyframes — `nano_banana_pro`, or `soul_2` when a Soul identity pass is needed)

Field order is fixed:

1. **Subject** — `[CHAR:*]` block(s); pose and expression in observable terms.
   For `soul_2` identity passes (minting anchor-pack stills): pass the character's `soul_id` as
   the model parameter; the Subject field then carries NO facial description (the Soul owns the
   face) — only the DNA card's verbatim wardrobe string + pose/expression. Example:
   *"Wearing [wardrobe string]. Standing square to camera, arms relaxed, neutral expression,
   full body visible."*
2. **Environment** — `[ENV:*]` block; weather, time of day
3. **Lighting** — `[LIGHT:*]` block
4. **Fantastical element behavior** — only if in shot; per the world's `[PHYSICS]` rules, described
   as observable physics (density, weight, light interaction), never as "magic effects"
5. **Camera** — focal length (mm), angle, height, distance, depth of field
6. **Color palette** — named colors with hexes from `[GRADE]`
7. Terminator: **"Photorealistic."**

Banned words anywhere in the prompt: *cinematic, epic, beautiful, dramatic, stunning, amazing,
masterpiece, award-winning* — and any other abstract mood adjective. Describe observable physical
properties only. (The mood comes from light, lens and staging — not from asking for it.)

Two craft rules that replace the banned words:
- **Real hardware, not adjectives.** Name actual camera/lens language from the episode's locked
  camera preset ("35mm spherical prime, T2.8, eye level, 1.2m from subject") instead of style
  words. One camera preset per episode, defined in the visual bible, reused verbatim.
- **Imperfection anchors.** Every character/surface close-up carries at least one wear detail
  (sweat sheen, dust on jacket shoulder, scuffed knuckle, chipped plaster) — perfectly clean
  frames read as plastic AI output, and fight close-ups collapse without them.
- **Wardrobe verbatim.** Wardrobe is written as the DNA card's fixed string — identical
  character-for-character in every image prompt (no synonym swaps: "brown" never becomes
  "brunette"). Wardrobe words NEVER appear in video/motion prompts.

## Video prompt schema (`kling3_0` / `seedance_2_0`)

**Motion prompts describe MOTION ONLY.** Identity lives in the start_image / references — a video
prompt that re-describes a face, hair or wardrobe fights the reference and re-rolls the identity.
No appearance words in video prompts, ever.

Field order is fixed; subject + main action inside the first 20 words:

1. **Camera setup** — position, focal length, movement type with motivation, or the literal
   sentence "No camera movement." / "Locked-down tripod shot."
2. **Subject action as timed beat blocks** — per-second storyboard form ("0–2s: …; at second 3: …;
   3–5s: …"). Every motion gets a clock. For action beats use the 5-beat structure: anticipation
   (0.2–0.3 s) → motion burst → contact/displacement (occluded — never the visible contact frame)
   → environmental reaction → recovery. Duration-to-complexity split: ONE simple action per 5 s
   clip; multiple movements = 10 s+ or split into separate shots (the logic loop enforces this).
3. **Environmental response** — dust, debris, water, cloth, crowd; what the impact does to the set
4. **Fantastical element behavior with timing** — per `[PHYSICS]`
5. **Duration** — explicit seconds, equal to the shotlist row's **Gen duration** field (edit
   target + 1–3 s trim headroom, clamped to the model's verified range — Kling 3.0: 3–15 s;
   Seedance 2.0: 4–15 s). Sub-minimum edit targets (action peaks of 1.3–2.7 s) are reached by
   TRIMMING a minimum-length take in the edit, never by requesting sub-minimum clip lengths.
6. **Negatives** — `[NEG]` block + shot-specific ("No camera shake. No zoom.") — Kling supports
   negatives; do NOT port negative phrasing to models that mishandle it (e.g. Runway-style models
   invert them). Sanitize vocabulary for filter-sensitive models before submission.
7. **Ending restraint** — end on a settled body/world state; never "explosion of light",
   flash-outs, or unresolved blur.

**Seedance multi-shot header:** any `seedance_2_0` prompt covering more than one internal shot
opens with the structure header `Total: <X>s / <N> shots / <AR>` — omitting it is the most common
wasted-generation cause in the official guide.

## Chaining rule (image ↔ video of the same shot)

The keyframe prompt and the video prompt of one shot are built from the same locked scene FACTS
(same environment, lens and camera position, lighting, palette, wardrobe state, character
positioning) — but the two prompt TEXTS carry different fields:

- The **image prompt** states all of it explicitly (full schema above, blocks verbatim).
- The **video prompt** carries ONLY camera / timed motion / environmental response / fantastical
  behavior / duration / negatives. Identity, wardrobe, environment description and palette live
  in the `start_image` and references — never in the video prompt text (motion-only law).

The image is frame one; the video prompt describes only what happens next. In the video job, the
approved keyframe is attached as `start_image` (and `end_image` when the next shot's keyframe
must be hit for a match cut).

## Model-specific notes

| Model | Notes |
|---|---|
| `nano_banana_pro` | All ARs; 1k for drafts is false economy only if the shot is risky — default 2k; 4k reserved for hero frames / poster stills |
| `soul_2` | One `soul_id` only; used to mint identity-true stills that then become Elements |
| `kling3_0` | `start_image`+`end_image`; `sound off` by default; mode `pro` for finals, `4k` only via upscale decision; AR 16:9 default for episodes |
| `seedance_2_0` | Use when a shot needs image/video/audio references or multi-reference identity; `genre: action` for fight shots; `generate_audio: false` by default |
| Elements | `<<<element_id>>>` placeholders inline in the prompt text; multiple allowed — the only way to hold two characters in one single-image prompt. Multi-character VIDEO shots may alternatively use Seedance 2.0 `image_references` with separately tagged refs per character |
| Reference hygiene | When feeding a character reference to a video model, crop the clean face/identity region — never upload a full multi-view character sheet as one reference |

## Prompt QA (run by forp-prompt-enhancer — see qa-loops.md)

A prompt ships only when all are true:

- [ ] Self-contained (passes the "stranger test": a person with only this prompt and the Higgsfield
      UI produces the intended shot)
- [ ] Field order matches the schema above; every field present or explicitly "none"
- [ ] IMAGE prompts: all identity/wardrobe/environment text matches its Prompt Block verbatim
- [ ] Every `<<<element_id>>>` exists in the Asset Registry
- [ ] Every motion has a timing; total action fits the declared duration
- [ ] No banned adjectives; no unresolved pronouns ("she" with no antecedent in THIS prompt)
- [ ] VIDEO prompts only: zero appearance / wardrobe / environment-description / palette words —
      motion-only law (binary judge: any such word = fail)
- [ ] Gen duration / AR / model match the shotlist row (video duration = row's Gen duration)
- [ ] Every FLAGS.md rule (all episodes — flag rules are permanent and global) checked
