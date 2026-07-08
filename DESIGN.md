# DESIGN.md — Curated Chaos design tokens (from Brand Codex 2027, LOCKED)

When this file and improvisation disagree, this file wins. Tokens are decisions that refused to
be made twice — if a value is not here, it does not exist yet.

## Color

| Token | Hex | Name | Use |
|---|---|---|---|
| `bg.deep` | `#171D2D` | Deep Indigo | Backgrounds, authority, the dark archive |
| `bg.ivory` | `#F4F1ED` | Pearl Ivory | Light surfaces, the page, room to breathe |
| `bg.plum` | `#2B2139` | Plum Indigo | Nocturnal depth, secondary dark fields |
| `accent.blush` | `#DCC7CD` | Blush Stone | Emotional warmth, used sparingly |
| `neutral.gray` | `#8A8F98` | Cool Gray | Restraint, labels, micro-text |
| `neutral.mauve` | `#A79BAA` | Mauve Silver | Softness, memory, quiet transitions — decorative only, never carries information |

Universe palette (inside artwork/film frames only, never on brand UI surfaces): blue hour navy
`#1A2744`, sodium amber `#E8A832`, stone grey `#8C8C8C`.

No gradients. No glow. Color fields are flat; depth comes from light, grain and geometry.

## Typography

| Token | Value | Use |
|---|---|---|
| `font.serif` | Cormorant Garamond | Emotion, titles, art direction |
| `font.sans` | Montserrat Light | Structure, captions, labels, UI |
| `scale.h1` | Serif, large | One thought per page, nothing crowding it |
| `scale.h2` | Serif, medium | Section turns |
| `scale.body` | Sans, regular | Reading text, kept short |
| `scale.micro` | Sans, small caps | Labels, page numbers |

## Surface & texture

| Token | Value | Rule |
|---|---|---|
| `space.editorial.large` | Generous negative space | The default; crowding is the exception |
| `radius.card.soft` | 28px | Cards, containers, anything that holds content |
| `stroke.logo.fine` | 1–1.5px | Hairlines only — rules, logo construction |
| `texture.grain.soft` | 8–12% opacity | Paper grain over fields; felt, not seen |
| `brand.mark.hidden` | Blind emboss / low opacity | Hummingbird emblem is discovered, not announced |

## Motion

| Token | Value | Rule |
|---|---|---|
| `motion.orbit.slow` | Slow circular drift | The signature movement. Never fast, never purely decorative |
| Hook rule | First 3 seconds | Any video surface earns attention inside 3 s |
| Reduced motion | `prefers-reduced-motion` respected | Static or cross-fade fallbacks on every scroll effect |

## Contrast (WCAG AA on locked surfaces — body 4.5:1, large 3:1)

Approved pairings on locked surfaces (UI, captions, menus, forms, anything read):

| Text | Background | Verdict |
|---|---|---|
| Pearl Ivory | Deep Indigo | Pass — house default (dark) |
| Deep Indigo | Pearl Ivory | Pass — house default (light) |
| Pearl Ivory | Plum Indigo | Pass — nocturnal |
| Blush Stone | Deep Indigo | Large text only |
| Cool Gray | Deep Indigo | Pass — micro/labels (5.17:1) |
| Mauve Silver | Deep Indigo | Decorative only |

Cool Gray on Pearl Ivory computes to 2.89:1 and FAILS even the large-text floor — it is not an
approved pairing. Micro labels on ivory surfaces are set in Deep Indigo instead.

Free surfaces (covers, section dividers, art plates) may let mood win.

## Components

- Cards, dark variant: `bg.plum` or `bg.deep` fields, 28px radius, hairline strokes, grain
  overlay, ivory text.
- Cards, catalogue variant (site): `bg.ivory` face, Deep Indigo text (approved pairing), 28px
  radius, hairline strokes, grain overlay.
- Buttons/links: hairline-bordered or text-only; no fills that fight the field; hover = light
  response (subtle luminance shift), never glow.
- Captions INSIDE artwork/film frames (video deliverables only): white/ivory, Montserrat Light,
  subtle shadow, 0.3s fades, bottom-third positioning.
- Site scroll captions: flat panel or flat single-color scrim ONLY, 15/70/15 scroll-window
  grammar, no shadow — governed by STYLE-CONCEPT §4 / scroll-choreography.md.

## Precedence

For the site, `playbooks/chaos-site-style/STYLE-CONCEPT.md` refines this file (choreography,
surfaces, section specs); the tokens and approved pairings HERE still bind everywhere. Neither
file may introduce a value or pairing the other bans.
