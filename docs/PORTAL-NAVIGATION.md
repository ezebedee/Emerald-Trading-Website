# Portal Navigation Boundary

Live portal: https://portal.emeraldforexsystem.com.
All Sign In, Client Portal, and Partner Portal links use the shared
`portalLoginUrl` in `src/lib/portal.ts`:
https://portal.emeraldforexsystem.com/login.

The public website provides marketing, content, and navigation only. The portal
owns authentication, authorization, licensing, partner operations, and routing
for the authenticated identity. Public links do not promise account creation,
private performance access, or a request workflow. They navigate in the same tab
without reading sessions, cookies, or roles. No portal URL enters the public
sitemap. No analytics provider or event instrumentation was added.

## Task 5.9 Decisions

- Desktop/mobile Request Private Access becomes Sign In.
- Footer Private Access becomes Client Portal and Partner Portal, sharing login.
- Footer Signal Dashboard becomes Signal Library.
- Homepage Private Review card now links to the implemented Emerald Quant
  System information page; it does not imply portal access to private records.
- Homepage lower access CTA becomes Client Portal. Professional Overview stays
  a future placeholder destination.
- Systems catalog Quant access CTA becomes Client Portal. Existing product
  detail CTAs and the other product pages retain their public destinations.
- `/private-access` remains an unchanged, indexable placeholder but has no
  rendered navigation/CTA links. Indexing policy is deferred.
- Existing Systems and Indicators & Signals navigation labels still describe
  their overview content; no broad information-architecture restructuring.

## CTA Classification

Homepage CTA destinations:

| Category           | Destinations                                                  |
| ------------------ | ------------------------------------------------------------- |
| PRODUCT DETAIL     | /systems, /systems/quant, /indicators, /signals               |
| PERFORMANCE        | /ledger                                                       |
| PORTAL             | canonical login URL                                           |
| PLACEHOLDER FUTURE | /technology, /research, /verification, /videos, /professional |

Product detail destinations remain public. `/platforms`, `/technology`, and
`/research` information links remain placeholders where already used by product
pages. Shared footer performance/comparison and legal destinations also remain
placeholders. No missing destination content is implemented here.

`pnpm portal:audit` adds narrow source guardrails and is included in
`pnpm foundation:audit` and hosted CI. Browser evidence separately verifies
rendered URLs, labels, navigation, focus, and responsive layouts. These static
guards do not constitute an exhaustive authentication/security audit.
