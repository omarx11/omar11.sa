"use client";

import Link from "next/link";
import Image from "next/image";
import { useNavContext } from "@/app/components/context/Navigation";
import { linksInfo } from "../data/navigation";
import { motion } from "framer-motion";
// import * as motion from "../lib/useMoition";
import { useEffect, useState } from "react";

export default function Navbar() {
  const [ready, setReady] = useState(false);

  useEffect(() => {
    setReady(true);
  }, []);

  const { page, setPage, color, setColor } = useNavContext();
  return (
    <nav className="flex min-h-[28px] select-none flex-wrap gap-4 font-bold text-stone-300">
      {ready ? (
        linksInfo.map((link, index) => (
          <motion.div
            key={index}
            className={
              index === page
                ? "pointer-events-none relative rounded-md"
                : "relative rounded-md"
            }
            onTap={() => {
              setColor(linksInfo[page].color);
              setPage(index);
            }}
          >
            <Link
              href={link.href}
              prefetch={false}
              className={
                index === page
                  ? "pointer-events-none flex flex-row items-center gap-1 bg-stone-900 px-2 py-[2px]"
                  : "flex flex-row items-center gap-1 bg-stone-900 px-2 py-[2px] hover:bg-stone-800"
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
        ))
      ) : (
        <span className="min-h-[28px] w-full animate-pulse rounded-md bg-stone-900"></span>
      )}
    </nav>
  );
}
