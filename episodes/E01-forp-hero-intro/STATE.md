# STATE — E01-forp-hero-intro

**Single source of truth for where this episode stands.** Governed by
`playbooks/forp-episode-engine/GOVERNANCE.md`. Claude resumes from THIS file, never from memory.
Rule: a state may not begin until the previous state's Definition of Done is **100% checked below**
with an evidence pointer for each box.

- **Current state:** `7 — Video generation` (Gate 2 PASSED)
- **Last gate passed:** `Gate 2 — keyframes + animatic` (director approved; video via seedance_2_0
  start→end-frame chain, sound ON)
- **Open blockers:** _none_ — interrupt beat resolved: fresh in-void take K15 `33677d48` locked and
  inserted (dodge → interrupt → Başak → Flame). Sequence now **N=17**, 15 keyframes + Baver, all locked.
- **Registry refreshed:** 2026-07-09 · **Budget cap:** 40% of credits · **Spent:** ~52.8 cr stills;
  **video: 0 so far** · balance ~5917.

## Definition-of-Done ledger

### State 0 — Premise & Story Lock ✅
- [x] BLUEPRINT (beat map) complete — _evidence: `site/HERO-SHOTLIST.md`, `src/hero.js` BEATS (N=16)_
- [x] Final 3 seconds written first — _evidence: close = ultimate → eye-blinder flash → settle (K5) → CTA_
- [x] Hook ≤15s; opening works with zero FORP knowledge — _evidence: beats 1–2 title + "Six were witnessed."_
- [x] Removal test passed — _evidence: intro launches the FORP engine via the CTA (`/create` → Phase 0)_
- [x] Loop 1 (structure) clean — _evidence: headless-Chromium beat QA, 16/16 map correct_
- [x] **Director LOCK** — _evidence: iterative director approvals of the woven order_

### State 1 — Asset Plan & Budget ✅
- [x] Every character/object/location/wardrobe enumerated & mapped — _evidence: `site/HERO-KIT.md`, `HERO-BIBLE.md`, `locks/CANON.md`_
- [x] Registry refreshed same-day — _evidence: `locks/INDEX.md` (2026-07-09)_
- [x] Budget ≤40% + funnel allowance — _evidence: `site/LEDGER.md` (~50.8 cr, well under cap)_
- [x] **Director LOCK** — _evidence: costume/look locked (c2ed37de → @HusamHero)_

### State 1.5 — Character Grounding ✅
- [x] DNA card + verbatim wardrobe string — _evidence: `locks/CANON.md`, `HERO-BIBLE.md`_
- [x] Anchor pack minted, element/soul ids recorded — _evidence: @Husam `8c317956`, @HusamHero `edfa0dcf`, Soul `76fab95a`, @lapis-kararan `54c6fc58`_
- [x] continuity-guard spot-check clean — _evidence: mandatory face-audit L22–L24; each character frame side-by-sided vs ref_

### State 2 — World & Visual Bible ✅
- [x] VISUAL-BIBLE + PROMPT-BLOCKS — _evidence: `HERO-BIBLE.md`, `locks/CANON.md`_
- [x] Per-hero-object reference lock — _evidence: weapon disc = ember-fire disc-sigil (K1); Agustín motif = vinyl (K12), distinct_
- [x] Palette/grade/forbidden list — _evidence: `locks/CANON.md` (gold+black, deep void, momentary-diegetic-explosion-light nuance; NEG list)_
- [x] **Director LOCK** — _evidence: grade approved across the locked set_

### State 3 — Shotlist ✅
- [x] Full schema; every row WHO/WHERE/WHAT-CHANGED — _evidence: `HERO-SHOTLIST.md`, `STORYBOARD.html`_
- [x] Model routing per row — _evidence: cinematic_studio_2_5 @2k for all keyframes (LEDGER)_

### State 4 — HUMAN GATE 1 (shotlist lock) ✅
- [x] Review loops clean — _evidence: headless QA of beat order (14/14 then 16/16)_
- [x] Approval package delivered — _evidence: storyboard delivered to director; woven order presented_
- [x] **Director approval → rows LOCKED** — _evidence: director confirmed weaving fragments through the fight; Twin Spiral added_

### State 5 — Keyframes ✅
- [x] Anchor-scene-first + master-first — _evidence: K1 calm master first; LEDGER order_
- [x] Static continuity review vs Bibles clean (before any video credit) — _evidence: `locks/K1..K14 + BAVER`, all face-audited & director-locked_

### State 6 — Animatic → HUMAN GATE 2 ✅
- [x] Animatic cut at target rhythm — _evidence: the scroll-scrubbed site IS the animatic; N=17 order QA-verified (frames map, shard-wipes, flash 0.98 → settle close). Linear capture: `animatic.webm`_
- [x] **Director approves keyframes + animatic** — _evidence: director approved Gate 2; directed seedance start→end-frame chain + sound on + interrupt beat generate_

### State 7 — Video generation ⏳ (current)
Plan: **seedance_2_0**, one clip per beat-gap, `start_image` = beat N keyframe, `end_image` = beat
N+1 keyframe → 16 seamless chained clips over the N=17 order. **Sound ON** (audio per clip). One at a
time, `get_cost` + ledger row + face-audit each, per-take drift gate.
- [ ] Previs/motion-control lock on HIGH-risk rows — _pending; test clip first (K1→K2)_
- [ ] get_cost + toggle audit + ledger row per take — _pending_
- [ ] Per-take drift gate (Loop 5) clean — _pending_

### State 8 — Post-gen QA — _pending_
### State 9 — Edit & Post → HUMAN GATE 3 — _pending_
