import Link from "next/link";
import Image from "next/image";
import { Heading } from "./components/ui/Heading";
import GithubCal from "./components/content/GithubCal";
import { reposInfo, manualRepository } from "./config/repos";
import { cn } from "./lib/utils";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "./components/ui/Tooltip";
import { getGithubRepos } from "./lib/fetchRequests";

export default async function HomePage() {
  const repos = await getGithubRepos();

  const reposArray = [
    ...repos.filter((repo) => reposInfo[repo.name]),
    ...manualRepository,
  ];

  return (
    <>
      <Heading name="Projects" emoji="🖥️" scrollTo="#projects" />
      <h3 className="group relative max-w-max text-neutral-400">
        Here's all of my personal projects that I've worked on. You can support
        me by starring! ⭐
      </h3>
      <div className="fade-in mt-10 grid gap-5 md:grid-cols-3" id="projects">
        {reposArray
          ? reposArray.map((repo) => (
              <div
                key={repo.id}
                className="group flex flex-col gap-3 rounded-md border-4 border-neutral-800 bg-gradient-to-b from-neutral-900 px-3 py-2 hover:z-10 hover:border-neutral-700 hover:bg-gradient-to-t"
              >
                <Link
                  href={repo.homepage ? repo.homepage : "#"}
                  target="_blank"
                  className="h-24"
                >
                  <Image
                    src={reposInfo[repo.name]?.image}
                    width={512}
                    height={292}
                    placeholder="blur"
                    blurDataURL="/static/icons/blur.svg"
                    className="drag-none h-full w-full rounded-sm object-cover transition-transform group-hover:shadow-lg group-hover:shadow-emerald-800/20"
                    alt="project image"
                  />
                </Link>
                <div className="-mb-2 flex flex-row items-start justify-between pt-2">
                  <Link
                    href={repo.homepage ? repo.homepage : "#"}
                    target="_blank"
                    className="w-full"
                  >
                    <p className="line-clamp-1 text-lg text-neutral-300 underline-offset-2 group-hover:underline">
                      {repo.name}
                    </p>
                  </Link>
                  <TooltipProvider delayDuration={0}>
                    <Tooltip>
                      <TooltipTrigger>
                        <p
                          className={cn(
                            "cursor-default rounded-sm px-2 py-0.5 text-xs text-neutral-300 ring-4 ring-neutral-800",
                            {
                              "group-hover:ring-emerald-950":
                                reposInfo[repo.name]?.isUnderDev === false,
                              "group-hover:ring-orange-950":
                                reposInfo[repo.name]?.isUnderDev === true,
                            },
                          )}
                        >
                          state
                        </p>
                      </TooltipTrigger>
                      <TooltipContent
                        sideOffset="1"
                        className={cn({
                          "bg-emerald-800":
                            reposInfo[repo.name]?.isUnderDev === false,
                          "bg-orange-800":
                            reposInfo[repo.name]?.isUnderDev === true,
                        })}
                      >
                        {reposInfo[repo.name].isUnderDev !== true
                          ? "Complete"
                          : "In progress"}
                      </TooltipContent>
                    </Tooltip>
                  </TooltipProvider>
                </div>
                <div className="flex flex-row justify-between text-neutral-400">
                  <div className="flex items-center gap-[6px] text-sm">
                    {reposInfo[repo.name]?.lang.map((icon, i) => (
                      <Image
                        key={i}
                        src={icon}
                        width={16}
                        height={16}
                        className="drag-none opacity-60 hover:opacity-100"
                        alt="tech"
                      />
                    ))}
                  </div>
                  <div className="pointer-events-none flex select-none flex-row items-center gap-1 text-center text-xs">
                    <span>
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        width="14"
                        height="14"
                        viewBox="0 0 256 256"
                      >
                        <path
                          fill="darkgray"
                          d="M228 64a36 36 0 1 0-48 33.94V104a12 12 0 0 1-12 12H88a12 12 0 0 1-12-12v-6.06a36 36 0 1 0-24 0V104a36 36 0 0 0 36 36h28v18.06a36 36 0 1 0 24 0V140h28a36 36 0 0 0 36-36v-6.06A36.07 36.07 0 0 0 228 64ZM64 52a12 12 0 1 1-12 12a12 12 0 0 1 12-12Zm64 152a12 12 0 1 1 12-12a12 12 0 0 1-12 12Zm64-128a12 12 0 1 1 12-12a12 12 0 0 1-12 12Z"
                        />
                      </svg>
                      {repo.forks_count}
                    </span>
                    <span>
                      <svg
                        fill="#a9a9a9"
                        viewBox="0 0 14 16"
                        height="14"
                        width="14"
                        xmlns="http://www.w3.org/2000/svg"
                      >
                        <path
                          fillRule="evenodd"
                          d="M14 6l-4.9-.64L7 1 4.9 5.36 0 6l3.6 3.26L2.67 14 7 11.67 11.33 14l-.93-4.74L14 6z"
                        ></path>
                      </svg>
                      {repo.stargazers_count}
                    </span>
                    <span>
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        width="14"
                        height="14"
                        viewBox="0 0 24 24"
                      >
                        <path
                          fill="darkgray"
                          d="M12 9a3 3 0 0 0-3 3a3 3 0 0 0 3 3a3 3 0 0 0 3-3a3 3 0 0 0-3-3m0 8a5 5 0 0 1-5-5a5 5 0 0 1 5-5a5 5 0 0 1 5 5a5 5 0 0 1-5 5m0-12.5C7 4.5 2.73 7.61 1 12c1.73 4.39 6 7.5 11 7.5s9.27-3.11 11-7.5c-1.73-4.39-6-7.5-11-7.5Z"
                        />
                      </svg>
                      {repo.watchers_count}
                    </span>
                  </div>
                </div>
                <p className="line-clamp-2 border-t-2 border-neutral-800 pt-3 text-sm text-neutral-500 group-hover:text-neutral-400">
                  {repo.description}
                </p>
              </div>
            ))
          : null}
      </div>
      <div className="mt-6 flex justify-center">
        <button className="group rounded-md bg-neutral-800 ring-emerald-800">
          <Link
            href="https://github.com/omarx11?tab=repositories"
            target="_blank"
            className="inline-flex w-full items-center justify-center gap-1 px-6 py-2 text-neutral-200 group-hover:underline"
          >
            view all projects{" "}
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="1.2rem"
              height="1.2rem"
              viewBox="0 0 24 24"
              className="text-neutral-400"
            >
              <path
                fill="none"
                stroke="currentColor"
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M18.365 5.636h-7.071m7.07 0v7.071m0-7.07L5.638 18.363"
              />
            </svg>
          </Link>
        </button>
      </div>
      <GithubCal />
    </>
  );
}
