# Public Account Entry Review

Public-only implementation on `task/unified-account-onboarding`, based on
`be8c3f0d51e3e48153cb15d2fc99f772c2fc50e7`. No baseline advancement or portal edits.
Self-review found no blocking public-code issues; independent review is pending.

## Scope and Dependency

Header/mobile Sign In and footer Client/Partner Portal already use canonical
`https://portal.emeraldforexsystem.com/login` and remain unchanged. The direct
Agent registration entry and adjacent Sign in now use `/login?intent=mentor-agent`.
All five program CTAs carry exactly one allowlisted intent:

| Public program             | Intent                 |
| -------------------------- | ---------------------- |
| Mentor / Agent             | `mentor-agent`         |
| Creator Partner            | `creator`              |
| Certified Mentor           | `certified-mentor`     |
| Research Contributor       | `research-contributor` |
| Trading Research Challenge | `trading-research`     |

No additional programs or IDs. Public anchors and informational routes remain
public. Invalid runtime intent inputs fall back to plain login; no raw return
URLs or public role authority are introduced. Membership does not purchase a
product, grant a license, enroll a participant or grant Agent authority.

Release depends on the companion portal implementation preserving and validating
these intents through account creation/sign-in, email verification and MFA,
then enforcing destination eligibility. Portal auth/identity/MFA journeys and
the reported authentication defects are not tested or fixed by this PR.

## Recorded Production Provenance

Read-only local evidence inspection on 2026-09-23; no provider access or live
production requests. The latest saved public completion report records:

- Engineering source: `be8c3f0d51e3e48153cb15d2fc99f772c2fc50e7`.
- Release branch: `hostinger-production`, commit `a5d11292b8c758170a373836f0d3ec4858a22c6f`.
- Release tree: `5c2faac5a5759a55cd87ed802ae0258abf77b126`.
- Deployment: `01a0c3ac-c42b-7329-a1d5-4079edaf68a9`, Completed/Current on 2026-09-21.
- Archive: `emerald-public-a5d11292-hostinger.zip`, 8,173,115 bytes; SHA-256 `97e0dcbcffe1715b9603dfd1724ea1a690352b2ccb458a967a1600a250b1f20d`.
- Delivery: manual ZIP on the existing app; GitHub automatic deployment pending.

Evidence under `Emerald-Releases/post-6.35-release-preparation/`:
`revision-3/public-zip-deployment/DEPLOYMENT-REPORT.md`, its
`archive-verification.json`, and `revision-3/public-final/extracted/SOURCE.json`.
The completion report supersedes the older production-release checkpoint that
still described the prior `3bfc4b7` ZIP. Different release/source commits reflect
generated npm packaging, not an advanced engineering baseline. Engineering pnpm
and deployment npm remain separate and unchanged by this PR.

Pre-push read-only GitHub refs confirm `main` at the stated base,
`hostinger-production` at the stated release, and the feature branch absent.
Only the newly published feature ref is authorized for push. This is not a fresh
provider-state verification or a claim that a GitHub webhook is active.

## Validation

Local Node 24.19.0 / pnpm 11.19.0: formatting, lint, typecheck,
`foundation:audit` (13 constituent audits), production build and diff checks pass.
The two modified audit scripts cover 5 exact program mappings and 17 invalid
intent inputs, plus source/navigation guards; these are not a unit-test count.

Chromium at 1440x1000 and 375x812: **26 same-tab account handoffs**, **2 public
research discovery clicks**, **27 public routes returning HTTP 200**, and **0
page errors**. No horizontal overflow on the Partner Hub at either viewport.
Each program handoff was also tested with hostile query parameters on the public
page, without forwarding them. See [browser-results.json](browser-results.json).

All portal requests were intercepted by a local test stub; other external
browser requests were blocked. This proves public handoffs only, not portal
authentication or continuation. The application/audit file hashes match the
tested local evidence; reviewer documentation does not alter that runtime.
Hosted CI must be checked against the final PR head, not inferred from this report.

Screenshots were visually inspected and contain only public local content:
[desktop](partners-1440.png), [mobile](partners-375.png),
[mobile navigation](mobile-menu-partners.png). No credentials, QR codes, MFA seeds,
recovery codes, cookies, verification links, private accounts, traces or HARs.

Detailed local logs and browser harness remain outside the repository under
`Emerald-Releases/unified-account-onboarding/public`. No production/provider,
runtime, deployment, merge or watched-branch mutation is part of this PR.
