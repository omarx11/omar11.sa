"use client";
import dynamic from "next/dynamic";
import Link from "next/link";
import Image from "next/image";
import { StatementContext } from "@/app/context/statement";
import { useContext, useEffect } from "react";
import { motion } from "framer-motion";
import { links } from "../config/navigation";
import { cn } from "../lib/utils";
import { usePathname } from "next/navigation";

const Navbar = () => {
  const pathname = usePathname();
  const { pageNo, setPageNo, pageColor } = useContext(StatementContext);

  useEffect(() => {
    const linkPathname = links.find((a) => a.href === pathname);
    setPageNo(linkPathname?.id);
  }, []);

  return (
    <nav className="fade-in mt-4 flex min-h-[28px] select-none flex-wrap gap-4 border-t-8 border-neutral-900 pt-4 font-bold text-neutral-300">
      {links.slice(0, 7).map((link, index) => (
        <motion.div
          key={link.name}
          className={cn("relative", {
            "pointer-events-none relative z-10": index === pageNo,
          })}
          onTap={() => setPageNo(index)}
        >
          <Link
            href={link.href}
            className={cn(
              "flex flex-row items-center gap-1 rounded-md bg-neutral-900 px-2 py-[2px]",
              {
                "pointer-events-none": index === pageNo,
                "hover:bg-neutral-800": index !== pageNo,
              },
            )}
          >
            {link.name}
            <Image
              src={link.src}
              width={20}
              height={20}
              className="drag-none select-none"
              alt=""
            />
          </Link>
          {index === pageNo && (
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

export default dynamic(() => Promise.resolve(Navbar), {
  loading: () => (
    <span className="mb-2 mt-8 min-h-[28px] w-full animate-pulse rounded-md bg-neutral-800/75"></span>
  ),
  ssr: false,
});
