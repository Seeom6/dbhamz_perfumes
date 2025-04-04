import React, { useState } from "react";
import { FaTrash, FaEdit } from "react-icons/fa";
import UpdatePopup from "./ActionButtons/UpdatePopup";
import DeleteBrandPopup from "./ActionButtons/DeleteBrandPopup";
import UpdateBrandPopup from "./ActionButtons/UpdateBrandPopup";

const BrandTable = ({ brands }) => {

  const [isDeletePopupOpen, setIsDeletePopupOpen] = useState(false);
  const [isUpdatePopupOpen, setIsUpdatePopupOpen] = useState(false);
  const [brandInfo, setBrandInfo] = useState({});

  const openDeletePopup = () => setIsDeletePopupOpen(true);
  const closeDeletePopup = () => setIsDeletePopupOpen(false);

  const openUpdatePopup = () => setIsUpdatePopupOpen(true);
  const closeUpdatePopup = () => setIsUpdatePopupOpen(false);

  const deletePopup = (brand) => {
    openDeletePopup();
    setBrandInfo(brand);
  };

  const updatePopup = (brand) => {
    setBrandInfo(brand);
    openUpdatePopup();
  };

  return (
    <div className="overflow-x-auto w-full">
      <table className="min-w-full bg-white border border-[#EEEEEE]">
        <thead className="text-start">
          <tr className="bg-white text-[#B5B7C0]">
            <th className="py-2 px-4 border-b">صورة الماركة</th>
            <th className="py-2 px-4 border-b">اسم الماركة</th>
            <th className="py-2 px-4 border-b">الحالة</th>
          </tr>
        </thead>
        <tbody>
          {brands?.map((brand, idx) => (
            <tr key={idx} className="hover:bg-gray-50 text-center">
              <td className="py-2 flex justify-center px-4 border-b border-[#EEEEEE]">
                <img
                  src={brand?.image}
                  alt={brand?.name}
                  className="w-10 h-10 rounded"
                />
              </td>
              <td className="py-2 px-4 border-b border-[#EEEEEE]">
                {brand?.name}
              </td>
              <td className="py-2 px-4 border-b border-[#EEEEEE]">
                <div className="flex justify-center space-x-2">
                  <button
                    onClick={() => updatePopup(brand)}
                    className="rounded-sm  bg-[rgba(0,172,79,0.12)] p-2 text-[#00AC4F] hover:text-blue-700"
                  >
                    <FaEdit size={18} />
                  </button>
                  <button
                    onClick={() => deletePopup(brand)}
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
      <DeleteBrandPopup
        brand={brandInfo}
        isPopupOpen={isDeletePopupOpen}
        closePopup={closeDeletePopup}
      />
      <UpdateBrandPopup
        brand={brandInfo}
        closePopup={closeUpdatePopup}
        isPopupOpen={isUpdatePopupOpen}
      />
    </div>
  );
};

export default BrandTable;
