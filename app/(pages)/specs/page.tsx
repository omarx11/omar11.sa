import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";

import { Heading } from "@/app/components/ui/Heading";
import { author } from "@/app/config/meta";
import * as s from "@/app/config/specs";

export const metadata: Metadata = {
  title: "Specs Page",
  description: `${author.name}'s Equipment Specifications`,
  keywords: [`${author.fullName} Specs`],
  openGraph: {
    title: "Specs Page",
    description: `${author.name}'s Equipment Specifications`,
    url: `${author.siteUrl}/specs`,
    images: [
      {
        url: author.ogImage,
      },
    ],
    type: "website",
  },
};

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
          className="drag-none md:!rotate-2 min-w-full rotate-0 select-none rounded-lg border-4 border-neutral-700 border-dashed bg-neutral-900 object-cover md:rounded-3xl md:border-8"
          height={1080}
          placeholder="blur"
          src="/static/images/042859.png"
          width={1920}
        />
        <div className="flex w-full flex-col justify-center gap-4 md:flex-row">
          <div className="space-y-4">
            <div className="w-full rounded-md bg-neutral-800/50 p-2">
              <h2 className="mb-2 font-bold text-2xl">
                <span className="text-emerald-500">#</span> PC Parts
              </h2>
              <ul className="list-disc space-y-0.5 pl-5 text-sm tracking-wide">
                {s.pc_parts.map(({ name, link }, i) => (
                  <li key={i}>
                    <Link
                      className="decoration-emerald-600 decoration-wavy hover:underline"
                      href={link || "#"}
                      target={link ? "_blank" : "_self"}
                    >
                      {name}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
            <div className="w-full rounded-md bg-neutral-800/50 p-2">
              <h2 className="mb-2 font-bold text-2xl">
                <span className="text-emerald-500">#</span> Virtual Machines
              </h2>
              <ul className="list-disc space-y-0.5 pl-5 text-sm tracking-wide">
                {s.virtual_machines.map(({ name, link }, i) => (
                  <li key={i}>
                    <Link
                      className="decoration-emerald-600 decoration-wavy hover:underline"
                      href={link || "#"}
                      target={link ? "_blank" : "_self"}
                    >
                      {name}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          </div>
          <div className="space-y-4">
            <div className="w-full rounded-md bg-neutral-800/50 p-2">
              <h2 className="mb-2 font-bold text-2xl">
                <span className="text-emerald-500">#</span> Network Informetions
              </h2>
              <ul className="list-disc space-y-0.5 pl-5 text-sm tracking-wide">
                {s.network_info.map(({ name, link }, i) => (
                  <li key={i}>
                    <Link
                      className="decoration-emerald-600 decoration-wavy hover:underline"
                      href={link || "#"}
                      target={link ? "_blank" : "_self"}
                    >
                      {name}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
            <div className="w-full rounded-md bg-neutral-800/50 p-2">
              <h2 className="mb-2 font-bold text-2xl">
                <span className="text-emerald-500">#</span> Other Devices
              </h2>
              <ul className="list-disc space-y-0.5 pl-5 text-sm tracking-wide">
                {s.other_devices.map(({ name, link }, i) => (
                  <li key={i}>
                    <Link
                      className="decoration-emerald-600 decoration-wavy hover:underline"
                      href={link || "#"}
                      target={link ? "_blank" : "_self"}
                    >
                      {name}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
