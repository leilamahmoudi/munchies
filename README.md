# 🍔 Munchies

A pixel-perfect restaurant discovery app built with Next.js 16. Filter by food category, delivery time, and price range.

> 🐘 Let's address the elephant in the room — I got help from [Claude](https://claude.ai/code).

## ✨ Features

- 📱 **Mobile-first splash screen** — `/welcome` with the full green treatment before the app loads
- 🗂 **Filter sidebar** — desktop: narrow down by food category, delivery time, and price range
- 🏷 **Category scroll** — horizontally scrollable food category cards on both mobile and desktop
- ⏱ **Delivery time filter** — pill row on mobile, sidebar section on desktop
- 🃏 **Restaurant cards** — open/closed status, delivery time, and a green arrow button
- 💀 **Skeleton loading** — shimmer animations so the wait feels intentional
- 📐 **Pixel-perfect UI** — matched to Figma down to the 0.6px border and the `-0.5px` letter spacing (yes, really)
- 🔄 **Fully responsive** — 375px mobile (app-01 + app-02) through 1440px desktop, pixel-matched at every breakpoint

---

## 🛠 Tech Stack

| Thing | Why |
| ----- | --- |
| **Next.js 16** | App Router, Turbopack |
| **React 19** | last version |
| **TypeScript** | Because `any` is a cry for help |
| **Tailwind CSS v4** | CSS-first config, no `tailwind.config.*` needed |
| **TanStack Query v5** | Server state management |
| **SF Pro** | Via `-apple-system` — free on macOS |

---

## 🚀 Getting Started

```bash
# Install dependencies
npm install

# Start dev server (Turbopack, localhost:3000)
npm run dev

# Production build
npm run build

# Serve production build
npm start

# Lint
npm run lint

# Run tests (single pass)
npm run test:run
```

---

## 📁 Project Structure

```
src/
├── app/
│   ├── page.tsx           # Home route — filtering logic lives here
│   ├── welcome/
│   │   └── page.tsx       # Mobile splash screen (app-01)
│   ├── layout.tsx         # Root layout, SF Pro font setup
│   └── globals.css        # Tailwind v4 + shimmer skeleton + fade-in animations
├── components/
│   ├── filters/
│   │   ├── FilterSidebar.tsx         # Desktop left sidebar (lg+)
│   │   ├── FilterTopbar.tsx          # Horizontal category scroll (all sizes)
│   │   ├── MobileDeliveryFilter.tsx  # Delivery time pills (mobile only)
│   │   ├── FilterButton.tsx          # Reusable filter pill button
│   │   └── __tests__/
│   │       └── FilterButton.test.tsx # Component render + interaction tests
│   ├── restaurant/
│   │   ├── RestaurantCard.tsx         # The star of the show
│   │   ├── RestaurantCardSkeleton.tsx # Card-shaped loading state
│   │   └── RestaurantList.tsx         # List + "Restaurant's" heading
│   ├── layout/
│   │   ├── AppShell.tsx   # Page layout: header + sidebar + main
│   │   └── Header.tsx     # Top nav with responsive Munchies logo
│   ├── providers/
│   │   └── QueryProvider.tsx  # TanStack Query client setup
│   └── Logo.tsx           # SVG logo, supports white + black variants
├── hooks/
│   ├── useRestaurants.ts     # Fetches all restaurants
│   ├── useFilters.ts         # Fetches food categories
│   ├── useOpenStatus.ts      # Per-restaurant open/closed status
│   ├── usePriceRange.ts      # Single price range lookup
│   └── usePriceRangeMap.ts   # Batch price range map
├── lib/
│   ├── api.ts         # All API calls (BASE_URL lives here)
│   ├── queryKeys.ts   # TanStack Query key factory
│   ├── utils.ts       # toggleSet + DELIVERY_BUCKETS (shared pure functions)
│   └── __tests__/
│       └── utils.test.ts  # Unit tests for filter utilities
├── test/
│   └── setup.ts       # Vitest + jest-dom setup
└── types/
    └── index.ts       # Shared TypeScript types

vitest.config.ts       # Vitest config (jsdom, path aliases)
```

---

## 🔌 API

All data comes from a live REST API:

```
https://work-test-web-2024-eze6j4scpq-lz.a.run.app
```

| Endpoint                   | What it returns                     |
| -------------------------- | ----------------------------------- |
| `GET /api/restaurants`     | All restaurants                     |
| `GET /api/filter`          | Food categories                     |
| `GET /api/open/:id`        | Open/closed status for a restaurant |
| `GET /api/price-range/:id` | Price range for a restaurant        |

---

## 🎨 Design System

Matched to a Figma file. Key decisions:

- **Font**: SF Pro via system font stack — falls back to `system-ui` on non-Apple devices
- **Border**: `0.6px solid rgba(0,0,0,0.1)`
- **Letter spacing**: `-0.5px` across all text
- **Card radius**: `8px` for restaurant cards, `10px` for the filter sidebar
- **Green**: `#00703A`

---

## 🐛 Known Limitations

- Open status is fetched per card — lots of waterfall requests, but the skeletons look great

---

## 🤔 FAQ

**Q: Why is the border `0.6px`? That's not even a real pixel.**  
A: The designer said so. We don't ask questions.

**Q: Why SF Pro? Not everyone has a Mac.**  
A: On non-Apple devices it falls back to `system-ui` which looks perfectly fine. Also, have you considered getting a Mac?

**Q: Why `-0.5px` letter spacing on everything?**  
A: It makes the text look 37% more premium. This is science.

**Q: Why is the welcome page green?**  
A: `#00703A`. The one true green. Don't argue with the brand.

**Q: Mobile layout is different from desktop — is that intentional?**  
A: Completely. The Figma has two separate designs: app-01 (splash), app-02 (mobile main), and a web version (desktop). All three are implemented and pixel-matched.

---

_Built with 🍟 and an unhealthy attachment to Figma._
