import { Heading } from "@/app/components/ui/Heading";
import { author } from "@/app/config/meta";
import {
  databases,
  editors,
  frameworks,
  langs,
  services,
  styles,
  systems,
} from "@/app/config/skills";
import { pageMetadata } from "@/app/lib/metadata";

import Accordion from "./components/Accordion";
import { SkillsArray } from "./components/SkillsArray";

export const metadata = pageMetadata({
  title: "Skills",
  description: `The languages, frameworks, databases, services and tools ${author.fullName} uses to build web apps.`,
  path: "/skills",
});

export default function SkillsPage() {
  return (
    <>
      <Heading
        emoji="🛠️"
        name="Skills"
        sId="#skills"
        title="Skills and technologies that I use to build things. 😊"
      />
      <div className="fade-in-left mt-10" id="skills">
        <Accordion name="Programming Languages">
          <SkillsArray data={langs} />
        </Accordion>
        <Accordion name="Frameworks">
          <SkillsArray data={frameworks} />
        </Accordion>
        <Accordion name="Styling">
          <SkillsArray data={styles} />
        </Accordion>
        <Accordion name="Databases">
          <SkillsArray data={databases} />
        </Accordion>
        <Accordion name="Services and Deployments">
          <SkillsArray data={services} />
        </Accordion>
        <Accordion name="Systems">
          <SkillsArray data={systems} />
        </Accordion>
        <Accordion name="Code Editor">
          <SkillsArray data={editors} />
        </Accordion>
      </div>
    </>
  );
}
