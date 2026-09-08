import type { Metadata } from "next";

import { RecoveryEcosystem } from "@/components/recovery-expert/recovery-ecosystem";
import { RecoveryFinalCta } from "@/components/recovery-expert/recovery-final-cta";
import { RecoveryHero } from "@/components/recovery-expert/recovery-hero";
import { RecoveryManagementScope } from "@/components/recovery-expert/recovery-management-scope";
import { RecoveryObjectiveBoundary } from "@/components/recovery-expert/recovery-objective-boundary";
import { RecoveryPlatforms } from "@/components/recovery-expert/recovery-platforms";
import { RecoveryTraderFirstSection } from "@/components/recovery-expert/recovery-trader-first-section";
import { RecoveryVsQuant } from "@/components/recovery-expert/recovery-vs-quant";
import { RecoveryWorkflow } from "@/components/recovery-expert/recovery-workflow";
import { JsonLd } from "@/components/seo/json-ld";
import { getRecoveryExpertPageContext } from "@/data/selectors";
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
  { name: "Systems & Products", path: "/systems" },
  { name: "Emerald Recovery Expert", path: "/recovery-expert" },
]);

export default function RecoveryExpertPage() {
  const context = getRecoveryExpertPageContext();

  return (
    <>
      <JsonLd data={pageJsonLd} />
      <RecoveryHero
        product={context.product}
        platforms={context.platforms}
        asset={context.placeholderAsset}
        isTemporaryAsset={context.isTemporaryAsset}
      />
      <RecoveryTraderFirstSection />
      <RecoveryWorkflow />
      <RecoveryManagementScope />
      <RecoveryObjectiveBoundary />
      <RecoveryVsQuant />
      <RecoveryEcosystem
        currentProductId={context.product?.id}
        relatedProducts={context.relatedProducts}
      />
      <RecoveryPlatforms platforms={context.platforms} />
      <RecoveryFinalCta />
    </>
  );
}
