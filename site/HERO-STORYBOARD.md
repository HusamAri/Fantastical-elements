# FORP Hero — "The Fragments" (scroll-scrubbed cinematic intro)

A ~15s cinematic, scrubbed by scroll on the landing hero. Husam (the creator) bends flame; the
universe fractures; his six FORP fragments burst out one by one, each with its slogan + link;
the sequence ends in darkness with an invitation to create your own fragment that launches the
playbook. Cinematic language: **Half-Blood Prince** — desaturated steel-blue / teal-green grade,
low-key, misty, silver highlights, the fire the only warm accent.

## Assets (Higgsfield, one-shot discipline)
- **Keyframe A** — Husam fire-bender hero (soul_cinematic, HBP grade). ✅ generated.
- **Video shots** (image-to-video from keyframes; kling3_0 / seedance_2_0, sound off, HBP grade):
  - **S1 (0–5s) Summon:** Husam in stance, draws the coil of ember-fire around his forearm; the
    air behind him begins to crack; slow push-in. Camera drifts behind him.
  - **S2 (5–10s) Shatter:** the space shatters into black-glass shards flying outward; six motes
    of amber light streak out (the fragments leaving him). Camera lateral.
  - **S3 (10–15s) Dodge & fade:** an attacker silhouette lunges from frame-left; Husam pivots and
    dodges, sweeping a wall of flame; the shards settle; everything sinks to black.
- Fragment plates are HTML overlays synced to scroll (not baked), so slogans are legible and the
  links are clickable.

## Scroll choreography (progress 0→1 over ~600vh pinned)
| Progress | Video time | Beat | HTML overlay |
|---|---|---|---|
| 0.00–0.08 | 0.0s | Black. Title "CURATED CHAOS" fades in, then out. | title |
| 0.08–0.34 | 0–5s (S1) | Husam summons flame; push-in; cracks spread. | — |
| 0.34–0.40 | ~5s | First shard bursts. | Fragment I **Agustín** — "A minimalist visual poem about artistic awakening" → link |
| 0.40–0.46 | | | Fragment II **Najoua** — "Kindness mistaken for weakness — until she spoke" |
| 0.46–0.52 | 5–10s (S2) | Universe shatters, fragments streak out. | Fragment III **Başak** — "From protective invisibility to deliberate presence" |
| 0.52–0.58 | | | Fragment IV **Yaşar Efe** — "The figure who returns the blade to himself" |
| 0.58–0.64 | | | Fragment V **Baver** — "A year of surviving panic without yielding" |
| 0.64–0.70 | | | Fragment VI **Federica · Espera** — "Foglia d'Oro — the gold leaf beneath her skin" |
| 0.70–0.90 | 10–15s (S3) | Attacker lunges; Husam dodges; wall of flame; settle. | brief: "Six were witnessed." |
| 0.90–1.00 | 15s → black | Full dark. | CTA: **"Dark and fantastical elements."** + "Create your own fragment →" |

Each fragment plate: fragment name (Cormorant), slogan (Montserrat), and a hairline "Enter →"
link to `https://curatedchaos.artifactstudio.info/en/works/fragments/<slug>`. Slugs:
agustin · najoua · basak · yasar-efe · baver · federica.

## The CTA → playbook
The final "Create your own fragment" button routes to `/create`, which begins the playbook's
Phase 0 (premise / blueprint intake) — the first step of `forp-episode-engine`. On the site that
is a dedicated page that opens the fragment-creation flow (blueprint prompts), so a click on the
hero literally starts the playbook.

## Technique (validated)
- Scroll-scrubbed video: the shots are concatenated into one MP4 (H.264, ~1080p) OR extracted to
  a WebP/JPEG frame sequence; scrubbed by mapping ScrollTrigger progress → `video.currentTime`
  (desktop) or → sequence frame index (mobile/iOS, which throttles video scrubbing).
- Overlays are the cue-sheet-driven HTML plates (15/70/15 windows), on flat scrims, AA-safe.
- Reduced-motion: the video is replaced by Keyframe A as a still, fragments listed in flow, CTA
  in flow — full narrative, no scrub.
