import Media from "./Media";
import Discord from "./Discord";
import { config } from "@/app/data/config";

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
            <p className="text-sm">{config.location}.</p>
          </div>
        </li>
      </ul>
      <Media />
    </>
  );
}
