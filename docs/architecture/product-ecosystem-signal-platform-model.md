# Emerald Product Ecosystem, Signal Framework & Platform Model

## Scope

This document defines the canonical data and architecture model for the Phase 5 public product ecosystem foundation.

It covers public subscription products, private investor product positioning, signal-module architecture, platform definitions, product/platform availability, signal-vs-trade boundaries, performance-attribution boundaries, and planned route/navigation architecture.

It does not define visible product pages, navigation changes, pricing, checkout, downloads, authentication, new screenshots, new assets, or detailed trading logic.

## Product Ecosystem

The Emerald product ecosystem contains four canonical products in public-facing order:

1. Emerald Legacy System
2. Emerald Signal Scanner
3. Emerald Recovery Expert
4. Emerald Quant System

Ecosystem roles:

- Emerald Legacy System generates signal outputs.
- Emerald Signal Scanner consumes and monitors signal outputs across user-selected instruments.
- Emerald Recovery Expert provides a semi-automated trade-management layer.
- Emerald Quant System provides a fully automated private execution layer.

These relationships describe ecosystem roles, not a mandatory linear workflow.

## Product Access Model

Access classifications:

- Emerald Legacy System: `public-subscription`
- Emerald Signal Scanner: `public-subscription`
- Emerald Recovery Expert: `public-subscription`
- Emerald Quant System: `private-investor`

`private-investor` does not mean the product cannot be publicly described. It means access is handled through private investor review rather than public subscription or checkout.

## Product Layers

Canonical product layers:

- `analysis-signal`
- `monitoring-scanning`
- `assisted-execution`
- `automated-execution`

Current assignments:

- Emerald Legacy System: `analysis-signal`
- Emerald Signal Scanner: `monitoring-scanning`
- Emerald Recovery Expert: `assisted-execution`
- Emerald Quant System: `automated-execution`

## Signal Framework

Emerald Legacy System is the public unified multi-signal indicator product. It is distinct from the company name Emerald Legacy Systems.

The stable existing indicator ID `emerald-signal-indicator` is preserved for backward compatibility while its public presentation now reflects Emerald Legacy System.

The stable existing signal product ID `emerald-directional-signal-stream` is preserved and reframed as the umbrella Emerald Signal Framework.

Canonical signal module order:

1. Main Signal
2. FineScalp
3. Scalp Signal
4. Range Signal
5. Harmonizer
6. Harmonizer SAFE

Signal module IDs/slugs:

- `emerald-main-signal` / `main`
- `emerald-finescalp` / `finescalp`
- `emerald-scalp-signal` / `scalp`
- `emerald-range-signal` / `range`
- `emerald-harmonizer` / `harmonizer`
- `emerald-harmonizer-safe` / `harmonizer-safe`

Signal modules use `instrumentScope: "multi-instrument"` rather than a signal-by-market matrix. This represents intended multi-instrument usability without claiming validation, performance, or suitability across every asset class.

## Primary vs Auxiliary Signal Modules

Primary signal modules:

- Main Signal: `trend`
- FineScalp: `high-resolution`
- Scalp Signal: `scalp`
- Range Signal: `range`
- Harmonizer: `synthesis`

Auxiliary signal module:

- Harmonizer SAFE: `defensive-helper`

Harmonizer references Scalp Signal and Range Signal as source/related signal modules. The data model does not specify whether Harmonizer uses weighted, voting, agreement-only, sequential, or probabilistic logic because that logic has not been supplied.

Harmonizer SAFE is modeled as an auxiliary defensive/helper module. It may be enabled alongside a preferred primary signal, but it does not guarantee loss prevention.

## FineScalp High-Resolution Architecture

FineScalp is a high-resolution tick / seconds-chart signal module.

For MT4 and MT5:

- FineScalp can operate using an Emerald-generated custom high-resolution chart.
- The user chooses an `aggregationMode`.
- Supported aggregation modes are Tick and Seconds.
- The user chooses an `aggregationInterval`.
- Tick mode with interval `5` means each generated candle/bar represents 5 ticks.
- Seconds mode with interval `5` means each generated candle/bar represents 5 seconds.
- FineScalp signals are calculated and printed on the generated custom chart.
- MetaTrader implementation uses offline/custom-chart mechanics.

For TradingView and NinjaTrader:

- FineScalp can use platform-native high-resolution chart capability where available.
- No MetaTrader offline/custom-chart builder is implied.

Exact FineScalp signal-generation logic has not been supplied.

## Signal Scanner Architecture

Emerald Signal Scanner is a public subscription product for multi-symbol and multi-signal scanning and monitoring.

Known capabilities:

- user-defined symbol selection
- Market Watch / symbol universe selection where platform supports it
- favorite signals
- multi-signal scanning
- dashboard presentation
- session filtering
- directional filtering
- signal-age context
- chart/open-view workflow

Scanner consumes signal modules from the Emerald signal framework: Main Signal, FineScalp, Scalp Signal, Range Signal, Harmonizer, and Harmonizer SAFE.

MT4 and MT5 Scanner implementations can participate in FineScalp custom high-resolution chart workflows. TradingView and NinjaTrader implementations may use native high-resolution chart workflows where available.

## Recovery Expert Architecture

Emerald Recovery Expert is a public subscription product for semi-automated trade management and recovery workflows.

Core workflow:

1. The trader manually initiates the first trade.
2. After the initial trade is entered, Emerald Recovery Expert manages subsequent trade/recovery actions according to its algorithm.

Claim-safe positioning:

```text
designed to manage subsequent recovery actions with the objective of recovering accumulated losses and pursuing the configured profit objective
```

This does not mean it guarantees recovery, recovers every loss, cannot lose, or ensures profit.

