# Performance Evidence Discipline

## Task 5.10 Source Inventory (Before Implementation)

Approved base: `a399a05688d690e91470645c514fac70fc95f0c8`.
No new numerical results are authorized by this task.

Media inspection: the existing cumulative thumbnail embeds an account identifier
and publisher claims including "verified results". It is not reproduced on the new
pages. Existing Ledger media is unchanged and remains a documented limitation;
the new methodology explains that embedded wording is not independent evidence.

| Source                               | Supported use                                                                                                    | Boundary                                                                             |
| ------------------------------------ | ---------------------------------------------------------------------------------------------------------------- | ------------------------------------------------------------------------------------ |
| src/data/ledger/entries.ts           | Six dated daily/weekly/cumulative static records; latest cumulative-2-weeks covers 2026-08-17 through 2026-08-28 | Public Demo Reference Account, forward-performance, Metals/XAUUSD/MT4 only           |
| src/data/products/systems.ts         | emerald-quant-system owns the Ledger record IDs                                                                  | Not the whole family or every product/platform                                       |
| src/data/products/system-families.ts | Quant family and configuration relationship                                                                      | Family development coverage is not evidence of returns                               |
| src/data/products/product-catalog.ts | Four product identities and availability                                                                         | Legacy signals, Scanner workflow, Recovery conceptual media are not strategy returns |
| src/data/assets.ts                   | Registered Ledger thumbnails, product screenshots, reference-account evidence                                    | Screenshots are documentation, not independent certification                         |
| src/data/content/verification.ts     | Account-reference and read-only-access records                                                                   | No third-party audit; use narrowed public selector, not account identifiers          |
| src/data/selectors/products.ts       | Configuration-owned public records and cumulative snapshot                                                       | Preserve public/forward filters and ownership                                        |
| src/data/selectors/ledger.ts         | Approved cumulative metric resolution and date formatting                                                        | Do not sum overlapping daily/weekly/cumulative snapshots                             |

No numerical backtest series, cross-product return series, or independent
verification report is supplied by these sources. Do not infer their existence
from platform availability or screenshots. No private account/credential fields
should cross into these pages.

## Taxonomy

Backtest and forward/demo distinguish how results were obtained. Documented
historical record describes a retained, dated record; internal documentation and
independent third-party verification describe provenance/review. These dimensions
can overlap and are not five interchangeable measurements or a ranking scale.
Third-party verification is a category only where available, not a current claim.

Use Public Demo Reference Account, Public Performance Record, Forward Performance
Record, Documented Results, and Documented Performance. Forward observation does
not mean a real-money account or continuous website updates. Existing records
are source-maintained snapshots; no current feed timestamp should be fabricated.

## Numerical Mapping

The comparison page reads the configuration-owned latest cumulative snapshot.
The current record is `cumulative-2-weeks` in `src/data/ledger/entries.ts`:

| Display                       | Source field                 | Raw value               | Display formatting                    |
| ----------------------------- | ---------------------------- | ----------------------- | ------------------------------------- |
| Cumulative return             | periodMetrics.returnPct      | 20.496654               | 20.50%                                |
| Maximum drawdown              | periodMetrics.maxDrawdownPct | 10.67                   | 10.67%                                |
| Trade count                   | periodMetrics.totalTrades    | 499                     | 499                                   |
| Evaluation period             | startDate / endDate          | 2026-08-17 / 2026-08-28 | Existing public coverage formatter    |
| Latest cumulative record ends | endDate                      | 2026-08-28              | ISO date, not a live-update timestamp |

Only presentation rounding is allowed. Missing metrics display Not documented,
never an invented zero. System identity comes from the public configuration selector.
Dates, identifiers, and context must stay attached to each result.

## Methodology Boundaries

Record IDs, dates, types, and relationships exist today; a public correction log,
cryptographic immutability, continuous feed, and third-party certification do not.
Describe disclosure of corrections as a practice that should be followed, not
as implemented infrastructure. Keep account identifiers and access details out
of rendered content. Do not broaden placeholder indexing, portal behavior,
performance claims, or unrelated page content.

## Validation

`pnpm evidence:audit` runs the actual configuration-scoped selectors using the
existing TypeScript compiler. It compares displayed fields with the authoritative
record, asserts current Metals/XAUUSD/MT4 ownership, checks the presentation
whitelist, and exercises missing, zero, negative and over-100 percentage values.
Narrow source checks cover the four routes, shared terminology, missing-data
labels, table semantics and cross-links. The audit is part of `foundation:audit`.
These checks supplement, rather than replace, human review of claims and images.

The implementation contains no new charts, time series, platform results or
canonical-data changes. Its only numerical performance fields are the three
source-backed comparison values above. Browser evidence is in
`docs/review-artifacts/task-5.10/`.
