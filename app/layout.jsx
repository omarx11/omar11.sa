import "./globals.scss";
import { Recursive } from "next/font/google";
import dynamic from "next/dynamic";
import Footer from "./components/Footer";
import About from "./components/About";
import Transition from "./components/Transition";
import NavProvider from "@/app/context/navigation";
import config from "@/app/data/config";

const Navbar = dynamic(() => import("./components/Navbar"), {
  loading: () => (
    <span className="min-h-[28px] w-full animate-pulse rounded-md bg-stone-900"></span>
  ),
  ssr: false,
});

const recursive = Recursive({ subsets: ["latin"] });

export const metadata = {
  metadataBase: new URL(config.siteUrl),
  title: {
    default: config.authorFull,
    template: `%s - ${config.authorFull}`,
  },
  description: config.descriptionFull,
  keywords: config.keywords,
  authors: { name: config.author },
  creator: config.authorFull,
  icons: {
    icon: ["/favicon.ico"],
  },
  themeColor: [
    { media: "(prefers-color-scheme: light)", color: "white" },
    { media: "(prefers-color-scheme: dark)", color: "black" },
  ],
  openGraph: {
    title: "Home",
    description: config.description,
    url: config.siteUrl,
    images: [
      {
        url: config.ogImage,
      },
    ],
    type: "website",
  },
  manifest: "/manifest.json",
};

export default function RootLayout({ children }) {
  return (
    <html
      lang="en"
      className="tracking min-h-screen overflow-x-hidden scroll-smooth antialiased"
    >
      <body
        className={`${recursive.className} flex min-h-screen justify-center`}
      >
        <NavProvider>
          <main className="mx-3 flex max-w-5xl flex-col">
            <header className="h-12 md:h-24"></header>
            <About />
            <hr className="my-4 border-t-8 border-neutral-900" />
            <Navbar />
            <Transition>{children}</Transition>
            <hr className="h-[1px] w-full border-0 bg-stone-800" />
            <Footer />
          </main>
        </NavProvider>
      </body>
    </html>
  );
}
