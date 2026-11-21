# Fenka

The personal site of Nad Orfali at [fenka.co.uk](https://fenka.co.uk/). Next.js exports static HTML for GitHub Pages.

## Local development

Use Node.js 22.13 or newer.

```sh
npm ci
npm run dev
```

For a production-style preview and the browser checks:

```sh
npm run build
npm run preview
```

`npm run preview` serves `out/` at `http://127.0.0.1:4173`. Run the tests in a second terminal, or let Playwright start the preview itself:

```sh
npx playwright install chromium
npm run test:e2e
```

## Edit the site

- Edit page copy in `app/` and project summaries and details in `lib/projects.ts`.
- Add a Markdown file to `content/journal/`. Its filename becomes the URL slug under `/writing/`. Set `title`, `description`, `topic`, `date` (YYYY-MM-DD) and `draft` in the front matter. Use level-two headings in the body. The page supplies the article title.
- Local builds include review drafts and mark them `noindex`. The Pages workflow sets `FENKA_INCLUDE_DRAFTS=0` to omit them. RSS and the sitemap include published entries only. Set the publication date and change `draft` to `false` when an article is approved.

The Atlas screenshot is from the London AI Atlas project. Its map data comes from [OpenStreetMap contributors](https://www.openstreetmap.org/copyright).

## GitHub Pages

The export lives in `out/` and includes the existing `fenka.co.uk` CNAME. For the approved cutover, keep the custom domain in the repository’s Pages settings and select **GitHub Actions** as the Pages source. Then run **Publish Fenka to GitHub Pages** from `main`. The workflow runs only on manual dispatch from `main`. It can also be served from any static host that serves directory indexes.
