import type { Metadata } from "next";
import { Manrope, JetBrains_Mono } from "next/font/google";
import "./globals.css";

import { ThemeProvider } from "@/components/providers/theme-provider";
import { RootProvider } from "fumadocs-ui/provider/next";
import { ViewTransitions } from "next-view-transitions";
import { Analytics } from "@vercel/analytics/next";

/* -------------------------------------------------------------------------- */
/*                                   FONTS                                    */
/* -------------------------------------------------------------------------- */

const sans = Manrope({
  subsets: ["latin"],
  variable: "--font-sans",
  display: "swap",
});

const mono = JetBrains_Mono({
  subsets: ["latin"],
  variable: "--font-mono",
  display: "swap",
});

/* -------------------------------------------------------------------------- */
/*                                 METADATA                                   */
/* -------------------------------------------------------------------------- */

export const metadata: Metadata = {
  title: {
    default: "ZenBlocks",
    template: "%s · ZenBlocks",
  },
  description: "ZenBlocks is a modern, animated component library for Next.js. High-performance, physics-enabled primitives for builders.",
  icons: {
    icon: "/logo.svg",
  },
  openGraph: {
    title: "ZenBlocks",
    description: "High-performance component building blocks for the modern web.",
    url: "https://zenblocks-three.vercel.app",
    siteName: "ZenBlocks",
    images: [
      {
        url: "https://zenblocks-three.vercel.app/og.png",
        width: 1200,
        height: 630,
        alt: "ZenBlocks Preview",
      },
    ],
    locale: "en_US",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "ZenBlocks",
    description: "High-performance component building blocks for the modern web.",
    creator: "@sayantan",
    images: ["https://zenblocks-three.vercel.app/og.png"],
  },
};

/* -------------------------------------------------------------------------- */
/*                                ROOT LAYOUT                                 */
/* -------------------------------------------------------------------------- */

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <ViewTransitions>
      <html lang="en" suppressHydrationWarning>
        <body
          className={`
            ${sans.variable}
            ${mono.variable}
            antialiased
            min-h-screen
          `}
        >
          <ThemeProvider
            attribute="class"
            defaultTheme="system"
            enableSystem
            disableTransitionOnChange
          >
            <RootProvider>{children}</RootProvider>
          </ThemeProvider>
          <Analytics />
        </body>
      </html>
    </ViewTransitions>
  );
}
