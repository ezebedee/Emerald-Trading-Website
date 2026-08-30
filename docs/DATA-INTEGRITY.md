# Data Integrity Closeout

Task 0.5F audited the Phase 0.5 structured-data layer across domain schemas, canonical data records, asset references, selectors, and derived metric helpers.

## Audited Scope

- `src/domain/**`
- `src/data/assets.ts`
- `src/data/ledger/**`
- `src/data/products/**`
- `src/data/content/**`
- `src/data/selectors/**`
- `docs/DATA-ARCHITECTURE.md`

No UI routes, API routes, database clients, authentication flows, production media files, or business data records were changed.

## Canonical Account And Baseline

The public Ledger account remains consistently modeled as:

- account classification: `public-demo-reference`
- broker: `Exness`
- platform: `MT4`
- currency: `USD`
- public account number: `71891005`

The canonical public Ledger starting baseline remains `1000000` USD.

## Duplicate ID And Slug Audit

`pnpm data:audit` checks duplicate literal IDs and route slugs in the current static data sources:

- Ledger IDs and slugs
- system IDs and slugs
- indicator IDs and slugs
- signal IDs and slugs
- research IDs and slugs
- video IDs and slugs
- verification IDs and slugs
- asset IDs

Result: no duplicate IDs or route slugs were found within the audited domains.

Cross-domain ID uniqueness is not currently required because IDs are resolved within typed domain contexts. Where cross-domain relationships exist, records use explicit fields such as `relatedSystemIds`, `relatedLedgerEntryIds`, `thumbnailAssetId`, and `primaryAssetId`.

## Relationship Integrity

Existing Zod parsing and module-level cross-reference checks remain active across Ledger, product, and content data.

Confirmed relationships:

- `emerald-quant-system` links to `emerald-signal-indicator`.
- `emerald-quant-system` links to `emerald-directional-signal-stream`.
- indicator and signal reverse relationships resolve.
- all six `emerald-quant-system` `performanceRecordIds` resolve to Ledger entries.
- seeded research resolves to the system, indicator, and signal records.
- Ledger-linked videos resolve for `day-001`, `day-002`, `day-003`, `week-01`, and `cumulative-2-weeks`.
- no Week 02 video record or thumbnail was fabricated.
- verification records resolve to all six Ledger entries and the Emerald system.

## Asset Integrity

`pnpm assets:audit` passed.

Result:

- every manifest path resolves to a physical public file
- no orphan public media files were found
- no duplicate public media files were found
- no public raw video masters were found

Confirmed current asset expectations:

- Day 001 thumbnail exists.
- Day 002 thumbnail exists.
- Day 003 thumbnail exists.
- Week 01 thumbnail exists.
- Week 02 intentionally has no thumbnail.
- cumulative two-week thumbnail exists.
- public demo reference account verification asset exists.

## Public And Credential Safety

Public Ledger records remain:

- `visibility: "public"`
- `accountClassification: "public-demo-reference"`
- `performanceClassification: "forward-performance"`

Public selectors enforce:

- `visibility === "public"` for public Ledger selectors
- `visibility === "public"` and `contentStatus === "published"` for public product/content selectors

`pnpm data:audit` scanned production data files for credential-like property keys:

- `password`
- `passwd`
- `secret`
- `apiKey`
- `api_key`
- `token`
- `investorPassword`
- `tradingPassword`

Result: no credential-like production-data property keys were found.

Source search found credential terms only in documentation/policy text and a verification note that explicitly states credentials are not stored.

## Ledger Arithmetic QA

Existing selector QA helpers preserve source data and report differences without mutating authoritative Ledger records.

Period-level QA reviewed:

- ending balance vs starting balance plus net profit
- return percentage vs balance-derived return
- win rate vs winning trades divided by total trades
- profit factor vs gross profit divided by gross loss where both source metrics exist
- trade-count consistency

Current known Ledger entries pass within documented tolerance:

- `day-001`
- `day-002`
- `day-003`
- `week-01`
- `week-02`
- `cumulative-2-weeks`

## Period And Cumulative Semantics

Period values remain distinct from cumulative values:

- Day 002 period net profit remains `20386.88`; cumulative net profit remains `31796.48`.
- Day 003 period net profit remains `24093.06`; cumulative net profit remains `55889.54`.
- Week 02 period net profit remains `47361.91`; cumulative net profit remains `204966.54`.

Cumulative trade, profit, and ending-balance progression do not decrease across the known public sequence.

## Selector QA

Confirmed selector behavior:

- `getLatestDailyLedgerEntry()` resolves to `day-003`.
- `getLatestWeeklyLedgerEntry()` resolves to `week-02`.
- `getLatestCumulativeLedgerEntry()` resolves to `cumulative-2-weeks`.
- `getLatestPublicPerformanceSummary()` resolves from `cumulative-2-weeks`.
- `getCumulativePerformanceSeries()` returns one canonical point per date and does not duplicate `2026-08-28`.
- `getDailyCumulativePerformanceSeries()` returns Day 001, Day 002, and Day 003 cumulative points.
- `getWeeklyCumulativePerformanceSeries()` returns Week 01 and Week 02 cumulative points.
- asset lookups resolve the brand mark, Day 001 thumbnail, indicator screenshot, and verification asset.
- unknown asset IDs return `undefined`; `requireAssetById()` throws a descriptive error.
- product lookups resolve the Emerald system, indicator, and signal product.
- relationship helpers resolve products, system performance records, videos, verification records, and research entries.

Selectors use non-mutating operations such as `filter`, `map`, `reduce`, and `toSorted`; canonical source arrays are not sorted or mutated in place.

## External ID Safety

Seeded records do not contain fake:

- YouTube IDs
- video URLs
- DOIs
- journal URLs
- third-party verification links

Research publication metadata remains intentionally incomplete until authoritative publication details are supplied.

## Known Deferred Items

- Week 02 thumbnail is still needed.
- Day 001 trade-history evidence asset is still needed.
- external YouTube IDs are not yet registered in source data.
- third-party verification is not configured.
- research publication metadata is intentionally incomplete.
- favicon derivatives remain future work if still applicable.

## Known Artwork Claim Flags

Existing raster artwork claim-language issues remain tracked from Phase 0.4 and were not edited in this data-only task. These image-level phrases may still require later asset/content review:

- `REAL TRADES`
- `REAL PERFORMANCE`
- `REAL RESULTS`
- `VERIFIED RESULTS`
- `MT4 VERIFIED RESULTS`

## Validation Commands

Run for this closeout:

```bash
pnpm data:audit
pnpm assets:audit
pnpm lint
pnpm typecheck
pnpm format:check
pnpm build
```

All commands passed during Task 0.5F.
