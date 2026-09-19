# Company, Professional and Legal Content

Task 5.13 changes only About, Professional, Privacy, Terms and Risk Disclosure plus their shared content renderer, metadata and narrow audits. It adds no portal logic or access workflow.

## Sources

- `src/data/site.ts` and the existing footer: company/brand identity, technology positioning, public support link and informational-advice boundary.
- `src/data/products/product-catalog.ts`, existing product pages and platform implementation records: four product roles, platform availability and separate implementation scope.
- Technology/Research content: research process is an evaluation framework, not proof of completed validation or guaranteed performance.
- Performance/Verification content: Public Demo Reference Account, Forward Performance Record, documented results and Metals / XAUUSD / MT4 ownership. Reviewable documentation is not independent certification.
- `src/lib/analytics/analytics.ts`, public configuration and call-site inspection: provider-free scaffolding, no provider registration or page-view integration. No public submission forms, application cookie writes or tracking storage calls found in current source.
- `src/lib/reliability/logger.ts`: operational logging exists. Infrastructure logging is framed as possible, not a claim about a particular deployed host, processor or retention schedule.

## Boundaries

The copy does not assert a legal entity registration, establishment date, headcount, office, regulated status, adviser service, assets under management or third-party relationship. Platform trademarks remain with their owners. No jurisdiction, retention period, named processor, statutory compliance or attorney approval is invented.

The privacy notice concerns the public implementation only and explicitly separates portal and external-service handling. Email contact is described because the footer already links to email; no new address or form is introduced. Reassess this notice before changing hosting, tracking, forms or authentication.

Website terms are restrained informational-use language, not a claim of legal completeness or enforceability. Business-owner and qualified legal review before public deployment remains recommended, especially for operator identity, applicable requirements and deployed data handling. This task does not deploy or certify compliance.

## Checks

`pnpm company:audit` checks all five route replacements, footer paths, required terminology, contextual negative statements, prohibited unsupported claims and privacy implementation assumptions. It is part of the foundation suite. Source checks are guardrails, not a substitute for human claim/legal review. Browser evidence is saved outside the repository.
