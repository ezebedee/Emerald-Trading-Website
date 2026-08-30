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

## Emerald Ledger Record Semantics

The canonical public Emerald Ledger data lives in `src/data/ledger/`.

Current Ledger records use the public demo/reference account:

- account classification: `public-demo-reference`
- performance classification: `forward-performance`
- visibility: `public`
- currency: `USD`
- platform: `MT4`
- broker: `Exness`
- public account number: `71891005`

The public Ledger starting baseline is `1000000` USD. Cumulative return records use that baseline unless a future approved source states otherwise.

Ledger records must keep `periodMetrics` and `cumulativeMetrics` separate. For example, Week 02 period profit and the first-two-weeks cumulative profit are different values and must not be interchanged. A cumulative record may use `periodMetrics` to represent the full cumulative span and omit `cumulativeMetrics` when both would describe the same scope.

Ledger metrics should include only authoritative values. Optional fields such as `grossProfit`, `grossLoss`, `profitFactor`, `maxDrawdownAmount`, and `maxDrawdownPct` remain absent when the source does not support them. Do not invent dollar drawdown, gross totals, profit factor, or missing daily records.

Gross loss and drawdown amounts keep the shared convention from the base performance model: store them as positive magnitudes and let the presentation layer apply loss formatting.

Ledger media references use asset IDs such as `thumbnailAssetId` and `mediaAssetIds`. Do not copy image paths, dimensions, or alt text into Ledger records.

Public Ledger records must not contain passwords, investor passwords, API keys, secret tokens, private live-account credentials, or fabricated video IDs. Private live-performance records belong in a later authenticated data path, not in this public dataset.

The current data shape is static TypeScript validated by Zod, but it is intentionally compatible with future JSON files, PostgreSQL, Supabase, Prisma, or CMS-backed records.

## Product Domain Semantics

The canonical public product catalog lives in `src/data/products/`.

Systems, indicators, and signal streams are distinct domains:

- Trading systems are complete strategy or automation products. They may link to performance records when the public record belongs to that system/account relationship.
- Indicators are market-analysis or signal-generating tools. They may link to systems and signal streams, but should not duplicate or claim Ledger performance unless a later approved source supports that attribution.
- Signal products are structured streams of trade ideas, directional events, alerts, or indicator-generated outputs. They are product definitions, not individual buy/sell events.

Relationships use stable IDs only:

- systems reference `relatedIndicatorIds`, `relatedSignalIds`, and `performanceRecordIds`
- indicators reference `relatedSystemIds` and `relatedSignalIds`
- signal products reference `relatedSystemIds` and `relatedIndicatorIds`

Do not embed full related objects inside catalog records. This keeps records JSON-serializable and database-compatible.

Product media also uses asset IDs only. Fields such as `featuredAssetId` and `assetIds` must point to entries in `src/data/assets.ts`; product records must not copy asset paths, dimensions, formats, or alt text.

Performance metrics remain owned by Ledger/performance records. Product records may link to performance record IDs, but must not duplicate net profit, return, trade count, or drawdown fields.

Public catalog records should use:

- `visibility: "public"`
- `contentStatus: "published"`
- conservative lifecycle/runtime fields, such as `public-forward-test` and `unknown`

Private/internal catalog records may be modeled later, but visibility metadata alone is not access control. Future private products must not be shipped to public static data or unauthenticated responses.

Product descriptions should remain factual and avoid pricing, guarantees, live-account claims, risk-free language, or unsupported performance claims.

## Research, Video & Verification Semantics

The canonical public content metadata for research, video archive entries, and verification records lives in `src/data/content/`.

Research records separate publication lifecycle from website visibility:

- `publicationStatus` describes the research/publication state, such as draft, submitted, under-review, accepted, published, or archived.
- `contentStatus` describes whether the website content record itself is draft, published, or archived.

