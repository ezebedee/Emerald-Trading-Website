# Homepage Family / Configuration Alignment Model

Audit date: 2026-08-30

Branch: `task-homepage-multi-asset-positioning-audit`

Status: AUDIT COMPLETE - HMA-2 REQUIRED

## Purpose

This document records the Homepage family/configuration audit after the Systems
and Ledger configuration-aware retrofits.

The Homepage should remain a broad company and product overview. It should not
become a duplicate Systems page, a duplicate Ledger page, or a multi-asset
configuration selector.

The current public model has two distinct concepts:

- System family: Emerald Quant System
- Current public configuration: Metals / XAUUSD

The Homepage must communicate family breadth where product architecture is being
introduced, while keeping all current public performance evidence explicitly
scoped to the current public configuration.

## Current Family State

Emerald Quant System is the public system family.

Family coverage:

- Metals
- Forex
- Futures
- Equities

Family-level coverage describes system development scope. It does not mean that
public performance records exist for every asset class.

## Current Configuration State

Current public configuration:

- ID: `emerald-quant-system`
- Configuration: Metals / XAUUSD
- Platform: MT4
- Lifecycle: Public Forward Test

This is currently the only public, published configuration listed for the
Emerald Quant System family.

## Performance Ownership

All current Homepage public performance evidence must resolve from
Metals / XAUUSD configuration-owned Ledger records.

The Homepage must not infer featured performance from global record recency.
Adding newer Forex, Futures, or Equities records later must not automatically
replace the Homepage's current Metals / XAUUSD snapshot unless the explicit
featured configuration policy is changed.

## Homepage Role

The Homepage should preserve these roles:

- Company positioning
- Product/system overview
- Public performance evidence
- Product discovery
- Technology/research credibility
- Conversion paths

Preferred information architecture:

- Hero: company-level quantitative technology positioning
- Trading Systems Showcase: system-family breadth
- Performance Snapshot: featured configuration evidence
- Ledger Teaser: featured configuration record context
- Systems/Ledger pages: interactive configuration selection and detail

## Homepage Component Inventory

The root Homepage renders these sections in this order:

1. `HomeHero`
2. `HomeTrustStrip`
3. `HomePerformanceSnapshot`
4. `HomeLedgerTeaser`
5. `HomeSystemsShowcase`
6. `HomeIndicatorsSignalsShowcase`
7. `HomeTechnologyResearch`
8. `HomeVerificationTransparency`
9. `HomeVideoArchivePreview`
10. `HomeProfessionalPrivateAccess`
11. `HomeFinalCta`

Supporting visual component:

- `HeroSystemVisual`

## Section Audit

| Section                       | Current Scope                                                                                           | Risk                                                                                                                                      | Recommended Action                                                                                                                                      | HMA-2 Priority |
| ----------------------------- | ------------------------------------------------------------------------------------------------------- | ----------------------------------------------------------------------------------------------------------------------------------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------- | -------------- |
| Hero                          | Company-level quantitative trading technology. No direct XAUUSD, Metals, Gold, or MT4 wording.          | Low. The hero does not make the company appear XAUUSD-only.                                                                               | Preserve broad positioning. Avoid turning hero into an asset-class list.                                                                                | Low            |
| Trust Strip                   | Public performance framework and account classification.                                                | Medium. Copy is neutral, but public performance wording is not visibly tied to Metals / XAUUSD.                                           | Leave structure unchanged; optional scope cue can be handled in Performance Snapshot instead.                                                           | Low            |
| Performance Snapshot          | Current cumulative public performance from global Ledger selector.                                      | High. Future records from another configuration could replace Metals / XAUUSD values. Current visible copy does not show Metals / XAUUSD. | Replace global selector with featured-configuration selector and add concise scope label: Current Public Configuration - Metals / XAUUSD.               | Blocking       |
| Ledger Teaser                 | Latest cumulative, weekly, and daily entries from global Ledger pools.                                  | High. Future Forex/Futures/Equities entries could mix with or replace Metals teaser entries.                                              | Replace global teaser selector with featured-configuration-scoped selector. Add scope label only if not clearly inherited from Performance Snapshot.    | Blocking       |
| Trading Systems Showcase      | Flat current trading system record, which is the Metals / XAUUSD configuration.                         | High. The section is the best place to present family breadth, but currently badges only expose MT4, XAUUSD, and Metals.                  | Introduce family/config presentation shape. Show Family Coverage: Metals, Forex, Futures, Equities, plus Current Public Configuration: Metals / XAUUSD. | High           |
| Indicators & Signals Showcase | Current public indicator and signal products are Metals / XAUUSD specific.                              | Medium. Safe if treated as product/config specific; unsafe if broadened to all family markets.                                            | Keep configuration-specific product claims. Do not imply indicator/signal documentation across all four asset classes.                                  | Medium         |
| Technology & Research         | Company/system-family-level methodology and research posture.                                           | Low. Broad technology copy is appropriate and not performance-specific.                                                                   | Preserve.                                                                                                                                               | Low            |
| Verification & Transparency   | Public demo reference account and supporting verification model.                                        | Medium. Verification records are current-record specific but not visibly configuration-scoped.                                            | Preserve claim-safe wording. Consider small scope note near evidence model in HMA-2 only if Performance Snapshot/Teaser scope is insufficient.          | Medium         |
| Video Archive Preview         | Fixed homepage video IDs related to Metals Ledger history; related Ledger entry lookup is global by ID. | Medium. Fixed IDs prevent pure recency leakage today, but the selector has no explicit configuration ownership.                           | Keep metadata-only state. Prefer featured-configuration video preview selection in HMA-2 or later media pass.                                           | Medium         |
| Professional & Private Access | Public/private access pathways.                                                                         | Low. Copy is mostly configuration-neutral and preserves public/private distinction.                                                       | Preserve. Do not make private access appear limited to Metals only.                                                                                     | Low            |
| Final CTA                     | Company-level closeout with Ledger and Systems routes.                                                  | Low. Broad and role-correct.                                                                                                              | Preserve.                                                                                                                                               | Low            |

