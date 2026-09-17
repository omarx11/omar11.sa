"use client";

import { motion } from "framer-motion";
import dynamic from "next/dynamic";
import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useContext, useEffect } from "react";

import { StatementContext } from "@/app/context/statement";

import { links } from "../config/navigation";
import { cn } from "../lib/utils";
import { Skeleton } from "./ui/Skeleton";

const NavPages = () => {
  const pathname = usePathname();
  const { pageNo, pageColor, setPageNo } = useContext(StatementContext);

  useEffect(() => {
    const linkPathname = links.find((a) => a.href === pathname);
    setPageNo(linkPathname ? linkPathname.id : 0);
  }, [pathname, setPageNo]);

  return (
    <nav className="fade-in flex flex-wrap gap-4 font-bold text-neutral-300">
      {links.slice(0, 7).map((link) => (
        <motion.div
          className={cn("relative", {
            "pointer-events-none relative z-10": link.id === pageNo,
          })}
          key={link.name}
          onTap={() => setPageNo(link.id)}
        >
          <Link
            aria-label={`Go to ${link.name}`}
            className={cn(
              "flex flex-row items-center gap-1 rounded-md bg-neutral-900 px-2 py-[2px]",
              {
                "pointer-events-none": link.id === pageNo,
                "hover:bg-neutral-800": link.id !== pageNo,
              },
            )}
            href={link.href}
          >
            {link.name}
            <Image
              alt={`${link.name} icon`}
              className="drag-none select-none"
              height={20}
              src={link.src || ""}
              width={20}
            />
          </Link>
          {link.id === pageNo && (
            <motion.div
              animate={{ backgroundColor: link.color }}
              className="absolute top-0 left-0 z-10 h-full w-full rounded-md"
              initial={{ backgroundColor: pageColor }}
              layoutId="page"
              transition={{ type: "spring", duration: 0.4 }}
            />
          )}
        </motion.div>
      ))}
    </nav>
  );
};

const Navbar = () => {
  return (
    <div className="mt-4 flex min-h-[28px] select-none items-center justify-between border-neutral-900 border-t-8 pt-4">
      <NavPages />
      <div className="fade-in-up flex items-center text-neutral-500 sm:gap-1.5">
        <svg
          aria-label="point arrow"
          height="1.8rem"
          viewBox="0 0 24 24"
          width="1.8rem"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            d="M6.75 15.75L3 12m0 0l3.75-3.75M3 12h18"
            fill="none"
            stroke="currentColor"
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth="1.5"
          />
        </svg>
        <p className="text-right sm:w-max">Select Pages</p>
      </div>
    </div>
  );
};

export default dynamic(() => Promise.resolve(Navbar), {
  loading: () => (
    <Skeleton className="mt-8 mb-2 min-h-[28px] w-full rounded-sm bg-neutral-800/75" />
  ),
  ssr: false,
});
