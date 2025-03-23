import { Router } from "express";
import {
    createCoupon,
    deleteCoupon,
    getCoupons, getOneItemCoupon,
    updateCoupon
} from "../controllers/coupon.controller.js";
import {allowedTo, protect} from "../controllers/auth.controller.js";
import {createCouponValidation, updateCouponValidation} from "../lib/validation/coupon.validation.js";

const router = Router();



router.use(protect, allowedTo("admin"));

router.route('/')
    .get(getCoupons)
    .post(createCouponValidation, createCoupon)

router.route('/:id')
    .get(getOneItemCoupon)
    .put(updateCouponValidation, updateCoupon)
    .delete(deleteCoupon)

export default router