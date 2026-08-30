# System Family & Configuration Model

Task 4.3 separates trading-system family coverage from concrete system configuration scope.

The prior flat `TradingSystem` model was not sufficient because one record could not safely represent both:

- Emerald Quant System family-wide market coverage
- the specific configuration associated with public Forward Performance

Without this distinction, expanding the Emerald Quant System beyond Metals could imply that existing Ledger results apply to Forex, Futures, or Equities. They do not.

## Core Distinction

`TradingSystemFamily` represents the broader product/system architecture and supported development scope.

`TradingSystem` represents a concrete configuration. A configuration owns its own market, instruments, platforms, lifecycle status, runtime status, capabilities, product relationships, assets, and performance records.

## Current Canonical Family

Family ID: `emerald-quant-system-family`

Family name: `Emerald Quant System`

Family coverage:

- Metals
- Forex
- Futures
- Equities / Stocks

Family market coverage does not mean every configuration supports every family market.

Current architecture:

```text
Emerald Quant System Family
|-- Metals / XAUUSD - current public Forward Test configuration
|-- Forex - future canonical configuration slot when fully specified
|-- Futures - future canonical configuration slot when fully specified
`-- Equities / Stocks - future canonical configuration slot when fully specified
```

The Forex, Futures, and Equities / Stocks lines above are architectural future examples only. They are not current configuration records.

## Current Canonical Configuration

Configuration ID: `emerald-quant-system`

Configuration key: `metals-xauusd`

Configuration name: `Metals / XAUUSD`

Market: Metals

Instrument: XAUUSD

Platform: MT4

Lifecycle: Public Forward Test

The current configuration preserves the existing `emerald-quant-system` ID so Ledger, indicator, signal, video, verification, and research relationships remain stable.

## Relationship Rules

Performance records belong to concrete configurations unless an explicit family-level aggregate performance model is introduced in the future.

The current Emerald Ledger performance records belong to `emerald-quant-system` and do not represent the entire multi-asset family.

Exact instrument symbols should be declared only on concrete configurations when they are specifically known and supported. Do not invent Forex pairs, futures contracts, or equity symbols.

Platform support is configuration-specific unless a future explicit family-level platform policy is created. Current MT4 support belongs to the Metals / XAUUSD configuration.

Lifecycle and runtime status are configuration-specific. Do not interpret Public Forward Test as a status for every asset class in the family.

Capabilities currently belong to concrete configurations. Do not automatically assume future Forex, Futures, and Equities configurations have identical capability implementations unless canonically defined.

Indicator and signal relationships remain configuration-specific unless intentionally generalized later. Current relationships remain attached to `emerald-quant-system`.

Featured and product assets remain configuration-specific when they depict a specific implementation or instrument. The current XAUUSD/indicator asset must not be treated as a universal family asset.

## Data Model

`TradingSystemFamily` stores the family-level product identity and asset-class development coverage.

`TradingSystem` stores concrete configuration records and includes:

- `familyId`
- `configurationKey`
- `configurationName`

Referential integrity rules:

- `family.configurationIds` must reference existing configurations.
- `configuration.familyId` must reference an existing family.
- family/configuration relationships must agree in both directions.
- `configurationKey` must be unique within a family.

## Routing And UI

Task 4.3 does not introduce separate family or configuration routes. Current routing remains unchanged.

Public UI should preserve the distinction between:

- Family Coverage
- Current Public Configuration

This wording prevents family-wide market coverage from being mistaken for family-wide public performance.

## Claim Safety

Metals, Forex, Futures, and Equities family coverage must never be used to imply the existing Ledger results cover all four asset classes.

The current public Forward Performance program documents the Metals / XAUUSD configuration only.
