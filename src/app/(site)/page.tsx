import { HomeHero } from "@/components/home/home-hero";
import { HomeIndicatorsSignalsShowcase } from "@/components/home/home-indicators-signals-showcase";
import { HomeLedgerTeaser } from "@/components/home/home-ledger-teaser";
import { HomePerformanceSnapshot } from "@/components/home/home-performance-snapshot";
import { HomeSystemsShowcase } from "@/components/home/home-systems-showcase";
import { HomeTechnologyResearch } from "@/components/home/home-technology-research";
import { HomeTrustStrip } from "@/components/home/home-trust-strip";

export default function Home() {
  return (
    <>
      <HomeHero />
      <HomeTrustStrip />
      <HomePerformanceSnapshot />
      <HomeLedgerTeaser />
      <HomeSystemsShowcase />
      <HomeIndicatorsSignalsShowcase />
      <HomeTechnologyResearch />
    </>
  );
}
