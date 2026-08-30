import type { Metadata } from "next";

import { PagePlaceholder } from "@/components/dev/page-placeholder";
import { createPageMetadata } from "@/lib/seo";

export const metadata: Metadata = createPageMetadata({
  title: "Emerald Ledger",
  description:
    "Public forward-performance records from the Emerald Legacy Systems demo reference account.",
  path: "/ledger",
});

export default function LedgerPage() {
  return <PagePlaceholder title="The Emerald Ledger" variant="dashboard" />;
}
