# How Money Moves

## Overview
An interactive web explainer that traces a dollar from paycheck → direct deposit → bank account → ACH transfer → Fed settlement → SWIFT wire, visualizing the actual plumbing of the US banking system. Target audience: financially literate adults (25–40) who use these systems daily but have never seen how they work. Built as a static React site deployable to Vercel.

## Tech Stack
- React 18 + TypeScript 5 (strict mode, hooks only)
- Vite 5 — build tool, dev server
- Framer Motion 11 — animation engine for all SVG/DOM transitions
- Tailwind CSS 3.4 — utility styling
- React Router 6 — section-based URL routing (e.g., `/ach`, `/swift`, `/fed`)
- No backend. No API calls. Fully static.

## Development Conventions
- TypeScript strict mode — no `any`, no non-null assertions without comment
- Component files: PascalCase (`AchFlow.tsx`), utilities: kebab-case (`format-currency.ts`)
- Animation constants in `src/lib/animation-config.ts` — no magic duration numbers inline
- All financial facts sourced and cited in `src/data/facts.ts` — no unverified numbers in UI copy
- Conventional commits: `feat:`, `fix:`, `chore:`, `content:`

## Current Phase
**Phase 0: Scaffold + Animation Framework**
See IMPLEMENTATION-ROADMAP.md for full phase details.

## Key Decisions
| Decision | Choice | Why |
|----------|--------|-----|
| Animation engine | Framer Motion (not GSAP) | Better React integration, declarative API, no license cost |
| Routing | URL-per-section | Deep-linkable, shareable sections |
| Data layer | Static TypeScript constants | No API latency, works offline, simple to update |
| Deployment | Vercel (static export) | Zero config, free tier, CDN included |
| Diagram approach | SVG + Framer Motion (not D3) | Full control over animation, no D3 learning curve |
| Color system | Dark background, neon accent traces | Money/fintech aesthetic, trace paths pop visually |

## Do NOT
- Do not use D3.js — all diagrams are hand-authored SVG animated with Framer Motion
- Do not add real-time data or API calls — this is a static educational tool
- Do not build all 7 sections in one phase — build Phase 1 MVP (3 sections) first and verify animation quality before expanding
- Do not add features not in the current phase of IMPLEMENTATION-ROADMAP.md
- Do not use class components — hooks only
- Do not put financial facts inline in JSX — all copy comes from `src/data/facts.ts`
