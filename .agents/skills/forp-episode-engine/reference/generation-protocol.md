# Generation Protocol — One-Shot Discipline

The most expensive failure in this pipeline is a regeneration. Credits are spent at generation
time; everything before that is free thinking. So generation is treated like a film shoot day:
nothing goes in front of the camera until every department has signed off, and a failed take
triggers an investigation, not another take.

## The prime directive

**Never regenerate on failure.** When an output is wrong:

1. **STOP.** No new Higgsfield jobs for this shot. Not "one quick retry".
2. **Diagnose.** Classify the failure using the triage taxonomy below. Find the root cause.
3. **Verify the diagnosis.** State the evidence that this IS the cause (e.g. "the wardrobe drifted
   because the prompt described the coat instead of using `<<<federica-destruccion>>>`"). If the
   evidence is ambiguous, the diagnosis is not done.
4. **Fix.** Apply the fix at the artifact level (prompt, reference element, shotlist row) — not by
   re-rolling and hoping.
5. **Flag.** Append an entry to the episode's `FLAGS.md` (format below). The flag is permanent —
   it becomes a rule check in the prompt-enhancer loop so the same failure can never recur.
6. **Approval gate.** Present diagnosis + fix + flag to the director (the user). Only after
   explicit approval does the corrected generation run.

Healthy generations run under **wave approvals**, not per-output stops (more than 2–3 gates per
episode causes rubber-stamping — validated finding). The mechanics:

- Gate 1 (shotlist lock) authorizes keyframe generation for all LOCKED rows.
- Gate 2 (keyframe set + animatic) authorizes video generation in named waves — each wave's
  approval lists the exact shot IDs and their preflighted costs.
- Per-output stop-and-approve applies ONLY to: any failure (triage path below), HIGH-risk rows,
  and the first take of a new character/setup combination (the anchor takes).

## Pre-generation gate (all must pass — checked by the loops, signed by the operator)

- [ ] Shot exists in the LOCKED shotlist with all fields filled (see shotlist-standard.md).
- [ ] Prompt passed the prompt-enhancer loop: copy-paste ready, self-contained, no reference to
      any other prompt or "previous shot".
- [ ] Prompt passed the continuity-guard loop: every character/place/object/wardrobe token
      resolves to the Asset Registry or the episode Asset Plan.
- [ ] All prior FLAGS.md rules checked against this prompt.
- [ ] Model + mode + duration + aspect ratio match the shotlist row exactly.
- [ ] `get_cost: true` preflight run; cost recorded in the budget sheet; episode budget not exceeded.
- [ ] For video: the approved keyframe (start_image) exists and its job/media id is recorded in
      the shotlist row. Never generate video from an unapproved keyframe.

## Order of operations (credit ladder — cheap truth before expensive truth)

1. **Text is free.** All QA loops run to exhaustion before any generation.
2. **Stills before motion — keyframe-first is absolute.** Never text-to-video for a narrative
   shot. Every shot's keyframe image is approved before video is attempted; the image defines
   scene/identity/light/framing, the video prompt adds only motion and camera.
3. **Keyframe generation order** (drift stays attributable):
   - **Anchor scene first.** Per character/setup: generate the single most important clean
     close-up, get it approved, record its id. Then step outward changing exactly ONE variable
     per generation — new setting same angle, then new angle same lighting — never two at once.
   - **Master first.** Per fight set: the wide master (full bodies, full geography) is generated
     and locked BEFORE any tighter coverage; all coverage must match the master's positions,
     light, wardrobe and axis. The master is also the continuity reference for Loop 4.
4. **Static continuity review.** All approved keyframes laid side-by-side in shot order:
   reverse-shot lighting, wardrobe, palette weights, eyelines, geography. No video credit before
   this review is clean.
5. **Animatic gate (HUMAN GATE 2).** Cut the stills at target rhythm with temp sound; fix logic,
   axis and rhythm errors on cheap frames. Director approves keyframes + animatic → video begins.
6. **Previs/motion-control pass (HIGH-risk fight rows only).** Before paid video takes on the
   hardest fight beats, lock the blocking cheaply: pose stills for positions/lenses, or a
   reference movement video (single subject, clear movement, clean background) fed through
   Kling Motion Control (`motion_control`) / Seedance `video_references` — so the model paints
   over locked geometry instead of inventing blocking. Appears in the ledger like any take.
7. **Video draft ladder by risk class.** LOW risk → ONE final at the locked spec, directly.
   MED/HIGH risk (complex action, multi-character, new environment) → one cheap no-audio draft,
   lock the prompt, then ONE final at the locked spec. **Draft and final stay in the same model
   family**, and the rungs are family-specific (verified parameter surfaces):
   - Seedance finals: draft on `seedance_2_0_mini` or `seedance_2_0` mode `fast` (≤720p),
     final on `seedance_2_0` mode `std` 1080p.
   - Kling finals: Kling has no resolution tiers — draft on `kling3_0` mode `std` sound off,
     final on mode `pro`.
   If the final runs on a different family, the locked prompt goes back through Loop 3 for the
   dialect transform (negatives support, Seedance header) before submission. Never iterate on
   the premium tier — premium retake rates are what burn accounts. Drafts are planned rungs,
   not re-rolls; they appear in the ledger.
8. **Dual-keyframe chaining** where a cut must be invisible: extract the outgoing take's final
   clean frame (trim glitchy boundary frames first), present it for approval like any keyframe,
   record its media id in the incoming row's Start/End frame field (this counts as that row's
   KEYFRAME-APPROVED), then use it as `start_image` (or set `end_image` to the next keyframe).
   Never pair start/end frames that differ in color/style/lighting; the start frame's aspect
   ratio governs the clip. Chained shots generate AFTER their upstream take is trimmed —
   re-verify the actual handoff frame post-trim.
