// Runs once when a Next.js server instance starts (`next dev`, `next start`, or
// a new instance on Vercel).
export async function register() {
  if (process.env.NEXT_RUNTIME === "nodejs") {
    const { warmUpModel } = await import("@/lib/chatbot/warm-up");
    // Not awaited: `register` must finish before the server takes requests,
    // and the warm-up can take a minute or two after a content change.
    void warmUpModel();
  }
}