## Selector Inventory

| Selector                                     | Current Behavior                                                                                                | Classification                              | Future Risk                                                                                       | Recommended Replacement/Reuse                                                                                                                              |
| -------------------------------------------- | --------------------------------------------------------------------------------------------------------------- | ------------------------------------------- | ------------------------------------------------------------------------------------------------- | ---------------------------------------------------------------------------------------------------------------------------------------------------------- |
| `getHomepageFeaturedTradingSystem()`         | Returns public trading system with ID `emerald-quant-system`; this record is the Metals / XAUUSD configuration. | D - requires new presentation shape         | Treats the current configuration as the whole system family in Homepage presentation.             | Add `getHomepageFeaturedSystemContext()` or equivalent returning family, featured configuration, family coverage, and public record scope.                 |
| `getPublicIndicatorsForSystem(system.id)`    | Returns public indicators related to the current configuration/system ID.                                       | B - current-config-specific and safe        | Safe for current products, but should not be broadened to family-wide claims.                     | Preserve for product relationship display.                                                                                                                 |
| `getPublicSignalsForSystem(system.id)`       | Returns public signals related to the current configuration/system ID.                                          | B - current-config-specific and safe        | Same as indicators; safe when scoped as current product relationship.                             | Preserve.                                                                                                                                                  |
| `getLatestPublicPerformanceSummary()`        | Returns latest cumulative public summary from global cumulative Ledger entries.                                 | C - global and future-unsafe                | Newer records from another configuration could become the Homepage snapshot.                      | Replace with `getHomepagePerformanceSnapshotForConfiguration(configurationId)` or reuse `getPublicLedgerSummaryForConfiguration(featuredConfigurationId)`. |
| `getHomepageLedgerTeaserEntries()`           | Selects latest cumulative, weekly, and daily records from global Ledger pools.                                  | C - global and future-unsafe                | Future records can mix configurations in the same teaser grid.                                    | Replace with `getHomepageLedgerTeaserEntriesForConfiguration(configurationId)`.                                                                            |
| `getHomepageFeaturedIndicator()`             | Returns explicit public indicator ID `emerald-signal-indicator`.                                                | B - current-config-specific and safe        | Safe, but current canonical data is Metals / XAUUSD.                                              | Preserve; label as current product/config context if needed.                                                                                               |
| `getHomepageFeaturedSignalProduct()`         | Returns explicit public signal ID `emerald-directional-signal-stream`.                                          | B - current-config-specific and safe        | Safe, but current canonical data is Metals / XAUUSD.                                              | Preserve.                                                                                                                                                  |
| `getFeaturedAssetForIndicator(indicator.id)` | Returns approved indicator image asset for explicit indicator ID.                                               | B - current-config-specific and safe        | No cross-config performance leakage.                                                              | Preserve.                                                                                                                                                  |
| `getPublicSystemsForIndicator(indicator.id)` | Returns public systems related to indicator.                                                                    | B - current-config-specific and safe        | Could remain current-config specific until broader indicator architecture exists.                 | Preserve.                                                                                                                                                  |
| `getPublicSignalsForIndicator(indicator.id)` | Returns public signals related to indicator.                                                                    | B - current-config-specific and safe        | No global performance leakage.                                                                    | Preserve.                                                                                                                                                  |
| `getPublicSystemsForSignal(signal.id)`       | Returns public systems related to signal.                                                                       | B - current-config-specific and safe        | No global performance leakage.                                                                    | Preserve.                                                                                                                                                  |
| `getPublicIndicatorsForSignal(signal.id)`    | Returns public indicators related to signal.                                                                    | B - current-config-specific and safe        | No global performance leakage.                                                                    | Preserve.                                                                                                                                                  |
| `getHomepageFeaturedResearch()`              | Returns explicit public research entry ID.                                                                      | A - family-safe                             | Broad research copy is appropriate.                                                               | Preserve.                                                                                                                                                  |
| `getHomepageVerificationRecords()`           | Returns fixed public verification record IDs.                                                                   | B - current-record-specific and safe today  | The records relate to the current public Ledger/account, but selector is not configuration-aware. | Preserve short-term; consider scoped verification in HMA-2 only if scope language needs backing data.                                                      |
| `getHomepageVideoPreviewEntries()`           | Returns fixed public video IDs.                                                                                 | B/C - fixed IDs but not configuration-aware | Fixed IDs avoid recency leakage, but future editorial strategy is unclear.                        | Prefer `getHomepageVideoPreviewEntriesForConfiguration(configurationId)` before multi-config video rollout.                                                |
| `getLedgerEntryById()` in video cards        | Looks up the first related public Ledger entry by ID.                                                           | B - ID-specific and safe today              | Safe for fixed videos; not enough for configuration-aware discovery.                              | Preserve until video preview selector becomes configuration-aware.                                                                                         |

