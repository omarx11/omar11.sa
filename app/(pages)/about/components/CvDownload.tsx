"use client";

import { useState } from "react";

const FILE_NAME = "omar_abdulaziz_cv_en.pdf";

let botIdReady: Promise<void> | undefined;

// BotID patches fetch so the request to /api/cv carries proof that a real
// browser sent it. It's loaded from here (on first hover/focus) instead of
// instrumentation-client.ts, so no other page downloads it; its challenge
// script only loads on the first protected request.
function loadBotId() {
  botIdReady ??= import("botid/client/core")
    .then(({ initBotId }) =>
      initBotId({ protect: [{ path: "/api/cv", method: "POST" }] }),
    )
    .catch((error) => {
      botIdReady = undefined;
      throw error;
    });
  return botIdReady;
}

export default function CvDownload() {
  const [state, setState] = useState<"idle" | "loading" | "error">("idle");

  const download = async () => {
    if (state === "loading") return;
    setState("loading");
    try {
      await loadBotId();
      const res = await fetch("/api/cv", { method: "POST" });
      if (!res.ok) throw new Error(`CV request failed: ${res.status}`);
      const url = URL.createObjectURL(await res.blob());
      // Open it in the browser's PDF viewer. If that's blocked as a popup (the
      // click's user activation can expire during the check), download it.
      if (!window.open(url, "_blank")) {
        const link = document.createElement("a");
        link.href = url;
        link.download = FILE_NAME;
        link.click();
      }
      setTimeout(() => URL.revokeObjectURL(url), 60_000);
      setState("idle");
    } catch (error) {
      console.error(error);
      setState("error");
    }
  };

  return (
    <button
      aria-busy={state === "loading"}
      className="group mt-6 inline-flex w-full items-center justify-center gap-2 rounded-md bg-neutral-800/50 px-3 py-2 text-sm font-medium text-neutral-300 outline-offset-2 transition hover:bg-neutral-800 hover:text-neutral-50 active:bg-neutral-800/50 active:text-neutral-50/70 active:transition-none aria-busy:cursor-default"
      onClick={download}
      onFocus={() => void loadBotId().catch(() => {})}
      onPointerEnter={() => void loadBotId().catch(() => {})}
      type="button"
    >
      {state === "error" ? "Couldn't load the CV, try again" : "Download CV"}
      {state === "loading" ? (
        <svg
          aria-hidden="true"
          className="h-4 w-4 animate-spin stroke-neutral-400"
          fill="none"
          viewBox="0 0 16 16"
        >
          <path
            d="M8 2a6 6 0 1 0 6 6"
            strokeLinecap="round"
            strokeWidth="1.5"
          />
        </svg>
      ) : (
        <svg
          aria-hidden="true"
          className="h-4 w-4 stroke-neutral-400 transition group-hover:stroke-neutral-50 group-active:stroke-neutral-50"
          fill="none"
          viewBox="0 0 16 16"
        >
          <path
            d="M4.75 8.75 8 12.25m0 0 3.25-3.5M8 12.25v-8.5"
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth="1.5"
          ></path>
        </svg>
      )}
    </button>
  );
}
