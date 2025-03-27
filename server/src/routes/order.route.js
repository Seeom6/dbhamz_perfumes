import express from "express";

import { allowedTo, protect } from "../controllers/auth.controller.js";
import {
    checkOutSession,
    filterOrderForLoggedUser,
    getAllOrders, getMyOrders,
    getOrder,
    getPaymentStatus,
    webHook,
    createOrder,
    applyingCoupon,
    checkOutSessionId
} from "../controllers/order.controller.js";
import { directVerifyPayment } from '../controllers/payment.controller.js';


const Router = express.Router()

Router.get('/direct-verify/:paymentId', directVerifyPayment);
Router.post("/weeb-hook/fatoorah", webHook)

Router.route("/").get(protect , allowedTo("user","admin") , filterOrderForLoggedUser ,getAllOrders)
Router.get("/my-order",protect ,allowedTo("user"), getMyOrders)
Router.post("/apply-coupon/:id", applyingCoupon)


Router.post("/checkout-payments", protect,allowedTo("user"), checkOutSession)
Router.post("/checkout-payments/:id", protect,allowedTo("user"), checkOutSessionId)

Router.post("/", protect,allowedTo("user"), createOrder)
Router.get("/check-payment-status/:id", getPaymentStatus)
Router.get("/:id", protect, getOrder)



export default Router