# Homepage / Systems / Ledger Multi-Asset Consistency Audit

Audit date: 2026-08-30

Audited branch: `task-cross-page-multi-asset-consistency-audit`

Status: PASS WITH DEFERRED ITEMS

## Scope

This audit covers the cross-page multi-asset alignment across the three current core public pages:

1. Homepage `/`
2. Systems `/systems`
3. Emerald Ledger `/ledger`

It verifies architecture consistency, content ownership, selector behavior, user flow, claim safety, data safety, accessibility, responsive presentation, SEO, and structured-data boundaries after the approved Homepage, Systems, and Ledger alignment work.

No product features, future configurations, performance records, assets, dependencies, redesigns, or later route work are included.

## Canonical Family / Configuration Model

The canonical family is `emerald-quant-system-family`, presented publicly as Emerald Quant System.

Family coverage is consistently ordered as:

1. Metals
2. Forex
3. Futures
4. Equities

This coverage describes the system-family development scope only. It does not imply that public configurations, platforms, lifecycle states, indicator/signal coverage, or performance records exist for every asset class.

The current canonical public configuration is `emerald-quant-system`:

- Name: Metals / XAUUSD
- Market: Metals
- Instrument: XAUUSD
- Platform: MT4
- Lifecycle: Public Forward Test

MT4 and Public Forward Test are configuration-specific attributes of Metals / XAUUSD, not family-wide attributes of the Emerald Quant System family.

## Page Roles

The three public pages preserve distinct roles:

- Homepage: broad company/product overview with featured configuration evidence.
- Systems: system product explanation plus configuration-aware product/performance context.
- Ledger: configuration-aware documented public performance record.

The Homepage does not behave as an interactive multi-configuration dashboard. Systems and Ledger own interactive configuration selection.

## Homepage Alignment

The Homepage uses the explicit featured configuration policy `homepageFeaturedConfigurationId = "emerald-quant-system"`.

The page resolves the featured configuration once and scopes the following sections from that configuration:

- Performance Snapshot
- Ledger Teaser
- Systems Showcase
- Verification & Transparency
- Video Archive Preview

Current Homepage performance evidence resolves through:

```text
homepage featured configuration
-> configuration.performanceRecordIds
-> public Forward Performance Ledger records
-> latest public cumulative record
-> public presentation
```

The latest current record is `cumulative-2-weeks`.

Current visible KPI baseline:

- Cumulative Net Profit: $204,966.54
- Cumulative Return: 20.50%
- Total Trades: 499
- Win Rate: 69.34%
- Maximum Drawdown: 10.67%
- Coverage: Aug 17-28, 2026

The Performance Snapshot identifies the scope as Current Public Configuration: Metals / XAUUSD. Account and performance labels remain Public Demo Reference Account and Forward Performance.

The Homepage Ledger Teaser is scoped to the featured configuration and currently uses:

- `cumulative-2-weeks`
- `week-01`
- `day-003`

The Homepage Systems Showcase presents the hierarchy as:

- System Family: Emerald Quant System
- Family Coverage: Metals, Forex, Futures, Equities
- Current Public Configuration: Metals / XAUUSD, MT4 Platform, Public Forward Test

Homepage verification and video preview content are scoped through featured-configuration relationships. No future cross-configuration media or verification leakage was found.

## Systems Alignment

The Systems page uses the explicit default configuration `emerald-quant-system`.

The route supports:

```text
/systems?configuration=<configuration-id>
```

Invalid, private, draft, wrong-family, or repeated-array configuration params do not render unrelated configuration data. The page falls back safely to the explicit default public configuration.

The Systems selector state is:

- Metals: available and selected
- Forex: visible family coverage, unavailable
- Futures: visible family coverage, unavailable
- Equities: visible family coverage, unavailable

Systems performance resolves through:

```text
selected configuration
-> configuration.performanceRecordIds
-> public Forward Performance filter
-> latest cumulative record
```

It does not use a global latest Ledger record for public presentation.

Current Systems values match the Homepage and Ledger baseline:

- Cumulative Net Profit: $204,966.54
- Cumulative Return: 20.50%
- Total Trades: 499
- Win Rate: 69.34%
- Maximum Drawdown: 10.67%
- Coverage: Aug 17-28, 2026
- Public Ledger Records: 6

The Systems page continues to provide architecture and positioning. Deeper operating philosophy and real system logic remain deferred until supplied.

## Ledger Alignment

