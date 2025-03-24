import asyncHandler from "express-async-handler";
import ApiError from "./../lib/ApiError.js";
import Order from "./../models/order.model.js";
import { getAllItems } from "./general.controller.js";
import { UserService } from "../service/user.service.js";
import { OrderService } from "../service/order.service.js";
import { CouponService } from "../service/coupon.service.js";
import { CouponType } from "../models/coupon.model.js"
import { MyFatooraService} from "../service/payments/myFatura/myFatura.service.js";
import productService from "../service/product.service.js";

const taxPrice = 0;
const shippingPrice = 0;

export const checkOutSession = asyncHandler(async (req, res, next) => {

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
      paymentStatus: "Pinding",
      paymentId: paymentReponse.Data.InvoiceId,
      reference_id: "referance",
    });

    res.status(200).json({
      success: true,
      message: "تم إنشاء الطلب بنجاح",
      paymentUrl: paymentReponse.Data.InvoiceURL,
    });
  } catch (error) {
    return next(new ApiError("فشل في إنشاء الدفع مع myFatoora", 500));
  }
});

export const checkOutSessionId = asyncHandler(async (req, res, next) => {

  // Fetch the cart
  const { shippingData } = req.body
  const order = await OrderService.getOrderById(req.params.id)
  const user = await UserService.getUserById(req.user.id);

  const finalePrice = order.totalOrderPriceAfterDiscount ? order.totalOrderPriceAfterDiscount : order.totalOrderPrice
  try {
    const paymentReponse = await MyFatooraService.getMyFatooraLink(finalePrice, { user, shippingData})
    order.paymentStatus = "Pending"
    order.shippingData = shippingData
    order.paymentId = `${paymentReponse.Data.InvoiceId}`
    await order.save()
    res.status(200).json({
      success: true,
      message: "تم إنشاء الطلب بنجاح",
      paymentUrl: paymentReponse.Data.InvoiceURL,
    });
  } catch (error) {
    return next(new ApiError("فشل في إنشاء الدفع مع myFatoora", 500));
  }
});

export const createOder = asyncHandler(async (req, res, next) => {
  let items = [];
  const taxPrice = 0;
  const shippingPrice = 0;
  await Promise.all(
      req.body.items.map(async (productInfo) => {
        const product = await productService.getProductById(productInfo._id)
        items.push({
          product: product._id,
          price: product.price,
          quantity: productInfo.quantity
        });
      }))


  const totalPrice = items.reduce((total, item) => total + (item.price * item.quantity), 0);
  const totalOrderPrice = totalPrice + taxPrice + shippingPrice;
  const order = await Order.create({
    user: req.user._id,
    cartItems: items,
    taxPrice,
    shippingData: 0,
    totalOrderPrice,
    paymentMethod: "card",
    isPaid: false,
    paymentStatus: "INIT",
    paymentId: null,
    reference_id: "referance",
  });
  res.status(200).json({
    success: true,
    message: "تم انشاء الطلب بنجاح",
    orderId: order._id,
  });
})

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
    order.status === "Pending"
  ) {
    const payment = await MyFatooraService.getPaymetStatus(order.paymentId);
    order.paymentStatus = payment.Data.InvoiceTransactions[1]?.TransactionStatus ?? "Pending";
    await order.save();
  }
  res.json({
    data: order,
  });
});


export const weebHook = asyncHandler(async (req, res, next) => {
  const { Data } = req.body;
  const payment = await OrderService.getOrderByPaymentId(Data.InvoiceId)
  payment.paymentStatus = Data.TransactionStatus
  await payment.save()
  res.json({

  }) ;
})

export const applyingCoupon = asyncHandler(async (req, res, next) => {
  const order = await OrderService.getOrderById(req.params.id)
  const coupon = await CouponService.getValidCoupon(req.body.coupon)
  let total = 0;
  order.cartItems.forEach((item) => {
      const totalPriceForItem = item.price * item.quantity;
      total += totalPriceForItem;
  })
  if(coupon.type === CouponType.percentage){
    order.totalOrderPriceAfterDiscount = (total - total * (coupon.discount / 100)).toFixed(2);
  }else {
    order.totalOrderPriceAfterDiscount = total - shippingPrice;
  }
  await order.save()
  res.json({
    totalPriceAfterDiscount: order.totalOrderPriceAfterDiscount,
    totalPrice : order.totalOrderPrice,
  });
})
