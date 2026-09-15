# Performance Baseline

Task 0.7E establishes practical performance guardrails for the foundation. It does not claim Lighthouse scores, Core Web Vitals results, or production readiness for every future page.

## Strategy

The site remains server-first by default. Client Components should be limited to behavior that needs browser APIs, such as:

- mobile navigation state
- header scroll state
- error-boundary reset behavior

Do not convert pages or shared components to client components without a specific interaction requirement.

## Scripts And Providers

No third-party analytics, advertising, chat, session replay, heatmap, or monitoring scripts are active.

Do not add Google Analytics, Meta Pixel, Hotjar, Clarity, Sentry, Datadog, New Relic, Rollbar, Bugsnag, or similar providers without a dedicated approved task.

## Images

Use Next/Image for application images where practical. Meaningful images must keep known dimensions to reduce layout shift.

Public media should use optimized formats such as WebP where established. Task 5.14 converted the two oversized brand PNGs to lossless WebP at their original dimensions, preserving decoded pixels. The 2MB per-file budget now applies without brand exemptions. Next/Image continues serving responsive compact header/footer mark derivatives.

## Fonts

Inter is loaded through `next/font`, which avoids runtime third-party font requests. The font uses `display: swap`.

Do not add duplicate font-loading systems unless the design system is formally revised.

## Layout Stability

Header geometry should remain stable between normal and scrolled states. Images should include dimensions. Avoid injecting late client-rendered content that shifts foundational layout.

## Static Payloads

Do not push large data archives into client components unnecessarily. Current route placeholders and data selectors should remain server-oriented until real interactive views are built.

## Health And Diagnostics

`/api/health` is dynamic, returns minimal JSON, and uses `Cache-Control: no-store`.

The health route does not check external services, call APIs, or expose secrets.

## Budget Philosophy

Foundation performance work should prevent obvious regressions:

- no unnecessary dependencies
- no unexpected client conversion
- no third-party tracking scripts
- no raw unoptimized image elements in application code
- no unexpected large public media
- no fabricated performance scores

Future production pages should be measured with Lighthouse, browser profiling, and Core Web Vitals checks after real content and interactions exist.

## Current Deferred Items

The following are known and intentionally deferred:

- Week 02 Ledger thumbnail missing
- genuine Day 001 trade-history image missing
- real external YouTube IDs/URLs pending
- third-party verification evidence pending
- incomplete research publication metadata
- raster claim-language corrections still required where flagged
