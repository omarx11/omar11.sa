import type { ChatEvent } from "./events";
import type { BotMessage } from "./message-schema";

/**
 * Sends the conversation to the assistant and calls `onEvent` for each event
 * of its streamed reply. Rejects with a readable message if the request
 * fails, and with an AbortError when `signal` is aborted.
 */
export async function streamReply(
  botMessages: BotMessage[],
  signal: AbortSignal,
  onEvent: (event: ChatEvent) => void,
): Promise<void> {
  const res = await fetch("/api/chat", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ botMessages }),
    signal,
  });
  if (!res.ok || !res.body) {
    const body = (await res.json().catch(() => null)) as {
      error?: string;
    } | null;
    throw new Error(
      body?.error ?? `The assistant failed to respond (${res.status}).`,
    );
  }

  const reader = res.body.pipeThrough(new TextDecoderStream()).getReader();
  let buffer = "";
  try {
    for (;;) {
      const { done, value } = await reader.read();
      if (done) break;
      buffer += value;
      // A network chunk can end mid-line; keep the rest for the next one.
      const lines = buffer.split("\n");
      buffer = lines.pop() ?? "";
      for (const line of lines) {
        if (line.trim()) onEvent(JSON.parse(line) as ChatEvent);
      }
    }
    if (buffer.trim()) onEvent(JSON.parse(buffer) as ChatEvent);
  } finally {
    // Stops the download if `onEvent` threw (e.g. on an error event).
    reader.cancel().catch(() => {});
  }
}
