import type { Metadata } from "next";

import { PagePlaceholder } from "@/components/dev/page-placeholder";
import { createPageMetadata, routeSeoMetadata } from "@/lib/seo";

export const metadata: Metadata = createPageMetadata(
  routeSeoMetadata["/risk-disclosure"],
);

export default function RiskDisclosurePage() {
  return <PagePlaceholder title="Risk Disclosure" variant="narrow" />;
}
