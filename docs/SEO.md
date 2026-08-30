# SEO Metadata Architecture

Task 0.6A establishes the reusable metadata foundation for Emerald Legacy Systems using the Next.js App Router metadata system.

## Canonical Domain

The canonical production domain is:

```text
https://emeraldforexsystem.com
```

The metadata helper derives this from `src/data/site.ts` and exposes it as `siteUrl` and `siteMetadataBase`.

Do not use `localhost` in production metadata.

## Title Template

The root title policy is:

```text
Homepage default: Emerald Legacy Systems | Quantitative Trading Technology
Template: %s | Emerald Legacy Systems
```

Route titles should stay concise. Avoid long SEO-stuffed titles.

## Description Policy

The default description comes from `siteBrand.metadataDescription`:

```text
Quantitative trading systems, algorithmic strategies, market signals, automation, and documented performance.
```

Metadata copy must remain evergreen and should not embed dynamic performance numbers.

## Canonical URL Policy

Canonical URLs are generated with `createCanonicalUrl()`.

Rules:

- use HTTPS
- use `emeraldforexsystem.com`
- include no trailing slash except root
- exclude query parameters
- exclude hash fragments
- avoid hardcoded route-by-route canonical URLs

Examples:

```text
/ -> https://emeraldforexsystem.com/
/ledger -> https://emeraldforexsystem.com/ledger
```

## Metadata Helper

Use `createPageMetadata()` from `src/lib/seo` for route-level metadata.

The helper supplies:

- title
- description
- canonical alternates
- Open Graph URL
- Open Graph site name
- Open Graph type
- Open Graph locale
- Twitter card
- Twitter title
- Twitter description
- metadata-level robots directives

Each public route should eventually export metadata using this helper unless it needs a carefully reviewed custom override.

## Route Registry

The canonical sitemap/indexing inventory lives in `src/lib/seo/routes.ts`.

The registry stores only route-indexing fields used now:

- `path`
- `indexable`
- `includeInSitemap`
- `changeFrequency`
- `priority`

Titles and descriptions remain owned by metadata exports, not the route registry.

Registered paths must:

- start with `/`
- use lowercase
- exclude query parameters
- exclude hash fragments
- use no trailing slash except root
- be unique across public and internal route lists

Current public routes in `src/app/(site)` are included in `publicRouteRegistry`. The internal `/design-system` route is tracked separately in `internalRoutes` and is excluded from sitemap generation.

## Indexing Policy

Public routes default to:

```text
index: true
follow: true
```

Private authenticated content must use:

```text
noIndex: true
noFollow: true
```

The public `/private-access` marketing or access-request route is conceptually different from authenticated private performance content and may remain indexable while it contains public information.

Legal routes such as `/privacy`, `/terms`, and `/risk-disclosure` remain indexable unless product strategy changes.

The internal `/design-system` route is explicitly `noIndex` and `noFollow`.

## Sitemap Policy

`src/app/sitemap.ts` uses `MetadataRoute.Sitemap` and derives entries from `getSitemapRoutes()`.

Sitemap URLs are generated with `createCanonicalUrl()` so they use the production HTTPS domain and the shared canonical trailing-slash policy.

No `lastModified` values are emitted in Task 0.6B because authoritative content-specific modification dates are not yet modeled. Conservative `changeFrequency` and `priority` values may be used as crawl hints, but they are not business data.

Future dynamic public routes such as `/ledger/[slug]`, `/systems/[slug]`, `/research/[slug]`, and `/videos/[slug]` should add sitemap entries from canonical validated data only after those routes exist.

## Robots Policy

`src/app/robots.ts` uses `MetadataRoute.Robots`.

Robots policy:

- allow crawling of the public site
- expose the canonical sitemap URL
- disallow `/design-system` as an internal implementation route

Do not add broad disallow rules that accidentally block public site sections.

## Sitemap, Robots, And Security

Sitemap inclusion controls discovery intent. Route metadata controls indexing intent. Robots controls crawler access requests.

None of these mechanisms replace authentication, authorization, server-side access control, or private-data separation.

Future authenticated routes such as private account, private dashboard, or private performance areas must be excluded from the sitemap and must use `noIndex`/`noFollow`. Sensitive content must still be protected by real access control rather than relying on robots or sitemap omission.

## Open Graph Defaults

Open Graph defaults use:

- `siteName: "Emerald Legacy Systems"`
- `type: "website"`
- `locale: "en_US"`

Do not add unsupported social handles or final social image references.

## Twitter Defaults

Twitter defaults use:

```text
card: summary_large_image
```

Do not invent `site` or `creator` handles.

## Default Social Image

The default Open Graph and Twitter image is:

```text
Asset ID: social-default-og-emerald-legacy-systems
File: /social/og/emerald-legacy-systems-default-og.png
Dimensions: 1200x630
Format: PNG
```

`createPageMetadata()` resolves this registered asset by default, so representative routes such as `/ledger` and `/systems` inherit the same social image without duplicating image configuration.

Route-specific social images may be added later by passing `ogImageAssetId` to `createPageMetadata()`. If a page-specific asset ID is missing, the helper falls back to the default social image rather than emitting broken image metadata.

Do not reference broken or placeholder social image paths. Social images should be registered in `src/data/assets.ts` before metadata points to them.

No dynamic Open Graph image generation is configured yet. Do not add `opengraph-image.tsx`, `ImageResponse`, or edge-runtime image generation until that work is explicitly approved.

