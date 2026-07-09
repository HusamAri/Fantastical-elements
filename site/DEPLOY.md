# Deploying the hero-video site (`site/`)

The production site is the **`site/`** folder (Vite build → `dist/`), served at
`fantastic-elements.artifactstudio.info` (Vercel project `fantastic-elements`,
team `husamaris-projects`).

## Fastest — deploy from your machine (you're already logged in)
```bash
cd site
vercel --prod
```
That builds `site/` and ships it straight to the production domain. Root
Directory settings don't matter for a CLI deploy — it deploys the current
folder.

## From a Claude Code session (needs the token loaded at session start)
Set `VERCEL_TOKEN` in the environment settings, then start a **fresh** session
(env vars only load at session start), and run:
```bash
cd site && vercel deploy --prod --token "$VERCEL_TOKEN" --yes
```

## One-time fix so Git push auto-deploys (optional, durable)
The Vercel project's **Root Directory is the repo root**, so the Git
integration currently builds the wrong `index.html`. To make pushes to `main`
auto-deploy the hero site, set **Root Directory = `site`** in
Vercel → Project → Settings → Build & Deployment (or via
`vercel projects` API with a token). After that, no manual deploys are needed.

## Verify it's live
```bash
curl -s https://fantastic-elements.artifactstudio.info/ | grep -o '<title>[^<]*</title>'
# expect: <title>Curated Chaos — Fragments of Real People</title>
```
