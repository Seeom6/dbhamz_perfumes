import asyncHandler from "express-async-handler";

import ApiError from "../lib/ApiError.js";
import ApiFeatures from "../lib/ApiFeatures.js";

export const createItem = (Model) =>
  asyncHandler(async (req, res, next) => {
    const item = await Model.create(req.body);

    if (!item)
      return next(new ApiError("something went wrong, please try again", 400));

    res.status(200).json({ data: item });
  });

export const deleteItem = (Model) =>
  asyncHandler(async (req, res, next) => {
    const { id } = req.params;

    const item = await Model.findByIdAndDelete(id);

    if (!item) return next(new ApiError("Not Found item", 404));

    res.status(200).json({ data: { message: "Deleted Successfully" } });
  });

export const updateItem = (Model) =>
  asyncHandler(async (req, res, next) => {
    const item = await Model.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
    });

    if (!item) return next(new ApiError("Not Found item", 404));

    res.status(200).json({ data: item });
  });

export const getOneItem = (Model) =>
  asyncHandler(async (req, res, next) => {
    const { id } = req.params;

    const item = await Model.findById(id);

    if (!item) return next(new ApiError("Not Found item", 404));

    res.status(200).json({ data: item });
  });

export const getAllItems = (Model, modelName = "") =>
  asyncHandler(async (req, res, next) => {
    let filter = {};

    if (req?.body.filterObj) {
      filter = req.body.filterObj;
    }
    const numberOfDocs = await Model.countDocuments();

    const apiFeatures = new ApiFeatures(Model.find(filter), req.query)
      .pagination(numberOfDocs)
      .filter()
      .search(modelName)
      .limitFields()
      .sort();

    // @ Execute query
    const { mongooseQuery, paginationResult } = apiFeatures;

    const items = await mongooseQuery;

    if (!items) return next(new ApiError("Not Found items", 404));

    res
      .status(200)
      .json({ result: items.length, paginationResult, data: items });
  });
