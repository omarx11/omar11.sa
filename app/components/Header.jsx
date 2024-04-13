"use client";

import Image from "next/image";
import Link from "next/link";
import AgeTime from "./content/AgeTime";
import ActiveLink from "./content/ActiveLink";
import PlayAudio from "./content/PlayAudio";
import Discord from "./Discord";
import Media from "./Media";
import dynamic from "next/dynamic";
import { author } from "@/app/config/meta";

const AIBotAssistant = dynamic(() => import("./chatbot/AIBotAssistant"));

export default function Header() {
  return (
    <>
      <header className="mb-6 mt-12 flex flex-col items-center md:mb-0 md:mt-16 md:flex-row xl:mt-24">
        <Image
          src="/static/images/avatar.png"
          width={256}
          height={256}
          quality={100}
          onClick={() => window.location.reload()}
          placeholder="blur"
          blurDataURL="/static/icons/blur.svg"
          className="drag-none h-32 w-32 cursor-pointer rounded-full border-4 border-transparent bg-neutral-900 bg-cover ring-4 ring-emerald-700/70 duration-300 hover:ring-8 hover:ring-emerald-700/50 focus:ring-8 active:ring-8"
          alt="avatar"
        />
        <div className="ml-0 mt-6 flex flex-col md:ml-6 md:mt-0">
          <h1 className="items-center text-2xl font-bold text-neutral-50">
            Hey, I'm <span className="text-emerald-400">{author.fullName}</span>
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="24"
              height="24"
              viewBox="0 0 36 36"
              className="wave -mt-2 ml-3 inline-block origin-[70%_70%]"
            >
              <path
                fill="#E0AA94"
                d="M4.861 9.147c.94-.657 2.357-.531 3.201.166l-.968-1.407c-.779-1.111-.5-2.313.612-3.093 1.112-.777 4.263 1.312 4.263 1.312-.786-1.122-.639-2.544.483-3.331 1.122-.784 2.67-.513 3.456.611l10.42 14.72L25 31l-11.083-4.042L4.25 12.625c-.793-1.129-.519-2.686.611-3.478z"
              />
              <path
                fill="#F7DECE"
                d="M2.695 17.336s-1.132-1.65.519-2.781c1.649-1.131 2.78.518 2.78.518l5.251 7.658c.181-.302.379-.6.6-.894L4.557 11.21s-1.131-1.649.519-2.78c1.649-1.131 2.78.518 2.78.518l6.855 9.997c.255-.208.516-.417.785-.622L7.549 6.732s-1.131-1.649.519-2.78c1.649-1.131 2.78.518 2.78.518l7.947 11.589c.292-.179.581-.334.871-.498L12.238 4.729s-1.131-1.649.518-2.78c1.649-1.131 2.78.518 2.78.518l7.854 11.454 1.194 1.742c-4.948 3.394-5.419 9.779-2.592 13.902.565.825 1.39.26 1.39.26-3.393-4.949-2.357-10.51 2.592-13.903L24.515 8.62s-.545-1.924 1.378-2.47c1.924-.545 2.47 1.379 2.47 1.379l1.685 5.004c.668 1.984 1.379 3.961 2.32 5.831 2.657 5.28 1.07 11.842-3.94 15.279-5.465 3.747-12.936 2.354-16.684-3.11L2.695 17.336z"
              />
              <g fill="#5DADEC">
                <path d="M12 32.042C8 32.042 3.958 28 3.958 24c0-.553-.405-1-.958-1s-1.042.447-1.042 1C1.958 30 6 34.042 12 34.042c.553 0 1-.489 1-1.042s-.447-.958-1-.958z" />
                <path d="M7 34c-3 0-5-2-5-5 0-.553-.447-1-1-1s-1 .447-1 1c0 4 3 7 7 7 .553 0 1-.447 1-1s-.447-1-1-1zM24 2c-.552 0-1 .448-1 1s.448 1 1 1c4 0 8 3.589 8 8 0 .552.448 1 1 1s1-.448 1-1c0-5.514-4-10-10-10z" />
                <path d="M29 .042c-.552 0-1 .406-1 .958s.448 1.042 1 1.042c3 0 4.958 2.225 4.958 4.958 0 .552.489 1 1.042 1s.958-.448.958-1C35.958 3.163 33 .042 29 .042z" />
              </g>
            </svg>
          </h1>
          <div className="group relative mt-1 w-full border-t-4 border-neutral-900 pt-1 text-justify text-[1rem] leading-[1.4rem] text-neutral-200">
            <PlayAudio />A self-taught web developer who's{" "}
            <p className="inline-block w-[98px] text-sm font-bold text-emerald-400">
              <AgeTime />
            </p>{" "}
            y.o & passionate about website programming. I soaked up tons of
            knowledge on my own while studying at the{" "}
            <Link
              href="https://tvtc.gov.sa/en/Pages/default.aspx"
              target="_blank"
              className="underline-offset-2 hover:underline"
            >
              College
            </Link>
            , and I've had a blast working on some awesome projects on my own.
            Now that I'm a recent graduate, I'm on the lookout for a job. Want
            to know more about me? Feel free to{" "}
            <ActiveLink
              href="/about"
              title="dive in.."
              className="underline underline-offset-4 hover:no-underline"
            />{" "}
            ✒️
          </div>
        </div>
      </header>
      <div className="z-20">
        <div className="flex flex-row items-center justify-between pl-0 pt-5 text-neutral-300 md:pl-1">
          <div className="flex flex-col gap-2">
            <Discord />
            <div className="flex">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="18"
                height="18"
                viewBox="0 0 48 48"
                className="mr-2"
              >
                <path
                  fill="currentColor"
                  d="M39.014 28.98A16.925 16.925 0 0 0 41 21c0-9.389-7.611-17-17-17S7 11.611 7 21a16.922 16.922 0 0 0 4 10.955l.02.025c.007.006.013.014.018.02H11l10.088 10.71a4 4 0 0 0 5.823 0L37 32h-.038l.016-.019l.002-.002c.072-.086.144-.172.215-.26a17.038 17.038 0 0 0 1.82-2.74Zm-15.01-1.48a6 6 0 1 1 0-12a6 6 0 0 1 0 12Z"
                />
              </svg>
              <p className="text-sm">{author.location}.</p>
            </div>
          </div>
          <div className="flex flex-row-reverse items-start gap-2">
            <AIBotAssistant />
            <p className="fade-opacity -z-10 -mt-1 hidden rotate-6 select-none rounded-sm bg-neutral-900 px-2 py-1 text-[0.6rem] text-neutral-500 xs:block sm:text-xs">
              {"AI Assistant ->"}
            </p>
          </div>
        </div>
        <div className="flex flex-row flex-wrap items-center justify-between pt-5">
          <Media />
          <Link
            href="https://status.omar11.sa/"
            target="_blank"
            className="text-sm text-emerald-500 duration-100 hover:opacity-80"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="16"
              height="16"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
              className="mr-2 inline text-emerald-500"
            >
              <polyline points="22 12 18 12 15 21 9 3 6 12 2 12"></polyline>
            </svg>
            Status
          </Link>
        </div>
      </div>
    </>
  );
}
