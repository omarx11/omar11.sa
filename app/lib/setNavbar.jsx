"use client";

import { useEffect, useState } from "react";

export const useSessionStorage = () => {
  const session = JSON.parse(window.sessionStorage.getItem("pageId"));
  const [selectedLink, setSelectedLink] = useState(session || 0);
  const [formerColor, setFormerColor] = useState("");
  console.log("storage: ", session);
  // useEffect(() => {
  //   setSelectedLink(session);
  // }, [session]);
  return { selectedLink, setSelectedLink, formerColor, setFormerColor };
};

// export function humanStuff() {
//   const [human, setHuman] = useState(1);
//   const [first, setFirst] = useState(false);

//   useEffect(() => {
//     const storedState = sessionStorage.getItem("human");
//     if (storedState) {
//       setHuman(JSON.parse(storedState));
//     }
//     setFirst(true);
//   }, []);

//   const handleChange = (e) => {
//     const { name, value } = e.target;
//     setHuman((prevHuman) => ({ ...prevHuman, [name]: value }));
//   };

//   useEffect(() => {
//     if (first) {
//       sessionStorage.setItem("human", JSON.stringify(human));
//     }
//   }, [human]);

//   return { human, handleChange, setHuman };
// }
