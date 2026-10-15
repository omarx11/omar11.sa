import type { ReactNode } from "react";

// Native <details>: server-rendered, keyboard and screen-reader accessible,
// and no JavaScript. Sharing `name` keeps one section open at a time.
export default function Accordion({
  name,
  children,
}: {
  name: string;
  children: ReactNode;
}) {
  return (
    <details
      className="group/acc mt-2 border-neutral-800 border-b-2 open:border-emerald-900 open:border-b-4 open:pb-2"
      name="skills"
    >
      <summary className="group/sum inline-flex w-full cursor-pointer list-none items-center gap-x-2 py-3 text-neutral-300 hover:text-neutral-400 [&::-webkit-details-marker]:hidden">
        <span className="text-lg text-neutral-400 group-hover/sum:opacity-70">
          #
        </span>
        <h2 className="relative inline-block text-lg md:text-xl">{name}</h2>
        <svg
          aria-hidden="true"
          className="h-3 w-3 text-neutral-400 group-open/acc:text-emerald-400 group-hover/sum:opacity-70"
          fill="none"
          height="16"
          viewBox="0 0 16 16"
          width="16"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            d="M2.62421 7.86L13.6242 7.85999"
            stroke="currentColor"
            strokeLinecap="round"
            strokeWidth="2"
          />
          <path
            className="group-open/acc:hidden"
            d="M8.12421 13.36V2.35999"
            stroke="currentColor"
            strokeLinecap="round"
            strokeWidth="2"
          />
        </svg>
      </summary>
      <div className="fade-in w-full space-y-1">{children}</div>
    </details>
  );
}
