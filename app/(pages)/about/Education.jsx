import Image from "next/image";
import Link from "next/link";

export default function Education() {
  return (
    <div className="mb-8 space-y-4 md:space-y-10">
      <div className="rounded-lg border-2 border-neutral-700/40 bg-neutral-900/50 p-4">
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
                alt="Lulu"
                width={30}
                height={30}
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
                <time dateTime="2024">March, 31, 2024</time>{" "}
                <span aria-hidden="true">—</span>{" "}
                <time dateTime="2024">now</time>
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
                <span aria-hidden="true">—</span>{" "}
                <time dateTime="2024">now</time>
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
      <div className="rounded-lg border-2 border-neutral-700/40 bg-neutral-900/50 p-4">
        <h2 className="flex items-center text-sm font-semibold text-neutral-100">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="24"
            height="24"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
          >
            <path
              d="M22 10v6M2 10l10-5 10 5-10 5z"
              className="fill-neutral-100/10 stroke-neutral-500"
            ></path>
            <path
              d="M6 12v5c3 3 9 3 12 0v-5"
              className="stroke-neutral-500"
            ></path>
          </svg>
          <span className="ml-3">Education</span>
        </h2>
        <ol className="mt-6 space-y-4">
          <li className="flex items-center gap-4">
            <div className="relative mt-1 flex h-10 w-10 flex-none items-center justify-center rounded-full shadow-md shadow-neutral-800/5 ring-0 ring-neutral-900/5">
              <svg
                id="color__icon"
                xmlns="http://www.w3.org/2000/svg"
                width="30"
                height="30"
                viewBox="0 0 33.382 39.181"
              >
                <g
                  id="Group_14452"
                  data-name="Group 14452"
                  transform="translate(0.678)"
                >
                  <path
                    id="Path_61398"
                    data-name="Path 61398"
                    d="M1003.162,558.655h0a1.08,1.08,0,0,0-1.871-.764l0,0-3.049,3.665,1.094,3.8,3.441-1.945Z"
                    transform="translate(-979.98 -557.547)"
                    fill="#1fbbb4"
                  />
                  <path
                    id="Path_61399"
                    data-name="Path 61399"
                    d="M1021.557,582.678l0,0a1.081,1.081,0,0,0-.782-1.864v0l-4.747.435-1.912,3.46,3.809,1.058Z"
                    transform="translate(-989.935 -572.135)"
                    fill="#1fbbb4"
                  />
                  <path
                    id="Path_61400"
                    data-name="Path 61400"
                    d="M1020.926,611.431v0a1.081,1.081,0,0,0,.764-1.871l0,0-3.664-3.049-3.8,1.094,1.945,3.441Z"
                    transform="translate(-990.009 -588.248)"
                    fill="#1fbbb4"
                  />
                  <path
                    id="Path_61401"
                    data-name="Path 61401"
                    d="M1002.362,629.826l0,0a1.08,1.08,0,0,0,1.863-.782h0l-.435-4.747-3.46-1.912-.664,4.272Z"
                    transform="translate(-980.879 -598.204)"
                    fill="#1fbbb4"
                  />
                  <path
                    id="Path_61402"
                    data-name="Path 61402"
                    d="M974.716,629.826l0,0a1.081,1.081,0,0,1-1.864-.782h0l.435-4.747,3.46-1.912.665,4.272Z"
                    transform="translate(-964.059 -598.204)"
                    fill="#1fbbb4"
                  />
                  <path
                    id="Path_61403"
                    data-name="Path 61403"
                    d="M949.8,609.969l0,0a1.081,1.081,0,0,0,.782,1.864v0l4.747-.435,1.912-3.46-3.809-1.058Z"
                    transform="translate(-949.396 -588.486)"
                    fill="#1fbbb4"
                  />
                  <path
                    id="Path_61404"
                    data-name="Path 61404"
                    d="M950.386,581.263v0a1.08,1.08,0,0,0-.765,1.871l0,0,3.664,3.049,3.8-1.094-1.945-3.441Z"
                    transform="translate(-949.278 -572.419)"
                    fill="#1fbbb4"
                  />
                  <path
                    id="Path_61405"
                    data-name="Path 61405"
                    d="M974.409,558.069l0,0a1.081,1.081,0,0,0-1.864.782h0l.435,4.747,3.459,1.912,1.058-3.809Z"
                    transform="translate(-963.866 -557.665)"
                    fill="#1fbbb4"
                  />
                </g>
                <path
                  id="Path_61406"
                  data-name="Path 61406"
                  d="M1005.656,573.287a.27.27,0,0,0-.342-.031l-6.6,3.872-1.109,1.941c.119.056.241.11.355.175l1.485-1.008a.407.407,0,0,1,.54.032l.689.69a.407.407,0,0,1,.032.54l-1.008,1.485c.065.113.118.234.174.352l1.941-1.109,0,0,3.871-6.6A.27.27,0,0,0,1005.656,573.287Z"
                  transform="translate(-978.906 -567.369)"
                  fill="#1fbbb4"
                />
                <path
                  id="Path_61407"
                  data-name="Path 61407"
                  d="M947.484,641.327a.273.273,0,0,1,.293-.164l14.472,5,.466,3-4.6-2.2-10.555-5.316A.265.265,0,0,1,947.484,641.327Z"
                  transform="translate(-947.46 -609.98)"
                  fill="#1fbbb4"
                />
                <path
                  id="Path_61408"
                  data-name="Path 61408"
                  d="M1011.3,641.327a.273.273,0,0,0-.293-.164l-14.472,5-.466,3,4.6-2.2,10.555-5.316A.266.266,0,0,0,1011.3,641.327Z"
                  transform="translate(-977.942 -609.98)"
                  fill="#1fbbb4"
                />
                <path
                  id="Path_61409"
                  data-name="Path 61409"
                  d="M1013.7,596.443l-7.4-1.929-2.157.588c.045.124.093.246.128.375l1.762.337a.407.407,0,0,1,.359.4v.975a.407.407,0,0,1-.359.4l-1.762.337c-.034.128-.082.249-.127.373l2.156.588v0l7.4-1.93a.268.268,0,0,0,0-.527Z"
                  transform="translate(-983.002 -580.729)"
                  fill="#1fbbb4"
                />
                <path
                  id="Path_61410"
                  data-name="Path 61410"
                  d="M1005.691,613.488l-3.872-6.6-1.941-1.11c-.056.12-.11.241-.175.355l1.008,1.485a.407.407,0,0,1-.032.54l-.689.69a.407.407,0,0,1-.54.032l-1.485-1.008c-.113.065-.234.118-.352.174l1.109,1.941,0,0,6.6,3.871a.267.267,0,0,0,.373-.372Z"
                  transform="translate(-978.909 -587.793)"
                  fill="#1fbbb4"
                />
                <path
                  id="Path_61411"
                  data-name="Path 61411"
                  d="M989.762,612.44l-.338,1.762a.407.407,0,0,1-.4.359h-.975a.407.407,0,0,1-.4-.359l-.338-1.762c-.127-.034-.249-.082-.372-.127l-.588,2.157h0l1.929,16.38a.268.268,0,0,0,.527,0l1.929-16.38-.588-2.157C990.013,612.357,989.89,612.405,989.762,612.44Z"
                  transform="translate(-971.841 -591.889)"
                  fill="#1fbbb4"
                />
                <path
                  id="Path_61412"
                  data-name="Path 61412"
                  d="M972.81,607.876l-1.485,1.008a.407.407,0,0,1-.54-.032l-.69-.69a.407.407,0,0,1-.032-.54l1.008-1.485c-.065-.113-.118-.233-.174-.352l-1.941,1.109h0l-3.871,6.6a.268.268,0,0,0,.373.372l6.6-3.872,1.109-1.941C973.045,608,972.924,607.942,972.81,607.876Z"
                  transform="translate(-958.482 -587.796)"
                  fill="#1fbbb4"
                />
                <path
                  id="Path_61413"
                  data-name="Path 61413"
                  d="M963.723,597.936l-1.762-.337a.407.407,0,0,1-.359-.4v-.975a.407.407,0,0,1,.359-.4l1.762-.337c.034-.128.082-.249.127-.373l-2.156-.588v0l-7.4,1.93a.267.267,0,0,0,0,.527l7.4,1.929,2.157-.588C963.806,598.187,963.758,598.064,963.723,597.936Z"
                  transform="translate(-951.605 -580.729)"
                  fill="#1fbbb4"
                />
                <path
                  id="Path_61414"
                  data-name="Path 61414"
                  d="M970.9,581.34c.056-.119.109-.241.175-.355l-1.008-1.485a.407.407,0,0,1,.032-.54l.69-.69a.408.408,0,0,1,.54-.032l1.485,1.008c.113-.065.234-.118.352-.174l-1.109-1.941,0,0-6.6-3.871a.267.267,0,0,0-.372.372l3.872,6.6Z"
                  transform="translate(-958.481 -567.37)"
                  fill="#1fbbb4"
                />
                <path
                  id="Path_61415"
                  data-name="Path 61415"
                  d="M987.3,571.9l.338-1.762a.407.407,0,0,1,.4-.36h.975a.407.407,0,0,1,.4.36l.338,1.762c.128.034.249.082.373.127l.588-2.156h0l-1.93-7.4a.268.268,0,0,0-.527,0l-1.929,7.4.588,2.157C987.052,571.981,987.175,571.933,987.3,571.9Z"
                  transform="translate(-971.841 -560.492)"
                  fill="#1fbbb4"
                />
              </svg>
            </div>
            <dl className="flex flex-auto flex-wrap gap-x-2">
              <dt className="sr-only">University</dt>
              <dd className="w-full flex-none text-sm font-medium text-neutral-100">
                Technical and Vocational Training Corporation
              </dd>
              <dt className="sr-only">Degree</dt>
              <dd className="text-xs text-neutral-400">Diploma</dd>
              <dt className="sr-only">Date</dt>
              <dd
                className="ml-auto text-xs text-neutral-500"
                aria-label="2019 until 2023"
              >
                <time dateTime="2019">2019</time>{" "}
                <span aria-hidden="true">—</span>{" "}
                <time dateTime="2023">2023</time>
              </dd>
            </dl>
          </li>
        </ol>
      </div>
    </div>
  );
}
