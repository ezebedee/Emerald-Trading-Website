import { Database, Eye, FileClock, Layers3 } from "lucide-react";

import { Badge } from "@/components/ui/badge";
import { Container } from "@/components/ui/container";
import { SectionLabel } from "@/components/ui/section-label";
import type { LedgerPublicRecordOverview } from "@/data/selectors";

type LedgerRecordClassificationProps = Readonly<{
  overview: LedgerPublicRecordOverview;
}>;

const itemIcons = [Database, FileClock, Layers3, Eye] as const;

export function LedgerRecordClassification({
  overview,
}: LedgerRecordClassificationProps) {
  const classificationItems = [
    {
      term: "Account Type",
      value: overview.accountClassification,
      description:
        "The public record is generated from a demo reference account and classified plainly for review.",
      badgeVariant: "neutral" as const,
    },
    {
      term: "Performance Type",
      value: overview.performanceClassification,
      description:
        "The Ledger documents forward performance separately from historical backtesting.",
      badgeVariant: "positive" as const,
    },
    {
      term: "Record Scope",
      value: overview.scopeLabel ?? "Public performance record unavailable",
      description:
        "Available public entries define the current daily, weekly, and cumulative reporting scope.",
      badgeVariant: "premium" as const,
    },
    {
      term: "Review Path",
      value: "Public Ledger + Verification",
      description:
        "Supporting review material is handled through the public Ledger and the separate verification route.",
      badgeVariant: "info" as const,
    },
  ];

  return (
    <section className="bg-surface py-12 md:py-14 xl:py-16">
      <Container size="wide">
        <div className="grid gap-8 xl:grid-cols-[minmax(0,0.34fr)_minmax(0,0.66fr)]">
          <div className="max-w-3xl">
            <SectionLabel variant="gold">
              Public Record Classification
            </SectionLabel>
            <h2 className="type-heading-2 text-foreground mt-4 text-balance">
              A documented forward-performance record with explicit account
              classification.
            </h2>
            <p className="type-body text-muted-foreground mt-5">
              The Ledger identifies what the public record represents before any
              later detail views, tables, or verification material are added.
              Private-account material, if made available, remains separate from
              this public record.
            </p>
          </div>

          {overview.hasPublicRecord ? (
            <dl className="grid gap-4 md:grid-cols-2">
              {classificationItems.map((item, index) => {
                const Icon = itemIcons[index];

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
          ) : (
            <div className="surface-elevated rounded-lg p-5">
              <p className="type-body text-muted-foreground">
                Public performance record is not currently available.
              </p>
            </div>
          )}
        </div>
      </Container>
    </section>
  );
}
