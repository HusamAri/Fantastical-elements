# PROMPT-LESSONS — the prompting learning loop (permanent, global, append-only)

Every prompting mistake that reaches the user becomes a permanent lesson here. The
`/forp-prompt-enhancer` loop **reads this file on every run** and enforces it, and **appends a new
lesson whenever a prompt fails** (in QA or per user feedback). This is the loop the user asked for:
mistakes are learned once, never repeated. Lessons are global across all episodes and the site.

Format per lesson: **MISTAKE → FIX** (+ a NEG token to add when relevant).

## Identity & wardrobe
- **L1 — Franchise names in prompts.** MISTAKE: writing "Marvel", "Doctor Strange", "Harry Potter",
  "Half-Blood Prince", or "make it like <IP>". FIX: never name IP; design an original form; let real
  works inform only palette/texture/light/feeling in generic photographic language. (GOVERNANCE §11)
- **L2 — Borrowed shape/ability.** MISTAKE: a floating flat rune-disc / mandala / portal-ring (reads
  as a known franchise). FIX: invent an original silhouette + ability; NEG: `rune circle, mandala,
  glowing disc, portal ring`.
- **L3 — Costumey / Halloween wardrobe.** MISTAKE: prompts yield cosplay/theatrical/LARP looks
  (cheap fabric, plastic sheen, generic wizard robe/cape). FIX: specify REAL designer construction,
  named premium fabrics matched wisely, tailored fit, real fabric behaviour, "photographed on a real
  person"; NEG: `costume, cosplay, halloween, theatrical, LARP, foam armour, plastic, polyester
  sheen, ill-fitting`.
- **L4 — Priest cassock / monk robe drift.** MISTAKE: high-collar long robe reads clerical. FIX:
  modern tailoring cues (structured collar, contemporary cut); NEG: `priest cassock, monk robe`.
- **L5 — Text-only wardrobe = drift.** MISTAKE: describing the outfit in text and expecting one-to-one
  continuity. FIX: lock the garment as a reference (Element/Soul/locked frame) and embed it; text
  reinforces, never carries, identity/wardrobe. (GOVERNANCE §7)
- **L6 — Vague jewellery/detail.** MISTAKE: "gold chain" rendered as a chunky rope chain. FIX:
  specify gauge/style exactly ("a fine layered gold chain", "a single slim bronze cuff").

## Magic & fantastical elements
- **L7 — Magic looks digital/CG.** MISTAKE: clean neon vector / glossy render. FIX: describe as
  photographed practical pyrotechnics — particulate embers, soot, dust motes, smoke tendrils, 35mm
  silver-halide grain, anamorphic spark flares, half-dissolving edges; NEG: `clean 3D/CG render,
  neon vector, glossy digital glow, smooth gradients, sharp hard edges`.
- **L8 — Fire-bending cliché.** MISTAKE: a fireball / fire-fist / literal flame blast. FIX: original
  particulate energy with a specified behaviour (e.g. gathering inward); NEG: `fireball, fire-fist,
  lightning, plasma bolt`.

## Framing & face
- **L9 — Wide shot → tiny low-res face → wrinkled/crooked.** MISTAKE: full/wide framing shrinks the
  face. FIX: medium shot (mid-thigh/waist up) so the face stays large + sharp; add "clean symmetrical
  undistorted face, visible fine pores, matte finish".
- **L10 — Intense glare / fire near the face.** MISTAKE: distorted expression, hot light on cheek.
  FIX: cool composed expression; keep the magic off the face plane.

## Palette & grade
- **L11 — Neon/garish on brand chrome.** MISTAKE: gaudy glow. FIX: one tasteful accent that
  harmonises with the palette; in-scene photographic light only; restrained "quiet luxury".

## Process (enforced by GOVERNANCE, restated for prompt authors)
- **L12 — Bulk generation.** One image / one video per step (4 only for concept/variance). (§8)
- **L13 — Look-discovery via paid gen.** Decide the look cheaply (text → one locked still), then
  reuse the reference. Never explore identity/costume by burning generations. (§8)
- **L14 — No preflight.** `get_cost:true` before every job; report spend after each. (§8)

## Costume credibility (from the costume-design workflow, 2026-07-08)
- **L15 — Trope nouns drift to cosplay.** MISTAKE: "robe / cape / armour / monastic / stand-collar
  full-length wrap" pulls the render toward cassock/fantasy. FIX: replace every trope noun with a
  real garment + textile + weight noun ("a tailored overcoat in boiled wool, canvassed shoulder");
  state "a tailored overcoat, not a robe or cassock"; add modern cues (suppressed waist, concealed
  closures, tapered trousers).
- **L16 — Stacked ancient signifiers = cosplay pile-on.** MISTAKE: toga fold + leather cuirass +
  shoulder mantle + fibula all at once. FIX: exactly ONE ancient gesture inside disciplined modern
  tailoring.
- **L17 — Accent as "magic/glow" reads CG.** MISTAKE: a neon/glowing accent renders as VFX. FIX:
  make the accent a physical in-world light with a substrate — a 1–2mm piping run on ONE seam, a
  hidden-lining flash at the cuff, a silhouette rim-light; NEG: `glowing runes, holographic, VFX
  glow, lens flare`.
- **L18 — Generic "black/red" → flat plasticky oversaturation.** FIX: build a three-step mineral
  field (oxblood, bordeaux/claret, warm red-biased near-black), every finish matte and
  light-absorbing, so the single amber line reads intentional and expensive.
- **L19 — Neon goes gaudy.** MISTAKE: neon as a filled panel or a cold hue. FIX: accent under ~5%
  of surface, one analogous warm hue (ember-amber that harmonises with the palette), as a
  line/rim/reveal only; NEG: `cyan neon, lime neon, magenta neon, icy-white neon`.
- **L20 — One wide frame can't carry a hero's identity.** FIX: pair the wardrobe prompt with a
  focal-length + framing spec (e.g. 85mm, ¾/portrait insert) and plan a separate tight face pass.
- **L21 — Research can silently drop a user brief.** MISTAKE: an optimisation (e.g. "remove the
  cape, it reads costumey") quietly discards something the user explicitly asked for. FIX: honor the
  brief and solve the risk within it (a couture matte-wool cape, not a satin hero cape); FLAG the
  tension to the user (GOVERNANCE §12) — never silently drop.

---
*Append new lessons below as they are learned. Never delete a lesson.*
