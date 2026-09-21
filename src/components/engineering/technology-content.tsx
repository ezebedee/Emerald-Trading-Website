import { ArrowRight, Layers } from "lucide-react";
import { LinkButton } from "@/components/ui/button";
import { SectionLabel } from "@/components/ui/section-label";
import { TextLink } from "@/components/ui/text-link";
import { technologyResponsibilities } from "@/data/content/engineering";
import {
  getPublicTradingProducts,
  getPublicSignalModules,
  getPublicPlatformDefinitions,
} from "@/data/selectors/products";
import { EngineeringLayout, EngineeringSection } from "./content-layout";

export function TechnologyContent() {
  const products = getPublicTradingProducts();
  const signals = getPublicSignalModules();
  const platforms = getPublicPlatformDefinitions();
  return (
    <EngineeringLayout
      label="Technology / System engineering"
      title="Engineering architecture for quantitative trading systems"
      introduction="Emerald Legacy Systems separates signal information, monitoring, assisted management and automated execution. Distinct product responsibilities keep the signal framework from being mistaken for a single monolithic trading strategy."
    >
      <EngineeringSection title="Separate responsibilities, connected products">
        <p className="text-muted-foreground max-w-3xl leading-relaxed">
          This is a conceptual responsibility map, not a sequence that sends
          every signal through every product. Platform adaptation and access
          concerns support the relevant implementation; documented results
          remain a separate evidence layer.
        </p>
        <div className="grid gap-4 md:grid-cols-2">
          {technologyResponsibilities.map((item) => {
            const product =
              "productId" in item
                ? products.find((product) => product.id === item.productId)
                : undefined;
            return (
              <article
                key={item.title}
                className="bg-surface rounded-lg border border-[var(--border)] p-6"
              >
                <SectionLabel variant="gold">{item.context}</SectionLabel>
                <h3 className="mt-3 text-xl font-semibold">{item.title}</h3>
                {product ? (
                  <p className="mt-2 text-sm font-medium">{product.name}</p>
                ) : null}
                <p className="text-muted-foreground mt-3 leading-relaxed">
                  {item.text}
                </p>
                {"href" in item ? (
                  <TextLink
                    href={item.href}
                    className="mt-4 inline-block text-sm"
                  >
                    {item.link}
                  </TextLink>
                ) : null}
              </article>
            );
          })}
        </div>
        <TextLink href="/systems">
          View the product catalog and execution roles
        </TextLink>
      </EngineeringSection>
      <EngineeringSection title="A multi-signal framework, not one entry rule">
        <p className="text-muted-foreground max-w-3xl leading-relaxed">
          The published module roles describe distinct forms of signal context.
          Harmonizer combines Scalp Signal and Range Signal outputs; the public
          model does not specify weighting, voting or probability mechanics.
          Harmonizer SAFE is an auxiliary defensive helper, not a guarantee
          against loss.
        </p>
        <dl className="grid gap-x-8 sm:grid-cols-2 lg:grid-cols-3">
          {signals.map((signal) => (
            <div
              key={signal.id}
              className="border-b border-[var(--border)] py-5"
            >
              <dt className="font-semibold">
                {signal.name}{" "}
                <span className="text-gold-warm text-sm font-normal">
                  / {signal.role === "auxiliary" ? "Auxiliary" : "Primary"}
                </span>
              </dt>
              <dd className="text-muted-foreground mt-2 text-sm leading-relaxed">
                {signal.description}
              </dd>
            </div>
          ))}
        </dl>
      </EngineeringSection>
      <EngineeringSection title="Signal information is not an immediate order">
        <div className="grid gap-8 md:grid-cols-2">
          <div className="space-y-4">
            <Layers aria-hidden="true" className="text-gold-warm size-6" />
            <h3 className="text-xl font-semibold">
              Interpretation, execution and position state
            </h3>
            <p className="text-muted-foreground leading-relaxed">
              Quant&apos;s published capabilities include signal interpretation,
              automated trade execution, risk-management logic, position
              management and trade lifecycle management. An implementation must
              account for execution conditions and platform constraints; an
              indicator example alone does not describe these responsibilities.
            </p>
          </div>
          <div className="space-y-4">
            <h3 className="text-xl font-semibold">Safeguards have limits</h3>
            <p className="text-muted-foreground leading-relaxed">
              Exact entry conditions, risk limits, recovery rules and
              implementation safeguards are not specified here. Risk-management
              logic is a responsibility, not a promise of loss prevention.
              Recovery Expert&apos;s trader-first-entry workflow remains
              separate from Quant automation.
            </p>
            <p className="text-muted-foreground leading-relaxed">
              No proprietary formula, threshold or source code is needed to
              explain these boundaries. This website documents the products; it
              does not generate signals or execute trades.
            </p>
          </div>
        </div>
      </EngineeringSection>
      <EngineeringSection title="Platform availability is not identical implementation">
        <div className="flex flex-wrap gap-3">
          {platforms.map((platform) => (
            <span
              key={platform.id}
              className="border-b border-[var(--border-gold)] px-1 py-2 font-semibold"
            >
              {platform.label}
            </span>
          ))}
        </div>
        <div className="grid gap-8 md:grid-cols-2">
          <div>
            <h3 className="text-xl font-semibold">MetaTrader chart context</h3>
            <p className="text-muted-foreground mt-3 leading-relaxed">
              For Legacy System and Scanner, the published MT4 / MT5 notes
              describe support for FineScalp custom high-resolution tick and
              seconds-chart workflows. Indicator presentation and expert-advisor
              trade management have different responsibilities.
            </p>
          </div>
          <div>
            <h3 className="text-xl font-semibold">
              TradingView and NinjaTrader context
            </h3>
            <p className="text-muted-foreground mt-3 leading-relaxed">
              Legacy System and Scanner can use native FineScalp high-resolution
              chart capability where available. MetaTrader offline/custom-chart
              mechanics are not implied. Product availability does not establish
              identical settings, interfaces or execution mechanisms.
            </p>
          </div>
        </div>
        <p className="text-muted-foreground max-w-3xl leading-relaxed">
          FineScalp capability is not attributed to Recovery Expert or Quant.
          Detailed platform implementation documentation remains planned.
          Quant&apos;s public performance configuration remains Metals / XAUUSD
          on MT4; availability on another platform does not establish results
          there.
        </p>
      </EngineeringSection>
      <EngineeringSection title="Access, observation and documented iteration">
        <p className="text-muted-foreground max-w-3xl leading-relaxed">
          Licensing and entitlements concern access to a product on a platform,
          not its signal meaning or a guarantee of trading behavior. Validation
          protocols and enforcement details belong in platform and portal
          engineering documentation, not this public overview.
        </p>
        <p className="text-muted-foreground max-w-3xl leading-relaxed">
          Scanner monitoring concerns configured signals. It is not evidence of
          a continuously monitored production service. The current Public Demo
          Reference Account supplies a Forward Performance Record for the stated
          Quant configuration; the website publishes static documentation, not a
          continuous trading feed.
        </p>
        <p className="text-muted-foreground max-w-3xl leading-relaxed">
          Moving from a research concept toward production calls for
          implementation validation, evidence review and documented iteration.
          Production monitoring, where applicable, needs its own defined scope;
          no operational coverage or completed stage is inferred from a product
          listing.
        </p>
        <div className="flex flex-wrap items-center gap-6">
          <LinkButton
            href="/research"
            trailingIcon={<ArrowRight aria-hidden="true" />}
          >
            Read the research approach
          </LinkButton>
          <TextLink href="/verification">
            Read verification methodology
          </TextLink>
        </div>
      </EngineeringSection>
    </EngineeringLayout>
  );
}
