import { cacheLife } from "next/cache";

import {
  manualRepository,
  type RepoInfo,
  type Repository,
  reposInfo,
} from "@/app/config/repos";

export type Project = Repository & RepoInfo;

/**
 * The featured projects: public GitHub repos listed in `reposInfo`, plus the
 * manual entries. Cached on the server, so pages ship them in the HTML.
 */
export async function getProjects(): Promise<Project[]> {
  "use cache";
  cacheLife("hours");

  let repos: Repository[] = [];
  try {
    const res = await fetch(
      "https://api.github.com/users/omarx11/repos?per_page=100&sort=full_name&direction=desc",
      {
        headers: {
          Accept: "application/vnd.github+json",
          ...(process.env.GITHUB_TOKEN && {
            Authorization: `Bearer ${process.env.GITHUB_TOKEN}`,
          }),
        },
      },
    );
    if (res.ok) repos = await res.json();
  } catch {
    // GitHub unavailable: still show the manual entries below.
  }

  return [
    ...repos.filter((repo) => reposInfo[repo.name]),
    ...manualRepository,
  ].map((repo) => ({
    id: repo.id,
    name: repo.name,
    description: repo.description,
    homepage: repo.homepage || undefined,
    forks_count: repo.forks_count,
    stargazers_count: repo.stargazers_count,
    watchers_count: repo.watchers_count,
    ...(reposInfo[repo.name] ?? { image: "", isUnderDev: false, lang: [] }),
  }));
}
