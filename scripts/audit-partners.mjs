import assert from "node:assert/strict";
import { readFileSync } from "node:fs";
import { partnerPrograms } from "../src/data/content/partners.ts";
import { publicRouteRegistry } from "../src/lib/seo/routes.ts";

const read = (file) =>
  readFileSync(new URL(`../${file}`, import.meta.url), "utf8").replace(
    /\s+/g,
    " ",
  );
const page = read("src/app/(site)/partners/page.tsx");
const content = page + JSON.stringify(partnerPrograms);
assert.equal(partnerPrograms.length, 5);
assert.deepEqual(
  partnerPrograms.map(({ status }) => status),
  [
    "Registration and application available",
    "Available to existing Emerald account holders",
    "Available to eligible Emerald Mentors / Agents",
    "Available to eligible Emerald account holders",
    "Invitation-based participation",
  ],
);
assert.deepEqual(
  partnerPrograms.map(({ id }) => id),
  [
    "mentor-agent",
    "creator-partner",
    "certified-mentor",
    "research-challenge",
    "research-contributor",
  ],
);
const route = publicRouteRegistry.find(({ path }) => path === "/partners");
assert.ok(route?.indexable && route.includeInSitemap);
assert.match(page, /routeSeoMetadata\["\/partners"\]/);
assert.match(page, /createRouteWebPageJsonLd\("\/partners"/);
assert.doesNotMatch(
  content,
  /PagePlaceholder|<form\b|<input\b|use server|use client|fetch\(|\/api\//i,
);
assert.match(page, /href=\{portalLoginUrl\}/);
assert.match(page, /href=\{agentRegistrationUrl\}/);
assert.match(page, /Register to apply/);
assert.match(page, /verify your email and set up Google Authenticator MFA/);
assert.match(page, /Admin review and explicit activation are required/);
assert.match(page, /Super Agent is a separate Admin-approved promotion/);
assert.match(
  read("src/lib/portal.ts"),
  /https:\/\/portal\.emeraldforexsystem\.com\/register\/agent/,
);
assert.match(page, /Sign in to apply/);
assert.match(page, /Sign in to check eligibility/);
assert.match(page, /Sign in to check invitations/);
assert.match(content, /Signing in does not enroll you or guarantee selection/);
assert.match(
  content,
  /membership does not grant product access or promise compensation/,
);
assert.match(
  read("src/lib/portal.ts"),
  /https:\/\/portal.emeraldforexsystem.com\/login/,
);
assert.match(page, /signing in does not enroll/);
assert.match(page, /No commission is paid merely for recruiting another Agent/);
assert.match(page, /partnerPrograms.map/);
assert.match(page, /\{program.status\}/);
assert.match(content, /There are no public application or submission forms/);
assert.match(
  content,
  /Existing Emerald account holders may sign in to the Portal/,
);
assert.match(content, /Certification is an internal qualification/);
assert.match(content, /Submissions are private, deadline-bound and not scored/);
assert.doesNotMatch(
  content,
  /guaranteed income|passive income|recruit and earn|unlimited commissions|risk-free|certified expert|official financial adviser|institutional partner|\d+(?:\.\d+)?%/i,
);
const footer = read("src/components/layout/site-footer.tsx");
assert.match(footer, /href: "\/partners", label: "Partner Hub"/);
assert.match(footer, /href: portalLoginUrl, label: "Partner Portal"/);
for (const file of [
  "src/components/home/home-technology-research.tsx",
  "src/components/engineering/research-content.tsx",
]) {
  assert.match(read(file), /href="\/partners"/);
}
console.log(
  "Partner Hub audit passed: statuses, route/SEO, discovery, portal distinction and no application workflow. Human claim review remains required.",
);
