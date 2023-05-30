import fetch from 'node-fetch'
import Link from 'next/link'
import Image from 'next/image'

async function getRepository() {
  try {
    const filteredRepos = [386408964, 601036020]
    const response = await fetch('https://api.github.com/users/omarx11/repos', {
      headers: {
        'Accept': 'application/vnd.github+json',
        'Authorization': `Bearer ${process.env.GITHUB_TOKEN}`,
      }
    })
    const repos = await response.json()
    // await new Promise((resolve) => setTimeout(resolve, 1000))
    return repos.filter((d) => !filteredRepos.includes(d.id))
  } catch (error) {
    console.log(error)
  }
}

const reposInfo = {
  imageMain: [
    '/chatin1.png',
    '/next.svg',
    '/steamid2.png'
  ],
  imageStyle: {
    position: 'absolute',
    height: '100%',
    width: '100%',
    color: 'transparent'
  },
  imageLanguage: [
    '/icon/javascript.svg'
  ]
}

function setRepoLanguageIcon(repo) {
  if (repo === 'JavaScript') {
    return '/icons/javascript.svg'
  } else if (repo === 'HTML') {
    return '/icons/html.svg'
  } else if (repo === 'CSS') {
    return '/icons/css.svg'
  } else {
    return 'null'
  }
}

export default async function HomePage() {
  const repos = await getRepository()

  return (
    <>
      <div className="flex flex-col gap-4">
        <div className="flex items-center gap-2 text-4xl font-bold">
          <p className="text-emerald-500">#</p>
          <h2 className="text-[var(--secondary-text-color)]">Projects</h2>
        </div>
        <p className="text-[var(--tertiary-text-color)]">
          Here's some of my personal projects I've worked on recently.
        </p>
      </div>

      <br />

      <div className="grid md:grid-cols-3 gap-5">
        { repos ? repos.map((repo, index) => (
          <div key={repo.id} className="flex flex-col bg-[var(--tertiary-background-color)] rounded-md border-2 border-[var(--tertiary-background-color)] focus:border-[var(--tertiary-text-color)] focus:border-dashed">
            <figure className="relative w-full h-44">
              <Image
                src={reposInfo.imageMain[index]}
                width={640}
                height={480}
                style={reposInfo.imageStyle}
                className="select-none drag-none w-full object-cover rounded-md inset-0"
                alt="project-icon" />
            </figure>
            <div className="m-3">
              <h3 className="text-lg text-[var(--secondary-text-color)]">
                <Link href="#"
                  className="pb-[2px] hover:underline underline-offset-2">
                  {repo.name}
                </Link>
              </h3>
              <div className="flex flex-row justify-between">
                <div className="flex items-center gap-[6px]">
                  <Image
                    src={`${setRepoLanguageIcon(repo.language)}`}
                    width={16}
                    height={16}
                    className="select-none drag-none"
                    alt={`${repo.language}-icon`} />
                  <p className="text-sm text-[var(--tertiary-text-color)]">- {repo.language.toLowerCase()}</p>
                </div>
                <div className="flex flex-row items-center gap-1 select-none text-sm text-center text-[var(--tertiary-text-color)] pointer-events-none">
                  <span>
                    <Image
                      src="/icons/stargazers.svg"
                      width={18}
                      height={18}
                      className="select-none drag-none"
                      alt="javascript-icon" />
                    <p>{repo.stargazers_count}</p>
                  </span>
                  <span>
                    <Image
                      src="/icons/stargazers.svg"
                      width={18}
                      height={18}
                      className="select-none drag-none"
                      alt="javascript-icon" />
                    <p>{repo.forks_count}</p>
                  </span>
                  <span>
                    <Image
                      src="/icons/stargazers.svg"
                      width={18}
                      height={18}
                      className="select-none drag-none"
                      alt="javascript-icon" />
                    <p>{repo.watchers_count}</p>
                  </span>
                </div>
              </div>
              <hr className="mt-2 mb-3 w-full border-0 h-[1px] bg-[var(--tertiary-filter-background-color)]" />
              <p className="text-zinc-500">{repo.description}</p>
            </div>
          </div>
        )) : "No Repository Available!" }
      </div>
      <div className="flex items-center justify-center mt-10 text-[var(--tertiary-text-color)]">
        <p>check out more details on&#160;</p>
        <Link href="#" className="underline hover:no-underline underline-offset-1 text-stone-500">Github!</Link>
      </div>
    </>
  )
}
