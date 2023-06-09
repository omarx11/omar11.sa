import Link from "next/link";
import Image from "next/image";
import config from "@/app/data/config";

export default function Footer() {
  return (
    <footer className="flex flex-row flex-wrap items-center justify-between pb-12 pt-4 text-sm">
      <div className="flex flex-row items-center">
        <p className="text-[0.8rem] text-stone-500">
          {new Date().getFullYear()} © {config.authorFull}
        </p>
        <Link href="#" target="_blank">
          <Image
            src="./static/icons/statuspages.svg"
            width={16}
            height={16}
            className="mx-2 select-none drag-none"
            alt="status-icon"
          />
        </Link>
      </div>
      <div className="flex flex-row items-center gap-1 text-stone-400">
        <Link
          href={`${config.github}/omar11.sa`}
          target="_blank"
          className="underline-offset-4 hover:underline"
        >
          source
        </Link>
        <span className="text-stone-500">•</span>
        <Link
          href="/license"
          prefetch={false}
          className="underline-offset-4 hover:underline"
        >
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
