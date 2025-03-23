import React, { createContext, useEffect, useState } from "react";
import { useGetMe } from "../utils/Api/AuthenticationEndPoint";
import { toast } from "react-toastify";
import { getCartFromLocalStorage, saveCartToLocalStorage } from "../utils/localStorageCart";
import { convertCurrency } from "../utils/currency";
import { useAllProducts } from "../utils/Api/ApiEndPoint";

// Create a context for currency
export const Context = createContext();

export const StateContext = ({ children }) => {
  const [isLogin, setIsLogin] = useState(false);
  const [userData, setUserData] = useState({});
  const [currency, setCurrency] = useState("KWD"); // Default currency

  const [cartItems, setCartItems] = useState([]);
  const [AllProducts, setAllProducts] = useState([]);
  const [totalPrice, setTotalPrice] = useState(0);
  const [priceAfterDiscount , setPriceAfterDiscount] = useState(totalPrice)
  const [totalQuantities, setTotalQuantities] = useState(0);
  const [qty, setQty] = useState(1);
  const [isAddCartLoading, setIsAddCartLoading] = useState(false);

  let foundProduct;
  let index;

  const updateCurrency = (newCurrency) => {
    setCurrency(newCurrency);
  };

  const { data: myAuth, isSuccess, isError } = useGetMe();
  const { data: products, error : allProError, isError: isAllProductError, isLoading: isAllProLoad } = useAllProducts();

  // Handle authentication state
  useEffect(() => {
    if (isError) {
      setIsLogin(false);
      setUserData({});
    }
    if (isSuccess) {
      setIsLogin(true);
      setUserData(myAuth);
    }
  }, [myAuth, isSuccess, isError]);

  // Update AllProducts when products data is fetched
  useEffect(() => {
    if (products && !isAllProductError) {
      setAllProducts(products);
    }
  }, [products, isAllProductError]);

  // Load cart items from local storage on component mount
  useEffect(() => {
    const savedCart = getCartFromLocalStorage();
    if (savedCart.length > 0) {
      setCartItems(savedCart);
      const totalPrice = savedCart.reduce((total, item) => total + item.price * item.quantity, 0);
      const totalQuantities = savedCart.reduce((total, item) => total + item.quantity, 0);
      const priceOnChangeCurrency = convertCurrency(totalPrice, "KWD", currency);
      setTotalPrice(priceOnChangeCurrency);
      setTotalQuantities(totalQuantities);
    }
  }, []);

  // Save cart items to local storage whenever cartItems changes
  useEffect(() => {
    saveCartToLocalStorage(cartItems);
  }, [cartItems]);

  // Recalculate totalPrice whenever currency changes
  useEffect(() => {
    const totalPriceInKWD = cartItems.reduce((total, item) => total + item.price * item.quantity, 0);
    const convertedTotalPrice = convertCurrency(totalPriceInKWD, "KWD", currency);
    setTotalPrice(convertedTotalPrice);
  }, [currency, cartItems]);

  const onAdd = (product, quantity) => {
    setIsAddCartLoading(true);
    const checkProInCart = cartItems.find((item) => item._id === product._id);

    const totalPriceInKWD = product.price * quantity;
    const convertedTotalPrice = convertCurrency(totalPriceInKWD, "KWD", currency);

    setTotalPrice((prevTotalPrice) => prevTotalPrice + convertedTotalPrice);
    setTotalQuantities((prevTotalQuantities) => prevTotalQuantities + quantity);

    if (checkProInCart) {
      const updatedCartItems = cartItems.map((cartProduct) => {
        if (cartProduct._id === product._id)
          return {
            ...cartProduct,
            quantity: cartProduct.quantity + quantity,
          };
        return cartProduct;
      });
      setCartItems(updatedCartItems);
    } else {
      product.quantity = quantity;
      setCartItems([...cartItems, { ...product }]);
    }
    setIsAddCartLoading(false);
    toast.success(`تمت أضافة المنتج الى السلة`);
  };

  const onRemove = (product) => {
    foundProduct = cartItems.find((item) => item._id === product._id);
    let newCartItems = cartItems.filter((item) => item._id !== product._id);

    const totalPriceInKWD = foundProduct.price * foundProduct.quantity;
    const convertedTotalPrice = convertCurrency(totalPriceInKWD, "KWD", currency);

    setTotalPrice((prevTotalPrice) => prevTotalPrice - convertedTotalPrice);
    setTotalQuantities((prevTotalQuantities) => prevTotalQuantities - foundProduct.quantity);
    setCartItems(newCartItems);
  };

  const toggleCartItemQuantity = (id, value) => {
    const updatedCartItems = cartItems.map((item) => {
      if (item._id === id) {
        if (value === "inc") {
          const totalPriceInKWD = item.price;
          const convertedTotalPrice = convertCurrency(totalPriceInKWD, "KWD", currency);
          setTotalPrice((prevTotalPrice) => prevTotalPrice + convertedTotalPrice);
          setTotalQuantities((prevTotalQuantities) => prevTotalQuantities + 1);
          return { ...item, quantity: item.quantity + 1 };
        } else if (value === "dec" && item.quantity > 1) {
          const totalPriceInKWD = item.price;
          const convertedTotalPrice = convertCurrency(totalPriceInKWD, "KWD", currency);
          setTotalPrice((prevTotalPrice) => prevTotalPrice - convertedTotalPrice);
          setTotalQuantities((prevTotalQuantities) => prevTotalQuantities - 1);
          return { ...item, quantity: item.quantity - 1 };
        }
      }
      return item;
    });

    setCartItems(updatedCartItems);
  };

  const incQty = () => {
    setQty((prevQty) => prevQty + 1);
  };

  const decQty = () => {
    setQty((prevQty) => {
      if (prevQty - 1 < 1) return 1;
      return prevQty - 1;
    });
  };

  return (
    <Context.Provider
      value={{
        userData,
        currency,
        updateCurrency,
        isLogin,
        cartItems,
        totalPrice,
        AllProducts,
        incQty,
        onRemove,
        onAdd,
        decQty,
        isAllProLoad,
        isAllProductError,
        toggleCartItemQuantity,
        totalQuantities,
        allProError,
        setCartItems,
        setTotalPrice,
        setTotalQuantities,
        priceAfterDiscount,
        setPriceAfterDiscount,
        isAddCartLoading,
        qty,
      }}
    >
      {children}
    </Context.Provider>
  );
};