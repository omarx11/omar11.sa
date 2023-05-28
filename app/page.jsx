// put my projects here and type on the class flex-1
// https://api.github.com/users/omarx11/repos
// "use client"
import axios from "axios"
import Link from 'next/link'
import Image from 'next/image'

// async function getRepository() {
//   const data = await axios.get('https://api.github.com/users/omarx11/repos')
//   await new Promise((resolve) => setTimeout(resolve, 1000))
//   return data
//   // return {
//   //     name: res.data.name,
//   //     types: res.data.types,
//   //     sprite: res.data.sprites.front_default,
//   // };
// }

const imageStyle = {
  position: "absolute",
  height: "100%",
  width: "100%",
  color: "transparent"
}

export default async function HomePage() {
  // const repos = await getRepository()

  return (
    <>
      <div className="flex flex-col gap-2">
        <h2 className="text-4xl font-bold text-[var(--secondary-text-color)]"># Projects</h2>
        <p className="text-[var(--tertiary-text-color)]">
          Here's some personal projects I've worked on recently. Check out more on my&#160;
          <Link href="#" className="">GitHub!</Link>
        </p>
      </div>
      <br />
      {/* <span>{Math.random()}</span> */}
      {/* <ul className="grid grid-cols-3 gap-3">
        {repos.data.map((repo) => (
          <li key={repo.id} className="border-2 border-gray-500">
            <Link href="#" className="h-full flex flex-col justify-between">
              <h3>{repo.name}</h3>
              <p>{repo.description}</p>
              <div>
                <span>{repo.stargazers_count}</span>
                <span>{repo.forks_count}</span>
                <span>{repo.watchers_count}</span>
              </div>
            </Link>
          </li>
        )) }
      </ul> */}

      <div className="grid md:grid-cols-3 gap-5">
        <div className="flex flex-col bg-[var(--tertiary-background-color)] rounded-md border-2 border-[var(--tertiary-background-color)] focus:border-[var(--tertiary-text-color)] focus:border-dashed">
          <figure className="relative w-full h-44">
            <Image
              src="/desk.webp"
              width={640}
              height={480}
              style={imageStyle}
              className="select-none drag-none w-full object-cover rounded-md inset-0"
              alt="project-icon" />
          </figure>
          <div className="m-3">
            <h3 className="text-lg text-[var(--secondary-text-color)]">
              <Link href="#"
                className="pb-[2px] hover:underline underline-offset-2">
                Chatin App
              </Link>
            </h3>
            <div className="flex flex-row justify-between mt-2">
              <div className="flex items-center gap-1">
                <Image
                  src="/icons/javascript.svg"
                  width={18}
                  height={18}
                  className="select-none drag-none"
                  alt="javascript-icon" />
                <Image
                  src="/icons/javascript.svg"
                  width={18}
                  height={18}
                  className="select-none drag-none"
                  alt="javascript-icon" />
              </div>
              <div>
                <Image
                  src="/icons/javascript.svg"
                  width={18}
                  height={18}
                  className="select-none drag-none"
                  alt="javascript-icon" />
              </div>
            </div>
            <hr className="my-3 w-full border-0 h-[1px] bg-[var(--tertiary-filter-background-color)]" />
            <p className="">Lorem ipsum dolor sit amet consect adipisicing elit. Porro, labore.</p>
          </div>
        </div>
      </div>
    </>
  )
}
