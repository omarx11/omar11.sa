import { Loading } from "@/app/components/icons/Loading";
import { Skeleton } from "@/app/components/ui/Skeleton";

const COVERS = ["a", "b", "c", "d", "e"];
const TILES = Array.from({ length: 22 }, (_, i) => `tile-${i}`);

/** Shown while Steam data loads; mirrors the loaded layout's sizes. */
export default function GamesSkeleton() {
  return (
    <div aria-busy="true" aria-label="Loading games" role="status">
      <h2 className="mb-4 font-bold text-neutral-300 text-xl">
        <span className="text-emerald-500">#</span> Recently Played Games{" "}
        <Loading className="inline animate-spin" />
      </h2>
      <div className="fade-in-up flex min-h-[225px] flex-row flex-wrap gap-4 sm:min-h-[308px]">
        {COVERS.map((key) => (
          // The wrapper takes the staggered entrance; the skeleton keeps pulsing.
          <div key={key}>
            <Skeleton className="mt-5 aspect-[2/3] w-[110px] rounded-md sm:w-40" />
          </div>
        ))}
      </div>
      <div className="mt-8 mb-4 flex items-center justify-between">
        <h2 className="font-bold text-neutral-300 text-xl">
          {/* Only "Recently Played" shows the spinner; this icon waits for data. */}
          <span className="text-emerald-500">#</span> Full Games Collection
        </h2>
        <Skeleton className="h-4 w-[93px] rounded-xs sm:h-5 sm:w-[132px]" />
      </div>
      <div className="fade-in-up flex min-h-[337px] flex-row flex-wrap content-start items-start gap-3">
        {TILES.map((key) => (
          <div key={key}>
            <Skeleton className="h-[75.27px] w-[160.6px] rounded-xs" />
          </div>
        ))}
      </div>
    </div>
  );
}
