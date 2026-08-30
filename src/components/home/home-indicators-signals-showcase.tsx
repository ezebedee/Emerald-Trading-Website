import Image from "next/image";
import Link from "next/link";
import {
  ArrowRight,
  BarChart3,
  GitBranch,
  Layers3,
  ListTree,
} from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { LinkButton } from "@/components/ui/button";
import { Container } from "@/components/ui/container";
import { SectionLabel } from "@/components/ui/section-label";
import {
  getFeaturedAssetForIndicator,
  getHomepageFeaturedIndicator,
  getHomepageFeaturedSignalProduct,
  getPublicIndicatorsForSignal,
  getPublicSignalsForIndicator,
  getPublicSystemsForIndicator,
  getPublicSystemsForSignal,
} from "@/data/selectors";
import type { IndicatorDefinition, SignalProduct } from "@/domain";
import type { ImageAsset } from "@/types/assets";

const marketCategoryLabels: Record<string, string> = {
  metals: "Metals",
};

const signalCategoryLabels = {
  directional: "Directional",
  entry: "Entry",
  exit: "Exit",
  trend: "Trend",
  momentum: "Momentum",
  reversal: "Reversal",
  risk: "Risk",
  other: "Other",
} as const;

const capabilityIcons = [BarChart3, Layers3, GitBranch, ListTree] as const;

const formatMarketCategory = (category: string) =>
  marketCategoryLabels[category] ?? category;

const formatCapability = (capability: string) =>
  capability.charAt(0).toUpperCase() + capability.slice(1);

const getMarketBadges = (
  product: Pick<
    IndicatorDefinition | SignalProduct,
    "instruments" | "marketCategories"
  >,
) => [
  ...(product.instruments ?? []),
  ...product.marketCategories.map(formatMarketCategory),
];

const getImageAsset = (
  asset: ReturnType<typeof getFeaturedAssetForIndicator>,
) => (asset?.kind === "image" ? (asset as ImageAsset) : undefined);

function ProductCapabilities({
  capabilities,
}: {
  capabilities?: readonly string[];
}) {
  const visibleCapabilities = (capabilities ?? []).slice(0, 4);

  if (visibleCapabilities.length === 0) {
    return null;
  }

  return (
    <ul className="mt-6 grid gap-3">
      {visibleCapabilities.map((capability, index) => {
        const Icon = capabilityIcons[index % capabilityIcons.length];

        return (
          <li
            key={capability}
            className="bg-surface/70 flex items-start gap-3 rounded-md border border-[var(--border)] p-3.5"
          >
            <Icon
              aria-hidden="true"
              className="text-gold-warm mt-0.5 size-4 shrink-0"
            />
            <span className="text-muted-foreground text-sm leading-6">
              {formatCapability(capability)}
            </span>
          </li>
        );
      })}
    </ul>
  );
}

function EmptyIndicatorsSignalsShowcase() {
  return (
    <section className="bg-surface/70 border-y border-[var(--border)] py-14 md:py-16 xl:py-20">
      <Container size="wide">
        <div className="max-w-3xl">
          <SectionLabel variant="gold">Indicators & Signals</SectionLabel>
          <h2 className="type-heading-2 text-foreground mt-4 max-w-4xl text-balance">
            Signal-generation and market-analysis tools built to support
            systematic decision-making.
          </h2>
          <p className="type-body text-muted-foreground mt-5 max-w-2xl">
            Public indicator and signal product details are not currently
            available on the homepage.
          </p>
          <div className="mt-6 flex flex-col gap-3 sm:flex-row">
            <LinkButton
              href="/indicators"
              size="lg"
              trailingIcon={<ArrowRight aria-hidden="true" />}
            >
              Explore Indicators
            </LinkButton>
            <LinkButton href="/signals" variant="secondary" size="lg">
              View Signals
            </LinkButton>
          </div>
        </div>
      </Container>
    </section>
  );
}

function IndicatorCard({
  indicator,
  image,
}: {
  indicator: IndicatorDefinition;
  image?: ImageAsset;
}) {
  const relatedSystems = getPublicSystemsForIndicator(indicator.id);
  const relatedSignals = getPublicSignalsForIndicator(indicator.id);
  const marketBadges = getMarketBadges(indicator);

  return (
    <article className="surface-elevated flex min-h-full flex-col overflow-hidden rounded-lg">
      <div className="p-5 md:p-6">
        <Badge variant="neutral">Signal-Generating Indicator</Badge>
        <h3 className="type-heading-3 text-foreground mt-4 text-balance">
          {indicator.name}
        </h3>
        <p className="type-body-small text-muted-foreground mt-4">
          {indicator.description}
        </p>

        <div className="mt-5 flex flex-wrap gap-2">
          {indicator.platforms.map((platform) => (
            <Badge key={platform} variant="neutral">
              {platform}
            </Badge>
          ))}
          {marketBadges.map((market) => (
            <Badge key={market} variant="neutral">
              {market}
            </Badge>
          ))}
        </div>

        <ProductCapabilities capabilities={indicator.capabilities} />

        <p className="text-muted-foreground mt-6 text-sm leading-6">
          Related to {relatedSystems[0]?.name ?? "the trading system layer"} and{" "}
          {relatedSignals[0]?.name ?? "the directional signal layer"} as an
          analytical input, not a standalone execution system.
        </p>
      </div>

      {image ? (
        <div className="mt-auto border-t border-[var(--border)] bg-black/20 p-3">
          <Image
            src={image.src}
            alt={image.alt}
            width={image.width}
            height={image.height}
            sizes="(min-width: 1024px) 50vw, 100vw"
            className="h-auto w-full rounded-md border border-[var(--border)]"
          />
        </div>
      ) : (
        <div
          aria-hidden="true"
          className="surface-data mx-5 mt-auto mb-5 min-h-48 rounded-md p-4 md:mx-6 md:mb-6"
        >
          <div className="grid h-full min-h-40 content-center gap-4">
            <div className="h-px bg-[var(--border-emerald)]" />
            <div className="ml-auto h-px w-4/5 bg-[var(--border-gold)]" />
            <div className="h-px w-3/5 bg-[var(--border-emerald)]" />
          </div>
        </div>
      )}
    </article>
  );
}

