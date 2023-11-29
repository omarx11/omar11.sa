"use client";
import dynamic from "next/dynamic";
import Link from "next/link";
import Image from "next/image";
import { StatementContext } from "@/app/context/statement";
import { useContext, useEffect } from "react";
import { motion } from "framer-motion";
import { links } from "../configs/navigation";
import { cn } from "../lib/utils";
import { usePathname } from "next/navigation";

const Navbar = () => {
  const pathname = usePathname();
  const { page, setPage, color, setColor } = useContext(StatementContext);

  useEffect(() => {
    const linkPathname = links.find((a) => a.href === pathname);
    setPage(linkPathname?.id);
  }, []);

  return (
    <nav className="fade-in mt-4 flex min-h-[28px] select-none flex-wrap gap-4 border-t-8 border-neutral-900 pt-4 font-bold text-neutral-300">
      {links.slice(0, 7).map((link, index) => (
        <motion.div
          key={index}
          className={cn("relative", {
            "pointer-events-none relative z-10": index === page,
          })}
          onTap={() => {
            setColor(links[page]?.color);
            setPage(index);
          }}
        >
          <Link
            href={link.href}
            className={cn(
              "flex flex-row items-center gap-1 rounded-md bg-neutral-900 px-2 py-[2px]",
              {
                "pointer-events-none": index === page,
                "hover:bg-neutral-800": index !== page,
              },
            )}
          >
            {link.name}
            <Image
              src={link.src}
              width={20}
              height={20}
              className="drag-none select-none"
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
};

export default dynamic(() => Promise.resolve(Navbar), {
  loading: () => (
    <span className="mb-2 mt-8 min-h-[28px] w-full animate-pulse rounded-md bg-neutral-800/75"></span>
  ),
  ssr: false,
});
