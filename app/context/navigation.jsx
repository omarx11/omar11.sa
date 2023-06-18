"use client";

import { useEffect, createContext, useState, useContext } from "react";
import { linksInfo } from "@/app/data/navigation";

const NavContext = createContext();

const NavProvider = ({ children }) => {
  const session =
    typeof window !== "undefined"
      ? JSON.parse(sessionStorage.getItem("page")) ?? 0
      : 0;
  const [page, setPage] = useState(session);
  const [color, setColor] = useState(linksInfo[session].color);

  useEffect(() => {
    sessionStorage.setItem("page", page);
  }, [page]);

  return (
    <NavContext.Provider value={{ page, setPage, color, setColor }}>
      {children}
    </NavContext.Provider>
  );
};

export default NavProvider;

export const useNavContext = () => useContext(NavContext);
