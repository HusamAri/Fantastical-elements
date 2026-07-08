---
name: forp-continuity-guard
description: "Use to run the FORP asset validity loop — verifying that every place, character, object and wardrobe option in an episode's shotlist resolves to a real Higgsfield asset (Soul/Element in the registry) or a scheduled Asset Plan item, that wardrobe/damage states chain legally across shots, and that per-asset hard rules and model compatibility are honored. Invoke before locking any FORP shotlist, or when the user asks to validate assets, wardrobe, continuity, or references."
argument-hint: "[path to episode folder]"
user-invocable: true
---

# FORP Continuity Guard — Loop 4 (Assets & 360° Continuity)

Enforces **GOVERNANCE §7 (the 360° Continuity Law)**: every character, every signature object, and
every location must hold continuity from every angle across every shot. Run the asset loop from
`../forp-episode-engine/reference/qa-loops.md` (§Loop 4). Load that file plus
`../forp-episode-engine/reference/asset-registry.md`, the episode's `ASSET-PLAN.md`, and its
`VISUAL-BIBLE.md` (for location maps + object cards). Do NOT load other reference files.

## Procedure

0. **Deterministic scanners first (free):** `python3 ../forp-episode-engine/scripts/forp_validate.py
   registry-check` and `resolve <shotlist>` — malformed UUIDs and unknown `<<<element_id>>>`
   placeholders are script findings, not judge work.
1. **Freshness gate:** if the registry snapshot is older than the episode's Phase 1 date, refresh
   first (`show_characters`, `show_reference_elements`, `balance`) and update asset-registry.md —
   validating against a stale registry is a wasted pass.
2. **Resolution sweep:** extract every character, environment/**location**, prop/**object** and
   wardrobe token from every shotlist row and prompt. Each must resolve to an exact
   `soul_id`/`element_id` in the registry or to a scheduled Asset Plan item (with creation route
   and cost). Unresolvable token = finding.
2.5 **Reference-lock precondition (GOVERNANCE §7) — BLOCKING:** every character, signature object
   AND location must have BOTH (a) a Bible entry with a verbatim lock description (DNA card /
   object card / location 4-view map) and (b) a real **reference asset** it embeds into generation
   (Soul, Element, or locked approved frame). A token carried by text description alone, with no
   reference asset, is a **blocking finding** — generation for any row using it is barred until the
   reference exists. Text is not a lock. (This is the rule whose absence produced costume drift.)
3. **State-chain audit:** per character, per object, and per location, order all appearances by
   shot and verify the wardrobe/damage/possession/dressing chain is legal (no un-torn jackets, no
   props teleporting between hands, no room re-decorating between cuts, no reset without an
   explained cause). Build the chain tables in the QA log. Cross-angle check: the same object and
   room must read identically from reverse angles (360° continuity), not just within one framing.
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
