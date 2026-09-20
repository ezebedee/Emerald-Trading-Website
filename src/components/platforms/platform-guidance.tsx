import { ArrowRight } from "lucide-react";
import { Container } from "@/components/ui/container";
import { SectionLabel } from "@/components/ui/section-label";
import { TextLink } from "@/components/ui/text-link";
import { LinkButton } from "@/components/ui/button";
import {
  platformGuides,
  productGuidanceLinks,
  type PlatformGuideId,
} from "@/data/content/platform-guidance";
import {
  getPlatformGuidanceMatrix,
  availabilityLabel,
} from "@/data/selectors/platform-guidance";
import { portalLoginUrl } from "@/lib/portal";

const sectionClass = "space-y-5 border-t border-[var(--border)] pt-8";
const copyClass = "text-muted-foreground max-w-3xl leading-relaxed";

function PerformanceScope() {
  return (
    <section className={sectionClass}>
      <h2 className="type-heading-3">
        Availability is not performance evidence
      </h2>
      <p className={copyClass}>
        Emerald Quant System documented performance belongs to the current
        Metals / XAUUSD / MT4 configuration, using a Public Demo Reference
        Account. Product availability across platforms does not mean that
        documented performance applies equally across them.
      </p>
      <p className={copyClass}>
        Do not project this record onto MT5, TradingView, NinjaTrader or other
        Emerald products. It does not establish future results.
      </p>
      <TextLink href="/performance">
        Understand the performance evidence
      </TextLink>
    </section>
  );
}

function AccessLinks() {
  return (
    <section className={sectionClass}>
      <h2 className="type-heading-3">Product access and next steps</h2>
      <p className={copyClass}>
        Use the Client Portal for your authorized Emerald account. Valid
        entitlement and platform-specific activation or managed access may be
        required. These guides do not provide public installers; follow the
        instructions supplied with your product access.
      </p>
      <div className="flex flex-wrap items-center gap-6">
        <LinkButton
          href={portalLoginUrl}
          trailingIcon={<ArrowRight size={18} />}
        >
          Client Portal
        </LinkButton>
        <TextLink href="/systems">View products and systems</TextLink>
        <TextLink href="/technology">Explore the technology</TextLink>
      </div>
    </section>
  );
}

