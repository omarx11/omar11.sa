"use client";

import { useEffect, createContext, useState, useContext } from "react";
import { linksInfo } from "@/app/data/navigation";

const NavContext = createContext();

const Provider = ({ children }) => {
  const session =
    typeof window !== "undefined"
      ? JSON.parse(sessionStorage.getItem("page")) ?? 0
      : 0;
  const [page, setPage] = useState(session);
  const [color, setColor] = useState(linksInfo[session].color);
  const [comments, setComments] = useState(null);

  useEffect(() => {
    sessionStorage.setItem("page", page);
  }, [page]);

  return (
    <NavContext.Provider
      value={{ page, setPage, color, setColor, comments, setComments }}
    >
      {children}
    </NavContext.Provider>
  );
};

export default Provider;

export const useNavContext = () => useContext(NavContext);
