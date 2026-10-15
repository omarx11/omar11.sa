import { getGameStats, getGamesOverview } from "@/app/(pages)/games/data";

// Cached responses regenerate in the background hourly (with the owned-games
// list); the underlying Steam stats are cached for 12 hours.
export const revalidate = 3600;

// Prebuild the games most likely to be opened; others are cached on first visit.
export async function generateStaticParams() {
  const { recent } = await getGamesOverview();
  return (recent ?? []).map((game) => ({ appId: String(game.appid) }));
}

export async function GET(
  _request: Request,
  { params }: RouteContext<"/api/games/[appId]/stats">,
) {
  const { appId } = await params;
  const appid = Number(appId);
  if (!Number.isSafeInteger(appid) || appid <= 0) {
    return Response.json({ error: "Invalid app id." }, { status: 400 });
  }

  const stats = await getGameStats(appid);
  if (!stats) {
    return Response.json({ error: "Game not found." }, { status: 404 });
  }
  return Response.json(stats);
}
