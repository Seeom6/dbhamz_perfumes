import ProductModel from "../models/product.model.js";
import {CartModel} from "../models/cart.model.js";
import ApiError from "../lib/ApiError.js";
import {CouponModel} from "../models/coupon.model.js";
import  productService from "../service/product.service.js"

const cartCalculator = async (cart, coupon) => {
    let total = 0;
    cart.cartItems.forEach((item) => {
        const totalPriceForItem = item.price * item.quantity;
        total += totalPriceForItem;
    })
    cart.totalPrice = total;
    cart.totalPriceAfterDiscount = total;
    if (coupon) {
        const coup = await CouponModel.findOne({name: coupon, expired: {$gt: Date.now()}})
        if (!coup) {
            throw new ApiError("this coupon does not exist or expired", 400);
        }
        cart.totalPriceAfterDiscount = (total - total * (coup.discount / 100)).toFixed(2);
    }
}

async function createCart(productsInfo, user) {
    const items = await createCartItems(productsInfo.items);

    const cart = await CartModel.create({
        cartItems: items,
        user: user._id,
    });
    await cartCalculator(cart, productsInfo.code);
    return cart;
}

const addProductToCart = async (productInfo, user) => {
  const product = await ProductModel.findOne({ _id: productInfo.productId });
  let cart = await CartModel.findOne({ user: user._id });
  if (!cart) {
    cart = await CartModel.create({
      cartItems: [
        {
          product: product._id,
          price: product.price,
          quantity: productInfo.quantity,
        },
      ],
      user: user._id,
    });
  } else {
    const productIndex = cart.cartItems.findIndex(
      (item) => item.product.toString() === productInfo.productId
    );
    if (productIndex >= 0) {
      cart.cartItems[productIndex].quantity += productInfo.quantity;
    } else {
      cart.cartItems.push({ product: product._id, price: product.price, quantity: productInfo.quantity });
    }
  }
  await cartCalculator(cart);
  await cart.save();
  return cart;
};

const getProductInCart = async (userId) => {
  const cart = await CartModel.findOne({ user: userId }).populate({path: "cartItems.product",select: "name price imageCover"});
  if (!cart) {
    throw new ApiError("you don't have any cart");
  }
  return cart;
};

export const removeItemFromTheCart = async (productId, userId) => {
  let cart = await CartModel.findOneAndUpdate(
    { user: userId },
    { $pull: { cartItems: { product: productId } } },
    { new: true }
  );
  await cartCalculator(cart);
  cart = await cart.save();
  return cart;
};

export const updateItemQuantity = async (productInfo, productId, userId) => {
  let cart = await CartModel.findOne({ user: userId });
  if (!cart) {
    throw new ApiError("this item is not exists in cart");
  }
  const cartItemIndex = cart.cartItems.findIndex(
    (item) => item.product.toString() === productId
  );
  cart.cartItems[cartItemIndex].quantity = productInfo.quantity;

  await cartCalculator(cart);
  cart = await cart.save();
  return cart;
};

export const applyCoupon = async (couponData , userId , next)=>{
  const coupon = await CouponModel.findOne({
    name : couponData,
    expired : {$gt : Date.now()}
  });
  if(!coupon){
    throw new ApiError("هذا الكوبون منتهي الصلاحية, او ليس موجود")
  }

  const cart = await CartModel.findOne({user : userId});

  const totalPrice = cart.totalPrice;


   // 99.23
  cart.totalPriceAfterDiscount = (
      totalPrice -
      (totalPrice * coupon.discount) / 100
  ).toFixed(2);
  await cart.save();

return cart
}

async function createCartItems (productsInfo)  {
    const items = await Promise.all(
        productsInfo.map(async (productInfo) => {
        const product = await productService.getProductById(productInfo.id)
        return {
            product: product._id,
            price: product.price,
            quantity: productInfo.quantity
        };
    }))
    return items
}

export default {
  cartCalculator,
  addProductToCart,
  getProductInCart,
  removeItemFromTheCart,
  updateItemQuantity,
  applyCoupon,
    createCart
};
