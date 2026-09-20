import type { Metadata } from "next";

import { CompanyLegalContent } from "@/components/company/company-legal-content";
import { createPageMetadata, routeSeoMetadata } from "@/lib/seo";

export const metadata: Metadata = createPageMetadata(
  routeSeoMetadata["/privacy"],
);

export default function PrivacyPage() {
  return <CompanyLegalContent page="privacy" />;
}
