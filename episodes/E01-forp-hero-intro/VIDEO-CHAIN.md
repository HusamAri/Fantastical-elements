# E01 — Video chain (State 7)

**Method (director):** seamless start→end-frame clips, `start_image` = beat N keyframe, `end_image` =
beat N+1 keyframe → each clip morphs one locked frame into the next, chained into one flow. **Sound ON.**
720p first pass; upscale at State 9. One clip at a time · `get_cost` + LEDGER row + `vqa.py` endpoint QA
+ face-audit each.

**MODEL = Kling v3.0** (`kling3_0`, std, sound on). Chosen after A/B: seedance_2_0 drifts the END frame
(K1→K2 last-vs-K2 ncc −0.10 ✗); **Kling hard-locks BOTH endpoints** (first 0.99 ✓, last 0.965 ✓) and
costs ~10 cr vs 22.5. Gemini Omni Flash has no start/end roles (can't do endpoint morphs). Per clip:
author the LOGICAL motion + camera that carries frame N→N+1 (lesson V8), Kling prompt order
Scene→Characters→Action→Camera→Audio.

## Beat → keyframe UUID (N=17)
| # | Beat | Keyframe | Job UUID |
|---|------|----------|----------|
| 1 | Calm hero | K1 | c5f64e8c-e1a5-43bd-ab68-456a2ad2a04a |
| 2 | Shatter | K2 | 264b0f19-1f1b-4369-b2d5-2baf49ba152c |
| 3 | Agustín disc | K12 | 567654f3-5722-41c7-8855-4bb4abbaf31a |
| 4 | Action | K3 | a02cbc15-350d-4c2f-aab4-33407a76dbbf |
| 5 | Najoua lotus | K11 | 64b1226c-0f6c-4304-ae1b-226970890ab6 |
| 6 | Twin Spiral charge | K13 | c48ed63d-3e28-48b0-a144-5415125b6d2f |
| 7 | Twin Spiral throw | K14 | 98ab701e-c8b7-43f9-9f20-c58090e2b752 |
| 8 | Federica pendant | K8 | c6a5f493-396a-417d-80fa-e024905c9818 |
| 9 | Dodge | K6 | 402506da-e030-4866-900b-2c963b9e3095 |
| 10 | Spin interrupted | K15 | 33677d48-da01-473e-845a-e653dce8de55 |
| 11 | Başak evil-eye | K9 | 142f2014-2caa-43bd-a9ac-5ebc47c84b99 |
| 12 | Flame Inside | K4 | 95354518-a41c-4e06-895b-0202be3ca66f |
| 13 | Baver glass | BAVER | ad5ae059-8fbf-44b9-91e1-b36e6bcc9993 |
| 14 | Yaşar constellation | K10 | 6025b2b9-f6af-4035-bce0-40ee0fffff1c |
| 15 | Ultimate | K7 | b37a91bb-8038-4775-b187-4d1a33d5d8f1 |
| 16 | Flash → settle | K5 | c1b64585-a3f5-42f5-9596-d021f9b83d22 |
| 17 | CTA over settle | K5 | c1b64585-a3f5-42f5-9596-d021f9b83d22 |

## Clips = 16 gaps (start → end)
C1 K1→K2 · C2 K2→K12 · C3 K12→K3 · C4 K3→K11 · C5 K11→K13 · C6 K13→K14 · C7 K14→K8 ·
C8 K8→K6 · C9 K6→K15 · C10 K15→K9 · C11 K9→K4 · C12 K4→BAVER · C13 BAVER→K10 · C14 K10→K7 ·
C15 K7→K5 (flash between) · C16 K5→K5 (settle hold, optional / subtle drift).

## QA (per clip, before accept) — `tools/vqa.py` (OpenCV)
first frame ≈ start keyframe (ncc>0.8), last frame ≈ end keyframe (ncc>0.8), glitch spike_ratio<6,
mid-frames free of unwanted morphing. Endpoint preservation is the join-critical check.

## Log (job id · cost · verdict)
- **C1 K1→K2 (seedance_2_0)** · job `ddc4c67c` · 22.5 cr · **QA FAIL (endpoint):** first 0.969 ✓,
  last vs K2 **−0.10 ✗**, no cut. ⇒ seedance drops the end frame (V6). Rejected the model.
- **C1 K1→K2 (Kling v3.0, generic prompt, model test)** · job `6d4f71dd` · 10 cr · **QA PASS:** first
  0.990 ✓, last 0.965 ✓ (both endpoints locked), glitch 3.3 ✓. ⇒ Kling adopted for the chain.
- **C1 K1→K2 (Kling v3.0, choreographed)** · job `c96e30fd` · 10 cr · turn-right + disc-from-back +
  camera orbit + land defending (director choreo, V8) · **QA PASS:** first **0.990** ✓, last **0.971** ✓,
  glitch 2.7 ✓, motion 12.7 (turn+orbit present), sound on. Delivered to director. ✅ pipeline validated.
  _Next: deep-research Kling control + add @Husam ELEMENT for extra consistency (kling_element_ids)
  before running C2..C16._
- _raw clips tracked by job id, not committed to git (heavy); assembled at picture-lock._
