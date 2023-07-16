import Link from "next/link";
import Image from "next/image";
import { headers } from "next/headers";
import Heading from "./components/content/Heading";
import FancyImage from "./components/content/FancyImage";
import { reposImages, manualRepository, reposLanguages } from "./data/repos";

async function getRepository(host) {
  const res = await fetch(`http://${host}/api/repos`, {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
    },
  });
  const data = await res.json();
  return data;
}

export default async function HomePage() {
  const host = headers().get("host");
  const repos = await getRepository(host);
  repos.push(...manualRepository);

  return (
    <>
      <Heading name="Projects 🖥️" id="#projects" />
      <p className="text-base text-stone-400">
        Here's all of my personal projects that I've worked on.
      </p>
      <div
        className="fade-in mt-2 grid gap-5 border-t-8 border-dotted border-stone-900 pt-4 md:grid-cols-3"
        id="projects"
      >
        {repos
          ? repos.map((repo, index) => (
              <div
                key={repo.id}
                className="group flex flex-col rounded-md bg-gradient-to-b from-neutral-900 hover:bg-gradient-to-t"
              >
                <figure className="relative h-44 p-2">
                  <FancyImage
                    src={`/static/images/${reposImages[index]}`}
                    width={858}
                    height={480}
                    className="inset-0 h-full w-full cursor-pointer rounded-xl border-4 border-neutral-800 object-cover transition-transform drag-none group-hover:-translate-y-4"
                    alt="project-icon"
                  />
                </figure>
                <div className="m-3">
                  <Link
                    href={repo.homepage ? repo.homepage : "#"}
                    target="_blank"
                    className="pb-[2px] text-lg text-stone-300 underline-offset-2 hover:underline"
                  >
                    {repo.name}
                  </Link>
                  <div
                    className={
                      repo.language
                        ? "flex flex-row justify-between text-stone-400"
                        : "flex flex-row justify-end text-stone-400"
                    }
                  >
                    <div className="flex items-center gap-[6px] text-sm">
                      {repo.language
                        ? reposLanguages[index].map((icon) => (
                            <Image
                              src={`/static/icons/p-l/${icon}`}
                              width={16}
                              height={16}
                              className="opacity-60 drag-none hover:opacity-100"
                              alt={`${repo.language}`}
                            />
                          ))
                        : null}
                    </div>
                    <div className="pointer-events-none flex select-none flex-row items-center gap-1 text-center text-xs">
                      <span>
                        <Image
                          src="/static/icons/eye.svg"
                          width={14}
                          height={14}
                          className="select-none drag-none"
                          alt="eye-icon"
                        />
                        {repo.watchers_count}
                      </span>
                      <span>
                        <Image
                          src="/static/icons/stargazers.svg"
                          width={14}
                          height={14}
                          className="select-none drag-none"
                          alt="stargazers-icon"
                        />
                        {repo.stargazers_count}
                      </span>
                      <span>
                        <Image
                          src="/static/icons/fork.svg"
                          width={14}
                          height={14}
                          className="select-none drag-none"
                          alt="fork-icon"
                        />
                        {repo.forks_count}
                      </span>
                    </div>
                  </div>
                  <hr className="mb-3 mt-2 h-[1px] w-full border-0 bg-stone-800" />
                  <p className="line-clamp-3 text-sm text-zinc-500 group-hover:text-zinc-400">
                    {repo.description}
                  </p>
                </div>
              </div>
            ))
          : null}
      </div>
    </>
  );
}
