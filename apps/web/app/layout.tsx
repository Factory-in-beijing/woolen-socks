import type { Metadata } from "next";
import type { ReactNode } from "react";
import { Noto_Sans_Georgian } from "next/font/google";
import { ka } from "@drivenet/i18n";
import "@drivenet/ui/tokens.css";
import "./globals.css";

const notoSansGeorgian = Noto_Sans_Georgian({
  subsets: ["georgian", "latin"],
  weight: ["400", "600", "700"],
  display: "swap",
  variable: "--font-sans",
});

export const metadata: Metadata = {
  title: ka.brand,
  description: ka.landing.status,
};

export default function RootLayout({ children }: { children: ReactNode }) {
  return (
    <html lang="ka" className={notoSansGeorgian.variable}>
      <body>{children}</body>
    </html>
  );
}
