import { ArrowRight, Check } from "lucide-react";

import { Badge } from "@/components/ui/badge";
import { LinkButton } from "@/components/ui/button";
import { Container } from "@/components/ui/container";
import { SectionLabel } from "@/components/ui/section-label";
import type { PlatformDefinition } from "@/domain";

type RecoveryPlatformsProps = Readonly<{
  platforms: readonly PlatformDefinition[];
}>;

export function RecoveryPlatforms({ platforms }: RecoveryPlatformsProps) {
  return (
    <section className="py-14 md:py-16 xl:py-20">
      <Container size="wide">
        <div className="grid gap-8 lg:grid-cols-[0.8fr_1.2fr] lg:items-start">
          <div>
            <SectionLabel variant="gold">Platform Availability</SectionLabel>
            <h2 className="type-heading-2 text-foreground mt-4 text-balance">
              Public subscription availability across supported platforms.
            </h2>
            <p className="type-body text-muted-foreground mt-5">
              Product-level availability across all four platforms does not
              imply identical UI, settings, workflow, broker behavior, or
              implementation detail.
            </p>
            <div className="mt-7">
              <LinkButton
                href="/platforms"
                variant="secondary"
                trailingIcon={<ArrowRight aria-hidden="true" />}
              >
                Explore Platforms
              </LinkButton>
            </div>
          </div>

          <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
            {platforms.map((platform) => (
              <article
                key={platform.id}
                className="surface-elevated rounded-lg p-5"
              >
                <div className="flex items-center justify-between gap-4">
                  <Badge variant="neutral">{platform.label}</Badge>
                  <Check
                    aria-hidden="true"
                    className="text-emerald-bright size-5"
                  />
                </div>
                <h3 className="text-foreground mt-4 text-lg font-semibold">
                  {platform.name}
                </h3>
                <p className="text-muted-foreground mt-3 text-sm leading-6">
                  Recovery Expert availability is modeled for this platform;
                  specific implementation details remain platform-dependent.
                </p>
              </article>
            ))}
          </div>
        </div>
      </Container>
    </section>
  );
}
