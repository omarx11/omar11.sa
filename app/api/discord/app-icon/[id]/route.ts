import { cacheLife } from "next/cache";

/**
 * Redirects to a Discord application's icon. Games that Discord detects on
 * its own often send no activity art, but their application (from Discord's
 * public RPC endpoint) has an icon.
 */
export async function GET(
  _req: Request,
  { params }: { params: Promise<{ id: string }> },
) {
  const { id } = await params;
  const icon = /^\d{15,25}$/.test(id) ? await getAppIcon(id) : null;
  if (!icon) {
    return new Response(null, {
      status: 404,
      headers: { "Cache-Control": "public, max-age=3600" },
    });
  }
  return new Response(null, {
    status: 302,
    headers: {
      Location: `https://cdn.discordapp.com/app-icons/${id}/${icon}.png?size=128`,
      "Cache-Control": "public, max-age=86400, s-maxage=604800",
    },
  });
}

async function getAppIcon(id: string): Promise<string | null> {
  "use cache";
  cacheLife("weeks");
  try {
    const res = await fetch(
      `https://discord.com/api/v10/applications/${id}/rpc`,
    );
    if (!res.ok) return null;
    const app = (await res.json()) as { icon?: unknown };
    return typeof app.icon === "string" ? app.icon : null;
  } catch {
    return null;
  }
}