No Twitter `site` or `creator` handles are configured because no official handles have been supplied.

## Claim-Language Safety

SEO metadata must avoid unsupported claims such as:

- guaranteed returns
- risk-free
- proven profits
- institutional returns
- audited returns
- live real-account results
- real-money verified performance

Preferred language:

- quantitative trading technology
- documented performance
- public forward-performance record
- public demo reference account
- market signals
- trading automation

## Structured Data Policy

Structured data helpers live in `src/lib/seo/structured-data.ts` and use plain TypeScript objects without external schema.org dependencies.

Global root structured data is limited to:

- `Organization`
- `WebSite`

The Organization object uses the plain schema.org `Organization` type for Emerald Legacy Systems, with the canonical site name, URL, metadata description, support email, stable `@id`, and logo URL resolved from the approved brand asset manifest. It must not use regulated finance schema types unless a later task supplies support for that classification.

The WebSite object uses a stable `@id`, canonical root URL, canonical description, and publisher reference to the Organization object. It does not include `SearchAction` because there is no site search yet.

Reusable helpers also exist for:

- `WebPage`
- `BreadcrumbList`
- `Article`
- `VideoObject`

WebPage and breadcrumb helpers are for future route-level rollout. Breadcrumbs must use existing route paths and canonical URLs.

Article helper usage is reserved for public, published research detail pages when authoritative metadata exists. Do not invent authors, dates, journal names, DOI values, or publisher URLs.

VideoObject helper usage is reserved for videos with real external metadata. Current video records do not have supplied YouTube IDs or external URLs, so VideoObject JSON-LD is not emitted from them automatically.

Structured data must not include performance metrics such as profit, return percentage, win rate, drawdown, or trade count. It must not fabricate reviews, ratings, offers, pricing, awards, financial-product classifications, investment-adviser status, broker/dealer status, audited returns, independent verification, or real-money performance.

Global structured data describes the site and organization. Page-specific structured data should be added only where visible route content and canonical data support it.

## Route-Level Metadata Rollout

Task 0.6E centralizes current route titles, descriptions, and canonical paths in `routeSeoMetadata` within `src/lib/seo/metadata.ts`.

All current public registered routes except `/` export route-level metadata through `createPageMetadata()`. The homepage intentionally inherits the root metadata because the root title template, canonical URL, description, Open Graph image, and Twitter defaults already describe the site entry point.

Route metadata coverage currently includes:

- `/ledger`
- `/systems`
- `/indicators`
- `/signals`
- `/performance`
- `/performance/compare`
- `/performance/live-vs-backtest`
- `/technology`
- `/research`
- `/verification`
- `/videos`
- `/private-access`
- `/professional`
- `/about`
- `/privacy`
- `/terms`
- `/risk-disclosure`

Canonical URLs must always come from `createCanonicalUrl()` through `createPageMetadata()` or a structured-data helper. Route paths stay lowercase, query-free, hash-free, and without trailing slashes except `/`.

Route titles must provide the page label only. Do not manually add the brand suffix to route title inputs; the root title template resolves titles such as `Emerald Ledger | Emerald Legacy Systems`.

Descriptions should be route-specific, evergreen, and free of changing performance figures. Do not put current return, profit, drawdown, win-rate, trade-count, or account-balance numbers in metadata or JSON-LD.

Open Graph and Twitter metadata are inherited through `createPageMetadata()`. Current routes use the approved default social image unless a later task registers and approves a route-specific image.

## Page JSON-LD Usage

Current page-level JSON-LD is limited to generic `WebPage` objects on informational and public marketing routes:

- `/ledger`
- `/systems`
- `/indicators`
- `/signals`
- `/performance`
- `/performance/compare`
- `/performance/live-vs-backtest`
- `/technology`
- `/research`
- `/verification`
- `/videos`
- `/private-access`
- `/professional`
- `/about`

`/ledger` structured data describes only the public forward-performance record and public demo reference account context. It does not include profit, return, drawdown, win rate, or trade counts.

Performance routes use generic `WebPage` JSON-LD only. Do not add finance-specific schema types, product schema, offer schema, review schema, rating schema, Article markup for generic research pages, or VideoObject markup without real external video metadata.

Breadcrumb JSON-LD is emitted where it clarifies route hierarchy. Top-level pages use `Home > Page`. Nested performance routes use `Home > Performance > Page`. These structured-data breadcrumbs do not imply visible breadcrumb UI.

Legal routes currently use metadata only. Add page-level structured data to legal routes only if a later task supplies complete legal-page content and a clear need.

The public `/private-access` route remains indexable as a marketing/access-request page. Future authenticated or private content must be noindex/nofollow, excluded from the sitemap, and protected by authentication.

## Phase 0.6 Closeout

Phase 0.6 is complete at the foundation level:

- metadata architecture is centralized
- sitemap and robots output are generated
- the default social image is registered and inherited
- structured data is conservative and schema.org-compatible
- current public routes have route-level SEO coverage
- `/design-system` remains internal, noindex/nofollow, and excluded from the sitemap
- future dynamic detail pages can extend the existing metadata and JSON-LD helpers without creating a second SEO system

## Out Of Scope For 0.6A

Task 0.6A does not create:

- sitemap routes or `sitemap.xml`
- robots routes or `robots.txt`
- JSON-LD structured data
- analytics
- web app manifest
- Apple touch icons
- favicon derivatives
- Open Graph image generation
