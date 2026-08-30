"use client";

import { useEffect } from "react";

import {
  HomeAction,
  RecoveryState,
} from "@/components/reliability/recovery-state";
import { Button } from "@/components/ui/button";
import { ANALYTICS_CATEGORIES, ANALYTICS_EVENTS } from "@/lib/analytics";
import { trackAnalyticsEvent } from "@/lib/analytics";

import "./globals.css";

type GlobalErrorProps = Readonly<{
  error: Error;
  reset: () => void;
}>;

export default function GlobalError({ error, reset }: GlobalErrorProps) {
  useEffect(() => {
    if (process.env.NODE_ENV === "development") {
      console.error(error);
    }

    trackAnalyticsEvent({
      name: ANALYTICS_EVENTS.CLIENT_ERROR,
      category: ANALYTICS_CATEGORIES.RELIABILITY,
      properties: {
        boundary: "global",
      },
    });
  }, [error]);

  const handleRetry = () => {
    trackAnalyticsEvent({
      name: ANALYTICS_EVENTS.RELIABILITY_EVENT,
      category: ANALYTICS_CATEGORIES.RELIABILITY,
      properties: {
        boundary: "global",
        action: "retry",
      },
    });

    reset();
  };

  return (
    <html lang="en">
      <body>
        <main className="bg-background text-foreground min-h-dvh">
          <RecoveryState
            label="Application Recovery"
            title="Something went wrong"
            description="We couldn't complete this request. Try again, or return to the homepage."
            actions={
              <>
                <Button type="button" variant="primary" onClick={handleRetry}>
                  Try Again
                </Button>
                <HomeAction />
              </>
            }
          />
        </main>
      </body>
    </html>
  );
}
