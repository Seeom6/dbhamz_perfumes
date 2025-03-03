import { Swiper, SwiperSlide, useSwiper } from "swiper/react";
import {
  A11y,
  Controller,
  Navigation,
  Pagination,
  Scrollbar,
} from "swiper/modules";
import "swiper/swiper-bundle.css";
import 'swiper/css/navigation';
import { offersInfo } from "./../utils/data.jsx";

const MySwiper = () => {
  const swiper = useSwiper();

  return (
    <Swiper
    className=" m-0 max-h-[175px] lg:max-h-[388px] h-full w-full rounded-3xl flex justify-center items-center"
      modules={[Navigation, Pagination, Scrollbar, A11y]}
      navigation={{
        nextEl: ".swiper-button-next",
        prevEl: ".swiper-button-prev",
      }}
      pagination={{ clickable: true }}
      scrollbar={{ draggable: true }}
      spaceBetween={50}
      slidesPerView={1}
      autoplay={{ delay: 2000 }}
    >
      {offersInfo.map((item , idx) => {
        return (
          <SwiperSlide key={idx} >
            <img className="rounded-3xl w-full" src={item.image} alt="" />
          </SwiperSlide>
        );
      })}
      <div onClick={() => swiper.slideNext()} className="swiper-button-next p-6 rounded-full bg-gray-300"></div>
      <div className="swiper-button-prev p-6 rounded-full bg-gray-300"></div>
    </Swiper>
  );
};

export default MySwiper;
