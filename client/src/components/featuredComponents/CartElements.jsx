import React from "react";
import { FaTrash } from "react-icons/fa";
import { FiMinus, FiPlus } from "react-icons/fi";

const CartElements = ({ data, onDelete, onIncrement, onDecrement }) => {
  return (
    <div className="flex flex-col sm:flex-row items-center justify-between p-4 border-b border-gray-200">
      <div className="flex items-center space-x-4">
        <img
          src={data.imageCover}
          alt={data.name}
          className="w-20 h-20 object-cover rounded-lg"
        />
        <div>
          <h3 className="text-lg font-semibold">{data.name}</h3>
          <p className="text-sm text-gray-600">${data.price.toFixed(2)}</p>
        </div>
      </div>
      <div className="flex items-center space-x-4 mt-4 sm:mt-0">
        <button
          onClick={onDecrement}
          className="p-2 border border-gray-300 rounded-lg hover:bg-gray-100"
        >
          <FiMinus />
        </button>
        <span className="text-lg">{data.quantity}</span>
        <button
          onClick={onIncrement}
          className="p-2 border border-gray-300 rounded-lg hover:bg-gray-100"
        >
          <FiPlus />
        </button>
        <button
          onClick={onDelete}
          className="text-red-500 hover:text-red-700"
        >
          <FaTrash />
        </button>
      </div>
    </div>
  );
};

export default CartElements;