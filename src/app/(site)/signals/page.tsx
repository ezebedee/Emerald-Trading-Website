import type { Metadata } from "next";

import { PagePlaceholder } from "@/components/dev/page-placeholder";
import { JsonLd } from "@/components/seo/json-ld";
import {
  createPageMetadata,
  createRouteWebPageJsonLd,
  routeSeoMetadata,
} from "@/lib/seo";

export const metadata: Metadata = createPageMetadata(
  routeSeoMetadata["/signals"],
);

const pageJsonLd = createRouteWebPageJsonLd("/signals", [
  { name: "Home", path: "/" },
  { name: "Signals", path: "/signals" },
]);

export default function SignalsPage() {
  return (
    <>
      <JsonLd data={pageJsonLd} />
      <PagePlaceholder title="Signal Dashboard" variant="dashboard" />
    </>
  );
}