9. **Finals at the shotlist's locked spec.** Upscale (`upscale_video`) after picture lock instead
   of regenerating at higher resolution — never upscale before the edit locks (paying to 4K
   footage that gets cut).
10. **Sound:** `sound: off` / `generate_audio: false` on ALL drafts and on finals unless the row
    explicitly requires native audio — audio adds ~50–100% cost and sound design is an edit-phase
    decision.
11. **Toggle audit on every submission:** cinema mode, camera motion, upscale, sound — hidden
    toggles turn a ~6–14 credit clip into 70–80+. `get_cost` preflight makes the real number
    visible; the ledger records expected vs actual.
12. **Salvage before regenerate:** prefer targeted fixes over full re-rolls, using the account's
    verified edit surface — trim in the edit, `reframe` (aspect), `upscale_image` /
    `upscale_video`, `outpaint_image` (stills), `remove_background`. Extend/continue or inpaint
    style operations exist on some platforms — verify availability via `models_explore` before
    planning around them.

## Failure triage taxonomy

Classify before fixing. One primary cause per failure.

| Code | Cause | Typical evidence | Fix lives in |
|---|---|---|---|
| F-PROMPT | Prompt under-specified or contradictory | Model followed the words, words were wrong | Prompt (re-enhance) |
| F-REF | Wrong/missing reference (Soul, Element, start_image) | Identity/wardrobe/set drift while prompt is correct | Asset plan / registry |
| F-MODEL | Wrong model or mode for the job | Motion physics, multi-character, duration limits | Shotlist row (model column) |
| F-CONTINUITY | Prompt valid alone but breaks episode continuity | Wardrobe/light/geography mismatch vs adjacent shots | Shotlist + scene continuity block (shotlist-standard.md) |
| F-CONCEPT | The shot design itself doesn't work | Even a perfect render would fail the story | Shotlist / blueprint (upstream) |
| F-PLATFORM | Model limitation or transient platform behavior | Correct prompt, correct refs, repeatable artifact | Escalate: redesign shot around the limitation — do NOT brute-force retry |

## FLAGS.md entry format

```
## FLAG-<episode>-<nn>
- Date:
- Shot: <shot id>
- Failure class: F-...
- What happened: <one sentence>
- Root cause (verified): <evidence>
- Fix applied: <artifact + change>
- New rule for prompt-enhancer: <imperative check>
- Approved by director: yes/no (date)
```

## Generation ledger (LEDGER.md, per episode — every job gets a row, drafts included)

| Column | Content |
|---|---|
| Take id | `<shot id>-t<n>` |
| Model + mode + toggles | exactly as submitted |
| Prompt version | pointer into the shotlist row's prompt history |
| Expected credits | from `get_cost` preflight |
| Actual credits | from the job result |
| Verdict | ACCEPTED / SALVAGED / FAILED(F-code) |
| Failure cause | verified root cause (F-code + one line) or n/a |

The ledger is the project's own empirical database: takes-per-kept ratios, real per-model costs,
recurring failure classes. It replaces third-party credit tables and generic industry ratios —
those were researched and explicitly rejected as unreliable (see RESEARCH-SOURCES.md §4).

## Budget sheet (`BUDGET.md`, per episode — created at Phase 1, updated from the ledger)

| Field | Rule |
|---|---|
| Episode credit budget | Set at Phase 1, from current `balance()` — never more than 40% of remaining account credits for a single episode |
| Raw-footage funnel | Plan finished-to-raw at ~1:2–1:3 in seconds — budget the funnel, not per-shot optimism |
| Credit expiry notes | Monthly plan credits don't roll over; top-ups expire ~90 days — plan waves accordingly |
| Per-shot estimate | From `get_cost` preflights at lock time |
| Spent | Updated after every job (from the ledger) |
| Regenerations | Count per shot — target 0; any value > 0 must have a FLAGS.md entry |
| Kill rule | At 80% of episode budget with shots remaining: stop, re-plan remaining shots (cheaper modes, fewer shots, ESSENTIAL-priority only, reuse takes) with the director before any further job |
