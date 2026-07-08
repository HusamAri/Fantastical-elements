---
name: forp-scenario-qa
description: "Use to run the FORP logic loop on an episode's scenario, scene flow, or shotlist — catching cause-effect breaks, character knowledge/location errors, geography and 180-degree violations, orphan shots, Chekhov failures, and duration math errors. Invoke on any FORP episode artifact before it can be locked, or when the user asks to check/debug/test story logic, scene flow, or a shotlist."
argument-hint: "[path to episode folder or artifact]"
user-invocable: true
---

# FORP Scenario QA — Loop 2 (Logic)

Run the logic loop from `../forp-episode-engine/reference/qa-loops.md` (§Loop 2). Load that file
plus `../forp-episode-engine/reference/shotlist-standard.md` before starting. Do NOT load the
other reference files — this loop needs only these two.

## Procedure

1. Identify the entry artifact: scene breakdown and/or shotlist rows in the episode folder
   (`episodes/E<nn>-<slug>/`). If neither exists, stop and say what's missing.
2. **Pass = full checklist, artifact by artifact.** For each finding record:
   `finding → owning artifact → cause → proposed fix`. Findings are fixed at the artifact that
   owns them (story holes in the blueprint, not patched in a shot row).
3. Build the two verification tables in the QA log (they force the errors into the open):
   - **Character state table:** per scene × character — location, knowledge, goal, injury/wardrobe
     state. Any cell you cannot fill from the artifacts is a finding.
   - **Spatial map:** per fight set — positions and screen direction per shot. Any 180° cross
     without a bridge shot is a finding.
4. Apply fixes (or, if a fix changes a LOCKED artifact, flag it for director approval instead of
   applying).
5. Re-run. **Exit only on two consecutive clean passes.** Report: passes run, findings fixed,
   findings escalated, rows advanced to QA-PASSED.

## Output

Append to `episodes/E<nn>-<slug>/QA-LOG.md` (create if missing): date, loop, pass count, findings
table, exit status. Update shotlist row `Status` fields. Never advance a row that has an open
finding. Keep the report to the user short: counts + the findings that needed judgment calls.
