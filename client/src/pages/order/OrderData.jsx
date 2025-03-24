import React, { useContext, useEffect, useState } from "react";
import HeaderImage from "../../components/HeaderImage";
import Loading from "../../components/Loading";
import { Context } from "../../context/StatContext";
import { redirect, useNavigate, useParams } from "react-router-dom";
import { useApplyCoupon, useCheckOut, useGetOrder } from "../../utils/Api/OrderEndPoint";
import { convertCurrency } from "../../utils/currency";
import Error from "../../components/Error";
import { toast } from "react-toastify";
import HandleError from "../../utils/GlobalError";
import { useQueryClient } from "@tanstack/react-query";


const OrderData = () => {

  const param = useParams()
  const navigate = useNavigate()
  const queryClient = useQueryClient()
  const {
    userData,
    isLogin,
    cartItems,
    totalPrice,
    incQty,
    currency,
    onRemove,
    onAdd,
    decQty,
    toggleCartItemQuantity,
    totalQuantities,
    isAddCartLoading,
    qty,
  } = useContext(Context);
  const [route, setRoute] = useState('');
  const [coupon , setCoupon] = useState('')
  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    phone: '',
    country: '',
    city: '',
    area: '',
    street: '',
    note: '',
  });

  const {data : orderData , isError , error , isLoading} = useGetOrder(param.id)
  const {mutate: applyCoupon , isPending } = useApplyCoupon()
  const {mutate : checkOut , isPending : isCheckPend , isError : isCheckErr} = useCheckOut()
  const [costPrice , setCostPrice] = useState(0)





  
  const handleCoupon = (id )=>{
    applyCoupon({id,coupon},{onSuccess:(res)=>{
      queryClient.invalidateQueries(['orderData'])
      setCostPrice(res?.totalPriceAfterDiscount)
    },onError:(error)=>{
      toast.error(HandleError(error))
    }})
  }

  useEffect(() => {
    setFormData({
      firstName: userData?.firstName,
      lastName: userData?.lastName,
      phone: userData?.phone,
      country: userData?.country,
      city: userData?.city,
      area: userData?.area,
      street: userData?.street,
      note: userData?.note,
    })
    setCostPrice(orderData?.totalOrderPriceAfterDiscount ? orderData?.totalOrderPriceAfterDiscount : orderData?.totalOrderPrice)
  }, [orderData])
  
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };


  if (isLoading) return <Loading elements={"h-screen"} />;
  if (isError) return <Error error={error} />;

  
  
  const handleSubmit = async (e) => {
    e.preventDefault();
    checkOut({id: param.id , shippingData: formData} , {onSuccess: (res)=>{
      if (res.paymentUrl) {
        window.location.href = res.paymentUrl || route;
        setRoute(res.paymentUrl) // Redirect to the payment URL
      }
    }})
  };



  const totalPri = convertCurrency(costPrice , "KWD" , currency)
  const shippingPrice = convertCurrency(orderData?.shippingPrice , "KWD" , currency)

  const totalPriceAfterDis = convertCurrency(orderData?.totalOrderPriceAfterDiscount , "KWD" , currency)


  return (
    <div className="w-full flex justify-center items-center">
      <div className="max-w-[1260px] w-full px-2.5 flex flex-col justify-center gap-8 sm:gap-14 md:gap-20 mb-20">
        <HeaderImage
          image={"../../../public/cartPerfume.png"}
          title={"سلتك العطرية"}
        />

        {
          <div className="w-full flex flex-col md:flex-row justify-between items-start gap-4">
            <form
              className="w-full p-3 bg-fifed flex gap-4 flex-col items-center"
              onSubmit={handleSubmit}
            >
              <h2 className="text-2xl font-bold ">بيانات الشحن</h2>
              <p className="text-medium md:text-large text-ford">
                من فضلك املأ البيانات بطريقة صحيحة حتى يصل إليك الطلب بالعنوان
                الصحيح
              </p>
              <div className="w-full flex gap-6">
                <div className="w-full">
                  <input
                    className="inputClass shadow-input"
                    placeholder=" اسم الأول"
                    type="text"
                    name="firstName"
                    value={formData.firstName}
                    onChange={handleChange}
                  />
                </div>
                <div className="w-full">
                  <input
                    className="inputClass shadow-input"
                    placeholder=" اسم العائلة"
                    type="text"
                    name="lastName"
                    value={formData.lastName}
                    onChange={handleChange}
                  />
                </div>
              </div>
              <div className="w-full">
                <input
                  className="inputClass shadow-input"
                  placeholder=" رقم الموبايل للتواصل"
                  type="text"
                  name="phone"
                  value={formData.phoneNumber}
                  onChange={handleChange}
                />
              </div>
              <div className="w-full flex gap-6">
                <div className="w-full">
                  <select
                    className="inputClass shadow-input"
                    name="country"
                    value={formData.country}
                    onChange={handleChange}
                  >
                    <option value="">اختر الدولة</option>
                    <option value="الكويت">الكويت</option>
                    <option value="الأمارات">الأمارات</option>
                    <option value="السعودية">السعودية</option>
                    <option value="قطر">قطر</option>
                    <option value="عمان">عمان</option>
                  </select>
                </div>
                <div className="w-full">
                  <input
                    className="inputClass shadow-input"
                    placeholder=" المدينة"
                    type="text"
                    name="city"
                    value={formData.city}
                    onChange={handleChange}
                  />
                </div>
              </div>
              <div className="w-full flex gap-6">
                <div className="w-full">
                  <input
                    className="inputClass shadow-input"
                    placeholder=" الحي"
                    type="text"
                    name="area"
                    value={formData.neighborhood}
                    onChange={handleChange}
                  />
                </div>
                <div className="w-full">
                  <input
                    className="inputClass shadow-input"
                    placeholder=" الشارع"
                    type="text"
                    name="street"
                    value={formData.street}
                    onChange={handleChange}
                  />
                </div>
              </div>
              <div className="w-full">
                <input
                  className="inputClass shadow-input"
                  placeholder=" ملاحظات  : "
                  type="text"
                  name="note"
                  value={formData.reviews}
                  onChange={handleChange}
                />
              </div>
              <button
                type="submit"
                className="px-6 py-2 hidden md:block bg-primary w-full text-white rounded-lg hover:bg-blue-600"
              >
                {false ? <Loading width="24" height="24" /> : "حفظ"}
              </button>
            </form>

            <div className="w-full">
              <div className="w-full flex gap-2.5 flex-col justify-center items-center bg-fifed rounded-xl p-5 shadow-sm">
                <p className="text-2xl font-bold">ملخص الطلب</p>
                <div className="w-full flex justify-between px-5 md:px-10 h-14 items-center">
                  <p className="text-lg md:text-xl">تكلفة الطلب:</p>
                  <p className="text-lg md:text-xl">
                    {" "}
                    {currency} {totalPrice}
                  </p>
                </div>
          
                <div className="w-full flex justify-between px-5 md:px-10 h-14 items-center">
                <p className="text-lg md:text-xl">تكلفة التوصيل: </p>
                <p className="text-lg md:text-xl">
                  {" "}
                  {currency} {shippingPrice}
                </p>
              </div>

                <div className="w-full flex justify-between px-5 md:px-10 h-14 items-center">
                  <p className="text-lg md:text-xl">تكلفة الطلب بعد الخصم: </p>
                  <p className="text-lg md:text-xl">
                    {" "}
                    {currency} {totalPriceAfterDis}
                  </p>
                </div>

                <div className="w-full flex justify-between px-5 md:px-10 h-14 items-center">
                  <p className="text-lg md:text-xl">التكلفة الكلية: </p>
                  <p className="text-lg md:text-xl">
                    {" "}
                    {currency} {totalPri}
                  </p>
                </div>

              </div>
              <div className="w-full mt-9">
                <p>هل لديك كوبون خصم ؟</p>
                <div className="w-full flex gap-3">
                  <input
                    className="inputClass shadow-input"
                    placeholder=" أدخل الكوبون"
                    type="text"
                    name="phoneNumber"
                    onChange={(e)=>setCoupon(e.target.value)}
                  />{" "}
                  <button
                    onClick={()=>handleCoupon(param.id)}
                    className="px-6 py-2 bg-primary w-2/5 text-white rounded-lg hover:bg-blue-600"
                  >
                    {false ? <Loading width="24" height="24" /> : "تأكيد"}
                  </button>
                </div>
              </div>
            </div>
          </div>
        }
        <button
        onClick={handleSubmit}
          type="submit"
          className="px-6 py-2 block md:hidden bg-primary w-full text-white rounded-lg hover:bg-blue-600"
        >
          {isCheckPend ? <Loading width="24" height="24" /> : "دفع"}
        </button>
      </div>
    </div>
  );
};

export default OrderData;
