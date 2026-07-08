# QA Loops — Test, Check, Debug Before Any Credit Is Spent

Five loops. Loops 1–4 run on TEXT — they are free; they exist so that generation can be one-shot.
Loop 5 runs on generated takes before they enter the edit.

**Judge mechanic (all loops):** every automated check is a BINARY, SINGLE-CRITERION judge — one
question, pass/fail with the failing evidence quoted. Never a 1–10 score, never one mega-judge
across mixed criteria (validated: unreliable). A checklist item = one judge. Calibrate any new
judge on 20–30 hand-labeled examples to ≥70% agreement before it gates anything. The QA pass never
shares context with the pass that produced the artifact (fresh eyes rule — review in a separate
session/agent from generation).

**Deterministic checks run as scripts first (zero token cost):** before any judge pass, Loops 3–4
run `scripts/forp_validate.py` (prompt-scan / prompt-scan --video / registry-check / resolve /
duration-check). Script findings are fixed before LLM judges spend a single token on the same
artifact.

Loop mechanics (loops 1–4):
- A pass = run the full checklist, log findings, fix, re-run.
- Exit = **two consecutive clean passes** (the second pass proves the fixes didn't break something else).
- A finding is never fixed silently: it's logged (`finding → cause → fix`) in the episode's QA log,
  so recurring finding types become new checklist items.
- Findings are fixed at the artifact that owns them (upstream fixes beat downstream patches:
  a story hole found in the shotlist is fixed in the blueprint, then re-flowed down).

## Loop 1 — Structure loop (playbook / episode blueprint level)

Entry: episode blueprint draft (premise, beats, acts).
Checks:
- [ ] Detonation frame in 0–5 s; hook complete (protagonist + physical stakes visible) by 15 s;
      something irreversible by the 60-second mark
- [ ] Beat arithmetic: Act 1 out at ~1:00 (±10 s); midpoint spike inside 2:10–2:20; Act 2 out at
      ~3:40 (±10 s); climax inside the 85–90% runtime window
- [ ] No gap longer than 45 s between jolts/re-pricing moments anywhere in the beat sheet
- [ ] Mini unresolved beat present at each attention boundary (~1:00 / ~2:15 / ~3:40)
- [ ] Every act has a turning point; the climax is the episode's most expensive-feeling sequence
- [ ] Standalone test: a viewer who has never seen FORP understands stakes without narration
- [ ] Universe test: at least one canon anchor (character, place, motif) ties it to FORP
- [ ] The fantastical element obeys the world's `[PHYSICS]` — capabilities AND costs stated
- [ ] Runtime math: beats sum to 4–5 min including title/credits allowance
- [ ] Emotional temperature chart has variation (all-tension reads as flat as all-calm)
- [ ] Ending is earned: the resolution uses a capability/flaw established before the midpoint
Exit → beats are LOCKED. Downstream artifacts may not contradict a locked beat.

## Loop 2 — Logic loop (scenario, scene flow, shotlist) — `forp-scenario-qa`

Entry: scene breakdown + shotlist rows (status DRAFT).
Checks — scene level:
- [ ] Cause→effect: every scene is caused by the previous one (therefore/but — never "and then")
- [ ] Every character's location, knowledge and goal are trackable scene to scene; no teleports,
      no knowledge the character couldn't have
- [ ] Time of day / weather / injury state progress monotonically or with explained resets
- [ ] Chekhov audit: every planted object/ability pays off; every payoff was planted
Checks — shot level:
- [ ] Geography: shots within a scene respect one spatial map (draw it if contested)
- [ ] 180° line held or consciously broken with a bridge shot
- [ ] Action beats chain: each shot's `Continuity out` equals the next shot's `Continuity in`
      (positions, damage, held props, light)
- [ ] Reaction coverage exists for every impact
- [ ] No orphan shots (no beat), no starved beats (no shot)
- [ ] Durations sum to the scene's blueprint allocation ±10% (edit durations; Gen durations are
      per-row edit target + headroom, clamped to model minimums)
Exit → rows are logic-clean; QA-PASSED once Loops 3 and 4 are also clean.

## Loop 3 — Prompt enhancer loop — `forp-prompt-enhancer`

Entry: shotlist rows that are Loop-2-clean (logic passed) with draft prompts. (QA-PASSED status
requires Loops 2+3+4 all clean — Loop 3 runs on logic-clean rows, in parallel with Loop 4.)
Process per prompt: rewrite to schema → verify against prompt-standards.md checklist →
**stranger test simulation**: read the prompt with zero context and list everything a model must
guess; every guess is a defect → fix → re-verify.
Extra checks:
- [ ] Independence: prompt references no other prompt/shot/chat state
- [ ] Blocks verbatim (image prompts): identity/wardrobe/environment text is byte-identical to
      the Prompt Blocks
