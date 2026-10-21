import { readFile } from "node:fs/promises";
import { join } from "node:path";

import { Heading } from "@/components/ui/Heading";
import { author } from "@/config/meta";
import { pageMetadata } from "@/lib/metadata";

export const metadata = pageMetadata({
  title: "License",
  description: `The license for the source code of ${author.siteName}.`,
  path: "/license",
});

// The repo's LICENSE file is the single source of truth. Read once at module
// scope, so it is baked into the static shell at build time.
const license = await readFile(join(process.cwd(), "LICENSE"), "utf-8");
// Paragraphs are separated by blank lines; lines within one are hard-wrapped.
const paragraphs = license
  .trim()
  .split(/\r?\n\s*\r?\n/)
  .map((paragraph) => paragraph.split(/\r?\n/).join(" "));

export default function LicensePage() {
  return (
    <>
      <Heading anchor="license" emoji="📜" title="License" />
      <p className="my-6 w-full border-l-4 border-emerald-900 bg-gradient-to-r from-stone-900 pl-4 text-neutral-400 opacity-60 md:w-[56%]">
        Note: Anyone is free to take inspiration from this site as long as you
        give credit to the original creator, credits should include my full name
        ({author.fullName}) and a link to my site ({author.siteName}).{" "}
        <span className="text-rose-600">❤</span>
      </p>
      <div
        className="w-full space-y-4 border-2 border-neutral-800 bg-neutral-900 p-4 text-justify text-stone-400 md:w-5/6"
        id="license"
      >
        {paragraphs.map((paragraph) => (
          <p key={paragraph}>{paragraph}</p>
        ))}
      </div>
    </>
  );
}
