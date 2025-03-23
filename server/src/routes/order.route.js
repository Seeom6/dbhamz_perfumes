import express from "express";

import { allowedTo, protect } from "../controllers/auth.controller.js";
import {
    checkOutSession,
    filterOrderForLoggedUser,
    getAllOrders, getMyOrders,
    getOrder,
    getPaymentStatus,
    weebHook,
    createOder,
    applyingCoupon,
    checkOutSessionId
} from "../controllers/order.controller.js";


const Router = express.Router()

Router.post("/weeb-hook/fatoorah", weebHook)

Router.route("/").get(protect , allowedTo("user","admin") , filterOrderForLoggedUser ,getAllOrders)
Router.get("/my-order",protect ,allowedTo("user"), getMyOrders)
Router.post("/apply-coupon/:id", applyingCoupon)


Router.post("/checkout-payments", protect,allowedTo("user"), checkOutSession)
Router.post("/checkout-payments/:id", protect,allowedTo("user"), checkOutSessionId)

Router.post("/", protect,allowedTo("user"), createOder)
Router.get("/check-payment-status/:id", getPaymentStatus)
Router.get("/:id", protect, getOrder)



export default Router