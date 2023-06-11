import Link from "next/link";
import Image from "next/image";
import { mediaInfo } from "@/app/data/media";

export default function Media() {
  return (
    <div className="flex w-full flex-row flex-wrap items-center justify-between">
      <ul className="flex flex-row gap-3">
        {mediaInfo.map((media, index) => (
          <li
            key={index}
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
