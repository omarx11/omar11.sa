import Link from "next/link";
import Image from "next/image";
import { author } from "@/app/config/meta";

export default function Footer() {
  return (
    <footer className="flex flex-row flex-wrap items-center justify-between pb-12 pt-4 text-sm">
      <p className="text-[0.8rem] text-stone-500">
        {new Date().getFullYear()} © {author.fullName} • Made with{" "}
        <Link
          href="https://nextjs.org/"
          target="_blank"
          className="font-bold text-emerald-700 underline-offset-2 hover:underline"
        >
          Next.js
        </Link>
      </p>
      <div className="flex flex-row items-center gap-1 text-stone-400">
        <Link
          href={`${author.github}/omar11.sa`}
          target="_blank"
          className="underline-offset-4 hover:underline"
        >
          source
        </Link>
        <span className="text-stone-500">•</span>
        <Link href="/license" prefetch={false}>
          <Image
            src="/static/icons/license.svg"
            width={16}
            height={16}
            className="select-none drag-none"
            alt="license-icon"
          />
        </Link>
      </div>
    </footer>
  );
}
