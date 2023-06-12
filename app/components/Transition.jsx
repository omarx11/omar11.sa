"use client";

import { useState, useEffect } from "react";

export default function Transition({ children }) {
  const [currentChild, setCurrentChild] = useState(children);

  useEffect(() => {
    if (currentChild === children) return;

    const id = setTimeout(() => {
      setCurrentChild(children);
    }, 200);

    return () => clearTimeout(id);
  }, [children]);

  return (
    <div
      className={
        currentChild !== children
          ? "fade-out mb-8 mt-12 flex-1 overflow-visible text-base"
          : "fade-in mb-8 mt-12 flex-1 overflow-visible text-base"
      }
    >
      {currentChild}
    </div>
  );
}
