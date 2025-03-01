import { check } from "express-validator";
import validator from "./../../middleware/validator.middleware.js";
import Brand from "../../models/brand.model.js";
import slugify from "slugify";

export const createBrandValidator = [
  check("name")
    .notEmpty()
    .withMessage("name of brand is required")
    .isLength({ min: 2 })
    .withMessage("Too short brand name")
    .isLength({ max: 50 })
    .withMessage("Too long brand name")
    .custom(async(val, { req }) => {
      const brand = await Brand.findOne({name: val})
      if(brand) throw new Error("Name of brand must be unique")
      if (val) req.body.slug = slugify(val);
      return true;
    }),
    check("image")
    .notEmpty()
    .withMessage("image of Brand is required"),

  validator,
];

export const getOneBrandValidator = [
  check("id")
    .isMongoId()
    .withMessage("Invalid brand")
    .custom(async (val) => {
      const brand = await Brand.findById(val);
      if (!brand) throw new Error("Invalid Brand");

      return true;
    }),

  validator,
];

export const updateBrandValidator = [
  check("id")
    .isMongoId()
    .withMessage("Invalid brand")
    .custom(async (val) => {
      const brand = await Brand.findById(val);
      if (!brand) throw new Error("Invalid Brand");

      return true;
    }),
  check("name")
    .optional()
    .isLength({ min: 2 })
    .withMessage("Too short brand name")
    .isLength({ max: 50 })
    .withMessage("Too long brand name")
    .custom((val, { req }) => {
      if (val) req.body.slug = slugify(val);
      return true;
    }),
  validator,
];

export const deleteBrandValidator = [
  check("id")
    .isMongoId()
    .withMessage("Invalid brand")
    .custom(async (val) => {
      const brand = await Brand.findById(val);
      if (!brand) throw new Error("Invalid Brand");

      return true;
    }),
  validator,
];
