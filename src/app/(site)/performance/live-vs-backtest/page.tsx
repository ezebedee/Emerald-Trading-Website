import type { Metadata } from "next";

import { ForwardBacktestGuide } from "@/components/performance/forward-backtest-guide";
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
    name: "Forward Performance vs Backtest Performance",
    path: "/performance/live-vs-backtest",
  },
]);

export default function LiveVsBacktestPage() {
  return (
    <>
      <JsonLd data={pageJsonLd} />
      <ForwardBacktestGuide />
    </>
  );
}
