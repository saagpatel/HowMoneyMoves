# How Money Moves — Implementation Roadmap

## Executive Summary

**What we're building:** A static React + TypeScript interactive web explainer that animates the path of money through the US banking system — from paycheck generation through direct deposit, ACH batch processing, Federal Reserve settlement, and SWIFT international transfer. Each section is a self-contained animated scene with step-by-step narrative control. Users click "next" to advance the animation, pause to read explanations, and optionally explore "What could go wrong?" branches. Target is a polished, shareable fintech explainer — the kind that goes viral on Twitter/LinkedIn because nobody has built this well.

**Riskiest parts:**
- **HIGH — Animation choreography complexity:** Multi-step SVG animations with synchronized text, timing, and state are easy to break. A dollar animating through 8 hops with explanatory tooltips that pause/resume correctly is genuinely hard. Mitigation: Build a reusable `AnimationScene` component abstraction in Phase 0 that all sections use. Define a `SceneStep` data type once. Test with the simplest section (paycheck) before building complex ones (Fed settlement).
- **HIGH — Financial accuracy:** Stating wrong settlement times, wrong T+1 cutoffs, or wrong SWIFT routing logic will get called out publicly. Mitigation: All facts live in `src/data/facts.ts` with inline source citations. Write the facts file first, get the data right, then build UI around it.
- **MEDIUM — Responsive SVG layout:** Hand-authored SVGs that look great at 1440px desktop may break at 375px mobile. Mitigation: Use `viewBox` with `preserveAspectRatio="xMidYMid meet"` on all SVGs from day one. Test on iPhone SE (375px) after every scene.
- **MEDIUM — Information density:** The ACH and Fed settlement sections have legitimately complex flows (NACHA file batches, deferred net settlement). Risk of overwhelming the user. Mitigation: Use progressive disclosure — show simplified flow by default, "show the details" toggle reveals batch structure, Reg E timing, etc.
- **LOW — Vercel deployment:** Zero config for Vite static builds. Non-issue.

**Shortest path to daily personal use / shippable MVP:**
- Phase 0 (Days 1–3): Scaffold + AnimationScene framework + facts data. Nothing visible yet but the foundation.
- Phase 1 (Days 4–8): 3 core sections animated and working — Paycheck/Direct Deposit, ACH, Fed Settlement. This is ~70% of the "banking plumbing" story.
- Phase 2 (Days 9–12): SWIFT section + fractional reserve explainer + polish. Full story complete.
- Phase 3 (Days 13–14): SEO, share cards, performance, deploy. Ship.

---

## Scope Boundaries

**In scope:**
- 6 animated sections: Paycheck → Direct Deposit → ACH Transfer → Federal Reserve Settlement → SWIFT Wire → Fractional Reserve explainer
- Step-by-step animation with forward/back controls and auto-play
- Explanatory sidebar with financial facts per step
- "What could go wrong?" collapse panels per section (NSF, routing errors, SWIFT sanctions hold, etc.)
- Dark-mode only (intentional design choice)
- Mobile-responsive (375px → 1440px)
- Shareable deep links per section

**Out of scope:**
- Real-time data (no API calls)
- User accounts or saved progress
- International banking systems beyond SWIFT (no SEPA, no CHAPS)
- Cryptocurrency / blockchain flows
- Light mode toggle
- CMS for content editing

**Deferred to post-launch:**
- Section 7: Zelle/RTP (real-time payments rails)
- Section 8: Card networks (Visa/MC interchange flow)
- Interactive "what if" sandbox (change dollar amount, watch fees change)
- Shareable animated GIF export

---

## Architecture

### System Overview
```
User Browser
    ↓
React Router (URL-per-section)
    ↓
[Layout Shell] ← Progress nav, section menu
    ↓
[SectionPage] — renders one section at a time
    ↓
[AnimationScene] ← core animation controller
    ├── SVG Canvas (hand-authored, Framer Motion animated)
    ├── StepIndicator (which step of N)
    ├── NarrativePanel (copy + details for current step)
    └── ControlBar (prev / next / auto-play / speed)
         ↓
[src/data/sections/*.ts] — all animation steps + copy + facts
```

