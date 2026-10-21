import { Heading } from "@/components/ui/Heading";
import { author } from "@/config/meta";
import {
  databases,
  editors,
  frameworks,
  languages,
  services,
  styles,
  systems,
} from "@/config/skills";
import { pageMetadata } from "@/lib/metadata";

import Accordion from "./components/Accordion";
import { SkillList } from "./components/SkillList";

export const metadata = pageMetadata({
  title: "Skills",
  description: `The languages, frameworks, databases, services and tools ${author.fullName} uses to build web apps.`,
  path: "/skills",
});

export default function SkillsPage() {
  return (
    <>
      <Heading
        anchor="skills"
        description="Skills and technologies that I use to build things. 😊"
        emoji="🛠️"
        title="Skills"
      />
      <div className="fade-in-left mt-10" id="skills">
        <Accordion title="Programming Languages">
          <SkillList skills={languages} />
        </Accordion>
        <Accordion title="Frameworks">
          <SkillList skills={frameworks} />
        </Accordion>
        <Accordion title="Styling">
          <SkillList skills={styles} />
        </Accordion>
        <Accordion title="Databases">
          <SkillList skills={databases} />
        </Accordion>
        <Accordion title="Services and Deployments">
          <SkillList skills={services} />
        </Accordion>
        <Accordion title="Systems">
          <SkillList skills={systems} />
        </Accordion>
        <Accordion title="Code Editor">
          <SkillList skills={editors} />
        </Accordion>
      </div>
    </>
  );
}
