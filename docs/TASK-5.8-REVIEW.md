# Task 5.8 Review Evidence

## Baseline and Scope

- Repository: ezebedee/Emerald-Trading-Website.
- Base main: `22116173e50524cf08c8f882c4d364a191381747`.
- Branch: `task-5.8-public-site-baseline-reconciliation`.
- PR: <https://github.com/ezebedee/Emerald-Trading-Website/pull/1>.
- Final commit and exact-head CI run are recorded in the PR completion report.
- No changes to application source, components, data, public assets, lockfile,
  product claims, navigation, routes, indexing policy, or dependencies.
- No portal integration, new page implementation, deployment, DNS/Hostinger
  changes, analytics provider, or Task 6.26 work. Do not merge without review.

## Changed-File Inventory

- Application source: none in normalized Git diff.
- Components: none in normalized Git diff.
- Data: none in normalized Git diff.
- Styles/config modified: `.gitignore`, `.prettierignore`, `package.json`.
- Config added: `.gitattributes`, `.nvmrc`, `.github/workflows/ci.yml`.
- Docs added: `docs/DEVELOPMENT-BASELINE.md`, this report, and
  `docs/review-artifacts/task-5.8/` browser/link JSON and nine screenshots.
- Generated: tracked `next-env.d.ts` deleted from the index, not the working
  filesystem. Next regenerates it and Git ignores it.

The initial 76 formatting failures reduced to 75 source/doc line-ending
normalizations plus the generated declaration policy correction. The formatter
produced no semantic or normalized source diff. Git's Windows `autocrlf` had
reintroduced CRLF; `.gitattributes` now preserves LF, including dotfiles.

The first isolated checkout identified `.prettierrc` as an additional checkout
line-ending failure. After extending the policy to dotfiles, a second fresh
clone passed without formatter intervention. Its working tree remained clean
after type generation and production build.

See [Development Baseline](DEVELOPMENT-BASELINE.md) for the generated-file
diagnosis and exact toolchain: Node 24.19.0, pnpm 11.19.0, Next 16.3.3,
React 19.2.8, TypeScript 5.9.3, Tailwind 4.3.3. No dependency upgrades.

## Local Validation

Validated in an isolated clone with no pre-existing node_modules or .next:

| Check                          | Result                                                   |
| ------------------------------ | -------------------------------------------------------- |
| pnpm install --frozen-lockfile | PASS; unchanged lockfile; 358 packages                   |
| pnpm format:check              | PASS                                                     |
| pnpm lint                      | PASS                                                     |
| pnpm typecheck                 | PASS; next typegen then tsc                              |
| pnpm data:audit                | PASS                                                     |
| pnpm assets:audit              | PASS                                                     |
| pnpm seo:audit                 | PASS                                                     |
| pnpm analytics:audit           | PASS                                                     |
| pnpm reliability:audit         | PASS                                                     |
| pnpm accessibility:audit       | PASS                                                     |
| pnpm performance:audit         | PASS                                                     |
| pnpm foundation:audit          | PASS; seven children, eight commands including aggregate |
| pnpm build                     | PASS; no build, image-config, or metadata warnings       |

Build: 31 route entries, 27 static and four dynamic. Dynamic routes are
`/api/health`, `/ledger`, `/systems`, `/systems/quant`. The 26 public routes remain
unchanged; other entries are internal/system routes and metadata endpoints.

## Browser and Links

Production server, Chrome, 375x1000 and 1440x1000. All eight routes were tested at
both widths: `/`, `/ledger`, `/systems`, `/systems/quant`, `/indicators`, `/signals`,
`/signal-scanner`, `/recovery-expert`.

All load with main/footer landmarks, no runtime exceptions, and no horizontal
document overflow. Mobile menu opens, closes with Escape, and navigates to
Systems; desktop navigation also reaches Systems. Screenshots were visually
reviewed for the four required routes at both widths: text/CTAs remain readable
and within their containers. These are baseline smoke checks, not exhaustive
accessibility certification or feature acceptance tests.

Known existing browser warning: first fresh browser load requests `/favicon.ico`
and receives 404. This is not a JavaScript exception or a broken navigation
destination; it remains deferred. Subsequent cached-session runs show no console
errors. No image replacement or favicon asset was introduced.

Rendered links from all eight routes: 28 distinct absolute internal hrefs,
including six Signal Library fragments. All return 200. Eight distinct
implemented path destinations, 14 distinct placeholder path destinations,
zero broken route destinations. One distinct stale label: `Signal Dashboard`
links to the implemented `/signals` route. It is intentionally unchanged.
Counts are unique destinations/labels, not repeated header/footer occurrences.

See `review-artifacts/task-5.8/links-navigation.json` for individual classifications.

## Indexable Placeholders

All 18 existing placeholder routes are indexable and included in the sitemap:

`/about`, `/performance`, `/performance/compare`, `/performance/live-vs-backtest`,
`/platforms`, `/platforms/mt4`, `/platforms/mt5`, `/platforms/tradingview`,
`/platforms/ninjatrader`, `/privacy`, `/private-access`, `/professional`,
`/research`, `/risk-disclosure`, `/technology`, `/terms`, `/verification`, `/videos`.

Four platform detail routes are not linked by the sampled rendered routes.
These are inventory findings, not new content work or indexing changes.

## Assets and Security

Registry: 23 references, 23 public media files, 8.81 MiB reported by the audit.
No missing references, orphan media, duplicates, or public video masters.
Largest files remain unchanged:

- `/brand/logos/emerald-legacy-systems-horizontal.png`: 2,345,301 bytes.
- `/brand/marks/emerald-elq-mark-signature.png`: 2,329,641 bytes.
- `/images/ledger/daily/ledger-day-003-2026-08-19-thumbnail.webp`: 408,220 bytes.

The two brand PNGs over 2 MiB and Recovery Expert's explicitly labeled temporary
visual remain deferred. Review screenshots live outside public and are not
production media assets.

Changed text is scanned for credential assignments, API/token patterns, private
keys, and production/portal credentials before final push. CI uses read-only
repository permissions and no application secrets.

## Review Screenshots

Nine PNGs accompany this report under `review-artifacts/task-5.8`: home, systems,
signals, and recovery-expert at 375/1440, plus the open mobile navigation.
They document the existing appearance, not a redesign.
