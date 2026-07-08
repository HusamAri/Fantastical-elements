# Shotlist Standard

The shotlist is the episode's single execution contract. Every generation traces to exactly one
row. If it's not in a row, it doesn't get generated.

## Row schema (all fields required — "n/a" must be written, never left blank)

| Field | Content | Why it exists |
|---|---|---|
| Shot ID | `E<ep>-S<scene>-<shot>` e.g. `E01-S03-040` | traceability across prompts, jobs, flags |
| Act / Beat | which blueprint beat this shot serves | kills orphan shots |
| Narrative purpose | one sentence: what the viewer must understand | "no decoration" test |
| Edit duration (s) | target length in the cut, per ASL class | pacing contract |
| Gen duration (s) | edit target + 1–3 s trim headroom, clamped to the model's min/max — the number the video prompt must carry | too-short takes are full regenerations |
| Frame-rate intent | normal / planned 5–15% speed-up / flagged slow-mo exception | feeds the post-only impact-emphasis rules |
| Shot size | ECU / CU / MCU / MS / MWS / WS / EWS | coverage grammar |
| Lens (mm) | from the lens-emotion table in the world bible | lens-emotion match |
| Angle & height | eye / low / high / overhead; camera height | staging clarity |
| Camera move | static / push-in / lateral track / handheld / crane + MOTIVATION | unmotivated movement is banned |
| Screen direction | L→R / R→L / neutral + eyeline/looking-room notes | 180° line integrity in fights |
| Eye-trace in/out | screen position where viewer attention enters and exits the frame | fast-cut legibility (<2s ASL sequences) |
| Setup group | same environment+lens+lighting cluster id | batch generation back-to-back |
| Priority | ESSENTIAL / NICE-TO-HAVE | what gets cut when budget tightens |
| State change | WHO does what, WHERE relative to others, WHAT CHANGED since previous beat | rows that can't answer are cut at the logic loop |
| Characters in frame | registry names only | continuity-guard hook |
| Wardrobe state | lock name + any sanctioned change (damage, sweat, blood) | wardrobe drift detection |
| Environment | registry/asset-plan name + zone within set | geography consistency |
| Light state | scene light state name (from `[LIGHT:*]` blocks) | light continuity |
| Props in frame | registry names | object continuity |
| Action beats | numbered beats with per-beat timing (5-beat structure for hits) | video prompt source |
| SFX/fantastical | element behavior in this shot, per `[PHYSICS]` | world-rule compliance |
| Audio intent | silent-gen default; note diegetic sound for edit phase | sound is an edit decision |
| Model + mode | video job spec, e.g. `kling3_0 / pro / sound off / 16:9` | no per-job improvisation |
| Image model + mode | keyframe job spec, e.g. `nano_banana_2 / 2k / 16:9` (Element-referencing) or `soul_2 + soul_id` | the pre-generation gate checks the image job too |
| Image prompt | full self-contained keyframe prompt | copy-paste artifact |
| Video prompt | full self-contained motion prompt | copy-paste artifact |
| Start/End frame | keyframe job/media id once approved; end_image if match cut | chaining contract |
| Continuity in/out | what must match the previous/next shot (positions, light, damage state) | edit-proofing |
| Risk class | LOW / MED / HIGH (new set, multi-char, complex physics) | draft-ladder trigger |
| Est. credits | from `get_cost` preflight | budget sheet |
| Status | DRAFT → QA-PASSED → LOCKED → KEYFRAME-APPROVED → GENERATED → ACCEPTED | gate tracking |

## Coverage rules for high-tempo action (4–5 min episode)

- **ASL targets set before listing:** action peaks 1.3–2.7 s, connective tissue 3–6 s,
  establishing/emotional holds 8–13 s. A 4–5 min episode lands around 70–110 shots; compute the
  count per act from the ASL targets and let it drive the credit budget. Vary shot length in
  waves — never constant tempo, and never open a fight at full throttle (no wind-up = no stakes).
- Every fight sequence is storyboarded as beats BEFORE shots: one primary movement per clip,
  3–8 s per clip; every exchange is a **SETUP → IMPACT → REACTION molecule** and never ends
  before the reaction beat — the reaction is what sells the hit.
- **Never render the contact frame.** Strikes travel along the camera axis or the impact point is
  occluded by the receiver's body or frame edge; cut, then show the reaction; sound sells the
  rest. (Also sidesteps AI interpenetration/morphing at contact points.)
- The 180° axis is AUTHORED per fight scene: record the line, camera side, and each fighter's
  screen direction in the rows. Cross only via the four legal moves — re-establishing wide,
  cutaway, on-screen camera move, neutral shot. Shot/reverse pairs carry gaze direction and
  looking-room in BOTH prompts and are QA'd as a unit.
- For sequences cut faster than ~2 s ASL: center-frame the point of interest and specify subject
  screen position explicitly in every image prompt; motion exiting one shot is picked up at the
  matching position and direction in the next (fill `Eye-trace in/out`).
- **Sustained two-character contact (grapple, throw, carry, choke) is never staged inside one
  generation** — identity blur at contact points is an unsolved model failure. Stage it across
  cuts, over-the-shoulder framings, and silhouettes; each side of the contact gets its own row.
- HIGH-risk fight rows may add a **previs/motion-control pass** (see generation-protocol.md):
  blocking locked via pose stills or a reference movement video before any paid video take.
- Alternate shot sizes on cuts (WS → CU, not MS → MS from the same axis; respect the 30° rule).
- Geography first: every fight set opens with an establishing/orienting shot before coverage
  tightens. Re-orient after any relocation within the set.
- Match cuts between shots use `end_image` → next shot's `start_image` where the cut must be
  invisible.
- Generate 1–3 s longer than the edit target when the model's duration granularity allows —
  trim room is cheap, extension is a regeneration.

## Scene continuity block (script-supervisor state)

Every scene opens with a state block in the shotlist, attached to all its rows:

```
SCENE <n> STATE — injuries carried: … | clothing condition per character: … |
props held (which hand): … | must be ABSENT from frame: … | light state: [LIGHT:<name>] |
time of day: … | axis: <180° line + camera side>
```

This block is the "continuity sheet" the F-CONTINUITY triage class points at, and the
continuity-guard loop verifies every row against its scene block.

## Serialization (what the scripts parse)

In `SHOTLIST.md` each row is written as a per-shot key-value block — one `Field: value` line per
schema field, with prompts as fenced blocks under `Image prompt:` / `Video prompt:` headings.
`scripts/forp_validate.py` parses exactly this layout (`Model:`, `Image model:`,
`Gen duration (s):`, `Video prompt:`); free-form tables are for humans, blocks are for machines.

## Lifecycle gates

1. **DRAFT** — row exists, fields filled.
2. **QA-PASSED** — survived Loop 2 (forp-scenario-qa), Loop 3 (forp-prompt-enhancer) AND Loop 4
   (forp-continuity-guard) with zero open findings.
3. **LOCKED** — director approved the row at Gate 1. After LOCK, any edit reverts status to DRAFT.
4. **KEYFRAME-APPROVED** — the still is approved under Gate 2's set-wide review (or, for a
   chained shot, the extracted handoff frame is approved); its media/job id is recorded in the row.
5. **GENERATED** — video job complete; output linked; ledger row written.
6. **ACCEPTED** — passed Loop 5 QC under the wave's standing approval; the shot enters the edit.
   Regeneration after ACCEPTED is forbidden without a FLAGS.md entry.
