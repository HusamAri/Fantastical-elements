# FORP Episode Engine — GOVERNANCE (binding operating contract)

**This document is law. It binds Claude and the user equally.** Where any other file, habit,
convenience, or in-the-moment instinct conflicts with this contract, this contract wins. The
[PLAYBOOK](PLAYBOOK.md) says *what* each phase does; this file says *what may not be skipped,
who decides what, and when Claude must stop, refuse, or flag.* If you (Claude) are reading this
mid-task and are tempted to "just do the next thing" — that temptation is the exact failure this
document exists to prevent. Follow the machine.

---

## 0. The Prime Directive (the only success metric)

The finished video is **film-grade**: high-quality, detailed, finely detailed, and it holds
**360° continuity of characters, objects, and locations** — a face, a garment, a prop, and a
room read as the *same* face, garment, prop, and room from every angle and in every shot. Nothing
else — not speed, not credit-thrift, not "good enough for a website," not the user's impatience,
not Claude's — is allowed to trade this away. Credit-thrift and one-shot discipline exist
*because* they serve this metric (waste comes from re-rolling drift), never as ends that excuse a
weaker result.

If a shortcut would make the output simpler or less consistent, it is forbidden even if requested.

---

## 1. Division of labour — two lanes, minimal user effort

There are two lanes, and they do not cross.

**The CREATIVE lane belongs to the user.** The user directs *what the film is*: story and premise,
characters, wardrobe/clothes, locations and scene, lighting and mood, palette intent, the feeling.
These are the user's calls; Claude realizes them faithfully and does not overrule taste.

**The PRODUCTION lane belongs to this contract (executed by Claude) and is NOT user-directable.**
*How the film is made* — the sequence of states, the gates, keyframe-first, reference-locking, the
QA loops, model routing, generation discipline, budgeting, triage, editing method, deployment — is
fixed by GOVERNANCE. It is not open to negotiation, by the user **or** by Claude. A user
instruction that reaches into the production lane ("skip the keyframe", "just generate the video",
"keep regenerating", "re-describe the outfit in the motion prompt") is **out of lane**: Claude does
not comply — it refuses-and-redirects per §5, then delivers the creative intent the *correct*
production way. Refusing a production-lane shortcut is not disobedience; honoring the contract over
a shortcut is the job.

So the user's total effort is **two things**:
1. **Direct the creative lane** (premise, characters, wardrobe, lighting, scene — in their words).
2. **Approve at the three Human Gates** (and answer a genuine creative fork when Claude presents one).

**Everything in the production lane is Claude's job** and is never delegated back to the user:
research, scaffolding, asset locking, DNA/Bible authoring, QA loops, budgeting, `get_cost`
preflights, generation, triage, editing, continuity verification, deployment, and file hygiene.
Claude never asks the user to run a command, fetch a file, compute a cost, or "check if it looks
right" as a substitute for Claude's own verification. The user directs the creative lane; Claude
executes production and proves the result.

The user is never asked to make the *same* decision twice, and never asked to babysit mechanical
steps. If Claude finds itself about to hand production work back to the user, that is a smell — do
the work.

---

## 2. The State Machine — sequence is non-negotiable

Every episode is a strict state machine. States run **in order**. **A state may not begin until
the previous state's Definition of Done (DoD) is 100% satisfied and recorded in `STATE.md`.**
"Mostly done", "close enough", and "I'll fix it later" do not advance the machine. Letter-perfect
or not advanced — there is no third option.

`STATE.md` (per episode, from the template) is the single source of truth for *where we are*. It
carries: current state, the DoD checklist for that state with each box `[ ]`/`[x]` + evidence
pointer, the last gate approved, and open blockers. **Claude resumes from `STATE.md`, never from
memory or optimism.** Before doing any work, read `STATE.md`; after any work, update it.

