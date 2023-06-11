import Link from "next/link";
import Image from "next/image";

export default function Footer() {
  return (
    <footer className="flex flex-row flex-wrap items-center justify-between pb-12 pt-4 text-sm">
      <div className="flex flex-row items-center">
        <p className="text-[0.8rem] text-stone-500">
          {new Date().getFullYear()} © Omar Abdulaziz
        </p>
      </div>
      <div className="flex flex-row items-center gap-1 text-stone-400">
        <Link
          href="https://github.com/omarx11/omar11.sa"
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
            src="/icons/license.svg"
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
