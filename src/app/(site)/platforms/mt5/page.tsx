import type { Metadata } from "next";

import { PagePlaceholder } from "@/components/dev/page-placeholder";
import { JsonLd } from "@/components/seo/json-ld";
import { getPlatformDefinitionBySlug } from "@/data/selectors";
import {
  createPageMetadata,
  createRouteWebPageJsonLd,
  routeSeoMetadata,
} from "@/lib/seo";

export const metadata: Metadata = createPageMetadata(
  routeSeoMetadata["/platforms/mt5"],
);

const pageJsonLd = createRouteWebPageJsonLd("/platforms/mt5", [
  { name: "Home", path: "/" },
  { name: "Platforms", path: "/platforms" },
  { name: "MT5", path: "/platforms/mt5" },
]);

export default function Mt5Page() {
  const platform = getPlatformDefinitionBySlug("mt5");

  return (
    <>
      <JsonLd data={pageJsonLd} />
      <PagePlaceholder
        title={platform?.label ?? "MT5"}
        description="MT5 product implementation guide foundation for Emerald tools across supported product layers."
      />
    </>
  );
}
