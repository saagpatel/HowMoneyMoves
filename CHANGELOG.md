# Changelog

All notable changes to this project will be documented in this file.

The format is based on [Keep a Changelog](https://keepachangelog.com/en/1.1.0/).

## [1.0.0] - 2026-06-20

### Added

- Six fully animated scenes covering the US payment stack: Paycheck/Payroll, Direct Deposit (ACH Credit), ACH Debit, Federal Reserve Settlement (Fedwire), SWIFT International Wire, and Fractional Reserve explainer
- Step-by-step scrubber controls (forward, back, auto-play, 1x/1.5x/2x speed) via the `useScene` hook
- Keyboard navigation: arrow keys step through scenes, `P` toggles auto-play, number keys jump to sections
- URL-per-section routing via React Router for deep-linking and sharing
- Error-case callout panels per scene (NSF returns, ACH R-codes, SWIFT sanctions hold, Fedwire rejects)
- Financial facts sourced from NACHA, the Federal Reserve, SWIFT, and the BIS with inline citations
- Open Graph and Twitter Card meta tags (site-level; per-route social cards are not yet pre-rendered)
- Vercel SPA rewrite config so direct-linked section routes resolve correctly
- Skip-to-content accessibility link
- Dark-mode-only visual design with hand-authored SVG diagrams animated via Framer Motion
