import { ArrowDown, Route } from "lucide-react";

import { Container } from "@/components/ui/container";
import { SectionLabel } from "@/components/ui/section-label";
import type {
  SystemsCatalogLayer,
  SystemsCatalogWorkflow,
} from "@/data/selectors";

type SystemsLayerArchitectureProps = Readonly<{
  layers: readonly SystemsCatalogLayer[];
  workflows: readonly SystemsCatalogWorkflow[];
}>;

export function SystemsLayerArchitecture({
  layers,
  workflows,
}: SystemsLayerArchitectureProps) {
  return (
    <section className="bg-surface-soft/25 border-y border-[var(--border)] py-14 md:py-16 xl:py-20">
      <Container size="wide">
        <div className="grid gap-10 lg:grid-cols-[0.86fr_1.14fr]">
          <div>
            <SectionLabel variant="gold">Product Layers</SectionLabel>
            <h2 className="type-heading-2 text-foreground mt-4 text-balance">
              Ecosystem relationships without mandatory dependency.
            </h2>
            <p className="type-body text-muted-foreground mt-5">
              Products can sit near each other in the trading workflow, but the
              page does not imply Scanner requires Recovery Expert, Recovery
              Expert requires Scanner, or Quant access requires a public
              indicator subscription.
            </p>
          </div>

          <div className="grid gap-4">
            {layers.map((layer, index) => (
              <div key={layer.label}>
                <article className="surface-elevated rounded-lg p-5">
                  <p className="type-label text-gold-warm">{layer.label}</p>
                  <h3 className="text-foreground mt-3 text-xl font-semibold">
                    {layer.productName}
                  </h3>
                  <p className="text-muted-foreground mt-3 text-sm leading-6">
                    {layer.description}
                  </p>
                </article>
                {index < layers.length - 2 ? (
                  <div className="flex justify-center py-2">
                    <ArrowDown
                      aria-hidden="true"
                      className="text-emerald size-5"
                    />
                  </div>
                ) : index === layers.length - 2 ? (
                  <div className="flex items-center justify-center gap-3 py-2">
                    <span className="h-px w-10 bg-[var(--border)]" />
                    <Route
                      aria-hidden="true"
                      className="text-gold-warm size-5"
                    />
                    <span className="h-px w-10 bg-[var(--border)]" />
                  </div>
                ) : null}
              </div>
            ))}
          </div>
        </div>

        <div className="mt-10">
          <SectionLabel variant="gold">Choose Your Workflow</SectionLabel>
          <div className="mt-5 grid gap-5 md:grid-cols-2 xl:grid-cols-4">
            {workflows.map((workflow) => (
              <article
                key={workflow.label}
                className="surface-default rounded-lg p-5"
              >
                <p className="type-label text-subtle-foreground">
                  {workflow.label}
                </p>
                <h3 className="text-foreground mt-3 text-lg font-semibold">
                  {workflow.productName}
                </h3>
                <p className="text-muted-foreground mt-3 text-sm leading-6">
                  {workflow.description}
                </p>
              </article>
            ))}
          </div>
        </div>
      </Container>
    </section>
  );
}
