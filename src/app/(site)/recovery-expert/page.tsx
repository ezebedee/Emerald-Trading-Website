import type { Metadata } from "next";

import { PagePlaceholder } from "@/components/dev/page-placeholder";
import { JsonLd } from "@/components/seo/json-ld";
import { getPublicTradingProductBySlug } from "@/data/selectors";
import {
  createPageMetadata,
  createRouteWebPageJsonLd,
  routeSeoMetadata,
} from "@/lib/seo";

export const metadata: Metadata = createPageMetadata(
  routeSeoMetadata["/recovery-expert"],
);

const pageJsonLd = createRouteWebPageJsonLd("/recovery-expert", [
  { name: "Home", path: "/" },
  { name: "Recovery Expert", path: "/recovery-expert" },
]);

export default function RecoveryExpertPage() {
  const product = getPublicTradingProductBySlug("emerald-recovery-expert");

  return (
    <>
      <JsonLd data={pageJsonLd} />
      <PagePlaceholder
        title={product?.name ?? "Emerald Recovery Expert"}
        description="Product page foundation for a semi-automated trade-management tool where the trader initiates the first trade."
      />
    </>
  );
}
