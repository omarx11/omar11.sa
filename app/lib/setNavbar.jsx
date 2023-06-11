"use client";

import { useState } from "react";
import { linksInfo } from "@/app/data/navigation";

export const navigate = () => {
  if (!window.sessionStorage.getItem("pageId"))
    window.sessionStorage.setItem("pageId", 0);
  const session = JSON.parse(window.sessionStorage.getItem("pageId"));
  const [page, setPage] = useState(session);
  const [pageColor, setPageColor] = useState(linksInfo[session].color);

  return { page, setPage, pageColor, setPageColor };
};

// const useSessionStorage = () => {
//   if (!window.sessionStorage.getItem("pageId"))
//     window.sessionStorage.setItem("pageId", 0);

//   // console.log(linksInfo.filter((e) => e.name == "About")[0]);

//   const session = JSON.parse(window.sessionStorage.getItem("pageId"));
//   const [selectedLink, setSelectedLink] = useState(session || 0);
//   const [formerColor, setFormerColor] = useState("");
//   console.log("storage: ", session);
//   return [selectedLink, setSelectedLink, formerColor, setFormerColor];
// };

// export default useSessionStorage;
