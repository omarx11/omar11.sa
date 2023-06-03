// import fetch from "node-fetch";
import Link from "next/link";
import Image from "next/image";
import { getRepository } from "./components/Repos";
import * as motion from "lib/Moition";

const reposInfo = {
  imageMain: ["/steamid.png", "/chatin.png", "/omar11.jpg", "/pirateadv.png"],
  imageStyle: {
    position: "absolute",
    height: "100%",
    width: "100%",
    color: "transparent",
    padding: "12px",
    borderRadius: "1rem",
  },
};

const manualRepository = [
  {
    id: 1,
    homepage: "https://pirateadv.me",
    name: "my-old-website",
    language: "JavaScript",
    stargazers_count: "-",
    forks_count: "-",
    watchers_count: "-",
    description:
      "My old and first website, created for self-learning such as php, javascript, APIs, and more...",
  },
];

function setRepoLanguageIcon(repo) {
  if (repo === "JavaScript") {
    return "/icons/javascript.svg";
  } else if (repo === "HTML") {
    return "/icons/html.svg";
  } else if (repo === "CSS") {
    return "/icons/css.svg";
  } else {
    return "null";
  }
}

export default async function HomePage() {
  const repos = await getRepository();
  repos.push(...manualRepository);

  return (
    <motion.div variants={motion.container} initial="hidden" animate="visible">
      <div className="flex flex-col gap-4">
        <motion.div
          className="flex items-center gap-2 text-4xl font-bold"
          variants={motion.item}
        >
          <p className="text-emerald-500">#</p>
          <h2 className="text-stone-400">Projects</h2>
        </motion.div>
        <motion.p className="text-stone-400" variants={motion.item}>
          Here's some of my personal projects I've worked on recently.
        </motion.p>
      </div>
      <div className="my-12 grid gap-5 md:grid-cols-3">
        {repos ? (
          repos.map((repo, index) => (
            <motion.div
              key={repo.id}
              className="group flex flex-col rounded-md bg-neutral-900 hover:bg-neutral-800"
              variants={motion.item}
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
                <h3 className="text-lg text-stone-300">
                  <Link
                    href={repo.homepage ? repo.homepage : "#"}
                    target="_blank"
                    className="pb-[2px] underline-offset-2 hover:underline"
                  >
                    {repo.name}
                  </Link>
                </h3>
                <div className="flex flex-row justify-between text-stone-400">
                  <div className="flex items-center gap-[6px] text-sm">
                    <Image
                      src={`${setRepoLanguageIcon(repo.language)}`}
                      width={16}
                      height={16}
                      className="select-none drag-none"
                      alt={`${repo.language}-icon`}
                    />
                    <p>- {repo.language.toLowerCase()}</p>
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
                      <p>{repo.stargazers_count}</p>
                    </span>
                    <span>
                      <Image
                        src="/icons/fork.svg"
                        width={14}
                        height={14}
                        className="select-none drag-none"
                        alt="fork-icon"
                      />
                      <p>{repo.forks_count}</p>
                    </span>
                    <span>
                      <Image
                        src="/icons/eye.svg"
                        width={14}
                        height={14}
                        className="select-none drag-none"
                        alt="eye-icon"
                      />
                      <p>{repo.watchers_count}</p>
                    </span>
                  </div>
                </div>
                <hr className="mb-3 mt-2 h-[1px] w-full border-0 bg-stone-800" />
                <p className="text-sm text-zinc-500">{repo.description}</p>
              </div>
            </motion.div>
          ))
        ) : (
          <p className="text-red-700">Error: No Repository Available!</p>
        )}
      </div>
      {/* <div className="flex items-center justify-center text-[var(--tertiary-text-color)]">
        <p>check out more details on&#160;</p>
        <Link
          href="https://github.com/omarx11"
          className="text-stone-500 underline underline-offset-1 hover:no-underline"
        >
          Github!
        </Link>
      </div> */}
    </motion.div>
  );
}
