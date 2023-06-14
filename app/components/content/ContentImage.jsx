"use client";

import Image from "next/image";
import { useEffect, useState } from "react";
import Lightbox from "react-18-image-lightbox";
import "react-18-image-lightbox/style.css";

export const ContentImage = ({ src, alt, ...props }) => {
  const [isOpen, setIsOpen] = useState(false);

  useEffect(() => {
    if (typeof window !== "undefined") {
      const html = document.documentElement;

      if (isOpen) {
        html.classList.add("overflow-hidden");
      }

      if (html.classList.contains("overflow-hidden") && !isOpen) {
        html.classList.remove("overflow-hidden");
      }
    }
  }, [isOpen]);

  return (
    <>
      <Image
        onClick={() => setIsOpen(true)}
        src={src}
        alt={alt}
        width={768}
        height={468}
        {...props}
      />

      {isOpen && (
        <Lightbox
          mainSrc={src}
          imageTitle={props.title}
          onCloseRequest={() => setIsOpen(false)}
          animationDuration={150}
          reactModalStyle={{
            maxWidth: "500px",
          }}
        />
      )}
    </>
  );
};
