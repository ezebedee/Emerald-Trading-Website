# Portal Navigation Boundary

Live portal: https://portal.emeraldforexsystem.com.
All Sign In, Client Portal, and Partner Portal links use the shared
`portalLoginUrl` in `src/lib/portal.ts`:
https://portal.emeraldforexsystem.com/login.

The public website provides marketing, content, and navigation only. The portal
owns authentication, account creation, authorization, licensing, partner operations,
and routing for the authenticated identity. Public links do not grant program
acceptance, private performance access or purchased access. They navigate in the same tab
without reading sessions, cookies, or roles. No portal URL enters the public
sitemap. No analytics provider or event instrumentation was added.

## Unified Account Entry

Generic desktop/mobile Sign In, Client Portal and Partner Portal entries retain
the canonical `/login` URL with no role or destination parameter. They were
already correct at base `be8c3f0d51e3e48153cb15d2fc99f772c2fc50e7`.
The former direct `/register/agent` entry now uses the same login entry with
`intent=mentor-agent`, including the adjacent existing-account Sign in link.

Program participation links use `portalProgramLoginUrl` and exactly one query
parameter, `intent`. No raw return URL, account authority or enrollment action
is encoded. Unknown runtime inputs fall back to plain `/login`.

| Public program / existing anchor                  | Portal intent          |
| ------------------------------------------------- | ---------------------- |
| Mentor / Agent / `mentor-agent`                   | `mentor-agent`         |
| Creator Partner / `creator-partner`               | `creator`              |
| Certified Mentor / `certified-mentor`             | `certified-mentor`     |
| Research Contributor / `research-contributor`     | `research-contributor` |
| Trading Research Challenge / `research-challenge` | `trading-research`     |

These are all five public programs; no additional identifiers are introduced.
Public discovery links to `/partners`, `/research` and other informational pages
remain public. Existing program anchors are preserved.

The companion portal implementation must validate these identifiers server-side,
preserve them across sign-in/account creation/email verification/MFA, and resolve
only permitted destinations. This public change cannot enforce or prove that
continuation. Membership does not grant approval, invitation, qualifying status,
Agent authority, a product purchase or a license. Trading competitions, payments
and rankings remain deferred. Coordinate release with the portal implementation.

Validation uses engineering Node 24 and pnpm 11.19.0: `format:check`, `lint`,
`typecheck`, `foundation:audit` (all 13 constituent audits) and `build`.
Desktop/mobile browser QA must verify rendered links and same-tab navigation,
intercepting portal requests so no production account/provider is contacted.
Portal authentication journeys and hosted CI remain separate release evidence.
Detailed local evidence remains outside this repo at
`../Emerald-Releases/unified-account-onboarding/public`; the sanitized reviewer
bundle is in [docs/review/unified-account-onboarding](review/unified-account-onboarding/README.md).
Existing deployment npm
packaging is unchanged; this task does not generate deployment output.

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
