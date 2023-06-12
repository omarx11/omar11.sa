"use client";

import { createContext, useState, useContext } from "react";
import { linksInfo } from "../data/navigation";

const NavContext = createContext();

export const NavProvider = ({ children }) => {
  if (!window.sessionStorage.getItem("pageId"))
    window.sessionStorage.setItem("pageId", 0);
  const session = JSON.parse(window.sessionStorage.getItem("pageId"));
  const [page, setPage] = useState(session);
  const [color, setColor] = useState(linksInfo[session].color);

  return (
    <NavContext.Provider value={{ page, setPage, color, setColor }}>
      {children}
    </NavContext.Provider>
  );
};

export const useNavContext = () => useContext(NavContext);
