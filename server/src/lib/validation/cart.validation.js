import { check, param, } from "express-validator";
import validator from "./../../middleware/validator.middleware.js";
import ApiError from "../ApiError.js";

export const addProductToCartValidator = [
    check("productId")
        .notEmpty()
        .withMessage("name productId in body is required")
        .isMongoId()
        .withMessage("productId is invalid"),
    check("quantity")
        .notEmpty()
        .withMessage("quantity in body is required")
        .isNumeric()
        .withMessage("quantity is must be a number")
        .custom((value) => {
            if(value <= 0) throw new ApiError("quantity must be greater than 0");
            if(value > 100) throw new ApiError("quantity must be less than 100");
            return true;
        })
    ,
    validator,
];


export const removeItemFromCartValidator = [
    check("id")
        .notEmpty()
        .withMessage("name id in param is required")
        .isMongoId()
        .withMessage("productId is invalid"),
    validator,
];

export const updateCartQuantityValidator = [
    check("quantity")
        .notEmpty()
        .withMessage("quantity in body is required")
        .isNumeric()
        .withMessage("quantity is must be a number")
        .custom((value) => {
            if(value <= 0) throw new ApiError("quantity must be greater than 0");
            if(value > 100) throw new ApiError("quantity must be less than 100");
            return true;
        }),
    validator,
];





