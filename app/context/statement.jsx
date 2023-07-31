"use client";
import { useEffect, createContext, useState } from "react";
import { links } from "@/app/config/navigation";

export const StatementContext = createContext();

export const StatementProvider = ({ children }) => {
  const session =
    typeof window !== "undefined"
      ? JSON.parse(sessionStorage.getItem("page")) ?? 0
      : 0;
  const [page, setPage] = useState(session);
  const [color, setColor] = useState(links[session].color);
  const [comments, setComments] = useState(null);

  useEffect(() => {
    sessionStorage.setItem("page", page);
  }, [page]);

  return (
    <StatementContext.Provider
      value={{ page, setPage, color, setColor, comments, setComments }}
    >
      {children}
    </StatementContext.Provider>
  );
};
