import { HomeHero } from "@/components/home/home-hero";
import { HomePerformanceSnapshot } from "@/components/home/home-performance-snapshot";
import { HomeTrustStrip } from "@/components/home/home-trust-strip";

export default function Home() {
  return (
    <>
      <HomeHero />
      <HomeTrustStrip />
      <HomePerformanceSnapshot />
    </>
  );
}
