"use client";

import { useState, useEffect } from "react";

export default function Transition({ children }) {
  const [currentChild, setCurrentChild] = useState(children);

  useEffect(() => {
    if (currentChild === children) return;
    setCurrentChild(children);

    // const id = setTimeout(() => {
    //   setCurrentChild(children);
    // }, 200);
    // return () => clearTimeout(id);
  }, [children]);

  return (
    <div
      className={
        currentChild !== children
          ? "fade-out my-9 flex-1 overflow-visible"
          : "fade-in my-9 flex-1 overflow-visible"
      }
    >
      {currentChild}
    </div>
  );
}
