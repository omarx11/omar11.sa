import Link from "next/link";
import { author } from "@/app/config/meta";
import ActiveLink from "./content/ActiveLink";

export default function Footer() {
  return (
    <footer className="flex flex-row flex-wrap items-center justify-between border-t-[1px] border-neutral-800 pb-6 pt-4 text-sm sm:pb-12">
      <p className="text-[0.8rem] text-neutral-500">
        {new Date().getFullYear()} © {author.fullName} • Made with..{" "}
        <Link
          href="https://nextjs.org/"
          target="_blank"
          className="font-bold underline-offset-2 hover:text-emerald-700 hover:underline"
        >
          NEXT.js
        </Link>
      </p>
      <div className="flex flex-row items-center gap-1 text-neutral-500">
        <Link
          href={`${author.github}/omar11.sa`}
          target="_blank"
          className="hover:underline"
        >
          source
        </Link>
        <span className="text-neutral-500">•</span>
        <ActiveLink
          label="Read more about license"
          href="/license"
          title={
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="1em"
              height="1em"
              viewBox="0 0 24 24"
            >
              <path
                fill="#fcd34d"
                d="M9 10a3.04 3.04 0 0 1 3-3a3.04 3.04 0 0 1 3 3a3.04 3.04 0 0 1-3 3a3.04 3.04 0 0 1-3-3m3 9l4 1v-3.08A7.54 7.54 0 0 1 12 18a7.54 7.54 0 0 1-4-1.08V20m4-16a5.78 5.78 0 0 0-4.24 1.74A5.78 5.78 0 0 0 6 10a5.78 5.78 0 0 0 1.76 4.23A5.78 5.78 0 0 0 12 16a5.78 5.78 0 0 0 4.24-1.77A5.78 5.78 0 0 0 18 10a5.78 5.78 0 0 0-1.76-4.26A5.78 5.78 0 0 0 12 4m8 6a8.04 8.04 0 0 1-.57 2.8A7.84 7.84 0 0 1 18 15.28V23l-6-2l-6 2v-7.72A7.9 7.9 0 0 1 4 10a7.68 7.68 0 0 1 2.33-5.64A7.73 7.73 0 0 1 12 2a7.73 7.73 0 0 1 5.67 2.36A7.68 7.68 0 0 1 20 10Z"
              />
            </svg>
          }
        />
      </div>
    </footer>
  );
}
