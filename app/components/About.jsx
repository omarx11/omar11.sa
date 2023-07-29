import Image from "next/image";
import Link from "next/link";
import Status from "./Status";
import TimeAgo from "../lib/useTimeAgo";
import AboutMe from "./links/About";
import FancyImage from "./content/FancyImage";
import { config } from "@/app/data/config";

export default function About() {
  return (
    <>
      <section className="mb-6 flex flex-col items-center md:mb-0 md:flex-row md:items-start">
        <FancyImage
          src="/static/images/avatar.png"
          width={767}
          height={767}
          quality={100}
          className="h-32 w-32 cursor-pointer rounded-full border-4 border-emerald-600/75 bg-cover drag-none"
          caption={"Guts Face, from (Berserk)."}
          alt="avatar"
          priority
        />
        <div className="ml-0 mt-6 flex flex-col gap-2 md:ml-6 md:mt-0">
          <h1 className="items-center text-2xl font-bold text-emerald-400">
            Hey, I'm {config.authorFull}
            <Image
              src="/static/icons/1f44b-1f3fb.svg"
              width={24}
              height={24}
              className="absolute ml-2 inline-block origin-[70%_70%] animate-wave select-none pt-[2px] drag-none"
              alt="wave-icon"
            />
          </h1>
          <div className="w-full text-justify text-[1rem] leading-[1.4rem] text-neutral-200">
            A self-taught web developer from Saudi Arabia, I'm currently{" "}
            <p className="inline-block w-[98px] text-sm text-emerald-400">
              <TimeAgo />
            </p>{" "}
            years old, Studying in the final stage of College education at{" "}
            <Link
              href="https://tvtc.gov.sa/en/Pages/default.aspx"
              target="_blank"
              className="underline-offset-2 hover:underline"
            >
              TVTC
            </Link>
            . I love developing with javascript and making websites just like
            this one. you can check out more <AboutMe /> ✒️
          </div>
        </div>
      </section>
      <Status />
    </>
  );
}
