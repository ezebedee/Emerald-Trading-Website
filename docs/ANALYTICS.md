# Analytics Architecture

Task 0.7A establishes a privacy-safe analytics foundation for Emerald Legacy Systems. No third-party analytics provider is active yet, and no external analytics data is sent by default.

## Architecture

Application code should use the internal analytics API in `src/lib/analytics`:

- `trackAnalyticsEvent(event)`
- `trackPageView(pageView)`
- `setAnalyticsProvider(provider)`
- `normalizeAnalyticsPath(path)`
- `normalizeOutboundDestinationDomain(url)`

Future provider integrations should sit behind the `AnalyticsProvider` interface. Page components and UI components must not call vendor-specific globals directly.

The likely future provider structure is:

```text
src/lib/analytics/providers/
```

Do not add empty provider folders until a real provider has been approved.

## Provider-Agnostic Design

The core provider interface supports:

- event tracking through `trackEvent(event)`
- optional page-view tracking through `trackPageView(pageView)`

The default behavior is safe:

- production: no-op until analytics is explicitly enabled and a provider is configured
- development: no-op by default, with optional console debug only when enabled

Analytics calls must never crash if no provider exists.

## Enablement

The optional public environment flag is:

```text
NEXT_PUBLIC_ANALYTICS_ENABLED=true
```

Only the exact string `true` enables dispatch to a configured provider. Missing values, empty values, and `false` are treated as disabled.

Development debug logging may be enabled with:

```text
NEXT_PUBLIC_ANALYTICS_DEBUG=true
```

Debug logging should not be enabled by default.

## Event Naming

Canonical event names use lowercase snake_case.

Current event names:

- `page_view`
- `cta_click`
- `ledger_entry_view`
- `ledger_media_open`
- `system_view`
- `indicator_view`
- `signal_view`
- `verification_view`
- `video_open`
- `private_access_request`
- `outbound_link_click`
- `client_error`
- `resource_error`
- `reliability_event`

Use the constants in `ANALYTICS_EVENTS` rather than scattering string literals through application code.

## Event Categories

Categories are intentionally small:

- `navigation`
- `engagement`
- `performance`
- `product`
- `content`
- `conversion`
- `reliability`

Do not create a new category unless existing categories clearly do not fit.

## Privacy Policy

Analytics must not collect:

- email addresses
- names
- phone numbers
- account passwords
- investor passwords
- trading passwords
- API keys
- broker credentials
- account authentication information
- manually captured IP addresses
- user-entered message content

Event properties are restricted to JSON-safe primitives and small primitive arrays. Avoid large payloads, copied descriptions, nested records, or arbitrary user-submitted data.

## Sensitive Property Keys

Analytics blocks obvious sensitive property keys in event properties in every environment:

- `email`
- `password`
- `passwd`
- `secret`
- `token`
- `apiKey`
- `phone`
- `name`
- `message`

This restriction applies to event property keys, not to the event `name` field.

Development additionally logs a console warning when an unsafe event is blocked. Production drops unsafe events silently without forwarding them to a configured provider.

## Query-String Stripping

Analytics paths must use canonical pathnames only. Query strings and hash fragments are stripped.

Use:

```text
/private-access
```

Do not use:

```text
/private-access?email=value@example.com
```

Outbound link analytics should store a destination domain only, such as `youtube.com`, not a full URL with tracking parameters.

## Public Demo Account Handling

The public demo account is intentionally disclosed elsewhere in approved content, but analytics should not include the account number by default.

Prefer stable internal identifiers such as:

```text
public-demo-reference-account
```

Do not include current Ledger values, profit values, return percentages, win rates, drawdowns, or trade counts in analytics constants or default events.

## Consent

No cookie-consent banner is required in Task 0.7A because no external tracker, tracking cookie, persistent visitor ID, local storage tracking, or fingerprinting is being added.

Consent and privacy requirements must be revisited before activating any provider that introduces non-essential cookies, cross-site tracking, session replay, heatmaps, advertising identifiers, or comparable tracking behavior.

## Privacy Disclosure

The public privacy page is not rewritten in Task 0.7A.

When an analytics provider is activated, public privacy disclosures must match the actual provider, event payloads, storage behavior, retention model, and any consent requirements.

## Current Exclusions

Task 0.7A does not add:

- Google Analytics
- Meta Pixel
- ad-tech
- session replay
- heatmaps
- cookies
- localStorage visitor IDs
- device fingerprinting
- global page-view auto-tracking
- API routes
- database writes
- authentication
- visible UI

## Reliability Events

Task 0.7B wires error boundaries to the existing analytics contract with safe reliability events only.

Allowed properties are limited to non-sensitive operational labels such as:

- `boundary`
- `routeGroup`
- `action`

Do not send raw `Error` objects, error messages, stack traces, digests, URL query strings, user-entered content, credentials, or account authentication data.