The Ledger page uses the explicit default configuration `emerald-quant-system`.

The route supports:

```text
/ledger?configuration=<configuration-id>
```

Invalid, private, draft, wrong-family, or repeated-array configuration params fall back safely to the explicit default public configuration.

The Ledger selector label is Asset-Class Configuration. The selected configuration is Metals / XAUUSD.

Current Ledger selector state is:

- Metals: selected
- Forex: unavailable
- Futures: unavailable
- Equities: unavailable

Every Ledger section derives from the selected configuration:

- Hero
- Classification
- Summary
- Progression
- Chronology
- Verification
- Media

Current Ledger counts:

- Public Ledger records: 6
- Chronology records: 6
- Progression checkpoints: 5
- Verification records: 2
- Media records: 5

Current scoped classifications:

- Account: Public Demo Reference Account
- Performance: Forward Performance
- Scope: Daily, Weekly & Cumulative

## Featured vs Default Configuration Policies

The current Homepage featured configuration, Systems default configuration, and Ledger default configuration all resolve to `emerald-quant-system`.

These are intentionally distinct policies:

- Homepage featured configuration is an editorial presentation policy.
- Systems default configuration is an interactive product-detail default.
- Ledger default configuration is an interactive public-record default.

The Homepage must not infer its featured configuration from newest Ledger record, newest video, record count, or asset-class order. Systems and Ledger may use explicit defaults for invalid selections, but valid selected configurations must remain scoped to their own data.

## Performance Ownership

All current public Forward Performance belongs only to the Metals / XAUUSD configuration.

The ownership path is:

```text
Emerald Quant System family
-> Metals / XAUUSD configuration
-> configuration.performanceRecordIds
-> public Forward Performance Ledger entries
-> public presentation
```

No audited page implies that:

- the whole Emerald Quant System family returned 20.50%
- Forex has current public results
- Futures has current public results
- Equities has current public results
- family-wide public performance exists across all asset classes

Forward Performance remains a performance classification. Public Forward Test remains a lifecycle label. Public Demo Reference Account remains an account classification.

## Terminology Consistency

Preferred terminology is used consistently:

- System Family
- Family Coverage
- Asset-Class Configuration
- Current Public Configuration
- Selected
- Public Forward Test
- Forward Performance
- Public Demo Reference Account
- Emerald Ledger

Metals / XAUUSD capitalization and spacing remain consistent across the audited pages.

Family Coverage is passive. It does not visually present Forex, Futures, or Equities as active public configurations.

## Cross-Page Navigation

Current page-to-page navigation remains role-correct:

- Homepage links users toward Systems for product context.
- Homepage links users toward Ledger for the public record.
- Systems links users toward Ledger for complete public history.
- Ledger keeps the public record as the source of performance detail.

Current Homepage CTAs may link to generic `/systems` and `/ledger` because current defaults match the featured Metals / XAUUSD configuration.

Future rule: if the Homepage featured configuration differs from Systems or Ledger defaults, Homepage CTAs may need query-preserving links:

- `/systems?configuration=<featured-id>`
- `/ledger?configuration=<featured-id>`

That link behavior is not required today.

## Future Forex Expansion Test

If a real public/published Forex configuration is added to the Emerald Quant System family:

- Homepage family coverage already includes Forex.
- Homepage featured configuration stays Metals / XAUUSD unless editorially changed.
- Systems automatically exposes Forex as selectable.
- Ledger automatically exposes Forex as selectable.
- Systems Forex selection renders Forex configuration context.
- Ledger Forex selection scopes every section to Forex-owned records.
- Metals performance does not leak into Forex views.

If Forex has newer public performance than Metals:

- Homepage does not switch automatically.
- Systems Metals selection remains Metals-only.
- Ledger Metals selection remains Metals-only.

If the Homepage editorial featured configuration is explicitly changed to Forex:

- Homepage Performance Snapshot becomes Forex-scoped.
- Homepage Ledger Teaser becomes Forex-scoped.
- Homepage verification and video preview become Forex-scoped.
- Systems family breadth is unchanged.
- Ledger default may remain Metals unless separately changed.

## Empty / Partial Configuration Test

For a valid public Forex configuration with no performance records:

- Systems keeps the configuration selectable and renders neutral no-public-performance copy.
- Ledger keeps the configuration selectable and renders neutral no-record or partial-state copy.
- Homepage remains unaffected unless Forex is explicitly featured.
- If explicitly featured, Homepage renders neutral no-performance and no-teaser states.
- No Metals data is borrowed.

