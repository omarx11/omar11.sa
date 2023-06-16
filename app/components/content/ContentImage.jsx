"use client";

import Image from "next/image";
import { useEffect, useState } from "react";
import Lightbox from "react-18-image-lightbox";
import useMediaQuery from "@/app/lib/useMediaQuery";
import dynamic from "next/dynamic";
import "react-18-image-lightbox/style.css";

const ContentImage = ({ src, alt, ...props }) => {
  const [isOpen, setIsOpen] = useState(false);

  const isMatch = useMediaQuery("(min-width: 768px)");

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
          imagePadding={isMatch ? 200 : 10}
          reactModalStyle={{
            maxWidth: "500px",
          }}
        />
      )}
    </>
  );
};

export default dynamic(() => Promise.resolve(ContentImage));
