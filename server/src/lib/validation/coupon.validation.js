import { check } from "express-validator";
import validator from "./../../middleware/validator.middleware.js";
import ApiError from "../ApiError.js";
import moment from "moment";
import { CouponType } from "../../models/coupon.model.js";

export const createCouponValidation = [
  check("name")
    .notEmpty()
    .withMessage("name of coupon is required")
    .isLength({ min: 2 })
    .withMessage("Too short coupon name")
    .isLength({ max: 50 })
    .withMessage("Too long coupon name"),
    check("type")
    .notEmpty()
    .withMessage("type of coupon is required")
    .isString()
    .withMessage("coupon type must be a string")
    .custom((val) => {
      if (![CouponType.delivery, CouponType.percentage].includes(val)) {
        throw new ApiError(
          `type coupon must be a ${CouponType.delivery} or ${CouponType.percentage}`,
          400
        );
      }
      return true;
    }),
  check("discount")
    .notEmpty()
    .withMessage("name of discount is required")
    .isNumeric()
    .withMessage("discount must be numeric")
    .custom((val) => {
      if (val < 1 || val > 100) {
        throw new ApiError(
          "discount must be less than 100 and greater than 0",
          400
        );
      }
      return true;
    }),
  check("expired")
    .notEmpty()
    .withMessage("expired date is required")
    .custom((value) => {
      console.log("Received expired date:", value); // Debugging line
      if (!moment(value, "YYYY-MM-DD", true).isValid()) {
        throw new ApiError("Invalid date format. Use YYYY-MM-DD", 400);
      }
      const dateValue = moment(value, "YYYY-MM-DD").toDate();
      if (dateValue < new Date()) {
        throw new ApiError("Date must be in the future", 400);
      }
      return true;
    }),
  validator,
];

export const updateCouponValidation = [
  check("name")
    .notEmpty()
    .withMessage("name of coupon is required")
    .isLength({ min: 2 })
    .withMessage("Too short coupon name")
    .isLength({ max: 50 })
    .withMessage("Too long coupon name"),
  check("discount")
    .notEmpty()
    .withMessage("name of discount is required")
    .isNumeric()
    .withMessage("discount must be numeric")
    .custom((val) => {
      if (val < 1 || val > 100) {
        throw new ApiError(
          "discount must be less than 100 and greater than 0",
          400
        );
      }
      return true;
    }),
  check("expired")
    .notEmpty()
    .withMessage("image of expired date is required")
    .custom((value, req, done) => {
      if (!moment(value, "YYYY-MM-DD HH:mm:ss", true).isValid()) {
        throw new ApiError("invalid Date");
      }
      const dateValue = moment(value, "YYYY-MM-DD HH:mm:ss").toDate();
      if (dateValue < new Date()) {
        throw new ApiError("date must be in future");
      }

      return true;
    }),
  validator,
];
