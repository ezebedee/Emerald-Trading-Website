import Link from "next/link";
import { BrandLockup } from "@/components/brand/brand-lockup";
import { Container } from "@/components/ui/container";
import { LinkButton } from "@/components/ui/button";
import { DesktopNav } from "@/components/layout/desktop-nav";
import { HeaderScrollState } from "@/components/layout/header-scroll-state";
import { MobileNav } from "@/components/layout/mobile-nav";
import { siteBrand } from "@/data/site";

export function SiteHeader() {
  return (
    <HeaderScrollState>
      <Container
        size="wide"
        className="flex h-[72px] items-center justify-between gap-8 xl:h-[84px]"
      >
        <Link
          href="/"
          aria-label={`${siteBrand.name} home`}
          className="focus-emerald transition-standard text-foreground hover:text-gold-warm flex min-w-fit items-center gap-3"
        >
          <BrandLockup priority />
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
    </HeaderScrollState>
  );
}
