import Image from "next/image";
import dynamic from "next/dynamic";
import Status from "./Status";
import fs from "node:fs/promises";
import { getPlaiceholder } from "plaiceholder";
import TimeAgo from "../lib/useTimeAgo";
import AboutMe from "./links/About";
import { ContentImage } from "../components/content/ContentImage";

export default async function About() {
  const avatar = await fs.readFile("./public/avatar.jpg");
  const { base64 } = await getPlaiceholder(avatar);
  return (
    <>
      <section className="mb-6 flex flex-col items-center md:mb-0 md:flex-row md:items-start">
        <ContentImage
          src="/avatar.jpg"
          width={128}
          height={128}
          title={"omar face"}
          placeholder="blur"
          blurDataURL={base64}
          className="h-32 w-32 cursor-pointer select-none rounded-full bg-cover drag-none"
          alt="my-avatar"
          priority
        />
        <div className="ml-0 mt-6 flex flex-col gap-2 md:ml-6 md:mt-0">
          <h1 className="items-center text-2xl font-bold">
            {/* Hey, I'm Omar Abdulaziz */}
            Hi, I'm Omar Abdulaziz
            <Image
              src="/icons/1f44b-1f3fb.svg"
              width={24}
              height={24}
              className="absolute ml-2 inline-block origin-[70%_70%] animate-wave select-none pt-[2px] drag-none"
              alt="wave-icon"
            />
          </h1>
          <div className="text-justify text-[1rem] leading-[1.4rem] text-neutral-200">
            a full-stack developer from Saudi Arabia, I'm currently{" "}
            <p className="inline-block w-[98px] text-sm text-emerald-400">
              <TimeAgo />
            </p>{" "}
            years old, studying in the final stage of College education at TVTC,
            I love developing with javascript language, making websites just
            like this one, and you can check out more <AboutMe /> .
          </div>
        </div>
      </section>
      <Status />
    </>
  );
}
