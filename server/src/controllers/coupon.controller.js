import asyncHandler from "express-async-handler";

import { CouponModel } from "../models/coupon.model.js";
import {
  createItem,
  deleteItem,
  getAllItems,
  getOneItem,
  updateItem,
} from "./general.controller.js";
import { CouponService } from "../service/coupon.service.js";
import ApiError from "../lib/ApiError.js";

export const createCoupon = createItem(CouponModel);

export const getCoupons = getAllItems(CouponModel);

export const getOneItemCoupon = getOneItem(CouponModel);

export const updateCoupon = asyncHandler(async (req, res, next) => {
  const couponById = await CouponService.getCouponById(req.params.id);
  if (couponById.code !== req.body.code) {
    const coupon = await CouponService.getCouponByName(req.body.name, false);
    if (coupon) {
      throw new ApiError(`Coupon with name ${coupon.name} already exists`);
    }
  }

  const item = await CouponModel.findByIdAndUpdate(req.params.id, req.body, {
    new: true,
  });

  if (!item) return next(new ApiError("Not Found item", 404));

  res.status(200).json({ data: item });
});
export const deleteCoupon = deleteItem(CouponModel);
