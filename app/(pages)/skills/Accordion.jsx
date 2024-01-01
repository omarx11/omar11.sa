"use client";
import Script from "next/script";
import dynamic from "next/dynamic";

function Accordion({ children, id, name }) {
  return (
    <>
      <div
        className="hs-accordion mt-2 border-b-2 border-neutral-800 hs-accordion-active:border-b-4 hs-accordion-active:border-emerald-900 hs-accordion-active:pb-2"
        id={`hs-basic-heading-${id}`}
      >
        <button
          className="hs-accordion-toggle group inline-flex w-full items-center gap-x-2 py-3 text-neutral-300 transition-transform hover:text-neutral-400"
          aria-controls={`hs-basic-collapse-${id}`}
        >
          <span className="text-lg text-neutral-400 group-hover:opacity-70">
            #
          </span>
          <h2 className="relative inline-block text-lg md:text-xl">{name}</h2>
          <svg
            className="block h-3 w-3 text-neutral-400 group-hover:opacity-70 hs-accordion-active:hidden"
            width="16"
            height="16"
            viewBox="0 0 16 16"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              d="M2.62421 7.86L13.6242 7.85999"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
            />
            <path
              d="M8.12421 13.36V2.35999"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
            />
          </svg>
          <svg
            className="hidden h-3 w-3 text-emerald-400 group-hover:opacity-70 hs-accordion-active:block"
            width="16"
            height="16"
            viewBox="0 0 16 16"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              d="M2.62421 7.86L13.6242 7.85999"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
            />
          </svg>
        </button>
        <div
          id={`hs-basic-collapse-${id}`}
          className="fade-in hs-accordion-content hs-accordion-content hidden w-full space-y-1 overflow-hidden transition-[height] duration-300"
          aria-labelledby={`hs-basic-heading-${id}`}
        >
          {children}
        </div>
      </div>
      <Script src="/static/scripts/preline/accordion.js" />
    </>
  );
}

export default dynamic(() => Promise.resolve(Accordion));
