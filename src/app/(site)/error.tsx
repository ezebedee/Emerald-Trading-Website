"use client";

import { useEffect } from "react";

import {
  HomeAction,
  RecoveryState,
} from "@/components/reliability/recovery-state";
import { Button } from "@/components/ui/button";
import { ANALYTICS_CATEGORIES, ANALYTICS_EVENTS } from "@/lib/analytics";
import { trackAnalyticsEvent } from "@/lib/analytics";

type SiteErrorProps = Readonly<{
  error: Error;
  reset: () => void;
}>;

export default function SiteError({ error, reset }: SiteErrorProps) {
  useEffect(() => {
    if (process.env.NODE_ENV === "development") {
      console.error(error);
    }

    trackAnalyticsEvent({
      name: ANALYTICS_EVENTS.CLIENT_ERROR,
      category: ANALYTICS_CATEGORIES.RELIABILITY,
      properties: {
        boundary: "site",
        routeGroup: "public-site",
      },
    });
  }, [error]);

  const handleRetry = () => {
    trackAnalyticsEvent({
      name: ANALYTICS_EVENTS.RELIABILITY_EVENT,
      category: ANALYTICS_CATEGORIES.RELIABILITY,
      properties: {
        boundary: "site",
        action: "retry",
      },
    });

    reset();
  };

  return (
    <RecoveryState
      label="Page Recovery"
      title="We couldn't load this page"
      description="An unexpected error occurred while loading this section. Try again, or return to the homepage."
      actions={
        <>
          <Button type="button" variant="primary" onClick={handleRetry}>
            Try Again
          </Button>
          <HomeAction />
        </>
      }
    />
  );
}
