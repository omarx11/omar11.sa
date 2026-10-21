"use client";

import { type ReactNode, useState } from "react";

import { Switch, SwitchButton, switchIcon } from "@/components/ui/Switch";

type View = "projects" | "activity";

/**
 * The home page's projects area: the project cards, or recent GitHub
 * activity, chosen with the switch at its top right. Both stay mounted (the
 * pager keeps its page); showing one replays its entrance animation.
 */
export function ProjectsSection({
  intro,
  activityIntro,
  projects,
  activity,
}: {
  intro: ReactNode;
  activityIntro: ReactNode;
  projects: ReactNode;
  activity: ReactNode;
}) {
  const [view, setView] = useState<View>("projects");

  return (
    <>
      <div className="mt-4 flex flex-wrap items-end justify-between gap-x-6 gap-y-3">
        <p className="max-w-max text-neutral-400">
          {view === "projects" ? intro : activityIntro}
        </p>
        <Switch className="ml-auto" label="Show">
          <SwitchButton
            active={view === "projects"}
            icon={GRID}
            onClick={() => setView("projects")}
          >
            Projects
          </SwitchButton>
          <SwitchButton
            active={view === "activity"}
            icon={PULSE}
            onClick={() => setView("activity")}
          >
            Activity
          </SwitchButton>
        </Switch>
      </div>
      <div hidden={view !== "projects"}>{projects}</div>
      <div hidden={view !== "activity"}>{activity}</div>
    </>
  );
}

const GRID = switchIcon(
  <path d="M3 3h7v7H3zM14 3h7v7h-7zM14 14h7v7h-7zM3 14h7v7H3z" />,
);
const PULSE = switchIcon(<path d="M22 12h-4l-3 9L9 3l-3 9H2" />);
