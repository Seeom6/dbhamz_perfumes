import { Swiper, SwiperSlide } from "swiper/react";
import { LuShoppingBag } from "react-icons/lu";
import { useNavigate } from "react-router-dom";

const Products = ({ data }) => {


  const navigation = useNavigate();
  const handleClick = (id) => {
    navigation(`/products/${id}`);
  };


  return (
    <Swiper
      className=" m-0 max-h-fit w-full flex justify-center items-center"
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
      pagination={{ clickable: true }}
      autoplay={{ delay: 2000 }}
    >
      {data.map((item, idx) => {
        return (
          <SwiperSlide
            onClick={() => { handleClick(item?._id)}}
            key={idx}
            className="w-[230px] p-2 rounded-lg bg-[#f5f5f5] h-fit md:h-[400px] flex gap-3 p-"
          >
            <div className="w-full py-1">
              <img
                className="rounded-lg w-full h-full object-cover"
                src={item.imageCover}
                alt=""
              />
            </div>
            <div>
              <p className="text-regular text-ford font-semibold">
                {item.brand?.name}
              </p>
              <p className="text-large text-[#616161] font-semibold">
                {item.name}
              </p>
              <div className="flex gap-1">
                <p className="text-medium text-primary">{item.price}</p>
                <p className="text-medium text-primary">
                  {item.paymentCurrency}
                </p>
              </div>
              <button className="w-full shadow-btn my-2 bg-white text-primary font-bold py-0.5 rounded-md flex justify-center items-center gap-2 border-2">
                <LuShoppingBag />
                اضافة الى السلة
              </button>
            </div>
          </SwiperSlide>
        );
      })}
    </Swiper>
  );
};

export default Products;
