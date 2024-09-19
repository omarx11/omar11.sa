"use client";

import dynamic from "next/dynamic";
import Link from "next/link";
import Image from "next/image";
import { useContext, useEffect } from "react";
import { StatementContext } from "@/app/context/statement";
import { usePathname } from "next/navigation";
import { Skeleton } from "./ui/Skeleton";
import { motion } from "framer-motion";
import { links } from "../config/navigation";
import { cn } from "../lib/utils";

const NavPages = () => {
  const pathname = usePathname();
  const { pageNo, pageColor, setPageNo } = useContext(StatementContext);

  useEffect(() => {
    const linkPathname = links.find((a) => a.href === pathname);
    setPageNo(linkPathname ? linkPathname.id : 0);
  }, [pathname, setPageNo]);

  return (
    <nav
      className="fade-in flex flex-wrap gap-4 font-bold text-neutral-300"
      role="navigation"
    >
      {links.slice(0, 7).map((link) => (
        <motion.div
          key={link.name}
          className={cn("relative", {
            "pointer-events-none relative z-10": link.id === pageNo,
          })}
          onTap={() => setPageNo(link.id)}
        >
          <Link
            href={link.href}
            className={cn(
              "flex flex-row items-center gap-1 rounded-md bg-neutral-900 px-2 py-[2px]",
              {
                "pointer-events-none": link.id === pageNo,
                "hover:bg-neutral-800": link.id !== pageNo,
              }
            )}
            aria-label={`Go to ${link.name}`}
          >
            {link.name}
            <Image
              src={link.src || ""}
              width={20}
              height={20}
              className="drag-none select-none"
              alt={`${link.name} icon`}
            />
          </Link>
          {link.id === pageNo && (
            <motion.div
              className="absolute left-0 top-0 z-10 h-full w-full rounded-md"
              layoutId="page"
              initial={{ backgroundColor: pageColor }}
              animate={{ backgroundColor: link.color }}
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
    <div className="mt-4 flex min-h-[28px] select-none items-center justify-between border-t-8 border-neutral-900 pt-4">
      <NavPages />
      <div className="fade-in-up flex items-center text-neutral-500 sm:gap-1.5">
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width="1.8rem"
          height="1.8rem"
          viewBox="0 0 24 24"
          aria-label="point arrow"
        >
          <path
            fill="none"
            stroke="currentColor"
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth="1.5"
            d="M6.75 15.75L3 12m0 0l3.75-3.75M3 12h18"
          />
        </svg>
        <p className="text-right sm:w-max">Select Pages</p>
      </div>
    </div>
  );
};

export default dynamic(() => Promise.resolve(Navbar), {
  loading: () => (
    <Skeleton className="mb-2 mt-8 min-h-[28px] w-full rounded-sm bg-neutral-800/75" />
  ),
  ssr: false,
});
