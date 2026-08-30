import type { Metadata } from "next";

import { PagePlaceholder } from "@/components/dev/page-placeholder";
import { createPageMetadata, routeSeoMetadata } from "@/lib/seo";

export const metadata: Metadata = createPageMetadata(
  routeSeoMetadata["/privacy"],
);

export default function PrivacyPage() {
  return <PagePlaceholder title="Privacy Policy" variant="narrow" />;
}
