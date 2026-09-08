import Image from "next/image";
import { ArrowRight } from "lucide-react";

import { Badge } from "@/components/ui/badge";
import { LinkButton } from "@/components/ui/button";
import { Container } from "@/components/ui/container";
import { SectionLabel } from "@/components/ui/section-label";
import type { SystemsCatalogProduct } from "@/data/selectors";

type SystemsProductGridProps = Readonly<{
  products: readonly SystemsCatalogProduct[];
}>;

export function SystemsProductGrid({ products }: SystemsProductGridProps) {
  return (
    <section
      id="product-catalog"
      className="scroll-anchor py-14 md:py-16 xl:py-20"
    >
      <Container size="wide">
        <div className="max-w-3xl">
          <SectionLabel variant="gold">Product Ecosystem</SectionLabel>
          <h2 className="type-heading-2 text-foreground mt-4 text-balance">
            Systems & Products
          </h2>
          <p className="type-body text-muted-foreground mt-5">
            The catalog separates public subscription tools from private
            automated system access while keeping platform availability and
            performance ownership distinct.
          </p>
        </div>

        <div className="mt-8 grid gap-5 lg:grid-cols-2">
          {products.map((product) => (
            <article
              key={product.id}
              className={
                product.accessModel === "Private Investor"
                  ? "surface-premium flex min-h-full flex-col overflow-hidden rounded-lg"
                  : "surface-elevated flex min-h-full flex-col overflow-hidden rounded-lg"
              }
            >
              {product.asset ? (
                <figure>
                  <div className="aspect-[16/9] overflow-hidden border-b border-[var(--border)] bg-black/20">
                    <Image
                      src={product.asset.src}
                      alt={product.asset.alt}
                      width={product.asset.width}
                      height={product.asset.height}
                      sizes="(min-width: 1024px) 50vw, 100vw"
                      className="h-full w-full object-cover"
                    />
                  </div>
                  <figcaption className="sr-only">
                    {product.assetCaption}
                  </figcaption>
                </figure>
              ) : null}

              <div className="flex flex-1 flex-col p-5 md:p-6">
                <div className="flex flex-wrap gap-2">
                  <Badge
                    variant={
                      product.accessModel === "Private Investor"
                        ? "premium"
                        : "neutral"
                    }
                  >
                    {product.accessModel}
                  </Badge>
                  <Badge variant="neutral">{product.layer}</Badge>
                  {product.isTemporaryAsset ? (
                    <Badge variant="neutral">Conceptual Preview</Badge>
                  ) : null}
                </div>

                <h3 className="text-foreground mt-4 text-2xl font-semibold">
                  {product.name}
                </h3>
                <p className="text-gold-warm mt-3 text-sm font-semibold">
                  {product.role}
                </p>
                <p className="text-muted-foreground mt-3 text-sm leading-6">
                  {product.description}
                </p>

                <div className="mt-5 flex flex-wrap gap-2">
                  {product.platforms.map((platform) => (
                    <Badge key={platform.id} variant="neutral">
                      {platform.label}
                    </Badge>
                  ))}
                </div>

                <ul className="text-muted-foreground mt-5 grid gap-2 text-sm leading-6">
                  {product.capabilityIntents.map((intent) => (
                    <li key={intent} className="flex gap-2">
                      <span
                        aria-hidden="true"
                        className="mt-2 size-1.5 shrink-0 rounded-full bg-[var(--emerald)]"
                      />
                      <span>{intent}</span>
                    </li>
                  ))}
                </ul>

                {product.evidenceNote ? (
                  <p className="text-muted-foreground mt-5 text-sm leading-6">
                    {product.evidenceNote}
                  </p>
                ) : null}

                <div className="mt-auto flex flex-col gap-3 pt-6 sm:flex-row">
                  <LinkButton
                    href={product.href}
                    className="h-auto min-h-12 w-full px-4 py-3 text-center text-sm leading-6 whitespace-normal sm:w-auto sm:text-base [&>span]:whitespace-normal"
                    variant={
                      product.accessModel === "Private Investor"
                        ? "premium"
                        : "secondary"
                    }
                    trailingIcon={<ArrowRight aria-hidden="true" />}
                  >
                    {product.cta}
                  </LinkButton>
                  {product.id === "emerald-quant-system-product" ? (
                    <LinkButton
                      href="/private-access"
                      className="h-auto min-h-12 w-full px-4 py-3 text-center text-sm leading-6 whitespace-normal sm:w-auto sm:text-base [&>span]:whitespace-normal"
                      variant="secondary"
                    >
                      Request Private Access
                    </LinkButton>
                  ) : null}
                </div>
              </div>
            </article>
          ))}
        </div>
      </Container>
    </section>
  );
}
