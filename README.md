# HowMoneyMoves

[![TypeScript](https://img.shields.io/badge/TypeScript-3178c6?style=flat-square&logo=typescript&logoColor=white)](https://www.typescriptlang.org/) [![License](https://img.shields.io/badge/license-MIT-blue?style=flat-square)](./LICENSE)

> You use the US banking system every day. HowMoneyMoves makes the invisible plumbing visible — step by step, animated, with the real numbers

HowMoneyMoves walks you through the actual infrastructure of US banking: how a paycheck becomes an ACH file, how it clears through the Federal Reserve's settlement network, how SWIFT wires reach foreign correspondent banks, and how fractional reserve multiplies deposits. Each section is a narrated Framer Motion animation with step-by-step controls, sourced from NACHA, the Fed, and the APA — plus error-case callouts showing exactly what breaks and why.

## Features

- **ACH deep dive** — trace a direct deposit from payroll system to NACHA file to Fed settlement to receiver bank, with batch timing and return codes explained
- **Fedwire walkthrough** — same-day RTGS settlement, Fedwire Funds Service architecture, and the Fedwire Securities service for government bonds
- **SWIFT visualization** — correspondent banking chains, SWIFT message types (MT103, MT202), and why international wires take days
- **Fractional reserve explainer** — animated money multiplier showing how $1,000 in deposits becomes $10,000 in loans at a 10% reserve ratio
- **Error cases** — what happens when ACH returns, Fedwire rejects, or a correspondent bank goes offline
- **Step-by-step controls** — scrub forward and back through each animation at your own pace

## Quick Start

### Prerequisites

- Node.js 18+
- npm (included with Node)

### Installation

```bash
git clone https://github.com/saagpatel/HowMoneyMoves.git
cd HowMoneyMoves
npm install
```

### Usage

```bash
# Development server
npm run dev

# Run tests
npm test

# Production build
npm run build

# Preview production build
npm run preview
```

## Tech Stack

| Layer | Technology |
|-------|------------|
| Framework | React 19 + React Router |
| Language | TypeScript |
| Animations | Framer Motion |
| Styling | Tailwind CSS |
| Icons | Lucide React |
| Build | Vite |
| Tests | Vitest + Testing Library |
| Deploy | Vercel (SPA rewrites) |

## Architecture

Each payment rail is a self-contained route with its own animation state machine. Framer Motion `AnimatePresence` drives step transitions; each step is a variant defined as a plain object so the animation logic stays in data, not in components. The step-by-step scrubber is managed by the `useScene` hook (`src/lib/use-scene.ts`), a plain `useState`-based custom hook that returns scene state and controls — all animation components derive their step from this hook, so scrubbing backward replays the exact same animation variants in reverse. No server — the entire app is a static SPA deployed to Vercel.

## License

MIT
