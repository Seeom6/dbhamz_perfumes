import ProductModel from "../models/product.model.js";
import ApiError from "../lib/ApiError.js";

async function getProductById(id, throwError = true) {
    const product = await ProductModel.findById({
        _id: id,
    })
    if(!product && throwError ) {
        throw new ApiError("Product not found", 404)
    }
    return product
}

export default {
    getProductById
};
