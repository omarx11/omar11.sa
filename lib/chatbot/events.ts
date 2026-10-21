/**
 * The /api/chat response: newline-delimited JSON, one event per line. Shared
 * by the route (which writes it) and the chat window (which reads it).
 */
export type ChatEvent =
  // While the model server reads the prompt (about a minute when its cache
  // is cold). `processed` includes the tokens it reused from the cache.
  | { type: "progress"; processed: number; total: number }
  | { type: "text"; text: string }
  | { type: "stats"; stats: ReplyStats }
  | { type: "error"; message: string };

export type ReplyStats = {
  /** The whole prompt: system prompt plus the recent conversation. */
  promptTokens: number;
  /** Prompt tokens reused from the server's prompt cache. */
  cachedTokens: number;
  outputTokens: number;
  /** Generation speed. */
  tokensPerSecond: number;
  /** Time spent reading the uncached part of the prompt. */
  promptMs: number;
  generationMs: number;
  /** The reply hit the length limit. */
  truncated: boolean;
};

/** /api/chat/status: the model server's health and its slots. */
export type AssistantStatus =
  | { online: false }
  | {
      online: true;
      /** Requests the server can answer at once. */
      slots: number;
      busySlots: number;
      /** Context window per slot, in tokens. */
      contextSize: number;
    };

/** At most this many recent messages are sent as context. */
export const CONTEXT_MESSAGES = 40;
/** How far the context window jumps forward once a chat outgrows it. */
const CONTEXT_STEP = 20;

/**
 * The recent messages to send as context. The model server reuses its cached
 * copy of a prompt only up to the first difference, so a window that slides by
 * one message every turn changes the start of the history each time and makes
 * the server re-read all of it (~10 s on the Pi, shown as "Booting my brain…").
 * Instead the window keeps the whole chat up to `CONTEXT_MESSAGES`, then jumps
 * forward `CONTEXT_STEP` messages at a time and stays put in between, so the
 * re-read happens once per `CONTEXT_STEP` messages. Applying it to its own
 * output changes nothing, so the client and the route can both use it.
 */
export function contextWindow<T>(messages: T[]): T[] {
  const excess = messages.length - CONTEXT_MESSAGES;
  if (excess <= 0) return messages;
  return messages.slice(Math.ceil(excess / CONTEXT_STEP) * CONTEXT_STEP);
}
