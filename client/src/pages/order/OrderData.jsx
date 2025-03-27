import React, { useContext, useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { toast } from "react-toastify";
import { useQueryClient } from "@tanstack/react-query";
import { ThreeDots } from "react-loader-spinner";

// Context & Utilities
import { Context } from "../../context/StatContext";
import { convertCurrency } from "../../utils/currency";
import HandleError from "../../utils/GlobalError";
import { countries } from "../../utils/data";
import { useApplyCoupon, useCheckOut, useGetOrder } from "../../utils/Api/OrderEndPoint";

// Components
import HeaderImage from "../../components/HeaderImage";
import Loading from "../../components/Loading";
import Error from "../../components/Error";

const OrderData = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const queryClient = useQueryClient();
  const { userData, currency } = useContext(Context);
  
  // State management
  const [coupon, setCoupon] = useState("");
  const [formErrors, setFormErrors] = useState({});
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    phone: "",
    country: "",
    city: "",
    area: "",
    street: "",
    note: "",
    paymentCurrency: "KWD",
  });

  // API Hooks
  const { data: orderData, isError, error, isLoading } = useGetOrder(id);
  const { mutate: applyCoupon, isPending: isCouponPending } = useApplyCoupon();
  const { mutate: checkOut, isPending: isCheckoutPending } = useCheckOut();

  // Initialize form with user data
  useEffect(() => {
    if (userData) {
      setFormData({
        firstName: userData.firstName || "",
        lastName: userData.lastName || "",
        phone: userData.phone || "",
        country: userData?.address?.country || "",
        city: userData?.address?.city || "",
        area: userData?.address?.area || "",
        street: userData?.address?.street || "",
        note: "",
        paymentCurrency: getCurrencyByCountry(userData.country || "Kuwait"),
      });
    }
  }, [userData]);

  const getCurrencyByCountry = (countryName) => {
    const country = countries.find((c) => c.name === countryName);
    return country ? country.currency : "KWD";
  };

  const validateForm = () => {
    const errors = {};
    if (!formData.firstName.trim()) errors.firstName = "الإسم الأول مطلوب";
    if (!formData.lastName.trim()) errors.lastName = "إسم العائلة مطلوب";
    if (!formData.phone.trim()) errors.phone = "رقم الهاتف مطلوب";
    if (!formData.country.trim()) errors.country = "الدولة مطلوبة";
    if (!formData.city.trim()) errors.city = "المدينة مطلوبة";
    if (!formData.area.trim()) errors.area = "الحي مطلوب";
    if (!formData.street.trim()) errors.street = "الشارع مطلوب";
    
    setFormErrors(errors);
    return Object.keys(errors).length === 0;
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value,
      ...(name === "country" && { paymentCurrency: getCurrencyByCountry(value) }),
    }));
    if (formErrors[name]) setFormErrors(prev => ({ ...prev, [name]: "" }));
  };

  const handleCoupon = () => {
    if (!coupon.trim()) {
      toast.error("الرجاء إدخال كود الخصم");
      return;
    }
    applyCoupon(
      { id, coupon },
      {
        onSuccess: () => {
          queryClient.invalidateQueries(["orderData"]);
          toast.success("تم تطبيق الكوبون بنجاح");
        },
        onError: (error) => toast.error(HandleError(error)),
      }
    );
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!validateForm()) {
      toast.error("الرجاء إكمال جميع الحقول المطلوبة");
      return;
    }
    checkOut(
      { id, shippingData: formData },
      {
        onSuccess: (res) => {
          if (res.paymentUrl) {
            // Open payment in new tab
            const paymentWindow = window.open(res.paymentUrl, '_blank');
            
            // Optional: Poll for payment status
            const pollInterval = setInterval(() => {
              refetch().then(({ data }) => {
                if (data?.isPaid) {
                  clearInterval(pollInterval);
                  navigate(`/payment-status/${id}?status=success`);
                } else if (data?.paymentStatus === 'Failed') {
                  clearInterval(pollInterval);
                  navigate(`/payment-status/${id}?status=failed`);
                }
              });
            }, 5000);
          }
        },
        onError: (error) => toast.error(HandleError(error)),
      }
    );
  };

  if (isLoading) return <Loading elements="h-screen" />;
  if (isError) return <Error error={error} />;

  // Calculate prices
  const subtotal = orderData?.totalOrderPrice || 0;
  const discount = orderData?.totalOrderPriceAfterDiscount 
    ? subtotal - orderData.totalOrderPriceAfterDiscount 
    : 0;
  const shipping = orderData?.shippingPrice || 0;
  const total = (orderData?.totalOrderPriceAfterDiscount || subtotal) ;

  return (
    <div className="min-h-screen bg-gray-50 py-8 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <HeaderImage 
          image="/assets/cartPerfume.png" 
          title="سلتك العطرية"
          className="mb-8"
        />

        <div className="flex flex-col lg:flex-row gap-8">
          {/* Shipping Form - Left Column */}
          <div className="lg:w-2/3">
            <div className="bg-white p-6 rounded-xl shadow-sm">
              <h2 className="text-2xl font-bold text-gray-800 mb-6 border-b pb-4">
                <span className="text-primary">بيانات</span> الشحن
              </h2>
              
              <form onSubmit={handleSubmit}>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  {/* Name Fields */}
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">الإسم الأول*</label>
                    <input
                      className={`w-full px-4 py-3 rounded-lg border ${formErrors.firstName ? "border-red-500" : "border-gray-300"} focus:ring-2 focus:ring-primary focus:border-transparent`}
                      name="firstName"
                      value={formData.firstName}
                      onChange={handleChange}
                    />
                    {formErrors.firstName && (
                      <p className="mt-1 text-sm text-red-600">{formErrors.firstName}</p>
                    )}
                  </div>
                  
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">إسم العائلة*</label>
                    <input
                      className={`w-full px-4 py-3 rounded-lg border ${formErrors.lastName ? "border-red-500" : "border-gray-300"} focus:ring-2 focus:ring-primary focus:border-transparent`}
                      name="lastName"
                      value={formData.lastName}
                      onChange={handleChange}
                    />
                    {formErrors.lastName && (
                      <p className="mt-1 text-sm text-red-600">{formErrors.lastName}</p>
                    )}
                  </div>

                  {/* Phone */}
                  <div className="md:col-span-2">
                    <label className="block text-sm font-medium text-gray-700 mb-1">رقم الهاتف*</label>
                    <input
                      className={`w-full px-4 py-3 rounded-lg border ${formErrors.phone ? "border-red-500" : "border-gray-300"} focus:ring-2 focus:ring-primary focus:border-transparent`}
                      name="phone"
                      value={formData.phone}
                      onChange={handleChange}
                    />
                    {formErrors.phone && (
                      <p className="mt-1 text-sm text-red-600">{formErrors.phone}</p>
                    )}
                  </div>

                  {/* Address Fields */}
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">الدولة*</label>
                    <select
                      className={`w-full px-4 py-3 rounded-lg border ${formErrors.country ? "border-red-500" : "border-gray-300"} focus:ring-2 focus:ring-primary focus:border-transparent`}
                      name="country"
                      value={formData.country}
                      onChange={handleChange}
                    >
                      <option value="">اختر الدولة</option>
                      {countries.map((c) => (
                        <option key={c.currency} value={c.name}>
                          {c.arabicName}
                        </option>
                      ))}
                    </select>
                    {formErrors.country && (
                      <p className="mt-1 text-sm text-red-600">{formErrors.country}</p>
                    )}
                  </div>
                  
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">المدينة*</label>
                    <input
                      className={`w-full px-4 py-3 rounded-lg border ${formErrors.city ? "border-red-500" : "border-gray-300"} focus:ring-2 focus:ring-primary focus:border-transparent`}
                      name="city"
                      value={formData.city}
                      onChange={handleChange}
                    />
                    {formErrors.city && (
                      <p className="mt-1 text-sm text-red-600">{formErrors.city}</p>
                    )}
                  </div>
                  
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">الحي*</label>
                    <input
                      className={`w-full px-4 py-3 rounded-lg border ${formErrors.area ? "border-red-500" : "border-gray-300"} focus:ring-2 focus:ring-primary focus:border-transparent`}
                      name="area"
                      value={formData.area}
                      onChange={handleChange}
                    />
                    {formErrors.area && (
                      <p className="mt-1 text-sm text-red-600">{formErrors.area}</p>
                    )}
                  </div>
                  
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">الشارع*</label>
                    <input
                      className={`w-full px-4 py-3 rounded-lg border ${formErrors.street ? "border-red-500" : "border-gray-300"} focus:ring-2 focus:ring-primary focus:border-transparent`}
                      name="street"
                      value={formData.street}
                      onChange={handleChange}
                    />
                    {formErrors.street && (
                      <p className="mt-1 text-sm text-red-600">{formErrors.street}</p>
                    )}
                  </div>

                  {/* Note */}
                  <div className="md:col-span-2">
                    <label className="block text-sm font-medium text-gray-700 mb-1">ملاحظات (اختياري)</label>
                    <textarea
                      className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:ring-2 focus:ring-primary focus:border-transparent"
                      name="note"
                      rows="3"
                      value={formData.note}
                      onChange={handleChange}
                    />
                  </div>
                </div>

                <button
                  type="submit"
                  className="mt-6 w-full bg-primary text-white py-3 rounded-lg hover:bg-primary-dark transition-colors duration-300 flex justify-center items-center"
                  disabled={isCheckoutPending}
                >
                  {isCheckoutPending ? (
                    <ThreeDots color="#FFF" height={24} width={24} />
                  ) : (
                    "إتمام الشراء"
                  )}
                </button>
              </form>
            </div>
          </div>

          {/* Order Summary - Right Column */}
          <div className="lg:w-1/3">
            <div className="bg-white p-6 rounded-xl shadow-sm sticky top-8">
              <h2 className="text-2xl font-bold text-gray-800 mb-6 border-b pb-4">
                <span className="text-primary">ملخص</span> الطلب
              </h2>
              
              {/* Products List */}
              <div className="space-y-4 mb-6 max-h-96 overflow-y-auto pr-2">
                {orderData?.cartItems?.map(item => (
                  <div key={item._id} className="flex justify-between items-start border-b pb-4">
                    <div className="flex items-start gap-3">
                      <img 
                        src={item.productImage} 
                        alt={item.product?.name} 
                        className="w-16 h-16 object-cover rounded"
                      />
                      <div>
                        <p className="font-medium text-gray-800">{item.product?.name}</p>
                        <p className="text-gray-500 text-sm">
                          {item.quantity} × {convertCurrency(item.price, "KWD", currency)}
                        </p>
                      </div>
                    </div>
                    <p className="font-medium text-gray-800">
                      {convertCurrency(item.price * item.quantity, "KWD", currency)}
                    </p>
                  </div>
                ))}
              </div>

              {/* Bill Breakdown */}
              <div className="space-y-3 border-t pt-4">
                
                <div className="flex justify-between">
                  <span className="text-gray-600">الشحن:</span>
                  <span className="font-medium">{convertCurrency(shipping, "KWD", currency)}</span>
                </div>
                
                <div className="flex justify-between">
                  <span className="text-gray-600"> المجموع مع أضافة قيمة الشحن: </span>
                  <span className="font-medium">{convertCurrency(subtotal, "KWD", currency)}</span>
                </div>
                
                {discount > 0 && (
                  <div className="flex justify-between text-green-600">
                    <span>الخصم:</span>
                    <span>-{convertCurrency(discount, "KWD", currency)}</span>
                  </div>
                )}
                <div className="flex justify-between font-bold text-lg mt-3 pt-3 border-t">
                  <span>المجموع النهائي:</span>
                  <span className="text-primary">{convertCurrency(total, "KWD", currency)}</span>
                </div>
              </div>

              {/* Coupon Section */}
              <div className="mt-6 pt-4 border-t">
                <h3 className="text-lg font-medium text-gray-800 mb-3">تطبيق كوبون خصم</h3>
                <div className="flex gap-2">
                  <input
                    className="flex-1 px-4 py-2 rounded-lg border border-gray-300 focus:ring-2 focus:ring-primary focus:border-transparent"
                    placeholder="أدخل كود الخصم"
                    value={coupon}
                    onChange={(e) => setCoupon(e.target.value)}
                  />
                  <button
                    onClick={handleCoupon}
                    className="bg-primary text-white px-4 py-2 rounded-lg hover:bg-primary-dark transition-colors duration-300 flex items-center justify-center"
                    disabled={isCouponPending}
                  >
                    {isCouponPending ? (
                      <ThreeDots color="#FFF" height={20} width={20} />
                    ) : (
                      "تطبيق"
                    )}
                  </button>
                </div>
              </div>

              {/* Payment Methods */}
              <div className="mt-6 pt-4 border-t">
                <h3 className="text-lg font-medium text-gray-800 mb-3">طرق الدفع</h3>
                <div className="flex flex-wrap gap-2">
                  <div className="border rounded-lg p-2">
                    <img src="/assets/visaCard.jpeg" alt="Visa" className="h-8" />
                  </div>
                  <div className="border rounded-lg p-2">
                    <img src="/assets/masterCard.png" alt="Mastercard" className="h-8" />
                  </div>
                  <div className="border rounded-lg p-2">
                    <img src="/assets/mada.jpeg" alt="Mada" className="h-8" />
                  </div>
                  <div className="border rounded-lg p-2">
                    <img src="/assets/apple.png" alt="Mada" className="h-8" />
                  </div>
                  <div className="border rounded-lg p-2">
                    <img src="/assets/google.png" alt="Mada" className="h-8" />
                  </div>

                </div>
                <div className="mt-3 flex items-center gap-2 text-sm text-gray-500">
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-green-500" viewBox="0 0 20 20" fill="currentColor">
                    <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                  </svg>
                  <span>مدفوعات آمنة عبر MyFatoora</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default OrderData;