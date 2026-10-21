import { z } from "zod";

import { assistantEnabled } from "@/lib/chatbot/enabled";
import type { AssistantStatus } from "@/lib/chatbot/events";

// llama.cpp's /slots: one entry per slot (`--parallel`). Only the counts are
// passed on; the slots also hold the prompts being processed.
const SlotsSchema = z
  .array(z.object({ n_ctx: z.number(), is_processing: z.boolean() }))
  .min(1);

/** The model server's health and slot usage, for the chat window's header. */
export async function GET() {
  const baseUrl = process.env.AI_BASE_URL;
  const apiKey = process.env.AI_API_KEY;
  let status: AssistantStatus = { online: false };

  if (assistantEnabled() && baseUrl && apiKey) {
    try {
      // /slots lives next to /v1, not under it.
      const res = await fetch(`${baseUrl.replace(/\/v1\/?$/, "")}/slots`, {
        headers: { Authorization: `Bearer ${apiKey}` },
        signal: AbortSignal.timeout(4000),
      });
      if (res.ok) {
        const slots = SlotsSchema.parse(await res.json());
        status = {
          online: true,
          slots: slots.length,
          busySlots: slots.filter((slot) => slot.is_processing).length,
          contextSize: slots[0]?.n_ctx ?? 0,
        };
      }
    } catch {
      // Unreachable or unexpected: reported as offline.
    }
  }

  return Response.json(status, { headers: { "Cache-Control": "no-store" } });
}
