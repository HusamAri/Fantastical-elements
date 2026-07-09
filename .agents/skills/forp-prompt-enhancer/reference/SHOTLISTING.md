# SHOTLISTING & STORYBOARDING — from beat sheet to buildable shots

A shotlist turns the story (SCREENWRITING.md) into an ordered, buildable list of shots. Every row is
one generation/clip. For AI video, the shotlist doubles as the prompt-planning doc.

## The professional shotlist columns
| Field | What it captures |
|-------|------------------|
| **Shot #** | ordered id (e.g. 1A, 1B for coverage of scene 1) |
| **Beat / scene** | which story beat it serves |
| **Size** | EWS / WS / MS / MCU / CU / ECU |
| **Angle** | eye / high / low / dutch / overhead / OTS |
| **Movement** | static / pan / tilt / dolly / push / pull / track / orbit / crane / handheld |
| **Lens** | wide (18–35) / normal (50) / long (85+) — psychological effect |
| **Subject / WHO** | who/what is in frame; screen side |
| **Action / WHAT-CHANGES** | the value shift in the shot (the reason it exists) |
| **Audio** | diegetic SFX / score / ambience cue for this shot |
| **Duration** | target seconds (sets pace) |
| **Transition** | cut / dissolve / wipe / match-cut into the next |
| **Notes** | 180° axis side, continuity, VFX, motion caveats |

**Example row:** `10 | interrupt | MS→MCU | eye, slight low | handheld shove + impact | 40mm | Husam,
screen-left, attacker screen-right | his discs are destroyed, he staggers (− turn) | disc-shatter
crack + sub-drop | 4s | shard-wipe out | keep him screen-left (180 axis); everything in motion`.

## How to build it from the beat sheet
1. **One beat → the minimum coverage that lands it.** Most short-piece beats need ONE strong shot;
   a key beat may need master + insert + reaction.
2. **Decide the size by emotion** (CU = intimacy/impact; WS = geography/scale), the **angle by power**
   (low = dominant, high = vulnerable), the **move by intent** (push = pressure, pull = reveal/aftermath).
3. **Author the axis**: pick the 180° line for the scene; note each shot's screen-left/right so cuts
   don't flip. (See DIRECTING.md.)
4. **Set duration to the rhythm** you want (short = tension, long = weight). Sum ≈ target runtime.
5. **Name the transition** into the next shot — it carries meaning (match-cut = link; wipe = scene change).

## Storyboarding
Rough frames (even stick figures) to test composition, eyelines, and screen direction BEFORE
generating. For us, the **locked keyframes ARE the storyboard**, and `STORYBOARD.html` is the board.

## Coverage principle
"Coverage" = enough angles of a beat to cut it together: **master** (establish geography) + **inserts**
(the detail: a disc, the evil-eye) + **reverses/reactions** (his face answering the hit). Short pieces
often skip full coverage, but always have: an establishing frame, the action frame, and the payoff frame.

## AI-video shotlist rules
- One row = one clip = one `start_image → end_image` pair for the seamless chain.
- Note **which keyframe is start, which is end**, and the **one motivated motion** connecting them.
- Note the **screen side** so the 180° axis holds across the chain.
- Flag HIGH-risk rows (big pose change, many objects) for extra QA.

## FORP N=17 shotlist
Already authored as `site/HERO-SHOTLIST.md` (beats, motifs, keyframes) + `episodes/E01-forp-hero-intro/
VIDEO-CHAIN.md` (the 16 start→end clip pairs). The per-beat camera plan lives in `CINEMATOGRAPHY.md`.
Keep all three in sync; the VIDEO-CHAIN table is the production shotlist for State 7.
