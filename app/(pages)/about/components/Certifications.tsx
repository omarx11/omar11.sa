"use client";

import Image from "next/image";
import { useRef, useState } from "react";
import type { Swiper as SwiperType } from "swiper";
import { EffectCards } from "swiper/modules";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import "swiper/css/effect-cards";

const images = [
  "/static/images/certificates/hrdf-1.jpg",
  "/static/images/certificates/hrdf-2.jpg",
  "/static/images/certificates/iot.jpg",
  "/static/images/certificates/javascript-103.png",
  "/static/images/certificates/cyber-security-basics.jpg",
  "/static/images/certificates/aws-cloud.jpg",
  "/static/images/certificates/microsoft-excel.jpg",
  "/static/images/certificates/web-apps.jpg",
  "/static/images/certificates/sdb-1.jpg",
  "/static/images/certificates/sdb-2.jpg",
  "/static/images/certificates/sdb-3.jpg",
];

const initialSlide = Math.floor(images.length / 2);

export default function Certifications() {
  const swiperRef = useRef<SwiperType>(null);
  const dialogRef = useRef<HTMLDialogElement>(null);
  const [activeIndex, setActiveIndex] = useState(initialSlide);
  const [viewing, setViewing] = useState(initialSlide);
  const viewingSrc = images[viewing];

  const open = () => {
    setViewing(activeIndex);
    dialogRef.current?.showModal();
  };

  const close = () => dialogRef.current?.close();

  const step = (by: number) =>
    setViewing((i) => (i + by + images.length) % images.length);

  return (
    <div className="pt-8">
      <div className="mb-4 flex items-end justify-center gap-2 md:justify-start">
        <p className="text-lg font-bold text-neutral-300 md:text-xl">
          Certifications <span className="text-base">\</span>
        </p>
        <svg
          aria-label="Certifications icon"
          className="fill-amber-600/90"
          height="26"
          viewBox="0 0 256 256"
          width="26"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            d="M224 56v36.23a48 48 0 1 0-64 71.57V192H40a8 8 0 0 1-8-8V56a8 8 0 0 1 8-8h176a8 8 0 0 1 8 8"
            opacity=".2"
          />
          <path d="M248 128a56 56 0 1 0-96 39.14V224a8 8 0 0 0 11.58 7.16L192 216.94l28.42 14.22A8 8 0 0 0 232 224v-56.86A55.81 55.81 0 0 0 248 128m-56-40a40 40 0 1 1-40 40a40 40 0 0 1 40-40m3.58 112.84a8 8 0 0 0-7.16 0L168 211.06v-32.47a55.94 55.94 0 0 0 48 0v32.47ZM136 192a8 8 0 0 1-8 8H40a16 16 0 0 1-16-16V56a16 16 0 0 1 16-16h176a16 16 0 0 1 16 16a8 8 0 0 1-16 0H40v128h88a8 8 0 0 1 8 8m-16-56a8 8 0 0 1-8 8H72a8 8 0 0 1 0-16h40a8 8 0 0 1 8 8m0-32a8 8 0 0 1-8 8H72a8 8 0 0 1 0-16h40a8 8 0 0 1 8 8" />
        </svg>
      </div>
      <div>
        <Swiper
          className="max-w-[320px] opacity-100 md:max-w-[360px]"
          effect={"cards"}
          grabCursor={true}
          initialSlide={initialSlide}
          modules={[EffectCards]}
          onSlideChange={(swiper) => setActiveIndex(swiper.activeIndex)}
          onSwiper={(swiper) => {
            swiperRef.current = swiper;
          }}
        >
          {images.map((image, i) => (
            <SwiperSlide className="rounded-lg" key={image}>
              <Image
                alt={`Certificate ${i + 1}`}
                blurDataURL="/static/icons/blur.svg"
                className="max-w-[320px] rounded-lg bg-neutral-800 select-none md:max-w-[340px] lg:max-w-[360px]"
                height={453}
                placeholder="blur"
                src={image}
                width={640}
              />
              {/* Only on the top card; `swiper-no-swiping` keeps a press on
                  it from starting a drag. */}
              {i === activeIndex && (
                <button
                  aria-label={`View certificate ${i + 1} full size`}
                  className="swiper-no-swiping scale-in absolute top-2 right-2 rounded-md bg-black/60 p-1.5 text-neutral-200 backdrop-blur-sm transition-colors hover:bg-black/80 hover:text-white focus-visible:outline-2 focus-visible:outline-amber-600"
                  onClick={open}
                  type="button"
                >
                  <svg
                    aria-hidden="true"
                    fill="none"
                    height="18"
                    stroke="currentColor"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    viewBox="0 0 24 24"
                    width="18"
                  >
                    <circle cx="11" cy="11" r="7" />
                    <path d="m20 20-3.5-3.5M11 8v6M8 11h6" />
                  </svg>
                </button>
              )}
            </SwiperSlide>
          ))}
        </Swiper>
      </div>

      {/* Native modal: top layer (escapes the cards' 3D transforms), focus
          trap and Esc-to-close for free. Closing brings the deck to the
          certificate that was being viewed. */}
      <dialog
        aria-label="Certificate viewer"
        className="cert-viewer m-auto max-h-none max-w-none bg-transparent p-0 backdrop:bg-black/85 backdrop:backdrop-blur-sm"
        onClick={(e) => {
          if (e.target === e.currentTarget) close();
        }}
        onClose={() => swiperRef.current?.slideTo(viewing)}
        onKeyDown={(e) => {
          if (e.key === "ArrowRight") step(1);
          else if (e.key === "ArrowLeft") step(-1);
        }}
        ref={dialogRef}
      >
        <figure className="flex w-[min(92vw,960px)] flex-col items-center gap-3">
          {viewingSrc && (
            <Image
              alt={`Certificate ${viewing + 1}`}
              className="max-h-[80vh] w-full rounded-lg bg-neutral-800 object-contain select-none"
              height={453}
              sizes="(min-width: 1044px) 960px, 92vw"
              src={viewingSrc}
              width={640}
            />
          )}
          <figcaption className="flex items-center gap-2 text-sm text-neutral-300 select-none">
            <ViewerButton label="Previous certificate" onClick={() => step(-1)}>
              <path d="m15 18-6-6 6-6" />
            </ViewerButton>
            <span className="min-w-14 text-center tabular-nums">
              {viewing + 1} / {images.length}
            </span>
            <ViewerButton label="Next certificate" onClick={() => step(1)}>
              <path d="m9 18 6-6-6-6" />
            </ViewerButton>
            <ViewerButton label="Close" onClick={close}>
              <path d="M18 6 6 18M6 6l12 12" />
            </ViewerButton>
          </figcaption>
        </figure>
      </dialog>
    </div>
  );
}

function ViewerButton({
  label,
  onClick,
  children,
}: {
  label: string;
  onClick: () => void;
  children: React.ReactNode;
}) {
  return (
    <button
      aria-label={label}
      className="rounded-md bg-neutral-800/80 p-2 transition-colors hover:bg-neutral-700 hover:text-white focus-visible:outline-2 focus-visible:outline-amber-600"
      onClick={onClick}
      type="button"
    >
      <svg
        aria-hidden="true"
        fill="none"
        height="18"
        stroke="currentColor"
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth="2"
        viewBox="0 0 24 24"
        width="18"
      >
        {children}
      </svg>
    </button>
  );
}
