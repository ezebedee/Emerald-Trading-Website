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
