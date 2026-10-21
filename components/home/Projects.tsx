import Image from "next/image";
import Link from "next/link";
import type { ReactNode } from "react";

import { Skeleton } from "@/components/ui/Skeleton";
import { author } from "@/config/meta";
import {
  hasTechIcon,
  PROJECTS_PER_PAGE,
  type ProjectStatus,
  projectSlug,
} from "@/config/projects";
import { simulateFirstVisit } from "@/lib/dev/first-visit";
import { getProjects, type ProjectWithStats } from "@/lib/github";
import { cn } from "@/lib/utils";

import { PageArrow, ProjectsPager, ScrambleText } from "./ProjectsPager";

export default async function Projects() {
  await simulateFirstVisit();
  const projects = await getProjects();

  const pages: ReactNode[][] = [];
  for (let i = 0; i < projects.length; i += PROJECTS_PER_PAGE) {
    const page = pages.length;
    pages.push(
      projects
        .slice(i, i + PROJECTS_PER_PAGE)
        .map((project) => (
          <ProjectCard key={project.name} page={page} project={project} />
        )),
    );
  }

  return (
    <ProjectsPager pages={pages}>
      <ViewAllLink />
    </ProjectsPager>
  );
}

/** Links the card's image and title when the project has a public link. */
function CardLink({
  href,
  className,
  children,
}: {
  href?: string;
  className: string;
  children: ReactNode;
}) {
  if (!href) return <div className={className}>{children}</div>;
  return (
    <Link
      className={className}
      href={href}
      rel="noopener noreferrer"
      target="_blank"
    >
      {children}
    </Link>
  );
}

/** The status pill's hover ring, and its tooltip's colour and text. */
const STATUS: Record<
  ProjectStatus,
  { ring: string; tip: string; label: string }
> = {
  complete: {
    ring: "group-hover:ring-emerald-950",
    tip: "bg-emerald-800",
    label: "Complete",
  },
  dev: {
    ring: "group-hover:ring-orange-950",
    tip: "bg-orange-800",
    label: "In progress",
  },
  archived: {
    ring: "group-hover:ring-neutral-700",
    tip: "bg-neutral-700",
    label: "Archived",
  },
};

