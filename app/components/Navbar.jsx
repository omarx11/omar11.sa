"use client";

import Link from "next/link";
import Image from "next/image";
import { linksInfo } from "@/app/data/navigation";
import { navigate } from "@/app/lib/setNavbar";
import * as motion from "@/app/lib/useMoition";

export default function Navbar() {
  const { page, setPage, pageColor, setPageColor } = navigate();
  return (
    <ul className="flex select-none flex-wrap gap-4 font-bold text-stone-300">
      {linksInfo.map((link, index) => (
        <motion.li
          key={index}
          className={
            index === page
              ? "pointer-events-none relative rounded-md"
              : "relative rounded-md"
          }
          onTap={() => {
            if (window.sessionStorage.getItem("pageId"))
              window.sessionStorage.setItem("pageId", index);
            setPageColor(linksInfo[index].color);
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
          {console.log(page)}
          {index === page && (
            <motion.div
              className="absolute left-0 top-0 z-10 h-full w-full rounded-md"
              layoutId="page"
              initial={{ backgroundColor: pageColor }}
              animate={{ backgroundColor: link.color }}
              transition={{ type: "spring", duration: 0.4 }}
            />
          )}
        </motion.li>
      ))}
    </ul>
  );
}

// export default function Navbar() {
// const [selectedLink, setSelectedLink, formerColor, setFormerColor] =
//   useSessionStorage();
// return setNavbar(5);
//   <ul className="flex flex-wrap gap-4 font-bold text-stone-300">
//     {linksInfo.map((link, index) => (
//       <motion.li
//         key={index}
//         className="relative rounded-md"
//         onTap={() => {
//           window.sessionStorage.setItem("pageId", index);
//           setSelectedLink(index);
//           setFormerColor(linksInfo[selectedLink].color);
//         }}
//       >
//         <Link
//           href={link.href}
//           prefetch={false}
//           className={
//             index === selectedLink
//               ? "pointer-events-none flex flex-row items-center gap-1 bg-stone-900 px-2 py-[2px]"
//               : "flex flex-row items-center gap-1 bg-stone-900 px-2 py-[2px] hover:bg-stone-800"
//           }
//         >
//           <p className="z-10">{link.name}</p>
//           <Image
//             src={link.src}
//             width={20}
//             height={20}
//             className="z-10 select-none drag-none"
//             alt={link.alt}
//           />
//         </Link>
//         {index === selectedLink && (
//           <motion.div
//             className="absolute left-0 top-0 h-full w-full rounded-md"
//             layoutId="selected"
//             initial={{ backgroundColor: formerColor }}
//             animate={{ backgroundColor: link.color }}
//             transition={{ duration: 0.2 }}
//           />
//         )}
//       </motion.li>
//     ))}
//   </ul>
// }
