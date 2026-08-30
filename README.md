# Emerald Legacy Systems Website

Emerald Legacy Systems is a professional website for a quantitative trading technology platform at `emeraldforexsystem.com`.

This repository is being developed incrementally through controlled implementation tasks. Task 0.1 establishes the technical foundation only: application setup, route placeholders, configuration, folder structure, and project standards. Production design, navigation, dashboards, authentication, data integrations, charts, and content systems will be introduced in later tasks.

## Technical Stack

- Next.js App Router
- React
- TypeScript
- Tailwind CSS
- pnpm
- ESLint
- Prettier

Foundational runtime dependencies are intentionally small: `lucide-react`, `clsx`, `tailwind-merge`, and `zod`.

## Installation

```bash
pnpm install
```

## Development

```bash
pnpm dev
```

## Production Build

```bash
pnpm build
```

## Lint

```bash
pnpm lint
```

## Type Checking

```bash
pnpm typecheck
```

## Formatting

```bash
pnpm format
pnpm format:check
```

## Directory Structure

```text
src/
  app/                  App Router routes and root layout
  components/
    dev/                Temporary development-only placeholders
    ui/                 Future shared UI primitives
    layout/             Future layout components
    ledger/             Future Ledger components
    systems/            Future system components
    charts/             Future chart components
    forms/              Future form components
    media/              Future media components
  data/                 Future typed data access modules
  lib/                  Shared utilities
  styles/               Future style modules beyond globals
  types/                Shared TypeScript types

public/
  brand/                Future official brand assets
  images/               Future approved imagery
  video/                Future video assets
  icons/                Future icon assets
  documents/            Future public documents
```

## Asset Management

Asset architecture, naming rules, public/private media policy, provenance requirements, and the working inventory live in [docs/ASSETS.md](docs/ASSETS.md) and [docs/ASSET-INVENTORY.md](docs/ASSET-INVENTORY.md).

## Data Architecture

Shared domain types, Zod schemas, performance metric conventions, visibility rules, and public/private data boundaries live in [docs/DATA-ARCHITECTURE.md](docs/DATA-ARCHITECTURE.md).

Phase 0.5 seed-data integrity, cross-domain QA findings, selector checks, and deferred data items live in [docs/DATA-INTEGRITY.md](docs/DATA-INTEGRITY.md).

SEO metadata architecture, canonical URL policy, indexing rules, and claim-language guidance live in [docs/SEO.md](docs/SEO.md).

## Intended Website Areas

- Home
- Emerald Ledger
- Systems
- Indicators
- Signals
- Performance Comparison
- Technology
- Research
- Live vs Backtest
- Verification
- Videos
- Private Access
- Professional / Investor

## Routing Strategy

Current routes are minimal placeholders so later tasks can replace each page without changing the app structure.

Future dynamic content will likely use App Router segments such as:

- `/ledger/[slug]`
- `/systems/[slug]`
- `/research/[slug]`

Those dynamic routes should be added when authoritative content models exist. They should not depend on mock records simply to compile.

## Architectural Principles

A. Public performance and private performance must remain separate.

B. The public Emerald Ledger will represent publicly disclosed performance records.

C. Real-account/private performance must never accidentally become accessible through public routes.

D. Period performance and cumulative performance are different concepts. Future data models must keep them separate.

E. Performance data should eventually have one authoritative source instead of being hard-coded independently across multiple pages.

F. Future Ledger records should support daily and weekly entries.

G. YouTube-hosted Emerald videos will later be embedded or linked through the Video Archive and Ledger.

## Security Foundation

Do not commit broker credentials, investor passwords, trading passwords, API secrets, private account numbers, database passwords, authentication secrets, or any other sensitive values.

Secrets must use environment variables or appropriate secure server-side storage. Only genuinely public configuration should use `NEXT_PUBLIC_*`.

Private-account data must eventually be loaded only through authenticated server-side paths. It must never be shipped inside public JavaScript bundles, static JSON files under `/public`, or publicly accessible APIs.

## Current Scope

Task 0.1 does not implement authentication, databases, payments, analytics, CMS integrations, Ledger records, trading charts, signal feeds, video embedding, dashboards, final navigation, final footer, final brand colors, final fonts, or deployment.
