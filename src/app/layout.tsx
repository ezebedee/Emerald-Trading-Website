import type { Metadata } from "next";
import { Inter } from "next/font/google";
import type { ReactNode } from "react";

import { JsonLd } from "@/components/seo/json-ld";
import { siteBrand } from "@/data/site";
import {
  createCanonicalUrl,
  createOrganizationJsonLd,
  createSocialImageMetadata,
  createWebsiteJsonLd,
  siteMetadataBase,
} from "@/lib/seo";

import "./globals.css";

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
  display: "swap",
});

const defaultSocialImage = createSocialImageMetadata();
const rootJsonLd = [createOrganizationJsonLd(), createWebsiteJsonLd()];

export const metadata: Metadata = {
  title: {
    default: `${siteBrand.name} | ${siteBrand.descriptor}`,
    template: `%s | ${siteBrand.name}`,
  },
  description: siteBrand.metadataDescription,
  metadataBase: siteMetadataBase,
  applicationName: siteBrand.name,
  creator: siteBrand.name,
  publisher: siteBrand.name,
  alternates: {
    canonical: createCanonicalUrl("/"),
  },
  robots: {
    index: true,
    follow: true,
  },
  openGraph: {
    title: `${siteBrand.name} | ${siteBrand.descriptor}`,
    description: siteBrand.metadataDescription,
    url: "/",
    siteName: siteBrand.name,
    type: "website",
    locale: "en_US",
    images: defaultSocialImage ? [defaultSocialImage] : undefined,
  },
  twitter: {
    card: "summary_large_image",
    title: `${siteBrand.name} | ${siteBrand.descriptor}`,
    description: siteBrand.metadataDescription,
    images: defaultSocialImage ? [defaultSocialImage] : undefined,
  },
};

type RootLayoutProps = Readonly<{
  children: ReactNode;
}>;

export default function RootLayout({ children }: RootLayoutProps) {
  return (
    <html lang="en" className={inter.variable}>
      <body>
        <JsonLd data={rootJsonLd} />
        {children}
      </body>
    </html>
  );
}
