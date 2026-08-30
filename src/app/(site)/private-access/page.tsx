import type { Metadata } from "next";

import { PagePlaceholder } from "@/components/dev/page-placeholder";
import { JsonLd } from "@/components/seo/json-ld";
import {
  createPageMetadata,
  createRouteWebPageJsonLd,
  routeSeoMetadata,
} from "@/lib/seo";

export const metadata: Metadata = createPageMetadata(
  routeSeoMetadata["/private-access"],
);

const pageJsonLd = createRouteWebPageJsonLd("/private-access", [
  { name: "Home", path: "/" },
  { name: "Private Access", path: "/private-access" },
]);

export default function PrivateAccessPage() {
  return (
    <>
      <JsonLd data={pageJsonLd} />
      <PagePlaceholder title="Private Access" />
    </>
  );
}
