import Link from "next/link";
import type { ReactNode } from "react";

import {
  SKELETON_STILL,
  SKELETON_WAVE,
  Skeleton,
} from "@/components/ui/Skeleton";
import { author } from "@/config/meta";
import { simulateFirstVisit } from "@/lib/dev/first-visit";
import {
  type ActivityMonth,
  type ActivityRepo,
  getActivity,
} from "@/lib/github";

import { ActivityShowMore } from "./ActivityShowMore";

/**
 * Recent GitHub activity, month by month, like the "Contribution activity"
 * on a GitHub profile. Rendered on the server from cached data; only the
 * "show more" button runs in the browser.
 */
export default async function Activity() {
  await simulateFirstVisit();
  const months = await getActivity();

  if (!months) {
    return (
      <p className="mt-10 text-neutral-500">
        GitHub activity isn&apos;t available right now.{" "}
        <ProfileLink>See it on GitHub</ProfileLink>
      </p>
    );
  }

  return (
    <ActivityShowMore
      more={<ProfileLink>See all activity on GitHub</ProfileLink>}
    >
      {groupEmptyMonths(months).map((group) =>
        isEmpty(group[0]) ? (
          <QuietMonths key={group[0].month} months={group} />
        ) : (
          <MonthActivity key={group[0].month} month={group[0]} />
        ),
      )}
    </ActivityShowMore>
  );
}

const isEmpty = (m: ActivityMonth) =>
  !m.commits.length &&
  !m.created.length &&
  !m.pullRequests.length &&
  !m.issues.length &&
  !m.privateCount;

type MonthGroup = [ActivityMonth, ...ActivityMonth[]];

/**
 * Months in order, one per group, except that each run of months without
 * activity shares a group.
 */
function groupEmptyMonths(months: ActivityMonth[]): MonthGroup[] {
  const groups: MonthGroup[] = [];
  for (const month of months) {
    const last = groups.at(-1);
    if (last && isEmpty(month) && isEmpty(last[0])) last.push(month);
    else groups.push([month]);
  }
  return groups;
}

const monthName = (m: ActivityMonth, withYear = true) =>
  new Date(m.month).toLocaleDateString("en-US", {
    month: "long",
    ...(withYear && { year: "numeric" }),
    timeZone: "UTC",
  });

const plural = (n: number, one: string, many = `${one}s`) =>
  `${n.toLocaleString("en-US")} ${n === 1 ? one : many}`;
const repos = (n: number) => plural(n, "repository", "repositories");

function MonthHeading({ children }: { children: ReactNode }) {
  return (
    <h3 className="flex items-center gap-3 text-sm font-semibold text-neutral-300">
      {children}
      <span aria-hidden={true} className="h-px flex-1 bg-neutral-800" />
    </h3>
  );
}