### File Structure
```
how-money-moves/
├── public/
│   └── og-image.png           # Open Graph share card (1200x630)
├── src/
│   ├── components/
│   │   ├── AnimationScene.tsx  # Core animation controller — wraps every section
│   │   ├── ControlBar.tsx      # prev/next/play/speed controls
│   │   ├── NarrativePanel.tsx  # Right-side step copy + "what could go wrong"
│   │   ├── StepIndicator.tsx   # Dot-based step progress (Step 3 of 7)
│   │   ├── SectionNav.tsx      # Top/side nav between sections
│   │   └── Layout.tsx          # Shell: header, nav, section outlet
│   ├── scenes/                 # One file per animated section
│   │   ├── PaycheckScene.tsx   # Paycheck generation + payroll processor
│   │   ├── DirectDepositScene.tsx
│   │   ├── AchScene.tsx        # ACH batch file → ODFI → Fed → RDFI
│   │   ├── FedSettlementScene.tsx  # Deferred net settlement + Fedwire
│   │   ├── SwiftScene.tsx      # Correspondent banking chain
│   │   └── FractionalReserveScene.tsx
│   ├── data/
│   │   ├── facts.ts            # All financial facts with sources
│   │   └── sections/
│   │       ├── paycheck.ts     # Step definitions for PaycheckScene
│   │       ├── ach.ts
│   │       ├── fed-settlement.ts
│   │       ├── swift.ts
│   │       └── fractional-reserve.ts
│   ├── lib/
│   │   ├── animation-config.ts # Duration constants, easing curves
│   │   └── use-scene.ts        # Custom hook: scene step state + controls
│   ├── types/
│   │   └── index.ts            # Shared TypeScript interfaces
│   ├── pages/
│   │   ├── Home.tsx            # Landing/intro page
│   │   ├── SectionPage.tsx     # Generic section wrapper
│   │   └── NotFound.tsx
│   ├── App.tsx                 # Router setup
│   ├── main.tsx                # Vite entry point
│   └── index.css               # Tailwind base + custom CSS vars
├── index.html
├── vite.config.ts
├── tailwind.config.ts
├── tsconfig.json
├── CLAUDE.md
└── IMPLEMENTATION-ROADMAP.md
```

### Core Type Definitions

```typescript
// src/types/index.ts

// A single step in an animation scene
export interface SceneStep {
  id: string;                     // unique step identifier
  label: string;                  // Short label for StepIndicator
  narrative: string;              // Main explanatory copy (markdown supported)
  detail?: string;                // Expanded detail (shown in "show more")
  wonkyFact?: string;             // Sidebar fun fact with source
  wonkyFactSource?: string;       // Citation URL or "Federal Reserve Payments Study 2023"
  errorCase?: {                   // "What could go wrong?" content
    title: string;
    description: string;
  };
  // Animation targets: IDs of SVG elements to show/highlight/animate at this step
  animateIn?: string[];           // element IDs to fade/motion in
  highlight?: string[];           // element IDs to pulse/highlight
  animateOut?: string[];          // element IDs to fade out (from prev step)
  tracePathId?: string;           // SVG path ID to draw (stroke-dashoffset animation)
}

export interface Section {
  id: string;                     // URL slug: "ach", "swift", "fed"
  title: string;
  subtitle: string;
  icon: string;                   // emoji or icon name
  steps: SceneStep[];
  estimatedMinutes: number;
}

// Scene controller state (from useScene hook)
export interface SceneState {
  currentStep: number;
  totalSteps: number;
  isPlaying: boolean;
  playbackSpeed: 1 | 1.5 | 2;
  canGoBack: boolean;
  canGoForward: boolean;
}

export interface SceneControls {
  next: () => void;
  prev: () => void;
  goTo: (step: number) => void;
  togglePlay: () => void;
  setSpeed: (speed: 1 | 1.5 | 2) => void;
}
```

### Animation Architecture — Key Patterns

