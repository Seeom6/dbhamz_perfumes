import React from "react";

const CouponList = ({ coupons, userIdToGift, setUserIdToGift, handleDeleteCoupon }) => {
  return (
    <div className="bg-white p-6 rounded-lg shadow-lg">
      <h2 className="text-2xl font-bold mb-6 text-center text-gray-800">
        الكوبانات الموجودة
      </h2>
      {coupons?.length === 0 ? (
        <p className="text-gray-500 text-center">لا توجد كوبونات مضافة حتى الآن.</p>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {coupons?.map((coupon) => (
            <div
              key={coupon._id}
              className="relative bg-gradient-to-br from-purple-500 to-blue-500 rounded-2xl shadow-lg hover:shadow-xl transition-shadow duration-300 overflow-hidden"
              style={{ minHeight: "400px" }} // Adjust height as needed
            >
              {/* Coupon Content */}
              <div className="p-6 text-white flex flex-col justify-between h-full">
                {/* Coupon Header */}
                <div className="text-center">
                  <p className="text-2xl font-bold mb-2">كوبون الخصم</p>
                  <p className="text-sm bg-white/20 px-3 py-1 rounded-full inline-block">
                    {coupon.code}
                  </p>
                </div>

                {/* Coupon Details */}
                <div className="text-center">
                  <p className="text-4xl font-bold mb-4">{coupon.name}</p>
                  <p className="text-lg font-semibold">
                    نسبة الخصم: %{coupon.discount}
                  </p>
                  <p className="text-sm mt-2">
                    تاريخ الانتهاء: {new Date(coupon.expired).toLocaleDateString()}
                  </p>
                </div>

                {/* Buttons and Input */}
                <div className="mt-6 space-y-2">
                  <div className="flex gap-2">
                    <button
                      onClick={() => handleDeleteCoupon(coupon?._id)}
                      className="flex-1 bg-white text-purple-600 py-2 px-4 rounded-lg hover:bg-gray-100 transition-colors"
                    >
                      حذف
                    </button>
                    <button
                      // onClick={() => handleGiftCoupon(coupon._id)}
                      className="flex-1 bg-white text-blue-600 py-2 px-4 rounded-lg hover:bg-gray-100 transition-colors"
                    >
                      إهداء
                    </button>
                  </div>
                  <input
                    type="text"
                    value={userIdToGift}
                    onChange={(e) => setUserIdToGift(e.target.value)}
                    placeholder="إسم الزبون"
                    className="w-full p-2 border border-white/30 rounded-lg bg-white/20 text-white placeholder-white/70 focus:outline-none focus:ring-2 focus:ring-white"
                  />
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default CouponList;