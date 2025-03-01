import asyncHandler from "express-async-handler";

import wishListService from "../service/wishList.service.js";

export const addProductToWishList = asyncHandler(async (req, res, next) => {
    const { productId } = req.params;
    const { _id } = req.user;
    const result = await wishListService.addItemToWishList(productId, _id)
    res.status(201).json({ data: result })
})

export const getAllWishList = asyncHandler(async (req, res, next) => {
    const { _id } = req.user;
    const result = await wishListService.getAllWishList(_id)
    res.status(200).json({data: result})
})

export const removeProductFromWishList = asyncHandler(async (req, res, next) => {
    const { _id } = req.user;
    const {productId} = req.params;
    return await wishListService.removeItemFromWishList(productId, _id)
})

