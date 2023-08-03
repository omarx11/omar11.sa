"use client";
import Script from "next/script";
import dynamic from "next/dynamic";

function Accordion({ children, id, name }) {
  const handleScroll = (e) => {
    e.preventDefault();
    if (!e.currentTarget.classList.contains("active")) {
      const targetId = e.currentTarget.id;
      const elem = document.getElementById(targetId);
      setTimeout(() => {
        elem?.scrollIntoView({
          behavior: "smooth",
          block: "start",
        });
      }, 200);
    }
  };

  return (
    <>
      <div
        className="hs-accordion active mt-2"
        id={`hs-basic-always-open-heading-${id}`}
        onClick={handleScroll}
      >
        <button
          className="hs-accordion-toggle group inline-flex w-full items-center gap-x-2 py-3 text-stone-300 transition-transform hover:text-stone-400"
          aria-controls={`hs-basic-always-open-collapse-${id}`}
        >
          <span className="text-lg text-stone-400 group-hover:opacity-70 hs-accordion-active:text-emerald-500">
            #
          </span>
          <h2 className="relative inline-block text-xl">{name}</h2>
          <svg
            className="block h-3 w-3 text-stone-400 group-hover:opacity-70 hs-accordion-active:hidden"
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
          id={`hs-basic-always-open-collapse-${id}`}
          className="fade-in hs-accordion-content ml-1 flex w-full flex-col gap-2 overflow-hidden border-l-4 border-stone-800 pl-2 transition-[height] duration-300 hover:border-emerald-950 md:pl-4"
          aria-labelledby={`hs-basic-always-open-heading-${id}`}
        >
          {children}
        </div>
      </div>
      <Script src="/static/scripts/preline/accordion.js" />
    </>
  );
}

export default dynamic(() => Promise.resolve(Accordion));
