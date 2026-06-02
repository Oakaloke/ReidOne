# Reid One

A Christian ministry website dedicated to glorifying the God of the Bible and
helping believers faithfully steward what He has entrusted to them — their
**spiritual** life, **physical** health, and **financial** resources.

The centerpiece is **Reid Shepherd**, a stewardship framework built on exactly
three pillars, with a **Weekly Review** to keep your stewardship before the Lord.

---

## Tech stack

- **Next.js 15** (App Router)
- **TypeScript** (strict)
- **Tailwind CSS v4**
- **Static export** (`output: "export"`) — deployable to any static host
- Fonts: Playfair Display (serif headings) + Inter (body), via `next/font`

## Pages

| Route | Purpose |
| --- | --- |
| `/` | Home — hero, three-pillar preview, guiding question |
| `/about` | Mission and values |
| `/statement-of-faith` | Core biblical convictions |
| `/resources` | Practices and reading by pillar |
| `/reid-shepherd` | **Primary page** — pillars + Weekly Review prototype |
| `/contact` | Contact form (composes a `mailto:`) |

## The Reid Shepherd framework

Exactly **three** primary pillars (defined once in [`lib/pillars.ts`](lib/pillars.ts)):

1. **Spiritual** — Prayer, Scripture, Church, Worship, Service, Gratitude
2. **Physical** — Exercise, Sleep, Nutrition, Energy, Discipline
3. **Financial** — Budgeting, Saving, Giving, Stewardship, Debt Reduction

**Guiding question:** _“Am I faithfully stewarding what God has entrusted to me?”_

### Weekly Review prototype

A client-side form (no backend) that saves to `localStorage` and renders a
summary card on submit. Fields: Spiritual / Physical / Financial scores (1–10
button pills), Biggest Win, Biggest Struggle, One Focus For Next Week, and
Prayer Reflection.

---

## Local development

```bash
npm install
npm run dev      # http://localhost:3000
```

## Build & static export

```bash
npm run build    # outputs static site to ./out
```

`npm run build` runs `next build`, which (with `output: "export"`) writes a fully
static site to the `out/` directory.

## Lint

```bash
npm run lint
```

---

## Deploy to Cloudflare Pages

This site is a pure static export, so Cloudflare Pages needs no adapter.

### Option A — Git integration (recommended)

1. Push this repo to GitHub.
2. In the Cloudflare dashboard: **Workers & Pages → Create → Pages → Connect to Git**.
3. Select the repository, then set:
   - **Framework preset:** `Next.js (Static HTML Export)`
   - **Build command:** `npm run build`
   - **Build output directory:** `out`
   - **Node version:** set env var `NODE_VERSION` = `20` (or higher)
4. **Save and Deploy.** Every push to `main` redeploys automatically.

### Option B — Direct upload via Wrangler

```bash
npm run build
npx wrangler pages deploy out --project-name reid-one
```

> **Note on the project folder name:** the on-disk folder contains an apostrophe
> (`Matt's Projects`). Next's favicon metadata-route loader can't handle an
> apostrophe in the absolute path, so the favicon is served from `public/favicon.ico`
> instead of `app/favicon.ico`. This does not affect deployment.

---

_Soli Deo Gloria — to God alone be the glory._
