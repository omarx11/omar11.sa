import { Loading } from "@/components/icons/Loading";
import {
  Skeleton,
  SKELETON_STILL as STILL,
  SKELETON_WAVE as WAVE,
} from "@/components/ui/Skeleton";

import { GAMES_PER_PAGE } from "../constants";

const COVERS = ["a", "b", "c", "d", "e"];
const TILES = Array.from({ length: GAMES_PER_PAGE }, (_, i) => `tile-${i}`);

/**
 * Shown while Steam data loads. It mirrors the loaded layout, with invisible
 * text where the loaded page has text, so nothing moves when the data arrives.
 * The note and pagination under the collection pop in with the data.
 */
export default function GamesSkeleton() {
  return (
    <div
      aria-busy="true"
      aria-label="Loading games"
      data-page-loading
      role="status"
    >
      <h2 className="mb-4 text-lg font-bold text-neutral-300 sm:text-xl">
        <span className="text-emerald-500">#</span> Recently Played Games{" "}
        <Loading className="inline animate-spin" />
      </h2>
      <div className="fade-in-up flex min-h-[225px] flex-row flex-wrap gap-4 sm:min-h-[308px]">
        {COVERS.map((key) => (
          <div className={WAVE} key={key}>
            {/* Same structure as a RecentGames card: hours, cover, name. */}
            <p className="invisible text-sm">0 hrs</p>
            <div className="mt-1 max-w-[110px] text-xs sm:max-w-[160px] sm:text-sm">
              <Skeleton className={`aspect-[2/3] w-40 max-w-full ${STILL}`} />
              <p className={RECENT_GAME_NAME} />
            </div>
          </div>
        ))}
      </div>
      <div className="mt-8 mb-4 flex items-center justify-between">
        <h2 className="text-lg font-bold text-neutral-300 sm:text-xl">
          {/* Only "Recently Played" shows the spinner; this icon waits for data. */}
          <span className="text-emerald-500">#</span> Full Games Collection{" "}
          <span className="invisible">🎮</span>
        </h2>
        <Skeleton className="h-4 w-[93px] rounded-xs sm:h-5 sm:w-[132px]" />
      </div>
      <div className="fade-in-up flex min-h-[337px] flex-row flex-wrap content-start items-start gap-3 max-sm:grid max-sm:grid-cols-2 max-sm:gap-2.5">
        {TILES.map((key) => (
          <div className={WAVE} key={key}>
            <Skeleton
              className={`h-[75.27px] w-[160.6px] rounded-xs max-sm:aspect-[460/215] max-sm:h-auto max-sm:w-full ${STILL}`}
            />
          </div>
        ))}
      </div>
    </div>
  );
}

/** A recent game's name always takes two lines, so card heights never vary. */
export const RECENT_GAME_NAME = "min-h-[calc(2lh+0.25rem)] pt-1";
