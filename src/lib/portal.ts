// Navigation only. Authentication and role routing belong to the portal.
export const portalLoginUrl = "https://portal.emeraldforexsystem.com/login";

export const portalProgramIntents = [
  "mentor-agent",
  "creator",
  "certified-mentor",
  "research-contributor",
  "trading-research",
] as const;

export type PortalProgramIntent = (typeof portalProgramIntents)[number];

export function portalProgramLoginUrl(intent: PortalProgramIntent): string {
  // Keep runtime callers on the canonical entry even if their input is invalid.
  if (!portalProgramIntents.includes(intent)) return portalLoginUrl;

  const url = new URL(portalLoginUrl);
  url.searchParams.set("intent", intent);
  return url.toString();
}
