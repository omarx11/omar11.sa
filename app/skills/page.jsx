import Image from "next/image";
import Link from "next/link";
import { Heading } from "../components/content/Heading";
import {
  langs,
  frameworks,
  styles,
  databases,
  services,
  systems,
  editor,
} from "../config/skills";
import Accordion from "../components/content/Accordion";

function SkillsArray({ data }) {
  return data.map(({ name, icon, url, description }, i) => (
    <div
      key={i}
      className="group flex w-full flex-row items-start gap-4 rounded-lg bg-neutral-900 px-0 py-1 duration-300 hover:bg-neutral-800 md:px-2"
    >
      <Link key={i} href={url} target="_blank" className="relative p-1">
        <Image
          src={icon}
          width={64}
          height={64}
          className="min-w-[64px] duration-300 group-hover:opacity-60"
          alt={name}
        />
        <p className="absolute inset-x-0 bottom-2 scale-0 text-center text-xs font-bold text-neutral-200 opacity-0 duration-300 group-hover:scale-100 group-hover:opacity-100">
          {name}
        </p>
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
      <h3 className="text-stone-400">
        Skills and technologies I use to build things. 😊
      </h3>
      <div
        className="hs-accordion-group fade-in mt-10"
        id="skills"
        data-hs-accordion-always-open
      >
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
