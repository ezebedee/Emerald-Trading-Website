import { parseBooleanEnv } from "./env";

export const publicConfig = {
  analyticsEnabled: parseBooleanEnv(
    process.env.NEXT_PUBLIC_ANALYTICS_ENABLED,
    false,
  ),
  analyticsDebug: parseBooleanEnv(
    process.env.NEXT_PUBLIC_ANALYTICS_DEBUG,
    false,
  ),
} as const;
