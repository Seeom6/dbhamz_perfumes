import asyncHandler from "express-async-handler";
import axios from "axios";
import { CartModel } from "./../models/cart.model.js";
import ApiError from "./../lib/ApiError.js";
import Order from "./../models/order.model.js";
import { getAllItems, getOneItem } from "./general.controller.js";

export const createZiinaPayment = async (amount, currencyCode,userEmail, referenceId) => {
  try {
    const response = await axios.post(
      `${process.env.ZIINA_API_URL}/payment_intent`,
      {
        amount: amount, // Amount in the smallest currency unit (e.g., cents)
        currency_code: currencyCode, // Currency code (e.g., AED)
          customer_email: userEmail, // Customer's email
        reference_id: referenceId, // Unique reference ID for the transaction
      },
      {
        headers: {
          Authorization: `Bearer fe0rVukqETH9QQlXF0ycVJUcv5rPNuN6pKDaKl1bJ8bf+Wh2hOEUEIjkSP0SFgAU`,
          "Content-Type": "application/json",
        },
      }
    );
    console.log(response.data)
    return response.data;
  } catch (error) {
    throw new Error("Failed to create Ziina payment");
  }
};

export const checkOutSession = asyncHandler(async (req, res, next) => {
  const taxPrice = 0;
  const shippingPrice = 0;
  // Fetch the cart
  const cart = await CartModel.findById(req.params.cartId);
  if (!cart) {
    return next(new ApiError("ليس لديك سلة", 404));
  }

  // Calculate the total order price
  const cartPrice = cart.totalPriceAfterDiscount
    ? cart.totalPriceAfterDiscount
    : cart.totalPrice;
  const totalOrderPrice = cartPrice + taxPrice + shippingPrice;

  // Create a payment with Ziina
  try {
    const payment = await createZiinaPayment(
      totalOrderPrice * 100,
      "AED",
        "alslamat407@gmail.com",
      req.user._id
    );

    // Create the order in the database
    const order = await Order.create({
      user: req.user._id,
      cartItems: cart.cartItems,
      taxPrice,
      shippingData : 0,
      totalOrderPrice,
      paymentMethod: "card",
      isPaid: false,
      reference_id: payment.reference_id,
    });

    // Return the payment URL (session URI) to the frontend
    res.status(200).json({
      success: true,
      message: "تم إنشاء الطلب بنجاح",
      paymentUrl: payment.redirect_url,
      order,
    });
  } catch (error) {
    console.log(error)
    return next(new ApiError("فشل في إنشاء الدفع مع Ziina", 500));
  }
});

export const filterOrderForLoggedUser = asyncHandler(async (req, res, next) => {
    if(req.user.roles === "user") req.body.filterObj = {user: req.user._id}
    next()
})

export const getAllOrders = getAllItems(Order);

export const getOneOrder = getOneItem(Order);
