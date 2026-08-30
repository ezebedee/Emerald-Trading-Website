import { readdirSync, statSync, readFileSync } from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const root = path.resolve(__dirname, "..");
const srcRoot = path.join(root, "src");
const publicRoot = path.join(root, "public");
const rootLayoutPath = path.join(root, "src", "app", "layout.tsx");
const packageJsonPath = path.join(root, "package.json");

const vendorTokens = [
  "gtag",
  "googletagmanager",
  "fbq",
  "facebook pixel",
  "Meta Pixel",
  "hotjar",
  "clarity",
  "Sentry",
  "Datadog",
  "New Relic",
  "Rollbar",
  "Bugsnag",
];
const storageTokens = [
  "localStorage",
  "sessionStorage",
  "document.cookie",
  "navigator.userAgent",
];
const allowedLargeMedia = new Set([
  "public\\brand\\logos\\emerald-legacy-systems-horizontal.png",
  "public\\brand\\marks\\emerald-elq-mark-signature.png",
]);

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
const sourceFiles = findFiles(srcRoot).filter((filePath) =>
  /\.(ts|tsx|js|jsx|css)$/.test(filePath),
);
const appSource = sourceFiles
  .map((filePath) => readFileSync(filePath, "utf8"))
  .join("\n");
const packageJsonSource = readFileSync(packageJsonPath, "utf8");
const rootLayoutSource = readFileSync(rootLayoutPath, "utf8");
const clientComponentCount = sourceFiles.filter((filePath) =>
  readFileSync(filePath, "utf8").startsWith('"use client";'),
).length;

if (!rootLayoutSource.includes("next/font/google")) {
  failures.push("Root layout must continue using next/font.");
}

if (/<img[\s>]/.test(appSource)) {
  failures.push("Raw img element found in application source.");
}

for (const token of vendorTokens) {
  if (appSource.includes(token) || packageJsonSource.includes(token)) {
    failures.push(`Unexpected third-party monitoring/tracking token: ${token}`);
  }
}

for (const token of storageTokens) {
  if (appSource.includes(token)) {
    failures.push(`Unexpected tracking storage/fingerprinting token: ${token}`);
  }
}

const mediaFiles = findFiles(publicRoot).filter((filePath) =>
  /\.(png|jpe?g|webp|gif|mp4|mov)$/i.test(filePath),
);

for (const filePath of mediaFiles) {
  const relativePath = path.relative(root, filePath);
  const normalizedRelativePath = relativePath.replaceAll("/", "\\");
  const size = statSync(filePath).size;

  if (
    size > 2 * 1024 * 1024 &&
    !allowedLargeMedia.has(normalizedRelativePath)
  ) {
    failures.push(
      `Unexpected large public media file: ${relativePath} (${Math.round(size / 1024)} KB)`,
    );
  }
}

if (!packageJsonSource.includes('"performance:audit"')) {
  failures.push("package.json is missing performance:audit script.");
}

console.log("Performance foundation audit");
console.log(`Client component count: ${clientComponentCount}`);
console.log(`Public media files scanned: ${mediaFiles.length}`);
console.log("Known large brand PNGs: approved deferred optimization");

if (failures.length) {
  console.error("");
  console.error("Failures:");
  for (const failure of failures) {
    console.error(`- ${failure}`);
  }

  process.exitCode = 1;
} else {
  console.log(
    "Performance guardrails are intact: server-first source, next/font, no tracking vendors, and no unexpected large media.",
  );
}