For a future daily-only configuration:

- Ledger scope derives from actual daily records only.
- Ledger chronology shows Daily Entry records only.
- Weekly or Cumulative rows are not fabricated.
- Homepage teaser uses available scoped data if that configuration is explicitly featured.
- Homepage does not fabricate a cumulative snapshot.

For multiple public configurations in the same market, the current asset-class selector resolves the first family-listed public configuration matching that market. A later second-level configuration selector may be needed if public selection among same-market configurations becomes a product requirement.

For a second system family, wrong-family configurations do not appear in Emerald Quant System selectors and cannot be rendered by query.

Private and draft configurations are not selectable, not publicly exposed, and cannot be rendered by query.

## Claim Safety

Source and rendered-copy review found no unsupported public claims across Homepage, Systems, or Ledger for:

- verified returns
- audited performance
- independently verified performance
- third-party verified performance
- broker verified results
- certified returns
- guaranteed performance
- real-money performance
- live account results
- real account results
- market-beating performance
- proven returns
- consistent profit
- multi-asset returns
- cross-market returns

The independent-audit and third-party-certification phrase appears only as a disclaimer that reviewable documentation does not imply those claims.

No unsupported future-market claims such as Forex available, Futures available, Equities available, Coming Soon, Launching Soon, or In Development were found in the public presentation path.

## Data Safety

Public components do not render:

- account number
- broker
- server
- login
- password
- investor credentials
- access credentials
- API keys
- tokens
- secrets

Canonical data may retain controlled public-account modeling fields for validation and documentation, but the audited public pages receive narrowed presentation data.

## Accessibility

Homepage checks:

- one H1
- logical heading hierarchy
- family badges readable
- configuration attribution visible near performance evidence
- KPI groups remain semantic and readable

Systems checks:

- one H1
- selector uses semantic navigation
- selected option uses `aria-current`
- unavailable categories are non-focusable
- metrics use definition-list semantics

Ledger checks:

- one H1
- selector uses semantic navigation
- selected option uses `aria-current`
- unavailable categories are non-focusable
- progression includes accessible table semantics
- empty states are reachable and text-based

## Responsive / Visual Consistency

Responsive review covered 375px and 1440px for Homepage, Systems, and Ledger.

Cross-page consistency notes:

- Header presentation remains consistent.
- Gold remains the primary hierarchy treatment for configuration labels and selected states.
- Emerald remains reserved for brand and positive/performance emphasis.
- Family coverage badges are passive and do not resemble active performance claims.
- Systems and Ledger selectors feel related without needing to be pixel-identical.
- Selected and unavailable states are visually distinct.
- H1 density, CTA sizing, card borders, and section rhythm remain aligned with the approved design system.
- No horizontal overflow was found during the responsive audit.

## SEO / Structured Data

Homepage metadata remains company-level and appropriate for the root route.

Systems canonical metadata remains `/systems`. Query selection does not create separate canonical pages.

Ledger canonical metadata remains `/ledger`. Query selection does not create separate canonical pages.

Current JSON-LD remains route-level WebPage/Organization-style foundation data. No Product, FinancialProduct, Dataset, VideoObject, numeric-performance, review, rating, offer, investment-adviser, broker/dealer, audited-return, or real-money performance schema was added.

## Deferred Items

Known deferred items:

- `/favicon.ico` 404 remains deferred.
- Large brand PNG optimization remains deferred.
- Week 2 Ledger thumbnail remains absent.
- Day 1 trade-history image remains absent.
- Video external IDs/URLs remain pending.
- Third-party verification is not implemented.
- Legacy risky raster wording remains excluded from public presentation.
- Deeper Systems operating-philosophy content remains deferred until real system logic is supplied.
- Same-market multi-configuration second-level selection remains deferred until needed.

## Final Result

PASS WITH DEFERRED ITEMS

Homepage, Systems, and Ledger now describe the Emerald Quant System with one coherent family/configuration architecture. Current public Forward Performance is consistently owned by the Metals / XAUUSD configuration and does not appear as family-wide or multi-asset performance.

## Recommended Next Phase

Close the Multi-Asset Alignment Workstream covering Homepage, Systems, and Ledger.

Based on the current roadmap state, the recommended next major product phase is Indicators & Signals, because the current Homepage and Systems pages already reference the indicator/signal relationship while deeper route implementation remains pending.
