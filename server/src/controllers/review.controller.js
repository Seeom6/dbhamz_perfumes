import asyncHandler from "express-async-handler";

import Review from "../models/review.model.js";
import {
  createItem,
  deleteItem,
  getAllItems,
  getOneItem,
  updateItem,
} from "./general.controller.js";

// # Create Review
// # POST   /app/reviews
// # Private
export const createReview = createItem(Review);

// # Get Review
// # GET    /app/reviews
// # Public
export const getReviews = getAllItems(Review);

// # Get Review
// # GET    /app/reviews/:id
// # Public
export const getOneReview = getOneItem(Review);

// # Update Review
// # PATCH   /app/reviews/:id
// # Private
export const updateReview = updateItem(Review);

// # Delete Review
// # DELETE    /app/reviews/:id
// # Private
export const deleteOneReview = deleteItem(Review);
