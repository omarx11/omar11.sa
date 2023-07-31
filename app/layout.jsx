import "./globals.scss";
import { Recursive } from "next/font/google";
import Navbar from "./components/Navbar";
import Footer from "./components/Footer";
import About from "./components/About";
import Transition from "./components/Transition";
import Providers from "./components/Providers";
import { author } from "@/app/config/meta";

const recursive = Recursive({ subsets: ["latin"] });

export const metadata = {
  metadataBase: new URL(author.siteUrl),
  title: {
    default: author.fullName,
    template: `%s - ${author.fullName}`,
  },
  description: author.descriptionFull,
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
  themeColor: [
    { media: "(prefers-color-scheme: light)", color: "white" },
    { media: "(prefers-color-scheme: dark)", color: "black" },
  ],
  openGraph: {
    title: "Home",
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

export default function RootLayout({ children }) {
  return (
    <html lang="en" className="scroll-smooth">
      <body
        className={`${recursive.className} flex min-h-screen justify-center overflow-x-hidden antialiased`}
      >
        <main className="mx-3 flex max-w-5xl flex-col">
          <Providers>
            <header className="h-12 md:h-24"></header>
            <About />
            <hr className="my-4 border-t-8 border-neutral-900" />
            <Navbar />
            <Transition>{children}</Transition>
            <hr className="h-[1px] w-full border-0 bg-stone-800" />
            <Footer />
          </Providers>
        </main>
      </body>
    </html>
  );
}
