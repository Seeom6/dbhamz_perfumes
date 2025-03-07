import express from "express";
import {
  createCoupon,
  getCoupons,
  getOneCoupon,
  updateCoupon,
  deleteCoupon,
} from "../controllers/coupon.controller.js";

import { protect, allowedTo } from "../controllers/auth.controller.js";

const Router = express.Router();


Router.route("/")
  .post(
    protect,
    allowedTo("admin"),
    createCoupon
  )
  .get(getCoupons);
Router.route("/:id")
  .get(getOneCoupon)
  .delete(protect, allowedTo("admin"), deleteCoupon)
  .patch(
    protect,
    allowedTo("admin"),
    updateCoupon
  );

export default Router;
