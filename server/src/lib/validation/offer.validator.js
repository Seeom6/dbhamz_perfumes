// lib/validation/offer.validator.js
import { check } from "express-validator";
import validator from "../../middleware/validator.middleware.js";
import ApiError from "../ApiError.js";
import moment from "moment";
import { isValidObjectId } from "mongoose";

export const createOfferValidation = [
  check("title")
    .notEmpty()
    .withMessage("Title is required")
    .isLength({ min: 2 })
    .withMessage("Title must be at least 2 characters")
    .isLength({ max: 100 })
    .withMessage("Title cannot exceed 100 characters"),
    
  check("description")
    .optional()
    .isLength({ max: 500 })
    .withMessage("Description cannot exceed 500 characters"),
    
  check("image")
    .notEmpty()
    .withMessage("Image URL is required")
,
    
  check("isActive")
    .optional()
    .isBoolean()
    .withMessage("isActive must be a boolean value"),
    
  check("startDate")
    .optional()
    .custom((value) => {
      if (!moment(value, "YYYY-MM-DD", true).isValid()) {
        throw new ApiError("Invalid start date format. Use YYYY-MM-DD", 400);
      }
      return true;
    }),
    
  check("endDate")
    .optional()
    .custom((value, { req }) => {
      if (!moment(value, "YYYY-MM-DD", true).isValid()) {
        throw new ApiError("Invalid end date format. Use YYYY-MM-DD", 400);
      }
      
      if (req.body.startDate && moment(value).isBefore(req.body.startDate)) {
        throw new ApiError("End date must be after start date", 400);
      }
      
      if (moment(value).isBefore(moment())) {
        throw new ApiError("End date must be in the future", 400);
      }
      
      return true;
    }),
    
  check("order")
    .optional()
    .isInt()
    .withMessage("Order must be an integer")
    .custom((value) => {
      if (value < 0) {
        throw new ApiError("Order cannot be negative", 400);
      }
      return true;
    }),
    
  validator
];

export const updateOfferValidation = [
  check("id")
    .custom((value) => {
      if (!isValidObjectId(value)) {
        throw new ApiError("Invalid offer ID format", 400);
      }
      return true;
    }),
    
  check("title")
    .optional()
    .isLength({ min: 2 })
    .withMessage("Title must be at least 2 characters")
    .isLength({ max: 100 })
    .withMessage("Title cannot exceed 100 characters"),
    
  check("description")
    .optional()
    .isLength({ max: 500 })
    .withMessage("Description cannot exceed 500 characters"),
    
  check("image")
    .optional()
    .isURL()
    .withMessage("Invalid image URL format"),
    
  check("isActive")
    .optional()
    .isBoolean()
    .withMessage("isActive must be a boolean value"),
    
  check("startDate")
    .optional()
    .custom((value) => {
      if (!moment(value, "YYYY-MM-DD", true).isValid()) {
        throw new ApiError("Invalid start date format. Use YYYY-MM-DD", 400);
      }
      return true;
    }),
    
  check("endDate")
    .optional()
    .custom((value, { req }) => {
      if (!moment(value, "YYYY-MM-DD", true).isValid()) {
        throw new ApiError("Invalid end date format. Use YYYY-MM-DD", 400);
      }
      
      const startDate = req.body.startDate || req.offer?.startDate;
      if (startDate && moment(value).isBefore(startDate)) {
        throw new ApiError("End date must be after start date", 400);
      }
      
      return true;
    }),
    
  check("order")
    .optional()
    .isInt()
    .withMessage("Order must be an integer")
    .custom((value) => {
      if (value < 0) {
        throw new ApiError("Order cannot be negative", 400);
      }
      return true;
    }),
    
  validator
];

export const toggleOfferStatusValidation = [
  check("id")
    .custom((value) => {
      if (!isValidObjectId(value)) {
        throw new ApiError("Invalid offer ID format", 400);
      }
      return true;
    }),
  validator
];

export const getOfferValidation = [
  check("id")
    .custom((value) => {
      if (!isValidObjectId(value)) {
        throw new ApiError("Invalid offer ID format", 400);
      }
      return true;
    }),
  validator
];

export const deleteOfferValidation = [
  check("id")
    .custom((value) => {
      if (!isValidObjectId(value)) {
        throw new ApiError("Invalid offer ID format", 400);
      }
      return true;
    }),
  validator
];