import express from "express";
import {
  createCoupon,
  getCoupons,
  getOneCoupon,
  deleteOneCoupon,
  updateCoupon,
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
  .delete(protect, allowedTo("admin"), deleteOneCoupon)
  .patch(
    protect,
    allowedTo("admin"),
    updateCoupon
  );

export default Router;
