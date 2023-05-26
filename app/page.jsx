// put my projects here and type on the class flex-1
// https://api.github.com/users/omarx11/repos
// "use client"
import axios from "axios"
import Link from 'next/link'
export const revalidate = 1;

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

export default async function HomePage() {
  // const repos = await getRepository()

  return (<>
      <p>
        Here's some personal projects I've worked on recently. Check out more on my&#160;
        <Link href="#" className="">GitHub!</Link>
      </p>
      <br />
      <span>{Math.random()}</span>
      <ul className="grid grid-cols-3 gap-3">
        {/* {repos.data.map((repo) => (
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
        )) } */}
      </ul>
    </>
  )
}
