import React from "react";
import { FiGift, FiTrash2 } from "react-icons/fi";

const CouponList = ({
  coupons,
  userIdToGift,
  setUserIdToGift,
  handleDeleteCoupon,
  handleGiftToAll,
  handleGiftToNewCustomers,
  isGiftingToAll,
  isGiftingToNew,
  setIsGiftingToAll,
  setIsGiftingToNew,
}) => {
  return (
    <div className="mt-8">
      <h2 className="text-xl font-semibold mb-4">قائمة الكوبونات</h2>
      
      {coupons?.length === 0 ? (
        <p className="text-center py-4">لا توجد كوبونات متاحة</p>
      ) : (
        <div className="bg-white rounded-lg shadow overflow-hidden">
          <table className="min-w-full divide-y divide-gray-200">
            <thead className="bg-gray-50">
              <tr>
                <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">
                  الكود
                </th>
                <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">
                  الخصم
                </th>
                <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">
                  تاريخ الانتهاء
                </th>
                <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">
                  النوع
                </th>
                <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">
                  الإجراءات
                </th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {coupons?.map((coupon) => (
                <tr key={coupon._id}>
                  <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                    {coupon.name}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                    {coupon.discount}%
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                    {new Date(coupon.expired).toLocaleDateString()}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                    {coupon.type || "عام"}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                    <div className="flex justify-end space-x-2">
                      <button
                        onClick={() => {
                          setIsGiftingToAll(coupon._id);
                          handleGiftToAll(coupon._id);
                        }}
                        disabled={isGiftingToAll === coupon._id}
                        className={`flex items-center px-3 py-1 rounded-md ${
                          isGiftingToAll === coupon._id
                            ? "bg-gray-300 text-gray-600"
                            : "bg-green-100 text-green-800 hover:bg-green-200"
                        }`}
                      >
                        <FiGift className="ml-1" />
                        للجميع
                      </button>
                      <button
                        onClick={() => {
                          setIsGiftingToNew(coupon._id);
                          handleGiftToNewCustomers(coupon._id);
                        }}
                        disabled={isGiftingToNew === coupon._id}
                        className={`flex items-center px-3 py-1 rounded-md ${
                          isGiftingToNew === coupon._id
                            ? "bg-gray-300 text-gray-600"
                            : "bg-blue-100 text-blue-800 hover:bg-blue-200"
                        }`}
                      >
                        <FiGift className="ml-1" />
                        للجدد
                      </button>
                      <button
                        onClick={() => handleDeleteCoupon(coupon._id)}
                        className="flex items-center px-3 py-1 rounded-md bg-red-100 text-red-800 hover:bg-red-200"
                      >
                        <FiTrash2 className="ml-1" />
                        حذف
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
};

export default CouponList;