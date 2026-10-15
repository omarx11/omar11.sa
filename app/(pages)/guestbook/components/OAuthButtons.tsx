"use client";

import { useState } from "react";

import { Github } from "@/app/components/icons/Github";
import { Google } from "@/app/components/icons/Google";
import { Loading } from "@/app/components/icons/Loading";
import { cn } from "@/app/lib/utils";

type Provider = "github" | "google";

type OAuthProvider = {
  name: Provider;
  displayName: string;
  icon?: React.JSX.Element;
};

/**
 * With `placeholder`, renders the same card as a pulsing, empty skeleton, so
 * the loading state has exactly the loaded card's size at every width.
 */
const OAuthButtons = ({ placeholder = false }: { placeholder?: boolean }) => {
  const [isPending, setIsPending] = useState<string>("");

  const signIn = async (provider: Provider) => {
    setIsPending(provider);
    // Loaded on demand so the auth client stays out of the initial bundle.
    const { authClient } = await import("@/app/lib/auth/client");
    // On success the browser is redirected to the provider.
    const { error } = await authClient.signIn.social({
      provider,
      callbackURL: `${window.location.origin}/auth/callback`,
    });
    if (error) {
      console.error("Sign-in failed:", error.message);
      setIsPending("");
    }
  };

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
    <div
      aria-hidden={placeholder || undefined}
      className={cn(
        "my-14 flex max-w-xl flex-row flex-wrap items-center justify-center gap-4 rounded-md py-8 text-center text-neutral-50",
        placeholder
          ? "w-full animate-pulse bg-[hsl(240,3.7%,7%)] *:invisible"
          : "bg-neutral-900",
      )}
    >
      <p>Sign In with:</p>
      <div className="flex gap-3">
        {oAuthProviders.map((provider) => (
          <button
            aria-label={`Sign in with ${provider.displayName}`}
            className={cn(
              "flex items-center gap-1 rounded-lg px-2 py-2 font-bold text-lg duration-100",
              {
                "bg-[#2f3338] hover:bg-[#2f3338]/80":
                  provider.name === "github",
                "bg-blue-600 hover:bg-blue-700": provider.name === "google",
              },
            )}
            key={provider.name}
            onClick={() => signIn(provider.name)}
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
