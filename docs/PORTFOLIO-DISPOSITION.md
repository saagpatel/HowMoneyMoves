# HowMoneyMoves — Portfolio Disposition

**Status:** Release Frozen — React + TypeScript + Vite + Framer
Motion interactive US banking explainer on `origin/main`. All 4
phases (0-3) shipped: scaffold + animation framework, 3 then 6
animated scenes + keyboard nav + polish, SEO + OG image +
**vercel.json** + skip-to-content. Distribution model is
**Vercel-hosted static site**, NOT signed desktop binary. Joins
the static-host cluster (alongside PomGambler).

> Disposition uses strict `origin/main` verification.
> **Operator pre-committed to Vercel** — `vercel.json` is on
> canonical main. Distribution decision is already made.

---

## Verification posture

This repo has **only `origin`** (`saagpatel/HowMoneyMoves`) — no
`legacy-origin` remote. Clean migration state. Local clone's `main`
is tracking `origin/main` correctly.

Specifically verified on `origin/main`:

- Tip: latest is `e6d9cff` chore: add feature request issue template
- Substantive commits on `origin/main`:
  - `b98d6a0` feat: SEO meta tags, OG image, vercel.json, skip-to-content (Phase 3)
  - `899efa6` feat: complete all 6 animated scenes + keyboard nav + polish (Phase 2)
  - `3a31807` feat: add 3 animated SVG scenes + reusable primitives (Phase 1)
  - `a390462` feat: scaffold Vite project + animation framework + data layer (Phase 0)
- **Deploy config already shipped:**
  - `vercel.json` (Vite build, dist output, SPA rewrites, X-Content-
    Type-Options + Referrer-Policy + Permissions-Policy headers)
- **Implementation roadmap shipped:**
  - `IMPLEMENTATION-ROADMAP.md` (Phase 0-3 with executive summary,
    risk analysis, scope boundaries)
- `CHANGELOG.md`, `LICENSE` (MIT), `SECURITY.md`, `CONTRIBUTING.md`,
  `CODE_OF_CONDUCT.md` all on canonical main
- Default branch: `main`

---

## Current state in one paragraph

HowMoneyMoves is a static React + TypeScript + Vite + Framer Motion
interactive web explainer of the US banking system. Six animated
sections cover paycheck/direct deposit, ACH, Federal Reserve
settlement, SWIFT, fractional reserve, and error cases. Step-by-
step forward/back controls, dark-mode-only design, mobile-responsive
375-1440px. The roadmap explicitly cites facts living in
`src/data/facts.ts` with inline citations from NACHA, the Fed, and
the APA. Distribution: Vercel static host (config already shipped).
Phase 3 (deploy-ready) is the operator's last substantive commit.

For full detail see:
- `README.md` on `origin/main`
- `IMPLEMENTATION-ROADMAP.md`

---

## Why "Release Frozen (static host)" — NOT signing cluster

HowMoneyMoves is web-distributed, not desktop. Distribution shape
makes the signing cluster the wrong batch:

- **Static SPA, no installer** — Vite build output deployed to
  Vercel
- **`vercel.json` already on canonical main** — operator pre-chose
  the host
- **No Apple Developer credentials needed**
- **HTTPS is free via Vercel**

The "gate" is therefore not Apple signing — it's "click deploy on
Vercel," confirm a domain, and ship.

This places HowMoneyMoves in the **static-host cluster** alongside
PomGambler. Both are web-distributed apps, but the architectures
differ:

- **PomGambler** — PWA (service worker + manifest + installable
  home-screen experience), backend OpenAPI surface exists
- **HowMoneyMoves** — static SPA (no service worker, no manifest,
  no backend), pure read-only content site

Static-host cluster member count: **2** (PomGambler, HowMoneyMoves).
Sub-shapes: PWA (1, PomGambler), static SPA (1, HowMoneyMoves).

---

## Possible next moves (operator choice)

### Option 1 — Deploy to Vercel, ship publicly

Required scope:

1. Confirm Vercel project exists or create one (`vercel.json`
   already in tree, so this is `vercel link` + `vercel deploy
   --prod`)
2. Custom domain if desired (`howmoneymoves.com`?)
3. OG image renders correctly (already shipped per Phase 3 commit)
4. Share on Twitter/LinkedIn — the roadmap explicitly calls
   "shareable fintech explainer that goes viral" the target

Estimated effort: **~1 hour** including custom domain + first
deploy. Operator has done the hard work — this is push-button.

### Option 2 — Open-source as a reference implementation

Polish the README install/host section so anyone can fork and
deploy their own. Operator doesn't host publicly.

