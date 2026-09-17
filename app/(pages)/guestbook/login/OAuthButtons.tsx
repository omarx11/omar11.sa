"use client";

import type { Provider } from "@supabase/supabase-js";
import { useState } from "react";

import { Github } from "@/app/components/icons/Github";
import { Google } from "@/app/components/icons/Google";
import { Loading } from "@/app/components/icons/Loading";
import { cn } from "@/app/lib/utils";

import { oAuthSignIn } from "./actions";

type OAuthProvider = {
  name: Provider;
  displayName: string;
  icon?: React.JSX.Element;
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
            aria-label="Sign-in Providor"
            className={cn(
              "flex items-center gap-1 rounded-lg px-2 py-2 font-bold text-lg duration-100",
              {
                "bg-[#2f3338] hover:bg-[#2f3338]/80":
                  provider.name === "github",
                "bg-blue-600 hover:bg-blue-700": provider.name === "google",
              },
            )}
            key={provider.name}
            onClick={async () => {
              setIsPending(provider.name);
              await oAuthSignIn(provider.name);
            }}
            type="button"
          >
            {provider.icon}
            {provider.displayName}
            {isPending === provider.name && (
              <Loading className="animate-spin" />
            )}
          </button>
        ))}
      </div>
      <p className="flex items-center gap-1 text-neutral-500 text-xs sm:text-sm">
        <svg
          aria-label="Info icon"
          className="hidden md:block"
          height="16"
          viewBox="0 0 20 20"
          width="16"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            d="M2.93 17.07A10 10 0 1 1 17.07 2.93A10 10 0 0 1 2.93 17.07zm12.73-1.41A8 8 0 1 0 4.34 4.34a8 8 0 0 0 11.32 11.32zM9 5h2v6H9V5zm0 8h2v2H9v-2z"
            fill="rgb(120,113,108)"
          />
        </svg>
        your login information only used to display your name, avatar.
      </p>
    </div>
  );
};

export default OAuthButtons;
