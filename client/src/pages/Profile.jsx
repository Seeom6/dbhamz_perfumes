import React, { useContext } from "react";
import { Context } from "../context/StatContext";
import image from "/assets/perfume6.png";
import HeaderImage from "./../components/HeaderImage";
import UserProfile from "../components/profile/UserProfile";
import { Link } from "react-router-dom";
import { useGetMyOrders } from "../utils/Api/OrderEndPoint";
import { format } from "date-fns";
import { ar } from "date-fns/locale";

const Profile = () => {
  const { userData, isLogin } = useContext(Context);
  const { data: myOrders = [], isLoading } = useGetMyOrders();

  if (!isLogin) {
    return (
      <div className="flex justify-center items-center h-screen bg-gray-50">
        <div className="text-center p-8 bg-white rounded-lg shadow-lg">
          <p className="text-lg text-red-600 mb-4">يبدو أنك غير مسجل دخولك</p>
          <Link
            to="/login"
            className="inline-block px-6 py-2 bg-primary text-white rounded-lg hover:bg-primary-dark transition-colors"
          >
            الانتقال إلى صفحة تسجيل الدخول
          </Link>
        </div>
      </div>
    );
  }

  // Ensure userData.address is properly structured
  const userWithAddress = {
    ...userData,
    address: userData.address || {
      street: "",
      area: "",
      city: "",
      country: "",
    },
  };

  const formatDate = (dateString) => {
    try {
      return format(new Date(dateString), "dd MMMM yyyy", { locale: ar });
    } catch {
      return dateString;
    }
  };

  const getOrderStatus = (order) => {
    if (order.isDelivered && order.deliveredAt) {
      return { text: "تم التوصيل", color: "bg-green-100 text-green-800" };
    }
    if (order.isPaid && order.paidAt) {
      return { text: "قيد الشحن", color: "bg-blue-100 text-blue-800" };
    }
    return { text: "قيد المعالجة", color: "bg-yellow-100 text-yellow-800" };
  };

  return (
    <div className="w-full flex justify-center items-center bg-gray-50 py-10">
      <div className="max-w-[1260px] mt-[80px] md:mt-[115px] w-full px-4 flex flex-col justify-center gap-8 sm:gap-14 md:gap-20">
        <HeaderImage
          image={image}
          title={"أهلاً بك في عالمك الخاص من العطور"}
          subtitle={"استكشف عطورنا الفريدة واختر ما يناسبك"}
        />

        <div className="w-full">
          <UserProfile user={userWithAddress} />
        </div>

        {/* Orders Section */}
        <div className="w-full">
          <h2 className="text-2xl font-bold text-gray-800 mb-6 border-b pb-2">
            طلباتي السابقة
          </h2>

          {isLoading ? (
            <div className="flex justify-center items-center py-12">
              <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-primary"></div>
            </div>
          ) : myOrders?.length > 0 ? (
            <div className="space-y-6">
              {myOrders.map((order) => {
                const status = getOrderStatus(order);
                return (
                  <div
                    key={order?._id}
                    className="bg-white rounded-xl shadow-md overflow-hidden transition-all hover:shadow-lg"
                  >
                    <div className="p-6">
                      <div className="flex flex-col md:flex-row md:justify-between md:items-center mb-4">
                        <div>
                          <h3 className="text-lg font-semibold text-gray-800">
                            الطلب رقم: #
                            {order?._id?.toString().slice(-6) || "N/A"}
                          </h3>
                          <p className="text-gray-600 text-sm mt-1">
                            {order?.createdAt
                              ? formatDate(order.createdAt)
                              : "تاريخ غير معروف"}
                          </p>
                        </div>
                        <div className="mt-2 md:mt-0">
                          <span
                            className={`px-3 py-1 rounded-full text-sm font-medium ${status.color}`}
                          >
                            {status.text}
                          </span>
                        </div>
                      </div>

                      <div className="border-t border-gray-200 pt-4 mt-4">
                        <h4 className="font-medium text-gray-700 mb-3">
                          المنتجات:
                        </h4>
                        <div className="space-y-4">
                          {order?.cartItems?.length > 0 ? (
                            order.cartItems.map((item) => (
                              <div
                                key={item?.product?._id || Math.random()}
                                className="flex items-start"
                              >
                                <div className="flex-shrink-0 h-16 w-16 rounded-md overflow-hidden">
                                  <img
                                    src={
                                      item?.productImage ||
                                      "/assets/default-perfume.png"
                                    }
                                    alt={
                                      item?.productImage || "منتج غير معروف"
                                    }
                                    className="h-full w-full object-cover"
                                  />
                                  {console.log(item)}
                                </div>
                                <div className="ml-4 flex-1">
                                  <h5 className="text-md font-medium text-gray-900">
                                    {item?.product?.name || "منتج غير معروف"}
                                  </h5>
                                  <p className="text-sm text-gray-500">
                                    الكمية: {item?.quantity || 0}
                                  </p>
                                </div>
                                <div className="ml-4">
                                  <p className="text-md font-medium text-primary">
                                    {item?.price || 0} ر.س
                                  </p>
                                </div>
                              </div>
                            ))
                          ) : (
                            <p className="text-gray-500">
                              لا توجد منتجات في هذا الطلب
                            </p>
                          )}
                        </div>
                      </div>

                      <div className="border-t border-gray-200 pt-4 mt-4 grid grid-cols-1 md:grid-cols-3 gap-4">
                        <div>
                          <p className="text-sm text-gray-600">طريقة الدفع:</p>
                          <p className="font-medium">
                            {order?.paymentMethod || "غير معروف"}
                          </p>
                        </div>
                        <div>
                          <p className="text-sm text-gray-600">حالة الدفع:</p>
                          <p className="font-medium">
                            {order?.isPaid
                              ? `تم الدفع في ${
                                  order.paidAt ? formatDate(order.paidAt) : ""
                                }`
                              : "لم يتم الدفع"}
                          </p>
                        </div>
                        <div className="text-right">
                          <p className="text-sm text-gray-600">المجموع:</p>
                          <p className="text-xl font-bold text-primary">
                            {order?.totalOrderPrice || 0} ر.س
                          </p>
                          {order?.totalOrderPriceAfterDiscount && (
                            <p className="text-sm text-gray-500 line-through">
                              {order.totalOrderPriceAfterDiscount} ر.س
                            </p>
                          )}
                        </div>
                      </div>

                      {order?.shippingData && (
                        <div className="border-t border-gray-200 pt-4 mt-4">
                          <h4 className="font-medium text-gray-700 mb-3">
                            معلومات الشحن:
                          </h4>
                          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                            <div>
                              <p className="text-sm text-gray-600">الاسم:</p>
                              <p className="font-medium">
                                {order.shippingData.firstName}{" "}
                                {order.shippingData.lastName}
                              </p>
                            </div>
                            <div>
                              <p className="text-sm text-gray-600">الهاتف:</p>
                              <p className="font-medium">
                                {order.shippingData.phone}
                              </p>
                            </div>
                            <div>
                              <p className="text-sm text-gray-600">العنوان:</p>
                              <p className="font-medium">
                                {order.shippingData.street},{" "}
                                {order.shippingData.area},{" "}
                                {order.shippingData.city}
                              </p>
                            </div>
                            <div>
                              <p className="text-sm text-gray-600">البلد:</p>
                              <p className="font-medium">
                                {order.shippingData.country}
                              </p>
                            </div>
                          </div>
                        </div>
                      )}
                    </div>
                  </div>
                );
              })}
            </div>
          ) : (
            <div className="w-full text-center p-8 bg-white shadow-lg rounded-xl transform transition-all hover:scale-[1.01] hover:shadow-xl">
              <p className="text-xl text-gray-700 mb-6">
                يبدو أنك لم تقم بطلب أي عطور حتى الآن. اكتشف مجموعتنا واختر عطرك
                المفضل!
              </p>
              <Link
                to="/products"
                className="inline-block px-8 py-3 bg-gradient-to-r from-secondary to-primary text-white rounded-lg hover:from-blue-600 hover:to-purple-700 transition-all"
              >
                تصفح العطور
              </Link>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Profile;