function SignalCard({ signal }: { signal: SignalProduct }) {
  const relatedSystems = getPublicSystemsForSignal(signal.id);
  const relatedIndicators = getPublicIndicatorsForSignal(signal.id);
  const marketBadges = getMarketBadges(signal);

  return (
    <article className="surface-elevated flex min-h-full flex-col rounded-lg p-5 md:p-6">
      <Badge variant="neutral">Directional Signal Stream</Badge>
      <h3 className="type-heading-3 text-foreground mt-4 text-balance">
        {signal.name}
      </h3>
      <p className="type-body-small text-muted-foreground mt-4">
        {signal.description}
      </p>

      <div className="mt-5 flex flex-wrap gap-2">
        <Badge variant="premium">
          {signalCategoryLabels[signal.signalCategory]} Signals
        </Badge>
        {signal.deliveryMethods?.map((deliveryMethod) => (
          <Badge key={deliveryMethod} variant="neutral">
            {formatCapability(deliveryMethod)}
          </Badge>
        ))}
        {signal.platforms.map((platform) => (
          <Badge key={platform} variant="neutral">
            {platform}
          </Badge>
        ))}
        {marketBadges.map((market) => (
          <Badge key={market} variant="neutral">
            {market}
          </Badge>
        ))}
      </div>

      <ProductCapabilities capabilities={signal.capabilities} />

      <div aria-hidden="true" className="surface-data mt-6 rounded-lg p-4">
        <div className="grid gap-3">
          {["Directional Input", "Chart Context", "System Relationship"].map(
            (item, index) => (
              <div
                key={item}
                className="bg-surface-elevated/90 flex items-center justify-between rounded-md border border-[var(--border-strong)] px-3 py-3"
              >
                <span className="text-foreground text-sm font-semibold">
                  {item}
                </span>
                <span className="numeric text-subtle-foreground text-xs">
                  0{index + 1}
                </span>
              </div>
            ),
          )}
        </div>
      </div>

      <p className="text-muted-foreground mt-6 text-sm leading-6">
        Related to {relatedSystems[0]?.name ?? "the trading system layer"}
        {relatedIndicators[0] ? ` and ${relatedIndicators[0].name}` : ""} as
        structured directional context.
      </p>

      <div className="mt-auto pt-6">
        <Link
          href="/systems"
          className="focus-emerald transition-standard text-emerald-bright hover:text-foreground inline-flex min-h-10 items-center text-sm font-semibold underline decoration-[var(--border-emerald)] underline-offset-4"
        >
          Explore the Trading System
        </Link>
      </div>
    </article>
  );
}

export function HomeIndicatorsSignalsShowcase() {
  const indicator = getHomepageFeaturedIndicator();
  const signal = getHomepageFeaturedSignalProduct();
  const indicatorImage = indicator
    ? getImageAsset(getFeaturedAssetForIndicator(indicator.id))
    : undefined;

  if (!indicator && !signal) {
    return <EmptyIndicatorsSignalsShowcase />;
  }

  return (
    <section className="bg-surface/70 border-y border-[var(--border)] py-14 md:py-16 xl:py-20">
      <Container size="wide">
        <div className="max-w-3xl">
          <SectionLabel variant="gold">Indicators & Signals</SectionLabel>
          <h2 className="type-heading-2 text-foreground mt-4 max-w-4xl text-balance">
            Signal-generation and market-analysis tools built to support
            systematic decision-making.
          </h2>
          <p className="type-body text-muted-foreground mt-5 max-w-2xl">
            Emerald indicator and signal products provide analytical and
            directional inputs that may inform the broader Emerald Quant System
            without replacing full system rules, risk logic, or execution.
          </p>
        </div>

        <div className="mt-8 grid gap-5 lg:grid-cols-2">
          {indicator ? (
            <IndicatorCard indicator={indicator} image={indicatorImage} />
          ) : (
            <div className="surface-elevated rounded-lg p-5 md:p-6">
              <p className="type-body text-muted-foreground">
                Public indicator details are not currently available.
              </p>
            </div>
          )}

          {signal ? (
            <SignalCard signal={signal} />
          ) : (
            <div className="surface-elevated rounded-lg p-5 md:p-6">
              <p className="type-body text-muted-foreground">
                Public signal stream details are not currently available.
              </p>
            </div>
          )}
        </div>

        <div className="mt-8 flex flex-col gap-3 sm:flex-row">
          <LinkButton
            href="/indicators"
            size="lg"
            trailingIcon={<ArrowRight aria-hidden="true" />}
          >
            Explore Indicators
          </LinkButton>
          <LinkButton href="/signals" variant="secondary" size="lg">
            View Signals
          </LinkButton>
        </div>
      </Container>
    </section>
  );
}
