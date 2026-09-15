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

const principles = [
  [
    "Evidence before claims",
    "Investigate the idea before drawing a conclusion.",
  ],
  [
    "Context matters",
    "Read findings alongside their assumptions, period and market conditions.",
  ],
  [
    "Robustness over isolated results",
    "Look beyond a favorable test to nearby settings and different conditions.",
  ],
  [
    "Implementation matters",
    "Check how the method behaves on its intended platform.",
  ],
  ["Markets change", "Revisit assumptions as behavior and conditions evolve."],
  [
    "Clear limitations",
    "Explain what a result supports and what remains uncertain.",
  ],
] as const;

export function ResearchContent() {
  const research = getPublicResearchEntries();
  return (
    <EngineeringLayout
      label="Research and development"
      title="Research at Emerald Legacy Systems"
      introduction="Research is part of the development process, not a marketing label. We investigate market behavior, evaluate trading ideas and test assumptions to improve how our systems are built."
    >
      <EngineeringSection title="From idea to implementation">
        <p className="text-muted-foreground max-w-3xl leading-relaxed">
          A useful idea must survive more than its first test. These steps guide
          investigation and revision; they do not imply every product has
          completed every stage.
        </p>
        <ol className="grid gap-x-10 md:grid-cols-2">
          {researchStages.map((stage, index) => (
            <li
              key={stage.title}
              className="flex gap-4 border-t border-[var(--border)] py-5"
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
      <EngineeringSection title="Research principles">
        <dl className="grid gap-x-10 gap-y-6 md:grid-cols-2">
          {principles.map(([title, text]) => (
            <div key={title}>
              <dt className="font-semibold">{title}</dt>
              <dd className="text-muted-foreground mt-2 leading-relaxed">
                {text}
              </dd>
            </div>
          ))}
        </dl>
      </EngineeringSection>
      <EngineeringSection title="What we share">
        <p className="text-muted-foreground max-w-3xl leading-relaxed">
          Public research may include methodology articles, market observations,
          testing approaches and lessons from system development. We share
          non-proprietary findings without publishing protected formulas, signal
          thresholds or execution logic.
        </p>
        {research.map((entry) => (
          <div
            key={entry.id}
            className="max-w-3xl border-l-2 border-[var(--border-gold)] pl-5"
          >
            <p className="text-gold-warm text-sm">
              Publication status: {publicationLabels[entry.publicationStatus]}
            </p>
            <h3 className="mt-2 text-lg font-semibold">{entry.title}</h3>
            <p className="text-muted-foreground mt-2 leading-relaxed">
              This program note is not a peer-reviewed publication.
            </p>
          </div>
        ))}
        <p className="text-muted-foreground max-w-3xl leading-relaxed">
          As Emerald&apos;s research program grows, selected public research and
          community-contributed work may be presented here.
        </p>
      </EngineeringSection>
      <EngineeringSection title="Continuous development">
        <p className="text-muted-foreground max-w-3xl leading-relaxed">
          A promising initial test is a starting point, not a finished system.
          Review, observation and refinement feed back into development.
          Recording changes and their limitations helps us learn from each
          iteration.
        </p>
        <p className="text-muted-foreground max-w-3xl leading-relaxed">
          Research investigates ideas and methods. Technology turns those ideas
          into engineered tools.
        </p>
        <TextLink href="/technology">Explore our Technology</TextLink>
      </EngineeringSection>
      <EngineeringSection title="Reading results">
        <p className="text-muted-foreground max-w-3xl leading-relaxed">
          Testing can reduce uncertainty, but it does not promise future
          profitability. For account classifications, records and their limits,
          use the dedicated performance pages.
        </p>
        <div className="flex flex-wrap gap-x-8 gap-y-4">
          <TextLink href="/performance">Performance overview</TextLink>
          <TextLink href="/verification">Verification methodology</TextLink>
          <TextLink href="/performance/live-vs-backtest">
            Forward Performance vs Backtest
          </TextLink>
          <TextLink href="/ledger">Emerald Ledger</TextLink>
        </div>
      </EngineeringSection>
    </EngineeringLayout>
  );
}
