import { cacheLife } from "next/cache";

import { author } from "@/config/meta";
import { type FeaturedProject, featuredProjects } from "@/config/projects";

type Repository = {
  name: string;
  forks_count: number;
  stargazers_count: number;
  watchers_count: number;
};

export type ProjectWithStats = FeaturedProject & {
  /** Where the card links to; none for private projects. */
  href?: string;
  /** Live counts for public GitHub repos (absent if GitHub is unavailable). */
  stats?: { forks: number; stars: number; watchers: number };
};

/**
 * The featured projects, with live stats for the public GitHub repos. Cached
 * on the server, so pages ship them in the HTML.
 */
export async function getProjects(): Promise<ProjectWithStats[]> {
  "use cache";
  cacheLife("hours");

  let repos: Repository[] = [];
  try {
    const res = await fetch(
      `https://api.github.com/users/${author.githubUsername}/repos?per_page=100&sort=full_name&direction=desc`,
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
    // GitHub unavailable: still show every project, without stats.
  }

  return featuredProjects.map((project) => {
    const repo = project.repo
      ? repos.find((r) => r.name === project.repo)
      : undefined;
    return {
      ...project,
      href:
        project.url ??
        (project.repo ? `${author.github}/${project.repo}` : undefined),
      stats: repo && {
        forks: repo.forks_count,
        stars: repo.stargazers_count,
        watchers: repo.watchers_count,
      },
    };
  });
}

export type Contribution = {
  date: string;
  count: number;
  level: 0 | 1 | 2 | 3 | 4;
};

/**
 * The last year of GitHub contributions, from the same public API that
 * react-github-calendar uses, fetched on the server so the calendar is in the
 * HTML. Returns null when the API is unavailable.
 */
export async function getContributions(
  username: string,
): Promise<Contribution[] | null> {
  "use cache";
  cacheLife("hours");
  try {
    const res = await fetch(
      `https://github-contributions-api.jogruber.de/v4/${username}?y=last`,
    );
    if (!res.ok) return null;
    const data: { contributions: Contribution[] } = await res.json();
    return data.contributions;
  } catch {
    return null;
  }
}

/** A repository in the activity feed; null when it's private (no name). */
/**
 * A repository in the activity feed. The author's own private repos keep
 * their name but no link (visitors can't open them); other people's private
 * repos (e.g. an employer's) are null: no name at all.
 */
export type ActivityRepo = {
  name: string;
  url?: string;
  language?: { name: string; color: string | null };
} | null;

export type ActivityMonth = {
  /** The month's first day, UTC ("2026-10-01"). */
  month: string;
  commits: { repo: ActivityRepo; count: number }[];
  created: { repo: ActivityRepo; date: string }[];
  pullRequests: {
    repo: ActivityRepo;
    count: number;
    merged: number;
    open: number;
  }[];
  issues: { repo: ActivityRepo; count: number }[];
  /** Contributions in repositories the token can't see: a count only. */
  privateCount: number;
};

export const ACTIVITY_MONTHS = 12;

type GqlRepo = {
  nameWithOwner: string;
  url: string;
  isPrivate: boolean;
  owner: { login: string };
  primaryLanguage: { name: string; color: string | null } | null;
};

type GqlMonth = {
  restrictedContributionsCount: number;
  commitContributionsByRepository: {
    repository: GqlRepo;
    contributions: { totalCount: number };
  }[];
  repositoryContributions: {
    nodes: { occurredAt: string; repository: GqlRepo }[];
  };
  pullRequestContributionsByRepository: {
    repository: GqlRepo;
    contributions: {
      totalCount: number;
      nodes: { pullRequest: { state: "OPEN" | "CLOSED" | "MERGED" } }[];
    };
  }[];
  issueContributionsByRepository: {
    repository: GqlRepo;
    contributions: { totalCount: number };
  }[];
};

const MONTH_FIELDS = `
fragment Repo on Repository { nameWithOwner url isPrivate owner { login } primaryLanguage { name color } }
fragment Month on ContributionsCollection {
  restrictedContributionsCount
  commitContributionsByRepository(maxRepositories: 25) { repository { ...Repo } contributions { totalCount } }
  repositoryContributions(first: 25) { nodes { occurredAt repository { ...Repo } } }
  pullRequestContributionsByRepository(maxRepositories: 25) {
    repository { ...Repo }
    contributions(first: 100) { totalCount nodes { pullRequest { state } } }
  }
  issueContributionsByRepository(maxRepositories: 25) { repository { ...Repo } contributions { totalCount } }
}`;

// Private repos lose their link here, and other people's their name too, so
// neither ever reaches the page.
const toRepo = (repo: GqlRepo): ActivityRepo => {
  const own =
    repo.owner.login.toLowerCase() === author.githubUsername.toLowerCase();
  if (repo.isPrivate && !own) return null;
  return {
    name: repo.nameWithOwner,
    ...(!repo.isPrivate && { url: repo.url }),
    ...(repo.primaryLanguage && { language: repo.primaryLanguage }),
  };
};

/**
 * The last year of GitHub activity, month by month, like the "Contribution
 * activity" on a GitHub profile: commits per repository, new repositories,
 * pull requests and issues. One GraphQL request (needs GITHUB_TOKEN), cached
 * for hours. Returns null when GitHub is unavailable.
 */
export async function getActivity(): Promise<ActivityMonth[] | null> {
  "use cache";
  cacheLife("hours");
  if (!process.env.GITHUB_TOKEN) return null;

  const now = new Date();
  const months = Array.from({ length: ACTIVITY_MONTHS }, (_, i) => {
    const year = now.getUTCFullYear();
    const month = now.getUTCMonth() - i;
    return {
      from: new Date(Date.UTC(year, month, 1)),
      to: new Date(Date.UTC(year, month + 1, 1) - 1),
    };
  });
  const query = `${MONTH_FIELDS}
query ($login: String!) { user(login: $login) {
${months.map((m, i) => `m${i}: contributionsCollection(from: "${m.from.toISOString()}", to: "${m.to.toISOString()}") { ...Month }`).join("\n")}
} }`;

  try {
    const res = await fetch("https://api.github.com/graphql", {
      method: "POST",
      headers: {
        Authorization: `Bearer ${process.env.GITHUB_TOKEN}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        query,
        variables: { login: author.githubUsername },
      }),
    });
    if (!res.ok) return null;
    const { data } = (await res.json()) as {
      data?: { user: Record<string, GqlMonth> | null };
    };
    const user = data?.user;
    if (!user) return null;

    return months.map(({ from }, i) => {
      const m = user[`m${i}`] as GqlMonth;
      return {
        month: from.toISOString().slice(0, 10),
        commits: m.commitContributionsByRepository.map((c) => ({
          repo: toRepo(c.repository),
          count: c.contributions.totalCount,
        })),
        created: m.repositoryContributions.nodes.map((c) => ({
          repo: toRepo(c.repository),
          date: c.occurredAt,
        })),
        pullRequests: m.pullRequestContributionsByRepository.map((c) => {
          const states = c.contributions.nodes.map((n) => n.pullRequest.state);
          return {
            repo: toRepo(c.repository),
            count: c.contributions.totalCount,
            merged: states.filter((s) => s === "MERGED").length,
            open: states.filter((s) => s === "OPEN").length,
          };
        }),
        issues: m.issueContributionsByRepository.map((c) => ({
          repo: toRepo(c.repository),
          count: c.contributions.totalCount,
        })),
        privateCount: m.restrictedContributionsCount,
      };
    });
  } catch {
    return null;
  }
}
