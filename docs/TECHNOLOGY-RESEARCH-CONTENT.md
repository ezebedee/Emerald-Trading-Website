# Technology and Research Content Boundaries

Task 5.11 base: `76b06ceb2cc4652842798d765a2ed786853d9169`.
Task 5.10 PR #3 is merged; baseline CI run `34894705984` passed.

## Source Inventory

Read before drafting public technical statements:

| Source                                                                         | Permitted use                                                                                                                          | Limit                                                                                                 |
| ------------------------------------------------------------------------------ | -------------------------------------------------------------------------------------------------------------------------------------- | ----------------------------------------------------------------------------------------------------- |
| `src/data/products/product-catalog.ts`                                         | Four separate product identities, roles, access models and relationships                                                               | Do not turn relationships into an automatic trade pipeline                                            |
| `src/data/products/signal-modules.ts`                                          | Six public module roles, five primary/one auxiliary; Harmonizer combines Scalp and Range                                               | Generation formulas and synthesis mechanics are not supplied                                          |
| `src/data/products/platform-implementations.ts`                                | Legacy/Scanner FineScalp MetaTrader custom-chart versus native chart context; Recovery trader-first-entry; Quant availability boundary | Implementation documentation is planned; do not promise identical behavior or invent platform bridges |
| `src/data/products/platforms.ts`                                               | MT4, MT5, TradingView, NinjaTrader labels                                                                                              | Availability is not performance evidence                                                              |
| `src/data/products/systems.ts`                                                 | Quant signal interpretation, execution, risk/position/trade lifecycle responsibilities                                                 | Exact safeguards are unspecified; runtime status is unknown                                           |
| `src/data/content/research.ts`                                                 | Internal research note, currently Draft                                                                                                | No journal, DOI, author, publication date or peer review supplied                                     |
| `docs/DATA-ARCHITECTURE.md`                                                    | Publication status versus website visibility, relationships, configuration ownership                                                   | Public content visibility does not mean academic publication                                          |
| `docs/architecture/recovery-expert-product-page.md` and existing product pages | Trader opens first trade; subsequent assisted management; separate from Quant                                                          | Exact recovery controls remain deferred; no guaranteed outcome                                        |
| `src/components/home/home-technology-research.tsx`                             | Existing hypothesis/design/testing/refinement framing                                                                                  | Workflow is not a per-product completion certificate                                                  |
| `docs/PERFORMANCE-EVIDENCE.md` and Task 5.10 pages                             | Forward/demo terminology, static records, provenance and correction boundaries                                                         | No new results, scientific certification or independent audit claims                                  |

## Page Ownership

`/technology` explains public architectural responsibilities and product/platform
boundaries. `/research` explains an evaluation framework, questions to test and
the current public research record. Neither page implements trading, generates
signals in a browser, or documents license-validation internals.

Licensing is described only as a product/platform access concern, based on the
approved access model. No protocol, secret, endpoint, bypass, cache policy or
platform-specific enforcement mechanism is asserted. TradingView invite access
is an optional example in the brief, not an established public source detail;
this implementation does not assert it or invent a bridge to automated orders.

## Methodology Is Not a Completion Claim

The requested eight-stage research workflow is an evaluation framework, not a
claim that every product has completed sensitivity testing, forward observation
or production monitoring. Stage copy names what to investigate or document.
Publication status comes from the public research selector and remains distinct
from the record's website visibility. No academic metadata is invented.

Validation reduces uncertainty; it does not prove future profitability. Quant's
Documented Performance remains scoped to Metals / XAUUSD / MT4, using the Public
Demo Reference Account and Forward Performance Record terminology. The pages add
no numerical performance values. Detailed backtest and verification explanations
remain owned by Task 5.10's pages and are linked rather than duplicated.

## Future Content

Product/domain owners must supply authoritative changes to product roles, module
behavior and implementation availability. Research owners must supply evidence
and publication metadata before completion, peer-review or outcome claims are
added. Performance owners retain Ledger ownership and dated-source discipline.
Detailed platform guides and portal engineering documentation remain separate
workstreams. Never add proprietary formulas, thresholds, source excerpts,
credentials or licensing internals to these public pages.

Existing homepage and footer labels already match the two routes. They require
no redesign or label changes in this task.

## Regression Coverage

`pnpm engineering:audit`, included in `foundation:audit`, checks substantive
routes, canonical product names, responsibility/stage coverage, publication-status
rendering, conservative capability boundaries, contextual links, metadata and
narrow claim/secret exclusions. Browser QA separately checks rendered content,
heading hierarchy, focus, reflow, linked destinations and draft status. These are
regression guardrails, not independent scientific or security certification.
