import React from "react";
import { Navigation } from "swiper/modules";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import "swiper/css/navigation";

export default function TopContent() {
  return (
    <>
      <Swiper
        navigation={true}
        modules={[Navigation]}
        className="mySwiper flex justify-center h-[30rem]"
      >
        <SwiperSlide>
          <div className="relative w-full h-full">
            <img
              className="w-full h-full object-cover"
              src="/images/swiper/tamanna-rumee-mIqyYpSNq3o-unsplash.jpg"
              alt="Background"
            />
            <h1 className="absolute top-0 left-0 w-full h-full flex items-center justify-center text-white text-4xl">
              全館半價優惠
            </h1>
          </div>
        </SwiperSlide>
        <SwiperSlide>
          <div className="relative w-full h-full">
            <img
              className="w-full h-full object-cover"
              src="/images/swiper/arno-senoner-UhvEJosq-Zo-unsplash.jpg"
              alt="Background"
            />
            <h1 className="absolute top-10 right-10 mb-4 mr-4 text-white text-4xl bg-blue-900 p-3">
              歡迎選購
            </h1>
          </div>
        </SwiperSlide>
      </Swiper>
    </>
  );
}