## Quant System Relationship

Emerald Quant System remains the fully automated private investor product.

The existing system-family/configuration architecture remains authoritative for:

- `emerald-quant-system-family`
- current Metals / XAUUSD configuration
- current MT4 public forward-test configuration
- `performanceRecordIds`
- Ledger performance ownership

The product catalog represents Emerald Quant System as `emerald-quant-system-product` and links to the existing specialized `emerald-quant-system` configuration record. This avoids flattening product-level availability into the current public performance configuration.

## Platform Model

Canonical platform IDs and labels:

- `mt4`: MT4
- `mt5`: MT5
- `tradingview`: TradingView
- `ninjatrader`: NinjaTrader

These platform identifiers are product-availability identifiers. They are separate from existing configuration fields such as `platforms: ["MT4"]` on the current Metals / XAUUSD public performance configuration.

## Product / Platform Matrix

| Product                 | MT4 | MT5 | TradingView | NinjaTrader |
| ----------------------- | --- | --- | ----------- | ----------- |
| Emerald Legacy System   | Yes | Yes | Yes         | Yes         |
| Emerald Signal Scanner  | Yes | Yes | Yes         | Yes         |
| Emerald Recovery Expert | Yes | Yes | Yes         | Yes         |
| Emerald Quant System    | Yes | Yes | Yes         | Yes         |

This matrix does not imply public performance availability, market validation, or configuration-specific Ledger records on every platform.

## Platform-Specific Capability Model

Product-platform implementation records allow future platform-specific documentation without duplicating product definitions.

Current capability model:

- all product/platform rows use `availability: "available"`
- all rows use `documentationStatus: "planned"`
- MT4 and MT5 product implementations using FineScalp can expose `custom-high-resolution-chart-builder`
- TradingView and NinjaTrader implementations using FineScalp can expose `native-high-resolution-chart-workflow`
- Scanner implementations can expose `scanner-finescalp-high-resolution-support`
- Recovery Expert implementations expose `trader-first-entry-recovery-workflow`

No beta, experimental, deprecated, or certified platform states are invented.

## Signal vs Trade Boundary

A signal is not automatically a trade.

Signal modules produce analytical or directional outputs. Execution products may use those outputs as inputs, but execution products apply additional trade-management and execution logic.

The architecture does not encode `signal -> guaranteed execution`.

## Performance Attribution Boundary

Current public Ledger performance remains attached only to the Metals / XAUUSD Emerald Quant System configuration.

No current Ledger performance records are attached to Main Signal, FineScalp, Scalp Signal, Range Signal, Harmonizer, Harmonizer SAFE, Emerald Legacy System, Emerald Signal Scanner, or Emerald Recovery Expert.

Do not claim Emerald Legacy System, Scanner, Recovery Expert, or individual signal modules returned 20.50% unless future dedicated evidence is supplied and approved.

## Planned Route Architecture

Planned public route roles:

- `/indicators`: Emerald Legacy System product overview
- `/signals`: Signal Library
- `/signal-scanner`: Emerald Signal Scanner product page
- `/recovery-expert`: Emerald Recovery Expert product page
- `/platforms`: platform ecosystem overview
- `/platforms/mt4`: MT4 product implementation guide
- `/platforms/mt5`: MT5 product implementation guide
- `/platforms/tradingview`: TradingView product implementation guide
- `/platforms/ninjatrader`: NinjaTrader product implementation guide
- `/systems`: Emerald Quant System / private automated system

Signal-library subpages are not planned for this phase. Initial `/signals` work should use anchored sections: `#main`, `#finescalp`, `#scalp`, `#range`, `#harmonizer`, and `#harmonizer-safe`.

No new routes are created in Task 5.1.

## Planned Navigation Architecture

Current navigation remains unchanged for Task 5.1.

Recommended future structure after real product routes exist:

- Home
- Products
- Emerald Legacy System
- Signal Scanner
- Recovery Expert
- Emerald Quant System
- Emerald Ledger
- Platforms
- Technology
- Research
- About

Do not implement dropdown navigation until the product routes exist and are approved.

## Asset / Screenshot Strategy

No screenshots or assets are added in Task 5.1.

Future product-page builds should use real product-owner-supplied screenshots.

Expected future visual categories:

- Indicator: chart view, settings, FineScalp high-resolution chart
- Scanner: symbol/favorite setup, populated scanner dashboard, filtering/session view
- Recovery Expert: control panel, first-entry workflow, trade-management state
- Platforms: MT4, MT5, TradingView, and NinjaTrader implementations

Future asset taxonomy destinations:

- `products/indicator`
- `products/scanner`
- `products/recovery-expert`
- `products/quant-system`
- `signals/main`
- `signals/finescalp`
- `signals/scalp`
- `signals/range`
- `signals/harmonizer`
- `signals/harmonizer-safe`
- `platforms/mt4`
- `platforms/mt5`
- `platforms/tradingview`
- `platforms/ninjatrader`

No local Windows paths should be embedded in canonical data or docs.

## Future Research Extensibility

The signal-module model can be extended later with new signal modules, filters, confirmation modules, refinements, signal versions, platform-specific enhancements, and research references.

No fake filters, research records, or semantic versions are introduced now.

## Deferred Product Details

Details not yet supplied:

- exact Main Signal generation logic
- exact FineScalp signal-generation logic
- exact Scalp Signal logic
- exact Range Signal logic
- exact Harmonizer combination logic
- exact Harmonizer SAFE trigger logic
- exact Recovery Expert recovery algorithm
- exact per-platform UI/settings differences
- detailed market validation claims
- product pricing
- subscription flow
- product download flow
- platform route content
- product screenshots

These details should not be filled from general market knowledge.