Estimated effort: ~30 minutes.

### Option 3 — Hold for content-quality review

The roadmap flags "financial accuracy" as a HIGH risk. Before
public release, get the facts in `src/data/facts.ts` reviewed by
someone who works at a Fed bank or large ACH processor. Adds days
to public launch but materially reduces "called out on Twitter for
wrong NACHA cutoff" risk.

Estimated effort: ~1 week including outreach.

### Option 4 — Scope-stop, don't ship

Roadmap declared this aiming for "viral fintech explainer." If the
operator no longer wants that visibility, declare scaffold-stop and
move to Cold Storage.

Estimated effort: ~15 minutes.

---

## Recommendation (informational)

**Option 1 (ship)** is the natural fit. The operator wrote a Phase
0-3 roadmap explicitly targeting "viral shareable explainer," then
shipped through Phase 3 deploy-ready. The marginal cost of pushing
deploy is small and the marginal benefit is large.

**Option 3 (content review)** is the prudent operator concern from
the roadmap itself ("HIGH risk: financial accuracy"). One sanity-
check pass before Vercel-prod is cheap insurance against public
correction tweets.

But operator-judgment. If the operator's role today has changed and
public-facing fintech explainers don't fit, Options 2 or 4 are
fine.

---

## Portfolio operating system instructions

| Aspect | Posture |
|---|---|
| Portfolio status | `Release Frozen (static host)` |
| Distribution model | **Vercel static SPA**, NOT signed desktop binary, NOT PWA |
| Review cadence | Suspend overdue counting |
| Resurface conditions | (a) Operator picks Option 1/2/3/4, (b) live site starts producing 404/abuse signals, or (c) operator opens a v1.1 scope packet (more sections, interactive scenarios, etc.) |
| Do **not** auto-add to signing cluster | Different distribution shape |
| Co-batch with | **Static-host cluster:** PomGambler (PWA sub-shape) / **HowMoneyMoves** (static SPA sub-shape) — **now 2 repos**. Future PWA-or-static-SPA repos can join. |
| Special concern | **Financial accuracy.** Roadmap flags this as HIGH risk. Recommend Option 3 content review before Option 1 deploy. |

---

## Why this row joins the static-host cluster (not signing)

The signing cluster (now 18 repos) is for Tauri 2 + Rust desktop
apps that need Apple Developer signing for distribution. HowMoneyMoves
isn't a desktop app — it's a static web SPA targeting Vercel. Wrong
batch entirely.

The static-host cluster:

- **Common gate:** "decide host + push deploy" — operator-time
  measured in hours, not credential-acquisition weeks
- **Common artifact:** Vite or similar build output to a static host
- **HTTPS / SEO / cache control** as release concerns, not Apple
  notarization

Adding HowMoneyMoves grows this cluster to 2. If more static or PWA
repos surface in future audit rounds, they batch here.

---

## Reactivation procedure (for the next code session)

1. Verify `git branch -vv` shows `main` tracking `origin/main`.
   Already correct.
2. Review the local stash (`r9-howmoneymoves-stash`) — contains
   mods to `CLAUDE.md` plus untracked `.codex/`, `AGENTS.md`.
3. Re-run `pnpm install && pnpm dev` to confirm toolchain.
4. **If picking Option 1, audit `src/data/facts.ts`** for content
   accuracy before pushing deploy.
5. `vercel link && vercel deploy --prod` once content is approved.

---

## Last known reference

| Field | Value |
|---|---|
| `origin/main` tip | `e6d9cff` chore: add feature request issue template |
| Last substantive commit | `b98d6a0` feat: SEO meta tags, OG image, vercel.json, skip-to-content (Phase 3) |
| Default branch | `main` |
| Build system | Vite + React + TypeScript + Tailwind + Framer Motion |
| Deploy config | **`vercel.json` on canonical main** — Vercel preselected |
| Roadmap doc | `IMPLEMENTATION-ROADMAP.md` (4-phase plan, executive summary, risk analysis) |
| Phases shipped | 0 (scaffold + framework + data layer), 1 (3 SVG scenes + primitives), 2 (all 6 scenes + keyboard nav + polish), 3 (SEO + OG + Vercel + skip-to-content) |
| Distribution shape | Static SPA on Vercel (no service worker, no manifest, no backend) |
| Migration state | **No `legacy-origin` remote** — clean |
| Distinguishing feature | **Operator pre-chose host.** `vercel.json` shipped on canonical main means distribution decision is already made; "ship" is a 1-hour deploy, not a multi-day decision packet. |
