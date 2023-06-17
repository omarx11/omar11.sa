import Image from "next/image";
import Media from "./Media";
import Discord from "./Discord";
import config from "@/app/data/config";

export default function Status() {
  return (
    <>
      <ul className="flex flex-col items-start gap-2 pl-0 pt-5 text-stone-300 md:pl-3">
        <li>
          <div className="flex h-auto items-center gap-2 text-base md:h-7">
            <Discord id={config.discordId} />
          </div>
        </li>
        <li>
          <div className="flex items-start">
            <Image
              src="/static/icons/location.svg"
              width={19}
              height={19}
              className="h-[19px] w-[19px] select-none drag-none"
              alt="location-icon"
            />
            <p className="ml-1 text-sm">{config.location}.</p>
          </div>
        </li>
      </ul>
      <Media />
    </>
  );
}
