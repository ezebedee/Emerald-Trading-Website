# Public Partner Hub

Task 6.26 adds substantive, indexable `/partners` with existing page metadata and WebPage/Breadcrumb JSON-LD helpers. The Hub explains responsibilities and readiness, not enrollment.

## Availability

- Existing approved Agent and Super Agent operational access is available through current authorization. Signing in does not enroll a visitor.
- Mentor / Agent: account entry and reviewed application through the Portal; approval and operational activation remain separate.
- Creator Partner: authenticated application, with separate approval and activation.
- Certified Mentor: qualifying active Mentor / Agent status is required.
- Trading Research Challenge: eligible account holders, published availability and deadlines; private research submissions are not verified trading competitions or rankings.
- Research Contributor: personal invitation required; account creation alone does not grant selection.

These five programs are the complete current public inventory. Membership is a
prerequisite, not acceptance or purchased product access. The public Hub has no
application, enrollment or submission forms.

## Discovery

The footer has Partner Hub (`/partners`) separately from Partner Portal (`https://portal.emeraldforexsystem.com/login`). The existing homepage research section and `/research` link to the Hub. The crowded primary header, About and Professional editorial content are unchanged; their shared footer provides discovery.

## Responsibilities

Public website: discovery, program explanations, expectations, public research/community context and portal entry links.

Portal: identity, account creation, email verification, mandatory MFA,
authorization, program eligibility and available application/status workflows.
All public participation CTAs use the canonical `/login` with an allowlisted
`intent`; see [Portal Navigation](PORTAL-NAVIGATION.md) for the exact contract.
Existing accounts are reused, with no public role selection for sign-in. New
account choices are Client or Apply as an Agent, neither granting Agent authority.
Verified trading competitions, payments and rankings remain deferred.

No compensation rates, recruitment earnings, guaranteed outcomes or currently available certification are advertised. Public copy does not expose attribution, mentor-code or commission-engine internals. No commission is paid merely for recruiting another Agent. Existing account relationships do not grant unrestricted sales authority.

## Verification

`pnpm partners:audit` is included in `pnpm foundation:audit`. It checks route wiring, exact program status presentation, discovery, canonical portal entry and narrow claim/workflow guards. Human copy review and responsive browser QA complement these checks; text checks alone do not prove all semantic claims.

Work remains local. No GitHub, hosting, domain, DNS or Task 5.15 cutover action is part of Task 6.26.
