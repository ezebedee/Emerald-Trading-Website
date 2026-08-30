import type { Metadata } from "next";
import { Inter } from "next/font/google";
import type { ReactNode } from "react";

import { siteBrand } from "@/data/site";
import { siteMetadataBase } from "@/lib/seo";

import "./globals.css";

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
  display: "swap",
});

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
  },
  twitter: {
    card: "summary_large_image",
    title: `${siteBrand.name} | ${siteBrand.descriptor}`,
    description: siteBrand.metadataDescription,
  },
};

type RootLayoutProps = Readonly<{
  children: ReactNode;
}>;

export default function RootLayout({ children }: RootLayoutProps) {
  return (
    <html lang="en" className={inter.variable}>
      <body>{children}</body>
    </html>
  );
}
