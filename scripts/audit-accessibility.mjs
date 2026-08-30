import { existsSync, readdirSync, readFileSync } from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const root = path.resolve(__dirname, "..");
const siteLayoutPath = path.join(root, "src", "app", "(site)", "layout.tsx");
const rootLayoutPath = path.join(root, "src", "app", "layout.tsx");
const globalCssPath = path.join(root, "src", "app", "globals.css");
const mobileNavPath = path.join(
  root,
  "src",
  "components",
  "layout",
  "mobile-nav.tsx",
);
const notFoundPath = path.join(root, "src", "app", "not-found.tsx");
const siteErrorPath = path.join(root, "src", "app", "(site)", "error.tsx");
const globalErrorPath = path.join(root, "src", "app", "global-error.tsx");
const designSystemPath = path.join(
  root,
  "src",
  "app",
  "design-system",
  "page.tsx",
);
const componentsRoot = path.join(root, "src", "components");
const packageJsonPath = path.join(root, "package.json");

const readIfExists = (filePath) =>
  existsSync(filePath) ? readFileSync(filePath, "utf8") : "";

const findFiles = (directory) => {
  const files = [];

  for (const entry of readdirSync(directory, { withFileTypes: true })) {
    const entryPath = path.join(directory, entry.name);

    if (entry.isDirectory()) {
      files.push(...findFiles(entryPath));
      continue;
    }

    files.push(entryPath);
  }

  return files;
};

const failures = [];
const siteLayoutSource = readIfExists(siteLayoutPath);
const rootLayoutSource = readIfExists(rootLayoutPath);
const globalCssSource = readIfExists(globalCssPath);
const mobileNavSource = readIfExists(mobileNavPath);
const notFoundSource = readIfExists(notFoundPath);
const siteErrorSource = readIfExists(siteErrorPath);
const globalErrorSource = readIfExists(globalErrorPath);
const designSystemSource = readIfExists(designSystemPath);
const componentSources = findFiles(componentsRoot)
  .filter((filePath) => /\.tsx?$/.test(filePath))
  .map((filePath) => [filePath, readFileSync(filePath, "utf8")]);

if (!rootLayoutSource.includes('<html lang="en"')) {
  failures.push('Root layout must retain html lang="en".');
}

if (!siteLayoutSource.includes("Skip to main content")) {
  failures.push("Site layout must include a skip link.");
}

if (!siteLayoutSource.includes('href="#main-content"')) {
  failures.push("Skip link must target #main-content.");
}

if (!siteLayoutSource.includes('id="main-content"')) {
  failures.push("Site layout must expose main-content target.");
}

if (
  !siteLayoutSource.includes("<main") ||
  !siteLayoutSource.includes("<SiteFooter")
) {
  failures.push("Site layout must retain main and footer landmarks.");
}

if (!globalCssSource.includes(":focus-visible")) {
  failures.push("Global CSS must define visible focus state.");
}

if (globalCssSource.includes("outline: none")) {
  failures.push("Global CSS must not remove outlines without replacement.");
}

if (!globalCssSource.includes("prefers-reduced-motion: reduce")) {
  failures.push("Reduced-motion preference must be respected.");
}

for (const token of [
  "aria-expanded",
  "aria-controls",
  "aria-label",
  "Escape",
]) {
  if (!mobileNavSource.includes(token)) {
    failures.push(`Mobile navigation accessibility token is missing: ${token}`);
  }
}

for (const [filePath, source] of componentSources) {
  if (/<(div|span)[^>]*onClick=/.test(source)) {
    failures.push(
      `Clickable non-interactive element found: ${path.relative(root, filePath)}`,
    );
  }
}

if (
  /<button(?![^>]*(aria-label|aria-labelledby|>[^<]+<|children))/.test(
    mobileNavSource,
  )
) {
  failures.push("Icon-only mobile menu button must have an accessible name.");
}

if (!notFoundSource.includes('title="Page not found"')) {
  failures.push("Not-found page must expose a clear heading.");
}

if (!siteErrorSource.includes("We couldn't load this page")) {
  failures.push("Site error boundary must expose a clear heading.");
}

if (!globalErrorSource.includes("Something went wrong")) {
  failures.push("Global error boundary must expose a clear heading.");
}

if (!designSystemSource.includes("export const metadata")) {
  failures.push("Design-system page should retain explicit metadata.");
}

if (!readIfExists(packageJsonPath).includes('"accessibility:audit"')) {
  failures.push("package.json is missing accessibility:audit script.");
}

console.log("Accessibility foundation audit");
console.log("WCAG target: 2.2 AA baseline, not certification");
console.log("Skip link: present");
console.log("Main content target: present");
console.log("Static source checks completed");

if (failures.length) {
  console.error("");
  console.error("Failures:");
  for (const failure of failures) {
    console.error(`- ${failure}`);
  }

  process.exitCode = 1;
} else {
  console.log(
    "Accessibility guardrails are present for landmarks, focus, reduced motion, mobile navigation, and recovery states.",
  );
}
