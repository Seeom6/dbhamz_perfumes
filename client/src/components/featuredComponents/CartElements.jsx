import React, { useState } from "react";
import { FaTrash } from "react-icons/fa";
import { FiMinus, FiPlus } from "react-icons/fi";

const CartElements = ({ data, onDelete, onIncrement, onDecrement, isMobile }) => {
  const [applyQuantity, setApplyQuantity] = useState(data?.quantity);

  const handleIncrement = (productId) => {
    const newQuantity = applyQuantity + 1;
    setApplyQuantity(newQuantity);
    onIncrement(productId, newQuantity);
  };

  const handleDecrement = (productId) => {
    const newQuantity = applyQuantity - 1;
    if (newQuantity >= 0) {
      setApplyQuantity(newQuantity);
      onDecrement(productId, newQuantity);
    }
  };
  if (isMobile) {
    return (
      <div className="w-full bg-fifed rounded-lg p-4 shadow-sm">
        <div className="flex flex-col gap-4">
          {/* Product */}
          <div className="flex items-center gap-3">
            <img
              className="w-16 h-16 rounded-lg object-cover"
              src={data?.product?.imageCover}
              alt={data?.product?.name}
            />
            <div>
              <p className="text-lg font-bold">{data?.product?.name}</p>
              <p className="text-gray-600">${data?.product?.price}</p>
            </div>
          </div>

          {/* Quantity */}
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <button
                onClick={() => handleDecrement(data?._id)}
                className={`p-2 bg-white border border-primary rounded-full hover:bg-primary hover:text-white transition-all ${
                  applyQuantity === 1 ? "opacity-50 cursor-not-allowed" : ""
                }`}
                disabled={applyQuantity === 1}
              >
                <FiMinus className="w-4 h-4" />
              </button>
              <p className="text-lg font-bold">{applyQuantity}</p>
              <button
                onClick={() => handleIncrement(data?._id)}
                className="p-2 bg-primary text-white rounded-full hover:bg-white hover:border hover:border-primary hover:text-primary transition-all"
              >
                <FiPlus className="w-4 h-4" />
              </button>
            </div>
            <p className="text-lg font-bold">${applyQuantity ? data?.price * applyQuantity : data?.price}</p>
          </div>

          {/* Action (Delete) */}
          <div className="w-full flex justify-center ">

          <button
            onClick={() => onDelete(data?._id)}
            className="button-class bg-red-500 w-3/5 gap-3 flex justify-center items-center"
          >
              <FaTrash color="white" size={14} />
              <span>حذف</span>
          </button>
          </div>
        </div>
      </div>
    );
  }

  return (
    <tr className="border-b border-gray-300">
      {/* Product */}
      <td className="py-4">
        <div className="flex items-center flex-col md:flex-row gap-3">
          <img
            className="w-16 h-16 rounded-lg object-cover"
            src={data?.product?.imageCover}
            alt={data?.product?.name}
          />
          <p className="text-lg font-bold">{data?.product?.name}</p>
        </div>
      </td>

      {/* Price */}
      <td className="py-4 text-lg font-bold">${data?.product?.price}</td>

      {/* Quantity */}
      <td className="py-4">
        <div className="flex items-center gap-3">
          <button
            onClick={() => handleDecrement(data?._id)}
            className={`p-2 bg-white border border-primary rounded-full hover:bg-primary hover:text-white transition-all ${
              applyQuantity === 1 ? "opacity-50 cursor-not-allowed" : ""
            }`}
            disabled={applyQuantity === 1}
          >
            <FiMinus className="w-4 h-4" />
          </button>
          <p className="text-lg font-bold">{applyQuantity}</p>
          <button
            onClick={() => handleIncrement(data?._id)}
            className="p-2 bg-primary text-white rounded-full hover:bg-white hover:border hover:border-primary hover:text-primary transition-all"
          >
            <FiPlus className="w-4 h-4" />
          </button>
        </div>
      </td>

      {/* Subtotal */}
      <td className="py-4 text-lg font-bold">${applyQuantity ? data?.price * applyQuantity : data?.price}</td>

      {/* Action (Delete) */}
      <td className="py-4">
        <button
          onClick={() => onDelete(data?._id)}
          className="p-2 text-white bg-[rgba(223,4,4,0.12)] rounded-sm hover:bg-red-600 transition-all"
        >
              <FaTrash size={18} color="red"/>
        </button>
      </td>
    </tr>
  );
};

export default CartElements;