import type { Metadata } from "next";

import { PagePlaceholder } from "@/components/dev/page-placeholder";
import { JsonLd } from "@/components/seo/json-ld";
import {
  createPageMetadata,
  createRouteWebPageJsonLd,
  routeSeoMetadata,
} from "@/lib/seo";

export const metadata: Metadata = createPageMetadata(
  routeSeoMetadata["/ledger"],
);

const pageJsonLd = createRouteWebPageJsonLd("/ledger", [
  { name: "Home", path: "/" },
  { name: "Emerald Ledger", path: "/ledger" },
]);

export default function LedgerPage() {
  return (
    <>
      <JsonLd data={pageJsonLd} />
      <PagePlaceholder title="The Emerald Ledger" variant="dashboard" />
    </>
  );
}
