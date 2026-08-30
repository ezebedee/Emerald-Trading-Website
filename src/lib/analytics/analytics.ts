import {
  ANALYTICS_CATEGORIES,
  ANALYTICS_EVENTS,
  SENSITIVE_ANALYTICS_PROPERTY_KEYS,
} from "./events";
import type {
  AnalyticsEvent,
  AnalyticsProvider,
  PageViewAnalyticsEvent,
} from "./types";

const analyticsEnabled = process.env.NEXT_PUBLIC_ANALYTICS_ENABLED === "true";
const analyticsDebugEnabled =
  process.env.NEXT_PUBLIC_ANALYTICS_DEBUG === "true";
const isDevelopment = process.env.NODE_ENV === "development";

let activeProvider: AnalyticsProvider | undefined;

export const isAnalyticsEnabled = () => analyticsEnabled;

export const setAnalyticsProvider = (provider?: AnalyticsProvider) => {
  activeProvider = provider;
};

export const normalizeAnalyticsPath = (path: string): string => {
  const fallbackPath = path.trim() || "/";

  if (/^https?:\/\//i.test(fallbackPath)) {
    try {
      return normalizeAnalyticsPath(new URL(fallbackPath).pathname);
    } catch {
      return "/";
    }
  }

  const pathOnly = fallbackPath.split(/[?#]/)[0] ?? "/";
  const withLeadingSlash = pathOnly.startsWith("/") ? pathOnly : `/${pathOnly}`;
  const normalized =
    withLeadingSlash === "/"
      ? withLeadingSlash
      : withLeadingSlash.replace(/\/+$/, "");

  return normalized || "/";
};

export const normalizeOutboundDestinationDomain = (url: string) => {
  try {
    const destination = new URL(url);

    return destination.hostname.replace(/^www\./, "");
  } catch {
    return undefined;
  }
};

const hasSensitivePropertyKeys = (event: AnalyticsEvent) => {
  const properties = event.properties ?? {};
  const propertyKeys = Object.keys(properties).map((key) => key.toLowerCase());

  return SENSITIVE_ANALYTICS_PROPERTY_KEYS.some((sensitiveKey) =>
    propertyKeys.includes(sensitiveKey.toLowerCase()),
  );
};

const assertSafeAnalyticsEvent = (event: AnalyticsEvent) => {
  if (!hasSensitivePropertyKeys(event)) {
    return true;
  }

  if (isDevelopment) {
    console.warn(
      `Analytics event "${event.name}" contains a sensitive property key and was not tracked.`,
    );
  }

  return false;
};

const debugAnalyticsEvent = (event: AnalyticsEvent) => {
  if (isDevelopment && analyticsDebugEnabled) {
    console.debug("[analytics:event]", event);
  }
};

const debugPageView = (pageView: PageViewAnalyticsEvent) => {
  if (isDevelopment && analyticsDebugEnabled) {
    console.debug("[analytics:page_view]", pageView);
  }
};

export const trackAnalyticsEvent = (event: AnalyticsEvent) => {
  if (!assertSafeAnalyticsEvent(event)) {
    return;
  }

  debugAnalyticsEvent(event);

  if (!analyticsEnabled || !activeProvider) {
    return;
  }

  void activeProvider.trackEvent(event);
};

export const trackPageView = ({
  path,
  title,
  referrer,
}: PageViewAnalyticsEvent) => {
  const pageView = {
    path: normalizeAnalyticsPath(path),
    title,
    referrer: referrer ? normalizeAnalyticsPath(referrer) : undefined,
  };

  debugPageView(pageView);

  if (!analyticsEnabled || !activeProvider) {
    return;
  }

  if (activeProvider.trackPageView) {
    void activeProvider.trackPageView(pageView);
    return;
  }

  trackAnalyticsEvent({
    name: ANALYTICS_EVENTS.PAGE_VIEW,
    category: ANALYTICS_CATEGORIES.NAVIGATION,
    properties: {
      path: pageView.path,
      ...(pageView.title ? { title: pageView.title } : {}),
      ...(pageView.referrer ? { referrer: pageView.referrer } : {}),
    },
  });
};
