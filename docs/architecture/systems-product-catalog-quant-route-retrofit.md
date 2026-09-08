# Systems/Product Catalog and Quant Detail Route Retrofit

## Scope

Task 5.6 changes `/systems` from the dedicated Emerald Quant System detail route into the master Emerald Systems & Products catalog, and moves the approved Quant detail experience to `/systems/quant`.

## Why `/systems` Changed

The public product ecosystem now contains four canonical products. A top-level Systems route should answer what products exist before sending visitors into individual detail routes.

## Master Product Catalog Role

`/systems` presents the public product catalog. It introduces Emerald Legacy System, Emerald Signal Scanner, Emerald Recovery Expert, and Emerald Quant System without treating Quant performance as product-family performance.

## Product Route Map

| Product                 | Detail Route       |
| ----------------------- | ------------------ |
| Emerald Legacy System   | `/indicators`      |
| Emerald Signal Scanner  | `/signal-scanner`  |
| Emerald Recovery Expert | `/recovery-expert` |
| Emerald Quant System    | `/systems/quant`   |

## Product Layer Taxonomy

| Layer                 | Product                 |
| --------------------- | ----------------------- |
| Analysis & Signal     | Emerald Legacy System   |
| Monitoring & Scanning | Emerald Signal Scanner  |
| Assisted Execution    | Emerald Recovery Expert |
| Automated Execution   | Emerald Quant System    |

These relationships describe ecosystem roles only. They do not create mandatory purchase or usage dependencies.

## Access Model

Emerald Legacy System, Emerald Signal Scanner, and Emerald Recovery Expert are public subscription products. Emerald Quant System is publicly described but uses a private investor access model.

## Platform Matrix

Each canonical product has product-level availability across MT4, MT5, TradingView, and NinjaTrader. Availability does not imply identical UI, identical workflow, broker support, market availability, or documented performance on every platform.

## Quant Detail Route

`/systems/quant` owns the approved Emerald Quant System detail page. It reuses the existing Quant components for hero, positioning, relationship overview, capability architecture, and performance context.

## Quant Configuration Ownership

Quant configuration selection remains tied to the current public Emerald Quant System configuration. The current documented public performance scope remains Metals / XAUUSD on MT4 with Public Forward Test classification.

## Legacy `/systems?configuration=` Compatibility

Legacy configuration URLs redirect from `/systems?configuration=<id>` to `/systems/quant?configuration=<id>`. Repeated or non-simple configuration query values safely redirect to `/systems/quant`, where the Quant page keeps its fallback behavior.

## Link Intent Rules

Links that mean product catalog discovery should point to `/systems`. Links that specifically mean Emerald Quant System detail should point to `/systems/quant`.

## SEO/Canonical Strategy

`/systems` has catalog metadata and WebPage JSON-LD with `Home > Systems & Products` breadcrumbs. `/systems/quant` has Quant detail metadata and WebPage JSON-LD with `Home > Systems & Products > Emerald Quant System` breadcrumbs. Both routes are public, indexable, and sitemap-backed.

## Recovery Placeholder Strategy

The Recovery Expert catalog visual uses a temporary website-grade placeholder asset registered as `recovery-expert-placeholder`. It is internally documented as temporary and can later be replaced by a real Recovery Expert screenshot without restructuring the catalog.

## Deferred Navigation Dropdown

Global navigation remains unchanged. The Systems link points to the master catalog. A future product dropdown is deferred.

## Deferred Platform Pages

Detailed platform-specific product pages remain deferred. The catalog only summarizes product-level availability.

## Regression Boundaries

This retrofit does not change Ledger records, Quant performance ownership, product pricing, authentication, downloads, final Recovery Expert detail content, platform detail pages, or global navigation structure.
