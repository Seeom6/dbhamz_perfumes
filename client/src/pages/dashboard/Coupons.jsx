import React, { useState } from "react";
import {
  useCreateCoupon,
  useGetCoupon,
  useDeleteCoupon,
} from "../../utils/Api/CartEndPoint";
import { toast } from "react-toastify";
import { useQueryClient } from "@tanstack/react-query";
import Select from "react-select";

const Coupons = () => {
  const [couponCode, setCouponCode] = useState("");
  const [discountPercentage, setDiscountPercentage] = useState("");
  const [expirationDate, setExpirationDate] = useState("");
  const [error, setError] = useState("");
  const [userIdToGift, setUserIdToGift] = useState(""); // State for user ID to gift the coupon
  const [selectedGiftMethod, setSelectedGiftMethod] = useState(null); // State for selected gift method (single option)

  const couponOpt = ["شحن مجاناً", "نسبة خصم"]; // Available gift methods
  const queryClient = useQueryClient();

  const {
    data: coupons,
    isLoading,
    isError,
    error: getCouponError,
  } = useGetCoupon();
  const { mutate: createCoupon } = useCreateCoupon();
  const { mutate: deleteCoupon } = useDeleteCoupon();

  // Handle adding a coupon
  const handleAddCoupon = async (e) => {
    e.preventDefault();
    if (!couponCode || !discountPercentage || !expirationDate) {
      setError("Please fill in all fields.");
      return;
    }
    if (
      isNaN(discountPercentage) ||
      discountPercentage < 1 ||
      discountPercentage > 100
    ) {
      setError("Discount percentage must be a number between 1 and 100.");
      return;
    }

    // Prepare form data
    const formData = {
      name: couponCode,
      discount: parseFloat(discountPercentage),
      expired: expirationDate,
      giftMethod: selectedGiftMethod ? selectedGiftMethod.value : null, // Include selected gift method
    };

    // Create coupon
    createCoupon(formData, {
      onSuccess: () => {
        queryClient.invalidateQueries(["coupons"]);
        setCouponCode("");
        setDiscountPercentage("");
        setExpirationDate("");
        setSelectedGiftMethod(null); // Reset selected gift method
        setError("");
        toast.success("تم أنشاء الكوبون");
      },
      onError: (error) => {
        setError(error.message || "Failed to create coupon");
      },
    });
  };

  // Handle gift method selection
  const handlePackageSizeChange = (selectedOption) => {
    setSelectedGiftMethod(selectedOption); // Update selected gift method
  };

  // Map coupon options for the Select component
  const couponOptions = couponOpt.map((size) => ({
    value: size,
    label: `${size}`,
  }));

  // Handle deleting a coupon
  const handleDeleteCoupon = async (id) => {
    deleteCoupon(id, {
      onSuccess: () => {
        queryClient.invalidateQueries(["coupons"]);
        toast.success("تم حذف الكوبون بنجاح");
      },
      onError: (error) => {
        toast.error(error.message || "خطأ اثناء حذف الكوبون");
      },
    });
  };

  return (
    <div className="p-2 md:p-4 bg-gray-100 min-h-screen">
      <div className="w-full md:max-w-4xl mx-auto">
        <h1 className="text-2xl font-bold mb-6 text-center"> اُنشاء الكوبون</h1>

        {/* Coupon Input Form */}
        <div className="bg-white p-6 rounded-lg shadow-md mb-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {/* Coupon Code Input */}
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

            {/* Discount Percentage Input */}
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

            {/* Expiration Date Input */}
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

            {/* Gift Methods Dropdown */}
            <div>
              <label className="block text-sm font-medium text-gray-700">
                طرق الأهداء
              </label>
              <Select
                options={couponOptions}
                value={selectedGiftMethod}
                onChange={handlePackageSizeChange}
                placeholder="اختر طريقة الأهداء"
                className="w-full"
              />
            </div>
          </div>

          {/* Error Message */}
          {error && <p className="text-red-500 text-sm mt-2">{error}</p>}

          {/* Add Coupon Button */}
          <button
            onClick={handleAddCoupon}
            className="mt-4 w-full bg-blue-500 text-white py-2 px-4 rounded-md hover:bg-blue-600 transition-colors"
          >
            حفظ
          </button>
        </div>

        {/* Display Coupons */}
        <div className="bg-white p-6 rounded-lg shadow-md">
          <h2 className="text-xl font-semibold mb-4">الكوبانات الموجودة</h2>
          {coupons?.length === 0 ? (
            <p className="text-gray-500">No coupons added yet.</p>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              {coupons?.map((coupon) => (
                <div
                  key={coupon._id}
                  className="p-4 border border-gray-200 rounded-lg shadow-sm"
                >
                  <p className="text-lg font-semibold">{coupon.name}</p>
                  <p className="text-gray-600">
                    نسبة الخصم : %{coupon.discount}
                  </p>
                  <p className="text-gray-600">
                    تاريخ الأنتهاء:{" "}
                    {new Date(coupon.expired).toLocaleDateString()}
                  </p>
                  <div className="w-full mt-2 flex gap-2">
                    {/* Delete Button */}
                    <button
                      onClick={() => handleDeleteCoupon(coupon?._id)}
                      className="bg-red-500 text-white py-1 px-3 rounded-md hover:bg-red-600 transition-colors"
                    >
                      حذف
                    </button>
                    {/* Gift Button */}
                    <input
                      type="text"
                      value={userIdToGift}
                      onChange={(e) => setUserIdToGift(e.target.value)}
                      placeholder="إسم الزبون"
                      className="inputClass shadow-input"
                    />
                    <button
                      // onClick={() => handleGiftCoupon(coupon._id)}
                      className="bg-green-500 text-white py-1 px-3 rounded-md hover:bg-green-600 transition-colors"
                    >
                      إهداء
                    </button>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Coupons;