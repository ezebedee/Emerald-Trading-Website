# Asset Management

This document is the canonical asset guide for Emerald Legacy Systems. Future tasks should use this structure instead of inventing media folders or scattering raw paths through page components.

## Public Directory Structure

```text
public/
  brand/
    logos/          Full brand lockups.
    marks/          Standalone symbols or monograms.
    favicon/        Favicon and app icon source variants.
  images/
    ledger/
      daily/        Daily Emerald Ledger thumbnails, statements, and platform screenshots.
      weekly/       Weekly Ledger thumbnails and summaries.
      cumulative/   Milestone and cumulative performance visuals.
    systems/        Trading-system UI screenshots.
    indicators/     Indicator screenshots.
    signals/        Signal dashboard screenshots.
    technology/     Technology and architecture diagrams.
    research/       Research visuals and diagrams.
    verification/   Approved public verification screenshots.
    general/        General approved site imagery.
  documents/
    ledger/         Public Ledger reports and statements.
    verification/   Public verification documents.
    research/       Public research papers or downloads.
  video/
    posters/        Lightweight video poster images only.
  social/
    og/             Open Graph images.
    thumbnails/     Social thumbnails.
  icons/            Future approved static icons not covered by brand marks or lucide icons.
```

Do not place private or confidential files anywhere under `public/`. Anything in `public/` is publicly accessible by URL.

## Brand Assets

`public/brand/logos/` is reserved for full brand lockups, such as future approved horizontal and stacked Emerald Legacy Systems logos.

`public/brand/marks/` is reserved for standalone symbols or monograms, such as a future approved ELQ mark or Emerald icon.

`public/brand/favicon/` is reserved for favicon and app icon source variants, such as future approved `favicon.ico`, `icon.svg`, or `apple-touch-icon.png`.

Do not invent placeholder logos, marks, or favicon art.

The default Open Graph image is registered under `siteAssets.socialOg` with the stable ID `social-default-og-emerald-legacy-systems`. Social metadata should resolve this asset by ID instead of hardcoding its path in route metadata.

Current approved brand assets:

```text
public/brand/marks/emerald-elq-mark-signature.png
public/brand/logos/emerald-legacy-systems-horizontal.png
```

The signature mark is approved for the compact website lockup. The horizontal banner is approved for future brand showcase, media, About, Technology, Video Archive, and social contexts. Do not shrink the full banner into the header or footer.

The detailed signature mark is the current favicon source reference only. Final tiny favicon artwork requires a later approved derivative step because the detailed raster mark may not remain legible at favicon sizes.

## Filename Standard

All web asset filenames must use:

- lowercase
- kebab-case
- ASCII characters
- descriptive words
- no spaces
- no parentheses
- no Windows duplicate suffixes such as `(1)`
- no meaningless names such as `final`, `final2`, `newfinal`, or `final-real`

Good example:

```text
emerald-legacy-horizontal-gold-green.svg
```

Bad example:

```text
Emerald Logo Final (2).PNG
```

Use `-v2`, `-v3`, and later numeric suffixes only when genuine versioning is necessary. Prefer replacing a canonical asset when backward compatibility is unnecessary.

## Date And Week Naming

Dated assets must use ISO dates: `YYYY-MM-DD`.

Daily Ledger examples:

```text
ledger-day-001-2026-08-17-thumbnail.webp
ledger-day-001-2026-08-17-statement.webp
ledger-day-001-2026-08-17-platform.webp
```

Weekly Ledger examples:

```text
ledger-week-01-2026-08-17_2026-08-21-thumbnail.webp
ledger-week-02-2026-08-24_2026-08-28-thumbnail.webp
```

Weekly assets use two-digit week numbers: `01`, `02`, `03`.

## Variant Naming

Use meaningful suffixes:

- `-thumbnail`
- `-platform`
- `-statement`
- `-equity-curve`
- `-dashboard`
- `-hero`
- `-card`
- `-og`
- `-mobile`
- `-desktop`

Do not use arbitrary suffixes such as `-small2`, `-copy`, or `-new`.

## Format Policy

Preferred formats:

- `webp`: default raster web image format.
- `avif`: optional when useful and supported through Next Image optimization.
- `png`: only where transparency or lossless fidelity is genuinely needed.
- `jpg` or `jpeg`: acceptable for supplied source photos or screenshots, though production may convert them to WebP.
- `svg`: preferred for logos, icons, and diagrams only when the source is genuinely vector.

Do not convert or optimize source files destructively. Original supplied source assets must not be overwritten.

Current optimization decisions:

- Ledger thumbnails: use high-quality WebP runtime derivatives. The current approved thumbnails are graphic preview media, and WebP provides large savings while keeping text readable at normal display sizes.
- Indicator screenshots: use high-quality WebP runtime derivatives when chart labels and product details remain crisp.
- Verification screenshots: use high-quality WebP runtime derivatives when account labels and disclosure text remain readable.
- Brand mark: keep PNG unless a later favicon/icon task creates approved derivatives; the current detailed mark needs crisp source fidelity.
- Horizontal brand banner: keep PNG as the approved high-fidelity brand media source until a page-specific display derivative is needed.
- Trade-history, terminal, or dense account-history evidence: prefer PNG or very high-quality WebP only after full-size visual review. Do not optimize so aggressively that table rows, columns, or account context become unclear.

## Source And Optimized Assets

Keep a clear distinction between source/master assets and web-optimized runtime assets.

Large original media may live outside the repository or in a future approved source-asset workflow. Do not add large source media to this repository unless a task explicitly requires it.

