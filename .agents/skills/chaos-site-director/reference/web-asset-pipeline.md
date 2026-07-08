# Higgsfield → Web Asset Pipeline — Night Wing

All site assets are generated under the FORP one-shot discipline
(`../../forp-episode-engine/reference/generation-protocol.md`): `get_cost:true` preflight on
every job that supports it (generate_3d / generate_image / generate_video / upscale_image —
`remove_background(video)` has no preflight; its single gated test job is the cost probe),
ledger row per take, triage-not-reroll, director gate before the batch runs.

## Batch plan (locked in STYLE-CONCEPT.md §7 — summary)

~24 stills (nano_banana_pro) · ~10 video jobs (kling3_0 / seedance_2_0) · 1 3D job
(multi_image_to_3d, Keystone) · 2 remove_background(video). Estimated 1,200–2,000 credits of
6,000 — ≥50% reserve target, **≥40% hard floor**. Pressure valve: video preflight >~1,800cr →
mineral turntables drop 3→2 before any hero asset is touched.

## Production rules

1. **Art-direct in 2D first.** Every 3D or video job starts from an approved still
   (keyframe-first). The still answers look/light/composition before motion or geometry spends.
2. **Locked prompt templates per asset family** (minerals share one template with token hex
   varying; Scars progression is one master still + nano_banana edit chain). One retake max per
   clip without a logged template change.
3. **The alpha gate:** ONE paid `remove_background(video)` test validates the stacked-alpha
   route before the vapor/particle batch runs.
4. **Emblem exception:** the hummingbird is NEVER in a generation prompt — relief/emboss normal
   maps derive from the owned brand vector in-engine.
5. **4K masters archived; delivery always downscaled.**

## Web conversion specs

| Asset type | Route | Budget |
|---|---|---|
| GLB meshes | gltf-transform/gltfpack: Draco (static) or meshopt (animated); KTX2 uastc/etc1s textures 1024–2048px | all real-time meshes together ≤3MB; hero ≤50k tris; measure on arrival, decimate to budget, never ship as-generated |
| Scrub sequences | ffmpeg → WebP q80, ≤1920px, 60–90 frames/scene; ImageBitmap decode; individual files over HTTP/2; per-section promise preload before pin activation | ~3–5MB per scene |
| Alpha video | remove_background(video) → stacked-alpha AV1/HEVC (`stacked-alpha-video`), 10-bit `yuva444p10le` mezzanine; HEVC .mov listed first for Safari; in-shader luma-matte as no-alpha fallback | — |
| Turntables | 3 video turntables + 2D regrades for variants; ~45-frame WebP sequences | — |
| Stills tier | ~10 composed 4K stills, one per hall key beat — these ARE the mobile tier, the reduced-motion plates, and the OG images. Planned up front, not retrofitted | — |

## Performance floor (site-side)

DPR ≤2 · all repeated geometry instanced · render loop paused when no 3D on screen ·
single-system handoff at hall boundaries (fog + dust only; dispose before load) · three-tier
ladder decided pre-first-render (full / device-tiered light / static) · desktop payload
12–18MB with per-section preload and network tiering · mobile fork at 800px terminates in images.

## Loop C checklist (run to two consecutive clean passes)

- [ ] Every planned job has: approved 2D reference, locked template id, `get_cost` preflight
      number, ledger row slot
- [ ] Batch total within budget; reserve floor respected after worst-case
- [ ] Every delivered mesh/sequence measured against its budget row before integration
- [ ] Alpha batch blocked until the single test job is approved
- [ ] FORP-character/world assets resolved against the FORP asset registry
      (`/forp-continuity-guard`)
- [ ] Stills tier covers every hall (mobile + reduced-motion + OG complete)