function MonthActivity({ month }: { month: ActivityMonth }) {
  const commits = month.commits.reduce((n, c) => n + c.count, 0);
  const maxCommits = Math.max(...month.commits.map((c) => c.count));
  const prs = month.pullRequests.reduce((n, c) => n + c.count, 0);
  const issues = month.issues.reduce((n, c) => n + c.count, 0);
  // Commits link to that month's commits by the author in the repo.
  const since = month.month;
  const until = new Date(
    Date.UTC(
      new Date(since).getUTCFullYear(),
      new Date(since).getUTCMonth() + 1,
      0,
    ),
  )
    .toISOString()
    .slice(0, 10);

  return (
    <section>
      <MonthHeading>
        <span>
          {monthName(month, false)}{" "}
          <span className="font-normal text-neutral-500">
            {month.month.slice(0, 4)}
          </span>
        </span>
      </MonthHeading>
      <ol className="mt-4 ml-4 space-y-6 border-l-2 border-neutral-800 pb-1">
        {commits > 0 && (
          <Event
            icon={ICONS.commit}
            title={`Created ${plural(commits, "commit")} in ${repos(month.commits.length)}`}
          >
            {month.commits.map((c, i) => (
              <Row
                key={c.repo?.name ?? `private-${i}`}
                right={
                  <span
                    className="block h-1.5 rounded-full bg-emerald-600"
                    style={{ width: `${(c.count / maxCommits) * 100}%` }}
                  />
                }
              >
                <RepoName repo={c.repo} />
                {c.repo?.url ? (
                  <Link
                    className="text-xs text-neutral-500 underline-offset-2 hover:text-neutral-300 hover:underline"
                    href={`${c.repo.url}/commits?author=${author.githubUsername}&since=${since}&until=${until}`}
                    rel="noopener noreferrer"
                    target="_blank"
                  >
                    {plural(c.count, "commit")}
                  </Link>
                ) : (
                  <span className="text-xs text-neutral-500">
                    {plural(c.count, "commit")}
                  </span>
                )}
              </Row>
            ))}
          </Event>
        )}
        {month.created.length > 0 && (
          <Event
            icon={ICONS.repo}
            title={`Created ${repos(month.created.length)}`}
          >
            {month.created.map((c, i) => (
              <Row
                key={c.repo?.name ?? `private-${i}`}
                right={
                  <span className="text-xs text-neutral-500">
                    {new Date(c.date).toLocaleDateString("en-US", {
                      month: "short",
                      day: "numeric",
                      timeZone: "UTC",
                    })}
                  </span>
                }
              >
                <RepoName repo={c.repo} />
                {c.repo?.language && (
                  <span className="flex items-center gap-1 text-xs text-neutral-500">
                    <span
                      aria-hidden={true}
                      className="size-2.5 rounded-full"
                      style={{
                        backgroundColor:
                          c.repo.language.color ?? "var(--color-neutral-500)",
                      }}
                    />
                    {c.repo.language.name}
                  </span>
                )}
              </Row>
            ))}
          </Event>
        )}
        {prs > 0 && (
          <Event
            icon={ICONS.pullRequest}
            title={`Opened ${plural(prs, "pull request")} in ${repos(month.pullRequests.length)}`}
          >
            {month.pullRequests.map((c, i) => (
              <Row
                key={c.repo?.name ?? `private-${i}`}
                right={
                  <span className="flex gap-1.5">
                    <Count
                      className="bg-violet-950 text-violet-300"
                      n={c.merged}
                    >
                      merged
                    </Count>
                    <Count
                      className="bg-emerald-950 text-emerald-300"
                      n={c.open}
                    >
                      open
                    </Count>
                    <Count
                      className="bg-neutral-800 text-neutral-300"
                      n={c.count - c.merged - c.open}
                    >
                      closed
                    </Count>
                  </span>
                }
              >
                <RepoName repo={c.repo} />
              </Row>
            ))}
          </Event>
        )}
        {issues > 0 && (
          <Event
            icon={ICONS.issue}
            title={`Opened ${plural(issues, "issue")} in ${repos(month.issues.length)}`}
          >
            {month.issues.map((c, i) => (
              <Row
                key={c.repo?.name ?? `private-${i}`}
                right={
                  <span className="text-xs text-neutral-500">
                    {plural(c.count, "issue")}
                  </span>
                }
              >
                <RepoName repo={c.repo} />
              </Row>
            ))}
          </Event>
        )}
        {month.privateCount > 0 && (
          <Event
            icon={ICONS.lock}
            title={`${plural(month.privateCount, "contribution")} in private repositories`}
          />
        )}
      </ol>
    </section>
  );
}

/** A run of months without any activity, as one short entry. */
function QuietMonths({ months }: { months: MonthGroup }) {
  // Newest first: the range reads from the oldest month to the newest.
  const [newest] = months;
  const oldest = months.at(-1) ?? newest;
  const sameYear = newest.month.slice(0, 4) === oldest.month.slice(0, 4);
  const label =
    months.length === 1
      ? monthName(newest)
      : `${monthName(oldest, !sameYear)} – ${monthName(newest)}`;
  return (
    <section>
      <MonthHeading>{label}</MonthHeading>
      <p className="mt-3 text-sm text-neutral-500">No activity.</p>
    </section>
  );
}

function Event({
  icon,
  title,
  children,
}: {
  icon: ReactNode;
  title: string;
  children?: ReactNode;
}) {
  return (
    <li className="relative pl-8">
      <span className="absolute top-0 -left-[17px] grid size-8 place-items-center rounded-full bg-neutral-900 text-neutral-400 ring-4 ring-black">
        {icon}
      </span>
      <p className="pt-1 text-neutral-300">{title}</p>
      {children && <ul className="mt-2 space-y-1.5">{children}</ul>}
    </li>
  );
}

