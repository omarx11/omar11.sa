import { readFile } from "node:fs/promises";
import { join } from "node:path";
import { ImageResponse } from "next/og";

import { author } from "@/app/config/meta";

// The share card for every page (pages can add their own to override it).
export const alt = `${author.fullName}, ${author.jobTitle} from ${author.city}, ${author.country}`;
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

// The first name is drawn white, the rest of the name green.
const [firstName, ...lastNames] = author.fullName.split(" ");

// Read once at module load, so the card is prerendered at build time.
const avatar = await readFile(
  join(process.cwd(), "public", author.avatar),
  "base64",
);

export default function OpenGraphImage() {
  return new ImageResponse(
    <div
      style={{
        width: "100%",
        height: "100%",
        display: "flex",
        flexDirection: "column",
        justifyContent: "space-between",
        padding: "72px 80px",
        background:
          "radial-gradient(circle at 15% 20%, #064e3b 0%, #000000 55%)",
        color: "#fafafa",
      }}
    >
      <div style={{ display: "flex", alignItems: "center", gap: 56 }}>
        {/* biome-ignore lint/performance/noImgElement: ImageResponse renders plain <img> */}
        <img
          alt=""
          height={220}
          src={`data:image/png;base64,${avatar}`}
          style={{
            borderRadius: "50%",
            border: "8px solid #047857",
            boxShadow: "0 0 0 12px #000000",
          }}
          width={220}
        />
        <div style={{ display: "flex", flexDirection: "column", gap: 18 }}>
          <div style={{ display: "flex", fontSize: 76, fontWeight: 700 }}>
            <span style={{ color: "#fafafa" }}>{firstName}&nbsp;</span>
            <span style={{ color: "#34d399" }}>{lastNames.join(" ")}</span>
          </div>
          <div style={{ fontSize: 40, color: "#d4d4d4" }}>
            {`${author.jobTitle} · ${author.city}, ${author.country}`}
          </div>
          <div style={{ fontSize: 30, color: "#a3a3a3" }}>
            {author.stack.join(" · ")}
          </div>
        </div>
      </div>
      <div
        style={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          borderTop: "6px solid #262626",
          paddingTop: 28,
          fontSize: 32,
        }}
      >
        <span style={{ color: "#34d399" }}>{author.siteName}</span>
        <span style={{ color: "#737373" }}>Projects · Skills · Guestbook</span>
      </div>
    </div>,
    size,
  );
}
