import React, { useContext, useEffect, useState } from "react";
import perfume6 from "/assets/perfume6.png";
import { FiPlus, FiMinus } from "react-icons/fi";
import { LuShoppingBag } from "react-icons/lu";
import { useAddCart, useUpdateCartQuantity } from "../../utils/Api/CartEndPoint";
import { toast } from "react-toastify";
import { CurrencyContext } from './../../context/CurrencyContext';
import {convertCurrency} from "../../utils/currency.js"

const ProductInfo = ({ data }) => {


  const { currency } = useContext(CurrencyContext);
  const convertedPrice = convertCurrency(data?.price, "KWD", currency);

  const [currentImage, setCurrentImage] = useState(data?.imageCover);
  const [quantityData , setQuantity] = useState(1)
  const {
    mutate: addToCart,
    error: CartError,
    isPending: cartPending,
  } = useAddCart();


  const onDecrement = ()=>{
    if (quantityData > 1) {
      setQuantity(quantityData - 1 );
    }
  }
  const onIncrement = ()=>{
    setQuantity(quantityData + 1)
  }

  const handleImgClick = (img) => {
    setCurrentImage(img);
  };

  const sendToCart = (productId , quantity)=>{
    addToCart({productId , quantity},{
      onSuccess : ()=>{
        toast.success("تم أضافة المنتج للسلة")
      },
      onError: ()=>{
        toast.error(CartError.error)
      }
    })
  }
  useEffect(()=>{
    setCurrentImage(data?.imageCover)
  },[data?.imageCover])
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
              <div className="max-w-full w-full flex  gap-2">
                {data?.images?.map((img, idx) => (
                  <img
                    onClick={() => handleImgClick(img)}
                    key={idx}
                    className="w-full h-16 md:h-24 object-cover rounded-lg"
                    src={img}
                    alt=""
                  />
                ))}
              </div>
            </div>
          </div>
          <div className="w-full">
            <p className="text-2xl font-semibold"> {data?.name}</p>
            <p className="text-2xl font-medium text-primary">{convertedPrice} {currency}</p>
            <p className="text-regular text-ford w-full p-2 md:leading-7">
              {data?.description}
            </p>
            <div className="w-full flex flex-col gap-2 justify-center">
              <div className="w-full flex gap-2">
                <label htmlFor="items"> الأحجام المتوفرة:  </label>
                {
                  data?.packageSize.map((items , idx)=>(

                    <p key={idx}>[{items} مل],</p>
                  ))
                }
              </div>
              <div className="w-full flex gap-3">
                <p> السعر الكلي: </p>
                <p>{data?.price}</p>
              </div>

              <div className="w-full flex items-center justify-center">
                <button onClick={()=>sendToCart(data?._id , quantityData)} className="px-8 shadow-btn my-2 text-white bg-primary font-bold py-0.5 rounded-md flex justify-center items-center gap-2 ">
                  <LuShoppingBag />
                  اضافة الى السلة
                </button>
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
