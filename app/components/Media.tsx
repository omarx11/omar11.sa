import Image from "next/image";
import Link from "next/link";

import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/app/components/ui/Tooltip";
import { media } from "@/app/config/media";

export default function Media() {
  return (
    <div className="flex flex-row gap-3">
      <TooltipProvider delayDuration={0}>
        {media.map(({ url, icon, name }) => (
          <Tooltip key={name}>
            <TooltipTrigger className="inline-flex">
              <Link
                className="rounded-full bg-neutral-900 p-[6px] hover:bg-neutral-800"
                href={url}
                target="_blank"
              >
                <Image
                  alt={name}
                  className="drag-none select-none"
                  height={18}
                  src={icon}
                  width={18}
                />
              </Link>
            </TooltipTrigger>
            <TooltipContent className="origin-[var(--radix-tooltip-content-transform-origin)] scale-in bg-neutral-800">
              {name}
            </TooltipContent>
          </Tooltip>
        ))}
      </TooltipProvider>
    </div>
  );
}
