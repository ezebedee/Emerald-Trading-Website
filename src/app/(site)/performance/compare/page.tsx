import type { Metadata } from "next";

import { PerformanceComparison } from "@/components/performance/performance-comparison";
import { JsonLd } from "@/components/seo/json-ld";
import {
  createPageMetadata,
  createRouteWebPageJsonLd,
  routeSeoMetadata,
} from "@/lib/seo";

export const metadata: Metadata = createPageMetadata(
  routeSeoMetadata["/performance/compare"],
);

const pageJsonLd = createRouteWebPageJsonLd("/performance/compare", [
  { name: "Home", path: "/" },
  { name: "Performance", path: "/performance" },
  { name: "Performance Comparison", path: "/performance/compare" },
]);

export default function PerformanceComparePage() {
  return (
    <>
      <JsonLd data={pageJsonLd} />
      <PerformanceComparison />
    </>
  );
}
