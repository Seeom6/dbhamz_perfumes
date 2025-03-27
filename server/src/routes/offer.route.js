// routes/offerRoutes.js
import express from "express";
import {
  createOffer,
  deleteOffer,
  getOffer,
  getAllOffers,
  updateOffer,
  toggleOfferStatus,
  uploadOfferImages,
  resizeOfferImages
} from "../controllers/offer.controller.js";
import {
  createOfferValidation,
  deleteOfferValidation,
  getOfferValidation,
  updateOfferValidation,
  toggleOfferStatusValidation,
} from "../lib/validation/offer.validator.js";
import { allowedTo, protect } from "../controllers/auth.controller.js";

const Router = express.Router({ mergeParams: true });

// Public routes
Router.route("/")
  .get(getAllOffers);

Router.route("/:id")
  .get(getOfferValidation, getOffer);

// Protected admin routes
Router.use(protect, allowedTo("admin"));

Router.route("/")
  .post(
    uploadOfferImages,
    resizeOfferImages,
    createOfferValidation,
    createOffer
  );

Router.route("/:id")
  .patch(
    uploadOfferImages,
    resizeOfferImages,
    updateOfferValidation,
    updateOffer
  )
  .delete(deleteOfferValidation, deleteOffer);

Router.patch("/:id/toggle-status", toggleOfferStatusValidation, toggleOfferStatus);

export default Router;