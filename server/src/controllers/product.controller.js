import asyncHandler from "express-async-handler";
import { v4 as uuidv4 } from "uuid";
import sharp from "sharp";

import Product from "./../models/product.model.js";
import { uploadMixImages } from "../middleware/uploadImages.middleware.js";
import {
  createItem,
  deleteItem,
  getAllItems,
  getOneItem,
  updateItem,
} from "./general.controller.js";


export const uploadProductImages = uploadMixImages([
  { name: "imageCover", maxCount: 1 },
  { name: "images", maxCount: 5 },
]);

// # Resize Images
export const resizeProductImage = asyncHandler(async (req, res, next) => {
  if (req.files.imageCover) {
    const imageCoverFileName = `product-${uuidv4()}-${Date.now()}-cover.jpeg`;
    await sharp(req.files.imageCover[0].buffer)
      .resize(1024, 1024)
      .toFormat("jpeg")
      .jpeg({ quality: 90 })
      .toFile(`src/uploads/products/${imageCoverFileName}`);

    req.body.imageCover = imageCoverFileName;
  }
  if (req.files.images) {
    req.body.images = [];
    await Promise.all(
      req.files.images.map(async (img, idx) => {
        const imageName = `product-${uuidv4()}-${Date.now()}-${idx + 1}.jpeg`;

        await sharp(img.buffer)
          .resize(1024, 1024)
          .toFormat("jpeg")
          .jpeg({ quality: 90 })
          .toFile(`src/uploads/products/${imageName}`);

        req.body.images.push(imageName);
      })
    );
  }
  next();
});
// # Create Product
// # POST   /app/v1/Products
// # Private
export const createProduct = createItem(Product);

// # Get Product
// # GET   /app/v1/Products
// # Public
export const getProducts = getAllItems(Product , "Products");
// # Get Product
// # GET   /app/v1/Products/:id
// # Public
export const getOneProduct = getOneItem(Product);

// # Update Product
// # PATCH   /app/v1/Products/:id
// # Private
export const updateProduct = updateItem(Product);

// # Delete Product
// # DELETE   /app/v1/Products/:id
// # Private
export const deleteProduct = deleteItem(Product);
