import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";

import { author } from "@/app/config/meta";

import Certifications from "./components/Certifications";
import Education from "./components/Education";
import Work from "./components/Work";

export const metadata: Metadata = {
  title: "About Page",
  description: `${author.fullName} resume`,
  keywords: [`About ${author.fullName}`, "web developer", "software engineer"],
  openGraph: {
    title: "About Page",
    description: `${author.fullName} resume`,
    url: `${author.siteUrl}/about`,
    images: [
      {
        url: author.ogImage,
      },
    ],
    type: "website",
  },
};

export default function AboutPage() {
  return (
    <div className="grid grid-cols-1 gap-y-6 md:grid-cols-2 md:grid-rows-[auto_1fr] md:gap-y-20">
      <div className="mx-auto mt-0 md:mx-0 md:mt-8 md:pr-6 lg:pr-8">
        <Image
          alt={`${author.name}s Profile Picture`}
          blurDataURL="/static/icons/blur.svg"
          className="float-right h-[340px] w-72 rounded-lg border-8 border-neutral-800 border-dashed bg-neutral-900 object-cover md:h-[372px] md:w-80"
          height={896}
          placeholder="blur"
          src="/static/images/IMG_105838.jpg"
          width={640}
        />
      </div>
      {/* <div className="mx-auto mt-0 md:mx-0 md:mt-8 md:pr-6 lg:pr-12">
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width="128"
          height="128"
          viewBox="0 0 24 24"
          className="float-right h-72 w-72 rounded-lg border-8 border-dashed border-neutral-800 bg-neutral-900 fill-neutral-800 px-12"
        >
          <g fillRule="evenodd" clipRule="evenodd">
            <path d="M16 9a4 4 0 1 1-8 0a4 4 0 0 1 8 0m-2 0a2 2 0 1 1-4 0a2 2 0 0 1 4 0" />
            <path d="M12 1C5.925 1 1 5.925 1 12s4.925 11 11 11s11-4.925 11-11S18.075 1 12 1M3 12c0 2.09.713 4.014 1.908 5.542A8.986 8.986 0 0 1 12.065 14a8.984 8.984 0 0 1 7.092 3.458A9 9 0 1 0 3 12m9 9a8.963 8.963 0 0 1-5.672-2.012A6.992 6.992 0 0 1 12.065 16a6.991 6.991 0 0 1 5.689 2.92A8.964 8.964 0 0 1 12 21" />
          </g>
        </svg>
      </div> */}
      <div className="max-w-3xl md:order-first md:row-span-2">
        <div className="fade-in mt-6 space-y-7">
          <p className="text-neutral-400">
            <strong className="mb-2 block font-bold text-neutral-300 text-xl md:text-2xl">
              <span className="text-neutral-400">#</span>{" "}
              <span className="text-emerald-500">A</span> Kid’s Adventure 👨🏻‍🚀
            </strong>
            I started using my family computer in 2011 when I was 11 years old.
            I opened a Facebook account after my cousin told me about a game
            called{" "}
            <Link
              className="underline underline-offset-2 hover:no-underline"
              href="https://www.facebook.com/FamilyFarmCommunity/about_details"
              target="_blank"
            >
              Family Farm
            </Link>{" "}
            on it. I started playing and became addicted for two years—until I
            destroyed my {`dad's`} computer with viruses, of course. This marked
            the beginning of my adventures in the vast sea of the Internet.
            Since then, {`I've`} always wondered how these games and websites
            work.
          </p>
          <p className="text-neutral-400">
            <strong className="mb-2 block font-bold text-neutral-300 text-xl md:text-2xl">
              <span className="text-neutral-400">#</span>{" "}
              <span className="text-emerald-500">The</span> Hacker’s Dream ☠️
            </strong>
            <Image
              alt=""
              blurDataURL="/static/icons/blur.svg"
              className="drag-none float-right mb-4 ml-4 hidden h-60 w-60 select-none rounded-md border-4 border-emerald-600/50 bg-neutral-800 md:block"
              height={277}
              placeholder="blur"
              src="/static/images/IMG_190924.jpg"
              width={240}
            />
            Like many kids fascinated by the web, my first dream was to become a
            hacker. This was before hacking became a big buzzword. I scoured
            forums and YouTube, searching for guides and tutorials, even though
            they were few and far between. My excitement never wavered, and by
            2015, I finally achieved my goal. Using an SQL Injection attack, I
            hacked into a website and proudly uploaded my index to its front
            page. I was so thrilled that I couldn’t stop bragging about it at
            school. 😅
          </p>
          <p className="text-neutral-400">
            <strong className="mb-2 block font-bold text-neutral-300 text-xl md:text-2xl">
              <span className="text-neutral-400">#</span>{" "}
              <span className="text-emerald-500">The</span> Programming Journey
              👨🏻‍💻
            </strong>
            In 2016, I started learning to program data packs in{" "}
            <Link
              className="underline underline-offset-2 hover:no-underline"
              href="https://www.minecraft.net/en-us/about-minecraft"
              target="_blank"
            >
              Minecraft
            </Link>
            , a game I enjoyed. The first line of code I wrote and how it
            affected the game ignited my passion for programming. From there, I
            embarked on a self-taught journey, learning languages like Java,
            Python, PHP, and JavaScript. I found web development to be my true
            passion and have pursued it from 2019 until now.
          </p>
          <p className="text-neutral-400">
            <strong className="mb-2 block font-bold text-neutral-300 text-xl md:text-2xl">
              <span className="text-neutral-400">#</span>{" "}
              <span className="text-emerald-500">The</span> Beginning of Crohn’s
              💉
            </strong>
            <Image
              alt=""
              blurDataURL="/static/icons/blur.svg"
              className="drag-none float-left mr-4 mb-4 h-48 w-36 select-none rounded-md border-4 border-rose-500/50 bg-neutral-800 md:h-[248px] md:w-60"
              height={320}
              placeholder="blur"
              src="/static/images/IMG_124409.jpg"
              width={240}
            />
            In 2019, just as I was about to start my studies at the College of
            Technology as a Software Engineer, I was diagnosed with{" "}
            <Link
              className="underline underline-offset-2 hover:no-underline"
              href="https://en.wikipedia.org/wiki/Crohn%27s_disease"
              target="_blank"
            >
              Crohn’s disease
            </Link>{" "}
            and had to undergo a partial colon resection. Despite the
            challenges, the constant support from my loved ones kept me positive
            during my hospital stay. After a short recovery, I was discharged
            and, thank God, continued my life’s journey as if nothing had
            happened!
          </p>
          <p className="text-neutral-400">
            <strong className="mb-2 block font-bold text-neutral-300 text-xl md:text-2xl">
              <span className="text-neutral-400">#</span>{" "}
              <span className="text-emerald-500">The</span> Graduation Project
              👨🏻‍🎓
            </strong>
            At the beginning of 2022, I worked on my first major project, which
            was my graduation project. Our teacher divided us into teams of
            three, and we worked hard on our project throughout the semester. In
            the end, our team excelled, earning the top spot for our idea,
            design, and execution. 🌟 You can take a look at the{" "}
            <Link
              className="text-sky-600 underline underline-offset-2 hover:no-underline"
              href="/static/files/graduation_project_ar.pdf"
              target="_blank"
            >
              Guardion project.pdf
            </Link>
            , where we utilized technologies like JavaScript, NodeJS, and
            MongoDB.
          </p>
        </div>
      </div>
      <div className="mt-6 md:m-auto md:mt-0 md:pl-14 lg:pl-32">
        <div className="flex flex-col items-center gap-4 sm:gap-10 lg:items-start">
          <Work />
          <Education />
          <Certifications />
        </div>
      </div>
    </div>
  );
}
