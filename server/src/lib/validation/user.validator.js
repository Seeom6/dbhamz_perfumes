import { check } from "express-validator";
import slugify from "slugify";

import validator from "../../middleware/validator.middleware.js";
import ApiError from "../ApiError.js";
import User from "../../models/user.model.js";

export const createUserValidator = [
  check("firstName")
    .isLength({ min: 3 })
    .withMessage("First name must be at least 3 chars")
    .isLength({ max: 30 })
    .withMessage("Too long first name")
    .notEmpty()
    .withMessage("First name is required"),

  check("lastName")
    .isLength({ min: 3 })
    .withMessage("Last name must be at least 3 chars")
    .isLength({ max: 30 })
    .withMessage("Too long last name")
    .notEmpty()
    .withMessage("last name is required")
    .custom((val, { req }) => {
      if (val && req.body.firstName) {
        req.body.slug = slugify(val + "-" + req.body.firstName);
      }
      return true;
    }),

  check("email")
    .optional()
    .isEmail()
    .withMessage("Invalid email address")
    .custom(async (value) => {
      const user = await User.findOne({ email: value });

      if (user) throw new ApiError("E-mail already exist", 400);
      return true;
    }),

  check("password")
    .notEmpty()
    .withMessage("Password is required")
    .isLength({ min: 6 })
    .withMessage("Password must be at least 6 characters"),

  check("profileImage").optional(),

  check("role").optional(),

  check("phone")
    .notEmpty()
    .withMessage("Product imageCover is required")
    .isMobilePhone(["ar-SA", "ar-AE", "ar-OM", "ar-KW", "ar-IQ"])
    .withMessage("phone number is not correct")
    .custom(async (value) => {
      const user = await User.findOne({ phone: value });

      if (user) throw new ApiError("Phone number already exist", 400);
      return true;
    }),

  check("images")
    .optional()
    .isArray()
    .withMessage("images should be array of string"),

  validator,
];

export const getOneUserValidator = [
  check("id")
    .isMongoId()
    .withMessage("Invalid User")
    .custom(async (val) => {
      const user = await User.findById(val);
      if (!user) throw new Error("Invalid User");
      return true;
    }),

  validator,
];

export const updateUserValidator = [
  check("id")
    .isMongoId()
    .withMessage("Invalid User")
    .custom(async (val) => {
      const user = await User.findById(val);
      if (!user) throw new Error("Invalid User");

      return true;
    }),
  check("firstName")
    .optional()
    .isLength({ min: 3 })
    .withMessage("First name must be at least 3 chars")
    .isLength({ max: 30 })
    .withMessage("Too long first name"),

  check("lastName")
    .optional()
    .isLength({ min: 3 })
    .withMessage("Last name must be at least 3 chars")
    .isLength({ max: 30 })
    .withMessage("Too long last name")
    .custom((val, { req }) => {
      if (val && req.body.firstName) {
        req.body.slug = slugify(val + "-" + req.body.firstName);
      } else {
        throw new ApiError("please enter your first name and last name");
      }
      return true;
    }),

  check("email")
    .optional()
    .isEmail()
    .withMessage("Invalid email address")
    .custom(async (value) => {
      const user = await User.findOne({ email: value });

      if (user) throw new ApiError("E-mail already exist", 400);
      return true;
    }),

  check("password")
    .optional()
    .isLength({ min: 6 })
    .withMessage("Password must be at least 6 characters"),

  check("profileImage").optional(),

  check("role").optional(),

  check("phone")
    .optional()
    .isMobilePhone(["ar-SA", "ar-AE", "ar-OM", "ar-KW", "ar-IQ"])
    .withMessage("phone number is not correct")
    .custom(async (value) => {
      const user = await User.findOne({ phone: value });

      if (user) throw new ApiError("Phone number already exist", 400);
      return true;
    }),

  check("images")
    .optional()
    .isArray()
    .withMessage("images should be array of string"),

  validator,
];

export const deleteUserValidator = [
  check("id")
    .isMongoId()
    .withMessage("Invalid User")
    .custom(async (val) => {
      const user = await User.findById(val);
      if (!user) throw new Error("Invalid User");

      return true;
    }),
  validator,
];

export const changeUserPasswordValidator = [
  check("id")
    .isMongoId()
    .withMessage("Invalid User")
    .custom(async (val) => {
      const user = await User.findById(val);
      if (!user) throw new Error("Invalid User");

      return true;
    }),
    check("password")
    .notEmpty()
    .withMessage("Enter password plz")
    .isLength({ min: 6 })
    .withMessage("Password must be at least 6 characters"),


  validator,
];