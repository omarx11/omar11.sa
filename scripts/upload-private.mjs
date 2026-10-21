// Uploads every file in ./private (gitignored: CV, profile photo) to the
// private Vercel Blob store, replacing the previous version of each.
// Usage: `npm run upload-private` (uses BLOB_READ_WRITE_TOKEN from .env.local).
// The site serves these through /api/cv and /api/profile-photo.
import { readdir, readFile } from "node:fs/promises";
import { extname } from "node:path";
import { put } from "@vercel/blob";

if (!process.env.BLOB_READ_WRITE_TOKEN) {
  throw new Error("BLOB_READ_WRITE_TOKEN is not set.");
}

const contentTypes = {
  ".pdf": "application/pdf",
  ".jpg": "image/jpeg",
  ".jpeg": "image/jpeg",
  ".png": "image/png",
  ".webp": "image/webp",
};

const privateDir = new URL("../private/", import.meta.url);
const files = (await readdir(privateDir, { withFileTypes: true }))
  .filter((entry) => entry.isFile())
  .map((entry) => entry.name);

for (const file of files) {
  const contentType = contentTypes[extname(file).toLowerCase()];
  if (!contentType) {
    console.warn(`skipped ${file} (unknown file type)`);
    continue;
  }
  const blob = await put(file, await readFile(new URL(file, privateDir)), {
    access: "private",
    contentType,
    // Same pathname every time, so the routes always read the latest upload.
    addRandomSuffix: false,
    allowOverwrite: true,
    // Blob's CDN may serve the old version for up to this long (seconds).
    cacheControlMaxAge: 60,
  });
  console.log(`uploaded ${blob.pathname}`);
}
