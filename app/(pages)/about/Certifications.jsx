"use client";
import { Swiper, SwiperSlide } from "swiper/react";
import { EffectCards } from "swiper/modules";
import Image from "next/image";
import "swiper/css";
import "swiper/css/effect-cards";

export default function Certifications() {
  const images = [
    "/static/images/certificates/certificate-html.png",
    "/static/images/certificates/certificate-css.png",
    "/static/images/certificates/certificate-javascript-101.png",
    "/static/images/certificates/certificate-javascript-102.png",
    "/static/images/certificates/certificate-dom.png",
    "/static/images/certificates/certificate-bootstrap.png",
    "/static/images/certificates/SDB-1.png",
    "/static/images/certificates/SDB-2.png",
    "/static/images/certificates/SDB-3.png",
    "/static/images/certificates/SDB-4.png",
  ];

  return (
    <div className="mt-8 pt-4 md:pt-10">
      <div className="mb-4 flex items-end justify-center gap-2 md:justify-start">
        <p className="text-lg font-bold text-neutral-300 md:text-xl">
          Certifications <span className="text-base">\</span>
        </p>
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width="26"
          height="26"
          viewBox="0 0 256 256"
        >
          <g fill="#0ea5e9">
            <path
              d="M224 56v36.23a48 48 0 1 0-64 71.57V192H40a8 8 0 0 1-8-8V56a8 8 0 0 1 8-8h176a8 8 0 0 1 8 8"
              opacity=".2"
            />
            <path d="M248 128a56 56 0 1 0-96 39.14V224a8 8 0 0 0 11.58 7.16L192 216.94l28.42 14.22A8 8 0 0 0 232 224v-56.86A55.81 55.81 0 0 0 248 128m-56-40a40 40 0 1 1-40 40a40 40 0 0 1 40-40m3.58 112.84a8 8 0 0 0-7.16 0L168 211.06v-32.47a55.94 55.94 0 0 0 48 0v32.47ZM136 192a8 8 0 0 1-8 8H40a16 16 0 0 1-16-16V56a16 16 0 0 1 16-16h176a16 16 0 0 1 16 16a8 8 0 0 1-16 0H40v128h88a8 8 0 0 1 8 8m-16-56a8 8 0 0 1-8 8H72a8 8 0 0 1 0-16h40a8 8 0 0 1 8 8m0-32a8 8 0 0 1-8 8H72a8 8 0 0 1 0-16h40a8 8 0 0 1 8 8" />
          </g>
        </svg>
      </div>
      <Swiper
        effect={"cards"}
        grabCursor={true}
        initialSlide={images.length / 2}
        modules={[EffectCards]}
        className="max-w-[360px] opacity-90 md:float-left"
      >
        {images.map((image, i) => (
          <SwiperSlide className="rounded-lg" key={i}>
            <Image
              src={image}
              width={384}
              height={271}
              placeholder="blur"
              blurDataURL="/static/icons/blur.svg"
              className="select-none bg-neutral-800"
              alt=""
            />
          </SwiperSlide>
        ))}
      </Swiper>
    </div>
  );
}
