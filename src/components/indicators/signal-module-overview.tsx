import Link from "next/link";
import { ArrowRight, ShieldCheck } from "lucide-react";

import { IndicatorImageFrame } from "@/components/indicators/indicator-image-frame";
import { Badge } from "@/components/ui/badge";
import { Container } from "@/components/ui/container";
import { SectionLabel } from "@/components/ui/section-label";
import type { SignalModule } from "@/domain";
import type { ImageAsset } from "@/types/assets";

type SignalModuleOverviewProps = Readonly<{
  primarySignalModules: readonly SignalModule[];
  auxiliarySignalModules: readonly SignalModule[];
  mainSignalAsset?: ImageAsset;
}>;

const moduleRoleLabels: Record<string, string> = {
  "emerald-main-signal": "Trend-oriented signal",
  "emerald-finescalp": "High-resolution tick / seconds-chart signal",
  "emerald-scalp-signal": "Short-horizon scalping-oriented signal",
  "emerald-range-signal": "Range-oriented signal",
  "emerald-harmonizer": "Signal-synthesis module combining Scalp + Range",
  "emerald-harmonizer-safe": "Auxiliary defensive/helper signal",
};

const moduleCadenceLabels: Record<string, string> = {
  "emerald-main-signal": "Lower-frequency trend context",
  "emerald-finescalp": "High-resolution context",
  "emerald-scalp-signal": "Short-horizon context",
  "emerald-range-signal": "Range-oriented context",
  "emerald-harmonizer": "Synthesis context",
  "emerald-harmonizer-safe": "Defensive helper context",
};

const formatCategory = (category: string) =>
  category
    .split("-")
    .map((part) => part.charAt(0).toUpperCase() + part.slice(1))
    .join(" ");

function SignalModuleCard({
  module,
  auxiliary = false,
}: {
  module: SignalModule;
  auxiliary?: boolean;
}) {
  return (
    <article
      id={module.slug}
      className={
        auxiliary
          ? "surface-premium rounded-lg p-5 md:p-6"
          : "surface-elevated rounded-lg p-5 md:p-6"
      }
    >
      <div className="flex flex-wrap items-center gap-2">
        <Badge variant={auxiliary ? "premium" : "neutral"}>
          {auxiliary ? "Auxiliary Signal Layer" : "Primary Signal Module"}
        </Badge>
        <Badge variant="neutral">{formatCategory(module.category)}</Badge>
      </div>
      <h3 className="text-foreground mt-4 text-xl font-semibold">
        {module.name}
      </h3>
      <p className="text-gold-warm mt-3 text-sm font-semibold">
        {moduleRoleLabels[module.id] ?? module.description}
      </p>
      <p className="text-muted-foreground mt-3 text-sm leading-6">
        {moduleCadenceLabels[module.id] ??
          "Signal context within the Emerald Legacy System framework."}
      </p>
      <Link
        href={`/signals#${module.slug}`}
        className="focus-emerald transition-standard text-emerald-bright hover:text-foreground mt-5 inline-flex min-h-10 items-center gap-2 text-sm font-semibold underline decoration-[var(--border-emerald)] underline-offset-4"
      >
        View in Signal Library
        <ArrowRight aria-hidden="true" className="size-4" />
      </Link>
    </article>
  );
}

export function SignalModuleOverview({
  primarySignalModules,
  auxiliarySignalModules,
  mainSignalAsset,
}: SignalModuleOverviewProps) {
  return (
    <section className="py-14 md:py-16 xl:py-20">
      <Container size="wide">
        <div className="flex flex-col gap-5 md:flex-row md:items-end md:justify-between">
          <div className="max-w-3xl">
            <SectionLabel variant="gold">Signal Module Overview</SectionLabel>
            <h2 className="type-heading-2 text-foreground mt-4 text-balance">
              Five primary modules with a separate auxiliary defensive layer.
            </h2>
            <p className="type-body text-muted-foreground mt-5">
              The modules produce analytical or directional outputs. They do not
              define automatic trade execution on their own.
            </p>
          </div>
          <Badge variant="positive">Multi-Instrument</Badge>
        </div>
        <div className="mt-8 grid gap-5 md:grid-cols-2 xl:grid-cols-5">
          {primarySignalModules.map((module) => (
            <SignalModuleCard key={module.id} module={module} />
          ))}
        </div>
        {mainSignalAsset ? (
          <article className="surface-data mt-8 grid gap-6 rounded-lg p-5 md:p-6 lg:grid-cols-[0.7fr_1.3fr] lg:items-center">
            <div>
              <Badge variant="premium">Main Signal Visual</Badge>
              <h3 className="text-foreground mt-4 text-2xl font-semibold">
                Trend-oriented signal designed for swing and trend-following
                trading contexts.
              </h3>
              <p className="text-muted-foreground mt-4 text-sm leading-6">
                The screenshot shows the Main Signal module on an MT4 chart as
                product evidence only. It does not define entry or exit
                formulas.
              </p>
            </div>
            <IndicatorImageFrame
              asset={mainSignalAsset}
              caption="Main Signal - MT4 chart example"
              loading="eager"
              sizes="(min-width: 1024px) 58vw, 100vw"
            />
          </article>
        ) : null}
        <div className="mt-8 grid gap-5 lg:grid-cols-[0.7fr_1.3fr]">
          <div className="surface-elevated rounded-lg p-5 md:p-6">
            <ShieldCheck aria-hidden="true" className="text-gold-warm size-5" />
            <h3 className="text-foreground mt-4 text-xl font-semibold">
              Auxiliary Signal Layer
            </h3>
            <p className="text-muted-foreground mt-3 text-sm leading-6">
              Auxiliary signals are framed as supporting context. Harmonizer
              SAFE can sit beside a preferred primary signal without being
              presented as a separate primary engine.
            </p>
          </div>
          <div className="grid gap-5 md:grid-cols-1">
            {auxiliarySignalModules.map((module) => (
              <SignalModuleCard key={module.id} module={module} auxiliary />
            ))}
          </div>
        </div>
      </Container>
    </section>
  );
}
