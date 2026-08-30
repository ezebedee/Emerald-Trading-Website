# Reliability & Recovery

Task 0.7B establishes application-level recovery handling for the current Next.js App Router site.

## Error Boundaries

Public site routes are protected by:

```text
src/app/(site)/error.tsx
```

This route-group boundary handles runtime errors inside the public site shell. It is a Client Component because Next.js error boundaries require client-side reset behavior.

Application-level failures outside the route group are protected by:

```text
src/app/global-error.tsx
```

The global boundary includes its own `<html>` and `<body>` elements because it replaces the root layout when active. It uses minimal global styling and does not import business data.

## Not Found Handling

Unknown routes render:

```text
src/app/not-found.tsx
```

The not-found page is a server component, returns a natural 404 response through Next.js, and uses noindex/nofollow metadata. It provides user-controlled navigation to:

- Home
- Emerald Ledger

404 routes are not added to the SEO route registry or sitemap.

## Recovery Behavior

Route-level and global error states provide:

- Try Again
- Return Home

The Try Again action calls the Next.js `reset()` function directly. There is no automatic retry, redirect loop, or full-page reload.

## User-Safe Messaging

Error pages use calm public messaging:

- site boundary: "We couldn't load this page"
- global boundary: "Something went wrong"
- not found: "Page not found"

Raw error details must not be rendered in the DOM. Do not show error messages, stacks, digests, file paths, query strings, or implementation details to users.

## Logging Policy

Development builds may log the raw `Error` object locally with `console.error(error)` to support debugging.

Production should not indiscriminately log full client error objects to the browser console. External monitoring, operational logging, health checks, and alerting belong to later reliability tasks.

## Analytics Compatibility

The error boundaries use the existing privacy-safe analytics contract for reliability-compatible events.

Current safe properties are limited to:

- `boundary`
- `routeGroup`
- `action`

No raw error payloads are sent. Do not transmit error messages, stacks, digests, URL query strings, user-entered content, credentials, or account authentication data.

Analytics remains no-op by default unless a future approved provider is configured and explicitly enabled.

## Operational Diagnostics

Task 0.7C adds a lightweight health endpoint:

```text
GET /api/health
```

The endpoint returns JSON only, responds with HTTP 200 when the app is running, and sets `Cache-Control: no-store`. It is marked dynamic so health responses are not treated as static page content.

Current health semantics are liveness-oriented: the endpoint answers whether the application route can execute. It does not check database, storage, broker, video, analytics, or third-party service readiness because those dependencies do not exist yet.

Future readiness checks may include database, storage, queue, or external-service dependencies after those systems are introduced. Do not represent the current health endpoint as full production readiness.

The public health response is intentionally minimal:

```json
{
  "status": "ok",
  "service": "emerald-legacy-systems",
  "version": "0.1.0",
  "environment": "production"
}
```

Do not add hostnames, IP addresses, filesystem paths, environment-variable dumps, secrets, private account data, request bodies, query parameters, commit messages, or branch names to the health response.

The health endpoint is not a security boundary. It should remain safe to expose publicly because it contains only public-safe liveness metadata.

## Deployment Metadata

Deployment metadata helpers live in:

```text
src/lib/reliability/deployment.ts
```

The helper centralizes:

- service name from `package.json`
- app version from `package.json`
- normalized environment from `NODE_ENV`
- optional short commit SHA for internal use

Only `development`, `production`, `test`, and `unknown` are exposed as normalized environment values. Do not dump arbitrary deployment environment names or full environment variables.

## Structured Logger

The structured logger lives in:

```text
src/lib/reliability/logger.ts
```

It provides:

- `logger.info(event, context?, message?)`
- `logger.warn(event, context?, message?)`
- `logger.error(event, context?, error?, message?)`
- `setLoggerTransport(transport?)`
- `logConfigurationWarning(event, context?, message?)`

Log entries use plain structured objects with:

- `level`
- `event`
- `message`
- `context`
- `timestamp`

Log levels are limited to `info`, `warn`, and `error`. Event names are normalized to lowercase snake_case. Timestamps are ISO 8601 strings.

Logger context values are restricted to JSON-safe primitives and small primitive arrays. Do not pass nested request bodies, arbitrary objects, user-entered content, account details, or full URLs with query strings.

Sensitive context keys are blocked in every environment. Development warns and drops the unsafe log entry. Production silently drops the unsafe log entry.

Blocked context keys include:

- `password`
- `passwd`
- `secret`
- `token`
- `apiKey`
- `api_key`
- `email`
- `phone`
- `message`
- `investorPassword`
- `tradingPassword`

The blocklist applies to context keys. A top-level logger `message` field is allowed for safe operator-facing summaries.

`logger.error()` may receive an `Error` object for local development debugging, but structured logs must not serialize raw Error objects or emit error messages, stacks, digests, file paths, credentials, or query strings.

The current backend writes to console only. Future monitoring transports can replace the transport through `setLoggerTransport()` after a provider is approved.

## Current Exclusions

Tasks 0.7B and 0.7C do not add:

- Sentry
- Datadog
- New Relic
- Rollbar
- Bugsnag
- email alerts
- external monitoring transports
- database readiness checks
- external service checks
- permanent crash-test routes
- new dependencies
- normal page redesigns
