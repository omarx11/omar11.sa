import "./globals.scss";
import { Recursive } from "next/font/google";
import Footer from "./components/Footer";
import About from "./components/About";
import Navbar from "./components/Navbar";
import Transition from "./components/Transition";
import NavProvider from "@/app/components/context/navigation";
import config from "@/app/data/config";

const recursive = Recursive({ subsets: ["latin"] });

export const metadata = {
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
      className="tracking min-h-screen overflow-x-hidden scroll-smooth text-emerald-400 antialiased"
    >
      <body
        className={`${recursive.className} flex min-h-screen justify-center`}
      >
        <main className="mx-3 flex max-w-5xl flex-col">
          <header className="h-12 md:h-24"></header>
          <NavProvider>
            <About />
            <hr className="my-5 h-[1px] w-full border-0 bg-stone-800" />
            <Navbar />
          </NavProvider>
          <Transition>{children}</Transition>
          <hr className="h-[1px] w-full border-0 bg-stone-800" />
          <Footer />
        </main>
      </body>
    </html>
  );
}
