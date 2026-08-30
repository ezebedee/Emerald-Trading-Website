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

## Current Exclusions

Task 0.7B does not add:

- Sentry
- Datadog
- New Relic
- Rollbar
- Bugsnag
- email alerts
- server logging infrastructure
- health endpoints
- permanent crash-test routes
- new dependencies
- normal page redesigns