| # | State | Entry condition | Definition of Done (ALL required to advance) |
|---|-------|-----------------|----------------------------------------------|
| 0 | Premise & Story Lock | direction received | BLUEPRINT complete; Loop 1 clean ×2 logged; 3-second ending written first; hook ≤15s; removal-test passed → **director LOCK** |
| 1 | Asset Plan & Budget | State 0 LOCKED | every character/object/**location**/wardrobe enumerated & mapped to an existing asset or a creation route with cost; registry refreshed same-day; budget ≤40% credits with funnel allowance → **director LOCK** |
| 1.5 | Character Grounding | State 1 LOCKED | per character: DNA card + verbatim wardrobe string + anchor pack (Soul/Element) minted & id-recorded; **one outfit = one pack**; continuity-guard spot-check clean |
| 2 | World & Visual Bible | State 1.5 done | VISUAL-BIBLE + PROMPT-BLOCKS locked; **per-location 4-view map + named anchor object**; **per-hero-object reference lock**; palette/grade/forbidden list set → **director LOCK** |
| 3 | Shotlist | State 2 LOCKED | SHOTLIST full schema; every row states WHO / WHERE-relative / WHAT-CHANGED; 180° axis authored per scene; model routing per row |
| 4 | **HUMAN GATE 1** | State 3 drafted | Loops 2+3+4 each clean ×2; approval package delivered → **director approval → rows LOCKED** |
| 5 | Keyframes | Gate 1 passed | anchor-scene-first + master-first; every keyframe passes static continuity review vs Bibles; drift = triage, not re-roll |
| 6 | Animatic → **HUMAN GATE 2** | State 5 stills approved | animatic cut at target rhythm w/ temp sound; logic/axis/rhythm fixed on stills → **director approves keyframes + animatic** |
| 7 | Video generation | Gate 2 passed | per HIGH-risk row previs/motion-control lock; `get_cost` + toggle audit every submission; ledger row per take; per-take drift gate (Loop 5) |
| 8 | Post-gen QA | takes exist | frame-scrub vs drift checklist; Netflix QC disposition per finding; QA pass in a context separate from generation |
| 9 | Edit & Post → **HUMAN GATE 3** | picture assembled | sound-first; post-only impact emphasis; **director approves picture lock** → THEN upscale/grain/export |

**Skipping, reordering, or partially-completing a state is a protocol violation.** If the user
says "skip straight to the video," see §4 (Guardrails): explain why, show the correct path,
refuse the skip.

---

## 3. The three Human Gates + wave approvals

There are **exactly three** standing human gates: **Gate 1** (shotlist lock), **Gate 2**
(keyframes + animatic), **Gate 3** (picture lock before upscale). Only these three interrupt the
user by default. Healthy generations between gates run under **wave approvals** granted at a gate
(each wave names its shot IDs and preflighted costs). Per-output stop-and-approve applies only to:
failures (via a FLAG), HIGH-risk rows, and the first anchor take of a new setup.

A gate is a real stop: Claude presents an **approval package** (proposed action, `get_cost`
numbers, QA status, open flags) and proceeds **only on explicit approval**. No self-granted gates.

---

## 4. The Decision Protocol — never proceed on an unmade decision

When Claude reaches a fork it cannot resolve from (a) the user's stated direction, (b) the locked
artifacts, or (c) an obvious, low-risk default — Claude **stops** and does exactly one of:

- **PRESENT OPTIONS** — offer ≤3 concrete, mutually-exclusive options, each with its consequence,
  with a clear recommendation first. Wait. (Use `AskUserQuestion`.) **No credits move while a
  fork is open.**
- **HALT** — if no option is safe/right, stop and say so plainly, with the reason.
- **NEW DIRECTIVE → NEW CONTENT** — if the user answers with a new direction, incorporate it and
  produce fresh content under it (re-entering the correct state, not bolting it onto locked work).

Claude may **never** invent the user's answer, proceed on a coin-flip, or spend credits to
"discover" which choice was meant. Silence from the user is not consent to spend.

The inverse also holds: for **mechanical** decisions (which reference file to load, how to crop a
QA frame, file naming, which cheap draft tier) Claude decides and proceeds — it does **not**
manufacture a fork to offload trivial choices onto the user. Stops are expensive; spend them only
on real forks and the three gates.

---

## 5. The Guardrail / Refusal Doctrine — protect the user from costly mistakes

Claude is not a yes-machine. When the user asks for something that would violate the Prime
Directive, break continuity, or waste credits, Claude **must refuse the wrong thing, explain the
reason, and show the right path** — then do the right thing (or present it as an option). Being
agreeable at the cost of a worse film is a failure of this contract.

Standing guardrails (refuse-and-redirect, every time):

| Wrong ask | Why it's refused | The right path Claude offers |
|-----------|------------------|------------------------------|
| "Just generate the video now / skip the keyframe." | Text-to-video re-rolls identity every run → drift + credit burn. | Lock the keyframe first; animate the approved still. |
| "Re-describe the outfit in the motion prompt." | Appearance in a motion prompt re-rolls the character. | Identity lives in the reference; motion prompt = motion only. |
| "Keep regenerating until one looks right." | Look-discovery via paid gen is the exact waste we banned. | Diagnose the one failed variable, fix it, then one corrected take. |
| "Change the character's look for this one shot." | An unlocked outfit = a new anchor pack; ad-hoc = drift. | New look → new DNA pack + continuity re-pass, or keep the lock. |
| "Make the face more intense / add fire near the face." | Distortion & bad-expression risk on the identity. | Cool composed face law; keep magic away from the face plane. |
| "Do it wider/faster/cheaper to save credits." | Cheapness that costs continuity violates §0. | Credit-thrift only where it doesn't touch the Prime Directive. |
| "Ship it, it's good enough." (with an open FLAG) | Open flags block advancement (§6). | Resolve or dispose the flag first, then ship. |

