import asyncHandler from "express-async-handler";
import { v4 as uuidv4 } from "uuid";
import sharp from "sharp";
import Offer from "../models/offer.model.js";
import ApiFeatures from "../lib/ApiFeatures.js";
import { uploadSingleImage } from "../middleware/uploadImages.middleware.js";

// Upload offer images
export const uploadOfferImages = uploadSingleImage("image");

// Resize offer images
export const resizeOfferImages = asyncHandler(async (req, res, next) => {
  if (!req.file) return next();

  // 1) Process main image
  if (req.file) {
    const imageName = `offer-${uuidv4()}-${Date.now()}-cover.jpeg`;
    await sharp(req.file.buffer)
      .resize(2000, 1333)  // 3:2 aspect ratio
      .toFormat("jpeg")
      .jpeg({ quality: 90 })
      .toFile(`src/uploads/offers/${imageName}`);

    req.body.image = imageName;
  }

  next();
});
/**
 * @desc    Get all offers
 * @route   GET /api/v1/offers
 * @access  Public
 */
export const getAllOffers = asyncHandler(async (req, res, next) => {


  const offers = await Offer.find({ isActive: true }).sort({ order: 1 })

  res.status(200).json({
    status: "success",
    results: offers.length,
    data: {
      offers,
    },
  });
});

/**
 * @desc    Get single offer
 * @route   GET /api/v1/offers/:id
 * @access  Public
 */
export const getOffer = asyncHandler(async (req, res, next) => {
  const offer = await Offer.findById(req.params.id);

  if (!offer) {
    throw new ApiError("No offer found with that ID", 404);
  }

  res.status(200).json({
    status: "success",
    data: {
      offer,
    },
  });
});

/**
 * @desc    Create new offer
 * @route   POST /api/v1/offers
 * @access  Private/Admin
 */
export const createOffer = asyncHandler(async (req, res, next) => {
    // If no image uploaded
    if (!req.body.image) {
      throw new ApiError("Offer image is required", 400);
    }
  
    const newOffer = await Offer.create(req.body);
  
    res.status(201).json({
      status: "success",
      data: {
        offer: newOffer,
      },
    });
  });
  
/**
 * @desc    Update offer
 * @route   PATCH /api/v1/offers/:id
 * @access  Private/Admin
 */
export const updateOffer = asyncHandler(async (req, res, next) => {
    const offer = await Offer.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
      runValidators: true,
    });
  
    if (!offer) {
      throw new ApiError("No offer found with that ID", 404);
    }
  
    res.status(200).json({
      status: "success",
      data: {
        offer,
      },
    });
  });

/**
 * @desc    Delete offer
 * @route   DELETE /api/v1/offers/:id
 * @access  Private/Admin
 */
export const deleteOffer = asyncHandler(async (req, res, next) => {
  const offer = await Offer.findByIdAndDelete(req.params.id);

  if (!offer) {
    throw new ApiError("No offer found with that ID", 404);
  }

  res.status(204).json({
    status: "success",
    data: null,
  });
});

/**
 * @desc    Toggle offer status (active/inactive)
 * @route   PATCH /api/v1/offers/:id/toggle-status
 * @access  Private/Admin
 */
export const toggleOfferStatus = asyncHandler(async (req, res, next) => {
  const offer = await Offer.findById(req.params.id);

  if (!offer) {
    throw new ApiError("No offer found with that ID", 404);
  }

  offer.isActive = !offer.isActive;
  await offer.save();

  res.status(200).json({
    status: "success",
    data: {
      offer,
    },
  });
});