import Image from "next/image";
import Link from "next/link";
import { Heading } from "@/app/components/ui/Heading";
import * as s from "@/app/configs/specs";
import { author } from "@/app/configs/meta";

export const metadata = {
  title: "Specs Page",
  description: `Specs list for ${author.name}`,
  keywords: [`${author.fullName} Specs`],
  openGraph: {
    title: "Specs Page",
    description: `Specs list for ${author.name}`,
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
      <Heading name="Specs" emoji="🗃️" target="#specs" />
      <h3 className="group relative max-w-max text-neutral-400">
        Equipment I currently use for gaming, programming, learning, and every
        day. 🧐
      </h3>
      <div className="my-8 flex flex-col items-center gap-8 text-neutral-300 md:flex-col-reverse">
        <div className="flex flex-col gap-3 md:flex-row md:gap-8">
          <div>
            <Image
              src="/static/images/042857.png"
              width={640}
              height={360}
              placeholder="blur"
              blurDataURL="/static/icons/blur.svg"
              className="drag-none min-w-full rotate-0 select-none rounded-lg border-4 border-dashed border-neutral-800 bg-neutral-900 object-cover md:rotate-3 md:rounded-3xl md:border-8"
              alt=""
            />
          </div>
          <div className="flex w-auto flex-row gap-1 md:w-[324px] md:flex-col md:gap-4">
            <div>
              <Image
                src="/static/images/1615052384300.jpg"
                width={384}
                height={216}
                placeholder="blur"
                blurDataURL="/static/icons/blur.svg"
                className="drag-none min-w-full select-none rounded-lg border-4 border-dashed border-neutral-800 bg-neutral-900 object-cover md:rounded-2xl md:border-[6px]"
                alt=""
              />
            </div>
            <div>
              <Image
                src="/static/images/orange-pi-5.jpg"
                width={384}
                height={216}
                placeholder="blur"
                blurDataURL="/static/icons/blur.svg"
                className="drag-none min-w-full select-none rounded-lg border-4 border-dashed border-neutral-800 bg-neutral-900 object-cover md:rounded-2xl md:border-[6px]"
                alt=""
              />
            </div>
          </div>
        </div>
        <div className="flex w-full flex-col justify-center gap-4 md:flex-row">
          <div className="space-y-4">
            <div className="w-full rounded-md bg-neutral-800/50 p-2">
              <h2 className="mb-2 text-2xl font-bold">
                <span className="text-emerald-500">#</span> PC Parts
              </h2>
              <ul className="list-disc space-y-0.5 pl-5 text-sm tracking-wide">
                {s.pc_parts.map(({ name, link }, i) => (
                  <li key={i}>
                    <Link
                      href={link ? link : "#"}
                      target={link ? "_blank" : "_self"}
                      className="decoration-emerald-600 hover:underline"
                    >
                      {name}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
            <div className="w-full rounded-md bg-neutral-800/50 p-2">
              <h2 className="mb-2 text-2xl font-bold">
                <span className="text-emerald-500">#</span> Virtual Machines
              </h2>
              <ul className="list-disc space-y-0.5 pl-5 text-sm tracking-wide">
                {s.virtual_machines.map(({ name, link }, i) => (
                  <li key={i}>
                    <Link
                      href={link ? link : "#"}
                      target={link ? "_blank" : "_self"}
                      className="decoration-emerald-600 hover:underline"
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
              <h2 className="mb-2 text-2xl font-bold">
                <span className="text-emerald-500">#</span> Network Informetions
              </h2>
              <ul className="list-disc space-y-0.5 pl-5 text-sm tracking-wide">
                {s.network_info.map(({ name, link }, i) => (
                  <li key={i}>
                    <Link
                      href={link ? link : "#"}
                      target={link ? "_blank" : "_self"}
                      className="decoration-emerald-600 hover:underline"
                    >
                      {name}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
            <div className="w-full rounded-md bg-neutral-800/50 p-2">
              <h2 className="mb-2 text-2xl font-bold">
                <span className="text-emerald-500">#</span> Other Devices
              </h2>
              <ul className="list-disc space-y-0.5 pl-5 text-sm tracking-wide">
                {s.other_devices.map(({ name, link }, i) => (
                  <li key={i}>
                    <Link
                      href={link ? link : "#"}
                      target={link ? "_blank" : "_self"}
                      className="decoration-emerald-600 hover:underline"
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
