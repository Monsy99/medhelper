# MedHelper

A small collection of quick reference calculators for everyday clinical
tasks — a landing page of tiles, each linking to one focused, single-purpose
tool. Built as a static site with Next.js and deployed to GitHub Pages.

**Every tool is for reference only and is not a substitute for clinical
judgment.** See each tool's own `README.md` for its formula and limitations.

## Stack

- [Next.js](https://nextjs.org) (App Router, static export)
- TypeScript
- Tailwind CSS v4
- Jest + React Testing Library
- GitHub Actions → GitHub Pages

## Getting started

```bash
npm install
npm run dev
```

Open [http://localhost:3000](http://localhost:3000).

## Scripts

| Command            | Does what                                    |
| ------------------ | --------------------------------------------- |
| `npm run dev`       | Start the dev server                          |
| `npm run build`     | Production build (static export to `out/`)    |
| `npm run lint`      | ESLint                                        |
| `npm test`          | Run all tests once                            |
| `npm run test:watch`| Run tests in watch mode                       |

Run `npm run lint && npm test && npm run build` before pushing — this is
exactly what CI runs.

## Project structure

```
src/
  app/
    page.tsx                 landing page (renders tiles from src/lib/tools.ts)
    layout.tsx                root layout — header + global styles
    tools/<slug>/page.tsx     one thin route per tool, wraps the feature in ToolShell
  components/                 shared chrome: Header, ToolShell, ToolTile, Disclaimer
  features/<slug>/             one folder per tool — calculation logic, UI, tests, README
  lib/tools.ts                 tool registry — the single source of truth for the landing page
docs/
  adding-a-new-tool.md         step-by-step guide for adding another calculator
```

Each tool's documentation lives next to its code, in
`src/features/<slug>/README.md` — read it before changing that tool's logic.

## Adding a new tool

See [docs/adding-a-new-tool.md](docs/adding-a-new-tool.md).

## Deployment

Pushes to `main` build and deploy automatically via
[`.github/workflows/deploy.yml`](.github/workflows/deploy.yml) to GitHub
Pages. One-time setup after the repo is pushed to GitHub: **Settings → Pages
→ Source → GitHub Actions**.

The build reads `GITHUB_REPOSITORY` in CI to set Next's `basePath`
automatically (so it works at `https://<user>.github.io/<repo>/`) — no config
changes needed when the repo is created. Locally, `npm run dev` and
`npm run build` serve from `/` as usual.
