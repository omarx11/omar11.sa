import Image from "next/image";
import Link from "next/link";

import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/Tooltip";
import { socialLinks } from "@/config/social-links";

export default function SocialLinks() {
  return (
    <div className="flex flex-row gap-3">
      <TooltipProvider delayDuration={0}>
        {socialLinks.map(({ url, icon, name }) => (
          <Tooltip key={name}>
            <TooltipTrigger asChild>
              <Link
                aria-label={name}
                className="inline-flex rounded-full bg-neutral-900 p-[6px] hover:bg-neutral-800"
                href={url}
                rel="noopener noreferrer"
                target="_blank"
              >
                <Image alt="" height={18} src={icon} width={18} />
              </Link>
            </TooltipTrigger>
            <TooltipContent className="scale-in origin-[var(--radix-tooltip-content-transform-origin)] bg-neutral-800">
              {name}
            </TooltipContent>
          </Tooltip>
        ))}
      </TooltipProvider>
    </div>
  );
}