- [ ] Motion-only law (video prompts): zero appearance / wardrobe / environment-description /
      palette words — one binary judge, any such word = fail
- [ ] Uniqueness: no two prompts in the episode are identical (identical prompts = duplicated
      shot — send back to Loop 2)
- [ ] Every FLAGS.md rule (all episodes, not just this one) checked
Exit → prompts frozen into the rows; rows eligible for LOCK.
Any prompt changed AFTER Loop 4's last clean pass sends its row back through Loop 4's token sweep.

## Loop 4 — Asset validity loop (places, characters, objects, clothes) — `forp-continuity-guard`

Entry: shotlist rows + episode Asset Plan. (Runs in parallel with Loop 3 on logic-clean rows;
re-runs its token sweep on any prompt changed after its last clean pass.)
Checks:
- [ ] Every character/environment/prop/wardrobe token in every row resolves to the Asset Registry
      (exact element_id / soul_id) or to a scheduled item in the Asset Plan
- [ ] Every referenced id matches the UUID shape 8-4-4-4-12 hex (malformed ids fail only at paid
      generation time — catch them here)
- [ ] Combatant differentiation (per fight): the fighters' wardrobe silhouettes/palettes contrast
      with each other AND with the set palette; fail any fight where both fighters wear similar
      dark wardrobe or play backs-to-camera (the "amorphous blob" failure)
- [ ] Rows and prompts conform to the episode VISUAL-BIBLE (palette + max frame weights,
      forbidden-elements list, camera preset)
- [ ] Every row's content is legal against its scene continuity block (injuries, clothing
      condition, props-in-hand, must-be-absent list, light state, axis)
- [ ] Wardrobe states form a legal chain per character (clean → sweat → torn; never backwards
      without an explained reset)
- [ ] Multi-character shots use Elements (never a Soul); single-Soul rule respected in keyframe plans
- [ ] Each asset's own hard rules honored (e.g. uomo-v2: face never visible; iphone-15: screen
      always dark glass)
- [ ] Model compatibility: every referenced Element is used only with Element-supporting models
- [ ] New assets needed = listed in the Asset Plan with creation route (Soul still → Element, or
      Drive import → Element) and creation cost included in the budget sheet
Exit → rows are asset-clean; QA-PASSED once Loops 2 and 3 are also clean; LOCK-eligible when all
three pass.

## Loop 5 — Post-generation QC (drift gate + Netflix taxonomy)

Entry: every generated take (keyframe or video), before ACCEPTED status.

**Drift scrub** — frame-by-frame against the anchors:
- [ ] Face vs anchor pack (features, proportions, skin tone under this lighting)
- [ ] Wardrobe vs DNA card string (color, material, fit, accessories, damage state per continuity block)
- [ ] Hair state and continuity
- [ ] Body proportions and hands
- [ ] Style/grade coherence with the master and adjacent takes
- [ ] Transitions: first/last frames clean (models glitch at boundaries — mark trim handles)

Symptom-indexed fix table (apply at the owning artifact, then follow generation-protocol triage):
| Symptom | Fix |
|---|---|
| Face drift in motion | reduce described motion, two-still keyframing (start+end), or chain the best clean frame as a new start_image |
| Outfit mutation | strip every clothing word from the motion prompt (identity lives in the reference) |
| Flicker/boiling | shorter clip + film grain in post |
| Jerky/weightless motion | physics vocabulary ("natural weight distribution", real gravity terms), simpler single action |
| Unwanted camera moves | "Locked-down tripod shot." + explicit negatives (Kling) |

**Netflix QC taxonomy** — classify every finding as: soft focus / exposure / extraneous
content & AI artifacts / ghosting / sync. Disposition per finding:
- **FIX** — enters the failure triage protocol (root cause first, never a blind re-roll)
- **CREATIVE INTENT** — documented in the QA log, survives
- **BEST POSSIBLE** — documented model limitation, survives with a note

Scrutiny tiers: highest on locked Soul characters, wardrobe locks and central world elements;
standard on sets and props; light on incidental background. This taxonomy is the operational
definition of "Netflix level" — it is Netflix's own partner QC framework.

## Ordering

Loop 1 → Loop 2 → (Loop 3 ∥ Loop 4) → director LOCK (Gate 1) → keyframes → static review →
animatic (Gate 2) → video generation → Loop 5 per take → edit → picture lock (Gate 3).
Any post-LOCK change re-enters at the loop that owns the changed artifact.
