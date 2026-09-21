import type { Metadata } from "next";
import { ArrowRight, BookOpen, FlaskConical, Users } from "lucide-react";
import {
  EngineeringLayout,
  EngineeringSection,
} from "@/components/engineering/content-layout";
import { JsonLd } from "@/components/seo/json-ld";
import { Badge } from "@/components/ui/badge";
import { LinkButton } from "@/components/ui/button";
import { TextLink } from "@/components/ui/text-link";
import { partnerPrograms } from "@/data/content/partners";
import { agentRegistrationUrl, portalLoginUrl } from "@/lib/portal";
import {
  createPageMetadata,
  createRouteWebPageJsonLd,
  routeSeoMetadata,
} from "@/lib/seo";

export const metadata: Metadata = createPageMetadata(
  routeSeoMetadata["/partners"],
);

export default function PartnersPage() {
  return (
    <>
      <JsonLd
        data={createRouteWebPageJsonLd("/partners", [
          { name: "Home", path: "/" },
          { name: "Partner Hub", path: "/partners" },
        ])}
      />
      <EngineeringLayout
        label="Education, support and research"
        title="Emerald Partner Hub"
        introduction="Explore Emerald's trading-technology partner and research-participation pathways: who they are for, the responsibilities involved and what is available today."
      >
        <EngineeringSection title="Participation begins with responsibility">
          <ul className="grid gap-6 md:grid-cols-3">
            {[
              {
                title: "Product understanding",
                text: "Help people understand the tools, their intended use and their limits.",
                icon: BookOpen,
              },
              {
                title: "Accountable support",
                text: "Work within assigned relationships and explicit authorization.",
                icon: Users,
              },
              {
                title: "Research discipline",
                text: "Discuss evidence and methods without promising trading outcomes.",
                icon: FlaskConical,
              },
            ].map(({ title, text, icon: Icon }) => (
              <li key={title}>
                <Icon
                  aria-hidden="true"
                  className="text-gold-warm mb-3 size-5"
                />
                <h3 className="text-lg font-semibold">{title}</h3>
                <p className="text-muted-foreground mt-2 leading-relaxed">
                  {text}
                </p>
              </li>
            ))}
          </ul>
        </EngineeringSection>
        <EngineeringSection title="Apply to become an Emerald Agent">
          <p className="text-muted-foreground max-w-3xl leading-relaxed">
            Register to apply, verify your email and set up Google Authenticator
            MFA in the Portal. Admin review and explicit activation are required
            before Agent access is granted. Existing account holders sign in
            with their current account instead of creating another identity.
          </p>
          <p className="text-muted-foreground max-w-3xl leading-relaxed">
            Registration does not grant licenses or promise income. Super Agent
            is a separate Admin-approved promotion, not a sign-up option.
          </p>
          <div className="flex flex-wrap items-center gap-x-8 gap-y-4">
            <LinkButton
              href={agentRegistrationUrl}
              trailingIcon={<ArrowRight aria-hidden="true" />}
            >
              Register to apply
            </LinkButton>
            <TextLink href={portalLoginUrl}>Sign in</TextLink>
          </div>
        </EngineeringSection>
        <EngineeringSection title="Available now: existing partner access">
          <p className="text-muted-foreground max-w-3xl leading-relaxed">
            Existing approved Agents have authenticated tools for assigned
            Clients and authorized license fulfillment. Access depends on
            current account, role and relationship permissions; signing in does
            not enroll a visitor in a program.
          </p>
          <p className="text-muted-foreground max-w-3xl leading-relaxed">
            Approved Super Agents may oversee assigned Agents and support their
            own direct Clients. This does not provide unrestricted sales or
            fulfillment authority.
          </p>
          <LinkButton
            href={portalLoginUrl}
            trailingIcon={<ArrowRight aria-hidden="true" />}
          >
            Partner Portal
          </LinkButton>
        </EngineeringSection>
        <EngineeringSection title="Program pathways">
          <p className="text-muted-foreground max-w-3xl leading-relaxed">
            These program families are not all open. Existing operational access
            is separate from Agent applications, certification and research
            participation.
          </p>
          <div className="grid gap-5 md:grid-cols-2">
            {partnerPrograms.map((program) => (
              <article
                key={program.id}
                aria-labelledby={program.id}
                className="surface-elevated rounded-lg p-5 md:p-6"
              >
                <Badge variant="neutral">{program.status}</Badge>
                <h3 id={program.id} className="mt-4 text-xl font-semibold">
                  {program.title}
                </h3>
                <p className="text-muted-foreground mt-3 leading-relaxed">
                  {program.audience}
                </p>
                <p className="mt-4 leading-relaxed">{program.responsibility}</p>
                <p className="text-muted-foreground mt-5 border-t border-[var(--border)] pt-4 text-sm leading-relaxed">
                  {program.availability}
                </p>
                {program.id === "mentor-agent" ||
                program.id === "creator-partner" ||
                program.id === "certified-mentor" ||
                program.id === "research-challenge" ||
                program.id === "research-contributor" ? (
                  <LinkButton
                    href={portalLoginUrl}
                    trailingIcon={<ArrowRight aria-hidden="true" />}
                  >
                    {program.id === "research-contributor"
                      ? "Sign in to check invitations"
                      : program.id === "certified-mentor"
                        ? "Sign in to check eligibility"
                        : program.id === "research-challenge"
                          ? "Sign in to participate"
                          : "Sign in to apply"}
                  </LinkButton>
                ) : null}
              </article>
            ))}
          </div>
        </EngineeringSection>
        <EngineeringSection title="Clear expectations, no outcome promises">
          <ul className="text-muted-foreground max-w-3xl list-disc space-y-3 pl-5 leading-relaxed">
            <li>
              Participation does not promise income, trading returns or a
              professional financial-advice qualification.
            </li>
            <li>
              Qualifying partner activity may be governed by documented program
              rules. No commission is paid merely for recruiting another Agent.
            </li>
            <li>
              Mentor and partner relationships are tracked through the Emerald
              platform. Responsibilities remain limited to authorized
              relationships and actions.
            </li>
            <li>
              Research participation does not imply access to proprietary
              methods, acceptance of a contribution or a reward.
            </li>
          </ul>
        </EngineeringSection>
        <EngineeringSection title="Public discovery, authenticated participation">
          <p className="text-muted-foreground max-w-3xl leading-relaxed">
            The Partner Hub explains pathways and expectations publicly. The
            Emerald Portal handles identity and authorization, and will handle
            program applications as each program becomes available. There are no
            public application or submission forms in this Hub.
          </p>
          <p className="text-muted-foreground max-w-3xl leading-relaxed">
            Explore Emerald&apos;s research approach now. Future challenges and
            contributor work will require their own published rules and
            authenticated workflows.
          </p>
          <div className="flex flex-wrap gap-x-8 gap-y-4">
            <TextLink href="/research">Explore Emerald research</TextLink>
            <TextLink href={portalLoginUrl}>
              Sign in to the Emerald Portal
            </TextLink>
          </div>
        </EngineeringSection>
      </EngineeringLayout>
    </>
  );
}
