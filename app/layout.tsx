import { Analytics } from "@vercel/analytics/react";
import type { Metadata, Viewport } from "next";
import { Recursive } from "next/font/google";

import { author } from "@/app/config/meta";

import Footer from "./components/Footer";
import Header from "./components/Header";
import Navbar from "./components/Navbar";
import "./globals.css";

// Dev-only toolbar; the static condition lets production builds drop it entirely.
const FirstVisitToolbar =
  process.env.NODE_ENV === "development"
    ? (await import("./components/dev/FirstVisitToolbar")).default
    : null;

const recursive = Recursive({ subsets: ["latin"], display: "swap" });

export const metadata: Metadata = {
  metadataBase: new URL(author.siteUrl),
  title: {
    default: `${author.fullName} — ${author.jobTitle}`,
    template: `%s · ${author.fullName}`,
  },
  description: author.description,
  applicationName: author.siteName,
  authors: [{ name: author.fullName, url: author.siteUrl }],
  creator: author.fullName,
  robots: { index: true, follow: true },
  icons: { icon: "/favicon.ico", apple: "/icon-192x192.png" },
  manifest: "/manifest.json",
  openGraph: {
    type: "website",
    siteName: author.siteName,
    locale: "en_US",
    url: "/",
    title: `${author.fullName} — ${author.jobTitle}`,
    description: author.description,
  },
  twitter: {
    card: "summary_large_image",
    creator: author.twitterHandle,
    title: `${author.fullName} — ${author.jobTitle}`,
    description: author.description,
  },
};

export const viewport: Viewport = {
  // The site is dark-only.
  themeColor: "#000000",
  colorScheme: "dark",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html data-scroll-behavior="smooth" lang="en">
      <body
        className={`${recursive.className} min-h-screen bg-black antialiased`}
      >
        {/* Clips anything wider than the screen (e.g. the 3D certificate
            cards) so phones can't pan sideways; content is still visible up
            to the screen edges. */}
        <div className="flex min-h-screen w-full justify-center overflow-x-clip">
          <main className="mx-3 flex max-w-5xl flex-col">
            <Header />
            <Navbar />
            <div className="my-9 flex-1 overflow-visible">{children}</div>
            <Footer />
          </main>
        </div>
        <Analytics />
        {FirstVisitToolbar && <FirstVisitToolbar />}
      </body>
    </html>
  );
}
