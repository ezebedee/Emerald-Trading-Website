import { Check } from "lucide-react";

import { Badge } from "@/components/ui/badge";
import { Container } from "@/components/ui/container";
import { SectionLabel } from "@/components/ui/section-label";
import type { SystemsCatalogProduct } from "@/data/selectors";
import type { PlatformDefinition } from "@/domain";

type SystemsPlatformMatrixProps = Readonly<{
  products: readonly SystemsCatalogProduct[];
  platforms: readonly PlatformDefinition[];
}>;

export function SystemsPlatformMatrix({
  products,
  platforms,
}: SystemsPlatformMatrixProps) {
  const supportsPlatform = (
    product: SystemsCatalogProduct,
    platform: PlatformDefinition,
  ) => product.platforms.some((supported) => supported.id === platform.id);

  return (
    <section className="py-14 md:py-16 xl:py-20">
      <Container size="wide">
        <div className="max-w-3xl">
          <SectionLabel variant="gold">Platform Availability</SectionLabel>
          <h2 className="type-heading-2 text-foreground mt-4 text-balance">
            Product availability is modeled across the four supported platform
            families.
          </h2>
          <p className="type-body text-muted-foreground mt-5">
            Availability does not mean identical UI, identical workflow, broker
            support, market availability, or documented performance on every
            platform.
          </p>
        </div>

        <div className="mt-8 grid gap-4 lg:hidden">
          {products.map((product) => (
            <article
              key={product.id}
              className="surface-elevated rounded-lg p-5"
            >
              <div className="flex flex-col gap-3 sm:flex-row sm:items-start sm:justify-between">
                <div>
                  <h3 className="text-foreground text-lg font-semibold">
                    {product.name}
                  </h3>
                  <p className="text-muted-foreground mt-2 text-sm">
                    {product.accessModel}
                  </p>
                </div>
                <Badge
                  variant={
                    product.accessModel === "Private Investor"
                      ? "premium"
                      : "neutral"
                  }
                >
                  {product.layer}
                </Badge>
              </div>
              <div className="mt-4 flex flex-wrap gap-2">
                {platforms.map((platform) => (
                  <Badge key={platform.id} variant="neutral">
                    {platform.label}:{" "}
                    {supportsPlatform(product, platform) ? "Yes" : "No"}
                  </Badge>
                ))}
              </div>
            </article>
          ))}
        </div>

        <div className="surface-data mt-8 hidden overflow-hidden rounded-lg lg:block">
          <table className="w-full border-collapse text-left">
            <caption className="sr-only">
              Emerald product availability across MT4, MT5, TradingView, and
              NinjaTrader
            </caption>
            <thead>
              <tr className="border-b border-[var(--border)]">
                <th className="type-label text-subtle-foreground p-4">
                  Product
                </th>
                {platforms.map((platform) => (
                  <th
                    key={platform.id}
                    className="type-label text-subtle-foreground p-4"
                  >
                    {platform.label}
                  </th>
                ))}
                <th className="type-label text-subtle-foreground p-4">
                  Access
                </th>
              </tr>
            </thead>
            <tbody>
              {products.map((product) => (
                <tr
                  key={product.id}
                  className="border-b border-[var(--border)] last:border-b-0"
                >
                  <th className="text-foreground p-4 text-sm font-semibold">
                    {product.name}
                  </th>
                  {platforms.map((platform) => (
                    <td key={platform.id} className="p-4">
                      {supportsPlatform(product, platform) ? (
                        <span className="text-emerald-bright inline-flex items-center gap-2 text-sm font-semibold">
                          <Check aria-hidden="true" className="size-4" />
                          Yes
                        </span>
                      ) : (
                        <span className="text-muted-foreground text-sm">
                          No
                        </span>
                      )}
                    </td>
                  ))}
                  <td className="p-4">
                    <Badge
                      variant={
                        product.accessModel === "Private Investor"
                          ? "premium"
                          : "neutral"
                      }
                    >
                      {product.accessModel}
                    </Badge>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </Container>
    </section>
  );
}
