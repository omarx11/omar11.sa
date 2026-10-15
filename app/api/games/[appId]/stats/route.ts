import { getGameStats, getGamesOverview } from "@/app/(pages)/games/data";

// Data is cached in getGameStats (`use cache`). Prebuild the games most likely
// to be opened; others render on first request and are cached from then on.
export async function generateStaticParams() {
  const { recent } = await getGamesOverview();
  const ids = (recent ?? []).map((game) => ({ appId: String(game.appid) }));
  // Cache Components requires at least one prebuilt param (Steam may be down).
  return ids.length > 0 ? ids : [{ appId: "252490" }];
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
