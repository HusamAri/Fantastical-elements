# FORP Episode Engine — Master Playbook

Producing 4–5 minute standalone FORP episodes — high-tempo action cinema with fantastical
elements — at Netflix-grade quality on a Higgsfield Creator account, with one-shot generation
discipline and strict credit/token efficiency.

This playbook EXTENDS the locked Six-Stage System (Story → 1.5 Character → Visual Aesthetic →
Shotlist → Workflow → Prompts → Generate → Assemble). Nothing here replaces a locked stage; the
39 practices woven in below each carry 2+ independent industry sources (one documented exception:
the Netflix QC taxonomy is primary-source-authoritative for the stated "Netflix level" bar) — see
[RESEARCH-SOURCES.md](RESEARCH-SOURCES.md) for every citation, the 65-entry pitfall register, and
the 10 practices that were researched and REJECTED (worth reading: what we deliberately don't do).

## The Five Hard Rules

1. **Keyframe first, always.** No text-to-video for narrative shots, ever. A shot exists as an
   approved still before a single video credit moves. (The single most unanimous rule across all
   research lenses — 6 independent organizations.)
2. **Identity lives in references, never in motion prompts.** Souls, Elements and anchor packs
   carry who a character is; video prompts describe motion and camera ONLY. Re-describing
   appearance in a motion prompt re-rolls the identity.
3. **One-shot discipline.** Every generation is planned, preflighted (`get_cost:true`), and
   approved. A failed take triggers triage (find → confirm → fix → flag → approve), never a re-roll.
4. **Everything is a locked artifact.** Blueprint, DNA cards, visual bible, shotlist, prompt
   blocks — locked before use, versioned in the episode folder, self-contained.
5. **Cheap truth before expensive truth.** Text loops → stills → static review → animatic →
   video → upscale. Each rung must pass before money climbs to the next.

Plus the FORP Three Laws (from the Baver bible, unchanged): containment over destruction;
pressure over spectacle; physics over fantasy.

## Pipeline map

| Phase | Name | Output artifact | Gate |
|---|---|---|---|
| 0 | Premise & Story Lock | `BLUEPRINT.md` | Loop 1 clean ×2 → director LOCK |
| 1 | Asset Plan & Budget | `ASSET-PLAN.md` + registry refresh + budget sheet | director LOCK |
| 1.5 | Character Grounding | DNA cards + anchor packs (Souls/Elements) | continuity-guard spot check |
| 2 | World & Visual Bible | `VISUAL-BIBLE.md` + `PROMPT-BLOCKS.md` + location maps | director LOCK |
| 3 | Shotlist | `SHOTLIST.md` (full schema) | Loops 2+3+4 clean ×2 |
| 4 | **HUMAN GATE 1** — Shotlist lock | all rows LOCKED | director approval package |
| 5 | Keyframes | approved stills per shot | static continuity review |
| 6 | Animatic | locked animatic cut | **HUMAN GATE 2** — keyframes+animatic approved |
| 7 | Video generation | takes + generation ledger | per-take drift gate (Loop 5) |
| 8 | Post-gen QA | QC report (Netflix taxonomy) | dispositions resolved |
| 9 | Edit & Post | picture lock → finals | **HUMAN GATE 3** — final cut before upscale |

Exactly three standing human gates; healthy generations inside Phases 5–7 run under **wave
approvals** granted at those gates (each wave names its shot IDs and preflighted costs). More
gates cause rubber-stamping, fewer cause credit burn (validated: MindStudio, StackAI). Per-output
stop-and-approve applies only to failures (via flags), HIGH-risk rows, and first-of-a-setup
anchor takes — see `.agents/skills/forp-episode-engine/reference/generation-protocol.md`.

---

## Phase 0 — Premise & Story Lock

Template: `.agents/skills/forp-episode-engine/reference/episode-blueprint.md` (the 270-second skeleton). Core rules:

- **Hook rule:** detonation frame in seconds 0–5; hook complete (protagonist + physical stakes
  visible) by 15. No setup before the first jolt. Shot 001 must work with zero FORP knowledge.
- **270s arithmetic:** 20/60/20 acts — Act 1 out by ~1:00, midpoint spike ~2:10–2:20, Act 2 out
  by ~3:40, climax at 85–90% of runtime, out at 4:30 + button. Jolt or re-pricing every 30–45s;
  mini unresolved beats at the attention boundaries (~1:00 / ~2:15 / ~3:40).
- **Compression gates:** one moment in time; 1–3 speaking characters; one core conflict; 1–2
  environments. Minimal dialogue — one look replaces five lines (also: less lip-sync risk,
  fewer assets, fewer credits).
- **Anthology engine:** every premise passes the removal test against the FORP engine
  (fragments of real people + containment over destruction). The episode resolves its OWN
  dramatic question on screen; the button is a thematic sting or ≤5s universe tag — never a
  cliffhanger. Write the final 3 seconds first. Cut on the question, two seconds earlier than
  feels safe.
- **Fight = mini-arc:** wind-up → tug-of-war with ≥2 power reversals (each triggered by a prop
  or environment element) → transformation. The set is a third combatant: 3–5 interactable
  elements listed in the visual bible; every environmental reaction gets its own shot row.

Gate: Loop 1 (structure loop, `.agents/skills/forp-episode-engine/reference/qa-loops.md`) — two consecutive clean passes, then LOCK.

## Phase 1 — Asset Plan & Budget

- Refresh `.agents/skills/forp-episode-engine/reference/asset-registry.md` (souls, elements, balance) — never mid-production.
- List every character/place/object/wardrobe the blueprint needs; map each to an existing
  registry asset or a creation route (Soul still → Element; Drive import → Element). New looks =
  new Elements with written lock descriptions.
- Set the episode credit budget (≤40% of account credits) and the raw-footage funnel allowance:
  plan for a finished-to-raw ratio of ~1:2–1:3 in seconds — budget the funnel, not per-shot
  optimism. Note credit expiry: monthly credits don't roll over; top-ups expire ~90 days.
- Gate: director LOCK on plan + budget.

## Phase 1.5 — Character Grounding

Per character in this episode:

- **Character DNA card** (one page): face anchors, hair anchors, signature prop, base outfit as a
  verbatim wardrobe string (color + material + fit + accessories), named palette, movement
  quality, do-not-allow list. The wardrobe string is repeated byte-identically in every image
  prompt and NEVER appears in motion prompts.
- **Anchor pack**: front/side/back full-body + close-up + 6-expression sheet + action poses,
  minted via Soul (`soul_2` stills) or curated from existing approved frames, saved as Elements.
  **One outfit = one anchor pack** — an outfit change is a new pack, never a reused one.
- Soul training (only if a new identity is needed): 20+ curated recent photos (max ~80), ≥960px,
  varied angles/expressions, ≥1 full-height, no occlusions or extreme expressions; 15–30 curated
  beat 75 sloppy.
- Multi-character shots: solo-anchor each character, compose via Elements `<<<id>>>` stacks or
  Seedance `image_references` (up to 9 image refs — curate, don't cap); one Soul per generation
  is a hard platform limit.

## Phase 2 — World & Visual Bible

Per episode, locked before any prompt is written:

- 3–5 approved style frames; per-location environment references; named palette (2–3 dominant
  tones with hexes + max frame weights, Baver-style); lens aesthetic; grade spec; forbidden list.
- **4-view location map** per recurring set (exterior, interior wide 3/4, alternate corner, prop
  detail) + ONE named anchor object per location that appears in every prompt at that location.
- **Camera default = clarity school:** wider framing, longer takes, full bodies, choreography
  staged to camera. Design each fight's choreography as ONE continuous take staged to camera —
  authored on paper and in the animatic, never generated (model caps are 15 s); the shotlist then
  decomposes it into per-clip rows. Shaky-cam / tight chaos only as a flagged POV exception.
  (Also cheaper: one clear 6–10s clip beats five chaotic 2s fragments.)
- `PROMPT-BLOCKS.md`: the frozen `[CHAR:*] [ENV:*] [LIGHT:*] [GRADE] [PHYSICS] [NEG]` blocks
  (see `.agents/skills/forp-episode-engine/reference/prompt-standards.md`).

## Phase 3 — Shotlist

Schema and coverage doctrine: `.agents/skills/forp-episode-engine/reference/shotlist-standard.md`. Highlights:

- ASL targets set BEFORE listing: action peaks 1.3–2.7s, connective 3–6s, holds 8–13s; a 4–5 min
  episode lands at ~70–110 shots; tempo varies in waves, never constant.
- Fight beats: one primary movement per clip, 3–8s; every exchange is a SETUP → IMPACT → REACTION
  molecule; never cut before the reaction; **never render the contact frame** (occlusion + cut +
  reaction + sound sell the hit AND dodge AI interpenetration).
- The 180° axis is authored per scene (line, camera side, screen directions in the rows), crossed
  only via the four legal moves. Shot/reverse pairs carry gaze + looking-room in BOTH prompts and
  are QA'd as a unit.
- Model routing recorded per row: Kling 3.0 for controlled cinematic coverage / negatives /
  cross-angle consistency; Seedance 2.0 for high-energy fight physics and multi-reference
  identity (genre hint `action`); minis/fast modes for sanctioned drafts.
- Rows that cannot state WHO / WHERE-relative / WHAT-CHANGED are cut at the logic loop.

## Phase 4 — QA loops & HUMAN GATE 1

Loops 1–4 (`.agents/skills/forp-episode-engine/reference/qa-loops.md`) to two consecutive clean passes each:
structure → logic (`/forp-scenario-qa`) → prompts (`/forp-prompt-enhancer`) ∥ assets
(`/forp-continuity-guard`). Judges are binary and single-criterion — one check, pass/fail with
reasons; never a 1–10 mega-judge.

Gate 1 package to director: locked blueprint, shotlist, prompt sheet, budget with per-shot
`get_cost` estimates, QA logs. Approval = shotlist rows → LOCKED.

## Phase 5 — Keyframes

Per `.agents/skills/forp-episode-engine/reference/generation-protocol.md`:

- **Anchor scene first:** per character/setup, generate the single most important clean close-up,
  lock it, then step outward changing exactly ONE variable per generation (setting, then angle,
  then light) so drift is attributable.
- **Master first:** per fight set, the wide master (full bodies, full geography) is generated and
  locked before ANY tighter coverage; all coverage must match the master's positions, light,
  wardrobe, axis. Re-establish wide after every location shift / axis change / new combatant.
- **Static continuity review:** all keyframes side-by-side in shot order — reverse-shot lighting,
  wardrobe, palette weights, eyelines, geography — BEFORE any video credit.

## Phase 6 — Animatic & HUMAN GATE 2

Cut the approved stills at target rhythm with temp sound (the AI stuntvis). Fix logic, axis and
rhythm on 2-credit frames, not 25-credit clips. Lock the animatic; changes after this gate re-open
the shotlist row. Gate 2: director approves keyframes + animatic → video generation may begin.

## Phase 7 — Video generation

- Previs/motion-control pass for HIGH-risk fight rows: blocking locked via pose stills or a
  reference movement video through Kling Motion Control / Seedance `video_references` before any
  paid narrative take — the model paints over locked geometry instead of inventing blocking.
- Dual-keyframe chaining where cuts must be invisible: the outgoing take's extracted, approved
  final frame = incoming shot's `start_image` (id recorded in the row); never pair start/end
  frames that differ in color/style/light; start frame's AR governs the clip. Motion plausible
  for duration: one simple action ≈ 5s; multiple movements = split clips.
- Draft ladder by risk class: LOW-risk → single final at locked spec. MED/HIGH-risk → one cheap
  no-audio draft in the SAME model family (Seedance finals: `seedance_2_0_mini` or mode `fast`
  ≤720p; Kling finals: mode `std` sound off — Kling has no resolution tiers), lock the prompt,
  ONE final at the locked spec (Seedance `std` 1080p / Kling `pro`). Cross-family finals re-pass
  Loop 3 for dialect transform. Audio only on locked finals that need it (audio adds ~50–100%
  cost). Never iterate on the premium tier.
- `get_cost:true` preflight + toggle audit (cinema mode / camera motion / upscale / sound) on
  EVERY submission; ledger row per take (shot, model, mode, prompt version, expected vs actual
  credits, verdict, failure cause).
- Failure = triage protocol, not a re-roll (`.agents/skills/forp-episode-engine/reference/generation-protocol.md`): classify →
  verify cause → fix ONE diagnosed variable with everything else pinned → flag → approval →
  corrected take. Prefer targeted salvage over regeneration, using the verified edit surface:
  trim, `reframe`, `upscale_image`/`upscale_video`, `outpaint_image` for stills.

## Phase 8 — Post-generation QA (Loop 5)

- Frame-scrub every take against the drift checklist (face vs anchor, wardrobe, hair, skin tone,
  proportions, style, transitions) with the symptom-indexed fix table in `.agents/skills/forp-episode-engine/reference/qa-loops.md`.
- Netflix QC taxonomy per finding: soft focus / exposure / extraneous content-artifacts /
  ghosting / sync → disposition **FIX** (root-cause first), **CREATIVE INTENT**, or **BEST
  POSSIBLE** (documented model limitation). Highest scrutiny on locked Souls, wardrobe locks and
  central world elements.
- The QA pass never shares context with the generation pass (separate session/agent).

## Phase 9 — Edit & Post, HUMAN GATE 3

- **Sound first:** map the arc to ~4 music beats, lay music/VO, cut visuals to the beat. Room
  tone + ambience is the seam-hider between AI clips; key action SFX from libraries, not AI.
  A beat (or a whole fight) may deliberately run production-audio-only — no score — as a
  high-tension option; note it in the sound map like any other beat.
- Assembly: trim each take to its row's edit duration per its ASL class (action peaks 1.3–2.7s,
  connective 3–6s, holds 8–13s; expect ~2–5s usable from motion-heavy action takes, while static
  holds can run near full take length); trim glitchy
  first/last frames (re-verify handoff frames on chained cuts); transition shots (prop CUs,
  silhouettes, OTS) between character-heavy sequences; cut on motion; ONE shared grade/LUT first.
- Impact emphasis lives in POST, never in the generator: impact flash 1–3 frames, hit-stop 2–4
  frames, punch-ins, speed-ups bounded 5–15%; slow-mo once per fight, flagged. Zero credit cost.
- Gate 3: director approves picture lock. THEN upscale hero shots to 4K, apply film grain +
  vignette across the timeline, verify uniform res/fps/AR, export.

---

## Loops ↔ skills map

| Loop | Skill | Runs on | Exit |
|---|---|---|---|
| 1 Structure | `forp-episode-engine` (orchestrator, Phase 0) | blueprint | clean ×2 |
| 2 Logic | `/forp-scenario-qa` | scenes + shotlist | clean ×2 |
| 3 Prompts | `/forp-prompt-enhancer` | all prompts | clean ×2 |
| 4 Assets | `/forp-continuity-guard` | rows + registry | clean ×2 |
| 5 Drift/QC | `forp-episode-engine` (Phase 8) | generated takes | dispositions resolved |

## Efficiency doctrine

Credits and tokens: `.agents/skills/forp-episode-engine/reference/credit-token-budget.md`. The short version — preflight everything,
keyframe-first, silent drafts, upscale don't regenerate, ledger everything; skills stay thin and
load only the reference file the current loop needs; state lives in episode-folder artifacts, not
in chat memory.

## Provenance

Method: 6 independent research lenses → 104 raw practices → adversarial cross-validation
(2+ independent orgs required) → 39 validated / 10 rejected. Full citations, pitfall register
and rejection log: [RESEARCH-SOURCES.md](RESEARCH-SOURCES.md). Registry facts verified live
against the Higgsfield account on 2026-07-08.
