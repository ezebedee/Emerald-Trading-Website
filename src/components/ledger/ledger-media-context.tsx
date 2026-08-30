import { ArrowRight, FileVideo2, Link2Off } from "lucide-react";

import { Badge } from "@/components/ui/badge";
import { LinkButton } from "@/components/ui/button";
import { Container } from "@/components/ui/container";
import { SectionLabel } from "@/components/ui/section-label";
import type { LedgerMediaContextRecord } from "@/data/selectors";

type LedgerMediaContextProps = Readonly<{
  records: readonly LedgerMediaContextRecord[];
}>;

function MediaRecordCard({ record }: { record: LedgerMediaContextRecord }) {
  return (
    <li>
      <article className="surface-elevated h-full rounded-lg p-5">
        <div className="flex items-start justify-between gap-4">
          <div className="flex flex-wrap gap-2">
            <Badge variant="neutral">Video Record</Badge>
            <Badge variant="info">{record.videoPlatform}</Badge>
          </div>
          <FileVideo2
            aria-hidden="true"
            className="text-gold-warm size-5 shrink-0"
          />
        </div>

        <h3 className="type-heading-4 text-foreground mt-5 text-balance">
          {record.title}
        </h3>
        <p className="text-muted-foreground mt-3 text-sm leading-6">
          {record.description}
        </p>

        <div className="bg-surface/65 mt-5 flex items-start gap-3 rounded-md border border-[var(--border)] p-3">
          <Link2Off
            aria-hidden="true"
            className="text-info mt-0.5 size-4 shrink-0"
          />
          <p className="type-label text-info">{record.availabilityState}</p>
        </div>

        <dl className="mt-5 grid gap-4 border-t border-[var(--border)] pt-5">
          <div>
            <dt className="type-label text-subtle-foreground">
              Related Ledger Record
            </dt>
            <dd className="text-foreground mt-2 text-sm font-semibold">
              {record.relatedLedgerTitle}
            </dd>
          </div>
          <div className="grid gap-4 sm:grid-cols-2">
            <div>
              <dt className="type-label text-subtle-foreground">Coverage</dt>
              <dd className="text-foreground mt-2 text-sm font-semibold">
                {record.relatedLedgerCoverageLabel}
              </dd>
            </div>
            <div>
              <dt className="type-label text-subtle-foreground">Period Type</dt>
              <dd className="text-foreground mt-2 text-sm font-semibold">
                {record.relatedLedgerPeriodType}
              </dd>
            </div>
          </div>
        </dl>
      </article>
    </li>
  );
}

export function LedgerMediaContext({ records }: LedgerMediaContextProps) {
  return (
    <section className="bg-surface/70 border-t border-[var(--border)] py-12 md:py-14 xl:py-16">
      <Container size="wide">
        <div className="flex flex-col gap-5 lg:flex-row lg:items-end lg:justify-between">
          <div className="max-w-3xl">
            <SectionLabel variant="gold">Media & Video Record</SectionLabel>
            <h2 className="type-heading-2 text-foreground mt-4 text-balance">
              Supporting video records linked to documented Ledger checkpoints.
            </h2>
            <p className="type-body text-muted-foreground mt-5">
              Selected public Ledger checkpoints have supporting video metadata
              records. External video links are pending, and these media records
              provide context rather than independent performance verification.
            </p>
            <p className="text-subtle-foreground mt-4 text-sm leading-6">
              Not every Ledger reporting record currently has an associated
              video record.
            </p>
          </div>

          <div className="flex flex-col gap-3 sm:flex-row lg:items-center">
            <Badge variant="premium">
              {records.length} video records linked to public Ledger checkpoints
            </Badge>
            <LinkButton
              className="w-full sm:w-auto"
              href="/videos"
              variant="secondary"
              trailingIcon={<ArrowRight className="size-4" />}
            >
              Explore Video Archive
            </LinkButton>
          </div>
        </div>

        {records.length > 0 ? (
          <ul className="mt-8 grid list-none gap-4 p-0 md:grid-cols-2 xl:grid-cols-3">
            {records.map((record) => (
              <MediaRecordCard key={record.id} record={record} />
            ))}
          </ul>
        ) : (
          <div className="surface-elevated mt-8 rounded-lg p-5 md:p-6">
            <p className="type-body text-muted-foreground">
              No public Ledger video records are currently available.
            </p>
          </div>
        )}
      </Container>
    </section>
  );
}
