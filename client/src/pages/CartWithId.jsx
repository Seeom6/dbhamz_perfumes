import React, { useContext, useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import dbhamz from "/assets/dbhamz2.png";
import HeaderImage from "../components/HeaderImage";
import { useDeleteProductInCart, useGetCart } from "../utils/Api/CartEndPoint";
import { CurrencyContext } from "../context/CurrencyContext.jsx";
import { convertCurrency } from "../utils/currency.js";
import CartElements from "../components/featuredComponents/CartElements";

const CartWithId = () => {
  const { data: cartData, isError, isLoading } = useGetCart();
  const {mutate : deleteProductInCart } = useDeleteProductInCart()
  const { currency } = useContext(CurrencyContext);

  // Local state for managing cart items and total price
  const [cartItems, setCartItems] = useState([]);
  const [totalPrice, setTotalPrice] = useState(0);

  // Initialize cart items and total price when cartData is fetched
  useEffect(() => {
    if (cartData) {
      setCartItems(cartData.cartItems);
      setTotalPrice(cartData.totalPrice);
    }
  }, [cartData]);

  // Convert total price to the selected currency
  const convertedPrice = convertCurrency(totalPrice, "KWD", currency);

  // Handle incrementing the quantity of a product
  const handleIncrement = (productId) => {
    const updatedCartItems = cartItems.map((item) =>
      item._id === productId ? { ...item, quantity: item.quantity + 1 } : item
    );
    setCartItems(updatedCartItems);
    updateTotalPrice(updatedCartItems);
  };

  // Handle decrementing the quantity of a product
  const handleDecrement = (productId) => {
    const updatedCartItems = cartItems.map((item) =>
      item._id === productId
        ? { ...item, quantity: Math.max(1, item.quantity - 1) }
        : item
    );
    setCartItems(updatedCartItems);
    updateTotalPrice(updatedCartItems);
  };

  // Handle deleting a product from the cart
  const handleDelete = (productId) => {
    deleteProductInCart(productId)
  };

  // Update the total price based on the cart items
  const updateTotalPrice = (items) => {
    const newTotalPrice = items.reduce(
      (sum, item) => sum + item.price * item.quantity,
      0
    );
    setTotalPrice(newTotalPrice);
  };

  if (isLoading) {
    return <div className="text-center">Loading...</div>;
  }

  if (isError) {
    return <div className="text-center text-red-500">Failed to load cart data.</div>;
  }

  return (
    <div className="w-full flex justify-center items-center">
      <div className="max-w-[1260px] w-full px-2.5 flex flex-col justify-center gap-8 sm:gap-14 md:gap-20 mb-20">
        <HeaderImage image={dbhamz} title={"سلتك العطرية"} />
        <div className="w-full">
          {cartItems.length > 0 ? (
            cartItems.map((item) => (
              <CartElements
                key={item._id}
                data={item}
                currency={currency}
                onDelete={() => handleDelete(item._id)}
                onIncrement={() => handleIncrement(item._id)}
                onDecrement={() => handleDecrement(item._id)}
              />
            ))
          ) : (
            <p className="text-center text-gray-600">Your cart is empty.</p>
          )}
        </div>
        {cartItems.length > 0 && (
          <div className="flex justify-center">
            <div className="bg-white p-6 rounded-lg shadow-lg">
              <h2 className="text-xl font-semibold">
                المجموع النهائي:
                <span className="text-primary text-2xl"> {convertedPrice} </span>
                <span>{currency} </span>
              </h2>
              <button  className="mt-4 w-full bg-primary text-white py-2 rounded-lg hover:bg-blue-600">
                اتمام الدفع
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default CartWithId;