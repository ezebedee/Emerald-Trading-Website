import type { Metadata } from "next";

import { PagePlaceholder } from "@/components/dev/page-placeholder";
import { JsonLd } from "@/components/seo/json-ld";
import {
  createPageMetadata,
  createRouteWebPageJsonLd,
  routeSeoMetadata,
} from "@/lib/seo";

export const metadata: Metadata = createPageMetadata(
  routeSeoMetadata["/videos"],
);

const pageJsonLd = createRouteWebPageJsonLd("/videos", [
  { name: "Home", path: "/" },
  { name: "Video Archive", path: "/videos" },
]);

export default function VideosPage() {
  return (
    <>
      <JsonLd data={pageJsonLd} />
      <PagePlaceholder title="Video Archive" />
    </>
  );
}
