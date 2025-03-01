import React, { useState } from "react";
import { FaTrash, FaEdit } from "react-icons/fa";
import { MdErrorOutline } from "react-icons/md";

import Popup from "../Popup";
import { useDeleteProduct } from "../../utils/Api/ApiEndPoint";
import Loading from "../Loading";
import DeletePopup from "./ActionButtons/DeletePopup";
import UpdatePopup from "./ActionButtons/UpdatePopup";

const CustomerTable = ({ userData }) => {
  const [isDeletePopupOpen, setIsDeletePopupOpen] = useState(false);
  const [isUpdatePopupOpen, setIsUpdatePopupOpen] = useState(false);
  const [productInfo, setProductInfo] = useState({});

  const openDeletePopup = () => setIsDeletePopupOpen(true);
  const closeDeletePopup = () => setIsDeletePopupOpen(false);

  const openUpdatePopup = () => setIsUpdatePopupOpen(true);
  const closeUpdatePopup = () => setIsUpdatePopupOpen(false);

  const deletePopup = (userData) => {
    openDeletePopup();
    setProductInfo(userData);
  };

  const updatePopup = (userData) => {
    setProductInfo(userData);
    openUpdatePopup();
  };

  return (
    <div className="overflow-x-auto w-full">
      <table className="min-w-full bg-white border border-[#EEEEEE]">
        <thead className="text-start">
          <tr className="bg-white text-[#B5B7C0]">
            <th className="py-2 px-4 border-b">اسم الزبون</th>
            <th className="py-2 px-4 border-b"> رقم الهاتف</th>
            <th className="py-2 px-4 border-b">المكان</th>
            <th className="py-2 px-4 border-b">النوع</th>
            <th className="py-2 px-4 border-b">الحالة</th>
          </tr>
        </thead>
        <tbody>
          {userData?.map((product, idx) => (
            <tr key={idx} className="hover:bg-gray-50 text-center">
              <td className="py-2 flex justify-center px-4 border-b border-[#EEEEEE]">
                {/* <img
                  src={product?.imageCover}
                  alt={product?.name}
                  className="w-10 h-10 rounded"
                /> */}
              </td>
              <td className="py-2 px-4 border-b border-[#EEEEEE]">
                {userData?.firstName + userData?.lastName}
              </td>
              <td className="py-2 px-4 border-b border-[#EEEEEE]">
                {product?.brand?.name}
              </td>
              <td className="py-2 px-4 border-b border-[#EEEEEE]">
                ${product?.price}
              </td>
              <td className="py-2 px-4 border-b border-[#EEEEEE]">
                {product?.quantity}
              </td>
              <td className="py-2 px-4 border-b border-[#EEEEEE]">
                <div className="flex justify-center space-x-2">
                  <button
                    onClick={() => updatePopup(product)}
                    className="rounded-sm  bg-[rgba(0,172,79,0.12)] p-2 text-[#00AC4F] hover:text-blue-700"
                  >
                    <FaEdit size={18} />
                  </button>
                  <button
                    onClick={() => deletePopup(product)}
                    className="text-red-500 p-2 rounded-sm bg-[rgba(223,4,4,0.12)] hover:text-red-700"
                  >
                    <FaTrash size={18} />
                  </button>
                </div>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
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

export default CustomerTable;
