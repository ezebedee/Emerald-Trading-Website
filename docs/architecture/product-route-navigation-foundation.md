# Product Route & Navigation Foundation

## Scope

Task 5.2 creates the public route, SEO, sitemap, and JSON-LD foundation for the Emerald product ecosystem. The routes are placeholders only; final product pages, platform guides, screenshots, downloads, subscriptions, pricing, and navigation restructuring are deferred.

## Canonical Product Routes

- `/indicators`: Emerald Legacy System product overview
- `/signals`: Signal Library
- `/signal-scanner`: Emerald Signal Scanner product page
- `/recovery-expert`: Emerald Recovery Expert product page
- `/platforms`: Platform ecosystem overview
- `/platforms/mt4`: MT4 product implementation guide
- `/platforms/mt5`: MT5 product implementation guide
- `/platforms/tradingview`: TradingView product implementation guide
- `/platforms/ninjatrader`: NinjaTrader product implementation guide
- `/systems`: Emerald Quant System / private automated system

## Existing Routes

Existing routes remain in place. `/indicators`, `/signals`, and `/systems` keep their current route locations. `/indicators` and `/signals` remain placeholders with updated semantic titles. `/systems` remains the current Emerald Quant System route backed by the existing specialized family and configuration architecture.

## New Route Skeletons

The new skeleton routes are:

1. `/signal-scanner`
2. `/recovery-expert`
3. `/platforms`
4. `/platforms/mt4`
5. `/platforms/mt5`
6. `/platforms/tradingview`
7. `/platforms/ninjatrader`

Each route uses the existing `(site)` route group, route metadata helper, route-level WebPage JSON-LD helper, and `PagePlaceholder` component.

## Route Roles

The route foundation separates products from platform guides. Product pages describe the product role. Platform pages will later consolidate platform-specific behavior across products. Recovery Expert remains a top-level product route at `/recovery-expert`, Signal Scanner remains `/signal-scanner`, and no product-specific platform subroutes are introduced.

## SEO Responsibilities

Route metadata lives in `routeSeoMetadata`. Each public route has a title, description, and canonical path. Titles are entered without manually adding the brand suffix because the root metadata template resolves final browser titles such as `MT4 Trading Tools | Emerald Legacy Systems`.

Descriptions are factual, evergreen, route-specific, and do not include current performance figures, pricing, unsupported platform claims, guarantees, or private account details.

## JSON-LD Boundaries

New product and platform placeholders use generic route-level `WebPage` JSON-LD only.

Do not add the following schema types until future visible content and canonical data support them:

- `Product`
- `FinancialProduct`
- `SoftwareApplication`
- `Offer`
- `Review`
- `AggregateRating`

## Sitemap Behavior

The sitemap is registry-driven through `getSitemapRoutes()`. New public routes are included once through `publicRouteRegistry`. No manual duplicate sitemap entries are required.

## Breadcrumb Model

Top-level placeholders use:

- Home
- Current page

Platform guide placeholders use:

- Home
- Platforms
- Platform page

This breadcrumb structure is emitted in JSON-LD and does not require visible breadcrumb UI in this task.

## Future Navigation Structure

The future intended navigation is:

- Home
- Products
- Emerald Ledger
- Platforms
- Technology
- Research
- About

The future Products group may contain:

- Emerald Legacy System
- Signal Scanner
- Recovery Expert
- Emerald Quant System

Task 5.2 does not implement the navigation change, dropdowns, footer redesign, or mobile navigation changes.

## Route-to-Product Mapping

- `/indicators` -> `emerald-legacy-system`
- `/signal-scanner` -> `emerald-signal-scanner`
- `/recovery-expert` -> `emerald-recovery-expert`
- `/systems` -> `emerald-quant-system-product` ecosystem representation plus the existing specialized system/configuration architecture
- `/signals` -> signal module library
- `/platforms/*` -> platform implementation context across products

## Future Screenshot/Page-Build Sequence

Recommended future build order:

1. `/indicators`
2. `/signals`
3. `/signal-scanner`
4. `/recovery-expert`
5. `/platforms`
6. `/platforms/mt4`
7. `/platforms/mt5`
8. `/platforms/tradingview`
9. `/platforms/ninjatrader`
10. navigation restructuring
11. cross-product closeout

Screenshot acquisition should begin before the visible `/indicators` build.

## Deferred Items

Future Indicators screenshot needs may include Emerald Legacy System chart view, indicator settings, FineScalp high-resolution chart, and signal examples.

Future Scanner screenshot needs may include symbol or favorite selection, a populated scanner dashboard, filters, session view, signal-age context, and chart-opening workflow.

Future Recovery Expert screenshot needs may include control panel, initial-entry interface, and management state.

Future Platform page screenshot needs may include MT4, MT5, TradingView, and NinjaTrader implementation contexts.

The following remain deferred: final product content, product/platform matrix rendering, installation guides, screenshots, assets, downloads, auth, checkout, billing, pricing, platform detection, detailed platform claims, and navigation restructuring.
