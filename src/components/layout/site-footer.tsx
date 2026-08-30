import Link from "next/link";
import { BrandLockup } from "@/components/brand/brand-lockup";
import { Badge } from "@/components/ui/badge";
import { Container } from "@/components/ui/container";
import { siteBrand } from "@/data/site";

const footerSections = [
  {
    title: "Performance",
    ariaLabel: "Footer Performance",
    links: [
      { href: "/ledger", label: "Emerald Ledger" },
      { href: "/performance", label: "System Performance" },
      { href: "/performance/compare", label: "Compare Systems" },
      { href: "/performance/live-vs-backtest", label: "Live vs Backtest" },
      { href: "/verification", label: "Verification" },
      { href: "/videos", label: "Video Archive" },
    ],
  },
  {
    title: "Products",
    ariaLabel: "Footer Products",
    links: [
      { href: "/systems", label: "Systems" },
      { href: "/indicators", label: "Indicators & Signals" },
      { href: "/signals", label: "Signal Dashboard" },
      { href: "/technology", label: "Technology" },
    ],
  },
  {
    title: "Company & Research",
    ariaLabel: "Footer Company and Research",
    links: [
      { href: "/research", label: "Research" },
      { href: "/about", label: "About" },
      { href: "/professional", label: "Professional / Investor" },
      { href: "/private-access", label: "Private Access" },
    ],
  },
] as const;

const legalLinks = [
  { href: "/privacy", label: "Privacy" },
  { href: "/terms", label: "Terms" },
  { href: "/risk-disclosure", label: "Risk Disclosure" },
] as const;

const footerLinkClassName =
  "focus-emerald transition-standard text-muted-foreground hover:text-gold-warm hover:underline hover:decoration-[var(--border-gold)] hover:underline-offset-4";

export function SiteFooter() {
  const year = new Date().getFullYear();

  return (
    <footer className="bg-surface border-t border-[var(--border-strong)]">
      <Container
        size="wide"
        className="grid gap-10 py-14 md:py-16 lg:grid-cols-[minmax(0,1.15fr)_minmax(0,2fr)] lg:gap-14 xl:py-20"
      >
        <section aria-label="Emerald Legacy Systems positioning">
          <Link
            href="/"
            aria-label={`${siteBrand.name} home`}
            className="focus-emerald transition-standard text-foreground hover:text-gold-warm inline-flex items-center gap-3"
          >
            <BrandLockup variant="footer" showDescriptor />
          </Link>

          <p className="type-body-small text-muted-foreground mt-5 max-w-md">
            {siteBrand.positioning}
          </p>

          <div className="mt-6 flex flex-wrap gap-2">
            <Badge variant="neutral">PUBLIC DEMO REFERENCE</Badge>
            <Badge variant="premium">FORWARD PERFORMANCE</Badge>
          </div>

          <div className="mt-8 grid gap-2 text-sm">
            <p className="text-subtle-foreground">{siteBrand.domain}</p>
            <a
              href={`mailto:${siteBrand.supportEmail}`}
              className={footerLinkClassName}
            >
              {siteBrand.supportEmail}
            </a>
          </div>
        </section>

        <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-3 lg:gap-10">
          {footerSections.map((section) => (
            <nav key={section.title} aria-label={section.ariaLabel}>
              <p className="type-label text-gold-muted">{section.title}</p>
              <ul className="mt-4 grid gap-3">
                {section.links.map((link) => (
                  <li key={link.href}>
                    <Link href={link.href} className={footerLinkClassName}>
                      {link.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </nav>
          ))}
        </div>
      </Container>

      <Container size="wide" className="pb-10">
        <section
          aria-label="Footer trust and disclosure"
          className="border-t border-[var(--border)] pt-6"
        >
          <p className="type-body-small text-muted-foreground max-w-4xl">
            Public results are documented through a designated demo reference
            account. Private performance records are restricted to authorized
            access.
          </p>
          <p className="type-body-small text-muted-foreground mt-4 max-w-5xl">
            Trading involves substantial risk. Past or simulated performance is
            not indicative of future results. Public performance shown by{" "}
            {siteBrand.name} may include demo/reference-account results and
            should not be interpreted as a guarantee of future performance.
          </p>
          <p className="type-body-small text-muted-foreground mt-3 max-w-5xl">
            Information provided is for technology, research, and informational
            purposes and is not personalized investment advice.
          </p>
        </section>
      </Container>

      <div className="border-t border-[var(--border)]">
        <Container
          size="wide"
          className="text-subtle-foreground flex flex-col gap-4 py-6 text-sm sm:flex-row sm:items-center sm:justify-between"
        >
          <p>
            &copy; {year} {siteBrand.name}
          </p>
          <nav aria-label="Footer legal">
            <ul className="flex flex-wrap gap-x-5 gap-y-2">
              {legalLinks.map((link) => (
                <li key={link.href}>
                  <Link href={link.href} className={footerLinkClassName}>
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </nav>
        </Container>
      </div>
    </footer>
  );
}
