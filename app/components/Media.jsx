import Link from "next/link";
import Image from "next/image";

const mediaInfo = [
  {
    href: "mailto:mail@omar11.sa",
    src: "/icons/email.svg",
    alt: "email-icon",
  },
  {
    href: "https://twitter.com/dis_x0",
    src: "/icons/twitter.svg",
    alt: "twitter-icon",
  },
  {
    href: "https://discordredirect.discordsafe.com/users/582305812903493663",
    src: "/icons/discord.svg",
    alt: "discord-icon",
  },
  {
    href: "https://github.com/omarx11",
    src: "/icons/github.svg",
    alt: "github-icon",
  },
];

export default function Media() {
  return (
    <div className="flex w-full flex-row flex-wrap items-center justify-between">
      <ul className="flex flex-row gap-3">
        {mediaInfo.map((media, index) => (
          <li
            key={media.index}
            className="rounded-full bg-stone-900 p-[6px] hover:bg-stone-800"
          >
            <Link href={media.href}>
              <Image
                src={media.src}
                width={20}
                height={20}
                className="select-none drag-none"
                alt={media.alt}
              />
            </Link>
          </li>
        ))}
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
