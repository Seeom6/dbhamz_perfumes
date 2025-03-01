import asyncHandler from "express-async-handler";
import sharp from "sharp";
import { v4 as uuidv4 } from "uuid";

import Brand from "../models/brand.model.js";
import { uploadSingleImage } from "../middleware/uploadImages.middleware.js";
import {
  createItem,
  deleteItem,
  getAllItems,
  getOneItem,
  updateItem,
} from "./general.controller.js";

export const uploadBrandImage = uploadSingleImage("image");

// # Resize Images
export const resizeImage = asyncHandler(async (req, res, next) => {
  const fileName = `brand-${uuidv4()}-${Date.now()}.jpeg`;
  if (req.file) {
    await sharp(req.file.buffer)
      .resize(500, 400)
      .toFormat("jpeg")
      .toFile(`src/uploads/brands/${fileName}`);

    req.body.image = fileName;
  }

  next();
});

// # Create Brand
// # POST   /app/brands
// # Private
export const createBrand = createItem(Brand);

// # Get Brand
// # GET    /app/brands
// # Public
export const getBrands = getAllItems(Brand);

// # Get Brand
// # GET    /app/brands/:id
// # Public
export const getOneBrand = getOneItem(Brand);

// # Update Brand
// # PATCH   /app/brands/:id
// # Private
export const updateBrand = updateItem(Brand);

// # Delete Brand
// # DELETE    /app/brands/:id
// # Private
export const deleteOneBrand = deleteItem(Brand);
