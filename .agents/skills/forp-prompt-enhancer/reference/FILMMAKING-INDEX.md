# FILMMAKING KNOWLEDGE BASE — index (read before directing any shot)

End-to-end craft references, researched and synthesized so the pipeline directs like a filmmaker, not
a prompt-typist. Read the relevant refs before authoring a beat/clip. All are append-only living docs.

## The references
1. **SCREENWRITING.md** — story/scenario: structure (3-act/8-sequence/Save the Cat/Hero's Journey),
   short-form & title-sequence storytelling (ending-first, hook, calm→threat→transformation→aftermath),
   character/emotion without dialogue, scene value-shifts, logline, the <120s wordless beat-sheet, story tests.
2. **DIRECTING.md** — visual storytelling + spatial grammar: motivate every shot, blocking/staging,
   the **180° / 30° / eyeline / screen-direction / match-on-action / eye-trace** rules, coverage,
   shot design & composition, pacing, fight directing — and **§C: how each rule maps to AI start/end-
   frame clips** (hold the axis across the chain; match-seam vs intentional ≥30° cut; coverage as clips).
3. **CINEMATOGRAPHY.md** — shot sizes, camera movements, fight/action language, and the per-beat shot
   plan for the FORP N=17 intro.
4. **SHOTLISTING.md** — the pro shotlist columns, deriving shots from the beat sheet, coverage per beat,
   storyboarding, numbering; our VIDEO-CHAIN table is the production shotlist.
5. **EDITING-SOUND.md** — Murch's Rule of Six, continuity editing, J/L cuts, montage (Kuleshov/
   Eisenstein), transitions, the assembly workflow, seam-hiders, assembling AI clips into one seamless
   piece, rhythm/pacing (ASL, cut-to-beat), and impact sound (BRAAAM/riser/sub-bass, silence-before-loud).
6. **KLING-CONTROL.md** — our video model: start/end-frame logic (describe only the in-between motion),
   multi-shot, Elements/Soul identity (endpoints already lock ours), motion control, frozen-prevention,
   the per-clip prompt template.
7. **VIDEO-PROMPT-LESSONS.md** — the append-only seedance/Kling prompting loop (V1–V11), incl. the
   endpoint-drift (seedance→Kling switch), frozen-items, static-character, and describe-motion-only lessons.
8. **PROMPT-LESSONS.md** — the image-prompting loop (L1–L26).

## The director's operating loop (per beat/clip)
1. **Story first** (SCREENWRITING): which beat, its value-shift, its place in the escalation.
2. **Design the shot** (DIRECTING + CINEMATOGRAPHY): size/angle/lens by emotion; the 180° axis + screen
   side; the motivated camera move; author the **logical motion connecting frame N→N+1** (lesson V8).
3. **Prompt it** (KLING-CONTROL + VIDEO-PROMPT-LESSONS): describe only the in-between motion (V11);
   every object moves/exits (V9); character action primary, not just camera (V10); grade + chronological SFX.
4. **QA it** (tools/vqa.py + frozen.py): endpoints ncc>0.8, no glitch spike, no frozen cells; face-audit.
5. **Assemble** (EDITING-SOUND): order per shotlist, trim heads/tails, join with shard-wipe/match-seam,
   unify grade (LUT) + a continuous score bed with impact hits; emotion first (Murch 51%).

## Readiness
With these in place the pipeline can: write a scenario, build a shotlist, design shots with correct
spatial grammar, author motivated AI clips, QA them objectively, and cut them into a seamless, scored
sequence. Sources are cited in each reference. This is the "good enough to direct" bar the director set.
