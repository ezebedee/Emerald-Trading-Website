import { spawnSync } from "node:child_process";

const auditCommands = [
  "scripts/audit-partners.mjs",
  "scripts/audit-data.mjs",
  "scripts/audit-assets.mjs",
  "scripts/audit-seo.mjs",
  "scripts/audit-analytics.mjs",
  "scripts/audit-reliability.mjs",
  "scripts/audit-accessibility.mjs",
  "scripts/audit-performance.mjs",
  "scripts/audit-portal-navigation.mjs",
  "scripts/audit-performance-evidence.mjs",
  "scripts/audit-engineering-content.mjs",
  "scripts/audit-platform-guidance.mjs",
  "scripts/audit-company-legal.mjs",
];

for (const scriptPath of auditCommands) {
  console.log(`==> node ${scriptPath}`);

  const result = spawnSync(process.execPath, [scriptPath], {
    stdio: "inherit",
  });

  if (result.status !== 0) {
    process.exit(result.status ?? 1);
  }
}

console.log("Foundation audit suite passed.");
