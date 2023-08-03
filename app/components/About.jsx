import Image from "next/image";
import Link from "next/link";
import Status from "./Status";
import TimeAgo from "../hooks/useTimeAgo";
import ActiveLink from "../components/content/ActiveLink";
import FancyImage from "./content/FancyImage";
import { author } from "@/app/config/meta";

export default function About() {
  return (
    <>
      <section className="mb-6 flex flex-col items-center md:mb-0 md:flex-row md:items-start">
        <FancyImage
          src="/static/images/avatar.png"
          width={128}
          height={128}
          quality={100}
          className="drag-none min-w-[128px] cursor-pointer rounded-full bg-cover ring-8 ring-emerald-900/50 duration-300 hover:ring-emerald-900"
          caption={"Guts Face, from (Berserk)."}
          alt="avatar"
          priority
        />
        <div className="ml-0 mt-6 flex flex-col gap-2 md:ml-6 md:mt-0">
          <h1 className="items-center text-2xl font-bold text-emerald-400">
            Hey, I'm {author.fullName}
            <Image
              src="/static/icons/1f44b-1f3fb.svg"
              width={24}
              height={24}
              className="drag-none absolute ml-2 inline-block origin-[70%_70%] animate-wave select-none pt-[2px]"
              alt="wave-icon"
            />
          </h1>
          <div className="w-full text-justify text-[1rem] leading-[1.4rem] text-neutral-200">
            A self-taught web developer from Saudi Arabia, I'm currently{" "}
            <p className="inline-block w-[98px] text-sm text-emerald-400">
              <TimeAgo />
            </p>{" "}
            years old, Studying in the final stage of College education 👨‍💼 at{" "}
            <Link
              href="https://tvtc.gov.sa/en/Pages/default.aspx"
              target="_blank"
              className="underline-offset-2 hover:underline"
            >
              TVTC
            </Link>
            . I love developing with javascript and making websites just like
            this one. you can check out more{" "}
            <ActiveLink href="/about" title="about me" /> ✒️
          </div>
        </div>
      </section>
      <Status />
    </>
  );
}