function ProjectCard({
  project,
  page,
}: {
  project: ProjectWithStats;
  page: number;
}) {
  return (
    <article className="group flex flex-col gap-3 rounded-md border-4 border-neutral-800 bg-gradient-to-b from-neutral-900 px-3 py-2 hover:border-neutral-700 hover:bg-gradient-to-t">
      <CardLink className="h-24" href={project.href}>
        <Image
          alt={`${projectSlug(project)} preview`}
          blurDataURL="/static/icons/blur.svg"
          className="h-full w-full rounded-xs object-cover transition-transform group-hover:shadow-lg group-hover:shadow-emerald-800/20"
          height={292}
          placeholder="blur"
          src={project.image}
          width={512}
        />
      </CardLink>
      <div className="-mb-2 flex flex-row items-start justify-between pt-2">
        <CardLink className="w-full" href={project.href}>
          <p
            className={cn(
              "line-clamp-1 text-lg text-neutral-300 underline-offset-2",
              project.href && "group-hover:underline",
            )}
          >
            <ScrambleText page={page} text={projectSlug(project)} />
          </p>
        </CardLink>
        {/* The status shows above the pill while the card is hovered. */}
        <span className="relative shrink-0 cursor-default select-none">
          <span
            className={cn(
              "block rounded-xs px-2 py-0.5 text-xs text-neutral-300 ring-4 ring-neutral-800",
              STATUS[project.status].ring,
            )}
          >
            state
          </span>
          <span
            className={cn(
              "pointer-events-none absolute bottom-full left-1/2 mb-2.5 origin-bottom -translate-x-1/2 scale-0 rounded-md px-3 py-1.5 text-sm whitespace-nowrap text-neutral-50 opacity-0 transition-[scale,opacity] duration-150 group-hover:scale-100 group-hover:opacity-100",
              STATUS[project.status].tip,
            )}
          >
            {STATUS[project.status].label}
            {project.note && (
              <span className="text-neutral-300"> · {project.note}</span>
            )}
          </span>
        </span>
      </div>
      {/* Always as tall as the repo stats (icon over count), so every card
            has the same height: a tile holds only two pages at a time, and
            its height would otherwise change with the pages it holds. */}
      <div className="flex min-h-7.5 flex-row justify-between gap-3 text-neutral-400">
        <div className="flex items-center gap-[6px] text-sm">
          {project.tech.filter(hasTechIcon).map((tech) => (
            <Image
              alt={tech}
              className="opacity-60 hover:opacity-100"
              height={16}
              key={tech}
              src={`/static/icons/tech/${tech}.svg`}
              width={16}
            />
          ))}
        </div>
        {/* Work for others says so, in place of the repo stats. */}
        {project.client ? (
          <span className="flex min-w-0 items-center gap-1 text-xs text-neutral-400 select-none">
            <svg
              aria-hidden={true}
              className="shrink-0"
              height="12"
              viewBox="0 0 24 24"
              width="12"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="M9 7V5a2 2 0 0 1 2-2h2a2 2 0 0 1 2 2v2M3 7h18v12H3zM3 12h18"
                fill="none"
                stroke="currentColor"
                strokeLinejoin="round"
                strokeWidth="2"
              />
            </svg>
            <span className="truncate">for a {project.client.kind}</span>
          </span>
        ) : project.stats ? (
          <div className="pointer-events-none flex flex-row items-center gap-1 text-center text-xs select-none">
            <span>
              <svg
                aria-label="Forks icon"
                height="14"
                viewBox="0 0 256 256"
                width="14"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  d="M228 64a36 36 0 1 0-48 33.94V104a12 12 0 0 1-12 12H88a12 12 0 0 1-12-12v-6.06a36 36 0 1 0-24 0V104a36 36 0 0 0 36 36h28v18.06a36 36 0 1 0 24 0V140h28a36 36 0 0 0 36-36v-6.06A36.07 36.07 0 0 0 228 64ZM64 52a12 12 0 1 1-12 12a12 12 0 0 1 12-12Zm64 152a12 12 0 1 1 12-12a12 12 0 0 1-12 12Zm64-128a12 12 0 1 1 12-12a12 12 0 0 1-12 12Z"
                  fill="darkgray"
                />
              </svg>
              {project.stats.forks}
            </span>
            <span>
              <svg
                aria-label="Stars icon"
                fill="#a9a9a9"
                height="14"
                viewBox="0 0 14 16"
                width="14"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  d="M14 6l-4.9-.64L7 1 4.9 5.36 0 6l3.6 3.26L2.67 14 7 11.67 11.33 14l-.93-4.74L14 6z"
                  fillRule="evenodd"
                ></path>
              </svg>
              {project.stats.stars}
            </span>
            <span>
              <svg
                aria-label="Watchers icon"
                height="14"
                viewBox="0 0 24 24"
                width="14"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  d="M12 9a3 3 0 0 0-3 3a3 3 0 0 0 3 3a3 3 0 0 0 3-3a3 3 0 0 0-3-3m0 8a5 5 0 0 1-5-5a5 5 0 0 1 5-5a5 5 0 0 1 5 5a5 5 0 0 1-5 5m0-12.5C7 4.5 2.73 7.61 1 12c1.73 4.39 6 7.5 11 7.5s9.27-3.11 11-7.5c-1.73-4.39-6-7.5-11-7.5Z"
                  fill="darkgray"
                />
              </svg>
              {project.stats.watchers}
            </span>
          </div>
        ) : (
          !project.href && (
            <span className="flex items-center gap-1 text-xs text-neutral-500 select-none">
              <svg
                aria-hidden={true}
                height="12"
                viewBox="0 0 24 24"
                width="12"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  d="M7 11V7a5 5 0 0 1 10 0v4M5 11h14v10H5z"
                  fill="none"
                  stroke="currentColor"
                  strokeLinejoin="round"
                  strokeWidth="2"
                />
              </svg>
              private
            </span>
          )
        )}
      </div>
      {/* A two-line window that never changes size. On hover the rest of a
          longer description scrolls up through it, like a terminal feed:
          the text moves up by its height less the window's (never down, for
          one-line descriptions), and the window's edges fade. Leaving snaps
          it back. */}
      <div className="mt-auto border-t-2 border-neutral-800 pt-3 text-sm">
        <div className="h-[2lh] overflow-hidden group-hover:mask-[linear-gradient(transparent,#000_0.25lh,#000_calc(100%-0.25lh),transparent)]">
          <p className="line-clamp-2 text-neutral-500 transition-[translate] duration-300 ease-out group-hover:translate-y-[min(0px,calc(2lh-100%))] group-hover:text-neutral-400 group-hover:delay-300 group-hover:duration-2500 group-hover:ease-in-out group-hover:[-webkit-line-clamp:unset]">
            {project.description}
          </p>
        </div>
      </div>
    </article>
  );
}

function ViewAllLink() {
  return (
    <Link
      className="group inline-flex h-10 items-center justify-center gap-1 rounded-md bg-neutral-800 px-6 text-neutral-200 hover:underline"
      href={`${author.github}?tab=repositories`}
      target="_blank"
    >
      view all projects{" "}
      <svg
        aria-hidden={true}
        className="text-neutral-400"
        height="1.2rem"
        viewBox="0 0 24 24"
        width="1.2rem"
        xmlns="http://www.w3.org/2000/svg"
      >
        <path
          d="M18.365 5.636h-7.071m7.07 0v7.071m0-7.07L5.638 18.363"
          fill="none"
          stroke="currentColor"
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeWidth="2"
        />
      </svg>
    </Link>
  );
}

const SKELETON_CARDS = ["a", "b", "c", "d", "e", "f"];

/** Card-sized placeholders shown while the repositories load. */
export function ProjectsSkeleton() {
  return (
    <>
      <div
        className="md:fade-in mt-10 grid gap-5 md:grid-cols-3"
        data-page-loading
      >
        {SKELETON_CARDS.map((key) => (
          // As on the original site: from md up, each placeholder replays the
          // grid's staggered fade-up entrance forever, a wave across the
          // cards (its old fade-in set no repeat count, so the pulse's
          // `infinite` stayed). Phones, and anyone who prefers reduced
          // motion, get the plain pulse.
          <Skeleton
            className="h-[268px] w-full max-w-full rounded-md md:max-w-[328px] md:[animation-iteration-count:infinite]! md:motion-reduce:animate-pulse!"
            key={key}
          />
        ))}
      </div>
      <div className="mt-6 flex items-center justify-center gap-3">
        <PageArrow dir="prev" disabled />
        <ViewAllLink />
        <PageArrow dir="next" disabled />
      </div>
    </>
  );
}
