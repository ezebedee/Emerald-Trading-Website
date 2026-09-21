import type { ReactNode } from "react";

import { LinkButton } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Container } from "@/components/ui/container";
import { Heading } from "@/components/ui/heading";
import { SectionLabel } from "@/components/ui/section-label";

type RecoveryStateProps = Readonly<{
  label: string;
  title: string;
  description: string;
  code?: string;
  actions: ReactNode;
}>;

export function RecoveryState({
  label,
  title,
  description,
  code,
  actions,
}: RecoveryStateProps) {
  return (
    <Container size="narrow" className="py-16 md:py-24">
      <Card variant="elevated">
        <CardContent className="space-y-6 p-6 md:p-8">
          <div className="space-y-3">
            <SectionLabel variant="gold">{label}</SectionLabel>
            {code ? <p className="metric text-emerald-bright">{code}</p> : null}
            <Heading level="h1" size="h2">
              {title}
            </Heading>
            <p className="type-body text-muted-foreground max-w-xl">
              {description}
            </p>
          </div>
          <div className="flex flex-col gap-3 sm:flex-row">{actions}</div>
        </CardContent>
      </Card>
    </Container>
  );
}

export function HomeAction() {
  return (
    <LinkButton href="/" variant="primary">
      Return Home
    </LinkButton>
  );
}

export function LedgerAction() {
  return (
    <LinkButton href="/ledger" variant="secondary">
      View Emerald Ledger
    </LinkButton>
  );
}