export function PlatformsOverview() {
  const matrix = getPlatformGuidanceMatrix();
  return (
    <Container className="space-y-12 py-12 md:space-y-16 md:py-16">
      <header className="max-w-4xl space-y-5">
        <SectionLabel variant="gold">Platform guidance</SectionLabel>
        <h1 className="type-heading-1">
          Emerald tools across trading platforms
        </h1>
        <p className={copyClass}>
          One product family, platform-specific implementations. Compare
          availability, then review the workflow and access guidance for your
          platform. Availability does not imply identical execution, controls or
          licensing.
        </p>
      </header>
      <section className={sectionClass}>
        <h2 className="type-heading-3">Choose your platform</h2>
        <div className="grid gap-6 md:grid-cols-2">
          {matrix.platforms.map((platform) => {
            const guide = platformGuides[platform.id as PlatformGuideId];
            if (!guide) return null;
            return (
              <article
                key={platform.id}
                className="space-y-4 border-l border-[var(--border)] pl-5"
              >
                <h3 className="type-heading-4">{guide.title}</h3>
                <p className={copyClass}>{guide.summary}</p>
                <TextLink href={`/platforms/${platform.slug}`}>
                  {platform.label} guidance
                </TextLink>
              </article>
            );
          })}
        </div>
      </section>
      <section className={sectionClass}>
        <h2 className="type-heading-3">Product availability</h2>
        <p className={copyClass}>
          Available is a product-level catalog status, not a feature-parity or
          installation guarantee. Detailed implementation documentation remains
          planned in the approved model. TradingView delivery uses managed
          access where applicable; the other platforms use their own activation
          and setup guidance.
        </p>
        <div
          className="focus-visible:outline-emerald overflow-x-auto rounded-sm focus-visible:outline-2 focus-visible:outline-offset-4"
          role="region"
          aria-label="Product availability comparison"
          tabIndex={0}
        >
          <table className="w-full min-w-[660px] text-left text-sm">
            <caption className="text-muted-foreground pb-4 text-left">
              Canonical product availability by platform. Access arrangements
              are shown separately from availability.
            </caption>
            <thead>
              <tr className="border-b border-[var(--border)]">
                <th scope="col" className="p-3">
                  Product
                </th>
                {matrix.platforms.map((platform) => (
                  <th key={platform.id} scope="col" className="p-3">
                    {platform.label}
                  </th>
                ))}
              </tr>
            </thead>
            <tbody>
              {matrix.products.map((product) => (
                <tr
                  key={product.id}
                  className="border-b border-[var(--border)]"
                >
                  <th scope="row" className="p-3 font-medium">
                    <TextLink
                      href={productGuidanceLinks[product.id] ?? "/systems"}
                    >
                      {product.name}
                    </TextLink>
                  </th>
                  {product.cells.map((cell) => (
                    <td key={cell.platformId} className="p-3 align-top">
                      <span>{availabilityLabel(cell.availability)}</span>
                      <span className="text-muted-foreground mt-1 block text-xs">
                        {cell.accessModel === "private-investor"
                          ? "Private investor access"
                          : cell.accessModel === "public-subscription"
                            ? "Subscription access"
                            : "Access not documented"}
                      </span>
                    </td>
                  ))}
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </section>
      <section className={sectionClass}>
        <h2 className="type-heading-3">
          Different tools, different responsibilities
        </h2>
        <p className={copyClass}>
          Legacy System provides signals and analysis. Scanner aggregates
          configured signals for monitoring. Recovery Expert follows a
          trader-first-entry, semi-automated trade-management workflow. Quant
          System executes under additional system logic through private investor
          access. These roles do not imply identical execution on each platform.
        </p>
        <TextLink href="/signals">Explore the signal framework</TextLink>
      </section>
      <PerformanceScope />
      <AccessLinks />
    </Container>
  );
}

export function PlatformGuidance({
  platformId,
}: {
  platformId: PlatformGuideId;
}) {
  const guide = platformGuides[platformId];
  const matrix = getPlatformGuidanceMatrix();
  return (
    <Container className="space-y-12 py-12 md:space-y-16 md:py-16">
      <header className="max-w-4xl space-y-5">
        <TextLink href="/platforms" className="block w-fit">
          All platforms
        </TextLink>
        <SectionLabel variant="gold">Platform guidance</SectionLabel>
        <h1 className="type-heading-1">{guide.title}</h1>
        <p className="text-muted-foreground text-lg leading-relaxed">
          {guide.summary}
        </p>
      </header>
      <section className={sectionClass}>
        <h2 className="type-heading-3">Platform workflow</h2>
        <p className={copyClass}>{guide.context}</p>
        <p className={copyClass}>{guide.workflow}</p>
      </section>
      <section className={sectionClass}>
        <h2 className="type-heading-3">
          Product compatibility and implementation
        </h2>
        <p className={copyClass}>
          These are product-level availability records. Detailed implementation
          documentation is still planned; confirm the supported package and
          workflow for your product. Availability alone does not establish
          feature parity.
        </p>
        <div className="grid gap-8 md:grid-cols-2">
          {matrix.products.map((product) => {
            const cell = product.cells.find(
              (item) => item.platformId === platformId,
            );
            return (
              <article
                key={product.id}
                className="space-y-3 border-l border-[var(--border)] pl-5"
              >
                <h3 className="type-heading-4">{product.name}</h3>
                <p className="text-gold-warm text-sm">
                  {availabilityLabel(cell?.availability ?? "not-documented")} ·{" "}
                  {cell?.accessModel === "private-investor"
                    ? "Private investor access"
                    : cell?.accessModel === "public-subscription"
                      ? "Subscription access"
                      : "Access not documented"}
                </p>
                <p className={copyClass}>
                  {cell?.notes ?? "Implementation guidance is not documented."}
                </p>
                <TextLink href={productGuidanceLinks[product.id] ?? "/systems"}>
                  {product.name} details
                </TextLink>
              </article>
            );
          })}
        </div>
      </section>
      <section className={sectionClass}>
        <h2 className="type-heading-3">Setup considerations</h2>
        <p className={copyClass}>
          High-level guidance only. Use the installation instructions supplied
          for your specific product and platform.
        </p>
        <ol className="text-muted-foreground max-w-3xl list-decimal space-y-4 pl-6">
          {guide.steps.map((step) => (
            <li key={step} className="pl-2 leading-relaxed">
              {step}
            </li>
          ))}
        </ol>
      </section>
      <section className={sectionClass}>
        <h2 className="type-heading-3">Access and current scope</h2>
        <p className={copyClass}>{guide.access}</p>
        <p className={copyClass}>{guide.limit}</p>
      </section>
      <PerformanceScope />
      <AccessLinks />
    </Container>
  );
}