**Dollar trace path animation (SVG stroke-dashoffset):**
```typescript
// In each Scene SVG, define a <path> with id="trace-ach-to-fed"
// Animate using Framer Motion pathLength:
<motion.path
  id="trace-ach-to-fed"
  d="M 100,200 C 200,200 300,150 400,150"
  stroke="#22d3ee"
  strokeWidth={2}
  fill="none"
  initial={{ pathLength: 0 }}
  animate={{ pathLength: currentStep >= 3 ? 1 : 0 }}
  transition={{ duration: 0.8, ease: "easeInOut" }}
/>
```

**Element reveal (fade in on step):**
```typescript
<motion.g
  initial={{ opacity: 0, y: 10 }}
  animate={{ 
    opacity: step.animateIn?.includes('bank-node') ? 1 : 0,
    y: step.animateIn?.includes('bank-node') ? 0 : 10
  }}
  transition={{ duration: 0.4 }}
/>
```

**useScene hook:**
```typescript
// src/lib/use-scene.ts
export function useScene(steps: SceneStep[]): [SceneState, SceneControls] {
  const [currentStep, setCurrentStep] = useState(0);
  const [isPlaying, setIsPlaying] = useState(false);
  const [playbackSpeed, setPlaybackSpeed] = useState<1 | 1.5 | 2>(1);
  
  // Auto-advance timer
  useEffect(() => {
    if (!isPlaying) return;
    const delay = (4000 / playbackSpeed); // 4 sec per step at 1x
    const timer = setTimeout(() => {
      if (currentStep < steps.length - 1) {
        setCurrentStep(s => s + 1);
      } else {
        setIsPlaying(false);
      }
    }, delay);
    return () => clearTimeout(timer);
  }, [isPlaying, currentStep, playbackSpeed, steps.length]);

  const state: SceneState = {
    currentStep,
    totalSteps: steps.length,
    isPlaying,
    playbackSpeed,
    canGoBack: currentStep > 0,
    canGoForward: currentStep < steps.length - 1,
  };
  
  const controls: SceneControls = {
    next: () => setCurrentStep(s => Math.min(s + 1, steps.length - 1)),
    prev: () => setCurrentStep(s => Math.max(s - 1, 0)),
    goTo: (step) => setCurrentStep(step),
    togglePlay: () => setIsPlaying(p => !p),
    setSpeed: (speed) => setPlaybackSpeed(speed),
  };
  
  return [state, controls];
}
```

### Content Plan — Section Step Counts

| Section | Steps | Key Concepts |
|---------|-------|--------------|
| Paycheck / Payroll | 5 | Employer → payroll processor (ADP/Paychex) → ACH file generation, pay date T-2 |
| Direct Deposit (ACH Credit) | 7 | NACHA file, ODFI, ACH Operator (Fed/EPN), RDFI, Reg E timing, T+0 availability |
| ACH Debit (Pull) | 6 | Authorization, debit origination, NSF/return codes, 2-day settlement |
| Federal Reserve Settlement | 6 | Deferred Net Settlement, Fedwire Funds, reserve accounts, T+1 CHIPS |
| SWIFT International | 8 | BIC codes, correspondent banks, nostro/vostro accounts, 1–5 day window, sanctions screening |
| Fractional Reserve | 5 | Deposit multiplication, reserve ratio (0% since 2020), money supply M1/M2 |

**Total steps: ~37 steps across 6 sections.**

### Visual Design System

```css
/* src/index.css */
:root {
  --bg-base: #0a0e1a;          /* near-black navy */
  --bg-card: #111827;          /* card surfaces */
  --bg-elevated: #1f2937;      /* hover / elevated */
  
  --trace-primary: #22d3ee;    /* cyan — dollar trace path */
  --trace-secondary: #a78bfa;  /* purple — data/signal path */
  --node-bank: #1e40af;        /* dark blue — bank nodes */
  --node-fed: #7c3aed;         /* purple — Federal Reserve */
  --node-employer: #065f46;    /* dark green — employer/payroll */
  --node-swift: #92400e;       /* amber — SWIFT/international */
  
  --text-primary: #f9fafb;
  --text-secondary: #9ca3af;
  --text-accent: #22d3ee;
  
  --border: #374151;
}
```

**Node visual language:**
- All banking entities rendered as rounded-rectangle SVG nodes with icon + label
- Dollar amount shown as animated pill that travels along trace paths
- Fed = octagonal node (distinct shape for central bank)
- International = globe icon with dashed border

