# Hero Intro — Shotlist (the exact ordered steps; Claude drives this sequence)

Governed by GOVERNANCE. This is the structure for the hero-intro keyframe set. Keyframes are
produced in this order as approved stills (cheap-truth-first) BEFORE any video credit. All Husam
shots stack `@Husam` (`8c317956`, identity) + `@HusamHero` (`edfa0dcf`, look) for one-to-one
continuity. Grade: Curated Chaos × gold-and-black; grainy analog; his signature = razor-glass discs
(see `HERO-KIT.md`).

| # | Beat | Purpose (site) | Status |
|---|------|----------------|--------|
| K1 | **Calm hero** — conjures a disc, composed, gold+black, shards beginning | Opening / title | ✅ have (`c5f64e8c` / `c2ed37de`) |
| K2 | **The Shatter** — he casts; the world fractures into black-glass shards exploding outward in 3D depth | Triggers the fragment reveals | ✅ `264b0f19` |
| K3 | **Action / disc-throw** — hurls a razor-disc, hooded attacker lunges, he dodges, mantle flaring | The battle beat ("aksiyon") | ✅ `a02cbc15` |
| K4 | **Flame Inside** — transformation: inner fire visible, glowing/smoky, discs enhanced | Escalation / super state | ✅ `95354518` |
| K6 | **Dodge (mid-scene)** — jumps BACK from a ranged attack, spinning two discs from both hands | Mid-fight evasion beat (his "Cheeky Jump") | generating `402506da` |
| K5 | **Settle** — Husam standing after the fight, calm, in the dark (brief "dust settles") | Optional pre-close beat | ✅ `c1b64585` |
| K7 | **ULTIMATE — Ancient Sunlight** — a sudden burst of sun from the sky strikes down; **eye-blinder white flash** | The climax + closer | pending |
| — | **Close** — the sun-flash whites out → **fade to black and stays** → CTA | Ending, right after the ultimate | site effect |

**Woven order (per user — fragments threaded THROUGH the fight, not a six-block parade):**
title (K1) → shatter (K2) → **Fragment I Agustín / the disc (K12)** → K3 action → **Fragment II
Najoua / lotus (K11)** → K6 dodge → **Fragment VI Federica / pendant-catch (K8)** → **Fragment III
Başak / evil-eye damage (K9)** → K4 Flame Inside → **Fragment V Baver / glass data** → **Fragment IV
Yaşar / constellation (K10)** → **K7 ultimate (sun burst + blinder flash)** → close to black → CTA.
The **ultimate is the closer** (K5 settle kept only as an optional beat, not in the mainline). The
eye-blinder flash is a white full-screen bloom in the site, resolving to black.

**Structure rationale:** a battle move, then a fragment surfaces — the fight's momentum carries the
reveals (matches the tempo rule below). Two fragments double as battle moves (Federica's pendant-catch,
Başak's evil-eye damage). **Cadence caveat:** 4 battle beats vs 6 fragments, so the interleave leaves
two short fragment-pairs (07–08, 10–11); a tighter 1-move-1-fragment cadence would need 2–3 more
battle keyframes (paid) — flagged to the user, pending decision.

**NO-REUSE RULE:** every beat is a distinct scene — **no keyframe is used for two beats** (director:
"don't use same frame 2 times"). Agustín previously borrowed the K1 opening shot; fixed with his own
dedicated frame **K12** (the razor-glass disc as a vinyl macro, `567654f3`). The only shared frame is
K7 across the ultimate → its own flash → CTA-over-black, which is one continuous shot, not a reused scene.

## These keyframes ARE the video's scene frames (director directive)
The keyframes are not standalone stills — each is a **frame from the hero VIDEO's scenes**. Next
phase: animate each locked keyframe into a video clip (image→video, Kling/Cinema Studio Video), and
the **site shows the video scenes**, not static images. Keyframe-first → video (the playbook).

## Fragment motifs woven into the fight (each fragment's signature, per director)
| Fragment | Motif | Keyframe / status |
|----------|-------|-------------------|
| I Agustín | **the disc itself** — razor-glass disc as a vinyl record, gold-and-black, turning in the tumbling glass (his own dedicated frame, no longer the K1 opening) | ✅ K12 `567654f3` (locked) |
| II Najoua | **lotus / lotus petals** — serene grace-note, petals settle on his palm | K11 `64b1226c` (audit) |
| III Başak | **blue evil-eye (nazar)** in blue smoke — the damage beat before Flame Inside | ✅ K9 (redo, locked) |
| IV Yaşar Efe | **star-constellation** (Ursa Major / Ursa Minor — Büyük/Küçük Ayı) glowing in the SKY beside the SUN, seen while he **charges up an attack**, low heroic angle from below | K10 REDO (sun-mandala was wrong) |
| V Baver | **purple neon smoke + green neon digital-data pattern** (math-professor / data) | pending |
| VI Federica | **lapis-leaf pendant** recalled through TWO disc-gates (falls from near gate to hand; far gate shows only the chain); he **lunges forward** to catch it | ✅ K8 (motion disc-gate, locked) |

## Motif delivery in the edit — TEMPO RULE
The delicate fragment motifs (lotus, green data, evil-eye, sun-constellation) must NOT become slow
standalone calm scenes — that breaks the high-tempo action flow (director note: "lotus scene not
logical with the video's motion tempo"). Instead they are delivered **in-tempo, fast**:
- as **split-second close-ups on the glass-shard scene transitions** (the shard-wipes), and
- **reflected in the tumbling glass shards** as they turn in the air (shards = mirrors carrying each
  fragment's motif) — quick, rhythmic glimpses.
The **action beats** (shatter, dodge, action, flame, ultimate, pendant-catch) carry the momentum; the
motif keyframes (K10 constellation, K11 lotus, Baver data, etc.) are the **reflection/close-up
source art**, not full slow scenes. Only Federica's pendant-catch and Başak's damage beat are
full action scenes (they're dynamic).
- Each fragment's reveal beat uses its motif keyframe (stacked @Husam + @HusamHero + the fragment's
  object element where one exists). Identity face-audit mandatory on every character frame.
- CTA "dark & fantastical elements / create your own fragment" → launches playbook Phase 0.

## Locked keyframes (user-approved) — all 12 locked
K1 title, K2 shatter, K3 action, K4 Flame Inside, K5 settle, K6 dodge, K7 ultimate, K8 pendant
(motion disc-gate), K9 Başak evil-eye, K10 Yaşar constellation, K11 Najoua lotus, **K12 Agustín disc
(vinyl macro `567654f3`)**, plus the Baver glass-only interstitial (`ad5ae059`). All wired into the
scroll site in the woven order above (QA-verified: correct frame per beat, shard-wipes, flash peaks
1.00 → clean blackout). Next: animate to video → site from video scenes.

Generation discipline: one image at a time, `get_cost` preflight, report spend after each, QA
(face/hands/wardrobe/continuity) before it's accepted. No video until the full set is approved
stills (Gate: keyframes + animatic).
