import Link from "next/link";
import { ArrowRight, GitBranch, LineChart, RadioTower } from "lucide-react";

import { Badge } from "@/components/ui/badge";
import { Container } from "@/components/ui/container";
import { SectionLabel } from "@/components/ui/section-label";
import type { SystemsPagePrimarySystem } from "@/data/selectors";

type SystemRelationshipOverviewProps = Readonly<{
  system?: SystemsPagePrimarySystem;
}>;

type RelationshipCard = Readonly<{
  label: string;
  title: string;
  description: string;
  href?: string;
  linkLabel?: string;
  icon: typeof LineChart;
}>;

const relationArrow = (
  <ArrowRight
    aria-hidden="true"
    className="text-subtle-foreground hidden size-5 shrink-0 xl:block"
  />
);

function RelationshipCard({ card }: { card: RelationshipCard }) {
  const Icon = card.icon;

  return (
    <article className="surface-elevated rounded-lg p-5 md:p-6">
      <div className="flex items-start justify-between gap-4">
        <Badge variant="neutral">{card.label}</Badge>
        <Icon aria-hidden="true" className="text-gold-warm size-5 shrink-0" />
      </div>
      <h3 className="type-heading-4 text-foreground mt-5 text-balance">
        {card.title}
      </h3>
      <p className="text-muted-foreground mt-4 text-sm leading-6">
        {card.description}
      </p>
      {card.href && card.linkLabel ? (
        <Link
          className="focus-emerald text-emerald-bright mt-5 inline-flex items-center gap-2 text-sm font-semibold"
          href={card.href}
        >
          {card.linkLabel}
          <ArrowRight aria-hidden="true" className="size-4" />
        </Link>
      ) : null}
    </article>
  );
}

function EmptyRelationshipState() {
  return (
    <section className="bg-background border-t border-[var(--border)] py-12 md:py-14 xl:py-16">
      <Container size="wide">
        <div className="surface-elevated rounded-lg p-5 md:p-6">
          <SectionLabel variant="gold">System Relationships</SectionLabel>
          <h2 className="type-heading-2 text-foreground mt-4 text-balance">
            Signals are inputs. System execution is broader.
          </h2>
          <p className="type-body text-muted-foreground mt-5">
            Public system relationship details are not currently available.
          </p>
        </div>
      </Container>
    </section>
  );
}

export function SystemRelationshipOverview({
  system,
}: SystemRelationshipOverviewProps) {
  if (!system) {
    return <EmptyRelationshipState />;
  }

  const relationshipCards: RelationshipCard[] = [
    ...(system.relatedIndicator
      ? [
          {
            label: "Indicator Layer",
            title: system.relatedIndicator.name,
            description: system.relatedIndicator.role,
            href: system.relatedIndicator.href,
            linkLabel: "Explore Indicators",
            icon: LineChart,
          },
        ]
      : []),
    ...(system.relatedSignal
      ? [
          {
            label: "Signal Context",
            title: system.relatedSignal.name,
            description: system.relatedSignal.role,
            href: system.relatedSignal.href,
            linkLabel: "View Signals",
            icon: RadioTower,
          },
        ]
      : []),
    {
      label: "System Layer",
      title: system.name,
      description:
        "Signals inform the system; execution is governed by a broader rule set covering rules, risk logic, and trade handling.",
      icon: GitBranch,
    },
  ];

  return (
    <section className="bg-background border-t border-[var(--border)] py-12 md:py-14 xl:py-16">
      <Container size="wide">
        <div className="max-w-3xl">
          <SectionLabel variant="gold">System Relationships</SectionLabel>
          <h2 className="type-heading-2 text-foreground mt-4 text-balance">
            Signals are inputs. System execution is broader.
          </h2>
          <p className="type-body text-muted-foreground mt-5">
            The Emerald Signal Indicator and Emerald Directional Signal Stream
            provide signal context. The Emerald Quant System applies system
            rules, risk logic, and execution handling around those inputs.
          </p>
        </div>

        <div className="mt-8 grid gap-4 xl:grid-cols-[1fr_auto_1fr_auto_1fr] xl:items-stretch">
          {relationshipCards.map((card, index) => (
            <div
              key={card.title}
              className="contents xl:[&:not(:last-child)]:contents"
            >
              <RelationshipCard card={card} />
              {index < relationshipCards.length - 1 ? relationArrow : null}
            </div>
          ))}
        </div>
      </Container>
    </section>
  );
}
