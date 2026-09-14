import type { Metadata } from "next";

import { PerformanceOverview } from "@/components/performance/performance-overview";
import { JsonLd } from "@/components/seo/json-ld";
import {
  createPageMetadata,
  createRouteWebPageJsonLd,
  routeSeoMetadata,
} from "@/lib/seo";

export const metadata: Metadata = createPageMetadata(
  routeSeoMetadata["/performance"],
);

const pageJsonLd = createRouteWebPageJsonLd("/performance", [
  { name: "Home", path: "/" },
  { name: "Performance", path: "/performance" },
]);

export default function PerformancePage() {
  return (
    <>
      <JsonLd data={pageJsonLd} />
      <PerformanceOverview />
    </>
  );
}
