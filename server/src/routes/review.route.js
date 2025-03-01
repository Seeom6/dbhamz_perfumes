import express from "express";

import { protect, allowedTo } from "../controllers/auth.controller.js";
import { createReview, deleteOneReview, getOneReview, getReviews, updateReview } from "../controllers/review.controller.js";
import {
  createBrandValidator,
  deleteBrandValidator,
  getOneBrandValidator,
  updateBrandValidator
} from "../lib/validation/brand.validator.js";

const Router = express.Router();

// Router.use("/:brandId/products", productRouter);

Router.route("/")
  .post(
    protect,
    allowedTo("user"),
    createBrandValidator,
    createReview,
  )
  .get(getReviews);
Router.route("/:id")
  .get(getOneBrandValidator, getOneReview)
  .delete(protect, allowedTo( "user","admin" , "admin"), deleteBrandValidator, deleteOneReview)
  .patch(
    protect,
    allowedTo("user", "admin"),
    updateBrandValidator,
    updateReview
  );

export default Router;
