import { cn } from "@/lib/utils";

function Skeleton({
  className,
  ...props
}: React.HTMLAttributes<HTMLDivElement>) {
  return (
    <div
      className={cn(
        "animate-pulse rounded-md bg-[hsl(240,3.7%,7%)]",
        className,
      )}
      {...props}
    />
  );
}

/**
 * For a placeholder's wrapper inside a `fade-in`/`fade-in-up` container: it
 * replays the container's staggered entrance forever, a wave across the
 * placeholders, while the skeleton inside holds still (SKELETON_STILL).
 * That's how the original site looked (its fade-in set no repeat count, so
 * the skeleton pulse's `infinite` stayed). With reduced motion the wrapper
 * holds still and the skeleton pulses. The wave sits on a wrapper because a
 * skeleton's own pulse class comes later in the CSS than the entrance
 * utilities and would win.
 */
const SKELETON_WAVE =
  "motion-safe:[animation-iteration-count:infinite]! motion-reduce:animate-none!";
const SKELETON_STILL = "motion-safe:animate-none";

export { SKELETON_STILL, SKELETON_WAVE, Skeleton };
