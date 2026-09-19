# Platform Guidance

Task 5.12 replaces only the five `/platforms` placeholders. Static server-rendered pages use the existing design system and route SEO/JSON-LD architecture.

## Source and Boundaries

`getPlatformGuidanceMatrix()` maps published public products and platform definitions through `getProductPlatformImplementation()`. Availability, access model, documentation status and implementation notes come from canonical records, not a second availability fixture. Missing implementations display Not Documented. The current model lists four products on four platforms; detailed implementation documentation remains planned. The guidance pages do not change that canonical status.

Editorial setup/access guidance lives in `src/data/content/platform-guidance.ts`. It is high level, based on the approved task brief, not a release-specific installation manual. Managed/invite-based TradingView access is conditional where applicable and is not EA-style execution. Recovery and Quant notes retain their product-specific meaning; neither acquires a FineScalp claim. Quant evidence remains Metals / XAUUSD / MT4, not a family-wide or cross-platform result.

Public subscription versus private investor access remains separate from platform delivery. The portal link reuses the existing public login constant. No installer, credentials, validation mechanics, licensing code or portal business logic is added. No affiliation with MetaTrader, TradingView or NinjaTrader is claimed; platform names identify compatibility contexts only.

## Verification

`pnpm platforms:audit` runs actual selector-to-source checks for all matrix cells and narrow source checks for routes, scope, access, table semantics and public boundaries. It is included in the foundation suite. Browser QA must separately verify responsive overflow, keyboard operation, links and rendered copy. The mobile matrix uses a labeled, keyboard-focusable horizontal scroll region; page-level overflow is not intended.

Task 5.12 evidence is kept outside the repository as requested. No new screenshots or evidence logs are tracked here. No new product imagery is introduced: the source does not establish equivalent platform screenshots, and the existing site identity remains intact.
