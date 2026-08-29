import type { ReactNode } from "react";
import { SiteFooter } from "@/components/layout/site-footer";
import { SiteHeader } from "@/components/layout/site-header";

type SiteLayoutProps = Readonly<{
  children: ReactNode;
}>;

export default function SiteLayout({ children }: SiteLayoutProps) {
  return (
    <div className="bg-background flex min-h-dvh flex-col">
      <SiteHeader />
      <main className="flex-1">{children}</main>
      <SiteFooter />
    </div>
  );
}
