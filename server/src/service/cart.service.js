import ProductModel from "../models/product.model.js";
import {CartModel} from "../models/cart.model.js";
import asyncHandler from "express-async-handler";
import ApiError from "../lib/ApiError.js";
import {CouponModel} from "../models/coupon.model.js";

const cartCalculator = async (cart, coupon) => {
    let total = 0;
    cart.cartItems.forEach((item) => {
        const totalPriceForItem = item.price * item.quantity;
        total += totalPriceForItem;
    })
    cart.totalPrice = total;
    if (coupon) {
        const coup = await CouponModel.findOne({name: coupon, expaired: {$gt: Date.now()}})
        if (!coup) {
            cart.couponStatus = " the coupon is not available or expired "
            return;
        }
        cart.totalPriceAfterDiscount = (total - total * (coup.discount / 100)).toFixed(2);
    }
}

const addProductToCart = asyncHandler(async (productInfo, user) => {
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
      cart.cartItems.push({ product: product._id, price: product.price });
    }
  }
  cartCalculator(cart);
  await cart.save();
  return cart;
});

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
    { $pull: { cartItems: { _id: productId } } },
    { new: true }
  );
  cartCalculator(cart);
  cart = await cart.save();
  return cart;
};

export const updateItemQuantity = async (productInfo, productId, userId) => {
  let cart = await CartModel.findOne({ user: userId });
  if (!cart) {
    throw new ApiError("this item is not exists in cart");
  }
  const cartItemIndex = cart.cartItems.findIndex(
    (item) => item._id.toString() === productId
  );
if(cartItemIndex > -1)  cart.cartItems[cartItemIndex].quantity = productInfo.quantity;

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

export default {
  cartCalculator,
  addProductToCart,
  getProductInCart,
  removeItemFromTheCart,
  updateItemQuantity,
  applyCoupon,
};
