import Image from "next/image";
import Link from "next/link";
import { rgbDataURL } from "./Tools";
import TimeAgo from "./TimeAgo";

export default function About() {
  return (
    <section className="mb-6 flex flex-col items-center md:mb-0 md:flex-row md:items-start">
      <Image
        src="/avatar.jpg"
        width={128}
        height={128}
        placeholder="blur"
        blurDataURL={rgbDataURL(237, 181, 6)}
        className="h-32 w-32 select-none rounded-full bg-cover drag-none"
        alt="my-avatar"
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
        <div className="text-[1rem] leading-[1.4rem] text-neutral-200">
          I'm a full-stack developer from Saudi Arabia, I'm currently{" "}
          <p className="inline-block w-[114px] text-sm">
            <TimeAgo />
          </p>{" "}
          years old, studying in the last stage of College at TVTC, I love
          developing with javascript language, and making websites just like
          this one, you can check out more{" "}
          <Link
            href="/about"
            className="text-zinc-400 underline underline-offset-2 hover:no-underline"
          >
            About me
          </Link>
          .
        </div>
      </div>
    </section>
  );
}
