# Development Baseline

Use Node 24 (`.nvmrc`; supported range >=24.0.0 <25) and pnpm 11.19.0
(`packageManager` and `engines`). pnpm is the canonical package manager.
The unchanged lockfile resolves Next.js 16.3.3, React 19.2.8, TypeScript 5.9.3,
and Tailwind CSS 4.3.3. No application dependencies were upgraded.

```sh
pnpm install --frozen-lockfile
pnpm dev
pnpm format:check
pnpm lint
pnpm typecheck
pnpm foundation:audit
pnpm build
pnpm start
```

`pnpm format` applies the existing Prettier configuration. `.gitattributes`
preserves LF source/document line endings across Windows and Linux checkouts.
The 76-file pre-task formatting report included 75 line-ending-only source/doc
files and the generated Next.js declaration file; no product copy or code logic
needed formatting changes relative to the normalized Git baseline.

## Generated Files

`next-env.d.ts` is generated, ignored, and no longer tracked. Next.js 16.3.3's
bundled CLI guide recommends this policy. The framework writer switches route
type imports between `.next/dev/types` during development and `.next/types`
during production generation. The pre-existing local modification was this
expected generated drift, not an application source change.

`pnpm typecheck` runs `next typegen` before TypeScript, so a fresh checkout does
not require a development-server run to create declarations. Do not commit
`.next`, `node_modules`, coverage, or generated declarations.

## CI

`.github/workflows/ci.yml` runs on PRs targeting main and pushes to main. It uses
the pinned runtime and package manager, frozen install, format check, lint,
typecheck, all foundation audits, and production build. It does not deploy or
require production credentials.

`foundation:audit` aggregates eight checks: `data:audit`, `assets:audit`,
`seo:audit`, `analytics:audit`, `reliability:audit`, `accessibility:audit`, and
`performance:audit`, and `portal:audit`. These source/registry audits supplement,
not replace, browser QA. Including the aggregate, there are nine audit commands.