Never overwrite master/source files during optimization. Export optimized variants into the approved public structure with canonical names.

## Public And Private Rules

Never store the following in `public/`:

- private real-account statements
- private account screenshots containing confidential credentials
- broker passwords
- investor passwords unless intentionally disclosed as public verification credentials
- API credentials
- private-client reports
- proprietary source code
- internal strategy documentation
- restricted performance data

Private-access content must later use authenticated server-side storage, not public static files.

Deleting a confidential file from a later commit does not reliably remove it from Git history. Sensitive files must never be committed in the first place.

## Trading Screenshot Privacy Checklist

Before placing any trading screenshot in `public/`, confirm it does not unintentionally expose:

- trading passwords
- private investor passwords
- private account credentials
- private server credentials
- personal client information
- machine paths or usernames
- unrelated browser tabs
- email addresses not meant for publication
- private notifications

Public-demo verification details may be intentionally disclosed only through approved verification pages.

## Performance Media Accuracy

Media files containing performance numbers must be associated with a specific Ledger record.

Daily media must map to a Daily Ledger entry. Weekly media must map to a Weekly Ledger entry. Cumulative media must map to an explicit cumulative date range.

Do not reuse an old thumbnail with current metrics.

Current approved Ledger thumbnails are registered in `src/data/assets.ts` under `ledgerAssets`. They are preview media only; future Ledger pages must still use structured Ledger records as the authoritative source of performance data.

## Public Demo Terminology

Do not label public demo record media as:

- Real Account
- Live Account
- Real Money Account

Use those terms only if the underlying record supports the claim and the content is intentionally part of private authenticated content.

Preferred public labels:

- Public Demo Reference Account
- Public Performance Record
- Forward Performance Record

## Video And YouTube Policy

Do not store large Emerald Ledger videos directly in this repository. Primary Ledger videos are expected to be hosted on YouTube and embedded or linked later.

`public/video/posters/` is for lightweight poster images and, only if approved later, short decorative loops.

Do not commit raw OBS captures, huge video masters, or multi-hundred-MB recordings. Consider external media storage for large binaries. Do not configure Git LFS unless a later task explicitly requires it.

YouTube thumbnails may be referenced from YouTube when reliable. Local curated thumbnails may be stored when brand consistency requires an approved local copy.

## Alt Text

Every meaningful image asset entry must eventually include intentional alt text. Do not generate alt text from filenames.

Guidelines:

- Brand logo alt text is usually `Emerald Legacy Systems`.
- Decorative visuals may use empty alt text: `""`.
- Trading screenshots should describe the information shown, not every number.

Example:

```text
MT4 account-history screen showing XAUUSD algorithmic trades.
```

## Aspect Ratios

Common intended media categories:

- YouTube thumbnails: `16:9`.
- Ledger video posters: `16:9`.
- System screenshots: preserve native software ratio.
- Dashboard cards: may crop through CSS, but source files should remain uncropped.
- Logos: preserve intrinsic ratio.

Do not force screenshots to arbitrary ratios at the source level.

## Image Component Policy

Production page components should generally use `next/image` for raster images when appropriate. Exceptions include CSS backgrounds, SVG markup, and tiny decorative icons.

Do not replace lucide icons with bitmap images.

Future manifest entries should include `width` and `height` when known to reduce layout shift. Do not invent dimensions for assets that do not yet exist.

Use `next/image` with:

- `width` and `height`, or `fill` with a stable parent aspect ratio.
- meaningful `alt` text from the manifest, or empty alt only for decorative imagery inside already labeled UI.
- `sizes` whenever an image responds to viewport or layout width.
- `priority` only for likely LCP imagery, such as an above-the-fold hero image or a primary brand mark when measurement proves it helps.

Do not use `priority` on footer images, galleries, below-fold Ledger thumbnails, or every card image. Let Next.js lazy-load below-fold images by default; do not add custom image IntersectionObserver loading unless a later measured performance task requires it.

Responsive `sizes` guidance:

- Header mark: use an exact small size that matches the rendered slot.
- Footer mark: use an exact small size that matches the rendered slot.
- Full-width content media: use a layout-aware rule such as `(min-width: 1440px) 1200px, (min-width: 768px) 90vw, 100vw`.
- Two-column media: use a layout-aware rule such as `(min-width: 1024px) 50vw, 100vw`.
- Dense evidence screenshots: prefer enough rendered width for legibility; do not render a giant source into a tiny slot when a smaller approved derivative would be clearer and faster.

Object-fit guidance:

- Brand marks: use `object-contain` unless an approved crop exists.
- Ledger thumbnails: `object-cover` is acceptable in preview cards when the card links to a full view.
- Evidence screenshots and trade-history tables: prefer `object-contain`; do not crop away columns, account context, disclosure text, or P/L information.
- Indicator screenshots: preserve the native ratio unless a later component intentionally frames a preview crop.

## Provenance

Every externally sourced asset must have known provenance and usage rights before it is committed.

For Emerald-produced media, record the source as:

```text
Emerald Legacy Systems
```

For third-party media, document the license and source. Do not download internet imagery without a specific approved task.

## Manifest Use

Use `src/data/assets.ts` for canonical asset references and `src/types/assets.ts` for shared types. Page components should consume typed manifest entries rather than scattering raw image and document paths.

The manifest currently contains approved brand assets, optimized Ledger thumbnails, optimized indicator media, and optimized verification media, with other groups left empty until assets are supplied and approved. It must not reference nonexistent runtime files.

Future CMS or database media records may replace or feed the manifest. Do not couple future page components permanently to local-only assumptions.
