import {CouponModel} from "../models/coupon.model.js";
import ApiError from "../lib/ApiError.js";


const getCouponByName = async (name, throwError = true)=>{
    const coupon = await CouponModel.findOne({
        name: name,
    })
    if(!coupon && throwError){
        throw new ApiError(`Coupon with name ${name} not found`, 404)
    }
    return coupon
}

const getCouponById = async (id, throwError = true)=>{
    const coupon = await CouponModel.findOne({
        _id: id,
    })
    if(!coupon && throwError){
        throw new ApiError(`Coupon with name ${name} not found`, 404)
    }
    return coupon
}

const getValidCoupon = async (code)=>{
    const coupon = await CouponModel.findOne({
        name : code,
        expired : {$gt : Date.now()}
      });
      if(!coupon){
        throw new ApiError("هذا الكوبون منتهي الصلاحية, او ليس موجود")
      }
      return coupon;
}

export const CouponService = {
    getCouponByName,
    getCouponById,
    getValidCoupon
}