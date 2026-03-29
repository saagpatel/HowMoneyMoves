![React](https://img.shields.io/badge/React-19-61DAFB?logo=react&logoColor=white) ![TypeScript](https://img.shields.io/badge/TypeScript-5.9-3178C6?logo=typescript&logoColor=white) ![Tailwind CSS](https://img.shields.io/badge/Tailwind_CSS-3.4-06B6D4?logo=tailwindcss&logoColor=white) ![Framer Motion](https://img.shields.io/badge/Framer_Motion-11-0055FF?logo=framer&logoColor=white) ![Vite](https://img.shields.io/badge/Vite-8-646CFF?logo=vite&logoColor=white) ![Deployed on Vercel](https://img.shields.io/badge/Deployed_on-Vercel-000000?logo=vercel&logoColor=white)

# HowMoneyMoves

Interactive animated explainer tracing a dollar through the US banking system — ACH, Fedwire, SWIFT, and the rails behind every transaction.

## What It Does

HowMoneyMoves walks you step-by-step through the actual plumbing of US banking: how a paycheck becomes an ACH file, how it travels through the Federal Reserve's settlement network, how SWIFT wires reach foreign banks, and how fractional reserve banking multiplies deposits. Each section is a narrated animation with step-by-step controls, real wonky facts sourced from NACHA, the Fed, and the APA, and error-case callouts showing exactly what breaks and why. The goal is to make the invisible infrastructure you use every day something you can actually see.

## Tech Stack

| Layer | Technology |
|---|---|
| Framework | React 19 + React Router 6 |
| Language | TypeScript 5.9 |
| Animations | Framer Motion 11 |
| Styling | Tailwind CSS 3.4 |
| Icons | Lucide React |
| Build | Vite 8 |
| Testing | Vitest 4 + Testing Library |
| Deployment | Vercel (SPA rewrites) |

## Prerequisites

- Node.js 18+
- npm or compatible package manager

## Getting Started

```bash
# Install dependencies
npm install

# Start development server
npm run dev

# Run tests
npm test

# Build for production
npm run build

# Preview production build
npm run preview
```

## Project Structure

```
HowMoneyMoves/
├── public/               # Static assets (favicon, OG image, icons)
├── src/
│   ├── components/       # Shared UI (Layout, NarrativePanel, SectionNav, ControlBar, StepIndicator)
│   ├── data/
│   │   └── sections/     # Content data for each banking rail (paycheck, ACH, direct-deposit, fed-settlement, swift, fractional-reserve)
│   ├── lib/              # Utilities and hooks (animation config, document head)
│   ├── pages/            # Route-level components (Home, SectionPage, NotFound)
│   ├── scenes/           # Animated SVG scenes per section (AchScene, SwiftScene, etc.)
│   ├── types/            # Shared TypeScript types
│   ├── App.tsx           # Root router
│   └── main.tsx          # Entry point
├── index.html
├── vite.config.ts
├── tailwind.config.ts
└── vercel.json           # SPA rewrite rules
```

## Sections Covered

1. **Paycheck & Payroll** — How your employer generates a NACHA file and submits it two days before pay day
2. **Direct Deposit** — How ACH credits flow from payroll processor to your account
3. **ACH Debit (Pull)** — How recurring bills and subscriptions pull money, and what return codes like R01 and R10 mean
4. **Fed Settlement** — How Fedwire settles reserve balances between banks in real time
5. **SWIFT** — How international wire transfers route through correspondent banks
6. **Fractional Reserve** — How deposit multipliers work and how the Fed controls the money supply

<!-- TODO: Add screenshot -->

## License

No license file is present in this repository.
