import { HomeHero } from "@/components/home/home-hero";
import { HomeLedgerTeaser } from "@/components/home/home-ledger-teaser";
import { HomePerformanceSnapshot } from "@/components/home/home-performance-snapshot";
import { HomeTrustStrip } from "@/components/home/home-trust-strip";

export default function Home() {
  return (
    <>
      <HomeHero />
      <HomeTrustStrip />
      <HomePerformanceSnapshot />
      <HomeLedgerTeaser />
    </>
  );
}
