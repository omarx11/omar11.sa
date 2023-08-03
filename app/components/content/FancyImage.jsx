"use client";
import Image from "next/image";
import dynamic from "next/dynamic";
import { Fancybox } from "@fancyapps/ui";
import "@fancyapps/ui/dist/fancybox/fancybox.css";

const FancyImage = ({ src, caption, ...props }) => {
  Fancybox.bind("[data-fancybox]", {
    Toolbar: {
      display: {
        left: ["infobar"],
        middle: [
          "zoomIn",
          "zoomOut",
          "toggle1to1",
          "rotateCCW",
          "rotateCW",
          "flipX",
          "flipY",
        ],
        right: ["slideshow", "fullscreen", "thumbs", "close"],
      },
    },
    buttons: ["close"],
    wheel: false,
    transitionEffect: "slide",
    loop: true,
    toolbar: false,
    clickContent: false,
    groupAttr: false,
    Thumbs: {
      type: "classic",
    },
    // thumbs          : false,
    // hash            : false,
    // keyboard        : true,
    // animationEffect : false,
    // arrows          : true,
  });

  return (
    <Image
      data-fancybox
      src={src}
      width={768}
      height={468}
      placeholder="blur"
      blurDataURL="/blur.svg"
      data-caption={caption}
      {...props}
    />
  );
};

// export default dynamic(() => Promise.resolve(FancyImage), {
//   ssr: false,
// });

export default dynamic(() => Promise.resolve(FancyImage));
