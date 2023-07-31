"use client";
import dynamic from "next/dynamic";
import Link from "next/link";
import Image from "next/image";
import { StatementContext } from "@/app/context/statement";
import { useContext } from "react";
import { motion } from "framer-motion";
import { links } from "../config/navigation";

function Navbar() {
  const { page, setPage, color, setColor } = useContext(StatementContext);
  return (
    <nav className="fade-in flex min-h-[28px] select-none flex-wrap gap-4 font-bold text-stone-300">
      {links.map((link, index) => (
        <motion.div
          key={index}
          className={
            index === page ? "pointer-events-none relative z-10" : "relative"
          }
          onTap={() => {
            setColor(links[page].color);
            setPage(index);
          }}
        >
          <Link
            href={link.href}
            prefetch={false}
            className={
              index === page
                ? "pointer-events-none flex flex-row items-center gap-1 rounded-md bg-stone-900 px-2 py-[2px]"
                : "flex flex-row items-center gap-1 rounded-md bg-stone-900 px-2 py-[2px] hover:bg-stone-800"
            }
          >
            <p>{link.name}</p>
            <Image
              src={link.src}
              width={20}
              height={20}
              className="select-none drag-none"
              alt={link.alt}
            />
          </Link>
          {index === page && (
            <motion.div
              className="absolute left-0 top-0 z-10 h-full w-full rounded-md"
              layoutId="page"
              initial={{ backgroundColor: color }}
              animate={{ backgroundColor: link.color }}
              transition={{ type: "spring", duration: 0.4 }}
            />
          )}
        </motion.div>
      ))}
    </nav>
  );
}

export default dynamic(() => Promise.resolve(Navbar), {
  loading: () => (
    <span className="min-h-[28px] w-full animate-pulse rounded-md bg-stone-900"></span>
  ),
  ssr: false,
});
