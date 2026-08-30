import type { Metadata } from "next";

import { PagePlaceholder } from "@/components/dev/page-placeholder";
import { createPageMetadata } from "@/lib/seo";

export const metadata: Metadata = createPageMetadata({
  title: "Trading Systems",
  description:
    "Algorithmic trading systems developed by Emerald Legacy Systems, including signal-generation, risk-management, and execution technology.",
  path: "/systems",
});

export default function SystemsPage() {
  return <PagePlaceholder title="Systems" />;
}
