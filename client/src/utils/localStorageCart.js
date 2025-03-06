// utils/localStorageCart.js
export const getCartFromLocalStorage = () => {
    const cart = localStorage.getItem("cart");
    return cart ? JSON.parse(cart) : [];
  };
  export const saveCartToLocalStorage = (cart) => {
    localStorage.setItem("cart", JSON.stringify(cart));
  };
  export const addToLocalStorageCart = (product, quantity = 1) => {
    const cart = getCartFromLocalStorage();
    const existingProductIndex = cart.findIndex((item) => item._id === product._id);
  
    if (existingProductIndex !== -1) {
      // If the product already exists, update the quantity
      cart[existingProductIndex].quantity += quantity;
    } else {
      // If the product doesn't exist, add it to the cart
      cart.push({ ...product, quantity });
    }
  
    localStorage.setItem("cart", JSON.stringify(cart));
  };