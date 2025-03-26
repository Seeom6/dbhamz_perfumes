import { check } from "express-validator";
import slugify from "slugify";
import { isValidPhoneNumber } from "libphonenumber-js";
import validator from "../../middleware/validator.middleware.js";
import ApiError from "../ApiError.js";
import User from "../../models/user.model.js";



export const signupValidator = [
  check("firstName")
    .isLength({ min: 3 })
    .withMessage("يجب أن يكون الاسم الأول على الأقل 3 أحرف")
    .isLength({ max: 30 })
    .withMessage("الاسم الأول طويل جداً")
    .notEmpty()
    .withMessage("الاسم الأول مطلوب"),

  check("lastName")
    .isLength({ min: 3 })
    .withMessage("يجب أن يكون الاسم الأخير على الأقل 3 أحرف")
    .isLength({ max: 30 })
    .withMessage("الاسم الأخير طويل جداً")
    .notEmpty()
    .withMessage("الاسم الأخير مطلوب")
    .custom((val, { req }) => {
      if (val && req.body.firstName) {
        req.body.slug = slugify(req.body.firstName + "-" + val);
      }
      return true;
    }),

  check("email")
    .optional()
    .isEmail()
    .withMessage("بريد إلكتروني غير صالح")
    .custom(async (value) => {
      const user = await User.findOne({ email: value });
      if (user) throw new ApiError("البريد الإلكتروني موجود بالفعل", 400);
      return true;
    }),

  check("password")
    .notEmpty()
    .withMessage("كلمة المرور مطلوبة")
    .isLength({ min: 6 })
    .withMessage("يجب أن تكون كلمة المرور على الأقل 6 أحرف")
,

  check("phone")
    .notEmpty()
    .withMessage("رقم الهاتف مطلوب")
    .custom((value) => {
      const supportedCountries = ["SA", "AE", "OM", "KW", "QA"];
      const isValid = supportedCountries.some((country) =>
        isValidPhoneNumber(value, country)
      );
      if (!isValid) {
        throw new Error("الرقم غير صحيح أو غير مدعوم");
      }
      return true;
    })
    .custom(async (value) => {
      const user = await User.findOne({ phone: value });
      if (user) {
        throw new Error("رقم الهاتف موجود بالفعل");
      }
      return true;
    }),

  validator,
];
export const loginValidator = [
  check("email").optional().isEmail().withMessage("Invalid email address"),

  check("password")
    .notEmpty()
    .withMessage("Password is required")
    .isLength({ min: 6 })
    .withMessage("Password must be at least 6 characters"),

  check("phone")
    .notEmpty()
    .withMessage("Phone number is required")
    // .isMobilePhone(["ar-SA", "ar-AE", "ar-OM", "ar-KW", "ar-IQ"])
    .withMessage("phone number is not correct"),

  validator,
];

// export const getOneUserValidator = [
//   check("id")
//     .isMongoId()
//     .withMessage("Invalid User")
//     .custom(async (val) => {
//       const user = await User.findById(val);
//       if (!user) throw new Error("Invalid User");
//       return true;
//     }),

//   validator,
// ];

// export const updateUserValidator = [
//   check("id")
//     .isMongoId()
//     .withMessage("Invalid User")
//     .custom(async (val) => {
//       const user = await User.findById(val);
//       if (!user) throw new Error("Invalid User");

//       return true;
//     }),
//   check("firstName")
//     .optional()
//     .isLength({ min: 3 })
//     .withMessage("First name must be at least 3 chars")
//     .isLength({ max: 30 })
//     .withMessage("Too long first name"),

//   check("lastName")
//     .optional()
//     .isLength({ min: 3 })
//     .withMessage("Last name must be at least 3 chars")
//     .isLength({ max: 30 })
//     .withMessage("Too long last name")
//     .custom((val, { req }) => {
//       if (val && req.body.firstName) {
//         req.body.slug = slugify(val + "-" + req.body.firstName);
//       } else {
//         throw new ApiError("please enter your first name and last name");
//       }
//       return true;
//     }),

//   check("email")
//     .optional()
//     .isEmail()
//     .withMessage("Invalid email address")
//     .custom(async (value) => {
//       const user = await User.findOne({ email: value });

//       if (user) throw new ApiError("E-mail already exist", 400);
//       return true;
//     }),

//   check("password")
//     .optional()
//     .isLength({ min: 6 })
//     .withMessage("Password must be at least 6 characters"),

//   check("profileImage").optional(),

//   check("role").optional(),

//   check("phone")
//     .optional()
//     .isMobilePhone(["ar-SA", "ar-AE", "ar-OM", "ar-KW", "ar-IQ"])
//     .withMessage("phone number is not correct")
//     .custom(async (value) => {
//       const user = await User.findOne({ phone: value });

//       if (user) throw new ApiError("Phone number already exist", 400);
//       return true;
//     }),

//   check("images")
//     .optional()
//     .isArray()
//     .withMessage("images should be array of string"),

//   validator,
// ];

// export const deleteUserValidator = [
//   check("id")
//     .isMongoId()
//     .withMessage("Invalid User")
//     .custom(async (val) => {
//       const user = await User.findById(val);
//       if (!user) throw new Error("Invalid User");

//       return true;
//     }),
//   validator,
// ];
