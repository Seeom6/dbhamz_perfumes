import express from "express";

import { allowedTo, protect } from "../controllers/auth.controller.js";
import { checkOutSession, filterOrderForLoggedUser, getAllOrders, getOneOrder } from "../controllers/order.controller.js";



const Router = express.Router()


Router.route("/").get(protect , allowedTo("user","admin") , filterOrderForLoggedUser ,getAllOrders)
Router.route("/:id").get(protect ,getOneOrder)

Router.route("/checkout-payment/:cartId").get(protect,allowedTo("user"), checkOutSession)


export default Router