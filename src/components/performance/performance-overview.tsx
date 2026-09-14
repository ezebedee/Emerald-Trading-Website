import { ArrowRight } from "lucide-react";
import { LinkButton } from "@/components/ui/button";
import { SectionLabel } from "@/components/ui/section-label";
import { performanceEvidenceTypes } from "@/data/content/performance-evidence";
import {
  getPublicPerformanceEvidence,
  notDocumented,
} from "@/data/selectors/performance-evidence";
import { EvidenceLayout, EvidenceSection } from "./evidence-layout";

export function PerformanceOverview() {
  const evidence = getPublicPerformanceEvidence();
  return (
    <EvidenceLayout
      path="/performance"
      label="Documented performance"
      title="Performance, with context."
      introduction="A result is meaningful only alongside its system, evaluation method and account context. This is the starting point for understanding Emerald's Public Performance Record and the limits of its evidence."
    >
      <EvidenceSection title="Current public record">
        <div className="grid gap-8 lg:grid-cols-[1.2fr_1fr]">
          <div className="space-y-4">
            <SectionLabel variant="gold">
              Forward Performance Record
            </SectionLabel>
            <h3 className="type-heading-3">{evidence.system}</h3>
            <p className="text-muted-foreground leading-relaxed">
              {evidence.configuration} / {evidence.platforms}. The Public Demo
              Reference Account is forward-observed, not a real-money account.
              These Documented Results belong to this configuration, not the
              entire product family.
            </p>
            <LinkButton href="/ledger" trailingIcon={<ArrowRight size={18} />}>
              Read the Emerald Ledger
            </LinkButton>
          </div>
          <dl className="grid content-start gap-5 border-l border-[var(--border)] pl-6">
            {[
              ["Record coverage", evidence.snapshot?.period ?? notDocumented],
              [
                "Latest cumulative record ends",
                evidence.snapshot?.endDate ?? notDocumented,
              ],
              [
                "Publication model",
                "Static documented records; not a continuously updated feed",
              ],
              [
                "Independent audit",
                "Not available in the published evidence set",
              ],
            ].map(([label, value]) => (
              <div key={label}>
                <dt className="text-muted-foreground text-sm">{label}</dt>
                <dd className="mt-1 font-medium">{value}</dd>
              </div>
            ))}
          </dl>
        </div>
      </EvidenceSection>
      <EvidenceSection title="Read the evidence class before the result">
        <p className="text-muted-foreground max-w-3xl leading-relaxed">
          These labels describe different dimensions, not interchangeable proof
          levels. A dated forward/demo record can also be historical and
          internally documented. None of those labels establishes independent
          review.
        </p>
        <div className="grid gap-4 md:grid-cols-2">
          {performanceEvidenceTypes.map((type) => (
            <article
              key={type.label}
              className="bg-surface rounded-lg border border-[var(--border)] p-6"
            >
              <SectionLabel variant="gold">{type.dimension}</SectionLabel>
              <h3 className="mt-3 text-xl font-semibold">{type.label}</h3>
              <p className="text-muted-foreground mt-3 leading-relaxed">
                {type.description}
              </p>
              <p className="mt-4 border-t border-[var(--border)] pt-4 text-sm leading-relaxed">
                {type.availability}
              </p>
            </article>
          ))}
        </div>
      </EvidenceSection>
      <EvidenceSection title="Comparison depends on comparable evidence">
        <p className="text-muted-foreground max-w-3xl leading-relaxed">
          Product availability is not performance evidence. There is no
          published like-for-like numerical series here for comparing Quant
          against Scanner, Recovery Expert or indicator examples. The comparison
          page separates documented values from missing evidence rather than
          ranking products.
        </p>
        <LinkButton
          href="/performance/compare"
          variant="secondary"
          trailingIcon={<ArrowRight size={18} />}
        >
          Compare evidence
        </LinkButton>
      </EvidenceSection>
    </EvidenceLayout>
  );
}