---

### Dependencies

```bash
# Initialize project
npm create vite@latest how-money-moves -- --template react-ts
cd how-money-moves

# Core dependencies
npm install react-router-dom@6 framer-motion@11 lucide-react@0.383.0

# Styling
npm install -D tailwindcss@3.4 autoprefixer postcss
npx tailwindcss init -p

# Dev tooling (already included with Vite template):
# typescript, @types/react, @types/react-dom, @vitejs/plugin-react, eslint
```

**No other dependencies.** Explicitly no D3, no chart libs, no animation libs beyond Framer Motion.

---

## Phase 0: Scaffold + Framework (Days 1–2)

**Objective:** Working Vite + React + TS + Tailwind + Framer Motion dev server. AnimationScene component built and tested with mock data. Facts file authored with accurate financial data. No real scenes yet.

**Tasks:**
1. `npm create vite@latest how-money-moves -- --template react-ts`, install all deps — **Acceptance:** `npm run dev` starts on localhost:5173, TypeScript compiles clean, Tailwind `text-cyan-400` renders teal text.
2. Create `src/types/index.ts` with `SceneStep`, `Section`, `SceneState`, `SceneControls` interfaces exactly as specified above — **Acceptance:** No TypeScript errors when imported by a test component.
3. Create `src/lib/use-scene.ts` with the `useScene` hook — **Acceptance:** A test component using `useScene([step1, step2, step3])` advances steps on button click, auto-plays at 4s interval, exposes `canGoBack`/`canGoForward` correctly.
4. Build `AnimationScene.tsx` as a shell component that renders: SVG canvas slot (children), `StepIndicator`, `NarrativePanel` (copy from current step), `ControlBar` (prev/next/play/speed) — **Acceptance:** Mount with 3 mock steps, manually advance, narrative copy updates correctly for each step.
5. Author `src/data/facts.ts` with all section financial facts and citations — **Acceptance:** File compiles clean, all 6 sections represented, every fact has a `source` string (e.g., "NACHA 2023 Operating Rules §2.1.4" or "federalreserve.gov/paymentsystems").
6. Create `src/index.css` with the full CSS variable set from the design system — **Acceptance:** Variables accessible in Tailwind arbitrary values, dark background renders.

**Verification checklist:**
- [ ] `npm run dev` → no errors, page loads at localhost:5173
- [ ] `npx tsc --noEmit` → 0 errors
- [ ] AnimationScene demo with 3 mock steps: step advances, narrative updates, back/forward disabled at boundaries
- [ ] Auto-play advances steps every 4s, stops at end, 2x speed halves interval to 2s

**Risks:**
- Framer Motion SVG pathLength + React strict mode double-render causing animation glitch → Wrap animations with `AnimatePresence` and use `layoutId` sparingly. Test in strict mode from day 1.

---

## Phase 1: Core 3 Scenes — MVP (Days 3–8)

**Objective:** Three fully animated, content-complete sections: Direct Deposit (ACH), Federal Reserve Settlement, and Paycheck/Payroll. These tell 70% of the story. Quality bar: animation timing feels cinematic, copy is accurate and scannable, mobile renders correctly.

