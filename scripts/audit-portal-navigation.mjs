import assert from "node:assert/strict";
import { readFileSync, readdirSync } from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";
import {
  portalLoginUrl,
  portalProgramIntents,
  portalProgramLoginUrl,
} from "../src/lib/portal.ts";
import {
  navigationLinks,
  isActiveRoute,
} from "../src/components/layout/navigation.ts";

const root = path.resolve(path.dirname(fileURLToPath(import.meta.url)), "..");
const read = (file) => readFileSync(path.join(root, file), "utf8");
assert.deepEqual(portalProgramIntents, [
  "mentor-agent",
  "creator",
  "certified-mentor",
  "research-contributor",
  "trading-research",
]);
for (const intent of portalProgramIntents) {
  const url = new URL(portalProgramLoginUrl(intent));
  assert.equal(url.origin + url.pathname, portalLoginUrl);
  assert.deepEqual([...url.searchParams], [["intent", intent]]);
  assert.equal(url.hash, "");
}
for (const invalid of [
  undefined,
  null,
  "",
  "admin",
  "creator-partner",
  "research-challenge",
  "https://example.invalid",
  "//example.invalid",
  "/admin",
  "creator&returnTo=https://example.invalid",
  "CREATOR",
  " creator",
  "%63reator",
  "__proto__",
  "constructor",
  {},
  [],
]) {
  assert.equal(portalProgramLoginUrl(invalid), portalLoginUrl);
}
assert.deepEqual(navigationLinks, [
  { href: "/", label: "Home" },
  { href: "/ledger", label: "Emerald Ledger" },
  { href: "/systems", label: "Systems" },
  { href: "/indicators", label: "Indicators & Signals" },
  { href: "/technology", label: "Technology" },
  { href: "/research", label: "Research" },
  { href: "/partners", label: "Partners" },
  { href: "/about", label: "About" },
]);
assert.equal(isActiveRoute("/partners", "/partners"), true);
assert.equal(isActiveRoute("/research", "/partners"), false);
assert.equal(isActiveRoute("/partnership", "/partners"), false);
for (const file of ["desktop-nav.tsx", "mobile-nav.tsx"]) {
  const source = read(`src/components/layout/${file}`);
  assert.match(source, /navigationLinks\.map/);
  assert.match(source, /href=\{link.href\}/);
  assert.match(source, /aria-current=\{isActive \? "page" : undefined\}/);
  assert.match(source, /focus-emerald/);
}
assert.match(
  read("src/components/layout/mobile-nav.tsx"),
  /href=\{link.href\}\s+onClick=\{closeMenu\}/,
);
const portal = read("src/lib/portal.ts");
assert.match(
  portal,
  /export const portalLoginUrl = "https:\/\/portal\.emeraldforexsystem\.com\/login"/,
);
for (const file of ["site-header.tsx", "mobile-nav.tsx"]) {
  const source = read(`src/components/layout/${file}`);
  assert.match(
    source,
    /href=\{portalLoginUrl\}/,
    `${file}: canonical portal entry`,
  );
  assert.match(source, />\s*Sign In\s*</, `${file}: meaningful label`);
  assert.doesNotMatch(source, /target=["']_blank/);
}
assert.match(
  read("src/components/layout/mobile-nav.tsx"),
  /href=\{portalLoginUrl\}[\s\S]*?onClick=\{closeMenu\}/,
);
const footer = read("src/components/layout/site-footer.tsx");
assert.match(footer, /href: "\/partners", label: "Partner Hub"/);
assert.match(footer, /href: "\/signals", label: "Signal Library"/);
for (const label of ["Client Portal", "Partner Portal"]) {
  assert.ok(footer.includes(`href: portalLoginUrl, label: "${label}"`));
}
const files = readdirSync(path.join(root, "src"), { recursive: true }).filter(
  (file) => /\.(ts|tsx)$/.test(file),
);
for (const file of files) {
  const source = read(`src/${file}`);
  assert.doesNotMatch(
    source,
    /agentRegistrationUrl|\/register\/agent|[?&](?:returnTo|returnUrl|callbackUrl|redirect|next)=/i,
    `${file}: only canonical entry and identifiers, no raw return URLs`,
  );
  assert.doesNotMatch(
    source,
    /https?:\/\/[^\s"'<>]*(?:hostingersite\.com|hstgr\.cloud|api\.emeraldforexsystem\.com)/,
    file,
  );
  assert.doesNotMatch(
    source,
    /from ["'](?:next-auth|@auth\/|@clerk\/)|\b(?:getServerSession|useSession|signOut)\s*\(|\bcookies\s*\(/,
    `${file}: no public-site session handling`,
  );
  if (file.replaceAll("\\", "/").startsWith("components/")) {
    assert.doesNotMatch(
      source,
      /Signal Dashboard|Request Private Access|href[=:]\s*["']\/private-access["']/,
      file,
    );
  }
}
for (const file of ["src/lib/seo/routes.ts", "src/app/sitemap.ts"]) {
  assert.doesNotMatch(
    read(file),
    /portalLoginUrl|portal\.emeraldforexsystem\.com/,
  );
}
assert.ok(
  !files.some((file) =>
    /(?:^|[\\/])(?:login|logout|register|auth)[\\/](?:page|route)\.tsx?$/.test(
      file,
    ),
  ),
);
console.log(
  "Portal navigation audit passed: canonical links, labels, mobile close handler, no known auth/session integration or portal sitemap entry. Source guardrails supplement browser QA, not a security proof.",
);
