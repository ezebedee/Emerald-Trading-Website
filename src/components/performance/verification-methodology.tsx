import {
  getPublicPerformanceEvidence,
  notDocumented,
} from "@/data/selectors/performance-evidence";
import {
  EvidenceLayout,
  EvidenceNotes,
  EvidenceSection,
} from "./evidence-layout";

export function VerificationMethodology() {
  const evidence = getPublicPerformanceEvidence();
  return (
    <EvidenceLayout
      path="/verification"
      label="Documentation and review boundaries"
      title="Performance verification methodology"
      introduction="Emerald Ledger is the public record and context layer for Documented Performance. Its source entries and supporting context make results reviewable; they do not establish independent certification."
    >
      <EvidenceSection title="What the current documentation contains">
        <EvidenceNotes
          items={[
            {
              title: "System and configuration identity",
              text: `${evidence.system}; ${evidence.configuration}; ${evidence.platforms}. Record ownership remains with this configuration, separate from broader system-family coverage and product availability.`,
            },
            {
              title: "Dated record identity",
              text: `Daily, weekly and cumulative entries have stable record IDs and explicit coverage dates. The latest cumulative source is ${evidence.snapshot?.id ?? notDocumented}, ending ${evidence.snapshot?.endDate ?? notDocumented}. The end date is record coverage, not a last-updated timestamp.`,
            },
            {
              title: "Evidence and account classification",
              text: "The current entries are a Forward Performance Record from a Public Demo Reference Account. A backtest should be labeled separately as historical simulation, with its assumptions and period disclosed.",
            },
            {
              title: "Source versions",
              text: "Records are maintained in version-controlled site source. This is not an immutable verification system or a public per-record correction log. A source revision is distinct from the period covered by a result.",
            },
          ]}
        />
      </EvidenceSection>
      <EvidenceSection title="Review context currently listed">
        {evidence.documentation.length ? (
          <div className="grid gap-4 md:grid-cols-2">
            {evidence.documentation.map((item) => (
              <article
                key={item.id}
                className="bg-surface rounded-lg border border-[var(--border)] p-6"
              >
                <p className="text-gold-warm text-sm font-medium">
                  {item.method} / {item.status}
                </p>
                <h3 className="mt-3 text-xl font-semibold">{item.title}</h3>
                <p className="text-muted-foreground mt-3 leading-relaxed">
                  {item.description}
                </p>
              </article>
            ))}
          </div>
        ) : (
          <p>{notDocumented}</p>
        )}
        <p className="text-muted-foreground max-w-3xl leading-relaxed">
          Available describes the listed review method, not an independent audit
          or public access credentials. Reviewable documentation does not imply
          independent audit or third-party certification. Independent
          third-party verification, where available, would need a named
          reviewer, explicit scope and report; none is supplied in the current
          published evidence set.
        </p>
      </EvidenceSection>
      <EvidenceSection title="Media, updates and corrections">
        <EvidenceNotes
          items={[
            {
              title: "Label the media, not just the result",
              text: "The asset registry associates media with a record, media type, coverage dates and descriptive context. A screenshot or publisher-produced thumbnail is supporting documentation, not a complete transaction history or proof of independent verification.",
            },
            {
              title: "Read embedded claims cautiously",
              text: "Some legacy Ledger artwork includes verification wording and account identifiers. It is not reproduced on these pages. Embedded wording is not evidence of independent audit, real-money performance or results on other platforms.",
            },
            {
              title: "Static publication, not a continuous feed",
              text: "The displayed source records are static. Forward describes how results were observed, not how frequently this website refreshes. No current timestamp, streaming account connection or automatic update cadence is claimed.",
            },
            {
              title: "Disclose corrections explicitly",
              text: "A correction should identify the affected record and field, previous and revised values, reason and revision date. Its original coverage dates should remain distinct from the correction date. This is the disclosure practice to follow, not a claim that a public correction log already exists.",
            },
            {
              title: "Keep review access separate",
              text: "Sensitive account identifiers and access details are not displayed on these methodology pages. Review access, where arranged separately, does not grant trading authority and is not third-party certification.",
            },
            {
              title: "Check the limits of the evidence",
              text: "A short observed period, incomplete media or missing backtest assumptions limits interpretation. Use the Ledger's classification and configuration context, and do not infer unavailable results or future profitability.",
            },
          ]}
        />
      </EvidenceSection>
    </EvidenceLayout>
  );
}
