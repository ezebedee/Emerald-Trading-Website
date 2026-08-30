import {
  ArrowRight,
  BriefcaseBusiness,
  Eye,
  FileSearch,
  Layers3,
  LockKeyhole,
} from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { LinkButton } from "@/components/ui/button";
import { Container } from "@/components/ui/container";
import { SectionLabel } from "@/components/ui/section-label";

const accessPaths = [
  {
    title: "Public Performance",
    description:
      "Open public access to the Emerald Ledger, the documented Forward Performance record for the Public Demo Reference Account.",
    badge: "Public Reference",
    cta: "View Public Performance",
    href: "/ledger",
    icon: Eye,
    isEmphasized: false,
  },
  {
    title: "Private Review",
    description:
      "Selected non-public performance materials may be made available separately to approved viewers, subject to review and distinct from the public demo record.",
    badge: "Controlled Access",
    cta: "Request Private Access",
    href: "/private-access",
    icon: LockKeyhole,
    isEmphasized: true,
  },
] as const;

const processSteps = [
  {
    title: "Public Record",
    description: "The Emerald Ledger remains the public reference point.",
    icon: Layers3,
  },
  {
    title: "Professional Inquiry",
    description: "Professional visitors can review the dedicated overview.",
    icon: BriefcaseBusiness,
  },
  {
    title: "Access Review",
    description: "Private access is controlled and may be provided separately.",
    icon: FileSearch,
  },
  {
    title: "Selected Private Materials",
    description: "Approved viewers may receive access to selected materials.",
    icon: LockKeyhole,
  },
] as const;

export function HomeProfessionalPrivateAccess() {
  return (
    <section className="bg-surface/70 border-y border-[var(--border)] py-14 md:py-16 xl:py-20">
      <Container size="wide">
        <div className="grid gap-8 lg:grid-cols-[minmax(0,0.95fr)_minmax(360px,0.72fr)] xl:gap-12">
          <div className="max-w-4xl">
            <SectionLabel variant="gold">
              Professional & Private Access
            </SectionLabel>
            <h2 className="type-heading-2 text-foreground mt-4 max-w-4xl text-balance">
              Public transparency for everyone. Controlled private review for
              approved professional access.
            </h2>
            <p className="type-body text-muted-foreground mt-5 max-w-2xl">
              The Emerald Ledger remains the public reference record for
              documented Forward Performance on the Public Demo Reference
              Account, while selected private-account performance may be made
              available separately under controlled access.
            </p>

            <div className="mt-8 grid gap-4 md:grid-cols-2">
              {accessPaths.map((path) => {
                const Icon = path.icon;

                return (
                  <article
                    key={path.title}
                    className={
                      path.isEmphasized
                        ? "surface-premium flex min-h-full flex-col rounded-lg p-5 md:p-6"
                        : "surface-elevated flex min-h-full flex-col rounded-lg p-5 md:p-6"
                    }
                  >
                    <div className="flex items-start justify-between gap-4">
                      <Badge
                        variant={path.isEmphasized ? "premium" : "neutral"}
                      >
                        {path.badge}
                      </Badge>
                      <div className="bg-surface-soft text-gold-warm rounded-md border border-[var(--border)] p-2">
                        <Icon aria-hidden="true" className="size-5" />
                      </div>
                    </div>

                    <h3 className="type-heading-3 text-foreground mt-5 text-balance">
                      {path.title}
                    </h3>
                    <p className="type-body-small text-muted-foreground mt-4">
                      {path.description}
                    </p>

                    <div className="mt-auto pt-6">
                      <LinkButton
                        href={path.href}
                        variant={path.isEmphasized ? "primary" : "secondary"}
                        className="w-full sm:w-fit"
                        trailingIcon={<ArrowRight aria-hidden="true" />}
                      >
                        {path.cta}
                      </LinkButton>
                    </div>
                  </article>
                );
              })}
            </div>

            <div className="mt-8 flex flex-col gap-3 sm:flex-row">
              <LinkButton
                href="/private-access"
                size="lg"
                trailingIcon={<ArrowRight aria-hidden="true" />}
              >
                Request Private Access
              </LinkButton>
              <LinkButton href="/professional" variant="secondary" size="lg">
                Professional Overview
              </LinkButton>
            </div>
          </div>

          <aside className="surface-elevated rounded-lg p-5 md:p-6">
            <Badge variant="neutral">Controlled Pathway</Badge>
            <h3 className="type-heading-3 text-foreground mt-4 text-balance">
              Private materials are not publicly exposed.
            </h3>
            <p className="type-body-small text-muted-foreground mt-4">
              Private Access provides a controlled pathway for approved viewers
              to review selected non-public performance materials separately
              from the public demo record.
            </p>

            <div
              aria-hidden="true"
              className="surface-data mt-6 rounded-lg p-4"
            >
              <div className="grid gap-3">
                {processSteps.map((step, index) => {
                  const Icon = step.icon;

                  return (
                    <div key={step.title}>
                      <div className="bg-surface-elevated/90 grid gap-3 rounded-md border border-[var(--border-strong)] p-3">
                        <div className="flex items-center justify-between gap-3">
                          <span className="flex items-center gap-2">
                            <Icon
                              aria-hidden="true"
                              className="text-gold-warm size-4 shrink-0"
                            />
                            <span className="text-foreground text-sm font-semibold">
                              {step.title}
                            </span>
                          </span>
                          <span className="numeric text-subtle-foreground text-xs">
                            0{index + 1}
                          </span>
                        </div>
                        <p className="text-muted-foreground text-sm leading-6">
                          {step.description}
                        </p>
                      </div>
                      {index < processSteps.length - 1 ? (
                        <div className="mx-5 h-4 border-l border-[var(--border-gold)]" />
                      ) : null}
                    </div>
                  );
                })}
              </div>
            </div>
          </aside>
        </div>
      </Container>
    </section>
  );
}