Do not use website content status as a substitute for peer-review, journal acceptance, DOI registration, publisher listing, or publication date. Optional publication fields such as authors, venue, DOI URL, publisher URL, external URL, and publication year remain absent until authoritative metadata is supplied.

Video records are metadata records, not video assets. They may describe a planned or known archive entry before an external platform ID is registered. When no real platform identifier is supplied, keep `externalVideoId` and `externalUrl` absent. Do not fabricate YouTube video IDs, watch URLs, embed URLs, channel IDs, or fetched platform metadata.

Video entries may use Ledger thumbnail asset IDs, but they must not copy image paths, dimensions, formats, alt text, or provenance. They also must not copy Ledger performance metrics. Link to Ledger entries with `relatedLedgerEntryIds` and let Ledger remain the owner of profit, return, trade-count, balance, equity, and drawdown data.

Verification records describe evidence and review methods. They are not a single verified/unverified boolean. Use concrete method/status language such as account-reference, platform-screenshot, read-only-access, available, pending, unavailable, or retired.

Verification records must avoid unsupported claims such as independently verified, audited, third-party verified, or real-money verified unless an approved source provides that basis. Prefer factual language such as documented, reference account, account information, available for review, and supporting evidence.

Verification data may include public-safe account metadata such as broker, platform, account classification, and public account number. It must never include passwords, investor passwords, API keys, secret tokens, or private credentials. Read-only access can be modeled as an availability record, but credentials must be provided outside source code.

All content relationships are ID-based:

- research records may link to systems, indicators, and signal products
- video records may link to Ledger entries, systems, indicators, and signal products
- verification records may link to Ledger entries and systems

Content records reference assets by ID only and are parsed through Zod schemas at module load. The content index performs lightweight cross-reference checks so unknown asset, Ledger, system, indicator, or signal IDs fail fast during development and build validation.

## Query & Derived Data Semantics

Reusable selectors live in `src/data/selectors/`. They are a query layer over canonical static data, not a second source of truth.

Canonical records remain owned by their domain data modules:

- Ledger records live in `src/data/ledger/`
- product catalog records live in `src/data/products/`
- research, video, and verification records live in `src/data/content/`
- asset metadata lives in `src/data/assets.ts`

Selectors may filter, sort, resolve relationships, and return lightweight derived views. They must not mutate source arrays, duplicate production records, or rewrite authoritative metrics. Public selectors require `visibility === "public"`, and records with `contentStatus` must also require `contentStatus === "published"` so draft, archived, private, and internal records do not leak into public page data.

Relationship helpers resolve IDs against canonical records at read time. Product helpers resolve systems, indicators, signal products, featured assets, and system performance records without embedding copied related objects in stored data. Content helpers resolve research, videos, and verification records by their related Ledger or product IDs. Asset helpers build an internal lookup map from the canonical manifest so callers do not need to know which asset category owns an ID.

Effective cumulative metrics follow the approved period semantics:

- use `cumulativeMetrics` when present
- use `periodMetrics` for records whose `periodType` is `cumulative`
- use `periodMetrics` for the explicit inception daily record, Day 001
- avoid treating weekly period metrics as cumulative values when `cumulativeMetrics` is absent

The general cumulative performance series returns one canonical snapshot per date for future charting. If multiple aggregate records share a date, the selector prefers explicit cumulative records, then weekly records with cumulative metrics, then daily records with cumulative metrics, then the inception daily record. Specialized daily and weekly cumulative series keep their own cadence, so duplicate aggregate records do not create duplicate points in the general series.

Derived helpers such as win rate, profit factor, return percentage, expected ending balance, profit delta, and return delta are pure QA/view utilities. They return raw numbers or `null` for unavailable unsafe calculations, such as profit factor with zero or missing gross loss. They do not overwrite stored values.

Performance summaries and cumulative-series points are presentation-ready shapes, but they still return raw structured numeric values. Currency strings, percentage strings, locale formatting, and display labels beyond record titles belong in later presentation code.
