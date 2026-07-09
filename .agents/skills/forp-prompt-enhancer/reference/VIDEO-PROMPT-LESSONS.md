# VIDEO-PROMPT-LESSONS — the seedance 2.0 prompting loop (permanent, append-only)

Sibling of `PROMPT-LESSONS.md` (image). Every video-prompting mistake that reaches the director
becomes a permanent lesson here. The `/forp-prompt-enhancer` loop reads this on every video run and
appends when a clip fails (QA or director feedback). Loop the user asked for: learn once, never repeat.

Format per lesson: **MISTAKE → FIX**. Researched baseline first, then analysed mistakes.

## Seedance 2.0 — params cheat (from the model card)
- `duration` 4–15s (5 default) · `resolution` 480p/720p/1080p/4k (1080p+ need `mode:std`) ·
  `mode` std (quality) / fast (cheap, ≤720p) · `genre` auto|action|horror|comedy|noir|drama|epic ·
  `generate_audio` **default true** (native audio) · `bitrate_mode` standard/high · `speedramp` auto.
- medias roles: `start_image`, `end_image`, `image_references`, `video_references`, `audio_references`.
- Our first pass: **720p / std / 5s / audio on**, upscale at State 9 (picture-lock).

## The 7-part prompt formula (target 60–100 words)
**subject · action · environment · camera · lighting · style · sound.** Too short → misses detail;
too long → conflicting instructions. Write the *motion arc*, not a static description.

## Camera (the single biggest quality lever)
- **One primary move** (+ at most one secondary, stated after). Conflicting moves → jitter.
- Pattern: `Camera: [move] + [speed] + [subject lock]`, name **stability** (tripod / handheld /
  gimbal), optional lens hint. Rhythmic human language, not photography jargon ("as if talking to an editor").
- Vocabulary: slow dolly-in, push-in, orbit, tracking, crane-up, whip/handheld. For a locked hero
  frame prefer **slow push-in / gentle dolly / subtle parallax** — calm, controlled.

## Motion quality — do / don't
- DO: slow, gentle, continuous, natural, smooth-but-not-stiff; real physics (embers drift, shards
  tumble, mantle flares); motion blur on fast hits.
- DON'T: exaggerated / high-speed / complex multi-person interaction / large distortion (morph hell).

## Native audio (sound ON)
- List SFX **chronologically synced to the action**: e.g. "sub-bass swell → glass-shatter crack →
  ember crackle". Bracket cues like `[SFX: ...]` read clearly. Say **"no music"** when you want silence.
- Keep the audio in-world (practical: fire crackle, glass, low drones), matching the analog grade.

## START → END frame technique (our seamless chain)
Each clip uses `start_image` = beat N keyframe, `end_image` = beat N+1 keyframe. The model
interpolates between two LOCKED frames — this pins identity/composition at both ends (low drift).
- **Narrate the transition**, don't just morph: describe the motion that carries the start state INTO
  the end state ("...as he casts, the frame fractures and the shards sweep across, resolving into...").
- **Small gaps** (within an ability, charge→throw) = real continuous motion.
- **Big gaps** (scene→scene, e.g. throw→pendant) = lean on the **shard-wipe** as the connective
  motion ("black-glass shards sweep the frame and reveal ..."), so the change reads as our wipe, not
  a weird blend. This matches the site's no-hard-cut language.
- Keep grade words identical to the stills (grainy 35mm analog, deep gold-and-black void) so video ≡ keyframes.

## Pitfalls (from the guides)
1. Vague escalation ("stuff happens") — name the exact beat progression.
2. No perspective/continuity lock — add **"single continuous take, no cuts, no hard zoom"** or
   seedance inserts a cut by default.
3. Single flat angle — give it a move.
4. Undershooting VFX/SFX detail — be specific and chronological.
5. Forgetting aspect ratio / duration up front — pacing mismatch.
6. Saying "clean/3D/CG" for our world — keep "photographed practical, analog, NOT CG" (same as images).

## Lessons (analysed)
- **V1 — Missing continuity lock.** MISTAKE: C1's prompt had no "single continuous take / no cuts /
  no zoom" → seedance may insert an unwanted cut mid-clip (its documented default). FIX: every clip
  prompt ends with `single continuous take, no cuts, no hard zoom`.
- **V2 — Camera under-specified.** MISTAKE: C1 said "slow cinematic push-in" but gave no **stability**
  and no subject lock. FIX: `Camera: slow push-in, locked on him, steady gimbal`.
