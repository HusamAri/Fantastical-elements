# EDITING, ASSEMBLY & SOUND — operator reference

How shots become a scene: cutting theory, seam-hiding, assembling AI clips into one seamless piece,
and the sound that ties it together. (StudioBinder, NoFilmSchool, Murch *In the Blink of an Eye*,
Frame.io, Krotos, Kling/Runway workflow guides; 2024–2026.)

## 1. Murch's Rule of Six (priorities of a good cut — memorize the order & weights)
1. **Emotion — 51%** (does the cut serve what the audience should FEEL — protect at all costs)
2. **Story — 23%** (does it advance the story)
3. **Rhythm — 10%** (is it at the right moment)
4. **Eye-trace — 7%** (respects where the eye is looking)
5. **2D plane / screen direction — 5%** (the stage line / graphics of the flat screen)
6. **3D spatial continuity — 4%** (true physical continuity)
Top two = 74%. **Sacrifice from the bottom up** — keep the emotion even if it costs continuity.
**Masking:** satisfying a higher rule hides violations of lower ones (good eye-trace hides a
stage-line slip; fixing the stage-line won't rescue bad eye-trace). **The blink:** a cut "works" when
it lands where the viewer is mentally ready to blink (a completed thought / new idea).

## 2. Continuity ("invisible") editing — make cuts disappear
- **Match on action** (cut mid-movement so motion carries across the join) = the universal invisible cut.
- **180° line, screen direction, eyeline, 30° rule, eye-trace** — see DIRECTING.md; the editor obeys
  what the director shot.
- **Motivated cut:** cut only when there's a REASON (a look, a sound, a new beat, completed action).
  An unmotivated cut feels jarring. (Oxford: cut to a shot causally inferable from the previous one.)

## 3. Split edits — sound leads/lags picture (natural, pro dialogue/scene flow)
- **J-cut** = audio of the NEXT shot starts BEFORE its picture (audio leads) → anticipation, pulls us
  forward into the next beat. **L-cut** = audio of the PREVIOUS shot continues OVER the next picture
  (audio lags) → lingering resonance. They mimic real perception (we often hear before we look).
- For us: use J/L cuts + a **sound bridge** to smooth every seam between clips.

## 4. Montage theory (when we WANT the cut felt, not hidden)
- **Kuleshov effect:** meaning comes from juxtaposition — the same face reads as hunger/grief/desire
  next to soup/coffin/woman. Editing itself makes meaning; the audience projects.
- **Eisenstein — collision/dialectic:** shot A + contradictory shot B → a NEW idea (synthesis). Five
  methods: **metric** (cut on fixed frame counts/beat), **rhythmic** (cut to on-screen movement),
  **tonal** (cut on emotional tone), **overtonal** (all three), **intellectual** (juxtapose to make an
  abstract idea). Continuity = hide the cut; montage = foreground it for emotion/idea.

## 5. Transitions that carry meaning
- **Hard cut** (default, invisible) · **dissolve** (~1–2s = passage of time / thematic link; length ∝
  time implied) · **fade in/out** (scene/film start-end; fade-to-black = finality/death; fade-to-white
  = memory/dream) · **wipe** (energetic decisive location change) · **smash cut** (abrupt shock/irony)
  · **match cut** (shared shape/motion/sound = intentional link) · **jump cut** (unease/time/energy).
- **Our language:** the **glass-shard wipe** is our signature scene-change (an object wipe); the
  **eye-blinder white flash** at the ultimate is a flash cut to the settle.

## 6. Assembly workflow (the pipeline)
paper cut → **log/organize** → **selects/stringout** → **assembly cut** (all usable footage in story
order, no creative choices, long) → **rough cut** (story decisions, trims, continuity — director +
editor, the intensive phase) → **fine cut** (best takes, frame-accurate pacing/tone) → **picture lock**
(no more cut changes; unlocks color/sound/VFX) → **sound + color**.
Build the assembly: order per shotlist, pick best take, **trim heads & tails**, establish-then-detail.
- **Trimming tools:** *ripple* (change one clip's length, shift the rest — total duration changes);
  *roll* (move a shared cut point — total length unchanged); *slip* (change which footage shows, same
  duration/position); *slide* (move a clip's position, neighbors compensate).

## 7. Seam-hiders (mask the join between shots / AI clips)
Cutting on action · match cut · **whip-pan/whip-cut** (cut inside the motion blur) · **object/body
wipe** (a subject fills the lens, cut while frame is obscured — our shard-wipe) · **defocus/blur cut**
· **morph cut** (blend two similar frames) · **flash/impact cut** (cut on a bright flash/hit — our
sun-blinder) · **sound bridge / J&L cuts** · **reframe/punch-in**.

## 8. Assembling AI-generated clips into ONE seamless piece (our State 8–9)
- **Short clips** (~3–5s, ≤8s) cut together better and drift less than one long generation. Over-
  generate coverage; keep selects.
- **Trim heads & tails** — AI output has black/unstable settle frames at both ends; cut them.
- **Chain via last→first frame** (our Kling chain): clip N's end frame = clip N+1's start frame → the
  join is a match-on-action seam. Keep the same grade/lens/pace across clips.
- **Color-match / unify with a LUT** so clips from different generations read as one piece; normalize
  exposure/WB first, then LUT; apply the same reference-image match across all clips.
- **Prefer cut-on-action / match-move** over gimmicky in-generation whip/snap (which smears textures —
  do speed-ramps/whips in the EDIT, not the model).
- **Audio bed unifies silence:** a continuous ambience + a music motif that does NOT stop at the cut
  makes disparate clips feel like one scene; add whooshes/impacts/sub-drops ON the cuts; foley for
  camera moves. Finish = assemble → grade → music + SFX + (VO) across the whole span.

## 9. Sound design layers (sound sells impact more than picture)
- **Diegetic** (in-world: disc whoosh, glass shatter, ember crackle, footsteps) vs **non-diegetic**
  (score, designed sub-bass, risers). Layers: **score / ambience bed / SFX / foley**.
- **Sound-first:** let sound lead the cut (J-cut) and carry impact (a sub-drop + shatter on the shatter
  beat lands harder than the visual alone). **Silence** is a tool — drop out before the ultimate for
  the blinder to hit. Our clips generate native audio (Kling `sound on`); unify with a bed + motif in post.

## 10. Rhythm & pacing (the tempo engine)
- **ASL (average shot length)** = runtime ÷ shots. Modern ≈ 4–6s; contemplative 10–13s (2001, TWBB);
  frantic ≈ 2–2.5s (Bourne). Set a baseline ASL, then **deviate**: shorter than baseline = intensity,
  longer = relief. Our ~5s clips sit in the cinematic band; shorten the fight beats, hold the settle.
- **Accelerate to build:** progressively shorten shots toward a climax (cross-cut shrinking). Films
  measurably shorten shots + raise motion into the climax, then lengthen + calm for the resolution —
  mirror this: quicken through action → interrupt/last-drop → Flame, then hold on the ultimate + settle.
- **Cut to music:** land impacts on the **downbeat**; the **anticipation cut** (cut 1–2 frames BEFORE
  the beat) makes the hit feel stronger. Don't cut every beat — hold through quiet passages, then cut
  hard on a downbeat. Put the most dynamic shots on the strongest beats.
- **Hold for emotion:** a long hold reads grief/wonder/dread; a quick cut reads shock/tension-release.
  Hold a beat AFTER the key moment (don't cut immediately) so it lands.
- **Vary rhythm** (mix holds + rapid cuts) to avoid monotony; structure in tension→release waves.

## 11. Impact-sound design (make beats HIT)
- **BRAAAM / sub-bass hit:** deep resonant sub-bass (below ~80 Hz — felt more than heard) with a
  high-frequency transient on the attack, then a multi-second tail; built by layering brass + drone +
  percussive hit. Use on the shatter and the ultimate.
- **Riser** (rising volume/pitch/texture) ramps tension toward a cut/reveal — use into the ultimate.
  **Hit/stinger** = fast-attack transient + low end to punctuate. **Whoosh** sweetens motion (disc
  throw, camera move, teleport).
- **Silence before loud:** near-silence maximizes the next impact (A Quiet Place). Strip ambience just
  before the blinder; let the sun-burst hit into that vacuum. Silence = "presence of threat," not lack.
- **Layer by frequency band** (low/low-mid/mid/high) to avoid **masking**; keep a designed sound to
  3–5 layers. **Sound is half the picture** — a simple visual lands when the audio sells it.
- **Diegetic** (disc whoosh, glass shatter, ember crackle, foley) vs **non-diegetic** (score, BRAAAM,
  riser). **Sound bridge / J-cut** carries a sound across a seam to glue clips.

## FORP application
Assemble the 16 Kling clips in the N=17 order; each join is a shard-wipe or match-on-action seam;
the ultimate→settle is a flash cut; unify with a gold-black LUT + a continuous score motif with
sub-bass swells, disc whooshes, glass SFX, and a silence-then-blinder at the climax. Emotion first
(Murch): protect the feeling of each beat over perfect continuity.
