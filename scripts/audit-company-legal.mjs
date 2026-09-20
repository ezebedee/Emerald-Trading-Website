import assert from "node:assert/strict";
import { readFileSync, readdirSync } from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";
import ts from "typescript";

const root = path.resolve(path.dirname(fileURLToPath(import.meta.url)), "..");
const read = (p) => readFileSync(path.join(root, p), "utf8");
const source = read("src/data/content/company-legal.ts");
const tree = ts.createSourceFile(
  "content.ts",
  source,
  ts.ScriptTarget.Latest,
  true,
);
const strings = [];
function visit(node) {
  if (ts.isStringLiteral(node)) strings.push(node.text);
  ts.forEachChild(node, visit);
}
visit(tree);
const text = strings.join("\n");
for (const route of [
  "about",
  "professional",
  "privacy",
  "terms",
  "risk-disclosure",
]) {
  const page = read(`src/app/(site)/${route}/page.tsx`);
  assert.doesNotMatch(page, /PagePlaceholder/);
  assert.ok(page.includes(`<CompanyLegalContent page="${route}" />`));
  assert.ok(page.includes(`routeSeoMetadata["/${route}"]`));
  assert.ok(
    read("src/components/layout/site-footer.tsx").includes(`href: "/${route}"`),
  );
}
assert.match(
  text,
  /Emerald Legacy Systems develops quantitative trading software/,
);
assert.match(text, /Research and iteration are central/);
assert.match(
  text,
  /communicated plainly rather than hidden behind marketing claims/,
);
assert.match(text, /build useful trading technology/);
assert.doesNotMatch(
  text,
  /without the final s|The company and the product are distinct/,
);
assert.match(text, /Public Demo Reference Account/);
assert.match(text, /Forward Performance Record/);
assert.match(text, /Documented Performance/);
assert.match(text, /Documented Results/);
assert.match(text, /Metals \/ XAUUSD \/ MT4/);
assert.match(text, /no configured analytics provider/);
assert.match(text, /no data-submission forms/);
assert.match(text, /respective owners/);
assert.match(text, /do not imply endorsement or affiliation/);

// Review whole sentences: allow only the explicit negative performance/advice statements.
for (const value of strings) {
  for (const sentence of value.split(/(?<=[.!?])\s+/)) {
    assert.doesNotMatch(
      sentence,
      /\bregulated\b|registered adviser|broker-dealer|licensed financial institution|fiduciary|managed accounts?|guaranteed returns|risk-free|institutional execution|independently verified real-money performance/i,
    );
    if (/individualized investment advice/i.test(sentence)) {
      assert.match(sentence, /\bnot\b|does not provide/);
    }
    if (/real-money (?:performance|account record)/i.test(sentence)) {
      assert.match(sentence, /\bnot\b/);
    }
  }
}
assert.doesNotMatch(
  text,
  /founded in|employees|assets under management|award-winning|certified|GDPR compliant|CCPA compliant/i,
);
assert.doesNotMatch(
  text,
  /[\w.+-]+@[\w.-]+\.[a-z]{2,}|\/api\/|password|licenseKey|DATABASE_URL|BEGIN.*PRIVATE KEY|session lease|device identifier/i,
);
assert.ok(strings.includes("https://portal.emeraldforexsystem.com/login"));

const walk = (dir) =>
  readdirSync(path.join(root, dir), { withFileTypes: true }).flatMap((entry) =>
    entry.isDirectory()
      ? walk(`${dir}/${entry.name}`)
      : [`${dir}/${entry.name}`],
  );
for (const file of walk("src").filter((f) => /\.tsx?$/.test(f))) {
  const code = read(file);
  assert.doesNotMatch(
    code,
    /<form\b|document\.cookie\s*=|localStorage\.|sessionStorage\./,
    `Privacy notice needs review: ${file}`,
  );
  const ast = ts.createSourceFile(file, code, ts.ScriptTarget.Latest, true);
  function check(node) {
    if (ts.isCallExpression(node) && ts.isIdentifier(node.expression)) {
      assert.notEqual(
        node.expression.text,
        "setAnalyticsProvider",
        `Provider activation: ${file}`,
      );
      assert.notEqual(
        node.expression.text,
        "trackPageView",
        `Page tracking activation: ${file}`,
      );
    }
    ts.forEachChild(node, check);
  }
  check(ast);
}
assert.match(
  read("src/lib/analytics/analytics.ts"),
  /let activeProvider: AnalyticsProvider \| undefined;/,
);
console.log(
  "Company/legal audit passed: five substantive routes, contextual claim checks, public boundaries and current privacy implementation guardrails. Human legal review remains separate.",
);
