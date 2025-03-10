import React, { useContext, useEffect, useState } from "react";
import HeaderImage from "../components/HeaderImage";
import dbhamz from "/assets/dbhamz2.png";
import CartElements from "../components/featuredComponents/CartElements";
import { getCartFromLocalStorage, saveCartToLocalStorage } from "../utils/localStorageCart.js";
import { CurrencyContext } from "../context/CurrencyContext.jsx";
import { useGetCart } from "../utils/Api/CartEndPoint.js";

const Cart = () => {
  const [cart, setCart] = useState([]);
  const [orderCost, setOrderCost] = useState(0);
  const { userData, isLogin } = useContext(CurrencyContext);
  const { data: getMyCart, refetch: refetchCart } = useGetCart(userData?._id);

  // Fetch cart data when user is logged in
  useEffect(() => {
    if (isLogin && userData?._id) {
      refetchCart();
    }
  }, [isLogin, userData?._id, refetchCart]);

  // Update cart state when data is fetched from the backend
  useEffect(() => {
    if (getMyCart) {
      if (Array.isArray(getMyCart)) {
        setCart(getMyCart);
      } else if (getMyCart.cartItems && Array.isArray(getMyCart.cartItems)) {
        setCart(getMyCart.cartItems);
      } else {
        console.error("Expected an array for cart data, but got:", getMyCart);
        setCart([]);
      }
    }
  }, [getMyCart]);

  // If user is not logged in, get cart from localStorage
  useEffect(() => {
    if (!isLogin) {
      const localStorageCart = getCartFromLocalStorage();
      if (localStorageCart && Array.isArray(localStorageCart)) {
        setCart(localStorageCart);
      } else {
        console.error("Expected an array for localStorage cart, but got:", localStorageCart);
        setCart([]);
      }
    }
  }, [isLogin]);

  // Calculate the total price whenever the cart changes
  useEffect(() => {
    const total = cart.reduce((sum, item) => sum + item.price * item.quantity, 0);
    setOrderCost(total);
    if (!isLogin) saveCartToLocalStorage(cart);
  }, [cart, isLogin]);

  // Handle cart operations
  const handleIncrement = (productId, newQuantity) => {
    const updatedCart = cart.map((item) =>
      item._id === productId ? { ...item, quantity: newQuantity } : item
    );
    setCart(updatedCart);
  };

  const handleDecrement = (productId, newQuantity) => {
    const updatedCart = cart.map((item) =>
      item._id === productId ? { ...item, quantity: newQuantity } : item
    );
    setCart(updatedCart);
  };

  const handleDelete = (productId) => {
    const updatedCart = cart.filter((item) => item._id !== productId);
    setCart(updatedCart);
  };

  return (
    <div className="w-full flex justify-center items-center">
      <div className="max-w-[1260px] w-full px-2.5 flex flex-col justify-center gap-8 sm:gap-14 md:gap-20 mb-20">
        <HeaderImage image={dbhamz} title={"سلتك العطرية"} />

        {/* Cart Table */}
        <div className="w-full overflow-x-auto">
          <table className="w-full bg-fifed rounded-lg hidden md:table">
            <thead>
              <tr className="border-b border-gray-300">
                <th className="text-start text-xl py-5 font-semibold">المنتج</th>
                <th className="text-start text-xl py-5 font-semibold">السعر</th>
                <th className="text-start text-xl py-5 font-semibold">الكمية</th>
                <th className="text-start text-xl py-5 font-semibold">المجموع الفرعي</th>
                <th className="text-start text-xl py-5 font-semibold">الإجراء</th>
              </tr>
            </thead>
            <tbody>
              {cart.map((item, idx) => (
                <CartElements
                  key={idx}
                  data={item}
                  onDelete={handleDelete}
                  onIncrement={handleIncrement}
                  onDecrement={handleDecrement}
                  isMobile={false}
                />
              ))}
            </tbody>
          </table>

          {/* Stacked Layout for Small Screens */}
          <div className="w-full flex flex-col gap-4 md:hidden">
            {cart.map((item, idx) => (
              <CartElements
                key={idx}
                data={item}
                onDelete={handleDelete}
                onIncrement={handleIncrement}
                onDecrement={handleDecrement}
                isMobile={true}
              />
            ))}
          </div>
        </div>

        {/* Order Summary */}
        <div className="w-full flex gap-2.5 flex-col justify-center items-center bg-fifed rounded-xl p-5 shadow-sm">
          <p className="text-2xl font-bold">ملخص الطلب</p>
          <div className="w-full flex justify-between px-5 md:px-10 h-14 items-center">
            <p className="text-lg md:text-xl">تكلفة الطلب:</p>
            <p className="text-lg md:text-xl">${orderCost.toFixed(2)}</p>
          </div>
        </div>

        {/* Checkout Button */}
        <div className="w-full flex justify-center">
          <button className="text-center flex justify-center items-center button-class bg-primary w-4/5 md:w-2/5">
            إتمام الطلب
          </button>
        </div>
      </div>
    </div>
  );
};

export default Cart;