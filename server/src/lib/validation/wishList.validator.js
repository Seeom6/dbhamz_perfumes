import { check } from "express-validator";
import validator from "./../../middleware/validator.middleware.js";

export const createWishListValidator = [
    check("productId")
        .notEmpty()
        .withMessage("name productId in param is required")
        .isMongoId()
        .withMessage("productId is invalid"),
    validator,
];

export const deleteWishListValidator = [
    ...createWishListValidator
]



