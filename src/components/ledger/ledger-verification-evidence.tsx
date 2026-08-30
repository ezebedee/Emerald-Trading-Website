import { ArrowRight, Eye, FileSearch } from "lucide-react";

import { Badge } from "@/components/ui/badge";
import { LinkButton } from "@/components/ui/button";
import { Container } from "@/components/ui/container";
import { SectionLabel } from "@/components/ui/section-label";
import { getLedgerVerificationEvidenceRecords } from "@/data/selectors";
import type { LedgerVerificationEvidenceRecord } from "@/data/selectors";

const evidenceIcons = [FileSearch, Eye] as const;

function EvidenceRecordCard({
  record,
  index,
}: {
  record: LedgerVerificationEvidenceRecord;
  index: number;
}) {
  const Icon = evidenceIcons[index] ?? FileSearch;

  return (
    <article className="surface-elevated rounded-lg p-5 md:p-6">
      <div className="flex items-start justify-between gap-4">
        <div className="flex flex-wrap gap-2">
          <Badge variant={index === 0 ? "neutral" : "info"}>
            {record.method}
          </Badge>
          {record.status ? (
            <Badge variant="neutral">{record.status}</Badge>
          ) : null}
        </div>
        <Icon aria-hidden="true" className="text-gold-warm size-5 shrink-0" />
      </div>

      <h3 className="type-heading-4 text-foreground mt-5 text-balance">
        {record.title}
      </h3>
      <p className="text-muted-foreground mt-4 text-sm leading-6">
        {record.description}
      </p>

      <dl className="mt-5 grid gap-4 border-t border-[var(--border)] pt-5 sm:grid-cols-2">
        <div>
          <dt className="type-label text-subtle-foreground">Method</dt>
          <dd className="text-foreground mt-2 text-sm font-semibold">
            {record.method}
          </dd>
        </div>
        {record.status ? (
          <div>
            <dt className="type-label text-subtle-foreground">Status</dt>
            <dd className="text-foreground mt-2 text-sm font-semibold">
              {record.status}
            </dd>
          </div>
        ) : null}
        {record.accountClassification ? (
          <div className="sm:col-span-2">
            <dt className="type-label text-subtle-foreground">
              Account Classification
            </dt>
            <dd className="text-foreground mt-2 text-sm font-semibold">
              {record.accountClassification}
            </dd>
          </div>
        ) : null}
        {record.relatedLedgerRecordScope ? (
          <div className="sm:col-span-2">
            <dt className="type-label text-subtle-foreground">Ledger Scope</dt>
            <dd className="text-foreground mt-2 text-sm font-semibold">
              {record.relatedLedgerRecordScope}
            </dd>
          </div>
        ) : null}
      </dl>
    </article>
  );
}

export function LedgerVerificationEvidence() {
  const records = getLedgerVerificationEvidenceRecords();

  return (
    <section className="bg-background border-t border-[var(--border)] py-12 md:py-14 xl:py-16">
      <Container size="wide">
        <div className="grid gap-8 xl:grid-cols-[minmax(0,0.36fr)_minmax(0,0.64fr)]">
          <div className="max-w-3xl">
            <SectionLabel variant="gold">Verification & Evidence</SectionLabel>
            <h2 className="type-heading-2 text-foreground mt-4 text-balance">
              Review mechanisms supporting the public Ledger record.
            </h2>
            <p className="type-body text-muted-foreground mt-5">
              The public Ledger is accompanied by supporting account-reference
              information and read-only review mechanisms tied to the Public
              Demo Reference Account and Forward Performance record.
            </p>
            <p className="text-subtle-foreground mt-4 text-sm leading-6">
              Reviewable documentation is not the same as outside review.
              Sensitive account identifiers and access details are not displayed
              on the public Ledger.
            </p>
            <LinkButton
              className="mt-6 w-full sm:w-auto"
              href="/verification"
              trailingIcon={<ArrowRight className="size-4" />}
            >
              View Performance Verification
            </LinkButton>
          </div>

          {records.length > 0 ? (
            <div className="grid gap-4 md:grid-cols-2 xl:gap-5">
              {records.map((record, index) => (
                <EvidenceRecordCard
                  key={record.id}
                  record={record}
                  index={index}
                />
              ))}
            </div>
          ) : (
            <div className="surface-elevated rounded-lg p-5 md:p-6">
              <p className="type-body text-muted-foreground">
                Public verification records are not currently available.
              </p>
            </div>
          )}
        </div>
      </Container>
    </section>
  );
}
