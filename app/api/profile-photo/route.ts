import { get } from "@vercel/blob";

// The profile photo is in the private Vercel Blob store (uploaded from the
// gitignored private/ folder with `npm run upload-private`) so the original
// isn't in the public GitHub repo. The About page shows it through next/image,
// which resizes it and strips its camera metadata.
export async function GET() {
  const photo = await get("profile-photo.jpg", { access: "private" });
  if (photo?.statusCode !== 200) {
    return new Response(null, { status: 404 });
  }
  return new Response(photo.stream, {
    headers: {
      "Content-Type": photo.blob.contentType,
      // Cached by Vercel's CDN for an hour, so most views never reach Blob.
      "Cache-Control":
        "public, max-age=3600, s-maxage=3600, stale-while-revalidate=86400",
      "X-Robots-Tag": "noindex",
    },
  });
}
