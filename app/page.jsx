import Link from "next/link";
import Image from "next/image";
import {
  getRepository,
  reposInfo,
  manualRepository,
  setRepoLanguageIcon,
} from "@/app/lib/getRepos";
import * as motion from "@/app/lib/useMoition";

export default async function HomePage() {
  const repos = await getRepository();
  repos.push(...manualRepository);
  return (
    <>
      <h2 className="text-4xl font-bold text-stone-400">
        <span className="text-emerald-500"># </span>
        Projects
      </h2>
      <p className="mt-4 text-stone-400">
        Here's some of my personal projects I've worked on recently.
      </p>
      <div className="my-12 grid gap-5 md:grid-cols-3">
        {repos ? (
          repos.map((repo, index) => (
            <motion.div
              key={repo.id}
              className="group flex flex-col rounded-md bg-neutral-900 hover:bg-neutral-800"
              initial={{ scale: 0, opacity: 0 }}
              animate={{ rotate: 360, scale: 1, opacity: 1 }}
              transition={{
                type: "spring",
                stiffness: 160,
                damping: 20,
              }}
            >
              <Link
                href={repo.homepage ? repo.homepage : "#"}
                className="relative h-44 w-full"
              >
                <Image
                  src={reposInfo.imageMain[index]}
                  width={640}
                  height={480}
                  style={reposInfo.imageStyle}
                  className="inset-0 w-full select-none rounded-md object-cover transition-transform drag-none group-hover:-translate-y-4"
                  alt="project-icon"
                />
              </Link>
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
                        src="/icons/stargazers.svg"
                        width={14}
                        height={14}
                        className="select-none drag-none"
                        alt="stargazers-icon"
                      />
                      {repo.stargazers_count}
                    </span>
                    <span>
                      <Image
                        src="/icons/fork.svg"
                        width={14}
                        height={14}
                        className="select-none drag-none"
                        alt="fork-icon"
                      />
                      {repo.forks_count}
                    </span>
                    <span>
                      <Image
                        src="/icons/eye.svg"
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
            </motion.div>
          ))
        ) : (
          <p className="text-red-700">Error: No Repository Available!</p>
        )}
      </div>
    </>
  );
}
