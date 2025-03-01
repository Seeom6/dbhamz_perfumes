import React, { useState } from "react";
import dbhamz from "../assets/dbhamz2.png";
import HeaderImage from "../components/HeaderImage";
import CartElements from "../components/featuredComponents/CartElements";
import {
  useApplyCoupon,
  useDeleteProductInCart,
  useGetCart,
  useUpdateCartQuantity,
} from "../utils/Api/CartEndPoint.js";
import Loading from "../components/Loading.jsx";
import { toast } from "react-toastify";
import { useQueryClient } from "@tanstack/react-query";
import { Link, useNavigate } from "react-router-dom";
import Error from "./../components/Error";

const Cart = () => {
  const queryClient = useQueryClient();
  const navigate = useNavigate()
  const [couponData, setCouponData] = useState("");

  const { data: myCart, isError, error, isLoading } = useGetCart();

  const {
    mutate: applyCoupon,
    error: couponError,
    isPending: couponPending,
  } = useApplyCoupon();
  const {
    mutate: UpdateCart,
    error: CartError,
    isError: isCartError,
    isPending: cartPending,
  } = useUpdateCartQuantity();
  const { mutate: deleteCart, error: deletedError } = useDeleteProductInCart();
  if (isLoading) return <Loading elements={"h-screen"} />;
  if (isError) return <Error error={error.message} />;

  const handleCoupon = (e) => {
    applyCoupon(couponData, {
      onSuccess: () => {
        toast.success("تم الخصم");
      },
      onError: () => {
        toast.error(couponError.message);
      },
    });
  };

  // Function to handle delete
  const handleDelete = (productId) => {
    deleteCart(productId);
  };
  // Function to handle increment
  const handleIncrement = (productId, quantity) => {
    UpdateCart(
      { productId, quantity },
      {
        onSuccess: () => {
          queryClient.invalidateQueries({ queryKey: ["cart"] });
          toast.success("Quantity updated successfully");
        },
        onError: (err) => {
          toast.error(err.message);
        },
      }
    );
  };
  // Function to handle decrement
  const handleDecrement = (productId, quantity) => {
    UpdateCart(
      { productId, quantity },
      {
        onSuccess: () => {
          queryClient.invalidateQueries({ queryKey: ["cart"] });
          toast.success("Quantity updated successfully");
        },
        onError: (err) => {
          toast.error(err.message);
        },
      }
    );
  };

  const handleClickToOrder = ()=>{
    if(myCart?.cartItems.length <= 0 ){
      return toast.error("يجب ان تشتري على الأقل منتج واحد")
    }
    navigate("/order")
  }

  if (isLoading) return <Loading elements={"h-screen"} />;
  if (isCartError || isError) return <Error error={CartError || error} />;

  return (
    <div className="w-full flex justify-center items-center">
      <div className="max-w-[1260px] w-full px-2.5 flex flex-col justify-center gap-8 sm:gap-14 md:gap-20 mb-20">
        <HeaderImage image={dbhamz} title={"سلتك العطرية"} />

        {/* Cart Table */}
        <div className="w-full overflow-x-auto">
          {/* Table for Medium and Large Screens */}
          <table className="w-full bg-fifed rounded-lg hidden md:table">
            <thead>
              <tr className="border-b border-gray-300">
                <th className="text-start text-xl py-5 font-semibold">
                  المنتج
                </th>
                <th className="text-start text-xl py-5 font-semibold">السعر</th>
                <th className="text-start text-xl py-5 font-semibold">
                  الكمية
                </th>
                <th className="text-start text-xl py-5 font-semibold">
                  المجموع الفرعي
                </th>
                <th className="text-start text-xl py-5 font-semibold">
                  الإجراء
                </th>
              </tr>
            </thead>
            <tbody>
              {myCart?.cartItems?.map((item, idx) => (
                <CartElements
                  key={idx}
                  data={item}
                  onDelete={handleDelete}
                  onIncrement={handleIncrement}
                  onDecrement={handleDecrement}
                  isMobile={false} // Pass a prop to differentiate between mobile and desktop
                />
              ))}
            </tbody>
          </table>

          {/* Stacked Layout for Small Screens */}
          <div className="w-full flex flex-col gap-4 md:hidden">
            {myCart?.cartItems?.map((item, idx) => (
              <CartElements
                key={idx}
                data={item}
                onDelete={handleDelete}
                onIncrement={handleIncrement}
                onDecrement={handleDecrement}
                isMobile={true} // Pass a prop to differentiate between mobile and desktop
              />
            ))}
          </div>
        </div>

        {/* Coupon Section */}
        <div className="w-full flex flex-col md:flex-row md:items-center gap-3">
          <p className="text-xl font-bold">لديك كوبون خصم؟</p>
          <div className="w-full flex flex-col md:flex-row gap-5 justify-center items-center">
            <input
              onChange={(e) => setCouponData(e.target.value)}
              className="w-4/5 shadow-input rounded-lg p-3 md:p-5 text-medium outline-0 border-0 focus:border focus:border-primary h-10"
              placeholder="أدخل كود الكوبون..."
              type="text"
              value={couponData}
            />
            <div className="w-full flex justify-center">
              <button
                onClick={() => handleCoupon(couponData)}
                className="button-class bg-primary w-3/5 md:w-2/5"
              >
                تأكيد
              </button>
            </div>
          </div>
        </div>

        {/* Order Summary */}
        <div className="w-full flex gap-2.5 flex-col justify-center items-center bg-fifed rounded-xl p-5 shadow-sm">
          <p className="text-2xl font-bold">ملخص الطلب</p>
          <div className="w-full flex justify-between px-5 md:px-10 h-14 items-center">
            <p className="text-lg md:text-xl">تكلفة الطلب:</p>
            <p className="text-lg md:text-xl">${myCart?.totalPrice}</p>
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

        {/* Checkout Button */}
        <div className="w-full flex justify-center">
          <button onClick={handleClickToOrder} className="text-center flex justify-center items-center button-class bg-primary w-4/5 md:w-2/5">
              إتمام الطلب
          </button>
        </div>
      </div>
    </div>
  );
};

export default Cart;
