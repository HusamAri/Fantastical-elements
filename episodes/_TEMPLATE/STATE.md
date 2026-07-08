# STATE — E<nn>-<slug>

**Single source of truth for where this episode stands.** Governed by
`playbooks/forp-episode-engine/GOVERNANCE.md`. Claude resumes from THIS file, never from memory.
Rule: a state may not begin until the previous state's Definition of Done is **100% checked below**
with an evidence pointer for each box. No box may be checked on faith.

- **Current state:** `0 — Premise & Story Lock`
- **Last gate passed:** _none_
- **Open blockers (see FLAGS.md):** _none_
- **Registry refreshed:** _YYYY-MM-DD_ · **Budget cap:** _—_ · **Spent:** _—_

## Definition-of-Done ledger

Check a box only with evidence (file §, job id, QA-LOG line). Copy the current state's block, fill
it, and only then advance `Current state`.

### State 0 — Premise & Story Lock
- [ ] BLUEPRINT.md complete (270s skeleton) — _evidence:_
- [ ] Final 3 seconds written first — _evidence:_
- [ ] Hook complete ≤15s; shot 001 works with zero FORP knowledge — _evidence:_
- [ ] Removal test vs FORP engine passed — _evidence:_
- [ ] Loop 1 (structure) clean ×2 logged — _evidence: QA-LOG §_
- [ ] **Director LOCK** — _evidence:_

### State 1 — Asset Plan & Budget
- [ ] Every character / object / **location** / wardrobe enumerated & mapped (asset or route+cost) — _evidence:_
- [ ] Registry refreshed same-day — _evidence:_
- [ ] Budget ≤40% credits + funnel allowance set — _evidence: BUDGET.md_
- [ ] **Director LOCK** — _evidence:_

### State 1.5 — Character Grounding
- [ ] DNA card + verbatim wardrobe string per character — _evidence: DNA-*.md_
- [ ] Anchor pack minted, element/soul ids recorded (one outfit = one pack) — _evidence:_
- [ ] continuity-guard spot-check clean — _evidence: QA-LOG §_

### State 2 — World & Visual Bible
- [ ] VISUAL-BIBLE + PROMPT-BLOCKS drafted — _evidence:_
- [ ] Per-location 4-view map + named anchor object — _evidence:_
- [ ] Per-hero-object reference lock — _evidence:_
- [ ] Palette / grade / forbidden list set — _evidence:_
- [ ] **Director LOCK** — _evidence:_

### State 3 — Shotlist
- [ ] Full schema; every row states WHO / WHERE-relative / WHAT-CHANGED — _evidence:_
- [ ] 180° axis authored per scene; model routing per row — _evidence:_

### State 4 — HUMAN GATE 1 (shotlist lock)
- [ ] Loops 2 + 3 + 4 each clean ×2 — _evidence: QA-LOG §_
- [ ] Approval package delivered (action, get_cost, QA, flags) — _evidence:_
- [ ] **Director approval → rows LOCKED** — _evidence:_

### State 5 — Keyframes
- [ ] Anchor-scene-first + master-first per setup — _evidence: LEDGER_
- [ ] Static continuity review vs Bibles clean (before any video credit) — _evidence:_

### State 6 — Animatic → HUMAN GATE 2
- [ ] Animatic cut at target rhythm w/ temp sound — _evidence:_
- [ ] **Director approves keyframes + animatic** — _evidence:_

### State 7 — Video generation
- [ ] Previs/motion-control lock on HIGH-risk rows — _evidence:_
- [ ] get_cost + toggle audit + ledger row per take — _evidence: LEDGER_
- [ ] Per-take drift gate (Loop 5) clean — _evidence: QA-LOG §_

### State 8 — Post-gen QA
- [ ] Frame-scrub vs drift checklist; Netflix QC disposition per finding — _evidence:_

### State 9 — Edit & Post → HUMAN GATE 3
- [ ] Sound-first; post-only impact emphasis — _evidence:_
- [ ] **Director approves picture lock** → then upscale/grain/export — _evidence:_
