import type { Metadata } from "next";

import { VerificationMethodology } from "@/components/performance/verification-methodology";
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
  { name: "Verification Methodology", path: "/verification" },
]);

export default function VerificationPage() {
  return (
    <>
      <JsonLd data={pageJsonLd} />
      <VerificationMethodology />
    </>
  );
}
