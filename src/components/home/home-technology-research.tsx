import {
  ArrowRight,
  Binary,
  BookOpen,
  FlaskConical,
  Workflow,
} from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { LinkButton } from "@/components/ui/button";
import { Container } from "@/components/ui/container";
import { SectionLabel } from "@/components/ui/section-label";
import { getHomepageFeaturedResearch } from "@/data/selectors";
import type { ResearchItem } from "@/domain";

const researchPublicationStatusLabels = {
  draft: "Draft",
  submitted: "Submitted",
  "under-review": "Under Review",
  accepted: "Accepted",
  published: "Published",
  archived: "Archived",
} as const;

const researchTypeLabels = {
  "journal-article": "Journal Article",
  "conference-paper": "Conference Paper",
  "technical-report": "Technical Report",
  "research-note": "Research Note",
  methodology: "Methodology",
  "case-study": "Case Study",
  other: "Other",
} as const;

const technologyPillars = [
  {
    title: "Quantitative Methodology",
    description:
      "Structured analytical rules and measurable behavior guide system development.",
    icon: Binary,
  },
  {
    title: "System Architecture",
    description:
      "Signals, rule logic, risk management, and execution are treated as separate layers.",
    icon: Workflow,
  },
  {
    title: "Forward Testing",
    description:
      "Forward testing is maintained separately from historical backtest analysis.",
    icon: BookOpen,
  },
  {
    title: "Research Iteration",
    description:
      "Hypotheses move through implementation, testing, review, and refinement.",
    icon: FlaskConical,
  },
] as const;

const processSteps = [
  "Hypothesis",
  "System Design",
  "Forward Test",
  "Refinement",
] as const;

const formatTag = (tag: string) =>
  tag
    .split("-")
    .map((part) => part.charAt(0).toUpperCase() + part.slice(1))
    .join(" ");

function ResearchProgramCard({ research }: { research?: ResearchItem }) {
  if (!research) {
    return (
      <div className="surface-elevated rounded-lg p-5 md:p-6">
        <Badge variant="neutral">Research Program</Badge>
        <h3 className="type-heading-3 text-foreground mt-4 text-balance">
          Research record unavailable
        </h3>
        <p className="type-body-small text-muted-foreground mt-4">
          Public research-program details are not currently available on the
          homepage.
        </p>
      </div>
    );
  }

  const visibleTags = (research.tags ?? []).slice(0, 3);

  return (
    <article className="surface-elevated rounded-lg p-5 md:p-6">
      <div className="flex flex-col gap-3 sm:flex-row sm:items-start sm:justify-between">
        <Badge variant="neutral">
          {researchTypeLabels[research.researchType]}
        </Badge>
        <Badge variant="premium">
          {researchPublicationStatusLabels[research.publicationStatus]}
        </Badge>
      </div>

      <h3 className="type-heading-3 text-foreground mt-4 text-balance">
        {research.title}
      </h3>
      <p className="type-body-small text-muted-foreground mt-4">
        {research.summary}
      </p>

      {visibleTags.length > 0 ? (
        <div className="mt-5 flex flex-wrap gap-2">
          {visibleTags.map((tag) => (
            <Badge key={tag} variant="neutral">
              {formatTag(tag)}
            </Badge>
          ))}
        </div>
      ) : null}

      <div aria-hidden="true" className="surface-data mt-6 rounded-lg p-4">
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
                <div className="mx-5 h-4 border-l border-[var(--border-gold)]" />
              ) : null}
            </div>
          ))}
        </div>
      </div>
    </article>
  );
}

export function HomeTechnologyResearch() {
  const research = getHomepageFeaturedResearch();

  return (
    <section className="bg-surface-soft/25 py-14 md:py-16 xl:py-20">
      <Container size="wide">
        <div className="grid gap-8 lg:grid-cols-[minmax(0,0.92fr)_minmax(360px,0.72fr)] xl:gap-12">
          <div className="max-w-3xl">
            <SectionLabel variant="gold">Technology & Research</SectionLabel>
            <h2 className="type-heading-2 text-foreground mt-4 max-w-4xl text-balance">
              Quantitative systems developed through research, testing, and
              iterative engineering.
            </h2>
            <p className="type-body text-muted-foreground mt-5 max-w-2xl">
              Emerald Legacy Systems develops trading technology through
              structured research, quantitative analysis, system design, and
              forward testing, with documented development kept distinct from
              performance evidence.
            </p>

            <ul className="mt-8 grid gap-3 sm:grid-cols-2">
              {technologyPillars.map((pillar) => {
                const Icon = pillar.icon;

                return (
                  <li
                    key={pillar.title}
                    className="bg-surface/70 rounded-md border border-[var(--border)] p-4"
                  >
                    <div className="flex items-center gap-2">
                      <Icon
                        aria-hidden="true"
                        className="text-gold-warm size-4 shrink-0"
                      />
                      <h3 className="text-foreground text-sm font-semibold">
                        {pillar.title}
                      </h3>
                    </div>
                    <p className="text-muted-foreground mt-2 text-sm leading-6">
                      {pillar.description}
                    </p>
                  </li>
                );
              })}
            </ul>

            <div className="mt-8 flex flex-col gap-3 sm:flex-row">
              <LinkButton
                href="/technology"
                size="lg"
                trailingIcon={<ArrowRight aria-hidden="true" />}
              >
                Explore Technology
              </LinkButton>
              <LinkButton href="/research" variant="secondary" size="lg">
                View Research
              </LinkButton>
            </div>
          </div>

          <ResearchProgramCard research={research} />
        </div>
      </Container>
    </section>
  );
}
