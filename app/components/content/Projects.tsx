"use client";

import Image from "next/image";
import Link from "next/link";
import { useEffect, useState } from "react";

import {
  manualRepository,
  type Repository,
  reposInfo,
} from "@/app/config/repos";
import { getGithubRepos } from "@/app/lib/server-actions";
import { cn } from "@/app/lib/utils";

import { Skeleton } from "../ui/Skeleton";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "../ui/Tooltip";

export default function Projects() {
  const [hoveredId, setHoveredId] = useState<number | null>(null);
  const [reposArray, setReposArray] = useState<Repository[] | null>(null);

  useEffect(() => {
    (async () => {
      try {
        const repos = await getGithubRepos();
        const reposFix = [
          ...repos.filter((repo: Repository) => reposInfo[repo.name]),
          ...manualRepository,
        ];
        setReposArray(reposFix);
      } catch (error) {
        console.error("Failed to fetch repositories:", error);
      }
    })();
  }, []);

  return (
    <div className="md:fade-in mt-10 grid gap-5 md:grid-cols-3" id="projects">
      {reposArray
        ? reposArray.map((repo) => (
            <article
              className="group flex flex-col gap-3 rounded-md border-4 border-neutral-800 bg-gradient-to-b from-neutral-900 px-3 py-2 hover:z-10 hover:border-neutral-700 hover:bg-gradient-to-t"
              key={repo.id}
              onMouseEnter={() => setHoveredId(repo.id)}
              onMouseLeave={() => setHoveredId(null)}
            >
              <Link
                className="h-24"
                href={repo.homepage ?? "#"}
                target="_blank"
              >
                <Image
                  alt="project image"
                  blurDataURL="/static/icons/blur.svg"
                  className="drag-none h-full w-full rounded-sm object-cover transition-transform group-hover:shadow-emerald-800/20 group-hover:shadow-lg"
                  height={292}
                  placeholder="blur"
                  src={reposInfo[repo.name]?.image}
                  width={512}
                />
              </Link>
              <div className="-mb-2 flex flex-row items-start justify-between pt-2">
                <Link
                  className="w-full"
                  href={repo.homepage || "#"}
                  target="_blank"
                >
                  <p className="line-clamp-1 text-lg text-neutral-300 underline-offset-2 group-hover:underline">
                    {repo.name}
                  </p>
                </Link>
                <TooltipProvider>
                  <Tooltip open={hoveredId === repo.id}>
                    <TooltipTrigger asChild>
                      <p
                        className={cn(
                          "cursor-default select-none rounded-sm px-2 py-0.5 text-neutral-300 text-xs ring-4 ring-neutral-800",
                          {
                            "group-hover:ring-emerald-950":
                              !reposInfo[repo.name]?.isUnderDev,
                            "group-hover:ring-orange-950":
                              reposInfo[repo.name]?.isUnderDev,
                          },
                        )}
                      >
                        state
                      </p>
                    </TooltipTrigger>
                    <TooltipContent
                      className={cn(
                        "origin-[var(--radix-tooltip-content-transform-origin)] scale-in select-none",
                        {
                          "bg-emerald-800": !reposInfo[repo.name]?.isUnderDev,
                          "bg-orange-800": reposInfo[repo.name]?.isUnderDev,
                        },
                      )}
                      sideOffset={10}
                    >
                      {!reposInfo[repo.name].isUnderDev
                        ? "Complete"
                        : "In progress"}
                    </TooltipContent>
                  </Tooltip>
                </TooltipProvider>
              </div>
              <div className="flex flex-row justify-between text-neutral-400">
                <div className="flex items-center gap-[6px] text-sm">
                  {reposInfo[repo.name]?.lang.map((icon) => (
                    <Image
                      alt="tech"
                      className="drag-none opacity-60 hover:opacity-100"
                      height={16}
                      key={`lang-${repo.id}-${icon}`}
                      src={icon}
                      width={16}
                    />
                  ))}
                </div>
                <div className="pointer-events-none flex select-none flex-row items-center gap-1 text-center text-xs">
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
                    {repo.forks_count}
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
                    {repo.stargazers_count}
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
                    {repo.watchers_count}
                  </span>
                </div>
              </div>
              <p className="line-clamp-2 border-neutral-800 border-t-2 pt-3 text-neutral-500 text-sm group-hover:text-neutral-400">
                {repo.description}
              </p>
            </article>
          ))
        : [...Array(6)].map((_, i) => (
            <Skeleton
              className="h-[268px] w-full max-w-full rounded-md md:max-w-[328px]"
              // biome-ignore lint/suspicious/noArrayIndexKey: placeholder skeleton has no stable identity
              key={`skeleton-${i}`}
            />
          ))}
    </div>
  );
}
