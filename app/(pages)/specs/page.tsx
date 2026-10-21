import Image from "next/image";
import Link from "next/link";

import { Heading } from "@/components/ui/Heading";
import { author } from "@/config/meta";
import {
  networkInfo,
  otherDevices,
  pcParts,
  type SpecItem,
  virtualMachines,
} from "@/config/specs";
import { pageMetadata } from "@/lib/metadata";

export const metadata = pageMetadata({
  title: "Specs",
  description: `The hardware and setup ${author.fullName} uses for development and gaming.`,
  path: "/specs",
});

export default function SpecsPage() {
  return (
    <>
      <Heading
        anchor="specs"
        description="Equipment I currently use for gaming, programming, learning, and every day. 🧐"
        emoji="🗃️"
        title="Specs"
      />
      <div
        className="fade-in my-8 flex flex-col items-center gap-8 text-neutral-300 md:flex-col-reverse"
        id="specs"
      >
        <Image
          alt="Specs equipment image"
          blurDataURL="/static/icons/blur.svg"
          className="min-w-full rotate-0 rounded-lg border-4 border-dashed border-neutral-700 bg-neutral-900 object-cover md:rotate-2! md:rounded-3xl md:border-8"
          height={1080}
          placeholder="blur"
          src="/static/images/specs-setup.png"
          width={1920}
        />
        <div className="flex w-full flex-col justify-center gap-4 md:flex-row">
          <div className="space-y-4">
            <SpecList items={pcParts} title="PC Parts" />
            <SpecList items={virtualMachines} title="Virtual Machines" />
          </div>
          <div className="space-y-4">
            <SpecList items={networkInfo} title="Network Information" />
            <SpecList items={otherDevices} title="Other Devices" />
          </div>
        </div>
      </div>
    </>
  );
}

function SpecList({ title, items }: { title: string; items: SpecItem[] }) {
  return (
    <div className="w-full rounded-md bg-neutral-800/50 p-2">
      <h2 className="mb-2 text-2xl font-bold">
        <span className="text-emerald-500">#</span> {title}
      </h2>
      <ul className="list-disc space-y-0.5 pl-5 text-sm tracking-wide">
        {items.map(({ name, link }) => (
          <li key={name}>
            {link ? (
              <Link
                className="decoration-emerald-600 decoration-wavy hover:underline"
                href={link}
                rel="noopener noreferrer"
                target="_blank"
              >
                {name}
              </Link>
            ) : (
              name
            )}
          </li>
        ))}
      </ul>
    </div>
  );
}
