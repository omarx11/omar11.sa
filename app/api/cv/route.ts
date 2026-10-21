import { get } from "@vercel/blob";
import { checkBotId } from "botid/server";

// The CV is in the private Vercel Blob store (uploaded from the gitignored
// private/ folder with `npm run upload-private`), so it has no public URL:
// only a browser that passes Vercel BotID gets it.

// POST only: BotID's client attaches its proof to the button's fetch, and a
// plain link or crawler GET gets a 405.
export async function POST() {
  // Always "human" in development; the real check only runs on Vercel.
  const { isBot } = await checkBotId();
  if (isBot) {
    return Response.json({ error: "Access denied" }, { status: 403 });
  }

  const cv = await get("omar_abdulaziz_cv_en.pdf", { access: "private" });
  if (cv?.statusCode !== 200) {
    return Response.json({ error: "CV not found" }, { status: 404 });
  }
  return new Response(cv.stream, {
    headers: {
      "Content-Type": "application/pdf",
      "Content-Disposition": 'inline; filename="omar_abdulaziz_cv_en.pdf"',
      "Cache-Control": "private, no-store",
      "X-Robots-Tag": "noindex, nofollow",
    },
  });
}
