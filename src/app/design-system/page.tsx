import type { Metadata } from "next";

import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Container } from "@/components/ui/container";
import { Divider } from "@/components/ui/divider";
import { Heading } from "@/components/ui/heading";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { SectionLabel } from "@/components/ui/section-label";
import { StatusDot } from "@/components/ui/status-dot";
import { Textarea } from "@/components/ui/textarea";
import { TextLink } from "@/components/ui/text-link";
import { createPageMetadata } from "@/lib/seo";

export const metadata: Metadata = createPageMetadata({
  title: "Design System",
  description:
    "Internal design-system QA route for Emerald Legacy Systems visual primitives.",
  path: "/design-system",
  noIndex: true,
  noFollow: true,
});

const colorTokens = [
  ["Background", "--background"],
  ["Surface", "--surface"],
  ["Surface Elevated", "--surface-elevated"],
  ["Surface Soft", "--surface-soft"],
  ["Foreground", "--foreground"],
  ["Muted Foreground", "--muted-foreground"],
  ["Subtle Foreground", "--subtle-foreground"],
  ["Emerald", "--emerald"],
  ["Emerald Bright", "--emerald-bright"],
  ["Gold", "--gold"],
  ["Negative", "--negative"],
  ["Warning", "--warning"],
  ["Info", "--info"],
] as const;

const buttonVariants = [
  "primary",
  "secondary",
  "outline",
  "ghost",
  "premium",
  "danger",
] as const;

const badgeVariants = [
  "default",
  "positive",
  "negative",
  "warning",
  "info",
  "premium",
  "neutral",
  "live",
] as const;

const statuses = ["online", "offline", "warning", "neutral", "live"] as const;

function DemoSection({
  title,
  children,
}: Readonly<{
  title: string;
  children: React.ReactNode;
}>) {
  return (
    <section className="space-y-4">
      <div className="space-y-2">
        <SectionLabel>{title}</SectionLabel>
        <Divider />
      </div>
      {children}
    </section>
  );
}

