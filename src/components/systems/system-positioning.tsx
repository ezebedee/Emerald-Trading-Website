import { Database, Monitor, Shapes, Target } from "lucide-react";

import { Badge } from "@/components/ui/badge";
import { Container } from "@/components/ui/container";
import { SectionLabel } from "@/components/ui/section-label";
import type { SystemsPagePrimarySystem } from "@/data/selectors";

type SystemPositioningProps = Readonly<{
  system?: SystemsPagePrimarySystem;
}>;

const positioningIcons = [Shapes, Monitor, Target, Database] as const;

function EmptyPositioningState() {
  return (
    <section className="bg-surface/70 border-t border-[var(--border)] py-12 md:py-14 xl:py-16">
      <Container size="wide">
        <div className="surface-elevated rounded-lg p-5 md:p-6">
          <SectionLabel variant="gold">System Positioning</SectionLabel>
          <h2 className="type-heading-2 text-foreground mt-4 text-balance">
            A full trading-system layer, not simply a signal indicator.
          </h2>
          <p className="type-body text-muted-foreground mt-5">
            Public system positioning is not currently available.
          </p>
        </div>
      </Container>
    </section>
  );
}

export function SystemPositioning({ system }: SystemPositioningProps) {
  if (!system) {
    return <EmptyPositioningState />;
  }

  const positioningItems = [
    {
      term: "System Type",
      value: system.systemType,
      description:
        "The product is positioned as a broader algorithmic system layer rather than a standalone chart signal.",
      badgeVariant: "neutral" as const,
    },
    {
      term: "Platform",
      value: system.platforms.join(" / "),
      description:
        "Platform support is taken from the system record, separate from indicator platform coverage.",
      badgeVariant: "info" as const,
    },
    {
      term: "Market Scope",
      value: [...system.markets, ...system.instruments].join(" / "),
      description:
        "The current public system scope is limited to its canonical market and instrument.",
      badgeVariant: "premium" as const,
    },
    {
      term: "Public Record",
      value: system.publicRecordLabel,
      description:
        "Documented public Forward Performance is maintained separately in the Emerald Ledger.",
      badgeVariant: "positive" as const,
    },
  ];

  return (
    <section className="bg-surface/70 border-t border-[var(--border)] py-12 md:py-14 xl:py-16">
      <Container size="wide">
        <div className="grid gap-8 xl:grid-cols-[minmax(0,0.34fr)_minmax(0,0.66fr)]">
          <div className="max-w-3xl">
            <SectionLabel variant="gold">System Positioning</SectionLabel>
            <h2 className="type-heading-2 text-foreground mt-4 text-balance">
              A full trading-system layer, not simply a signal indicator.
            </h2>
            <p className="type-body text-muted-foreground mt-5">
              {system.name} coordinates signal interpretation, system rules,
              risk-management logic, and execution handling as one system-level
              architecture.
            </p>
          </div>

          <dl className="grid gap-4 md:grid-cols-2">
            {positioningItems.map((item, index) => {
              const Icon = positioningIcons[index];

              return (
                <div
                  key={item.term}
                  className="surface-elevated rounded-lg p-5"
                >
                  <dt className="flex items-center justify-between gap-4">
                    <span className="type-label text-subtle-foreground">
                      {item.term}
                    </span>
                    <Icon
                      aria-hidden="true"
                      className="text-gold-warm size-5 shrink-0"
                    />
                  </dt>
                  <dd className="mt-4">
                    <Badge variant={item.badgeVariant}>{item.value}</Badge>
                    <p className="text-muted-foreground mt-4 text-sm leading-6">
                      {item.description}
                    </p>
                  </dd>
                </div>
              );
            })}
          </dl>
        </div>
      </Container>
    </section>
  );
}
