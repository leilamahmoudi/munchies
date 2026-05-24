# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

@AGENTS.md

---

## 1. Project Overview

Munchies is a restaurant discovery app. Users browse and filter restaurants by food category, delivery time, and price range, then navigate to a restaurant for delivery.

- **Who it's for**: anyone looking for a restaurant
- **Optimises for**: fast filtering, visual browsing, pixel-perfect Figma fidelity
- **Key constraint**: every UI detail must match the Figma design exactly — spacing, typography, and colors are not estimates

---

## 2. Tech Stack

- **Framework**: Next.js 16, App Router, Turbopack
- **Language**: TypeScript (strict)
- **Styling**: Tailwind CSS v4 (CSS-first, no `tailwind.config.*`) + inline styles for Figma-exact values
- **Component library**: none — all components are custom
- **State management**: React `useState` for filter state in `page.tsx`; TanStack Query v5 for server state
- **Testing**: Vitest + React Testing Library
- **Build tooling**: Turbopack (default), ESLint flat config
- **Data**: external REST API, no database

---

## 3. Architecture

```
src/app/                     # Next.js App Router routes
  page.tsx                   # home route — filter state lives here
  welcome/page.tsx           # mobile splash screen
src/components/
  filters/                   # FilterSidebar (desktop), FilterTopbar (scroll), MobileDeliveryFilter
  restaurant/                # RestaurantCard, RestaurantCardSkeleton, RestaurantList
  layout/                    # AppShell (page wrapper), Header
  providers/                 # QueryProvider
  Logo.tsx                   # SVG logo, white + black variants
src/hooks/                   # one hook per API endpoint, all use TanStack Query
src/lib/
  api.ts                     # all fetch calls and BASE_URL
  queryKeys.ts               # TanStack Query key factory
src/types/index.ts           # all shared TypeScript types
```

**Data flow**: API → hooks → `page.tsx` → components via props

**Filtering**: client-side only, computed in `useMemo` in `page.tsx`, passed down as props

**Responsive**: single breakpoint `lg` (1024px). Below = mobile layout. At `lg` and above = desktop layout.

---

## 4. Coding Conventions

- **Components**: PascalCase named exports — `export function RestaurantCard`
- **Hooks**: camelCase with `use` prefix — `useRestaurants`, `useOpenStatus`
- **Files**: filename matches the export name — `RestaurantCard.tsx`, `useRestaurants.ts`
- **Client components**: add `'use client'` at the top whenever using hooks or browser APIs
- **Styling rule**: use Tailwind classes for layout, spacing, and responsive behaviour; use inline `style={{}}` only for pixel-exact Figma values (specific font sizes, letter spacing, px measurements)
- **Exports**: named exports everywhere except `src/app/` route files (Next.js requires default exports there)
- **Types**: define in `src/types/index.ts`, import via `@/types`

---

## 5. UI and Design System Rules

- Figma is the source of truth — match spacing, font size, weight, and letter spacing exactly
- **Breakpoint**: `lg` = 1024px
- **Font**: SF Pro via `-apple-system, BlinkMacSystemFont, system-ui`
- **Brand green**: `#00703A`
- **Border**: `0.6px solid rgba(0,0,0,0.1)` on cards and buttons
- **Letter spacing**: `-0.5px` on most text; `-1px` on the welcome headline
- **Backgrounds**: `#FAFAFA` main page; `#00703A` welcome page
- **Skeletons**: use `.skeleton` CSS class (shimmer animation defined in `globals.css`)
- **Fade-in**: use `.fade-in` CSS class on content that loads asynchronously
- **Logo size**: `w-[167px]` on mobile, `w-[274px]` on desktop

---

## 6. Content and Copy

- Keep all UI strings exactly as in Figma: `"Restaurant's"`, `"Delivery Time"`, `"Continue"`, `"Treat yourself."`
- Do not change existing copy without being asked
- No placeholder or lorem ipsum text

---

## 7. Testing and Quality Bar

- **Test runner**: Vitest + React Testing Library
- `npm run test:run` — single pass (CI); `npm run test` — watch mode
- **What's covered**: `toggleSet` utility (`src/lib/utils.ts`), `FilterButton` component
- Before marking any task done: run `npm run lint`, `npm run build`, and `npm run test:run` — all must pass
- **"Done" means**: matches Figma visually + no lint errors + build succeeds + tests pass

---

## 8. File and Component Placement

- New route → `src/app/[route]/page.tsx`
- New UI component → `src/components/[category]/ComponentName.tsx` (use the closest existing category folder)
- New data hook → `src/hooks/useXxx.ts`
- New type → add to `src/types/index.ts`
- New API call → add to `src/lib/api.ts`
- Do not create a new folder unless no existing category fits

---

## 9. Safe-Change Rules

Do not casually change:

- Any pixel value that came from Figma (font sizes, spacing, border radius, letter spacing) — these are intentional
- The Logo SVG paths in `src/components/Logo.tsx`
- The `lg` breakpoint — changing it affects both mobile and desktop layouts simultaneously
- API endpoints or query keys in `src/lib/api.ts` and `src/lib/queryKeys.ts`
- The `'use client'` directive on any component — removing it will break hooks

---

## 10. Commands

```bash
npm run dev       # start dev server (Turbopack, localhost:3000)
npm run build     # production build — run to verify no errors
npm run start     # serve production build
npm run lint      # ESLint (flat config — use this, not `next lint`)
npm run test:run  # run all tests (single pass)
npm run test      # run tests in watch mode
```

---

## Next.js 16 — Version-Specific Notes

- **Turbopack is the default** for both `dev` and `build`. Use `--webpack` to opt out.
- **`middleware.ts` is deprecated** — renamed to `proxy.ts`. The `proxy` export replaces `middleware`. The `edge` runtime is not supported in `proxy`.
- **Async Request APIs** — `params` and `searchParams` in pages/layouts must be awaited. Run `npx next typegen` to generate `PageProps`/`LayoutProps` helpers.
- **ESLint flat config** — configured in `eslint.config.mjs`. Use the plain `eslint` CLI, not `next lint`.
- **`cacheLife` / `cacheTag`** — no longer need the `unstable_` prefix.
- **React 19.2** — View Transitions (`<ViewTransition>`), `useEffectEvent` available.
- **React Compiler** — stable; opt in via `reactCompiler: true` in `next.config.ts`.

Before writing any feature, read the relevant guide in `node_modules/next/dist/docs/`.
