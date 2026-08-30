import type { Metadata } from "next";

import { PagePlaceholder } from "@/components/dev/page-placeholder";
import { createPageMetadata, routeSeoMetadata } from "@/lib/seo";

export const metadata: Metadata = createPageMetadata(
  routeSeoMetadata["/terms"],
);

export default function TermsPage() {
  return <PagePlaceholder title="Terms of Use" variant="narrow" />;
}
