import type { Metadata } from "next";
import { redirect } from "next/navigation";

import { JsonLd } from "@/components/seo/json-ld";
import { SystemsCatalogFinalCta } from "@/components/systems/systems-catalog-final-cta";
import { SystemsCatalogHero } from "@/components/systems/systems-catalog-hero";
import { SystemsLayerArchitecture } from "@/components/systems/systems-layer-architecture";
import { SystemsPlatformMatrix } from "@/components/systems/systems-platform-matrix";
import { SystemsProductGrid } from "@/components/systems/systems-product-grid";
import { getSystemsCatalogPageContext } from "@/data/selectors";
import {
  createPageMetadata,
  createRouteWebPageJsonLd,
  routeSeoMetadata,
} from "@/lib/seo";

export const metadata: Metadata = createPageMetadata(
  routeSeoMetadata["/systems"],
);

const pageJsonLd = createRouteWebPageJsonLd("/systems", [
  { name: "Home", path: "/" },
  { name: "Systems & Products", path: "/systems" },
]);

type SystemsPageProps = Readonly<{
  searchParams?: Promise<{
    configuration?: string | string[];
  }>;
}>;

export default async function SystemsPage({ searchParams }: SystemsPageProps) {
  const resolvedSearchParams = await searchParams;

  if (typeof resolvedSearchParams?.configuration === "string") {
    redirect(
      `/systems/quant?configuration=${encodeURIComponent(
        resolvedSearchParams.configuration,
      )}`,
    );
  }

  if (Array.isArray(resolvedSearchParams?.configuration)) {
    redirect("/systems/quant");
  }

  const context = getSystemsCatalogPageContext();

  return (
    <>
      <JsonLd data={pageJsonLd} />
      <SystemsCatalogHero />
      <SystemsProductGrid products={context.products} />
      <SystemsLayerArchitecture
        layers={context.layers}
        workflows={context.workflows}
      />
      <SystemsPlatformMatrix
        platforms={context.platforms}
        products={context.products}
      />
      <SystemsCatalogFinalCta />
    </>
  );
}
