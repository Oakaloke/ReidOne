# ReidOne — Journey Together

Static website for the **ReidOne** ministry (reidone.org). Built with plain HTML, CSS,
and a small amount of vanilla JavaScript — no framework, no build step — so it hosts
directly on **GitHub Pages**.

## Structure

```
index.html        Home
read.html         Article hub (renders cards from articles/articles.json)
articles/         Topical article pages + articles.json data + TEMPLATE.html (see articles/README.md)
bible.html        Bible study hub (books of the Bible)
about.html        Mission, leadership, what we do
connect.html      Contact / give / prayer / subscribe
css/styles.css    Single shared stylesheet
js/main.js        Single shared script (menu, active nav, year, demo forms)
.nojekyll         Serve files as-is on GitHub Pages
CNAME             Custom domain (reidone.org)
old/              Preserved previous Next.js site (not served)
```

## Design

- **Fonts:** Fraunces (serif headings) + Inter (sans body), loaded from Google Fonts.
- **Palette:** warm cream neutrals with a single terracotta accent (`#BD5B36`).
  All colors live as CSS custom properties at the top of `css/styles.css` — change them
  in one place to re-skin the whole site.

## Editing content

- Text and images are inline in each `.html` file — search for the heading and replace.
- Placeholder images use [placehold.co](https://placehold.co). Swap the `src` URLs for
  your own images (e.g. an `images/` folder).
- Forms are **front-end demos** (`data-demo` in the markup). To actually receive
  submissions, point each `<form>` at a provider such as Formspree, Netlify Forms, or
  your own endpoint, and remove the `data-demo` attribute.

## Local preview

Open `index.html` in a browser, or run a tiny local server:

```bash
python3 -m http.server 8000
# then visit http://localhost:8000
```

## Deploy to GitHub Pages

1. Commit and push to the `main` branch of `github.com/Oakaloke/ReidOne`.
2. In the repo: **Settings → Pages → Source → Deploy from branch → `main` / root**.
3. Add the custom domain `reidone.org` (the `CNAME` file is already included) and point
   your DNS at GitHub Pages.
```
