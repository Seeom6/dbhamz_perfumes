import React, { useContext, useEffect, useState } from "react";
import HeaderImage from "../components/HeaderImage";
import dbhamz from "/assets/dbhamz2.png";
import CartElements from "../components/featuredComponents/CartElements";
import {
  getCartFromLocalStorage,
  saveCartToLocalStorage,
} from "../utils/localStorageCart.js";
import { CurrencyContext } from "../context/CurrencyContext.jsx";
import { convertCurrency } from "../utils/currency.js";

const Cart = () => {
  const [cart, setCart] = useState([]);
  const [orderCost, setOrderCost] = useState(0);
  const { currency } = useContext(CurrencyContext);
  const convertedPrice = convertCurrency(orderCost, "KWD", currency);

  // Fetch cart data from localStorage on component mount
  useEffect(() => {
    const localCart = getCartFromLocalStorage();
    setCart(localCart);
  }, []);

  // Calculate the total cost of the cart whenever the cart changes
  useEffect(() => {
    const totalCost = cart.reduce(
      (sum, item) => sum + item.price * item.quantity,
      0
    );
    setOrderCost(totalCost);
  }, [cart]);

  // Handle deleting a product from the cart
  const handleDelete = (productId) => {
    const updatedCart = cart.filter((item) => item._id !== productId);
    setCart(updatedCart);
    saveCartToLocalStorage(updatedCart); // Save the updated cart to localStorage
  };

  // Handle incrementing the quantity of a product
  const handleIncrement = (productId) => {
    const updatedCart = cart.map((item) =>
      item._id === productId ? { ...item, quantity: item.quantity + 1 } : item
    );
    setCart(updatedCart);
    saveCartToLocalStorage(updatedCart); // Save the updated cart to localStorage
  };

  // Handle decrementing the quantity of a product
  const handleDecrement = (productId) => {
    const updatedCart = cart.map((item) =>
      item._id === productId
        ? { ...item, quantity: Math.max(1, item.quantity - 1) }
        : item
    );
    setCart(updatedCart);
    saveCartToLocalStorage(updatedCart); // Save the updated cart to localStorage
  };

  return (
    <div className="w-full flex justify-center items-center">
      <div className="max-w-[1260px] w-full px-2.5 flex flex-col justify-center gap-8 sm:gap-14 md:gap-20 mb-20">
        <HeaderImage image={dbhamz} title={"سلتك العطرية"} />
        <div className="w-full">
          {cart.length > 0 ? (
            cart.map((item) => (
              <CartElements
                key={item._id}
                data={item}
                onDelete={() => handleDelete(item._id)}
                onIncrement={() => handleIncrement(item._id)}
                onDecrement={() => handleDecrement(item._id)}
              />
            ))
          ) : (
            <p className="text-center text-gray-600">Your cart is empty.</p>
          )}
        </div>
        {cart.length > 0 && (
          <div className="flex justify-center ">
            <div className="bg-white p-6 rounded-lg shadow-lg">
              <h2 className="text-xl font-semibold">
                المجموع النهائي:
                <span>{convertedPrice} </span>  
                <span>{currency} </span>  
                   
             
              </h2>
              <button className="mt-4 w-full bg-primary text-white py-2 rounded-lg hover:bg-blue-600">
                اتمام الدفع
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default Cart;
