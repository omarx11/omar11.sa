import { anime } from "@/config/anime";
import { author } from "@/config/meta";
import { footerPages, menuPages } from "@/config/navigation";
import { type Project, projects, techName } from "@/config/projects";
import {
  databases,
  editors,
  frameworks,
  languages,
  services,
  styles,
  systems,
} from "@/config/skills";
import {
  networkInfo,
  otherDevices,
  pcParts,
  virtualMachines,
} from "@/config/specs";
import { ageInYears } from "@/lib/dates";

const statusText = (project: Project) =>
  project.status === "dev"
    ? "in development"
    : project.status === "archived"
      ? `archived${project.note ? ` (${project.note})` : ""}`
      : project.url
        ? "live"
        : "finished";

const page = (path: string) => new URL(path, author.siteUrl).href;
const links = (items: { name: string; href: string }[]) =>
  items.map((item) => `[${item.name}](${page(item.href)})`).join(", ");
const names = (items: { name: string }[]) =>
  items.map((item) => item.name.replace(/\.$/, "")).join(", ");

/** One compact line per project: link, what it is, when, status, tech, code. */
const projectLines = projects
  .map((project) => {
    // Say so when there's no link, or the model invents one (e.g. /projects).
    const title = project.url
      ? `[${project.name}](${page(project.url)})`
      : `${project.name} (no public link)`;
    const years = project.until
      ? `${project.year}–${project.until}`
      : `${project.year}`;
    const code = project.repo
      ? ` [Code](${author.github}/${project.repo}).`
      : "";
    const client = project.client
      ? ` Client work, built for ${project.client.name}.`
      : "";
    return `- ${title}: ${project.summary ?? project.description} ${years}, ${statusText(project)}.${client} Built with ${project.tech.map(techName).join(", ")}.${code}`;
  })
  .join("\n");

/**
 * Everything the AI assistant knows about Omar and the site: a short fact
 * sheet built from the same config files as the pages. Every token here is
 * re-read for each reply on the Pi, so it keeps the facts and the useful links
 * (projects, code, profiles) and drops shopping links. It must stay the same
 * between requests so the model server can cache it; the live status goes at
 * the end of the prompt.
 */
export const websiteData = async () => {
  const age = Math.floor(Number.parseFloat(ageInYears(author.age)));

  return `## About ${author.name}
- ${author.fullName} ("${author.name}"), ${age} years old, from ${author.city}, ${author.country}.
- Self-taught web developer who loves building websites. Now works full-time as a full-stack developer at Arkanex.
- Education: diploma from the Technical and Vocational Training Corporation (2019 to 2023). His graduation project, Guardion, built with two classmates, took first place.
- Work: full-stack developer at Arkanex, a Saudi business-software company for SMEs (since Aug 2026), working on its corporate website and the Arkanex HR SaaS platform. Before that: salesman in the IT section at Lulu Hypermarket in Unaizah (Mar to Jun 2024); part-time Uber driver in the Qassim area (2023 to 2025).
- His story: got on the family computer in 2011 at age 11 to play Family Farm on Facebook, then crashed his dad's PC with viruses and got curious how games and websites work. Dreamed of being a hacker and, in 2015, hacked a website with SQL injection. In 2016 he started making Minecraft data packs and taught himself Java, Python, PHP and JavaScript. Focused on web development since 2019. Also in 2019 he was diagnosed with Crohn's disease and had part of his colon removed; with his family's support he recovered quickly and kept studying.
- Contact and profiles: email ${author.email}, [GitHub](${author.github}), [X (Twitter)](${author.twitter}), [LinkedIn](${author.linkedIn}), Discord ${author.discordUsername}, CV (the "Download CV" button on the [About page](${page("/about")})).

## Projects (newest and strongest first; the home page, ${page("/")}, features a few of them; there is no separate projects page)
${projectLines}
- All his repositories: [GitHub](${author.github}?tab=repositories).

## Skills ([Skills page](${page("/skills")}))
- Languages: ${names(languages)}.
- Frameworks: ${names(frameworks)}. Styling: ${names(styles)}. Databases: ${names(databases)}.
- Services: ${names(services)}. Systems: ${names(systems)}. Editor: ${names(editors)}.

## His setup ([Specs page](${page("/specs")}))
- PC parts: ${names(pcParts)}.
- Other devices: ${names(otherDevices)}. His Orange Pi 5 runs this AI assistant.
- Network: ${names(networkInfo)}.
- Virtual machines: ${names(virtualMachines)}.

## Favorites
- Top ${anime.length} anime ([Anime page](${page("/anime")})): ${names(anime)}.
- Games ([Games page](${page("/games")})): owns 150+ games, 11,000+ hours played, favorites are Valheim and No Man's Sky. The page shows his recently played games and full collection.

## The website's pages
- ${menuPages.length} pages in the menu: ${links(menuPages)}. Linked in the footer: ${links(footerPages)}.
- About: his education, jobs and story. Guestbook: visitors leave public comments after signing in with GitHub or Google. License: the site's MIT license.`;
};
