import express from "express";
import {
  createProduct,
  deleteProduct,
  getOneProduct,
  getProducts,
  updateProduct,
  uploadProductImages,
  resizeProductImage,
} from "../controllers/product.controller.js";
import {
  createProductValidator,
  deleteProductValidator,
  getOneProductValidator,
  updateProductValidator,
} from "../lib/validation/product.validator.js";
import { allowedTo, protect } from "../controllers/auth.controller.js";

const Router = express.Router({ mergeParams: true });

Router.route("/")
  .post(
    protect,
    allowedTo("admin"),
    uploadProductImages,
    resizeProductImage,
    createProductValidator,
    createProduct
  )
  .get(getProducts);

Router.route("/:id")
  .get(getOneProductValidator, getOneProduct)
  .patch(
    protect,
    allowedTo("admin"),
    uploadProductImages,
    resizeProductImage,
    updateProductValidator,
    updateProduct
  )
  .delete(protect, allowedTo("admin"), deleteProductValidator, deleteProduct);

export default Router;
