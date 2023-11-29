"use client";
import { useState, useEffect } from "react";
import { cn } from "../lib/utils";

export default function Transition({ children }) {
  const [currentChild, setCurrentChild] = useState(children);

  useEffect(() => {
    if (currentChild === children) return;
    setCurrentChild(children);

    const id = setTimeout(() => {
      setCurrentChild(children);
    }, 200);
    return () => clearTimeout(id);
  }, [children]);

  return (
    <div
      className={cn("my-9 flex-1 overflow-visible", {
        "fade-out": currentChild !== children,
        "fade-in": currentChild === children,
      })}
    >
      {currentChild}
    </div>
  );
}
