import Link from "next/link";
import Image from "next/image";

export default function Media() {
  return (
    <div className="flex w-full flex-row flex-wrap items-center justify-between">
      <ul className="flex flex-row gap-3">
        <li className="rounded-full bg-stone-800 p-[6px]">
          <Link href="mailto:mail@omar11.sa">
            <Image
              src="./icons/email.svg"
              width={20}
              height={20}
              className="select-none drag-none"
              alt="Email"
            />
          </Link>
        </li>
        <li className="rounded-full bg-stone-800 p-[6px]">
          <Link href="https://twitter.com/dis_x0">
            <Image
              src="./icons/Twitter.svg"
              width={20}
              height={20}
              className="select-none drag-none"
              alt="Twitter"
            />
          </Link>
        </li>
        <li className="rounded-full bg-stone-800 p-[6px]">
          <Link href="https://discordredirect.discordsafe.com/users/582305812903493663">
            <Image
              src="./icons/discord.svg"
              width={20}
              height={20}
              className="select-none drag-none"
              alt="Discord"
            />
          </Link>
        </li>
        <li className="rounded-full bg-stone-800 p-[6px]">
          <Link href="https://github.com/omarx11">
            <Image
              src="./icons/github.svg"
              width={20}
              height={20}
              className="select-none drag-none"
              alt="Github"
            />
          </Link>
        </li>
      </ul>
      <div className="mr-2 flex flex-row items-center gap-2">
        <Link href="#">
          <Image
            src="./icons/statuspages.svg"
            width={24}
            height={24}
            className="select-none drag-none"
            alt="status-icon"
          />
        </Link>
        <div>
          <Image
            src="./icons/settings.svg"
            width={24}
            height={24}
            className="select-none drag-none"
            alt="settings-icon"
          />
        </div>
      </div>
    </div>
  );
}
