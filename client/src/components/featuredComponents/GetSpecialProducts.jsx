import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/swiper-bundle.css";
import {
  A11y,
  Controller,
  Navigation,
  Pagination,
  Scrollbar,
} from "swiper/modules";
import { LuShoppingBag } from "react-icons/lu";


const GetSpecialProducts = ({data}) => {
  return (
    <Swiper
    modules={[Navigation, Scrollbar, A11y]}
    scrollbar={{ draggable: true }}

      className=" m-0 max-h-[5000px] h-fit w-full  flex justify-center items-center"
      breakpoints={{
        340: {
          slidesPerView: 2,
          spaceBetween: 10,
        },
        540: {
          slidesPerView: 3,
          spaceBetween: 15,
        },
        1200: {
          slidesPerView: 5,
          spaceBetween: 15,
        },
      }}
      autoplay={{ delay: 2000 }}
    >
      {data.map((item, idx) => {
        return (
          <SwiperSlide key={idx} className="w-[230px] p-2 rounded-lg bg-[#f5f5f5] h-36 md:h-[400px] flex gap-3 p-">
            <div className="w-full py-1">
              <img className="rounded-lg w-full h-full object-cover" src={item.img} alt="" />
            </div>
            <div>
                <p className="text-regular text-ford font-semibold">{item.brandName}</p>
                <p className="text-large text-[#616161] font-semibold">{item.perfumeName}</p>
                <div className="flex gap-1">
                    <p className="text-medium text-primary">{item.price}</p>
                    <p className="text-medium text-primary">{item.paymentCurrency}</p>
                </div>
                <button className="w-full my-2 bg-primary text-white font-bold py-1 rounded-md flex justify-center text-regular items-center gap-2">
                <LuShoppingBag className="font-bold"/>
                اضافة الى السلة
                </button>
            </div>
          </SwiperSlide>
        );
      })}
    </Swiper>
  );
};

export default GetSpecialProducts;
