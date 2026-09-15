# Public Partner Hub

Task 6.26 adds substantive, indexable `/partners` with existing page metadata and WebPage/Breadcrumb JSON-LD helpers. The Hub explains responsibilities and readiness, not enrollment.

## Availability

- Existing approved Agent and Super Agent operational access is available through current authorization. Signing in does not enroll a visitor.
- Mentor / Agent public program: In development; public applications are not open through the Hub.
- Creator Partner, Certified Mentor, Trading Research Challenge and Research Contributor: Coming later. No application, certification, submission, scoring or reward workflow is offered here.

## Discovery

The footer has Partner Hub (`/partners`) separately from Partner Portal (`https://portal.emeraldforexsystem.com/login`). The existing homepage research section and `/research` link to the Hub. The crowded primary header, About and Professional editorial content are unchanged; their shared footer provides discovery.

## Responsibilities

Public website: discovery, program explanations, expectations, public research/community context and portal entry links.

Portal: identity and authorization; future enrollment/state, applications/submissions, operational workflows and scoring/reward logic belong to Tasks 6.27-6.33. No new authentication role or public role-specific destination is introduced. The portal's companion change documents this boundary without adding a duplicate informational screen.

No compensation rates, recruitment earnings, guaranteed outcomes or currently available certification are advertised. Public copy does not expose attribution, mentor-code or commission-engine internals. No commission is paid merely for recruiting another Agent. Existing account relationships do not grant unrestricted sales authority.

## Verification

`pnpm partners:audit` is included in `pnpm foundation:audit`. It checks route wiring, exact program status presentation, discovery, canonical portal entry and narrow claim/workflow guards. Human copy review and responsive browser QA complement these checks; text checks alone do not prove all semantic claims.

Work remains local. No GitHub, hosting, domain, DNS or Task 5.15 cutover action is part of Task 6.26.
