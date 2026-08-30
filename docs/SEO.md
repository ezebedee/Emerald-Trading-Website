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

## Social Image Deferment

No default Open Graph or Twitter image is configured in Task 0.6A because no final social OG image has been approved.

Do not reference a broken or placeholder social image path. A later asset task should add approved social images before metadata points to them.

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
