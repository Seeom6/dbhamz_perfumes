import express from "express";
import {
  createBrand,
  deleteOneBrand,
  getBrands,
  getOneBrand,
  resizeImage,
  updateBrand,
  uploadBrandImage,
} from "./../controllers/brand.controller.js";

import {
  createBrandValidator,
  deleteBrandValidator,
  getOneBrandValidator,
  updateBrandValidator,
} from "./../lib/validation/brand.validator.js";

import productRouter from "./product.route.js";
import { protect, allowedTo } from "../controllers/auth.controller.js";

const Router = express.Router();

Router.use("/:brandId/products", productRouter);

Router.route("/")
  .post(
    protect,
    allowedTo("admin"),
    uploadBrandImage,
    resizeImage,
    createBrandValidator,
    createBrand
  )
  .get(getBrands);
Router.route("/:id")
  .get(getOneBrandValidator, getOneBrand)
  .delete(protect, allowedTo("admin"), deleteBrandValidator, deleteOneBrand)
  .patch(
    protect,
    allowedTo("admin"),
    uploadBrandImage,
    resizeImage,
    updateBrandValidator,
    updateBrand
  );

export default Router;
