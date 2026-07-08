# Credit & Token Efficiency Doctrine

Two currencies, one principle: **spend thinking where it's free, spend money only on locked
decisions.**

## Higgsfield credits

1. **`get_cost: true` before every job.** No exceptions. Record the number in the budget sheet.
2. **Keyframe-first.** A still answers identity, wardrobe, set, light and framing for a fraction
   of a video's price. Video only from an approved keyframe (`start_image`).
3. **One-shot discipline.** The QA loops exist so that the first take is the intended take.
   Regeneration without a FLAGS.md investigation is a protocol violation, not a shortcut.
4. **Silent by default.** `sound: off` / `generate_audio: false` — audio is designed in the edit.
5. **Resolution ladder.** Generate at the locked spec, not the maximum; `upscale_video` /
   `upscale_image` a good take instead of regenerating at higher resolution.
6. **Budget caps.** Episode budget ≤ 40% of account credits at Phase 1; kill-and-replan gate at
   80% spend (see generation-protocol.md).
7. **Reuse before re-render.** Check `show_generations` / the episode take log for an existing
   take that covers a new need (B-roll, inserts, reaction cutaways) before rendering new ones.
8. **`count: 1`.** Multi-variant generation (count 2–4) only on explicit director request for a
   deliberate A/B on a HIGH-risk shot — never as ambient habit. (The "4x calibration batch"
   technique was researched and rejected — it conflicts with one-shot discipline.)
9. **Trim headroom, not extensions.** Generating 1–3 s over the edit target is cheap; a too-short
   take is a full regeneration.
10. **Toggle audit.** Cinema mode + camera motion + upscale + sound can turn a ~6–14 credit clip
    into 70–80+. Audit every toggle at submission; `get_cost` is the only number trusted —
    third-party credit tables were researched and rejected as mutually contradictory.
11. **Audio is +50–100%.** Silent drafts always; audio only on locked finals that need it.
12. **Never iterate on the premium model.** Draft tier iterates; premium tier runs once.
13. **Plan around expiry.** Monthly credits don't roll over; top-ups expire ~90 days. Plan
    generation waves against the current balance, not aspirationally.
14. **Budget the funnel.** Finished-to-raw runs ~1:2–1:3 in seconds even for disciplined teams —
    the episode budget carries that allowance explicitly instead of assuming per-shot perfection.

## Claude tokens

1. **Progressive disclosure.** SKILL.md files stay under ~80 lines and defer to reference/*.md;
   a loop loads ONLY the reference file it needs.
2. **Artifacts over conversation.** Every decision lands in a file (blueprint, shotlist, blocks,
   flags). Sessions resume from files, never from re-explaining. One episode = one folder = the
   whole state.
3. **Checklists over open reasoning.** The loops run fixed checklists; free-form analysis is for
   findings, not for rediscovering the standards each time.
4. **One-pass writing.** Draft documents completely, then run the loop; don't micro-iterate
   paragraph by paragraph in chat.
5. **Batch the diffable.** Registry refresh, cost preflights and status updates are batched at
   phase boundaries, not sprinkled through the session.
6. **Don't re-read what you wrote.** Trust file state; re-open a file only to edit it or when a
   loop's checklist requires verification against it.
