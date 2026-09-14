import { ArrowRight } from "lucide-react";
import { LinkButton } from "@/components/ui/button";
import { TextLink } from "@/components/ui/text-link";
import { researchStages } from "@/data/content/engineering";
import { getPublicResearchEntries } from "@/data/selectors/content";
import { EngineeringLayout, EngineeringSection } from "./content-layout";

const publicationLabels = {
  draft: "Draft",
  submitted: "Submitted",
  "under-review": "Under Review",
  accepted: "Accepted",
  published: "Published",
  archived: "Archived",
} as const;

export function ResearchContent() {
  const research = getPublicResearchEntries();
  return (
    <EngineeringLayout
      label="Research / Testing and iteration"
      title="Research, testing and documented iteration"
      introduction="Quantitative systems need explicit questions, implementation checks and evidence that can be interpreted in context. Emerald's research approach separates an evaluation method from a claim about a product's outcomes."
    >
      <EngineeringSection title="An evaluation framework, not a completion certificate">
        <p className="text-muted-foreground max-w-3xl leading-relaxed">
          These stages describe what to investigate and document. They do not
          assert that every product has completed every stage, passed every test
          or reached production. Findings can send work back to an earlier
          stage.
        </p>
        <ol className="grid gap-x-10 md:grid-cols-2">
          {researchStages.map((stage, index) => (
            <li
              key={stage.title}
              className="flex gap-4 border-t border-[var(--border)] py-6"
            >
              <span
                aria-hidden="true"
                className="text-gold-warm w-7 shrink-0 font-mono text-lg"
              >
                {String(index + 1).padStart(2, "0")}
              </span>
              <div>
                <h3 className="text-lg font-semibold">{stage.title}</h3>
                <p className="text-muted-foreground mt-2 leading-relaxed">
                  {stage.text}
                </p>
              </div>
            </li>
          ))}
        </ol>
      </EngineeringSection>
      <EngineeringSection title="Different tests address different uncertainties">
        <div className="grid gap-8 md:grid-cols-2">
          <div>
            <h3 className="text-xl font-semibold">
              Historical testing and implementation fidelity
            </h3>
            <p className="text-muted-foreground mt-3 leading-relaxed">
              Data quality, spread/slippage assumptions, parameter sensitivity,
              regime dependence and overfitting all affect interpretation.
              Implementation fidelity asks whether the platform behavior matches
              the rules being evaluated, rather than assuming simulated
              execution transfers unchanged.
            </p>
            <TextLink
              href="/performance/live-vs-backtest"
              className="mt-4 inline-block"
            >
              Forward performance vs backtest methodology
            </TextLink>
          </div>
          <div>
            <h3 className="text-xl font-semibold">
              Forward observation with account context
            </h3>
            <p className="text-muted-foreground mt-3 leading-relaxed">
              The Public Demo Reference Account is used to observe the
              configured Quant implementation. Its Forward Performance Record
              remains specific to Metals / XAUUSD / MT4. Demo execution differs
              from real-money execution; the current public records are static,
              not a continuous feed.
            </p>
            <TextLink href="/ledger" className="mt-4 inline-block">
              Read the Emerald Ledger record context
            </TextLink>
          </div>
        </div>
        <p className="border-l-2 border-[var(--border-gold)] pl-5 leading-relaxed">
          Validation reduces uncertainty; it does not prove future
          profitability. Logic verification, historical testing, implementation
          testing, forward/demo observation and documented evidence address
          different questions. Production monitoring, where applicable, adds an
          operational layer; it is not a substitute for those checks. Losses
          remain possible.
        </p>
      </EngineeringSection>
      <EngineeringSection title="Current public research record">
        <p className="text-muted-foreground max-w-3xl leading-relaxed">
          Website visibility and publication status are different. The current
          research-program record is an internal research note, not evidence of
          peer-reviewed publication.
        </p>
        {research.length ? (
          research.map((entry) => (
            <article
              key={entry.id}
              className="bg-surface max-w-4xl rounded-lg border border-[var(--border)] p-6"
            >
              <p className="text-gold-warm text-sm font-medium">
                Publication status: {publicationLabels[entry.publicationStatus]}
              </p>
              <h3 className="mt-3 text-xl font-semibold">{entry.title}</h3>
              <p className="text-muted-foreground mt-3 leading-relaxed">
                {entry.summary}
              </p>
              <p className="mt-4 text-sm leading-relaxed">
                No journal, DOI, authorship or publication date is recorded in
                the current source. Public availability of this note does not
                establish external review.
              </p>
            </article>
          ))
        ) : (
          <p className="text-muted-foreground">
            No public research record is currently available.
          </p>
        )}
      </EngineeringSection>
      <EngineeringSection title="Public outputs and their limits">
        <dl className="grid gap-6 md:grid-cols-2">
          <div>
            <dt className="font-semibold">
              Architecture and configuration notes
            </dt>
            <dd className="text-muted-foreground mt-2 leading-relaxed">
              Product roles and platform context explain what is being discussed
              without disclosing proprietary rules. They do not establish
              identical implementations or completed validation.
              <br />
              <TextLink href="/technology" className="mt-3 inline-block">
                Explore the engineering architecture
              </TextLink>
            </dd>
          </div>
          <div>
            <dt className="font-semibold">
              Documented observations and records
            </dt>
            <dd className="text-muted-foreground mt-2 leading-relaxed">
              Emerald Ledger is a public context and documentation layer, not a
              scientific certification mechanism. Documented Performance belongs
              to the stated configuration, not every related product.
              <br />
              <TextLink href="/performance" className="mt-3 inline-block">
                Understand the performance evidence
              </TextLink>
            </dd>
          </div>
          <div>
            <dt className="font-semibold">
              Methodology and evidence comparisons
            </dt>
            <dd className="text-muted-foreground mt-2 leading-relaxed">
              Comparisons distinguish available evidence from missing data. An
              evaluation method is not a result, and missing metrics should not
              be reconstructed.
              <br />
              <TextLink
                href="/performance/compare"
                className="mt-3 inline-block"
              >
                Inspect documented evidence availability
              </TextLink>
            </dd>
          </div>
          <div>
            <dt className="font-semibold">Screenshots and supporting media</dt>
            <dd className="text-muted-foreground mt-2 leading-relaxed">
              Media needs record identity, coverage and context. A chart example
              or publisher thumbnail alone does not establish independent review
              or a complete trading record.
              <br />
              <TextLink href="/verification" className="mt-3 inline-block">
                Review documentation boundaries
              </TextLink>
            </dd>
          </div>
        </dl>
      </EngineeringSection>
      <EngineeringSection title="Research findings are not commercial promises">
        <p className="text-muted-foreground max-w-3xl leading-relaxed">
          A finding about a signal, parameter setting or historical period does
          not establish a product-wide outcome. Indicator examples, Scanner
          observations, Recovery Expert management and Quant strategy results
          have different scopes. This methodology adds no performance estimates
          and does not claim independent certification.
        </p>
        <p className="text-muted-foreground max-w-3xl leading-relaxed">
          Material revisions should identify the affected configuration,
          evidence and reason for change. Research owners must supply supporting
          records before a result, completed validation stage or publication
          claim is made public.
        </p>
        <LinkButton
          href="/technology"
          variant="secondary"
          trailingIcon={<ArrowRight aria-hidden="true" />}
        >
          Return to technology
        </LinkButton>
      </EngineeringSection>
    </EngineeringLayout>
  );
}
