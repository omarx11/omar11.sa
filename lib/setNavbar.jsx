"use client";

import { useState } from "react";

const useSessionStorage = () => {
  const session = JSON.parse(sessionStorage.getItem("pageId"));
  console.log("storage: ", session);
  const [selectedLink, setSelectedLink] = useState(session);
  const [formerColor, setFormerColor] = useState("");
  return [selectedLink, setSelectedLink, formerColor, setFormerColor];
};

export default useSessionStorage;
