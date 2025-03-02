import React, { useState } from "react";
import HeaderImage from "../../components/HeaderImage";
import { useLocation, useParams } from "react-router-dom";
import Error from "../../components/Error";
import { useGetOneCart } from "../../utils/Api/CartEndPoint";
import Loading from "../../components/Loading";

const OrderData = () => {
  
  const param = useParams()

   const { data: myCart, isError, error, isLoading } = useGetOneCart(param.cartId);

  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    phoneNumber: "",
    country: "",
    city: "",
    neighborhood: "",
    street: "",
    reviews: "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
  };
  if (isLoading) return <Loading elements={"h-screen"} />;
  if (isError) return <Error error={error} />;
  if(!param.cartId) return <div className="w-full flex justify-center text-xl">something went Error check if you are registered</div>

  return (
    <div className="w-full flex justify-center items-center">
      <div className="max-w-[1260px] w-full px-2.5 flex flex-col justify-center gap-8 sm:gap-14 md:gap-20 mb-20">
        <HeaderImage
          image={"../../../public/cartPerfume.png"}
          title={"سلتك العطرية"}
        />

        {
          param.cartId && <div className="w-full flex justify-between items-start gap-4">
          <form
            className="w-full p-3 bg-fifed flex gap-4 flex-col items-center"
            onSubmit={handleSubmit}
          >
            <h2 className="text-2xl font-bold ">بيانات الشحن</h2>
            <p className="text-medium md:text-large text-ford">
              من فضلك املأ البيانات بطريقة صحيحة حتى يصل إليك الطلب بالعنوان الصحيح
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
                name="phoneNumber"
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
                  name="neighborhood"
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
                name="reviews"
                value={formData.reviews}
                onChange={handleChange}
              />
            </div>
            <button
              type="submit"
              className="px-6 py-2 bg-primary w-full text-white rounded-lg hover:bg-blue-600"
            >
              {false ? <Loading width="24" height="24" /> : "حفظ"}
            </button>
          </form>

          <div className="w-full">
            <div className="w-full flex gap-2.5 flex-col justify-center items-center bg-fifed rounded-xl p-5 shadow-sm">
              <p className="text-2xl font-bold">ملخص الطلب</p>
              <div className="w-full flex justify-between px-5 md:px-10 h-14 items-center">
                <p className="text-lg md:text-xl">تكلفة الطلب:</p>
                <p className="text-lg md:text-xl"> $ {myCart?.totalPrice}</p>
              </div>
              {myCart?.totalPriceAfterDiscount && (
            <div className="w-full flex justify-between px-5 md:px-10 h-14 items-center">
              <p className="text-lg md:text-xl">تكلفة الطلب بعد الخصم:</p>

              <p className="text-lg md:text-xl">
                ${myCart?.totalPriceAfterDiscount}
              </p>
            </div>
          )}
            </div>
          </div>
        </div>
        }
      </div>
    </div>
  );
};

export default OrderData;