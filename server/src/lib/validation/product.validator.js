import { check } from "express-validator";
import validator from "../../middleware/validator.middleware.js";
import Brand from "../../models/brand.model.js";
import slugify from "slugify";
import ApiError from "../ApiError.js";
import Product from "../../models/product.model.js";

export const createProductValidator = [
  check("name")
    .isLength({ min: 3 })
    .withMessage("product title must be at least 3 chars")
    .isLength({ max: 100 })
    .withMessage("Too long product title")
    .notEmpty()
    .withMessage("product title is required")
    .custom((val, { req }) => {
      if (val) req.body.slug = slugify(val);
      return true;
    }),

  check("description")
    .notEmpty()
    .withMessage("description of title is required")
    .isLength({ min: 10 })
    .withMessage("description must be at least 10 chars")
    .isLength({ max: 700 })
    .withMessage("Too long description content"),

  check("quantity")
    .notEmpty()
    .withMessage("quantity of product is required")
    .isNumeric()
    .withMessage("quantity of product must be number")
    .custom((value) => {
      if (value <= 0) throw new ApiError("quantity must be greater than 0");
      return true;
    }),

  check("sold")
    .optional()
    .isNumeric()
    .withMessage("sold product quantity must be number")
    .custom((value) => {
      if (value < 0)
        throw new ApiError("sold product quantity must positive number", 400);
      return true;
    }),

  check("price")
    .notEmpty()
    .withMessage("Price of product is required")
    .isFloat()
    .withMessage("Price of product must be number")
    .toFloat()
    .custom((value, { req }) => {
      if (value <= 0) {
        throw new ApiError("price of product must be positive number", 400);
      }
      return true;
    }),

  check("priceAfterDiscount")
    .optional()
    .toFloat()
    .isNumeric()
    .withMessage("Price of product after discount must be number")
    .custom((value, { req }) => {
      if (req.body.price <= value) {
        throw new ApiError("price after discount must be lowe", 400);
      }
      return true;
    }),

  check("imageCover").notEmpty().withMessage("Product imageCover is required"),

  check("images")
    .optional()
    .isArray()
    .withMessage("images should be array of string"),

  check("brand")
    .isMongoId()
    .withMessage("Invalid Brand")
    .notEmpty()
    .withMessage("Product must belong to a brand")
    .custom(async (val) => {
      const brand = await Brand.findById(val);
      if (!brand) throw new ApiError("Invalid Brand");
      return true;
    }),

  check("ratingsAverage")
    .optional()
    .isNumeric()
    .withMessage("ratings quantity must be a number")
    .custom(async (val) => {
      if (parseFloat(val) > 5.0 || parseFloat(val) < 0)
        throw new ApiError("Rating Average must be 0 to 5");
      return true;
    }),

  check("packageSize")
    .notEmpty()
    .withMessage("Case size is required")
    .isNumeric()
    .withMessage("packageSize must me number")
    .custom(async (val) => {
      const number = parseFloat(val);
      if (number === 25 || number === 50 || number === 100) {
        return false;
      } else {
        throw new ApiError("Case size must be 25 or 50 or 100");
      }
    }),

  validator,
];

export const getOneProductValidator = [
  check("id")
    .isMongoId()
    .withMessage("Invalid Product")
    .custom(async (val) => {
      const product = await Product.findById(val);
      if (!product) throw new ApiError("Invalid Product", 404);

      return true;
    }),

  validator,
];

export const updateProductValidator = [
  check("id")
    .isMongoId()
    .withMessage("Invalid Product Id")
    .custom(async (val) => {
      const product = await Product.findById(val);
      if (!product) throw new ApiError("Invalid Product", 404);
      return true;
    }),

  check("name")
    .optional()
    .isLength({ min: 3 })
    .withMessage("product title must be at least 3 chars")
    .isLength({ max: 100 })
    .withMessage("Too long product title")
    .custom((val, { req }) => {
      if (val) req.body.slug = slugify(val);
      return true;
    }),
  check("description")
    .optional()
    .isLength({ min: 10 })
    .withMessage("description must be at least 10 chars")
    .isLength({ max: 700 })
    .withMessage("Too long description content"),

  check("quantity")
    .optional()
    .isNumeric()
    .withMessage("quantity of product must be number")
    .custom((value) => {
      if (value <= 0) throw new ApiError("quantity must be greater than 0");
      return true;
    }),
  check("sold")
    .optional()
    .isNumeric()
    .withMessage("sold product quantity must be number")
    .custom((value) => {
      if (value < 0)
        throw new ApiError("sold product quantity must positive number", 400);
      return true;
    }),
  check("imageCover").optional(),

  check("price")
    .optional()
    .isFloat()
    .withMessage("Price of product must be number")
    .toFloat()
    .custom((value, { req }) => {
      if (value <= 0) {
        throw new ApiError("price of product must be positive number", 400);
      }
      return true;
    })
    .custom(async (value, { req }) => {
      const product = await Product.findById(req.params.id);

      const getPriceAfterDiscount =
        req.body?.priceAfterDiscount || product.priceAfterDiscount;

      if (getPriceAfterDiscount >= value) {
        throw new ApiError(
          "price after discount must be lowe than old price",
          400
        );
      }
      return true;
    }),

  check("priceAfterDiscount")
    .optional()
    .toFloat()
    .isNumeric()
    .withMessage("Price of product after discount must be number")
    .custom(async (value, { req }) => {
      if (req.params.id) {
        const getPrice = await Product.findById(req.params.id);
        const price = req.body?.price || getPrice.price;
        if (price <= value) {
          throw new ApiError(
            "price after discount must be lowe than old price",
            400
          );
        }
      }
      return true;
    }),

  check("images")
    .optional()
    .isArray()
    .withMessage("images should be array of string"),

  check("brand")
    .isMongoId()
    .withMessage("Invalid Brand")
    .optional()
    .custom(async (val) => {
      const brand = await Brand.findById(val);

      if (!brand) throw new ApiError("Invalid Brand");

      return true;
    }),

  check("ratingsAverage")
    .optional()
    .isNumeric()
    .withMessage("ratings quantity must be a number")
    .custom(async (val) => {
      if (parseFloat(val) > 5.0 || parseFloat(val) < 0)
        throw new ApiError("Rating Average must be 0 to 5");
      return true;
    }),

  check("packageSize")
    .optional()
    .isNumeric()
    .withMessage("packageSize must me number")
    .isArray()
    .withMessage("package size must be an Array")
,

  validator,
];

export const deleteProductValidator = [
  check("id")
    .isMongoId()
    .withMessage("Invalid Product")
    .custom(async (val) => {
      const product = await Product.findById(val);
      if (!product) throw new ApiError("Invalid Product", 404);

      return true;
    }),

  validator,
];
