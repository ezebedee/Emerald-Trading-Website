import type { Metadata } from "next";

import { PagePlaceholder } from "@/components/dev/page-placeholder";
import { JsonLd } from "@/components/seo/json-ld";
import {
  createPageMetadata,
  createRouteWebPageJsonLd,
  routeSeoMetadata,
} from "@/lib/seo";

export const metadata: Metadata = createPageMetadata(
  routeSeoMetadata["/performance/live-vs-backtest"],
);

const pageJsonLd = createRouteWebPageJsonLd("/performance/live-vs-backtest", [
  { name: "Home", path: "/" },
  { name: "Performance", path: "/performance" },
  {
    name: "Live vs Backtest Performance",
    path: "/performance/live-vs-backtest",
  },
]);

export default function LiveVsBacktestPage() {
  return (
    <>
      <JsonLd data={pageJsonLd} />
      <PagePlaceholder
        title="Live Performance vs Backtest Performance"
        variant="dashboard"
      />
    </>
  );
}