## Global Ledger Selector Findings

The Homepage currently uses these future-unsafe global Ledger selectors:

- `getLatestPublicPerformanceSummary()` in `HomePerformanceSnapshot`
- `getHomepageLedgerTeaserEntries()` in `HomeLedgerTeaser`

These should be treated as blocking HMA-2 issues because future public Forex,
Futures, or Equities records could leak into the Homepage snapshot or teaser.

The Homepage does not directly use these global selectors in section components:

- `getLatestPublicCumulativeLedgerRecord`
- `getPublicLedgerEntries`
- `getCumulativePerformanceSeries`
- `getLatestDailyLedgerEntry`
- `getLatestWeeklyLedgerEntry`
- `getLatestCumulativeLedgerEntry`

## Safe Selector Findings

These selectors are safe to preserve for HMA-2:

- `getHomepageFeaturedResearch()`
- `getHomepageFeaturedIndicator()`
- `getHomepageFeaturedSignalProduct()`
- `getFeaturedAssetForIndicator()`
- Relationship selectors for indicator, signal, and system links
- Fixed verification records as long as visible copy remains claim-safe

The video preview selectors are safe for current fixed content but should be
upgraded before real multi-configuration media rollout.

## Copy Findings

### Hero

The hero is already company-level. It does not present Emerald Legacy Systems as
an XAUUSD-only company.

No HMA-2 hero rewrite is required. If a small adjustment is wanted later, it
should remain subtle and not list every asset class.

### Performance Copy

Performance Snapshot and Ledger Teaser use correct public-forward and
demo-reference-account language, but the visible copy does not state that the
numbers belong to Metals / XAUUSD.

HMA-2 should add a concise current-configuration scope label near the metrics.

Recommended wording:

- Label: Current Public Configuration
- Value: Metals / XAUUSD

The performance classification label should remain:

- Public Forward Performance

The account label should remain:

- Public Demo Reference Account

### System Copy

The Trading Systems Showcase currently renders the current configuration as if
it were the only system product surface. This is the main family/configuration
copy gap.

HMA-2 should make this the primary family-breadth location, not the hero,
trust strip, performance snapshot, or every section.

Recommended visible content:

- Family Coverage: Metals, Forex, Futures, Equities
- Current Public Configuration: Metals / XAUUSD

Platform MT4 should be presented as the current configuration platform, not a
family-wide platform.

### Indicator And Signal Copy

The current indicator and signal records are Metals / XAUUSD specific in
canonical product data. They should remain product/configuration-specific until
broader canonical indicator/signal coverage is added.

Do not imply that the current indicator/signal product is documented across
Forex, Futures, or Equities because the system family has broader coverage.

## Family Coverage Placement

Primary recommended placement:

- Trading Systems Showcase

Reason:

- It is the Homepage section explicitly about the system product.
- It can explain family coverage without cluttering the hero.
- It avoids repeating Metals, Forex, Futures, and Equities in every section.

The hero can remain company-level. The trust strip should remain evidence-model
oriented. Performance Snapshot and Ledger Teaser should show the current
configuration label only where needed to protect performance attribution.

## Featured Configuration Policy

Recommended explicit featured configuration:

- `emerald-quant-system`

This should be a deliberate Homepage editorial/default setting. It should not be
derived from:

