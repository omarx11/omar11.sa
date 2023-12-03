import Image from "next/image";
import Link from "next/link";
import { Heading } from "@/app/components/ui/Heading";
import {
  langs,
  frameworks,
  styles,
  databases,
  services,
  systems,
  editor,
} from "@/app/configs/skills";
import Accordion from "./Accordion";
import { author } from "@/app/configs/meta";

export const metadata = {
  title: "Skills Page",
  description: `Skills and technologies for ${author.name}`,
  keywords: [`${author.fullName} Tech skills`],
  openGraph: {
    title: "Skills Page",
    description: `Skills and technologies for ${author.name}`,
    url: `${author.siteUrl}/skills`,
    images: [
      {
        url: author.ogImage,
      },
    ],
    type: "website",
  },
};

function SkillsArray({ data }) {
  return data.map(({ name, icon, url, description }, i) => (
    <div
      key={i}
      className="group flex w-full flex-row items-start gap-2 rounded-lg bg-neutral-900 px-0 py-1 duration-300 hover:bg-neutral-800 md:px-2"
    >
      <Link key={i} href={url} target="_blank" className="relative p-1">
        <Image
          src={icon}
          width={48}
          height={48}
          placeholder="blur"
          blurDataURL="/static/icons/blur.svg"
          className="min-w-[48px] bg-neutral-800 duration-150 group-hover:opacity-60"
          alt={name}
        />
      </Link>
      <p className="my-auto w-full pr-0 text-sm text-neutral-400 group-hover:text-neutral-300 md:pr-2 md:text-base">
        {description}
      </p>
    </div>
  ));
}

export default function SkillsPage() {
  return (
    <>
      <Heading name="Skills" emoji="🛠️" target="#skills" />
      <h2 className="text-neutral-400">
        Skills and technologies that I use to build things. 😊
      </h2>
      <div className="hs-accordion-group fade-in mt-10" id="skills">
        <Accordion id="one" name="Programming Languages">
          <SkillsArray data={langs} />
        </Accordion>

        <Accordion id="two" name="Frameworks">
          <SkillsArray data={frameworks} />
        </Accordion>

        <Accordion id="three" name="Styling">
          <SkillsArray data={styles} />
        </Accordion>

        <Accordion id="four" name="Databases">
          <SkillsArray data={databases} />
        </Accordion>

        <Accordion id="five" name="Services and Deployments">
          <SkillsArray data={services} />
        </Accordion>

        <Accordion id="six" name="Systems">
          <SkillsArray data={systems} />
        </Accordion>

        <Accordion id="seven" name="Text Editor">
          <SkillsArray data={editor} />
        </Accordion>
      </div>
    </>
  );
}
