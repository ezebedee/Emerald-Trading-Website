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
    "In development",
    "Coming later",
    "Coming later",
    "Coming later",
    "Coming later",
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
assert.match(
  read("src/lib/portal.ts"),
  /https:\/\/portal.emeraldforexsystem.com\/login/,
);
assert.match(page, /signing in does not enroll/);
assert.match(page, /No commission is paid merely for recruiting another Agent/);
assert.match(page, /partnerPrograms.map/);
assert.match(page, /\{program.status\}/);
assert.match(content, /Public program applications are not open/);
assert.match(content, /Certification is not currently available/);
assert.match(
  content,
  /Registration, submissions, scoring and prizes are not available/,
);
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
