export type AnalyticsEventCategory =
  | "navigation"
  | "engagement"
  | "performance"
  | "product"
  | "content"
  | "conversion"
  | "reliability";

export type AnalyticsEventName =
  | "page_view"
  | "cta_click"
  | "ledger_entry_view"
  | "ledger_media_open"
  | "system_view"
  | "indicator_view"
  | "signal_view"
  | "verification_view"
  | "video_open"
  | "private_access_request"
  | "outbound_link_click"
  | "client_error"
  | "resource_error"
  | "reliability_event";

export type AnalyticsPropertyPrimitive = string | number | boolean | null;
export type AnalyticsPropertyValue =
  AnalyticsPropertyPrimitive | readonly AnalyticsPropertyPrimitive[];

export type AnalyticsProperties = Readonly<
  Record<string, AnalyticsPropertyValue>
>;

export type AnalyticsEvent = Readonly<{
  name: AnalyticsEventName;
  category: AnalyticsEventCategory;
  properties?: AnalyticsProperties;
}>;

export type PageViewAnalyticsEvent = Readonly<{
  path: string;
  title?: string;
  referrer?: string;
}>;

export type AnalyticsProvider = Readonly<{
  trackEvent: (event: AnalyticsEvent) => void | Promise<void>;
  trackPageView?: (pageView: PageViewAnalyticsEvent) => void | Promise<void>;
}>;
