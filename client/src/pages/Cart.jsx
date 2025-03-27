import React, { useContext, useState } from "react";
import HeaderImage from "../components/HeaderImage";
import dbhamz from "/assets/cartPerfume.png";
import CartElements from "../components/featuredComponents/CartElements";
import { Context } from "../context/StatContext.jsx";
import { AiOutlineShopping } from "react-icons/ai";
import { Link, useNavigate } from "react-router-dom";
import LoginPopup from "../components/popup/LoginPopup.jsx";
import SignupPopup from "../components/popup/SignupPopup"; // Import the SignupPopup component
import { useCreateOrder } from "../utils/Api/OrderEndPoint.js";
import Loading from "../components/Loading.jsx";

const Cart = () => {
  const navigate = useNavigate();
  const {
    currency,
    isLogin,
    cartItems,
    totalPrice,
    toggleCartItemQuantity,
    totalQuantities,
    onRemove,
  } = useContext(Context);

  const [isLoginPopupOpen, setIsLoginPopupOpen] = useState(false);
  const [isSignupPopupOpen, setIsSignupPopupOpen] = useState(false);
  const { mutate: createOrder, isPending } = useCreateOrder();

  const handleCheckout = () => {
    console.log(isLogin)
    if (!isLogin) {
      return setIsLoginPopupOpen(true);
    }
    createOrder(cartItems, {
      onSuccess: (res) => {
        if (res.success === true) {
          navigate(`/order/${res.orderId}`)
        }
      },
    });
  };

  const handleLoginSuccess = () => {
    setIsLoginPopupOpen(false);
  };

  const handleSignupSuccess = () => {
    setIsSignupPopupOpen(false)
  };

  return (
    <div className="w-full flex justify-center items-center">
      <div className="max-w-[1260px] mt-[40px] md:mt-0 w-full px-2.5 flex flex-col justify-center gap-8 sm:gap-14 md:gap-20 mb-20">
        <HeaderImage image={dbhamz} title={"سلتك العطرية"} />
        <div className="w-full">
          {cartItems.length < 1 && (
            <div className="w-full flex flex-col justify-center items-center">
              <AiOutlineShopping size={150} className="text-primary" />
              <h3 className="font-bold">سلتك العطرية فارغة , املأها</h3>
              <button className="w-44 bg-primary h-12 mt-4 text-white font-bold rounded-lg">
                <Link to="/products">املأها</Link>
              </button>
            </div>
          )}
          {cartItems.length >= 1 &&
            cartItems.map((item) => (
              <CartElements
                key={item._id}
                data={item}
                onRemove={onRemove}
                toggleCartItemQuantity={toggleCartItemQuantity}
              />
            ))}
        </div>
        {cartItems.length >= 1 && (
          <div className="flex justify-center ">
            <div className="bg-white p-6 rounded-lg shadow-lg">
              <h2 className="text-xl font-semibold">
                المجموع النهائي:
                <span>{totalPrice} </span>
                <span>{currency} </span>
              </h2>
              <button
                onClick={handleCheckout}
                className="mt-4 w-full bg-primary text-white py-2 rounded-lg hover:bg-blue-600"
              >
                {isPending ? <Loading width="15" height="15"/> : "إتمام الدفع"}
              </button>
            </div>
          </div>
        )}
      </div>

      {/* Login Popup */}
      {isLoginPopupOpen && (
        <LoginPopup
          onClose={() => setIsLoginPopupOpen(false)}
          onLoginSuccess={handleLoginSuccess}
          onSignupClick={() => {
            setIsLoginPopupOpen(false);
            setIsSignupPopupOpen(true);
          }}
        />
      )}

      {/* Signup Popup */}
      {isSignupPopupOpen && (
        <SignupPopup
          onClose={() => setIsSignupPopupOpen(false)}
          onSignupSuccess={handleSignupSuccess}
          onLoginClick={() => {
            setIsSignupPopupOpen(false);
            setIsLoginPopupOpen(true);
          }}
        />
      )}
    </div>
  );
};

export default Cart;
