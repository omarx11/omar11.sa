import Image from "next/image";
import Link from "next/link";

export default function Work() {
  return (
    <div className="w-full rounded-lg border-2 border-neutral-700/40 bg-neutral-900/50 p-4">
      <h2 className="flex items-center text-sm font-semibold text-neutral-100">
        <svg
          viewBox="0 0 24 24"
          fill="none"
          strokeWidth="1.5"
          strokeLinecap="round"
          strokeLinejoin="round"
          aria-hidden="true"
          className="h-6 w-6 flex-none"
        >
          <path
            d="M2.75 9.75a3 3 0 0 1 3-3h12.5a3 3 0 0 1 3 3v8.5a3 3 0 0 1-3 3H5.75a3 3 0 0 1-3-3v-8.5Z"
            className="fill-neutral-100/10 stroke-neutral-500"
          ></path>
          <path
            d="M3 14.25h6.249c.484 0 .952-.002 1.316.319l.777.682a.996.996 0 0 0 1.316 0l.777-.682c.364-.32.832-.319 1.316-.319H21M8.75 6.5V4.75a2 2 0 0 1 2-2h2.5a2 2 0 0 1 2 2V6.5"
            className="stroke-neutral-500"
          ></path>
        </svg>
        <span className="ml-3">Work</span>
      </h2>
      <ol className="mt-6 space-y-4">
        <li className="flex items-center gap-4">
          <div className="relative mt-1 flex h-10 w-10 flex-none items-center justify-center overflow-hidden rounded-full shadow-md shadow-neutral-800/5 ring-0 ring-neutral-900/5">
            <Image
              src="/static/icons/socials/lulu.png"
              width={30}
              height={30}
              alt="Lulu hypermarket"
            />
          </div>
          <dl className="flex flex-auto flex-wrap gap-x-2">
            <dt className="sr-only">Company</dt>
            <dd className="w-full flex-none text-sm font-medium text-neutral-100">
              Lulu hypermarket
            </dd>
            <dt className="sr-only">Role</dt>
            <dd className="text-xs text-neutral-400">IT Salesman</dd>
            <dt className="sr-only">Date</dt>
            <dd
              className="ml-auto text-xs text-neutral-500"
              aria-label="March 31 2024 until now"
            >
              <time dateTime="2024">Mar 2024</time>{" "}
              <span aria-hidden="true">—</span>{" "}
              <time dateTime="2024">Jun 2024</time>
            </dd>
          </dl>
        </li>
        <li className="flex items-center gap-4">
          <div className="relative mt-1 flex h-10 w-10 flex-none items-center justify-center overflow-hidden rounded-full bg-neutral-950 shadow-md shadow-neutral-800/5 ring-0 ring-neutral-900/5">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="24"
              height="24"
              viewBox="0 0 24 24"
              className="text-white"
            >
              <path
                fill="currentColor"
                d="M0 7.97v4.958c0 1.867 1.302 3.101 3 3.101c.826 0 1.562-.316 2.094-.87v.736H6.27V7.97H5.082v4.888c0 1.257-.85 2.106-1.947 2.106c-1.11 0-1.946-.827-1.946-2.106V7.971H0zm7.44 0v7.925h1.13v-.725c.521.532 1.257.86 2.06.86a3.006 3.006 0 0 0 3.034-3.01a3.01 3.01 0 0 0-3.033-3.024a2.86 2.86 0 0 0-2.049.861V7.971H7.439zm9.869 2.038c-1.687 0-2.965 1.37-2.965 3c0 1.72 1.334 3.01 3.066 3.01c1.053 0 1.913-.463 2.49-1.233l-.826-.611c-.43.577-.996.847-1.664.847c-.973 0-1.753-.7-1.912-1.64h4.697v-.373c0-1.72-1.222-3-2.886-3zm6.295.068c-.634 0-1.098.294-1.381.758v-.713h-1.131v5.774h1.142V12.61c0-.894.544-1.47 1.291-1.47H24v-1.065h-.396zm-6.319.928c.85 0 1.564.588 1.756 1.47H15.52c.203-.882.916-1.47 1.765-1.47zm-6.732.012c1.086 0 1.98.883 1.98 2.004a1.993 1.993 0 0 1-1.98 2.001A1.989 1.989 0 0 1 8.56 13.02a1.99 1.99 0 0 1 1.992-2.004z"
              />
            </svg>
          </div>
          <dl className="flex flex-auto flex-wrap gap-x-2">
            <dt className="sr-only">Company</dt>
            <dd className="w-full flex-none text-sm font-medium text-neutral-100">
              Uber captain
            </dd>
            <dt className="sr-only">Role</dt>
            <dd className="text-xs text-neutral-400">Freelancer</dd>
            <dt className="sr-only">Date</dt>
            <dd
              className="ml-auto text-xs text-neutral-500"
              aria-label="2023 until 2024"
            >
              <time dateTime="2023">2023</time>{" "}
              <span aria-hidden="true">—</span> <time dateTime="2024">now</time>
            </dd>
          </dl>
        </li>
      </ol>
      <Link
        href="/static/files/omar_abdulaziz_cv_en.pdf"
        className="group mt-6 inline-flex w-full items-center justify-center gap-2 rounded-md bg-neutral-800/50 px-3 py-2 text-sm font-medium text-neutral-300 outline-offset-2 transition hover:bg-neutral-800 hover:text-neutral-50 active:bg-neutral-100 active:bg-neutral-800/50 active:text-neutral-50/70 active:transition-none"
      >
        Download CV
        <svg
          viewBox="0 0 16 16"
          fill="none"
          aria-hidden="true"
          className="h-4 w-4 stroke-neutral-400 transition group-hover:stroke-neutral-50 group-active:stroke-neutral-50"
        >
          <path
            d="M4.75 8.75 8 12.25m0 0 3.25-3.5M8 12.25v-8.5"
            strokeWidth="1.5"
            strokeLinecap="round"
            strokeLinejoin="round"
          ></path>
        </svg>
      </Link>
    </div>
  );
}
