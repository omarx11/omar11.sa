import { Heading } from "@/app/components/ui/Heading";
import {
  langs,
  frameworks,
  styles,
  databases,
  services,
  systems,
  editors,
} from "@/app/config/skills";
import Accordion from "./Accordion";
import { author } from "@/app/config/meta";
import { SkillsArray } from "./SkillsArray";

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

export default function SkillsPage() {
  return (
    <>
      <Heading name="Skills" emoji="🛠️" scrollTo="#skills" />
      <h2 className="text-neutral-400">
        Skills and technologies that I use to build things. 😊
      </h2>
      <div className="fade-in-left hs-accordion-group mt-10" id="skills">
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

        <Accordion id="seven" name="Code Editor">
          <SkillsArray data={editors} />
        </Accordion>
      </div>
    </>
  );
}
