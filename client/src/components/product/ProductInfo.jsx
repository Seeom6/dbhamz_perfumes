import React, { useContext, useEffect, useState } from "react";
import perfume6 from "/assets/perfume6.png";
import { FiPlus, FiMinus } from "react-icons/fi";
import { LuShoppingBag } from "react-icons/lu";
import { useAddCart } from "../../utils/Api/CartEndPoint";
import { toast } from "react-toastify";
import { convertCurrency } from "../../utils/currency.js";
import { Context } from "../../context/StatContext.jsx";

const ProductInfo = ({ data }) => {
  const { currency, incQty, decQty , qty , onAdd} = useContext(Context);
  const convertedPrice = convertCurrency(data?.price, "KWD", currency);

  const [currentImage, setCurrentImage] = useState(data?.imageCover);


  const handleImgClick = (img) => {
    setCurrentImage(img);
  };

  useEffect(() => {
    setCurrentImage(data?.imageCover);
  }, [data?.imageCover]);
  return (
    <div className="w-full flex justify-center items-center">
      <div className="max-w-[1260px] w-full px-2.5 flex flex-col justify-center gap-8 sm:gap-14 md:gap-20 mb-5">
        <div className="w-full flex flex-col lg:flex-row gap-6 h-auto bg-fifed p-4 rounded-lg">
          <div className="w-full flex flex-col items-start relative gap-2">
            <p className="text-2xl font-bold text-primary">
              {data?.brand?.name}
            </p>
            <div className="w-full flex flex-col gap-4">
              <img
                className="w-full md:h-96 object-cover rounded-lg"
                src={currentImage}
                alt=""
              />
              <div className="grid grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-2">
      {data?.images?.map((img, idx) => (
        <img
          onClick={() => handleImgClick(img)}
          key={idx}
          className="w-full h-24 md:h-32 object-cover rounded-lg cursor-pointer hover:opacity-80 transition-opacity"
          src={img}
          alt={`Product Thumbnail ${idx + 1}`}
        />
      ))}
    </div>
            </div>
          </div>
          <div className="w-full">
            <p className="text-2xl font-semibold"> {data?.name}</p>
            <p className="text-2xl font-medium text-primary">
              {convertedPrice} {currency}
            </p>
            <p className="text-regular text-ford w-full p-2 md:leading-7">
              {data?.description}
            </p>
            <div className="w-full flex flex-col gap-2 justify-center">
              <div className="w-full flex gap-2">
                <label htmlFor="items"> الأحجام المتوفرة: </label>
                {data?.packageSize.map((items, idx) => (
                  <p key={idx}>[{items} مل],</p>
                ))}
              </div>
              <div className="flex items-center space-x-4 mt-4 sm:mt-0">
                <button
                  onClick={decQty}
                  className="p-2 border border-primary text-primary rounded-full hover:bg-gray-100"
                >
                  <FiMinus className="text-lg" />
                </button>
                <span className="text-lg">{qty}</span>
                <button
                  onClick={incQty}
                  className="p-2 bg-primary text-white f border border-gray-300 rounded-full hover:bg-gray-100 "
                >
                  <FiPlus className="text-lg" />
                </button>
              </div>
              <div className="w-full flex items-center justify-center">
               {
                data?.quantity >= 0 ? <button
                  onClick={() => onAdd(data, qty)}
                  className="px-8 shadow-btn my-2 text-white bg-primary font-bold py-0.5 rounded-md flex justify-center items-center gap-2 "
                >
                  <LuShoppingBag />
                  اضافة الى السلة
                  </button> : <p className="text-small text-red-400 w-full bg-fifed text-center">غير متوفر</p>
               } 
              </div>
            </div>
          </div>
        </div>
        <div></div>
      </div>
    </div>
  );
};

export default ProductInfo;