/** A repository line: name and details on the left, `right` on the right. */
function Row({ children, right }: { children: ReactNode; right: ReactNode }) {
  return (
    <li className="flex items-center justify-between gap-4 text-sm">
      <span className="flex min-w-0 flex-wrap items-center gap-x-2.5">
        {children}
      </span>
      <span className="flex w-24 shrink-0 justify-end sm:w-44">{right}</span>
    </li>
  );
}

function RepoName({ repo }: { repo: ActivityRepo }) {
  // Private: the author's own repos by name, anyone else's anonymously.
  if (!repo?.url) {
    return (
      <span className="flex min-w-0 items-center gap-1 text-neutral-400">
        <span className="shrink-0">{ICONS.lock}</span>
        <span className="truncate">{repo?.name ?? "a private repository"}</span>
      </span>
    );
  }
  return (
    <Link
      className="truncate text-emerald-500 underline-offset-2 hover:underline"
      href={repo.url}
      rel="noopener noreferrer"
      target="_blank"
    >
      {repo.name}
    </Link>
  );
}

function Count({
  n,
  className,
  children,
}: {
  n: number;
  className: string;
  children: ReactNode;
}) {
  if (!n) return null;
  return (
    <span className="flex items-center gap-1 text-xs text-neutral-500">
      <span className={`rounded-full px-1.5 font-semibold ${className}`}>
        {n}
      </span>
      {children}
    </span>
  );
}

function ProfileLink({ children }: { children: ReactNode }) {
  return (
    <Link
      className="text-emerald-500 underline-offset-2 hover:underline"
      href={author.github}
      rel="noopener noreferrer"
      target="_blank"
    >
      {children}
    </Link>
  );
}

const icon = (paths: ReactNode) => (
  <svg
    aria-hidden={true}
    fill="none"
    height="16"
    stroke="currentColor"
    strokeLinecap="round"
    strokeLinejoin="round"
    strokeWidth="2"
    viewBox="0 0 24 24"
    width="16"
    xmlns="http://www.w3.org/2000/svg"
  >
    {paths}
  </svg>
);

const ICONS = {
  commit: icon(
    <>
      <circle cx="12" cy="12" r="3" />
      <path d="M3 12h6m6 0h6" />
    </>,
  ),
  repo: icon(
    <path d="M4 19.5v-15A2.5 2.5 0 0 1 6.5 2H20v20H6.5a2.5 2.5 0 0 1 0-5H20" />,
  ),
  pullRequest: icon(
    <>
      <circle cx="18" cy="18" r="3" />
      <circle cx="6" cy="6" r="3" />
      <path d="M13 6h3a2 2 0 0 1 2 2v7M6 9v12" />
    </>,
  ),
  issue: icon(
    <>
      <circle cx="12" cy="12" r="10" />
      <circle cx="12" cy="12" r="1" />
    </>,
  ),
  lock: icon(<path d="M7 11V7a5 5 0 0 1 10 0v4M5 11h14v10H5z" />),
};

const SKELETON_EVENTS = ["a", "b", "c"];

/** The feed's shape while it loads, with the site's skeleton wave. */
export function ActivitySkeleton() {
  return (
    <div className="mt-10" data-page-loading>
      <Skeleton className="h-4 w-32 rounded-xs" />
      <div className="fade-in-up mt-4 ml-4 space-y-6 border-l-2 border-neutral-800 pb-1">
        {SKELETON_EVENTS.map((key) => (
          <div className={`relative pl-8 ${SKELETON_WAVE}`} key={key}>
            <Skeleton
              className={`absolute top-0 -left-[17px] size-8 rounded-full ${SKELETON_STILL}`}
            />
            <Skeleton
              className={`mt-1.5 h-4 w-64 max-w-full ${SKELETON_STILL}`}
            />
            <Skeleton
              className={`mt-3 h-3 w-48 max-w-full ${SKELETON_STILL}`}
            />
          </div>
        ))}
      </div>
    </div>
  );
}
