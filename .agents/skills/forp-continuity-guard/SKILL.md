---
name: forp-continuity-guard
description: "Use to run the FORP asset validity loop — verifying that every place, character, object and wardrobe option in an episode's shotlist resolves to a real Higgsfield asset (Soul/Element in the registry) or a scheduled Asset Plan item, that wardrobe/damage states chain legally across shots, and that per-asset hard rules and model compatibility are honored. Invoke before locking any FORP shotlist, or when the user asks to validate assets, wardrobe, continuity, or references."
argument-hint: "[path to episode folder]"
user-invocable: true
---

# FORP Continuity Guard — Loop 4 (Assets & Continuity)

Run the asset loop from `../forp-episode-engine/reference/qa-loops.md` (§Loop 4). Load that file
plus `../forp-episode-engine/reference/asset-registry.md` and the episode's `ASSET-PLAN.md`.
Do NOT load other reference files.

## Procedure

0. **Deterministic scanners first (free):** `python3 ../forp-episode-engine/scripts/forp_validate.py
   registry-check` and `resolve <shotlist>` — malformed UUIDs and unknown `<<<element_id>>>`
   placeholders are script findings, not judge work.
1. **Freshness gate:** if the registry snapshot is older than the episode's Phase 1 date, refresh
   first (`show_characters`, `show_reference_elements`, `balance`) and update asset-registry.md —
   validating against a stale registry is a wasted pass.
2. **Resolution sweep:** extract every character, environment, prop and wardrobe token from every
   shotlist row and prompt. Each must resolve to an exact `soul_id`/`element_id` in the registry
   or to a scheduled Asset Plan item (with creation route and cost). Unresolvable token = finding.
3. **State-chain audit:** per character and per prop, order all appearances by shot and verify the
   wardrobe/damage/possession chain is legal (no un-torn jackets, no props teleporting between
   hands, no reset without an explained cause). Build the chain table in the QA log.
4. **Hard-rule audit:** check each asset's own rules from the registry notes (e.g. uomo-v2 face
   never visible; iphone-15 screen always dark). Any prompt or row violating one = finding.
5. **Compatibility audit:** Souls only in `soul_2`/`soul_cinema_studio` keyframe plans, one Soul
   per generation; Elements only with Element-supporting models; multi-character frames use
   Elements. Model column of each row must be legal for its references.
6. Fix findings at the owning artifact; escalate LOCKED-artifact changes to the director.
   **Exit on two consecutive clean passes.**

## Output

QA-LOG.md entry (pass counts, findings, chain tables), updated ASSET-PLAN.md if new assets were
scheduled, rows advanced toward QA-PASSED. In chat: counts + escalations only.
