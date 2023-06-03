"use client";

import { motion } from "framer-motion";

export const container = {
  hidden: { opacity: 1, scale: 0 },
  visible: {
    opacity: 1,
    scale: 1,
    transition: {
      delayChildren: 0,
      staggerChildren: 0.1,
    },
  },
};

export const item = {
  hidden: { y: 160, opacity: 0 },
  visible: {
    y: 0,
    opacity: 1,
  },
};

export const div = motion.div;
export const h2 = motion.h2;
export const p = motion.p;

{
  /* <motion.ul
  className="m-0 grid h-[150px] w-[150px] list-none grid-cols-2 grid-rows-2 gap-4 overflow-hidden rounded-[50px] bg-slate-500 p-4"
  variants={container}
  initial="hidden"
  animate="visible"
>
  {[0, 1, 2, 3].map((index) => (
    <motion.li key={index} className="rounded-full bg-white" variants={item} />
  ))}
</motion.ul>; */
}
