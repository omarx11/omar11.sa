"use client";

import { useEffect, useState } from "react";

import type { AssistantStatus } from "@/lib/chatbot/events";

/**
 * The model server's status, refreshed while the chat is open and whenever a
 * reply starts or ends (so the slot count follows the conversation).
 */
export function useAssistantStatus(open: boolean, busy: boolean) {
  const [status, setStatus] = useState<AssistantStatus | null>(null);

  // biome-ignore lint/correctness/useExhaustiveDependencies: `busy` only triggers a refresh.
  useEffect(() => {
    if (!open) return;
    let cancelled = false;
    const load = () =>
      fetch("/api/chat/status")
        .then((res) => res.json() as Promise<AssistantStatus>)
        .catch((): AssistantStatus => ({ online: false }))
        .then((next) => !cancelled && setStatus(next));
    void load();
    const timer = setInterval(load, 20_000);
    return () => {
      cancelled = true;
      clearInterval(timer);
    };
  }, [open, busy]);

  return status;
}
