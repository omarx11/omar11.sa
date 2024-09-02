"use client";

import dynamic from "next/dynamic";
import { useState } from "react";
import { Provider } from "@supabase/supabase-js";
import { oAuthSignIn } from "./actions";
import { Github } from "./icons/Github";
import { Google } from "./icons/Google";
import { Loading } from "./icons/Loading";
import { cn } from "@/app/lib/utils";

type OAuthProvider = {
  name: Provider;
  displayName: string;
  icon?: JSX.Element;
};

const OAuthButtons = () => {
  const [isPending, setIsPending] = useState<string>("");

  const oAuthProviders: OAuthProvider[] = [
    {
      name: "github",
      displayName: "GitHub",
      icon: <Github />,
    },
    {
      name: "google",
      displayName: "Google",
      icon: <Google />,
    },
  ];

  return (
    <div className="my-14 flex max-w-xl flex-row flex-wrap items-center justify-center gap-4 rounded-md bg-neutral-900 py-8 text-center text-neutral-50">
      <p>Sign In with:</p>
      <div className="flex gap-3">
        {oAuthProviders.map((provider) => (
          <button
            key={provider.name}
            aria-label="Sign-in Providor"
            onClick={async () => {
              setIsPending(provider.name);
              await oAuthSignIn(provider.name);
            }}
            className={cn(
              "flex items-center gap-1 rounded-lg px-2 py-2 text-lg font-bold duration-100",
              {
                "bg-[#2f3338] hover:bg-[#2f3338]/80":
                  provider.name === "github",
                "bg-blue-600 hover:bg-blue-700": provider.name === "google",
              },
            )}
          >
            {provider.icon}
            {provider.displayName}
            {isPending === provider.name && (
              <Loading className="animate-spin" />
            )}
          </button>
        ))}
      </div>
      <p className="flex items-center gap-1 text-xs text-neutral-500 sm:text-sm">
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width="16"
          height="16"
          viewBox="0 0 20 20"
          className="hidden md:block"
        >
          <path
            fill="rgb(120,113,108)"
            d="M2.93 17.07A10 10 0 1 1 17.07 2.93A10 10 0 0 1 2.93 17.07zm12.73-1.41A8 8 0 1 0 4.34 4.34a8 8 0 0 0 11.32 11.32zM9 5h2v6H9V5zm0 8h2v2H9v-2z"
          />
        </svg>
        your login information only used to display your name, avatar.
      </p>
    </div>
  );
};

export default dynamic(() => Promise.resolve(OAuthButtons), {
  loading: () => (
    <div className="my-[4.4rem] h-[116px] w-full animate-pulse rounded-md bg-neutral-900 sm:w-[28rem]"></div>
  ),
  ssr: false,
});
