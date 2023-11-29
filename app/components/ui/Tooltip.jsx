"use client";
import { forwardRef } from "react";
import { Provider, Root, Trigger, Content } from "@radix-ui/react-tooltip";
import { cn } from "@/app/lib/utils";

const TooltipProvider = Provider;
const Tooltip = Root;
const TooltipTrigger = Trigger;

const TooltipContent = forwardRef(
  ({ className, sideOffset = 4, ...props }, ref) => (
    <Content
      ref={ref}
      sideOffset={sideOffset}
      className={cn(
        "z-50 overflow-hidden rounded-md bg-neutral-950 px-3 py-1.5 text-sm text-neutral-100",
        className,
      )}
      {...props}
    />
  ),
);
TooltipContent.displayName = Content.displayName;

export { Tooltip, TooltipTrigger, TooltipContent, TooltipProvider };