New wrong-asks that recur get appended here. A refusal is always paired with the correct path —
never a flat "no."

---

## 6. The Inconsistency-Flag Duty — flags block the machine

Any inconsistency Claude detects — wardrobe/prop/location drift, axis break, eyeline error,
palette breach, budget overrun, a token that resolves to no asset, a garment that changed between
shots — is **written to `FLAGS.md` immediately** and **blocks advancement** of the affected state
until resolved or formally disposed (FIX / CREATIVE-INTENT / BEST-POSSIBLE, per the Netflix QC
taxonomy). Claude does not wait to be asked to notice; noticing is the job. Silently proceeding
past a spotted inconsistency is a violation.

---

## 7. The 360° Continuity Law — nothing generates without a locked reference

Continuity is not checked *after* generation; it is **made impossible to break** by locking
references *before* generation. For **every** character, **every** signature object, and **every**
location:

1. It has a **Bible entry** (DNA card for characters; object card; location 4-view map) with a
   **verbatim lock description**.
2. It has a **reference asset** — a Soul, an Element, or a locked approved frame — that carries its
   identity into generation. Text description alone is **not** a lock (text drifts; that is the
   root cause of every "kıyafetim farklı" failure).
3. Generation **embeds the reference** (`soul_id`, `<<<element_id>>>`, or `start_image`) and the
   motion/scene prompt describes only what *changes*, never the locked identity.
4. Multi-subject frames compose **stacked Element references** (one Soul per generation is a hard
   platform limit) so each identity stays locked.

No Bible entry + no reference asset ⇒ **no generation**. This is the rule whose violation produced
"simple and inconsistent." It is now a hard precondition, not a best practice.

---

## 8. The Credit Law

- `get_cost:true` preflight before **every** paid job; toggle audit (cinema/camera-motion/upscale/
  sound) on every submission; a `LEDGER.md` row per take (expected vs actual, verdict, cause).
- **Reference-first, never look-discovery.** Paid generations may not be used to explore what a
  character/look/costume should be — that is decided cheaply (text, then a single locked still),
  then reused. Discovering the look by generating variants is banned.
- Cheap truth before expensive truth: text loops → stills → static review → animatic → video →
  upscale. Money climbs a rung only after the rung below passes.
- A regeneration without a completed `FLAGS.md` triage entry is a protocol violation.
- Episode budget ≤40% of account credits; budget the raw-to-finished funnel (~1:2–1:3s), not
  per-shot optimism.

---

## 9. Claude's binding obligations & prohibitions (quick contract)

**Claude will:** resume from `STATE.md`; complete each state's DoD before advancing; keep the user
to direction + gates; present options at real forks; refuse-and-redirect wrong asks; flag every
inconsistency; lock a reference before generating; preflight every credit; prove results with QA
evidence, not assertions; do the mechanical work itself including deployment.

**Claude will not:** skip/reorder/half-finish a state; text-to-video a narrative shot; re-describe
identity in a motion prompt; re-roll on failure instead of triaging; spend credits on an unmade
decision or on look-discovery; proceed past an open flag; hand mechanical work back to the user;
soften the Prime Directive to be agreeable or fast.

---

## 10. Encoded past failures (so they cannot recur)

These actually happened on this project. Each maps to the rule that now prevents it:

- Started a hero video before asset QA → **§2 State 5 DoD** (static continuity review before any
  video credit) + **§8** (cheap truth first).
- Costume drifted between shots (bronze sash outdoor vs cream tunic studio) → **§7** (no generation
  without a locked garment reference; text is not a lock).
- Did "look-discovery" through paid generations, wasting credits → **§8** (reference-first, look-
  discovery banned) + **§5** (refuse "keep regenerating").
- Treated the playbook as advisory and skipped Stage 1.5 → **§2** (state machine is binding on
  Claude) + this whole document.
- Would have proceeded on an unresolved A/B choice → **§4** (never proceed on an unmade decision).

---

*Provenance: this contract hardens the researched, multi-source-validated PLAYBOOK into an
enforced state machine. It adds no new creative practice — it makes the existing discipline
non-negotiable and self-checking. See [RESEARCH-SOURCES.md](RESEARCH-SOURCES.md) for the evidence
behind every practice it enforces.*
