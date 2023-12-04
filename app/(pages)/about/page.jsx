import { author } from "@/app/configs/meta";
import Image from "next/image";
import Education from "./Education";
import Achievement from "./Achievement";
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
      <div className="mx-auto mt-0 md:mx-0 md:mt-8 md:pr-6 lg:pr-12">
        <Image
          src="/static/images/profile.jpeg"
          width={384}
          height={433}
          placeholder="blur"
          blurDataURL="/static/icons/blur.svg"
          className="drag-none float-right aspect-square w-72 select-none rounded-lg border-8 border-dashed border-neutral-700 bg-neutral-800 object-cover shadow-lg shadow-neutral-800"
          alt="profile image"
        />
      </div>
      <div className="max-w-3xl md:order-first md:row-span-2">
        <div className="mt-6 space-y-7 text-base text-neutral-400">
          <p>
            <span className="mb-2 block text-xl font-bold md:text-2xl">
              # <span className="text-emerald-500">A</span> kid adventure 👨🏻‍🚀
            </span>
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
          <p>
            <span className="mb-2 block text-xl font-bold md:text-2xl">
              # <span className="text-emerald-500">A</span> hacker goal ☠️
            </span>
            <Image
              src="/static/images/IMG_20171004_190924.jpg"
              width={240}
              height={277}
              placeholder="blur"
              blurDataURL="/static/icons/blur.svg"
              className="drag-none float-right mb-4 ml-4 hidden h-60 w-60 -rotate-3 select-none rounded-md border-4 border-emerald-600/50 bg-neutral-800 md:block"
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
          <p>
            <span className="mb-2 block text-xl font-bold md:text-2xl">
              # <span className="text-emerald-500">A</span> programming journey
              👨🏻‍💻
            </span>
            In 2016, I started learning to program data packs in the game{" "}
            <Link
              href="https://minecraft.net/"
              target="_blank"
              className="underline underline-offset-2 hover:no-underline"
            >
              Minecraft
            </Link>
            , since I loved the game, and in the first line I wrote in the data
            pack file and how it affected the game, here I began to love
            programming and began my career in it. After that, I entered into
            self-learning types of programming, including Java, Python,
            JavaScript, and PHP. The thing I loved most was web development, and
            I continued to do that from 2018 until now.
          </p>
          <p>
            <span className="mb-2 block text-xl font-bold md:text-2xl">
              # <span className="text-emerald-500">A</span> beginning of Crohn’s
              💉
            </span>
            <Image
              src="/static/images/IMG_20230129_124409.jpg"
              width={240}
              height={320}
              placeholder="blur"
              blurDataURL="/static/icons/blur.svg"
              className="drag-none float-left mb-4 mr-4 h-48 w-40 select-none rounded-md border-4 border-rose-500/50 bg-neutral-800 md:h-[248px] md:w-60"
              alt=""
            />
            It was time for me to begin my entry into the College of Technology
            in 2019 as a web programmer. After entering for a short time, I
            contracted a chronic disease called{" "}
            <Link
              href="https://en.wikipedia.org/wiki/Crohn%27s_disease"
              target="_blank"
              className="underline underline-offset-2 hover:no-underline"
            >
              Crohn’s disease
            </Link>
            , by God Almighty’s will. After that, I was admitted to the hospital
            to undergo part of my colon resection. At that time, I was not sad
            at all. On the contrary, my mother, relatives, and friends were
            always visiting me, and I didn't feel tired or exhausted. I was
            discharged from the hospital after a short period. After that, I
            continued my path in life as if nothing had happened to me before!
          </p>
          <p>
            <span className="mb-2 block text-xl font-bold md:text-2xl">
              # <span className="text-emerald-500">A</span> graduation project
              📝
            </span>
            At the beginning of 2022, I worked on my first project, which was a
            graduation project. This was after our teacher divided us into
            teams, and each team had three people working on a project. At the
            end of the semester, our team worked hard and we were the first in
            the idea, shape, and design of the project. You can take a look at{" "}
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
        <Achievement />
      </div>
    </div>
  );
}
