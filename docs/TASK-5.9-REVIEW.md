# Task 5.9 Review Report

## Baseline

Repository: `ezebedee/Emerald-Trading-Website`.
Base main: `dea1633512293079ce2c6df08f010ee4369fee0f` (merged Task 5.8).
Branch: `task-5.9-portal-entry-points-conversion-navigation`.
Base [main CI passed](https://github.com/ezebedee/Emerald-Trading-Website/actions/runs/34886289530).
Final SHA, PR, and exact-head CI are recorded in the PR completion report.

## Portal and CTA Decisions

Six authored portal entry points use one shared constant:
`https://portal.emeraldforexsystem.com/login`.

| Location                     | Before                                | After                                          |
| ---------------------------- | ------------------------------------- | ---------------------------------------------- |
| Desktop header               | Request Private Access -> placeholder | Sign In -> portal                              |
| Mobile menu                  | Request Private Access -> placeholder | Sign In -> portal; close handler preserved     |
| Footer                       | Private Access -> placeholder         | Client Portal and Partner Portal -> same login |
| Homepage lower access CTA    | Request Private Access -> placeholder | Client Portal -> login                         |
| Systems catalog Quant card   | Request Private Access -> placeholder | Client Portal -> login                         |
| Homepage Private Review card | Request Private Access -> placeholder | Explore Emerald Quant System -> /systems/quant |
| Footer Products              | Signal Dashboard -> /signals          | Signal Library -> /signals                     |

Desktop pages have three portal links (Sign In plus two footer entries), or four
on `/` and `/systems`. The mobile menu exposes the same Sign In entry. The
desktop version is hidden and not keyboard reachable on mobile; there is no
additional mobile Sign In link outside the menu. Counts refer to reusable source
locations or visible page entries, not repeated links across route screenshots.

No other stale labels required changing. Existing product information links
remain public. `/private-access` is unchanged and indexable but no longer linked
by rendered navigation or CTAs. No request, signup, role routing, or private
performance access is promised by the portal links.

Homepage CTA categories and remaining future destinations are listed in
[Portal Navigation](PORTAL-NAVIGATION.md). Homepage placeholders remain
`/technology`, `/research`, `/verification`, `/videos`, `/professional`.
Across the sampled pages and shared navigation, 13 unique placeholder paths
remain: those five plus `/about`, `/platforms`, `/performance`,
`/performance/compare`, `/performance/live-vs-backtest`, `/privacy`, `/terms`,
`/risk-disclosure`. They are valid routes, not implemented conversion workflows.

## Validation

- Frozen install, format check, lint, typecheck, and production build: PASS.
- Original seven audits plus new portal audit and foundation aggregate: PASS
  (eight child audits, nine commands including the aggregate).
- Production build: unchanged 31 route entries, 27 static and four dynamic.
- Seven routes at both 375x1000 and 1440x1000: `/`, `/systems`, `/systems/quant`,
  `/indicators`, `/signals`, `/signal-scanner`, `/recovery-expert`.
- Header/footer present, no horizontal document overflow, no JS exceptions.
- Sign In keyboard reachable with visible 2px focus outline at both widths.
  Enter activation resolves to the exact canonical URL; mobile menu closes.
- Automated keyboard navigation is intercepted only inside the QA browser
  document after the app click handler, avoiding production authentication.
  Separate unauthenticated HTTPS GET to the real login returns 200 with no URL
  change. No production session or credentials used.
- All 27 sampled unique absolute internal hrefs return 200: zero broken route
  destinations. This includes six Signal Library fragment URLs; 21 path targets.
- No target=_blank on portal entries; same-tab behavior preserved. No portal
  sitemap/canonical entry or analytics integration added.

Screenshots and raw results are in `review-artifacts/task-5.9/`. Keep screenshots
available for review; remove them only after approval and a merge instruction.

## Scope and Warnings

Existing automatic `/favicon.ico` request returns 404 on a fresh browser
session. It is recorded in raw evidence, not hidden or counted as a JS exception.
No image optimization, placeholder indexing, product claims, or legal language
changes. No portal code, public authentication/session handling, role-specific
URL assumptions, Task 6.26 work, deployment, DNS, or Hostinger changes.

The new source audit guards canonical URLs, desktop/mobile labels, menu close
handler, footer labels, known auth/session API patterns, temporary hostnames,
and portal sitemap exclusion. It supplements browser QA, not an exhaustive
security proof. Changed-file credential scan is performed before final push.

Implementation files: five existing navigation/CTA components, shared
`src/lib/portal.ts`, new `scripts/audit-portal-navigation.mjs`, foundation runner,
package audit script, and documentation/evidence. No dependencies or lockfile
changes. No files deleted.
