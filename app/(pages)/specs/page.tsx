import Image from "next/image";
import Link from "next/link";

import { Heading } from "@/app/components/ui/Heading";
import { author } from "@/app/config/meta";
import type { SpecsProps } from "@/app/config/specs";
import * as s from "@/app/config/specs";
import { pageMetadata } from "@/app/lib/metadata";

export const metadata = pageMetadata({
  title: "Specs",
  description: `The hardware and setup ${author.fullName} uses for development and gaming.`,
  path: "/specs",
});

export default function SpecsPage() {
  return (
    <>
      <Heading
        emoji="🗃️"
        name="Specs"
        sId="#specs"
        title="Equipment I currently use for gaming, programming, learning, and every day. 🧐"
      />
      <div className="fade-in my-8 flex flex-col items-center gap-8 text-neutral-300 md:flex-col-reverse">
        <Image
          alt="Specs equipment image"
          blurDataURL="/static/icons/blur.svg"
          className="drag-none min-w-full rotate-0 select-none rounded-lg border-4 border-neutral-700 border-dashed bg-neutral-900 object-cover md:rotate-2! md:rounded-3xl md:border-8"
          height={1080}
          placeholder="blur"
          src="/static/images/042859.png"
          width={1920}
        />
        <div className="flex w-full flex-col justify-center gap-4 md:flex-row">
          <div className="space-y-4">
            <SpecList items={s.pc_parts} title="PC Parts" />
            <SpecList items={s.virtual_machines} title="Virtual Machines" />
          </div>
          <div className="space-y-4">
            <SpecList items={s.network_info} title="Network Information" />
            <SpecList items={s.other_devices} title="Other Devices" />
          </div>
        </div>
      </div>
    </>
  );
}

function SpecList({ title, items }: { title: string; items: SpecsProps[] }) {
  return (
    <div className="w-full rounded-md bg-neutral-800/50 p-2">
      <h2 className="mb-2 font-bold text-2xl">
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
