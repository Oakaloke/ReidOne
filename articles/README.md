# ReidOne — Articles

This folder holds the topical articles that appear on **[read.html](../read.html)**.
The Read page builds its card grid automatically from `articles.json`, so there is
**no build step** and nothing to compile — it's plain HTML + a little vanilla JS,
which is exactly what GitHub Pages serves.

## Publish a new article in 2 steps

**1. Create the article page.**
Copy `TEMPLATE.html` to a new file named after your slug, e.g. `articles/john316.html`,
and fill in the `[[ BRACKETED ]]` placeholders. Leave the header, footer, and styles
alone so the article matches the rest of the site.

**2. Add one entry to `articles.json`.**
Add an object to the array. Newest article shows first automatically (it sorts by
`date`), so the order in the file doesn't matter.

```json
{
  "slug": "john316",
  "title": "The Most Famous Verse",
  "verse": "John 3:16",
  "category": "Scripture",
  "date": "2026-08-15",
  "summary": "One sentence that appears on the card in the Read grid.",
  "file": "articles/john316.html"
}
```

Commit and push both files. That's it — the article goes live on `reidone.org/read.html`.

## Field reference (`articles.json`)

| Field      | Meaning                                                            |
|------------|-------------------------------------------------------------------|
| `slug`     | Short id, usually the filename without `.html` (e.g. `john316`).   |
| `title`    | Headline shown on the card and the article page.                  |
| `verse`    | The key passage (e.g. `John 3:16`). Shown on the card.            |
| `category` | Topic label, e.g. `Christian Living`, `Prayer`, `Scripture`.      |
| `date`     | Publish date in `YYYY-MM-DD`. Controls sort order (newest first). |
| `summary`  | One-sentence teaser shown on the card.                            |
| `file`     | Path to the article, **relative to the site root** — always starts with `articles/`. |

## Notes

- Keep `file` as `articles/<slug>.html` (root-relative) — that's what `read.html` links to.
- If an article quotes the **ESV**, keep the Crossway credit line in its footer
  (it's already in `TEMPLATE.html`). Remove it if you quote a different translation.
- If `articles.json` is ever empty, the Read page shows a friendly "No articles yet"
  message instead of an empty grid.

## Files here

- `articles.json` — the list that powers the Read grid.
- `TEMPLATE.html` — copy-ready article shell.
- `ephesians432.html` — the first published article (Ephesians 4:32), a working example.
- `README.md` — this file.
