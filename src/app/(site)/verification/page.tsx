import type { Metadata } from "next";

import { PagePlaceholder } from "@/components/dev/page-placeholder";
import { JsonLd } from "@/components/seo/json-ld";
import {
  createPageMetadata,
  createRouteWebPageJsonLd,
  routeSeoMetadata,
} from "@/lib/seo";

export const metadata: Metadata = createPageMetadata(
  routeSeoMetadata["/verification"],
);

const pageJsonLd = createRouteWebPageJsonLd("/verification", [
  { name: "Home", path: "/" },
  { name: "Performance Verification", path: "/verification" },
]);

export default function VerificationPage() {
  return (
    <>
      <JsonLd data={pageJsonLd} />
      <PagePlaceholder title="Performance Verification" />
    </>
  );
}
