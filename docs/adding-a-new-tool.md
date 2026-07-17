# Adding a new tool

Every tool lives in its own folder under `src/features/<slug>/` plus a thin
route under `src/app/tools/<slug>/page.tsx`. Use `src/features/bmi-calculator`
as the reference example.

1. **Create the feature folder** at `src/features/<slug>/`:
   - `calculate.ts` — pure, framework-free calculation function(s). No React,
     no DOM. This is what gets unit tested, and what an AI agent can read in
     full to verify the math without touching any UI code.
   - `calculate.test.ts` — Jest tests for every branch of `calculate.ts`,
     including invalid-input cases.
   - `<ComponentName>.tsx` — a `"use client"` component: form inputs + live
     result, built on `calculate.ts`. No page-level chrome (no title, no back
     link, no disclaimer) — that's the route's job via `ToolShell`.
   - `<ComponentName>.test.tsx` — a Testing Library test that renders the
     component and drives it with `@testing-library/user-event`.
   - `README.md` — formula, inputs/outputs, units, and known limitations.
     Required for any tool that performs a clinical calculation.

2. **Register the tool** in [`src/lib/tools.ts`](../src/lib/tools.ts) — add a
   `{ slug, name, shortDescription, icon }` entry. This array is the single
   source of truth the landing page reads to render tiles, so it's the only
   place you need to touch to make the tool discoverable.

3. **Add the route** at `src/app/tools/<slug>/page.tsx`:

   ```tsx
   import type { Metadata } from "next";
   import { ToolShell } from "@/components/ToolShell";
   import { ComponentName } from "@/features/<slug>/ComponentName";

   export const metadata: Metadata = {
     title: "<Tool Name> — MedHelper",
     description: "<short description>",
   };

   export default function Page() {
     return (
       <ToolShell title="<Tool Name>" description="<short description>">
         <ComponentName />
       </ToolShell>
     );
   }
   ```

4. **Verify**: `npm run lint && npm test && npm run build`.

## Conventions

- Units go in every label (kg, cm, mg, mL, ...) — never a bare number input.
- Pure calculation logic never lives inside the component; it always lives in
  `calculate.ts` so it can be unit tested without rendering anything.
- Treat invalid/empty input as "no result yet", not an error state. The
  component converts raw strings to numbers and only calls into
  `calculate.ts` once every value is present and positive — see
  `toPositiveNumber` in either existing feature component.
  `calculate.ts` functions themselves should throw (`RangeError`) on
  non-positive/NaN input, since by the time they're called the component has
  already guaranteed valid input; the throw is a safety net, not a UI path.
- Every tool that performs a clinical calculation ships a `README.md`
  documenting the formula and its limitations, and renders inside
  `ToolShell` so the disclaimer is shown automatically.
- Keep tools framework-simple: no new state management library, no new UI kit
  — plain React state and Tailwind utility classes match the rest of the app.
