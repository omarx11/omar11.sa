import { author } from "@/app/config/meta";
import Image from "next/image";
import Education from "./Education";
import Certifications from "./Certifications";
import Link from "next/link";

export const metadata = {
  title: "About",
  description: author.description,
  keywords: [`About ${author.fullName}`],
  openGraph: {
    title: "About",
    description: author.description,
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
      {/* <div className="mx-auto mt-0 md:mx-0 md:mt-8 md:pr-6 lg:pr-8">
        <Image
          src="/static/images/IMG_1754000.jpg"
          width={256}
          height={320}
          placeholder="blur"
          blurDataURL="/static/icons/blur.svg"
          className="float-right h-[396px] w-80 rounded-lg border-8 border-dashed border-neutral-800 bg-neutral-900 fill-neutral-800 object-cover"
          alt=""
        />
      </div> */}
      <div className="mx-auto mt-0 md:mx-0 md:mt-8 md:pr-6 lg:pr-12">
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
      </div>
      <div className="max-w-3xl md:order-first md:row-span-2">
        <div className="fade-in mt-6 space-y-7">
          <p className="text-neutral-400">
            <strong className="mb-2 block text-xl font-bold text-neutral-300 md:text-2xl">
              <span className="text-neutral-400">#</span>{" "}
              <span className="text-emerald-500">A</span> kid adventure 👨🏻‍🚀
            </strong>
            I started using my family computer in 2011 when I was 11 years old.
            I started opening an account on Facebook after my cousin told me
            that there was a game called{" "}
            <Link
              href="https://www.facebook.com/FamilyFarmCommunity/about_details"
              target="_blank"
              className="underline underline-offset-2 hover:no-underline"
            >
              Family Farm
            </Link>{" "}
            in it, and I started playing it and became addicted to it for two
            years after I destroyed my father's computer with viruses of course.
            From here my adventures in the sea of the Internet began, and I have
            always thought since I was young, how do these games and websites
            work?
          </p>
          <p className="text-neutral-400">
            <strong className="mb-2 block text-xl font-bold text-neutral-300 md:text-2xl">
              <span className="text-neutral-400">#</span>{" "}
              <span className="text-emerald-500">A</span> hacker goal ☠️
            </strong>
            <Image
              src="/static/images/IMG_190924.jpg"
              width={240}
              height={277}
              placeholder="blur"
              blurDataURL="/static/icons/blur.svg"
              className="drag-none float-right mb-4 ml-4 hidden h-60 w-60 select-none rounded-md border-4 border-emerald-600/50 bg-neutral-800 md:block"
              alt=""
            />
            In the beginning, I had a goal of becoming a hacker and hacking into
            a website on the internet, and that was before something called
            hacking became famous this year. I started learning hacking from
            forums and YouTube, and the explanations were not many and clear,
            but I was excited, however in 2015 I was finally able to hack a
            website with an SQL Injection attack and I was able to upload my
            index to the front page of the website, I remember at that time I
            did not leave anyone in school without telling him that. 😅
          </p>
          <p className="text-neutral-400">
            <strong className="mb-2 block text-xl font-bold text-neutral-300 md:text-2xl">
              <span className="text-neutral-400">#</span>{" "}
              <span className="text-emerald-500">A</span> programming journey 👨🏻‍💻
            </strong>
            In 2016, I started learning to program data packs in the game{" "}
            <Link
              href="https://www.minecraft.net/en-us/about-minecraft"
              target="_blank"
              className="underline underline-offset-2 hover:no-underline"
            >
              Minecraft
            </Link>
            , since I loved the game. And in the first line I wrote the code and
            how it affected the game.. Here I started to love programming and
            began my career in it. After that, I entered into self-learning
            types of programming, including Java, Python, PHP, and JavaScript.
            The thing I loved most was web development, and I continued to do
            that from 2018 until now.
          </p>
          <p className="text-neutral-400">
            <strong className="mb-2 block text-xl font-bold text-neutral-300 md:text-2xl">
              <span className="text-neutral-400">#</span>{" "}
              <span className="text-emerald-500">A</span> beginning of Crohn’s
              💉
            </strong>
            <Image
              src="/static/images/IMG_124409.jpg"
              width={240}
              height={320}
              placeholder="blur"
              blurDataURL="/static/icons/blur.svg"
              className="drag-none float-left mb-4 mr-4 h-48 w-40 select-none rounded-md border-4 border-rose-500/50 bg-neutral-800 md:h-[248px] md:w-60"
              alt=""
            />
            It was time for me to begin my entry into the College of Technology
            in 2019 as a web programmer. Soon after, I was diagnosed with{" "}
            <Link
              href="https://en.wikipedia.org/wiki/Crohn%27s_disease"
              target="_blank"
              className="underline underline-offset-2 hover:no-underline"
            >
              Crohn’s disease
            </Link>{" "}
            by God’s will. And underwent a partial colon resection. Despite the
            challenges, the constant support from my loved ones kept me upbeat
            during my hospital stay. After a short recovery, I was discharged
            from the hospital and Continued my path in life as if nothing had
            happened before!
          </p>
          <p className="text-neutral-400">
            <strong className="mb-2 block text-xl font-bold text-neutral-300 md:text-2xl">
              <span className="text-neutral-400">#</span>{" "}
              <span className="text-emerald-500">A</span> graduation project 👨🏻‍🎓
            </strong>
            At the beginning of 2022, I worked on my first project, which was a
            graduation project. This was after our teacher divided us into
            teams, and each team had three people working on a project. At the
            end of the semester, our team worked hard and we were the first in
            the idea, shape, and design of the project. 🌟 You can take a look
            at{" "}
            <Link
              href="/static/files/graduation_project_ar.pdf"
              target="_blank"
              className="text-sky-600 underline underline-offset-2 hover:no-underline"
            >
              guardion project.pdf
            </Link>
            , we also used techniques Such as JavaScript, NodeJS, and MongoDB
            database.
          </p>
        </div>
      </div>
      <div className="mt-6 md:m-auto md:mt-0 md:pl-14 lg:pl-32">
        <Education />
        <Certifications />
      </div>
    </div>
  );
}