- record count
- newest Ledger record date
- newest video date
- available media
- asset-class order

If Emerald later wants the Homepage to feature Forex instead, change the
explicit featured configuration. Do not let data recency make that decision.

## Performance Strategy

Preferred Homepage strategy:

- one featured configuration snapshot

Avoid adding four performance cards or a full asset-class tab interface during
HMA-2. Systems and Ledger are the better routes for interactive configuration
selection.

Future selector target:

- `getHomepagePerformanceSnapshotForConfiguration(configurationId)`

Acceptable reuse:

- `getPublicLedgerSummaryForConfiguration(featuredConfigurationId)`

The snapshot should continue to show the current expected values while scoped to
Metals / XAUUSD:

- Net Profit: `$204,966.54`
- Return: `20.50%`
- Total Trades: `499`
- Win Rate: `69.34%`
- Maximum Drawdown: `10.67%`
- Coverage: `Aug 17-28, 2026`

## Ledger Teaser Strategy

Future selector target:

- `getHomepageLedgerTeaserEntriesForConfiguration(configurationId)`

Required behavior:

- featured configuration
- configuration-owned Ledger records
- public Forward Performance
- daily, weekly, and cumulative teaser entries selected only within that
  configuration

Do not mix records from different configurations in the teaser grid.

## Future Forex Test

If a real Forex configuration and public Forward Performance records are added,
the expected Homepage behavior after HMA-2 is:

- The Trading Systems Showcase still communicates the four family asset classes.
- The current featured configuration can remain Metals / XAUUSD unless
  editorially changed.
- The Homepage Performance Snapshot does not automatically switch to Forex
  because Forex has newer records.
- The Ledger Teaser remains tied to the featured configuration.
- No snapshot, teaser, video, or verification area mixes records from different
  configurations.

## Claim Safety Review

Homepage source was searched for unsupported or risky language including:

- verified returns
- audited performance
- guaranteed
- real-money
- live account
- market-beating
- proven returns
- consistent profit

No blocking Homepage claim issue was found.

The word `verified` does not appear in Homepage components. Verification copy is
framed around reviewable documentation, public account classification, and
supporting evidence. It does not claim independent audit, third-party
certification, broker verification, or certified returns.

## Sensitive Data Review

Homepage components were searched for:

- account number
- broker
- server
- password
- login
- credentials

No sensitive account identifiers or access details are rendered from Homepage
components.

Known broker/server/account metadata exists in data modules for controlled
verification modeling, but the Homepage does not expose account numbers,
passwords, logins, or credentials.

## Legacy Asset Risk

Homepage components do not use legacy raster assets containing:

- REAL RESULTS
- VERIFIED RESULTS
- REAL TRADES
- REAL PERFORMANCE

The current indicator screenshot remains approved and safe. Video cards remain
metadata/CSS based and do not invent external video URLs.

## SEO / JSON-LD Review

Homepage metadata falls back to company-level `siteBrand.metadataDescription`.
Root JSON-LD remains Organization and WebSite only.

No Product schema was added and none is recommended for HMA-1.

No flat XAUUSD assumption was found in Homepage metadata or Organization
JSON-LD. HMA-2 may update metadata later only if visible Homepage positioning
changes materially.

## HMA-2 Recommended Implementation Scope

HMA-2 should be limited to:

1. Add a small Homepage featured configuration policy centered on
   `emerald-quant-system`.
2. Add or reuse selector logic that returns Homepage context for:
   family, featured configuration, performance snapshot, Ledger teaser,
   product relationships, verification, and video preview.
3. Replace `getLatestPublicPerformanceSummary()` usage with a
   featured-configuration-scoped performance selector.
4. Replace `getHomepageLedgerTeaserEntries()` usage with a
   featured-configuration-scoped teaser selector.
5. Update Trading Systems Showcase copy/presentation to distinguish:
   Family Coverage and Current Public Configuration.
6. Add a concise `Current Public Configuration - Metals / XAUUSD` label near
   Homepage performance evidence.
7. Keep the hero broad and uncluttered.
8. Keep Systems and Ledger unchanged unless HMA-2 explicitly requires shared
   selector reuse without visible regression.

HMA-2 should not add:

- a Homepage asset-class selector
- fake Forex/Futures/Equities configurations
- new performance records
- new assets
- new dependencies
- new client JavaScript
- a redesign of the Homepage layout

## Sections To Leave Untouched Unless Needed

- Hero visual structure
- Trust Strip visual structure
- Technology & Research
- Professional & Private Access
- Final CTA
- Systems route
- Ledger route

## Audit Result

HMA-1 audit is complete.

Result:

- PASS as audit/foundation
- HMA-2 required for configuration-scoped Homepage selectors and restrained
  visible copy alignment
