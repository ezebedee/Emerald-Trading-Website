export const ANALYTICS_EVENTS = {
  PAGE_VIEW: "page_view",
  CTA_CLICK: "cta_click",
  LEDGER_ENTRY_VIEW: "ledger_entry_view",
  LEDGER_MEDIA_OPEN: "ledger_media_open",
  SYSTEM_VIEW: "system_view",
  INDICATOR_VIEW: "indicator_view",
  SIGNAL_VIEW: "signal_view",
  VERIFICATION_VIEW: "verification_view",
  VIDEO_OPEN: "video_open",
  PRIVATE_ACCESS_REQUEST: "private_access_request",
  OUTBOUND_LINK_CLICK: "outbound_link_click",
  CLIENT_ERROR: "client_error",
  RESOURCE_ERROR: "resource_error",
  RELIABILITY_EVENT: "reliability_event",
} as const;

export const ANALYTICS_CATEGORIES = {
  NAVIGATION: "navigation",
  ENGAGEMENT: "engagement",
  PERFORMANCE: "performance",
  PRODUCT: "product",
  CONTENT: "content",
  CONVERSION: "conversion",
  RELIABILITY: "reliability",
} as const;

export const ANALYTICS_CTA_IDS = {
  FOLLOW_PERFORMANCE: "follow-performance",
  REQUEST_PRIVATE_ACCESS: "request-private-access",
  VIEW_LEDGER: "view-ledger",
} as const;

export const ANALYTICS_ENTITY_IDS = {
  PUBLIC_DEMO_REFERENCE_ACCOUNT: "public-demo-reference-account",
  EMERALD_QUANT_SYSTEM: "emerald-quant-system",
  EMERALD_SIGNAL_INDICATOR: "emerald-signal-indicator",
  EMERALD_DIRECTIONAL_SIGNAL_STREAM: "emerald-directional-signal-stream",
} as const;

export const SENSITIVE_ANALYTICS_PROPERTY_KEYS = [
  "email",
  "password",
  "passwd",
  "secret",
  "token",
  "apiKey",
  "phone",
  "name",
  "message",
] as const;
