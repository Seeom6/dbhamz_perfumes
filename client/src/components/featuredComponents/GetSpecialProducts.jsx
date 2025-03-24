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
import { useContext } from "react";
import { Context } from "../../context/StatContext";
import { convertCurrency } from "../../utils/currency";

const GetSpecialProducts = ({ data }) => {

  const { currency, isAddCartLoading, onAdd } = useContext(Context);
  const convertedPrice = convertCurrency(data?.price, "KWD", currency);
  const convertedPriceAfterDiscount = convertCurrency(
    data?.priceAfterDiscount,
    "KWD",
    currency
  );

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
      {data.map((product, idx) => {
          const { currency, isAddCartLoading, onAdd } = useContext(Context);
          const convertedPrice = convertCurrency(product?.price, "KWD", currency);
          const convertedPriceAfterDiscount = convertCurrency(
            product?.priceAfterDiscount,
            "KWD",
            currency
          );
        
        return (
          <SwiperSlide
            key={idx}
            className="w-[230px] p-2 rounded-lg bg-[#f5f5f5] h-36 md:h-[400px] flex gap-3 p-"
          >
            <div className="shadow-regularShadow flex items-center flex-col justify-between p-2 rounded-lg">
              <div onClick={() => handleClick(product?._id)}>
                <div className="w-full py-1">
                  <img
                    className="rounded-lg w-full bg-white shadow-xl h-full object-cover"
                    src={product?.imageCover}
                    alt=""
                  />
                </div>
                <div>
                  <p className="text-regular text-ford font-semibold">
                    {product?.brand?.name}
                  </p>
                  <p className="text-small md:text-medium text-[#616161] font-semibold">
                    {product?.name}
                  </p>
                  <div className="flex gap-1">
                    {/* Display price with or without discount */}
                    {product?.priceAfterDiscount ? (
                      <div className="flex flex-col">
                        <p className="text-medium text-red-500 line-through">
                          {convertedPrice} {currency}
                        </p>
                        <p className="text-medium text-primary">
                          {convertedPriceAfterDiscount} {currency}
                        </p>
                      </div>
                    ) : (
                      <p className="text-medium text-primary">
                        {convertedPrice} {currency}
                      </p>
                    )}
                  </div>
                </div>
              </div>
              <div className="w-full flex text-extraSmall gap-1">
                <label htmlFor="items"> الأحجام المتوفرة: </label>
                {product?.packageSize.map((items, idx) => (
                  <p key={idx}>{items},</p>
                ))}
              </div>
              {isAddCartLoading ? (
                <Loading width="15" height="15" />
              ) : product?.quantity >= 0 ? (
                <button
                  onClick={() => onAdd(product, 1)}
                  className="w-full text-small md:text-medium shadow-btn my-2 text-white bg-primary font-bold py-2 rounded-md flex justify-center items-center gap-2 border"
                >
                  <LuShoppingBag /> اضافة الى السلة
                </button>
              ) : (
                <p className="w-full text-center my-2 text-sm text-red-500 bg-red-50 py-2 rounded-md">
                  غير متوفر
                </p>
              )}
            </div>
          </SwiperSlide>
        );
      })}
    </Swiper>
  );
};

export default GetSpecialProducts;
