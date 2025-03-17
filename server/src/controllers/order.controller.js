import asyncHandler from "express-async-handler";
import { CartModel } from "./../models/cart.model.js";
import ApiError from "./../lib/ApiError.js";
import Order from "./../models/order.model.js";
import { getAllItems, getOneItem } from "./general.controller.js";
import { UserService } from "../service/user.service.js";
import axios from "axios";
import { OrderService } from "../service/order.service.js";
import {
  ZiinaPaymentStatus as ZinaPaymentStatus,
  ZiinaPaymentStatus,
} from "../service/payments/ziina/ziina.types.js";
import { ZinnaService } from "../service/payments/ziina/zinna.service.js";
import {getMyFatooraLink, MyFatooraService} from "../service/payments/myFatura/myFatura.service.js";
import productService from "../service/product.service.js";

export const checkOutSession = asyncHandler(async (req, res, next) => {
  const taxPrice = 0;
  const shippingPrice = 0;
  // Fetch the cart
  let items = [];
  await Promise.all(
      req.body.items.map(async (productInfo) => {
        const product = await productService.getProductById(productInfo.id)
        items.push({
          product: product._id,
          price: product.price,
          quantity: productInfo.quantity
        });
      }))

  const totalPrice = items.reduce((total, item) => total + (item.price * item.quantity), 0);
  const totalOrderPrice = totalPrice + taxPrice + shippingPrice;
  const user = await UserService.getUserById(req.user.id);
  try {
    const paymentReponse = await MyFatooraService.getMyFatooraLink(totalOrderPrice, user)
    const order = await Order.create({
      user: req.user._id,
      cartItems: items,
      taxPrice,
      shippingData: 0,
      totalOrderPrice,
      paymentMethod: "card",
      isPaid: false,
      paymentStatus: "init",
      paymentId: paymentReponse.Data.InvoiceId,
      reference_id: "referance",
    });

    res.status(200).json({
      success: true,
      message: "تم إنشاء الطلب بنجاح",
      paymentUrl: paymentReponse.Data,
      order,
    });
  } catch (error) {
    console.log(error.message);
    return next(new ApiError("فشل في إنشاء الدفع مع myFatoora", 500));
  }
});

export const filterOrderForLoggedUser = asyncHandler(async (req, res, next) => {
  if (req.user.roles === "user") req.body.filterObj = { user: req.user._id };
  next();
});

export const getPaymentStatus = asyncHandler(async (req, res, next) => {
  try {
    const order = await OrderService.getOrderById(req.params.id)
    const payment = await MyFatooraService.getPaymetStatus(order.paymentId, "InvoiceId")
    res.json({ payment: payment });
  } catch (error) {
    console.log(error.message);
    next(error);
  }
});

export const getAllOrders = getAllItems(Order);

export const getMyOrders = asyncHandler(async (req, res, next) => {
  const user = await UserService.getUserById(req.user.id);
  const order = await OrderService.getMyOrders(user._id);
  res.status(200).json({
    data: order,
  });
});

export const getOrder = asyncHandler(async (req, res, next) => {
  const order = await OrderService.getOrderById(req.params.id);
  if (
    ![
      ZiinaPaymentStatus.canceled,
      ZiinaPaymentStatus.canceled,
      ZiinaPaymentStatus.failed,
    ].includes(order.status)
  ) {
    const payment = await ZinnaService.getPayment(order.paymentId);
    order.status = payment.status;
    await order.save();
  }
  res.json({
    data: order,
  });
});
