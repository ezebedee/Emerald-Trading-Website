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

## Provenance

Every externally sourced asset must have known provenance and usage rights before it is committed.

For Emerald-produced media, record the source as:

```text
Emerald Legacy Systems
```

For third-party media, document the license and source. Do not download internet imagery without a specific approved task.

## Manifest Use

Use `src/data/assets.ts` for canonical asset references and `src/types/assets.ts` for shared types. Page components should consume typed manifest entries rather than scattering raw image and document paths.

The manifest currently contains empty groups because no approved production media has been supplied. It must not reference nonexistent runtime files.

Future CMS or database media records may replace or feed the manifest. Do not couple future page components permanently to local-only assumptions.
