"use client";

import dynamic from "next/dynamic";
import Script from "next/script";
import type { ReactNode } from "react";

import { Skeleton } from "@/app/components/ui/Skeleton";

type AccordionProps = {
  children: ReactNode;
  name: string;
};

const Accordion = ({ children, name }: AccordionProps) => {
  const id = name.toLowerCase().split(" ")[0];
  return (
    <>
      <div
        className="hs-accordion mt-2 border-neutral-800 hs-accordion-active:border-emerald-900 border-b-2 hs-accordion-active:border-b-4 hs-accordion-active:pb-2"
        id={`hs-basic-heading-${id}`}
      >
        <button
          aria-controls={`hs-basic-collapse-${id}`}
          className="hs-accordion-toggle group inline-flex w-full items-center gap-x-2 py-3 text-neutral-300 transition-transform hover:text-neutral-400"
        >
          <span className="text-lg text-neutral-400 group-hover:opacity-70">
            #
          </span>
          <h2 className="relative inline-block text-lg md:text-xl">{name}</h2>
          <svg
            className="block hs-accordion-active:hidden h-3 w-3 text-neutral-400 group-hover:opacity-70"
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
              d="M8.12421 13.36V2.35999"
              stroke="currentColor"
              strokeLinecap="round"
              strokeWidth="2"
            />
          </svg>
          <svg
            className="hs-accordion-active:block hidden h-3 w-3 text-emerald-400 group-hover:opacity-70"
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
          </svg>
        </button>
        <div
          aria-labelledby={`hs-basic-heading-${id}`}
          className="fade-in hs-accordion-content hidden w-full space-y-1 overflow-hidden transition-[height] duration-300"
          id={`hs-basic-collapse-${id}`}
        >
          {children}
        </div>
      </div>
      <Script
        src="/static/scripts/preline/accordion.js"
        strategy="lazyOnload"
      />
    </>
  );
};

export default dynamic(() => Promise.resolve(Accordion), {
  loading: () => (
    <Skeleton className="my-3 h-[52px] w-full rounded-none border-neutral-800 border-b-2 bg-transparent" />
  ),
  ssr: false,
});