**Tasks:**
1. Design and author `PaycheckScene.tsx` SVG — 3 nodes: Employer, Payroll Processor (ADP logo placeholder), ODFI Bank. Animate payroll file generation and batch submission over 5 steps — **Acceptance:** All 5 steps animate in/out correctly; trace path draws from Employer → ADP → Bank; narrative copy is accurate per `src/data/sections/paycheck.ts`.
2. Design and author `DirectDepositScene.tsx` SVG — 5 nodes: ODFI, ACH Operator (Federal Reserve logo), RDFI, Employee Account, plus timing labels. 7 steps with T+0/T+1 availability callouts — **Acceptance:** 7 steps complete; trace path animates correctly through all nodes; "What could go wrong?" panel for NSF returns renders on steps 4 and 6.
3. Design and author `FedSettlementScene.tsx` SVG — 4 nodes: Originating Bank Reserve Account, Fed (octagonal), Receiving Bank Reserve Account, CHIPS (private settlement). 6 steps covering deferred net settlement and Fedwire — **Acceptance:** Fed node renders distinctly (octagonal, purple); reserve account balances shown as animated number labels that update between steps.
4. Wire up React Router — routes: `/` (home/intro), `/direct-deposit`, `/fed-settlement`, `/paycheck`, `/ach`, `/swift`, `/fractional-reserve` — **Acceptance:** Direct-linking to `/direct-deposit` renders that section; browser back/forward navigates correctly.
5. Build `SectionNav.tsx` — shows 6 section names as horizontal pills (or vertical sidebar on mobile), highlights active, links to section routes — **Acceptance:** Clicking any section nav item navigates to that route without page reload.
6. Build Home page — animated intro, value prop copy, "Start with Direct Deposit →" CTA — **Acceptance:** Page renders at `/`, CTA navigates to `/direct-deposit`.
7. Mobile pass — test all 3 built sections at 375px — **Acceptance:** SVG scales correctly (no overflow), NarrativePanel text readable at 375px, ControlBar buttons are ≥44px tap targets.

**Verification checklist:**
- [ ] All 3 sections play through automatically from start to end with `isPlaying: true`
- [ ] Direct-link to `/direct-deposit` renders correctly (no blank screen)
- [ ] At 375px viewport: SVG visible, no horizontal scroll, controls tappable
- [ ] `npx tsc --noEmit` → 0 errors after Phase 1

**Risks:**
- SVG layout at mobile requires redesign per scene → Design SVGs with `viewBox="0 0 800 500"` and test mobile first. If landscape-oriented SVG fails on portrait mobile, add a "Rotate device" hint or redesign to vertical flow for that scene.

---

## Phase 2: Remaining Scenes + Polish (Days 9–12)

**Objective:** All 6 sections complete. SWIFT scene (the most complex — correspondent bank chains). Fractional reserve explainer. Error case panels for all sections. Polish: transitions between sections, keyboard navigation, timing refinement.

**Tasks:**
1. Author `AchScene.tsx` — covers ACH Debit pull flow (distinct from ACH credit in Phase 1). 6 steps. Show NACHA return codes (R01–R10 most common) in error panel — **Acceptance:** 6 steps animate correctly; return code panel shows R01 (NSF), R02 (closed account), R10 (unauthorized).
2. Author `SwiftScene.tsx` — most complex SVG: 4-6 nodes in correspondent chain (Originating Bank → Correspondent A → Correspondent B → Beneficiary Bank). Show SWIFT message types (MT103), nostro/vostro labels, 1–5 day timing range, sanctions screening hold — **Acceptance:** All 8 steps animate; correspondent chain renders with 2 intermediate banks (not just direct); sanctions callout appears on step 6.
3. Author `FractionalReserveScene.tsx` — simplified educational flow: $100 deposit → bank lends $90 → borrower deposits → bank lends $81 → money multiplier effect. Show M1/M2 callout. 5 steps — **Acceptance:** Dollar multiplication animates correctly (not just static numbers); 0% reserve ratio callout with "Since March 2020" label.
4. Add "What could go wrong?" collapse panels to all sections (all steps that have `errorCase` defined in step data) — **Acceptance:** Error panel toggles open/close without layout shift; all 6 sections have at least 2 error cases populated.
5. Section transition animation — when navigating between sections, previous section fades out, new section fades in with a brief "tracing..." loading state — **Acceptance:** Navigation between any 2 sections has 300ms fade transition, no layout jump.
6. Keyboard navigation — `→`/`Space` = next step, `←` = prev step, `P` = toggle play, `1-6` = jump to section — **Acceptance:** All keyboard shortcuts work, focus ring visible on ControlBar for accessibility.
7. Add `wonkyFact` sidebar to NarrativePanel — small card that shows interesting stats (e.g., "ACH processed 30 billion transactions in 2022" with NACHA source) per step — **Acceptance:** At least 20 of 37 total steps have a `wonkyFact` populated in data files.

