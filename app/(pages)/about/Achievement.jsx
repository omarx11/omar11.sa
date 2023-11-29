"use client";
import { Swiper, SwiperSlide } from "swiper/react";
import { EffectCards } from "swiper/modules";
import Image from "next/image";
import "swiper/css";
import "swiper/css/effect-cards";

export default function Achievement() {
  const trophies = [
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
    <div className="mt-8 pt-10">
      <h2 className="pb-4 text-xl font-bold text-neutral-400 md:text-2xl">
        # Certifications 🏅
      </h2>
      <Swiper
        effect={"cards"}
        grabCursor={true}
        modules={[EffectCards]}
        className="max-w-[360px] border border-neutral-500 opacity-90 md:float-left"
      >
        {trophies.map((image, i) => (
          <SwiperSlide className="rounded-lg" key={i}>
            <Image
              src={image}
              width={384}
              height={271}
              placeholder="blur"
              blurDataURL="/static/icons/blur.svg"
              className="bg-neutral-800"
              alt=""
            />
          </SwiperSlide>
        ))}
      </Swiper>
    </div>
  );
}
