import { buildChatbotPrompt } from "@/lib/chatbot/chatbot-prompt";
import { assistantEnabled, DISABLED_MESSAGE } from "@/lib/chatbot/enabled";

/**
 * The assistant's current system prompt (live status left out), for the
 * model server's own warm-up after it restarts. It authenticates with the
 * same key the site uses to call the model server (`AI_API_KEY`).
 */
export async function GET(req: Request) {
  const apiKey = process.env.AI_API_KEY;
  if (!assistantEnabled()) {
    return new Response(DISABLED_MESSAGE, { status: 503 });
  }
  if (!apiKey || req.headers.get("authorization") !== `Bearer ${apiKey}`) {
    return new Response("Unauthorized", { status: 401 });
  }
  return new Response(await buildChatbotPrompt(undefined), {
    headers: { "Content-Type": "text/plain; charset=utf-8" },
  });
}
