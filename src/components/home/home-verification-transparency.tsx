import { ArrowRight, Database, Eye, FileCheck2, Layers3 } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { LinkButton } from "@/components/ui/button";
import { Container } from "@/components/ui/container";
import { SectionLabel } from "@/components/ui/section-label";
import { getHomepageVerificationRecords } from "@/data/selectors";
import type { VerificationRecord } from "@/domain";

const verificationStatusLabels = {
  available: "Available",
  pending: "Pending",
  unavailable: "Unavailable",
  retired: "Retired",
} as const;

const verificationMethodLabels: Partial<
  Record<VerificationRecord["method"], string>
> = {
  "account-reference": "Account Reference",
  "platform-screenshot": "Platform Screenshot",
  "trade-history": "Trade History",
  "read-only-access": "Read-Only Access",
  "third-party": "External Review",
  "manual-review": "Manual Review",
  other: "Other",
} as const;

const accountClassificationLabels = {
  "public-demo-reference": "Public Demo Reference Account",
  "private-live": "Private Account",
  backtest: "Backtest",
  simulation: "Simulation",
} as const;

const transparencyPrinciples = [
  {
    title: "Clear Account Classification",
    description:
      "The public record is explicitly classified as a Public Demo Reference Account.",
    icon: Layers3,
  },
  {
    title: "Documented Ledger History",
    description:
      "Daily, weekly, and cumulative Forward Performance records are documented in the Emerald Ledger.",
    icon: Database,
  },
  {
    title: "Supporting Account Evidence",
    description:
      "Supporting account information is maintained alongside the public performance record.",
    icon: FileCheck2,
  },
  {
    title: "Read-Only Review Access",
    description:
      "Read-only review access may be provided separately without trading control.",
    icon: Eye,
  },
] as const;

const processSteps = [
  "Account Classification",
  "Ledger Record",
  "Supporting Evidence",
  "Read-Only Review",
] as const;

function VerificationRecordCard({ record }: { record: VerificationRecord }) {
  return (
    <article className="bg-surface/70 rounded-md border border-[var(--border)] p-4">
      <div className="flex flex-col gap-2 sm:flex-row sm:items-start sm:justify-between">
        <div>
          <Badge variant="neutral">
            {verificationMethodLabels[record.method] ?? "Supporting Evidence"}
          </Badge>
          <h3 className="text-foreground mt-3 text-base font-semibold">
            {record.title}
          </h3>
        </div>
        <Badge variant="premium">
          {verificationStatusLabels[record.status]}
        </Badge>
      </div>

      {record.accountClassification ? (
        <p className="text-muted-foreground mt-3 text-sm leading-6">
          Classification:{" "}
          {accountClassificationLabels[record.accountClassification]}
        </p>
      ) : null}
    </article>
  );
}

export function HomeVerificationTransparency() {
  const verificationRecords = getHomepageVerificationRecords();

  return (
    <section className="bg-surface/70 border-y border-[var(--border)] py-14 md:py-16 xl:py-20">
      <Container size="wide">
        <div className="grid gap-8 lg:grid-cols-[minmax(0,0.9fr)_minmax(360px,0.75fr)] xl:gap-12">
          <div className="max-w-3xl">
            <SectionLabel variant="gold">
              Verification & Transparency
            </SectionLabel>
            <h2 className="type-heading-2 text-foreground mt-4 max-w-4xl text-balance">
              Performance documentation designed to be reviewable, traceable,
              and clearly classified.
            </h2>
            <p className="type-body text-muted-foreground mt-5 max-w-2xl">
              Public forward-performance records are supported by documented
              account information and review-access mechanisms while avoiding
              claims beyond the available evidence.
            </p>

            <ul className="mt-8 grid gap-3 sm:grid-cols-2">
              {transparencyPrinciples.map((principle) => {
                const Icon = principle.icon;

                return (
                  <li
                    key={principle.title}
                    className="bg-surface-soft/70 rounded-md border border-[var(--border)] p-4"
                  >
                    <div className="flex items-center gap-2">
                      <Icon
                        aria-hidden="true"
                        className="text-gold-warm size-4 shrink-0"
                      />
                      <h3 className="text-foreground text-sm font-semibold">
                        {principle.title}
                      </h3>
                    </div>
                    <p className="text-muted-foreground mt-2 text-sm leading-6">
                      {principle.description}
                    </p>
                  </li>
                );
              })}
            </ul>

            <div className="mt-8 flex flex-col gap-3 sm:flex-row">
              <LinkButton
                href="/verification"
                size="lg"
                trailingIcon={<ArrowRight aria-hidden="true" />}
              >
                View Performance Verification
              </LinkButton>
              <LinkButton href="/ledger" variant="secondary" size="lg">
                View Emerald Ledger
              </LinkButton>
            </div>
          </div>

          <div className="surface-elevated rounded-lg p-5 md:p-6">
            <div>
              <Badge variant="neutral">Evidence Model</Badge>
              <h3 className="type-heading-3 text-foreground mt-4 text-balance">
                Public Demo Reference Account and Forward Performance records.
              </h3>
              <p className="text-muted-foreground mt-4 text-sm leading-6">
                The homepage summarizes the public review model without showing
                sensitive account identifiers or access details.
              </p>
            </div>

            {verificationRecords.length > 0 ? (
              <div className="mt-6 grid gap-3">
                {verificationRecords.map((record) => (
                  <VerificationRecordCard key={record.id} record={record} />
                ))}
              </div>
            ) : (
              <div className="bg-surface/70 mt-6 rounded-md border border-[var(--border)] p-4">
                <p className="type-body-small text-muted-foreground">
                  Public verification records are not currently available.
                </p>
              </div>
            )}

            <div
              aria-hidden="true"
              className="surface-data mt-6 rounded-lg p-4"
            >
              <div className="grid gap-3">
                {processSteps.map((step, index) => (
                  <div key={step}>
                    <div className="bg-surface-elevated/90 flex items-center justify-between rounded-md border border-[var(--border-strong)] px-3 py-3">
                      <span className="text-foreground text-sm font-semibold">
                        {step}
                      </span>
                      <span className="numeric text-subtle-foreground text-xs">
                        0{index + 1}
                      </span>
                    </div>
                    {index < processSteps.length - 1 ? (
                      <div className="mx-5 h-4 border-l border-[var(--border-emerald)]" />
                    ) : null}
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </Container>
    </section>
  );
}
