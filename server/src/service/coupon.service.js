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

export const CouponService = {
    getCouponByName
}