**Verification checklist:**
- [ ] All 6 sections play through from start to finish without animation errors
- [ ] Keyboard nav: `→` advances step, `←` goes back, `P` toggles autoplay
- [ ] "What could go wrong?" panels present in all 6 sections
- [ ] `npx tsc --noEmit` → 0 errors

---

## Phase 3: Deploy + SEO + Share (Days 13–14)

**Objective:** Live on Vercel. SEO meta tags, Open Graph cards per section, performance ≥ 90 Lighthouse score.

**Tasks:**
1. Add `<meta>` tags per section — OG title/description/image per section route, Twitter card — **Acceptance:** Pasting `/direct-deposit` URL into Twitter card validator shows correct title + image.
2. Generate OG image (`public/og-image.png`, 1200x630) — dark background, cyan trace line, "How Money Moves" title — **Acceptance:** Image renders correctly in social preview.
3. `vite build` → `dist/` — **Acceptance:** Build completes with no errors, output size < 2MB total (including assets).
4. Deploy to Vercel: `vercel --prod` — **Acceptance:** Live URL resolves, all 6 section routes load (not 404), direct-linked section URLs work (Vercel rewrites to `index.html`).
5. Vercel `vercel.json` rewrite rule: `{ "rewrites": [{ "source": "/(.*)", "destination": "/index.html" }] }` — **Acceptance:** Direct-linking to `/swift` returns 200, not 404.
6. Run Lighthouse on deployed URL — **Acceptance:** Performance ≥ 90, Accessibility ≥ 85, Best Practices ≥ 95.

**Verification checklist:**
- [ ] `vite build` exits 0
- [ ] Vercel deploy succeeds, live URL accessible
- [ ] Direct-link to each of the 6 section routes returns 200 (not 404)
- [ ] Lighthouse Performance ≥ 90
- [ ] OG image appears in Twitter card preview

---

## Security & Credentials

No credentials. No API calls. No user data. No backend.

- Nothing leaves the user's browser
- No analytics (no GA, no Mixpanel) unless explicitly added post-launch
- No cookies, no localStorage usage
- Dependencies pinned to specific major versions to prevent supply chain issues via `package-lock.json`

---

## Testing Strategy

**Manual testing (each phase):**
- Play through every section from step 1 to last step — verify narrative copy matches animation state
- Test at 375px (iPhone SE), 768px (iPad), 1440px (desktop) after each scene build
- Test keyboard navigation after Phase 2

**Automated tests (light):**
- `useScene` hook unit tests: initial state, next/prev boundaries, autoplay timer, speed multiplier
- `src/data/facts.ts` smoke test: all sections defined, all steps have required fields (`id`, `label`, `narrative`)

```bash
# Install Vitest for unit tests
npm install -D vitest @testing-library/react @testing-library/jest-dom jsdom
```

```typescript
// src/lib/use-scene.test.ts
describe('useScene', () => {
  it('initializes at step 0', ...)
  it('canGoBack is false at step 0', ...)
  it('canGoForward is false at last step', ...)
  it('autoplay advances step every 4000ms', ...)
  it('2x speed advances step every 2000ms', ...)
})
```

---

## Financial Accuracy Reference

All of these facts must be in `src/data/facts.ts` with source citations before any UI copy is finalized:

| Fact | Value | Source |
|------|-------|--------|
| ACH transactions per year (2023) | 30 billion | NACHA 2023 Annual Report |
| ACH transaction value (2023) | $80.1 trillion | NACHA 2023 Annual Report |
| Standard ACH settlement | T+1 business day | NACHA Operating Rules |
| Same-day ACH cutoff times | 10:30am ET, 2:45pm ET, 4:45pm ET | NACHA Rules §2.13 |
| Fedwire daily transactions | ~1 million | Federal Reserve Payments Study |
| Fedwire daily value | ~$4 trillion | Federal Reserve Payments Study |
| US bank reserve requirement | 0% (since March 26, 2020) | Federal Reserve Board |
| SWIFT member institutions | 11,000+ in 200+ countries | SWIFT.com |
| SWIFT MT103 settlement time | 1–5 business days | SWIFT documentation |
| Correspondent bank chain average | 2.6 intermediaries | Bank for International Settlements |
| Average payroll file submission lead | T-2 business days | NACHA direct deposit rules |
