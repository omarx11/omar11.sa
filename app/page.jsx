import Link from "next/link";
import { Heading } from "./components/ui/Heading";
import GithubCal from "./components/content/GithubCal";
import { reposInfo, manualRepository } from "./config/repos";
import { getGithubRepos } from "./lib/actions";
import Projects from "./components/content/Projects";

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
              <Projects key={repo.id} repo={repo} reposInfo={reposInfo} />
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
