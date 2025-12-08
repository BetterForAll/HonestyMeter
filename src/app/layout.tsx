import React from "react";
import { Inter } from "next/font/google";
import { ClerkProvider } from "@clerk/nextjs";
import Script from "next/script";
import { Analytics } from "@vercel/analytics/react";
import { HomePageProvider, AnalyticsProvider } from "./providers";
import LayoutContent from "./LayoutContent";
import "../globals.css";
import "../global.css";

const inter = Inter({ subsets: ["latin"] });

export const viewport = {
  themeColor: "#1976d2",
  width: "device-width",
  initialScale: 1,
};

export const metadata = {
  title: "Honesty Meter",
  description: "AI powered tool for bias detection",
  icons: {
    icon: "/favicon.ico",
    shortcut: "/favicon.ico",
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <ClerkProvider>
          <AnalyticsProvider>
            <HomePageProvider>
              <LayoutContent>{children}</LayoutContent>
            </HomePageProvider>
          </AnalyticsProvider>
        </ClerkProvider>
        <Analytics />
        <Script src="/badge_script.js" strategy="afterInteractive" />
      </body>
    </html>
  );
}