export default function DesignSystemPage() {
  return (
    <div className="bg-background text-foreground min-h-screen py-10">
      <Container size="wide" className="space-y-9">
        <header className="space-y-3">
          <SectionLabel variant="gold">Development Design System</SectionLabel>
          <Heading level="h1" size="h1">
            Internal QA Route
          </Heading>
          <p className="type-body text-muted-foreground max-w-3xl">
            Foundational tokens and low-level primitives for Emerald Legacy
            Systems. Examples use neutral demonstration labels only.
          </p>
        </header>

        <DemoSection title="Colors">
          <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-4">
            {colorTokens.map(([label, token]) => (
              <Card key={token} variant="default" className="overflow-hidden">
                <div
                  className="h-12 border-b border-[var(--border)]"
                  style={{ background: `var(${token})` }}
                />
                <CardContent className="space-y-1 p-3">
                  <p className="type-body-small font-medium">{label}</p>
                  <p className="text-muted-foreground text-xs">{token}</p>
                </CardContent>
              </Card>
            ))}
          </div>
          <div className="terminal-grid bg-surface text-muted-foreground rounded-lg border border-[var(--border)] p-6">
            Subtle terminal grid utility
          </div>
        </DemoSection>

        <DemoSection title="Typography">
          <div className="space-y-5">
            <p className="type-display-xl">Display XL</p>
            <p className="type-display">Display</p>
            <Heading level="h1">Heading One</Heading>
            <Heading level="h2">Heading Two</Heading>
            <Heading level="h3">Heading Three</Heading>
            <Heading level="h4">Heading Four</Heading>
            <p className="type-body-large text-muted-foreground max-w-3xl">
              Body large text supports explanatory content with clear rhythm and
              calm contrast.
            </p>
            <p className="type-body text-muted-foreground max-w-3xl">
              Body text is set with Inter and tuned for a dark, information-rich
              interface.
            </p>
            <p className="type-body-small text-subtle-foreground">
              Body small text supports secondary annotations.
            </p>
            <p className="type-label text-gold-warm">Section Label</p>
          </div>
        </DemoSection>

        <DemoSection title="Data Typography">
          <div className="grid gap-4 md:grid-cols-3">
            <Card variant="data">
              <CardHeader>
                <CardDescription>TOTAL TRADES</CardDescription>
                <p className="metric-xl value-neutral">499</p>
              </CardHeader>
            </Card>
            <Card variant="data">
              <CardHeader>
                <CardDescription>WIN RATE</CardDescription>
                <p className="metric value-positive">67.89%</p>
              </CardHeader>
            </Card>
            <Card variant="data">
              <CardHeader>
                <CardDescription>EXAMPLE CHANGE</CardDescription>
                <p className="metric value-negative">-2.14%</p>
              </CardHeader>
            </Card>
          </div>
          <div className="overflow-x-auto rounded-lg border border-[var(--border)]">
            <table className="bg-surface w-full min-w-120 border-collapse text-left">
              <thead>
                <tr className="table-row">
                  <th className="table-header px-4 py-3">Metric</th>
                  <th className="table-header px-4 py-3">Type</th>
                  <th className="table-header table-cell-numeric px-4 py-3">
                    Value
                  </th>
                </tr>
              </thead>
              <tbody>
                <tr className="table-row-hover table-row">
                  <td className="px-4 py-3">Performance Type</td>
                  <td className="table-cell-muted px-4 py-3">Forward Record</td>
                  <td className="table-cell-numeric px-4 py-3">12.48%</td>
                </tr>
                <tr className="table-row-hover table-row">
                  <td className="px-4 py-3">Account Type</td>
                  <td className="table-cell-muted px-4 py-3">
                    Public Demo Reference
                  </td>
                  <td className="table-cell-numeric px-4 py-3">1,248</td>
                </tr>
              </tbody>
            </table>
          </div>
        </DemoSection>

        <DemoSection title="Buttons">
          <div className="space-y-4">
            <div className="flex flex-wrap gap-3">
              {buttonVariants.map((variant) => (
                <Button key={variant} variant={variant}>
                  {variant}
                </Button>
              ))}
            </div>
            <div className="flex flex-wrap items-center gap-3">
              <Button size="sm">Small</Button>
              <Button size="md">Medium</Button>
              <Button size="lg">Large</Button>
              <Button disabled>Disabled</Button>
              <Button isLoading>Loading Ready</Button>
            </div>
          </div>
        </DemoSection>

        <DemoSection title="Badges">
          <div className="flex flex-wrap gap-2">
            {badgeVariants.map((variant) => (
              <Badge key={variant} variant={variant}>
                {variant}
              </Badge>
            ))}
            <Badge variant="neutral">Week 02</Badge>
            <Badge variant="premium">Private</Badge>
          </div>
        </DemoSection>

        <DemoSection title="Status">
          <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-5">
            {statuses.map((status) => (
              <Card key={status} variant="default" className="p-4">
                <div className="flex items-center gap-3">
                  <StatusDot status={status} aria-hidden="true" />
                  <span className="type-body-small capitalize">
                    System {status}
                  </span>
                </div>
              </Card>
            ))}
          </div>
        </DemoSection>

        <DemoSection title="Cards">
          <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-5">
            {(
              ["default", "elevated", "data", "premium", "interactive"] as const
            ).map((variant) => (
              <Card key={variant} variant={variant}>
                <CardHeader>
                  <CardTitle className="capitalize">{variant}</CardTitle>
                  <CardDescription>
                    Low-level surface treatment.
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <p className="type-body-small text-muted-foreground">
                    Example Data
                  </p>
                </CardContent>
                <CardFooter>
                  <Badge
                    variant={variant === "premium" ? "premium" : "neutral"}
                  >
                    QA
                  </Badge>
                </CardFooter>
              </Card>
            ))}
          </div>
        </DemoSection>

        <DemoSection title="Dividers">
          <div className="space-y-5">
            <Divider />
            <Divider variant="emerald" />
            <Divider variant="gold" />
          </div>
        </DemoSection>

        <DemoSection title="Links">
          <p className="type-body text-muted-foreground">
            This is a consistent <TextLink href="#links">text link</TextLink>{" "}
            for future editorial and utility use.
          </p>
        </DemoSection>

        <DemoSection title="Optional Forms">
          <Card variant="elevated" className="max-w-2xl p-5">
            <div className="space-y-5">
              <div className="space-y-2">
                <Label htmlFor="example-input">Example input</Label>
                <Input id="example-input" placeholder="Neutral sample text" />
              </div>
              <div className="space-y-2">
                <Label htmlFor="example-error">Error-ready input</Label>
                <Input
                  id="example-error"
                  hasError
                  aria-invalid="true"
                  placeholder="Error state"
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="example-textarea">Example textarea</Label>
                <Textarea
                  id="example-textarea"
                  placeholder="Visual primitive only"
                />
              </div>
            </div>
          </Card>
        </DemoSection>
      </Container>
    </div>
  );
}
