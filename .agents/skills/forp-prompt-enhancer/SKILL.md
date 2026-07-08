---
name: forp-prompt-enhancer
description: "Use to run the FORP prompt loop — turning shotlist draft prompts into copy-paste-ready, fully self-contained Higgsfield prompts (image keyframe + video) that pass the stranger test and never reference another prompt or shot. Invoke when the user asks to enhance/finalize/verify prompts, or before any FORP shotlist row can be locked."
argument-hint: "[path to episode folder or shot IDs]"
user-invocable: true
---

# FORP Prompt Enhancer — Loop 3 (Prompts)

Run the prompt loop from `../forp-episode-engine/reference/qa-loops.md` (§Loop 3). Load that file
plus `../forp-episode-engine/reference/prompt-standards.md` and the episode's `PROMPT-BLOCKS.md`
and `FLAGS.md` (all episodes' FLAGS.md files if present — flag rules are permanent and global).
Do NOT load other reference files.

## Procedure — per prompt, in shotlist order

Step 0 (free, before any reasoning): run the deterministic scanners from
`../forp-episode-engine/scripts/forp_validate.py`:
1. `prompt-scan <shotlist>` — banned adjectives + dependence phrases over the whole file;
2. `extract-video-prompts <shotlist>` then `prompt-scan <shotlist>.videoprompts.txt --video` —
   the motion-only scan runs ONLY on extracted video prompts (a whole-file --video scan
   false-positives on image prompts);
3. `duration-check <shotlist>`.
Fix script findings first; judges never re-check what the scripts already cover.

1. **Assemble, don't freestyle:** rebuild the prompt from the episode's locked Prompt Blocks
   (`[CHAR:*] [ENV:*] [LIGHT:*] [GRADE] [PHYSICS] [NEG]`) + the row's shot-specific fields, in the
   exact field order from prompt-standards.md. Blocks are copied byte-for-byte.
2. **Stranger test simulation:** re-read the result with zero context. List every fact a model
   would have to guess (who, wearing what, where, lit how, lens, motion timing, duration). Every
   guess is a defect — fix by adding the missing observable fact, never by adding mood adjectives.
3. **Checklist:** run the full prompt QA checklist at the bottom of prompt-standards.md, plus
   every `New rule for prompt-enhancer` line from FLAGS.md.
4. **Independence & uniqueness sweep** (whole episode, not per prompt): no prompt references
   another shot; no two prompts are byte-identical; every restated lock matches its block verbatim
   (diff them — do not eyeball).
5. Freeze passing prompts into their rows. **Exit on two consecutive clean passes over the full
   set.**

## Output

Prompts written into the shotlist rows (image + video fields), QA-LOG.md entry with pass counts
and defect list, rows marked eligible for LOCK. In chat: counts and any defect that required a
judgment call — not the prompts themselves unless asked.
