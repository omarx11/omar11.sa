"use client";
import { useState } from "react";
import Pagination from "./Pagination";
import Image from "next/image";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/app/components/ui/Tooltip";

export default function GameCol(data) {
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 21; // Adjust this based on your needs
  const targetIds = [
    12120, 12250, 407530, 596350, 747350, 755790, 700580, 878760, 640590,
    1449560, 34330, 371140, 342230, 431960,
  ]; // filter multiple games by there ids.

  const gamesArray = data.data.games
    .sort((a, b) => b.playtime_forever - a.playtime_forever)
    .filter((item) => !targetIds.includes(item.appid));

  const totalItems = gamesArray.length;
  const totalPages = Math.ceil(totalItems / itemsPerPage);

  const handlePageChange = (page) => setCurrentPage(page);

  const currentItems = gamesArray.slice(
    (currentPage - 1) * itemsPerPage,
    currentPage * itemsPerPage,
  );

  let totalPlayTime = 0;
  for (let i = 1; i < totalItems; i++) {
    totalPlayTime += gamesArray[i].playtime_forever;
  }

  return (
    <>
      <div className="mb-4 mt-8 flex items-center justify-between">
        <h2 className="text-xl font-bold text-neutral-300">
          <span className="text-emerald-500">#</span> Full Games Collection{" "}
          {data ? (
            "🕹️"
          ) : (
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="22"
              height="22"
              viewBox="0 0 24 24"
              className="inline animate-spin"
            >
              <g fill="currentColor">
                <path
                  fillRule="evenodd"
                  d="M12 19a7 7 0 1 0 0-14a7 7 0 0 0 0 14Zm0 3c5.523 0 10-4.477 10-10S17.523 2 12 2S2 6.477 2 12s4.477 10 10 10Z"
                  clipRule="evenodd"
                  opacity=".2"
                />
                <path d="M2 12C2 6.477 6.477 2 12 2v3a7 7 0 0 0-7 7H2Z" />
              </g>
            </svg>
          )}
        </h2>
        {data && (
          <TooltipProvider delayDuration={0}>
            <Tooltip>
              <TooltipTrigger>
                <p className="text-sm text-neutral-400">
                  <span className="text-neutral-300">{totalItems}</span> game
                  found
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="16"
                    height="16"
                    viewBox="0 0 16 16"
                    className="ml-1.5 inline"
                  >
                    <path
                      fill="currentColor"
                      d="M1 5a2 2 0 0 1 2-2h10a2 2 0 0 1 2 2v5a2 2 0 0 1-1.164 1.818a1.5 1.5 0 0 0-.275-.379l-4-4A1.5 1.5 0 0 0 7 8.5V12H3a2 2 0 0 1-2-2V5Zm7.854 3.146A.5.5 0 0 0 8 8.5v6a.5.5 0 0 0 .9.3l1.35-1.8h2.25a.5.5 0 0 0 .354-.854l-4-4Z"
                    />
                  </svg>
                </p>
              </TooltipTrigger>
              <TooltipContent className="rounded-sm bg-emerald-900">
                <p>
                  Total play time \{" "}
                  <span className="text-neutral-300">
                    {Math.floor(totalPlayTime / 60)} hours
                  </span>
                </p>
              </TooltipContent>
            </Tooltip>
          </TooltipProvider>
        )}
      </div>
      <TooltipProvider delayDuration={0}>
        <div className="flex flex-row flex-wrap gap-3">
          {currentItems.map((game, i) => (
            <Tooltip key={i}>
              <TooltipTrigger className="rounded-sm">
                <Image
                  src={`https://cdn.cloudflare.steamstatic.com/steam/apps/${game.appid}/header.jpg`}
                  width={256}
                  height={119}
                  placeholder="blur"
                  blurDataURL="/static/icons/blur.svg"
                  className="drag-none w-40 select-none rounded-sm bg-neutral-900 transition-transform duration-200"
                  alt=""
                />
              </TooltipTrigger>
              <TooltipContent
                align="start"
                className="rounded-sm bg-emerald-900"
              >
                <p className="underline">{game.name}</p>
                <span className="block text-xs text-neutral-300">
                  {Math.floor((game.playtime_forever / 60) * 10) / 10} hours
                  total
                </span>
              </TooltipContent>
            </Tooltip>
          ))}
        </div>
        <Pagination
          pages={totalPages}
          state={{ page: currentPage, window: 5 }}
          onPageChange={handlePageChange}
        />
      </TooltipProvider>
    </>
  );
}