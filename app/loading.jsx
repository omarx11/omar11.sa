export default function Loading() {
  return (
    <>
      <h2 className="text-4xl font-bold text-stone-400">
        <span className="text-emerald-500"># </span>
        Projects
      </h2>
      <p className="mt-4 text-stone-400">
        Here's some of my personal projects I've worked on recently.
      </p>
      <div className="pointer-events-none my-12 grid select-none gap-5 md:grid-cols-3">
        {[...Array(4).keys()].map((i) => (
          <div key={i} className="flex flex-col rounded-md bg-neutral-900">
            <div
              className="m-3 h-44 w-full animate-pulse bg-gray-500"
              style={{
                animationDelay: `${i * 0.05}s`,
                animationDirection: "1s",
              }}
            ></div>
            <div className="m-3">
              <span
                className="w-2/4 animate-pulse bg-gray-500"
                style={{
                  animationDelay: `${i * 0.05}s`,
                  animationDirection: "1s",
                }}
              ></span>
              <div className="flex flex-row justify-between text-stone-400">
                <div className="flex items-center gap-[6px] text-sm">
                  - javascript
                </div>
                <div className="flex flex-row items-center gap-1 text-center text-xs">
                  <span>0</span>
                  <span>0</span>
                  <span>0</span>
                </div>
              </div>
              <hr className="mb-3 mt-2 h-[1px] w-full border-0 bg-stone-800" />
              <p className="text-sm text-zinc-500">
                Repository for my personal website, Build with Next.js and
                Tailwind CSS
              </p>
            </div>
          </div>
        ))}
      </div>

      {/* <p className="text-3x1">Posts</p>
      <ul className="mt-6 list-disc space-y-2 pl-6">
        {[...Array(20).keys()].map((i) => (
          <li key={i}>
            <span
              className="inline-block h-5 w-full animate-pulse bg-gray-500"
              style={{
                animationDelay: `${i * 0.05}s`,
                animationDirection: "1s",
              }}
            />
          </li>
        ))}
      </ul> */}
    </>
  );
}
