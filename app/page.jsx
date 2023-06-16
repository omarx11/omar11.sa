import Link from "next/link";
import Image from "next/image";
import fs from "node:fs/promises";
import { getPlaiceholder } from "plaiceholder";
import ContentImage from "./components/content/ContentImage";
import {
  getRepository,
  reposInfo,
  manualRepository,
  setRepoLanguageIcon,
} from "./lib/getRepos";

export default async function HomePage() {
  const repos = await getRepository();
  repos.push(...manualRepository);

  const placeholders = await Promise.all(
    reposInfo.imageMain.map(async (url) => {
      const imgs = await fs.readFile(`./public${url}`);
      const { base64 } = await getPlaiceholder(imgs);
      return base64;
    })
  );

  return (
    <>
      <h2 className="text-4xl font-bold text-stone-400">
        <span className="text-emerald-500"># </span>
        Projects
        <p className="mt-2 text-base text-stone-400">
          Here's some of my personal projects I've worked on recently.
        </p>
      </h2>
      <div className="my-10 grid gap-5 border-t-2 border-stone-800 md:grid-cols-3">
        {repos
          ? repos.map((repo, index) => (
              <div
                key={repo.id}
                className="fade-in group flex flex-col rounded-md bg-neutral-900 hover:bg-neutral-800"
              >
                <figure className="relative h-44 w-full">
                  <ContentImage
                    src={reposInfo.imageMain[index]}
                    width={640}
                    height={480}
                    blurDataURL={placeholders[index]}
                    placeholder="blur"
                    style={reposInfo.imageStyle}
                    className="inset-0 h-full w-full cursor-pointer rounded-2xl object-cover p-2 transition-transform drag-none group-hover:-translate-y-4"
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
                      <Image
                        src={`${setRepoLanguageIcon(repo.language)}`}
                        width={16}
                        height={16}
                        className="select-none drag-none"
                        alt={`${repo.language}-icon`}
                      />
                      - {repo.language.toLowerCase()}
                    </div>
                    <div className="pointer-events-none flex select-none flex-row items-center gap-1 text-center text-xs">
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
                    </div>
                  </div>
                  <hr className="mb-3 mt-2 h-[1px] w-full border-0 bg-stone-800" />
                  <p className="line-clamp-3 text-sm text-zinc-500">
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
