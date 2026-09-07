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
  routeSeoMetadata["/platforms/mt4"],
);

const pageJsonLd = createRouteWebPageJsonLd("/platforms/mt4", [
  { name: "Home", path: "/" },
  { name: "Platforms", path: "/platforms" },
  { name: "MT4", path: "/platforms/mt4" },
]);

export default function Mt4Page() {
  const platform = getPlatformDefinitionBySlug("mt4");

  return (
    <>
      <JsonLd data={pageJsonLd} />
      <PagePlaceholder
        title={platform?.label ?? "MT4"}
        description="MT4 product implementation guide foundation for Emerald tools across supported product layers."
      />
    </>
  );
}
