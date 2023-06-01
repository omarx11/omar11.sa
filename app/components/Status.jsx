import Image from "next/image";
import Media from "./Media";
import Discord from "./Discord";

export default function Status() {
  return (
    <ul className="flex flex-col items-start gap-2 pl-3 pt-5 text-stone-300">
      <li>
        <div className="flex h-auto items-center gap-2 text-base md:h-7">
          <Discord id={process.env.DISCORD_ID} />
        </div>
      </li>
      <li>
        <div className="flex items-start">
          <Image
            src="/icons/location.svg"
            width={20}
            height={20}
            className="h-[20px] w-[20px] select-none drag-none"
            alt="location-icon"
          />
          <p className="ml-1 text-sm">Saudi Arabia / Buraydah.</p>
        </div>
      </li>
      <Media />
    </ul>
  );
}
