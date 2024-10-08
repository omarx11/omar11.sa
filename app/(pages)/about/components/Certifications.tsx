"use client";

import { Swiper, SwiperSlide } from "swiper/react";
import { EffectCards } from "swiper/modules";
import Image from "next/image";
import "swiper/css";
import "swiper/css/effect-cards";

export default function Certifications() {
  const images = [
    "/static/images/certificates/HRDF-1.jpg",
    "/static/images/certificates/HRDF-2.jpg",
    "/static/images/certificates/IoT.jpg",
    "/static/images/certificates/javascript-103.png",
    "/static/images/certificates/cyber-security basics.jpg",
    "/static/images/certificates/AWS-cloud.jpg",
    "/static/images/certificates/microsoft-excel.jpg",
    "/static/images/certificates/web-apps.jpg",
    "/static/images/certificates/SDB-1.jpg",
    "/static/images/certificates/SDB-2.jpg",
    "/static/images/certificates/SDB-3.jpg",
  ];

  return (
    <div className="pt-8">
      <div className="mb-4 flex items-end justify-center gap-2 md:justify-start">
        <p className="text-lg font-bold text-neutral-300 md:text-xl">
          Certifications <span className="text-base">\</span>
        </p>
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width="26"
          height="26"
          viewBox="0 0 256 256"
          className="fill-amber-600/90"
        >
          <path
            d="M224 56v36.23a48 48 0 1 0-64 71.57V192H40a8 8 0 0 1-8-8V56a8 8 0 0 1 8-8h176a8 8 0 0 1 8 8"
            opacity=".2"
          />
          <path d="M248 128a56 56 0 1 0-96 39.14V224a8 8 0 0 0 11.58 7.16L192 216.94l28.42 14.22A8 8 0 0 0 232 224v-56.86A55.81 55.81 0 0 0 248 128m-56-40a40 40 0 1 1-40 40a40 40 0 0 1 40-40m3.58 112.84a8 8 0 0 0-7.16 0L168 211.06v-32.47a55.94 55.94 0 0 0 48 0v32.47ZM136 192a8 8 0 0 1-8 8H40a16 16 0 0 1-16-16V56a16 16 0 0 1 16-16h176a16 16 0 0 1 16 16a8 8 0 0 1-16 0H40v128h88a8 8 0 0 1 8 8m-16-56a8 8 0 0 1-8 8H72a8 8 0 0 1 0-16h40a8 8 0 0 1 8 8m0-32a8 8 0 0 1-8 8H72a8 8 0 0 1 0-16h40a8 8 0 0 1 8 8" />
        </svg>
      </div>
      <Swiper
        effect={"cards"}
        grabCursor={true}
        initialSlide={Math.floor(images.length / 2)}
        modules={[EffectCards]}
        className="max-w-[320px] opacity-100 md:max-w-[360px]"
      >
        {images.map((image, i) => (
          <SwiperSlide className="rounded-lg" key={i}>
            <Image
              src={image}
              width={640}
              height={453}
              placeholder="blur"
              blurDataURL="/static/icons/blur.svg"
              className="max-w-[320px] select-none rounded-lg bg-neutral-800 md:max-w-[340px] lg:max-w-[360px]"
              alt={`Certificate ${i + 1}`}
            />
          </SwiperSlide>
        ))}
      </Swiper>
    </div>
  );
}
