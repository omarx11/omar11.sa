import Link from "next/link";
import Image from "next/image";
import { mediaInfo } from "@/app/config/media";

export default function Media() {
  return (
    <div className="flex w-full flex-row flex-wrap items-center justify-between pl-0 pt-5 md:pl-3">
      <div className="flex flex-row gap-3">
        {mediaInfo.map((media, index) => (
          <Link
            key={index}
            href={media.href}
            target="_blank"
            className="rounded-full bg-stone-900 p-[6px] hover:bg-stone-800"
          >
            <Image
              src={media.src}
              width={18}
              height={18}
              className="select-none drag-none"
              alt={media.alt}
            />
          </Link>
        ))}
      </div>
      <div className="mr-2 flex flex-row items-center gap-2">
        <Image
          src="./static/icons/settings.svg"
          width={24}
          height={24}
          className="select-none drag-none"
          alt="settings-icon"
        />
      </div>
    </div>
  );
}
