# FORP Asset Registry

The single source of truth for every generation-ready asset on the Higgsfield creator account.
A prompt may only reference characters, places, objects and wardrobe that exist in this registry
(or that the episode's Asset Plan explicitly schedules for creation). The continuity-guard loop
validates every shotlist row against this file.

Snapshot date: 2026-07-08. Refresh protocol at the bottom.

## 1. Trained Soul characters (identity models)

Souls give the strongest facial identity lock. Constraints (verified):

- A Soul works ONLY with `soul_2` (Soul V2 image) and `soul_cinema_studio` — not with Kling/Seedance directly.
- ONE `soul_id` per generation. Multi-character shots must use Elements instead.
- Standard flow: Soul → hero keyframe stills → save the approved still as an Element →
  use that Element in Kling 3.0 / Seedance 2.0 video prompts.

| Character | soul_id | Type | Status |
|---|---|---|---|
| Husam | `76fab95a-f542-47a4-9bbe-937981c52fef` | soul_2 | ready |
| Baver Anti-Hero | `8087ed13-e6ec-4547-b7b6-73748c340c40` | soul_cinematic | ready |
| Federica Zintu | `3ec2c83b-23e3-4f14-b258-8195e2b9dd32` | soul_2 | ready |
| Başak | `80be9f3f-fa63-4ee7-8253-68dd72fe06b1` | soul (legacy) | ready |
| Hüsam | `3d2745b3-bcfc-4191-8567-767f604756b3` | soul (legacy) | ready |

## 2. Reference Elements (reusable via `<<<element_id>>>` inside prompts)

Element-supported models, by MACHINE id (the friendly names are confusing — trust the ids):
- Image: `nano_banana_2` (friendly "Nano Banana Pro"), `nano_banana_flash` (friendly
  "Nano Banana 2"), `gpt_image_2`, `seedream_v4_5`, `seedream_v5_lite`, `cinematic_studio_2_5`.
- Video: Cinema Studio Video 2/3.0, `seedance_2_0`, `kling3_0`.

**Trap:** the standalone catalog id `nano_banana_pro` is NOT on the Element-supported list —
Element-referencing keyframes must use `nano_banana_2`. Reserve `nano_banana_pro` for
non-Element keyframes. Multiple `<<<element_id>>>` placeholders per prompt are allowed — for
single-image prompts this is the only way to lock two characters in one frame; multi-character
VIDEO shots may also use Seedance 2.0 `image_references` with separately tagged references per
character.

### Characters

| Element | element_id | Notes |
|---|---|---|
| fedecon | `5c561cbe-318e-4227-9529-c6d8a68310c0` | Federica variant |
| Federica-1 | `0c2c79a2-a88a-4801-896e-0086a7baff26` | |
| federica-v2 | `6edd27b8-ddaa-47fd-a5b7-6c0835cf5731` | |
| federica-v2-A | `e8484d9f-17a1-4be7-8b50-c1f80e525949` | |
| federica-v2-B | `2a33f57f-0032-437a-9249-e0327508b433` | |
| Federica Zintu New | `b3ce96b6-9bea-4332-80c0-692af1dde666` | |
| federica-destruccion | `ac66e742-422d-44c1-907f-20b68e53b4ba` | WARDROBE LOCK: leopard coat over bare shoulders, gold chain + pendant, dark brown hair soft waves, minimal makeup, freckled hands |
| uomo-v2 | `623ba0f3-fbb9-49cc-ab18-bd3a12bc549c` | Husam, Ch. VI. HARD RULE: face NEVER visible — behind/silhouette only |
| husam-destruccion | `14d4f83a-2a78-4143-9670-4f31747408b8` | WARDROBE LOCK: buzzed sides, textured crown, stubble, headphones on neck, black tee, from behind/silhouette |
| Mirror-self | `98969c27-e921-4daf-b2ed-daf62181f3b3` | |
| Predator-gece-look | `f281e13e-fd62-414a-b5e9-2deb0a3bc54b` | night look |
| The-Man-Verified | `2694b7e4-b6a0-4f1c-91f4-0c91505a28ba` | early-30s man, black wool tailored suit, written lock description on element |

### Environments

| Element | element_id | Notes |
|---|---|---|
| Eski-han | `e17d2723-5958-4966-83c3-f0ca02115bab` | old Ottoman han |
| sile-kayalik | `1c8fab48-6f8c-4ed2-b2b4-dcbc285749a8` | Şile basalt cliffs, pre-dawn blue, crying rocks |
| candles-place | `f93c56c7-2538-4f00-9ccb-6aa64b83916e` | |
| Hazirlik-odasi | `60994d3f-fd7d-43f2-9181-541a88d34023` | preparation room |
| ozel-gece-lounge | `5dc866fb-e185-4900-906e-935290ab0a91` | night lounge |
| consiglera-catisma-odasi | `aecef72c-f72b-4551-8976-181e776d79e0` | confrontation room |
| araba | `3d6a5b40-1c94-436c-87cc-ca6a31b99acd` | car interior/exterior |
| club-sokak | `55897451-d054-456d-93ea-aea8b3b8b6a6` | night club service street, wet asphalt, sodium lamp upper-right |

### Props & wardrobe

| Element | element_id | Notes |
|---|---|---|
| iphone-15-dark-glass | `2e1923f3-5bc2-4e7d-9247-3a57f8f8fb1c` | screen always dark glass, sodium amber edge light |
| altin-yaprak | `bc9146e2-f928-4164-9867-36c627ba082c` | golden leaf, real gravity + combustion physics |
| Couture-gown | `c7264fce-8ec1-4ca0-a6ef-50e13e82fde4` | |
| Leopar-statement-coat | `6651771c-1cc0-4cf6-b7ad-e72adc6744d6` | pairs with federica-destruccion lock |
| Consigliera-palto | `d5db280f-63fb-4166-8473-e680e251d68d` | |
| Necklage-of-Fede | `74930eee-cbb5-4c62-9a5b-f11526b736b9` | Federica's necklace |
| lapis-kararan | `54c6fc58-8ded-457d-8701-e1da8dd68597` | |
| piton-slip | `d078058d-0c24-4dce-8c37-8b346cf91d7b` | |
| -Sürüngen-ipek-elbise | `6ca62d8e-201e-4172-a65e-00a1c1d69b46` | reptile silk dress — the leading hyphen IS part of the platform name (verified live); match it exactly in token sweeps |
| Lapis-Necklace-Verified | `c9c18e1e-0c23-4b73-923d-df586e9e4f57` | lapis lazuli pendant on gold chain, written lock description on element |

## 3. Model constraints (verified via models_explore, 2026-07-08)

| Model | Type | Key facts |
|---|---|---|
| `nano_banana_pro` | image | 1k/2k/4k, all aspect ratios, image-to-image; keyframe workhorse |
| `soul_2` | image | requires `soul_id`; facial identity lock for stills |
| `kling3_0` | video | 3–15 s, modes std/pro/4k, `sound` on/off (off = cheaper), roles `start_image` + `end_image`, AR 16:9 / 9:16 / 1:1; multi-shot, motion transfer |
| `seedance_2_0` | video | 4–15 s, 480p→4k (mode `std`), mode `fast` cheaper ≤720p, `genre` hint (use `action`), `generate_audio` bool, roles: start_image, end_image, image_references, video_references, audio_references |
| `seedance_2_0_mini` | video | budget drafts, ≤720p, same reference roles |

Both `generate_image` and `generate_video` accept `get_cost: true` — a free preflight that returns
the credit price without submitting the job. MANDATORY before every generation, image and video.

## 4. Vault cross-references (Obsidian: Curated Chaos Universe)

- Character notes: `05 Human Archive/Fragments of Real People/<name>/`
- FORP Bible: `Projects/FORP Bible/`
- Visual assets in Drive: `Fragments of Real People/` (forp-yasar-efe.png + portrait.mp4 + eyes-closed + hands, baver-forp.png, forp-agustin-first-touch.png, forp-agustin-real life.png, forp-lotus-bloom.png, forp-vinyl.png, forp-background.png, forp-background-2.png)
- Characters with Drive visual assets but NO Soul/Element yet: **Yasar Efe** (4 assets),
  **Agustin** (2 assets). **Najoua**: unverified in vault, no known assets. **Başak** already has
  a legacy Soul (§1) but no vault note verified. To cast Yasar Efe or Agustin in an episode,
  first create Elements from their Drive assets (media_import_url → media_confirm →
  show_reference_elements action=create).

## 5. Registry refresh protocol

Run at Phase 1 (Asset Plan) of every episode — never mid-production:

1. `show_characters(action='list', status='ready')` → diff against §1.
2. `show_reference_elements(action='list')` → diff against §2 (paginate via next_cursor).
3. Format check: every id in this file matches the UUID shape 8-4-4-4-12 hex — a malformed id
   passes text QA and fails only at paid generation time (this exact defect has already been
   caught once by the validation loop).
4. `balance()` → record credits in the episode's budget sheet.
5. Any drift → update THIS file in the same commit as the episode's Asset Plan.
6. New wardrobe/look for an existing character = NEW Element with a written lock description
   (see federica-destruccion pattern) — never re-describe wardrobe ad hoc in prompts.
