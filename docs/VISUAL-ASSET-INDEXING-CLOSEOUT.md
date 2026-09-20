# Visual, Asset And Indexing Closeout

Task 5.14 is a local-only cleanup based on approved Task 5.13. It adds no business workflows, platform claims or performance data.

## Indexing Policy

The current source contains two PagePlaceholder routes, not the historical 18:

| Route           | Classification                            | Policy                                                                  |
| --------------- | ----------------------------------------- | ----------------------------------------------------------------------- |
| /videos         | A: future public page                     | noindex, follow; excluded from sitemap until substantive content exists |
| /private-access | B: internal/deferred, unused public route | noindex, follow; reserved placeholder, no request workflow              |

Both have restrained metadata identifying their unfinished state. Routes remain available; robots.txt permits crawling so search engines can read noindex. The 24 substantive public routes retain indexing and sitemap inclusion, including company, research and legal pages. /design-system remains internal, noindex/nofollow and excluded. No external portal URL is added to the sitemap. The SEO audit discovers placeholders and verifies their metadata and registry flags, as well as the opposite policy for completed pages.

## Assets

The approved signature mark and horizontal logo use lossless WebP at unchanged dimensions and decoded pixels. Original sources remain in assets-import and approved Git history. Responsive Next/Image delivery remains in place. No public asset is exempt from the 2MB performance budget.

The root src/app/favicon.ico uses Next's file convention, with 16/32/48px PNG images derived from the approved signature mark. Its single registry entry resolves to the app file, not a duplicate public copy.

Recovery Expert uses a neutral architecture raster, not a simulated trading screenshot. It contains only the approved mark and existing workflow roles; the old illustrative price/recovery chart is removed from public assets and registration. No final real Recovery screenshot was available in assets-import. The architecture image is uncropped and includes a conceptual label; caption and alt text state its limits. No new account data or financial result is depicted.

## Visual Rules

Existing radius utilities now have an intentional hierarchy: 4px small, 6px controls, 8px cards/panels, 12px hero visualization. Circular status dots and badges remain circular. No component APIs or layout architecture change.

The approved text-emerald link treatment remains unchanged. Major routes retain their existing section spacing; before/after inspection found no clear spacing regression warranting a global reduction. No production content, button/status palette or typography is rewritten.

## Evidence

Local before/after screenshots, asset sizes, build/validation logs and browser measurements are stored outside the repository under C:/Users/Ezebedee/Documents/Emerald-Releases/task-5.14-review/. These checks are not WCAG certification or field Core Web Vitals measurements. No merge or deployment is part of this task.
