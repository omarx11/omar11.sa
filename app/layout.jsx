import "./globals.scss";
import { Recursive } from "next/font/google";
import Navbar from "./components/Navbar";
import Footer from "./components/Footer";
import Header from "./components/Header";
import Transition from "./components/Transition";
import Providers from "./components/Providers";
import { author } from "@/app/configs/meta";

const recursive = Recursive({ subsets: ["latin"] });

export const metadata = {
  metadataBase: new URL(author.siteUrl),
  title: {
    default: author.fullName,
    template: `%s - ${author.fullName}`,
  },
  description: author.description,
  keywords: [
    "Omar Abdulaziz",
    "Omar Website",
    "Omar Portfolio",
    "omar11",
    "omar11.sa",
  ],
  authors: { name: author.name },
  creator: author.fullName,
  icons: {
    icon: ["/favicon.ico"],
  },
  openGraph: {
    title: "Home Page",
    description: author.description,
    url: author.siteUrl,
    images: [
      {
        url: author.ogImage,
      },
    ],
    type: "website",
  },
  manifest: "/manifest.json",
};

export const viewport = {
  themeColor: [
    { media: "(prefers-color-scheme: light)", color: "cyan" },
    { media: "(prefers-color-scheme: dark)", color: "black" },
  ],
};

export default function RootLayout({ children }) {
  return (
    <html lang="en" className="scroll-smooth">
      <body
        className={`${recursive.className} flex min-h-screen justify-center overflow-x-hidden bg-neutral-950 antialiased`}
      >
        <main className="mx-3 flex max-w-5xl flex-col">
          <Providers>
            <Header />
            <Navbar />
            <Transition>{children}</Transition>
            <Footer />
          </Providers>
        </main>
      </body>
    </html>
  );
}
