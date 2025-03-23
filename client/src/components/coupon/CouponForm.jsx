import React from "react";
import Select from "react-select";

const CouponForm = ({
  couponCode,
  setCouponCode,
  discountPercentage,
  setDiscountPercentage,
  expirationDate,
  setExpirationDate,
  selectedGiftMethod,
  handlePackageSizeChange,
  couponOptions,
  error,
  handleAddCoupon,
}) => {
  return (
    <div className="bg-white p-6 rounded-lg shadow-md mb-6">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div>
          <label className="block text-sm font-medium text-gray-700">
            كوبون الخصم
          </label>
          <input
            type="text"
            value={couponCode}
            onChange={(e) => setCouponCode(e.target.value)}
            placeholder="اُدخل اسم الكوبون الذي تريد اُنشائه"
            className="mt-1 block w-full p-2 border border-gray-300 rounded-md"
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700">
            نسبة خصم الكوبون
          </label>
          <input
            type="number"
            value={discountPercentage}
            onChange={(e) => setDiscountPercentage(e.target.value)}
            placeholder="اُدخل نسبة الخصم"
            className="mt-1 block w-full p-2 border border-gray-300 rounded-md"
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700">
            تاريخ الانتهاء
          </label>
          <input
            dir="ltr"
            type="date"
            value={expirationDate}
            onChange={(e) => setExpirationDate(e.target.value)}
            className="mt-1 block w-full p-2 border border-gray-300 rounded-md"
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700">
            الخصم{" "}
          </label>
          <Select
          dir="rtl"
            options={couponOptions}
            value={selectedGiftMethod}
            onChange={handlePackageSizeChange}
            placeholder="اختر طريقة الخصم"
            className="w-full"
          />
        </div>
      </div>

      {error && <p className="text-red-500 text-sm mt-2">{error}</p>}

      <button
        onClick={handleAddCoupon}
        className="mt-4 w-full bg-blue-500 text-white py-2 px-4 rounded-md hover:bg-blue-600 transition-colors"
      >
        حفظ
      </button>
    </div>
  );
};

export default CouponForm;
