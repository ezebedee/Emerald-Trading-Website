# Data Architecture

Emerald Legacy Systems domain data is modeled as typed, validated, JSON-serializable records. The current source of truth for these foundations lives in `src/domain/`.

## Domain Boundaries

- `common`: shared primitives such as IDs, slugs, ISO dates, money, percentages, classifications, visibility, platforms, markets, content status, runtime status, and account-reference metadata.
- `performance`: reusable metrics and base performance records.
- `ledger`: Ledger-specific performance entries that extend the base performance record.
- `systems`: trading-system metadata and lifecycle classification.
- `indicators`: indicator/product-interface metadata.
- `signals`: signal metadata and trade-direction taxonomy.
- `research`: research publication metadata.
- `verification`: public/private verification records and evidence references.
- `videos`: video metadata and relationships to Ledger or systems.

These modules define data contracts only. They do not load data, implement authentication, create APIs, or calculate performance.

## IDs And Slugs

Static content uses readable string IDs such as `day-001`, `week-01`, `cumulative-2-weeks`, and `public-demo-reference`.

Slugs must use lowercase letters, digits, and hyphens:

```text
^[a-z0-9]+(?:-[a-z0-9]+)*$
```

Do not use spaces, locale formatting, or random UUIDs for static content identifiers unless a future database task explicitly requires them.

## Dates

Structured dates use ISO strings:

- Date: `YYYY-MM-DD`
- Date-time: ISO 8601 with an offset

Domain records must not store JavaScript `Date` objects. Dates remain strings so the data can move cleanly between JSON files, CMS records, databases, and server-rendered pages.

## Money

`MoneyValue` is a plain number. Values are USD unless a record explicitly carries another supported currency.

Positive values represent gains, profits, balances, and positive magnitudes. Negative values may represent losses only where the field semantics allow signed values, such as `netProfit` or `floatingPnl`.

## Percentages

Percentages are stored in human percent units:

```text
20.5 means 20.50%
```

Do not store `0.205` for `20.5%`. Rate fields such as `winRatePct` and `maxDrawdownPct` validate from `0` through `100`.

## Gross Loss And Drawdown

`grossLoss` is stored as a positive absolute loss magnitude.

Example:

```text
grossProfit: 30000
grossLoss: 18000
netProfit: 12000
```

`maxDrawdownAmount` is also stored as a positive magnitude. UI formatting can add a minus sign or loss styling when needed.

Schemas do not require `netProfit === grossProfit - grossLoss` because broker reports may later include commission, swap, and fees.

## Balance And Equity

Balance and equity are separate:

- `endingBalance`: closed-account balance after the period.
- `equity`: balance plus floating P/L at the recorded snapshot.
- `floatingPnl`: optional signed floating profit/loss.

Do not collapse balance and equity into a single field.

## Period And Cumulative Metrics

Performance records must separate:

- `periodMetrics`: metrics for the stated daily, weekly, monthly, custom, or other period.
- `cumulativeMetrics`: optional cumulative metrics through the record end date.

This prevents a weekly result from being confused with a two-week cumulative result. Future display code should label these concepts separately and never infer one from the other.

## Classifications

`AccountClassification`:

- `public-demo-reference`: publicly documented demo/reference account used by the Emerald Ledger.
- `private-live`: authenticated private real-account performance.
- `backtest`: historical strategy simulation.
- `simulation`: research or paper/simulated test environment not classified as forward demo record.

`PerformanceClassification`:

- `forward-performance`
- `backtest`
- `simulation`
- `private-live-performance`

Avoid vague values such as `real`, `verified`, or `actual`.

## Visibility

`Visibility`:

- `public`: safe to render on the public website.
- `private`: requires authenticated access in a later phase.
- `internal`: never intended for public-facing rendering.

A `private` or `internal` visibility value is a modeling signal only. This task does not implement authentication or access enforcement. Future data-loading tasks must ensure private/internal records are never shipped in public static data, public JavaScript bundles, or unauthenticated API responses.

## Account References

`AccountReference` may include public-safe metadata such as account classification, broker, server, public account number, currency, platform, and notes.

It must not include password fields. Do not add:

- `password`
- `tradingPassword`
- `investorPassword`
- API keys
- secret tokens

## Media References

Domain records reference media by stable IDs such as `thumbnailAssetId`, `statementAssetId`, `platformAssetId`, `screenshotAssetId`, `posterAssetId`, or `evidenceAssetIds`.

Do not duplicate asset payloads in domain records. Paths, dimensions, alt text, formats, and provenance remain owned by `src/data/assets.ts`.

Video records follow the same rule: domain records may reference video IDs or video reference IDs without copying full YouTube metadata everywhere.

## JSON Serializability

Domain records must stay JSON-serializable:

- strings
- numbers
- booleans
- arrays
- plain objects
- `null` where explicitly allowed

Do not use `Date`, `Map`, `Set`, `BigInt`, class instances, or provider-specific objects in domain data.

## Future Database Compatibility

The current contracts are designed to map cleanly to future JSON files, PostgreSQL, Supabase, Prisma, or CMS records.

Schemas are intentionally provider-neutral. Future storage tasks may add database-specific adapters without changing the public domain semantics.
