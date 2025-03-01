import Product from "./../models/product.model.js";
import WishListModel from "./../models/wishList.model.js"

async function addItemToWishList (productId, userId){
  const product = await Product.findById(productId)
  if (!product) {
    throw new Error(`not found product with id ${productId}`) ;
  }
  await WishListModel.create({
    productId,
    userId: userId,
  })
  return true
}

async function getAllWishList (userId){
  return await WishListModel.find({
    userId: userId,
  })
}

async function removeItemFromWishList (productId, userId){
  const wishList = await WishListModel.findOne({
    userId,
    productId
  })
  if(!wishList){
    throw new Error(`not found product with id ${productId}`) ;
  }
  await WishListModel.findByIdAndDelete(productId)
  return
}

export default {
  addItemToWishList,
  getAllWishList,
  removeItemFromWishList
}