import Link from "next/link";
import Image from "next/image";
import { media } from "@/app/config/media";

export default function Media() {
  return (
    <div className="flex w-full flex-row flex-wrap items-center justify-between pl-0 pt-5 md:pl-3">
      <div className="flex flex-row gap-3">
        {media.map(({ url, icon, alt }, i) => (
          <Link
            key={i}
            href={url}
            target="_blank"
            className="rounded-full bg-stone-900 p-[6px] hover:bg-stone-800"
          >
            <Image
              src={icon}
              width={18}
              height={18}
              className="select-none drag-none"
              alt={alt}
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
