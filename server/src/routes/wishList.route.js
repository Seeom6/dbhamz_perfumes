import express from "express";

import { protect, allowedTo } from "../controllers/auth.controller.js";
import { getAllWishList, addProductToWishList, removeProductFromWishList } from "../controllers/wishList.controller.js"
import {
    createWishListValidator,
    deleteWishListValidator,
} from "../lib/validation/wishList.validator.js";

const Router = express.Router();

Router.get('',
    protect,
    allowedTo("user"),
    getAllWishList
)

Router.route("/:productId")
    .post(
        protect,
        allowedTo("user"),
        ...createWishListValidator,
        addProductToWishList
    )
    .delete(
        protect,
        allowedTo("user"),
        ...deleteWishListValidator,
        removeProductFromWishList
    )



export default Router;
