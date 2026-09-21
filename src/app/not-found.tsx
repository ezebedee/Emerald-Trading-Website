import type { Metadata } from "next";

import {
  HomeAction,
  LedgerAction,
  RecoveryState,
} from "@/components/reliability/recovery-state";

export const metadata: Metadata = {
  title: "Page not found",
  description: "The requested Emerald Legacy Systems page was not found.",
  robots: {
    index: false,
    follow: false,
  },
};

export default function NotFound() {
  return (
    <RecoveryState
      label="Not Found"
      code="404"
      title="Page not found"
      description="The page you're looking for doesn't exist or may have moved."
      actions={
        <>
          <HomeAction />
          <LedgerAction />
        </>
      }
    />
  );
}