- **V3 — Transition not narrated for start→end.** MISTAKE: C1 described the two states but not the
  MOTION morph between them; risk = a lazy dissolve. FIX: explicitly narrate start→end ("...the disc
  flares and the world fractures, shards blasting toward camera as it resolves on the full shatter").
- **V4 — Under length.** MISTAKE: C1 ≈ 55 words, just under the 60–100 band. FIX: fill to ~70–90 with
  concrete physics + one camera move + chronological SFX (no filler adjectives).
- **V5 — Grade drift risk.** Always restate the locked grade ("grainy 35mm analog, deep gold-and-black
  void, embers/soot, practical light, NOT CG") so the clip matches the keyframes and the rest of the chain.
- **V6 — seedance locks the START frame, NOT the END frame (verified, C1).** MISTAKE: assumed
  `end_image` would hard-lock the last frame so clip N ends exactly on K(N+1) for a seamless join.
  QA of C1 (K1→K2): first frame vs K1 = histCorr 0.998 / ncc 0.969 (locked ✓); **last frame vs K2 =
  histCorr 0.842 / ncc −0.10 (NOT locked ✗)** — seedance invented its own ending. FIX: do not rely on
  end-frame morphing for the join. Either (a) make each clip a living-motion animation of ONE keyframe
  (start_image only) and join clips with the site's **glass-shard wipe** (no hard cut — hides the seam),
  or (b) use a true first-last-frame-lock model for morphs. Always run the endpoint-preservation QA
  (`scratchpad/vqa.py`: first≈start, last≈end, glitch spike_ratio<6) on EVERY clip before accepting.
- **V7 — Verify, don't assume, endpoint preservation.** Every clip: decode with OpenCV, compare
  first/last frames to the intended keyframes (ncc>0.8 = preserved), scan consecutive-frame diffs for
  cut/glitch spikes, and eyeball mid-frames for unwanted scene morphing. No clip is "done" un-QA'd.
- **V8 — Design the LOGICAL connection between the two frames (director's core skill).** MISTAKE:
  prompting a generic action ("he casts, world fractures") and hoping the clip bridges the two
  keyframes. FIX: **look at both frames, then reverse-engineer the motivated motion + camera that
  physically carries frame N into frame N+1** — including a camera move that makes the BACKGROUND
  change logical (e.g. the camera **orbits** so a different backdrop reads as a new angle, not a cut).
  Name the character's action, the body mechanics, and the camera path as one continuous move.
  Example (C1 K1→K2, director): "he turns to his right and throws the disc from behind his back;
  camera orbits around him so the backdrop rotates naturally; he lands defending himself with the
  disc (K2)." Do this per clip — the connection is authored, never left to chance.

## Kling v3.0 (our endpoint-lock model for the seamless chain)
Chosen over seedance for the chain because it **hard-locks first AND last frame** (seedance drifts the
end — V6) and costs less (~10 cr vs 22.5 for K1→K2). Params: `mode` std/pro/4k, `sound` on/off,
duration 3–15s, roles `start_image`+`end_image`, multi-shot up to 6 angles.
- **K1 — prompt order:** **Scene → Characters → Action → Camera → Audio & Style.** Ground the
  environment first, then who, then the motion arc, then the camera, then sound/grade.
- **K2 — think like a DoP, not a photographer.** Describe how things MOVE over time (Kling models
  time/space/physics), not just how they look. Static-image-style prompts underperform.
- **K3 — lead with camera + motion verbs:** dolly push, whip-pan, shoulder-cam drift, tracking,
  crash zoom, snap focus; define the camera-subject relationship over the whole take ("stays medium,
  freezes when he pauses, resumes smoothly"). Clear motion = fewer artifacts.
- **K4 — first/last frame IS the transition tool:** clip N `end_image` = clip N+1 `start_image` →
  smooth natural morph. This is the chain. Still run `vqa.py` (last frame ncc>0.8 vs the end keyframe).
- **K5 — multi-shot** (up to 6 angles from one image) exists; for our single-morph clips keep it OFF
  (one continuous take) so the join stays clean.
- Keep the same grade/audio discipline as seedance (V4/V5) and the continuity lock (V1: "single
  continuous take, no cuts").

---
*Append new video lessons below as they are learned. Never delete a lesson. Sources: Higgsfield
Seedance prompting guide; apiyi/imagine.art/promeai Seedance 2.0 guides; atlabs/fal/vicsee/magichour
Kling 3.0 prompting guides (2026-07).*
