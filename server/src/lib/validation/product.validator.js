import { check } from "express-validator";
import validator from "../../middleware/validator.middleware.js";
import Brand from "../../models/brand.model.js";
import slugify from "slugify";
import ApiError from "../ApiError.js";
import Product from "../../models/product.model.js";

const packageSizes = [
  "50",
  "75",
  "80",
  "90",
  "100",
  "120",
  "125",
  "150",
  "175",
  "200",
  "250",
];

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
    .withMessage("حجم الوصف يجب ان يكون اكبر من 10 احرف")
    .isLength({ max: 3000 })
    .withMessage("حجم الوصف يجب ان يكون اقل من 3000 حرف"),

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
    .toFloat(),

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
    .custom((value) => {
      if (value.length > 2) {
        if (!value.every((size) => packageSizes.includes(size))) {
          throw new Error("Package size contains invalid values");
        }
      }

      return true;
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
    .notEmpty()
    .withMessage("description of title is required")
    .isLength({ min: 10 })
    .withMessage("حجم الوصف يجب ان يكون اكبر من 10 احرف")
    .isLength({ max: 3000 })
    .withMessage("حجم الوصف يجب ان يكون اقل من 3000 حرف"),

 
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
    .custom((value) => {
      if (value.length > 2) {
        if (!value.every((size) => packageSizes.includes(size))) {
          throw new Error("Package size contains invalid values");
        }
      }

      return true;
    }),
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
