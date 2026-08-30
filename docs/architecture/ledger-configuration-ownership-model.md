# Ledger Configuration Selection & Performance Ownership Model

## Purpose

The public Ledger is being prepared for configuration-aware selection without changing the visible Ledger interface in this foundation task.

The required data path is:

```text
System Family
-> selected public configuration
-> configuration.performanceRecordIds
-> public Forward Performance Ledger records
-> configuration-scoped Ledger presentation data
```

The Ledger must not aggregate unrelated records only because they share family, visibility, performance classification, or date range.

## Current State

Current family: `emerald-quant-system-family`

Current default configuration: `emerald-quant-system`

Current configuration:

- Name: Metals / XAUUSD
- Market: Metals
- Instrument: XAUUSD
- Platform: MT4
- Lifecycle: Public Forward Test

All current public Ledger performance records belong to the Metals / XAUUSD configuration only.

## Default Selection

The Ledger default configuration is explicit and resolves to `emerald-quant-system` when it is public, published, and listed by the active Emerald Quant System family.

The plain `/ledger` route and `/ledger?configuration=emerald-quant-system` resolve to the same current configuration.

## Valid Selection Rules

A requested configuration is valid for the public Ledger only when it is:

- public
- published
- a concrete trading-system configuration
- associated with the active Emerald Quant System family
- listed in the family's `configurationIds`

Wrong-family, private, draft, unknown, and repeated array query values do not render private or invalid configuration details. They fall back safely to the default public configuration.

## Valid Empty Configuration Behavior

A future valid public configuration may exist before public performance records are available.

In that case:

- the configuration remains valid and selectable by future UI
- summary data remains empty
- progression data remains empty
- chronology data contains only available configuration-owned records
- no Metals / XAUUSD performance is substituted
- no zeros or synthetic records are fabricated

Fallback to Metals occurs only for invalid configuration selection, not for valid configurations without records.

## Public Forward Performance Filtering

Configuration-owned record IDs are resolved through Ledger entries, then filtered to public Forward Performance records.

Private performance, backtests, simulations, and private live-performance records must not appear in the public Ledger context.

## Summary, Progression, And Chronology

The Ledger page now has configuration-scoped selector foundations for:

- latest cumulative record
- summary
- cumulative progression
- chronology

The current latest cumulative record resolves to `cumulative-2-weeks`.

Current cumulative values:

- Net Profit: $204,966.54
- Return: 20.50%
- Total Trades: 499
- Win Rate: 69.34%
- Maximum Drawdown: 10.67%
- Coverage: Aug 17-28, 2026

Progression keeps the approved cumulative checkpoint precedence and does not blend across configurations.

## Verification And Media

Verification and media selector foundations can be scoped by selected system/configuration ID and the selected configuration-owned Ledger record IDs.

Current public verification context remains:

- Public Demo Reference Account
- Read-Only Review Access

Current Ledger-related media remains associated with the Metals / XAUUSD configuration context. No Week 2 video, external video URL, or fake platform identifier is introduced.

## Future Multi-Asset Integration

When a real public Forex, Futures, or Equities configuration is added to the Emerald Quant System family and listed in `configurationIds`, it can be selected independently.

That future configuration supplies its own:

- market categories
- instruments
- platforms
- lifecycle status
- performance record IDs

Selectors then return that configuration's own Ledger records only. Metals / XAUUSD data remains unchanged.

If multiple configurations later exist for one market category, the current option selector follows family configuration order for the first listed public configuration. A later second-level selector may be needed if public selection among multiple same-market configurations becomes a product requirement.

## Non-Goals

This foundation task does not introduce a visible Ledger asset-class selector.

It does not:

- redesign the Ledger page
- change KPI cards
- change the progression chart
- change chronology layout
- retrofit the Homepage
- create Forex, Futures, or Equities configuration records
- add performance data
- add authentication, database, CMS, analytics, or new assets

## Next Task

Next Ledger task: visible Ledger configuration selector integration.
