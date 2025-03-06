// client/src/components/Coupons.js
import React, { useState, useEffect } from "react";
import axios from "axios"; // For making API calls

const Coupons = () => {
  const [coupons, setCoupons] = useState([]); // State to store coupons
  const [couponCode, setCouponCode] = useState(""); // State for coupon code input
  const [discountPercentage, setDiscountPercentage] = useState(""); // State for discount percentage input
  const [error, setError] = useState(""); // State for error messages

  // Fetch active coupons from the backend on component mount
  useEffect(() => {
    fetchCoupons();
  }, []);

  // Function to fetch active coupons from the backend
  const fetchCoupons = async () => {
    try {
      const response = await axios.get("/api/coupons"); // Replace with your backend API endpoint
      setCoupons(response.data); // Update the coupons state with fetched data
    } catch (error) {
      console.error("Error fetching coupons:", error);
    }
  };

  // Function to handle adding a coupon
  const handleAddCoupon = async () => {
    if (!couponCode || !discountPercentage) {
      setError("Please fill in both fields.");
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
                {" "}
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
                {" "}
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
          </div>

          {/* Error Message */}
          {error && <p className="text-red-500 text-sm mt-2">{error}</p>}

          {/* Add Coupon Button */}
          <button
            onClick={handleAddCoupon}
            className="mt-4 w-full bg-blue-500 text-white py-2 px-4 rounded-md hover:bg-blue-600 transition-colors"
          >
            حفظ{" "}
          </button>
        </div>

        {/* Display Coupons */}
        <div className="bg-white p-6 rounded-lg shadow-md">
          <h2 className="text-xl font-semibold mb-4">الكوبانات الموجودة</h2>
          {coupons.length === 0 ? (
            <p className="text-gray-500">No coupons added yet.</p>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              {/* {coupons?.map((coupon, index) => (
                <div
                  key={index}
                  className="p-4 border border-gray-200 rounded-lg shadow-sm"
                >
                  <p className="text-lg font-semibold">{coupon.code}</p>
                  <p className="text-gray-600">{coupon.discount}% off</p>
                </div>
              ))} */}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Coupons;
