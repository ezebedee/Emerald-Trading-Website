import { HomeFinalCta } from "@/components/home/home-final-cta";
import { HomeHero } from "@/components/home/home-hero";
import { HomeIndicatorsSignalsShowcase } from "@/components/home/home-indicators-signals-showcase";
import { HomeLedgerTeaser } from "@/components/home/home-ledger-teaser";
import { HomePerformanceSnapshot } from "@/components/home/home-performance-snapshot";
import { HomeProfessionalPrivateAccess } from "@/components/home/home-professional-private-access";
import { HomeSystemsShowcase } from "@/components/home/home-systems-showcase";
import { HomeTechnologyResearch } from "@/components/home/home-technology-research";
import { HomeTrustStrip } from "@/components/home/home-trust-strip";
import { HomeVideoArchivePreview } from "@/components/home/home-video-archive-preview";
import { HomeVerificationTransparency } from "@/components/home/home-verification-transparency";
import {
  getHomepageFeaturedConfiguration,
  getHomepageFeaturedSystemContext,
  getHomepageLedgerTeaserEntriesForConfiguration,
  getHomepagePerformanceSnapshotForConfiguration,
  getHomepageVerificationRecordsForConfiguration,
  getHomepageVideoPreviewEntriesForConfiguration,
} from "@/data/selectors";

export default function Home() {
  const featuredConfiguration = getHomepageFeaturedConfiguration();
  const featuredConfigurationId = featuredConfiguration?.id;
  const featuredSystemContext = getHomepageFeaturedSystemContext();
  const performanceSnapshot = featuredConfigurationId
    ? getHomepagePerformanceSnapshotForConfiguration(featuredConfigurationId)
    : undefined;
  const ledgerTeaserEntries = featuredConfigurationId
    ? getHomepageLedgerTeaserEntriesForConfiguration(featuredConfigurationId)
    : [];
  const verificationRecords = featuredConfigurationId
    ? getHomepageVerificationRecordsForConfiguration(featuredConfigurationId)
    : [];
  const videoPreviewEntries = featuredConfigurationId
    ? getHomepageVideoPreviewEntriesForConfiguration(featuredConfigurationId)
    : [];

  return (
    <>
      <HomeHero />
      <HomeTrustStrip />
      <HomePerformanceSnapshot
        configurationScope={featuredSystemContext?.configuration}
        summary={performanceSnapshot}
      />
      <HomeLedgerTeaser
        configurationScope={featuredSystemContext?.configuration}
        entries={ledgerTeaserEntries}
      />
      <HomeSystemsShowcase context={featuredSystemContext} />
      <HomeIndicatorsSignalsShowcase />
      <HomeTechnologyResearch />
      <HomeVerificationTransparency records={verificationRecords} />
      <HomeVideoArchivePreview videos={videoPreviewEntries} />
      <HomeProfessionalPrivateAccess />
      <HomeFinalCta />
    </>
  );
}
