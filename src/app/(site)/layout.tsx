import type { ReactNode } from "react";
import { SiteFooter } from "@/components/layout/site-footer";
import { SiteHeader } from "@/components/layout/site-header";

type SiteLayoutProps = Readonly<{
  children: ReactNode;
}>;

export default function SiteLayout({ children }: SiteLayoutProps) {
  return (
    <div className="bg-background flex min-h-dvh flex-col">
      <a
        className="focus-emerald bg-surface-elevated text-foreground fixed top-3 left-3 z-50 -translate-y-20 rounded-md border border-[var(--border-emerald)] px-4 py-3 text-sm font-semibold shadow-[var(--shadow-soft)] transition-transform focus:translate-y-0 focus-visible:translate-y-0"
        href="#main-content"
      >
        Skip to main content
      </a>
      <SiteHeader />
      <main id="main-content" className="flex-1" tabIndex={-1}>
        {children}
      </main>
      <SiteFooter />
    </div>
  );
}
