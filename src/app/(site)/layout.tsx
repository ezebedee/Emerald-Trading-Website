import type { ReactNode } from "react";
import { SiteHeader } from "@/components/layout/site-header";

type SiteLayoutProps = Readonly<{
  children: ReactNode;
}>;

export default function SiteLayout({ children }: SiteLayoutProps) {
  return (
    <>
      <SiteHeader />
      <main>{children}</main>
    </>
  );
}
