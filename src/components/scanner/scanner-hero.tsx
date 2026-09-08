import { ArrowRight, Radar } from "lucide-react";

import { ScannerProductImage } from "@/components/scanner/scanner-product-image";
import { LinkButton } from "@/components/ui/button";
import { Container } from "@/components/ui/container";
import { SectionLabel } from "@/components/ui/section-label";
import type { SignalScannerPageContext } from "@/data/selectors";

export function ScannerHero({
  product,
  assets,
}: Pick<SignalScannerPageContext, "product" | "assets">) {
  return (
    <section className="border-b border-[var(--border)] py-14 md:py-18 xl:py-24">
      <Container size="wide">
        <div className="grid gap-10 lg:grid-cols-[0.82fr_1.18fr] lg:items-center">
          <div>
            <SectionLabel variant="gold">Emerald Signal Scanner</SectionLabel>
            <h1 className="type-display text-foreground mt-5 text-balance">
              Multi-symbol signal monitoring from one Scanner dashboard.
            </h1>
            <p className="type-body-large text-muted-foreground mt-6 max-w-3xl">
              {product?.name ?? "Emerald Signal Scanner"} monitors selected
              instruments and selected Emerald signal modules, then helps users
              filter fresh signal context and open the related chart for review.
            </p>
            <div className="mt-6 flex flex-wrap gap-2">
              <span className="type-label text-gold-warm rounded-full border border-[var(--border-gold)] bg-[var(--gold-soft)] px-3 py-1.5">
                Configure - Select - Scan & Filter - Open Chart
              </span>
              <span className="type-label bg-surface-soft text-muted-foreground rounded-full border border-[var(--border)] px-3 py-1.5">
                Public Subscription
              </span>
            </div>
            <div className="mt-8 flex flex-col gap-3 sm:flex-row">
              <LinkButton
                href="/signals"
                size="lg"
                leadingIcon={<Radar aria-hidden="true" />}
                trailingIcon={<ArrowRight aria-hidden="true" />}
              >
                Explore Signal Library
              </LinkButton>
              <LinkButton
                href="/platforms"
                variant="secondary"
                size="lg"
                trailingIcon={<ArrowRight aria-hidden="true" />}
              >
                View Platforms
              </LinkButton>
            </div>
          </div>
          <ScannerProductImage
            asset={assets.dashboard}
            caption="Signal Results Dashboard - MT4"
            priority
            sizes="(min-width: 1280px) 58vw, (min-width: 1024px) 54vw, 100vw"
          />
        </div>
      </Container>
    </section>
  );
}
