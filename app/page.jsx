import Link from "next/link";
import Image from "next/image";
import { Heading } from "./components/content/Heading";
import { reposImages, manualRepository, reposLanguages } from "./config/repos";
import FancyImage from "./components/content/FancyImage";
import { getRepository } from "./lib/fetchRequest";

export default async function HomePage() {
  const repos = await getRepository();
  repos.push(...manualRepository);

  return (
    <>
      <Heading name="Projects" emoji="🖥️" target="#projects" />
      <h3 className="text-stone-400">
        Here's all of my personal projects that I've worked on. 💼
      </h3>
      <div className="fade-in mt-10 grid gap-5 md:grid-cols-3" id="projects">
        {repos
          ? repos.map((repo, index) => (
              <div
                key={repo.id}
                className="group flex flex-col rounded-md bg-gradient-to-b from-stone-900 hover:bg-gradient-to-t"
              >
                <figure className="relative h-44 p-2">
                  <FancyImage
                    src={reposImages[index]}
                    width={624}
                    height={320}
                    className="drag-none inset-0 h-full w-full cursor-pointer rounded-xl border-4 border-neutral-900 object-cover transition-transform group-hover:-translate-y-4"
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
                  <div className="flex flex-row justify-between text-stone-400">
                    <div className="flex items-center gap-[6px] text-sm">
                      {reposLanguages &&
                        reposLanguages[index].map((icon, i) => (
                          <Image
                            key={i}
                            src={`/static/icons/tech/${icon}`}
                            width={16}
                            height={16}
                            className="drag-none opacity-60 hover:opacity-100"
                            alt="tech"
                          />
                        ))}
                    </div>
                    <div className="pointer-events-none flex select-none flex-row items-center gap-1 text-center text-xs">
                      <span>
                        <Image
                          src="/static/icons/eye.svg"
                          width={14}
                          height={14}
                          className="drag-none select-none"
                          alt="eye-icon"
                        />
                        {repo.watchers_count}
                      </span>
                      <span>
                        <Image
                          src="/static/icons/stargazers.svg"
                          width={14}
                          height={14}
                          className="drag-none select-none"
                          alt="stargazers-icon"
                        />
                        {repo.stargazers_count}
                      </span>
                      <span>
                        <Image
                          src="/static/icons/fork.svg"
                          width={14}
                          height={14}
                          className="drag-none select-none"
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
