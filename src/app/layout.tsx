import type { Metadata } from "next";
import type { ReactNode } from "react";
import "./globals.css";

export const metadata: Metadata = {
  title: {
    default: "Emerald Legacy Systems",
    template: "%s | Emerald Legacy Systems",
  },
  description:
    "Quantitative trading systems, algorithmic strategies, market signals, automation, and documented performance.",
  metadataBase: new URL("https://emeraldforexsystem.com"),
};

type RootLayoutProps = Readonly<{
  children: ReactNode;
}>;

export default function RootLayout({ children }: RootLayoutProps) {
  return (
    <html lang="en">
      <body>
        <main>{children}</main>
      </body>
    </html>
  );
}
