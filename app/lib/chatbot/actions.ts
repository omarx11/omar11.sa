import type { BotMessage } from "../validators/bot-message";

/** Sends the conversation to the assistant; resolves to its streamed reply. */
export async function getBotReply(
  botMessages: BotMessage[],
): Promise<ReadableStream<Uint8Array>> {
  const res = await fetch("/api/chat", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ botMessages }),
  });
  if (!res.ok || !res.body) {
    throw new Error(`The assistant failed to respond (${res.status}).`);
  }
  return res.body;
}
