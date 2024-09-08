import type { Metadata } from "next";
import Accordion from "./components/Accordion";
import { Heading } from "@/app/components/ui/Heading";
import { SkillsArray } from "./components/SkillsArray";
import { author } from "@/app/config/meta";
import {
  langs,
  frameworks,
  styles,
  databases,
  services,
  systems,
  editors,
} from "@/app/config/skills";

export const metadata: Metadata = {
  title: "Skills Page",
  description: `Showcase ${author.name}'s skills and techs`,
  keywords: [`${author.fullName} Tech skills`],
  openGraph: {
    title: "Skills Page",
    description: `Showcase ${author.name}'s skills and techs`,
    url: `${author.siteUrl}/skills`,
    images: [
      {
        url: author.ogImage,
      },
    ],
    type: "website",
  },
};

export default function SkillsPage() {
  return (
    <>
      <Heading
        name="Skills"
        emoji="🛠️"
        sId="#skills"
        title="Skills and technologies that I use to build things. 😊"
      />
      <div className="fade-in-left hs-accordion-group mt-10" id="skills">
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
