<!-- BEGIN:nextjs-agent-rules -->
# This is NOT the Next.js you know

This version has breaking changes — APIs, conventions, and file structure may all differ from your training data. Read the relevant guide in `node_modules/next/dist/docs/` before writing any code. Heed deprecation notices.
<!-- END:nextjs-agent-rules -->

# MedHelper

A landing page of small clinical reference calculators, each one a tile
linking to its own tool page. Static-exported Next.js, deployed to GitHub
Pages via `.github/workflows/deploy.yml`.

## Adding or changing a tool

Read [docs/adding-a-new-tool.md](docs/adding-a-new-tool.md) first — it's the
full step-by-step convention for how a tool is structured. Short version:

- Each tool is a self-contained folder at `src/features/<slug>/`: pure
  `calculate.ts` (+ `calculate.test.ts`), a `"use client"` component (+ its
  own Testing Library test), and a `README.md` with the formula and known
  limitations. Read that `README.md` before touching a tool's math.
- `src/lib/tools.ts` is the single source of truth for which tools exist —
  the landing page renders directly from it. Adding a tool to the landing
  page means adding one entry there, nothing else.
- The route under `src/app/tools/<slug>/page.tsx` is a thin wrapper: it
  supplies the page title/description and wraps the feature component in
  `ToolShell`, which adds the back link and the medical disclaimer
  automatically. Don't duplicate that chrome inside the feature component.

## Things to not break

- **Static export**: `next.config.ts` sets `output: "export"`. Nothing in
  this app can depend on a Node.js server at runtime — no route handlers, no
  server actions, no `next/image` optimization (already set to
  `unoptimized`). If a feature seems to need a server, that's a sign it
  doesn't belong in this app as currently deployed.
- **`basePath`**: GitHub Pages serves this site from `/<repo-name>/`, not
  `/`. The `basePath` is derived from `GITHUB_REPOSITORY` in CI (see
  `next.config.ts`) — always navigate with `next/link` (or `useRouter`),
  never a hardcoded `href="/tools/..."` string via a raw `<a>`, and never a
  raw `<img src="/...">` for anything in `public/` — both bypass Next's
  automatic `basePath` prefixing and will 404 once deployed.
- **The disclaimer**: every tool that performs a clinical calculation must
  render inside `ToolShell` (see any existing `src/app/tools/*/page.tsx`) so
  the "for reference only" disclaimer is always shown next to a result.
- **Units in every label**: a bare number input on a medical calculator is a
  dosing-error risk. Every input label (or its suffix, via `NumberField`)
  states its unit (kg, cm, j, mL, ...).
- **UI kit**: components are [shadcn/ui](https://ui.shadcn.com) built on
  `@base-ui/react`, generated into `src/components/ui/*` via
  `npx shadcn@latest add <component>` — don't hand-edit generated files
  beyond what the CLI produces, and don't introduce a second component
  library. Base UI's polymorphic prop is `render` (e.g.
  `<Button render={<Link href="/" />}>`), **not** Radix's `asChild` — see
  `ToolShell.tsx` for the pattern.
- **Single forced light theme**: `globals.css` sets `color-scheme: light` on
  `html` and there is no `.dark` class or theme toggle anywhere. Don't add
  `dark:` variant classes — they will never activate, and this is
  intentional (a second untested theme is exactly how the "unreadable"
  regression this app once had happens again).

## Verifying changes

`npm run lint && npm test && npm run build` — same as CI. `npm run build`
catches static-export-incompatible code that `next dev` won't complain about.
