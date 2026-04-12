# How Money Moves

An interactive web explainer that traces a dollar from paycheck through the full US banking pipeline — direct deposit, bank account, ACH transfer, Fed settlement, SWIFT wire, and fractional reserve mechanics — visualizing the actual plumbing of the US banking system. Six fully animated scenes with keyboard navigation, SEO optimization, OG image, and Vercel deployment. Target audience: financially literate adults who use these systems daily but have never seen how they work.

## Tech Stack
- **React 18** + **TypeScript 5** (strict mode, hooks only)
- **Vite 5** — build tool, dev server
- **Framer Motion 11** — animation engine for all SVG/DOM transitions
- **Tailwind CSS 3.4** — utility styling
- **React Router 6** — section-based URL routing (e.g., `/ach`, `/swift`, `/fed`)
- No backend, no API calls — fully static site

## Status
Phase 3 complete — all planned phases shipped:
- Phase 0: Vite scaffold, animation framework, data layer
- Phase 1: First 3 animated SVG scenes + reusable animation primitives
- Phase 2: All 6 animated scenes complete, keyboard navigation, content polish
- Phase 3: SEO meta tags, OG image, vercel.json config, skip-to-content accessibility, Vercel deploy

Scenes implemented: paycheck deposit, direct deposit, ACH transfer, Fed settlement, SWIFT wire, fractional reserve banking.

## Build & Run
```bash
npm install
npm run dev        # development server
npm run build      # production build
npm run preview    # preview production build locally
```

Deployed to Vercel — `vercel.json` config in repo root.

## Architecture
- `src/scenes/` — one component per animated scene (Paycheck, DirectDeposit, ACH, FedSettlement, SWIFT, FractionalReserve)
- `src/lib/animation-config.ts` — all animation duration/easing constants (no magic numbers inline)
- `src/data/facts.ts` — all financial facts and copy (nothing hardcoded in JSX)
- `src/components/` — reusable primitives: animated arrows, flow labels, institution icons
- All diagrams are hand-authored SVG animated with Framer Motion (no D3)
- URL-per-section routing enables deep-linking and sharing

## Known Issues
- No mobile-specific layout optimizations — designed for desktop/tablet viewports
- Financial facts sourced at build time; not updated for regulatory changes post-launch
