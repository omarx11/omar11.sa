"use client";

import { useState } from "react";

import { Github } from "@/components/icons/Github";
import { Google } from "@/components/icons/Google";
import { Loading } from "@/components/icons/Loading";
import { cn } from "@/lib/utils";

type Provider = "github" | "google";

const PROVIDERS: { id: Provider; name: string; icon: React.JSX.Element }[] = [
  { id: "github", name: "GitHub", icon: <Github /> },
  { id: "google", name: "Google", icon: <Google /> },
];

/**
 * With `placeholder`, renders the same card as a pulsing, empty skeleton, so
 * the loading state has exactly the loaded card's size at every width. It's
 * marked `data-page-loading`, so the navbar's reveal waits for it.
 */
export default function OAuthButtons({
  placeholder = false,
}: {
  placeholder?: boolean;
}) {
  // The provider whose sign-in is starting (its button shows a spinner).
  const [signingInWith, setSigningInWith] = useState<Provider | null>(null);

  const signIn = async (provider: Provider) => {
    setSigningInWith(provider);
    // Loaded on demand so the auth client stays out of the initial bundle.
    const { authClient } = await import("@/lib/auth/client");
    // On success the browser is redirected to the provider.
    const { error } = await authClient.signIn.social({
      provider,
      callbackURL: `${window.location.origin}/auth/callback`,
    });
    if (error) {
      console.error("Sign-in failed:", error.message);
      setSigningInWith(null);
    }
  };

  return (
    <div
      aria-hidden={placeholder || undefined}
      className={cn(
        "my-14 flex max-w-xl flex-row flex-wrap items-center justify-center gap-4 rounded-md py-8 text-center text-neutral-50",
        placeholder
          ? "w-full animate-pulse bg-[hsl(240,3.7%,7%)] *:invisible"
          : "bg-neutral-900",
      )}
      data-page-loading={placeholder || undefined}
    >
      <p>Sign In with:</p>
      <div className="flex gap-3">
        {PROVIDERS.map((provider) => (
          <button
            aria-label={`Sign in with ${provider.name}`}
            className={cn(
              "flex items-center gap-1 rounded-lg px-2 py-2 text-lg font-bold duration-100",
              {
                "bg-[#2f3338] hover:bg-[#2f3338]/80": provider.id === "github",
                "bg-blue-600 hover:bg-blue-700": provider.id === "google",
              },
            )}
            key={provider.id}
            onClick={() => signIn(provider.id)}
            type="button"
          >
            {provider.icon}
            {provider.name}
            {signingInWith === provider.id && (
              <Loading className="animate-spin" />
            )}
          </button>
        ))}
      </div>
      <p className="flex items-center gap-1 text-xs text-neutral-500 sm:text-sm">
        <svg
          aria-hidden="true"
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
        Your login is only used to show your name and avatar.
      </p>
    </div>
  );
}
