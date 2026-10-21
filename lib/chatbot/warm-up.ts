import { buildChatbotPrompt } from "./chatbot-prompt";
import { assistantEnabled } from "./enabled";

/** Reading a cold ~3,000-token prompt takes 1–2 minutes on the Pi. */
const WARM_UP_TIMEOUT_MS = 5 * 60_000;

/**
 * Sends the current system prompt through the model server once, so its
 * prompt cache holds it before the first visitor asks something. When the
 * site's content changes, the cached copy only matches up to the first
 * difference, and the first chat re-reads the rest (~1 minute). When the
 * cache already matches, this costs the server almost nothing.
 *
 * Only the live status (the prompt's last line) differs from real requests,
 * which is fine: the server reuses everything before it.
 */
export async function warmUpModel() {
  const baseUrl = process.env.AI_BASE_URL;
  const apiKey = process.env.AI_API_KEY;
  if (!assistantEnabled() || !baseUrl || !apiKey) return;

  const started = Date.now();
  try {
    const res = await fetch(`${baseUrl.replace(/\/$/, "")}/chat/completions`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${apiKey}`,
      },
      body: JSON.stringify({
        model: process.env.AI_MODEL ?? "assistant",
        messages: [
          { role: "system", content: await buildChatbotPrompt(undefined) },
          { role: "user", content: "hi" },
        ],
        max_tokens: 1,
      }),
      signal: AbortSignal.timeout(WARM_UP_TIMEOUT_MS),
    });
    if (!res.ok) throw new Error(`${res.status} ${await res.text()}`);
    console.log(`AI assistant warmed up in ${Date.now() - started} ms`);
  } catch (error) {
    console.warn("AI assistant warm-up failed:", error);
  }
}
