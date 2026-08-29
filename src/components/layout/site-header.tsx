import Link from "next/link";
import { Container } from "@/components/ui/container";
import { LinkButton } from "@/components/ui/button";
import { DesktopNav } from "@/components/layout/desktop-nav";
import { MobileNav } from "@/components/layout/mobile-nav";

export function SiteHeader() {
  return (
    <header className="sticky top-0 z-40 border-b border-[var(--border)] bg-[rgba(7,10,8,0.94)] backdrop-blur-sm">
      <Container
        size="wide"
        className="flex h-[72px] items-center justify-between gap-8 xl:h-[84px]"
      >
        <Link
          href="/"
          aria-label="Emerald Legacy Systems home"
          className="focus-emerald transition-standard text-foreground hover:text-gold-warm flex min-w-fit items-center gap-3"
        >
          <span aria-hidden="true" className="bg-emerald h-7 w-px" />
          <span className="flex flex-col leading-none">
            <span className="text-sm font-semibold">EMERALD</span>
            <span className="text-gold-muted mt-1 text-[0.68rem] font-semibold tracking-[0.16em]">
              LEGACY SYSTEMS
            </span>
          </span>
        </Link>

        <div className="hidden min-w-0 flex-1 items-center justify-end gap-8 xl:flex">
          <DesktopNav />
          <div className="flex items-center gap-2.5">
            <LinkButton href="/ledger" size="sm" variant="primary">
              Follow Performance
            </LinkButton>
            <LinkButton href="/private-access" size="sm" variant="premium">
              Request Private Access
            </LinkButton>
          </div>
        </div>

        <MobileNav />
      </Container>
    </header>
  );
}
