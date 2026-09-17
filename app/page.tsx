import Link from "next/link";

import GithubCal from "./components/content/GithubCal";
import Projects from "./components/content/Projects";
import { Heading } from "./components/ui/Heading";

export default function HomePage() {
  return (
    <>
      <Heading emoji="🖥️" name="Projects" sId="#projects" />
      <p className="group relative mt-4 max-w-max text-neutral-400">
        {`Here's`} all of my personal projects that {`I've`} worked on. You can
        support me by starring! ⭐
      </p>
      <Projects />
      <div className="mt-6 flex justify-center">
        <button
          className="group rounded-md bg-neutral-800 ring-emerald-800"
          type="button"
        >
          <Link
            className="inline-flex w-full items-center justify-center gap-1 px-6 py-2 text-neutral-200 group-hover:underline"
            href="https://github.com/omarx11?tab=repositories"
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
        </button>
      </div>
      <GithubCal />
    </>
  );
}
