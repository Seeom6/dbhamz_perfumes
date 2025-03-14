import React, { useState } from "react";
import { FaTrash, FaEdit, FaTag, FaBox, FaInfoCircle } from "react-icons/fa";
import Popup from "../Popup";
import DeletePopup from "./ActionButtons/DeletePopup";
import UpdatePopup from "./ActionButtons/UpdatePopup";

const ProductTable = ({ products }) => {
  const [isDeletePopupOpen, setIsDeletePopupOpen] = useState(false);
  const [isUpdatePopupOpen, setIsUpdatePopupOpen] = useState(false);
  const [productInfo, setProductInfo] = useState({});

  const openDeletePopup = () => setIsDeletePopupOpen(true);
  const closeDeletePopup = () => setIsDeletePopupOpen(false);

  const openUpdatePopup = () => setIsUpdatePopupOpen(true);
  const closeUpdatePopup = () => setIsUpdatePopupOpen(false);

  const deletePopup = (product) => {
    openDeletePopup();
    setProductInfo(product);
  };

  const updatePopup = (product) => {
    setProductInfo(product);
    openUpdatePopup();
  };

  return (
    <div className="w-full">
      {/* Product List */}
      <div className="flex flex-col gap-6 p-4">
        {products?.map((product, idx) => (
          <div
            key={idx}
            className="bg-gradient-to-r from-white to-[#f9f9f9] rounded-xl shadow-lg hover:shadow-xl transition-shadow border border-[#EEEEEE] p-6"
          >
            {/* Product Image and Details */}
            <div className="flex flex-col md:flex-row gap-6">
              {/* Product Image */}
              <div className="w-full md:w-56 h-56 overflow-hidden rounded-lg">
                <img
                  src={product?.imageCover}
                  alt={product?.name}
                  className="w-full h-full object-cover"
                />
              </div>

              {/* Product Details */}
              <div className="flex-1 flex flex-col gap-4">
                <h3 className="text-2xl font-bold text-[#333333]">
                  {product?.name}
                </h3>

                {/* Brand */}
                <div className="flex items-center gap-2">
                  <FaInfoCircle className="text-[#666666]" />
                  <p className="text-sm text-[#666666]">
                    الماركة: {product?.brand?.name}
                  </p>
                </div>

                {/* Price and Discount */}
                <div className="flex items-center gap-2">
                  <FaTag className="text-[#00AC4F]" />
                  <span className="text-lg font-bold text-[#00AC4F]">
                    السعر بعد الخصم: {product?.priceAfterDiscount} KWD
                  </span>
                  {product?.priceAfterDiscount && (
                    <span className="text-sm text-[#999999] line-through">
                      السعر : {product?.price} KWD
                    </span>
                  )}
                </div>

                {/* Quantity */}
                <div className="flex items-center gap-2">
                  <FaBox
                    className={`${
                      product?.quantity === -1 ? "text-red-500" : "text-[#00AC4F]"
                    }`}
                  />
                  <p className="text-sm text-[#666666]">
                    الكمية:{" "}
                    <span
                      className={`font-semibold ${
                        product?.quantity === -1 ? "text-red-500" : "text-[#00AC4F]"
                      }`}
                    >
                      {product?.quantity === -1 ? "غير متوفر" : "متوفر"}
                    </span>
                  </p>
                </div>

                {/* Package Sizes */}
                <div className="flex items-center gap-2">
                  <FaBox className="text-[#666666]" />
                  <p className="text-sm text-[#666666]">
                    الأحجام المتوفرة:{" "}
                    <span className="font-semibold">
                      {product?.packageSize?.join(" مل, ")} مل
                    </span>
                  </p>
                </div>
              </div>
            </div>

            {/* Action Buttons */}
            <div className="flex justify-end gap-4 mt-6 border-t border-[#EEEEEE] pt-6">
              {/* Update Button */}
              <button
                onClick={() => updatePopup(product)}
                className="flex items-center gap-2 bg-[#00AC4F] text-white px-4 py-2 rounded-lg hover:bg-[#008a3e] transition-all transform hover:scale-105"
              >
                <FaEdit size={18} />
                <span className="font-semibold">تعديل</span>
              </button>

              {/* Delete Button */}
              <button
                onClick={() => deletePopup(product)}
                className="flex items-center gap-2 bg-red-500 text-white px-4 py-2 rounded-lg hover:bg-red-600 transition-all transform hover:scale-105"
              >
                <FaTrash size={18} />
                <span className="font-semibold">حذف</span>
              </button>
            </div>
          </div>
        ))}
      </div>

      {/* Popups */}
      <DeletePopup
        product={productInfo}
        isPopupOpen={isDeletePopupOpen}
        closePopup={closeDeletePopup}
      />
      <UpdatePopup
        product={productInfo}
        closePopup={closeUpdatePopup}
        isPopupOpen={isUpdatePopupOpen}
      />
    </div>
  );
};

export default ProductTable;