# FORP Hero — Character Bible & Asset Lock (canonical)

This is the reference discipline that was missing. **The hero's look is LOCKED here.**
No new generation may deviate from this. If a new shot is ever needed, it must be
produced from these anchors (soul_id + wardrobe string), then continuity-checked
against this page before use.

## Identity (LOCKED)
- Higgsfield Husam **Soul**: `76fab95a-f542-47a4-9bbe-937981c52fef` (soul_cinematic / soul_2).
- **`@Husam` character Element**: `8c317956-18a1-4d78-ab84-4a0c8fa85ea0` — built from ~14 real
  multi-angle photos; strongest identity ref; use in Element-supporting models (Cinema Studio, Nano
  Banana, Seedream, Kling). Stack with the look Element below.
- Face law: cool, composed, realistic, symmetrical, undistorted. Visible fine pores, matte finish,
  detailed skin, clear eye catchlight. Never a hard glare, never warped.

## Look / Wardrobe LOCK — user-approved `c2ed37de` (supersedes the earlier navy costume)
- **`HusamHero` look Element**: `edfa0dcf-c416-40a6-99bb-3bdf072f2597` (from approved image
  `c2ed37de`) — carries costume + the disc-magic aesthetic; reproduce **one-to-one**.
- **Costume:** long black high-collar tunic-robe with fine bronze embroidered trim down the placket
  and cuffs, a wide black wrapped sash, and a long brown-taupe mantle-cape over one shoulder.
- **Palette / world:** gold + black colour-block; black-glass shards shattering & ascending in real
  3D depth; warm amber/gold fire accent; heavy filmic grain (never clean CG).
- **Signature magic + full ability kit:** see [`HERO-KIT.md`](HERO-KIT.md) — his original spun
  razor-glass **disc** mechanic (basic + 4 skills + Flame-Inside + ultimate). The disc is his canon
  weapon, an original design (not a franchise shield).
- To generate: stack `<<<8c317956…>>>` (identity) + `<<<edfa0dcf…>>>` (look) in the prompt; the
  Soul path (soul_cinematic + soul_id) is the fallback when Elements aren't used.

## Grade LOCK (Curated Chaos tone)
Moody desaturated but rich; deep indigo #171D2D + steel-blue shadows; a single warm
amber #E8A832 magic accent; crushed premium blacks; volumetric haze; fine filmic grain;
shallow depth of field. No bright open fire, no neon bloom, no CSS gradients on UI chrome.

## Locked production assets (in this repo / prepared for web)
| Beat        | Source job        | Web asset            | Role |
|-------------|-------------------|----------------------|------|
| Hero (calm) | b953e0f6 (v2b)    | hero-still.jpg       | Canonical still, left-third, sigil in open palm |
| Hero motion | 4b87a4e7          | hero.mp4 (calm)      | Scroll-scrubbed living spine — subtle breath/haze |
| Action      | e048a8f6 (actA)   | action.jpg (graded)  | Battle beat: fist-blast, shards, hooded attacker lunging |
| Shard wipe  | obsidian cutout   | shard.png            | Transition curtain (no cuts) + shatter particles |

## Continuity notes (known + handled)
- Action still coat cut/tone drifts slightly vs hero (soul locks face, not garment).
  Handled: cool color grade unifies tone; action is a fast beat behind motion/UI.
- FUTURE upgrade for frame-perfect wardrobe: build a reference **Element** from the
  hero still to lock the garment, then regenerate action from that Element. (One cycle;
  only do on request — not required for this site.)

## Fragments (real FORP assets — objects reveal each plate)
Base link: https://curatedchaos.artifactstudio.info/en/works/fragments/<slug>
| # | Fragment | Slogan | slug |
|---|----------|--------|------|
| I  | Agustín  | A minimalist visual poem about artistic awakening. | agustin |
| II | Najoua   | Kindness mistaken for weakness — until she spoke. | najoua |
| III| Başak    | From protective invisibility to deliberate presence. | basak |
| IV | Yaşar Efe| The figure who returns the blade to himself. | yasar-efe |
| V  | Baver    | A year of surviving panic without yielding. | baver |
| VI | Federica · Espera | Foglia d'Oro — the gold leaf beneath her skin. | federica |
