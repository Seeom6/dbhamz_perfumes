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


import crypto from 'crypto';

// Add this verification function (can be in a separate utils file if preferred)
const verifySignature = (receivedSig, payload) => {
  const secret = process.env.MYFATOORA_WEBHOOK_SECRET;
  const hmac = crypto.createHmac('sha256', secret);
  hmac.update(JSON.stringify(payload));
  const expectedSig = hmac.digest('hex');
  return crypto.timingSafeEqual(
    Buffer.from(receivedSig),
    Buffer.from(expectedSig)
  );
};


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
// controllers/payment.controller.js
export const checkOutSessionId = asyncHandler(async (req, res, next) => {
  const { shippingData } = req.body;
  
  try {
    const order = await OrderService.getOrderById(req.params.id);
    const user = await UserService.getUserById(req.user.id);

    await UserService.updateUser(req.user.id, {
      address: {
        city: shippingData.city,
        country: shippingData.country,
        street: shippingData.street,
        area: shippingData.area,
      },
    });
    // Calculate final price with proper rounding
    const finalPrice = Math.round(
      (order.totalOrderPriceAfterDiscount || order.totalOrderPrice) + 
      order.shippingPrice
    );
    const paymentResponse = await MyFatooraService.getMyFatooraLink(finalPrice, { 
      user, 
      shippingData,
      orderId: order._id // Pass order ID for reference
    });

    // Update order status
    await OrderService.updateOrder(order._id, {
      paymentStatus: "Pending",
      shippingData,
      paymentId: paymentResponse.Data.InvoiceId,
      paymentMethod: "card"
    });

    res.status(200).json({
      success: true,
      message: "تم تحويلك إلى صفحة الدفع الآمن",
      paymentUrl: paymentResponse.Data.InvoiceURL,
      invoiceId: paymentResponse.Data.InvoiceId
    });

  } catch (error) {
    return next(new ApiError("تعذر الاتصال بخدمة الدفع، يرجى المحاولة لاحقاً", 503));
  }
});
export const createOrder = asyncHandler(async (req, res, next) => {
  let items = [];
  const taxPrice = 0;
  
  // Get products and build items array
  await Promise.all(
    req.body.items.map(async (productInfo) => {
      const product = await productService.getProductById(productInfo._id);
      items.push({
        product: product._id,
        price: product.priceAfterDiscount ?product.priceAfterDiscount: product.price ,
        quantity: productInfo.quantity,
        productImage: product.imageCover, // Store the image cover URL
        productName: product.name, // Store product name for reference
        productSlug: product.slug // Store product slug if needed
      });
    })
  );

  // Calculate total items
  const totalItems = items.reduce((total, item) => total + item.quantity, 0);

  // Calculate shipping price based on number of items
  let shippingPrice = 0;
  if (totalItems <= 1) {
    shippingPrice = 4; 
  } else if (totalItems <= 4) {
    shippingPrice = 6; 
  } else if (totalItems <= 6) {
    shippingPrice = 8;
  } else if (totalItems <= 8) {
    shippingPrice = 10; 
  } else if (totalItems <= 0) {
    shippingPrice = 0; 
  } else {
    shippingPrice = 10; 
  }

  const totalPrice = items.reduce((total, item) => total + (item.price * item.quantity), 0);
  const totalOrderPrice = totalPrice + taxPrice + shippingPrice;

  const order = await Order.create({
    user: req.user._id,
    cartItems: items,
    taxPrice,
    shippingPrice,
    totalOrderPrice,
    paymentMethod: "card",
    isPaid: false,
    paymentStatus: "INIT",
    paymentId: null,
    reference_id: "referance",
    totalItems,
  });

  res.status(200).json({
    success: true,
    message: "تم انشاء الطلب بنجاح",
    orderId: order._id,
    shippingPrice,
    totalItems,
    cartItems: order.cartItems.map(item => ({
      ...item.toObject(),
      productImage: item.productImage // Ensure image is included in response
    }))
  });
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

export const webHook = async (req, res) => {
  try {
    const signature = req.headers['x-fatoorah-signature'];
    const payload = req.body;

    // Verify signature
    if (!verifySignature(signature, payload)) {
      return res.status(401).send('Invalid signature');
    }

    const orderId = payload.UserDefinedField;
    const order = await Order.findById(orderId);

    if (!order) {
      return res.status(404).send('Order not found');
    }

    // Update order based on payment status
    switch (payload.InvoiceStatus) {
      case 'Paid':
        order.isPaid = true;
        order.paidAt = new Date();
        order.paymentStatus = 'paid';
        break;
      case 'Failed':
        order.paymentStatus = 'failed';
        break;
      case 'Expired':
        order.paymentStatus = 'expired';
        break;
    }

    await order.save();
    res.status(200).send('Webhook processed');
  } catch (err) {
    res.status(500).send('Webhook processing failed');
  }
};




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
