import Link from "next/link";
import Image from "next/image";
import { media } from "@/app/config/media";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/app/components/ui/Tooltip";

export default function Media() {
  return (
    <div className="flex flex-row gap-3">
      <TooltipProvider delayDuration={0}>
        {media.map(({ url, icon, name }, i) => (
          <Tooltip key={i}>
            <TooltipTrigger className="inline-flex">
              <Link
                href={url}
                target="_blank"
                className="rounded-full bg-neutral-900 p-[6px] hover:bg-neutral-800"
              >
                <Image
                  src={icon}
                  width={18}
                  height={18}
                  className="drag-none select-none"
                  alt={name}
                />
              </Link>
            </TooltipTrigger>
            <TooltipContent className="scale-in bg-neutral-800">
              {name}
            </TooltipContent>
          </Tooltip>
        ))}
      </TooltipProvider>
    </div>
  );
}
