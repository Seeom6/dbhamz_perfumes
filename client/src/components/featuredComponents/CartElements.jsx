import React, { useContext } from "react";
import { FaTrash } from "react-icons/fa";
import { FiMinus, FiPlus } from "react-icons/fi";
import { convertCurrency } from "../../utils/currency";
import { Context } from "../../context/StatContext";

const CartElements = ({ data, onRemove, toggleCartItemQuantity}) => {
  const { currency } = useContext(Context);
  const convertedPrice = convertCurrency(data?.price, "KWD", currency);
  return (
    <div className="flex flex-col sm:flex-row items-center w-full justify-between p-4 border-b border-gray-200 shadow-sm shadow-primary sm:gap-5">
      <div className="flex justify-between w-full md:w-fit items-center space-x-4">
        <img
          src={
            data?.product?.imageCover
              ? data?.product?.imageCover
              : data.imageCover
          }
          alt={data.name}
          className="w-20 h-20 object-cover rounded-lg"
        />
        <div>
          <h3 className="text-small md:text-large font-semibold">
            {data?.product?.name ? data?.product?.name : data.name}
          </h3>
          <p className="text-sm text-gray-600">
            {convertedPrice} {currency}
          </p>
        </div>
      </div>
      <div className="flex items-center space-x-4 mt-4 sm:mt-0">
        <button
          onClick={()=>toggleCartItemQuantity(data._id , "dec")}
          className="p-2 border border-primary text-primary rounded-full hover:bg-gray-100"
        >
          <FiMinus className="text-lg" />
        </button>
        <span className="text-lg">{data.quantity}</span>
        <button
          onClick={()=>toggleCartItemQuantity(data._id , "inc")}
          className="p-2 bg-primary text-white f border border-gray-300 rounded-full hover:bg-gray-100 "
        >
          <FiPlus className="text-lg" />
        </button>

        <button onClick={()=>onRemove(data)} className="text-red-500 hover:text-red-700">
          <FaTrash />
        </button>
      </div>
    </div>
  );
};

export default CartElements;
