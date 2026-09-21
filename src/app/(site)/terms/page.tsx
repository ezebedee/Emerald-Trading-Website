import type { Metadata } from "next";

import { CompanyLegalContent } from "@/components/company/company-legal-content";
import { createPageMetadata, routeSeoMetadata } from "@/lib/seo";

export const metadata: Metadata = createPageMetadata(
  routeSeoMetadata["/terms"],
);

export default function TermsPage() {
  return <CompanyLegalContent page="terms" />;
}
